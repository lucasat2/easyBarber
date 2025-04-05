import { MessageNotification } from "./MessageNotification.js";
import { DailyAppointmentsModal } from "./DailyAppointmentsModal.js";

function BlockedCard(date, appointmentData) {
  const cardContainer = document.createElement("div");
  cardContainer.style.display = "flex";
  cardContainer.style.justifyContent = "space-between";
  cardContainer.style.padding = "20px";
  cardContainer.style.marginBottom = "15px";
  cardContainer.style.color = "#FFF";
  cardContainer.style.backgroundColor = "#dc3545";
  cardContainer.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  cardContainer.style.borderRadius = "8px";
  cardContainer.style.alignItems = "center";
  cardContainer.style.flexWrap = "wrap";
  cardContainer.style.width = "60vw";

  const infoContainer = document.createElement("div");
  infoContainer.style.flex = "1";
  infoContainer.style.marginRight = "20px";
  cardContainer.appendChild(infoContainer);

  const titleArea = document.createElement("h3");
  titleArea.textContent = "Horário Bloqueado";
  infoContainer.appendChild(titleArea);

  const startFormattedDate = formatDateAndTime(appointmentData.date_hour_begin);

  const startDateArea = document.createElement("p");
  startDateArea.textContent = `Data de Ínico: ${startFormattedDate.date}`;
  infoContainer.appendChild(startDateArea);

  const startTimeArea = document.createElement("p");
  startTimeArea.textContent = `Horário de Ínicio: ${startFormattedDate.time}`;
  infoContainer.appendChild(startTimeArea);

  const endFormattedDate = formatDateAndTime(appointmentData.date_hour_end);

  const endDateArea = document.createElement("p");
  endDateArea.textContent = `Data de Término: ${endFormattedDate.date}`;
  infoContainer.appendChild(endDateArea);

  const endTimeArea = document.createElement("p");
  endTimeArea.textContent = `Horário de Término: ${endFormattedDate.time}`;
  infoContainer.appendChild(endTimeArea);

  const observationArea = document.createElement("p");
  observationArea.textContent = `Obervação: ${appointmentData.observation}`;
  infoContainer.appendChild(observationArea);

  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.flexDirection = "column";

  cardContainer.appendChild(buttonContainer);

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Desbloquear";
  cancelButton.style.padding = "10px 0px";
  cancelButton.style.width = "150px";
  cancelButton.style.backgroundColor = "#fff";
  cancelButton.style.color = "#dc3545";
  cancelButton.style.border = "none";
  cancelButton.style.cursor = "pointer";
  cancelButton.style.borderRadius = "5px";
  cancelButton.style.fontSize = "16px";
  buttonContainer.appendChild(cancelButton);

  cancelButton.addEventListener("mouseover", function () {
    cancelButton.style.backgroundColor = "#f0f0f0";
  });
  cancelButton.addEventListener("mouseout", function () {
    cancelButton.style.backgroundColor = "#fff";
  });

  cancelButton.addEventListener("click", () => {
    unlockSchedule(date, appointmentData);
  });

  return cardContainer;
}

function formatDateAndTime(dateTime) {
  const appointmentDateAndTime = dateTime;

  const appointmentDateAndTimeArray = appointmentDateAndTime.split("T");

  const appointmentDateArray = appointmentDateAndTimeArray[0].split("-");

  const appointmentTimeArray = appointmentDateAndTimeArray[1].split(":");

  const appointmentDate = `${appointmentDateArray[2]}/${appointmentDateArray[1]}/${appointmentDateArray[0]}`;

  const appointmentTime = `${appointmentTimeArray[0]}:${appointmentTimeArray[1]}`;

  return {
    date: appointmentDate,
    time: appointmentTime,
  };
}

async function unlockSchedule(date, appointmentData) {
  try {
    const response = await fetch("/api/appointments/updateStatus", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appointmentId: appointmentData.id,
        staffId: appointmentData.staff_id,
        newStatus: "CANCELADO",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.error || "Falha desconhecida");
    }

    const employeeId = getSelectedEmployeeId();
    if (employeeId) {
      try {
        const appointments = await fetchAppointmentsByEmployee({
          id: employeeId,
        });
        setGlobalAppointments(appointments);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error.message);
      }
    }


    const {month, year} = getEditedCurrentTime()
    const employeeScheduleTimeline = SchedulingTimelineDiv(month, year);

    const employeeScheduleTimelineContainer = document.getElementById("employeeScheduleTimelineContainer");
    employeeScheduleTimelineContainer.innerHTML = "";
    employeeScheduleTimelineContainer.appendChild(employeeScheduleTimeline);


    const result = await fetch(
      `/api/appointments/employee/${appointmentData.staff_id}`
    );

    if (!result.ok) {
      const errorData = await result.json();

      throw new Error(errorData.error || "Falha desconhecida");
    }

    const data = await result.json();

    const currentDateAndTimeArray = date.split("T");

    const currentDateArray = currentDateAndTimeArray[0].split("-");

    const currentDate = new Date(
      Number(currentDateArray[0]),
      Number(currentDateArray[1]) - 1,
      Number(currentDateArray[2])
    );

    const dataFiltered = data.filter((appointment) => {
      const appointmentStartDateAndTime = appointment.date_hour_begin;

      const appointmentStartDateAndTimeArray =
        appointmentStartDateAndTime.split("T");

      const appointmentStartDate =
        appointmentStartDateAndTimeArray[0].split("-");

      const startTimeAppointment = new Date(
        Number(appointmentStartDate[0]),
        Number(appointmentStartDate[1]) - 1,
        Number(appointmentStartDate[2])
      );

      const appointmentEndDateAndTime = appointment.date_hour_end;

      const appointmentEndDateAndTimeArray =
        appointmentEndDateAndTime.split("T");

      const appointmentEndDate = appointmentEndDateAndTimeArray[0].split("-");

      const endTimeAppointment = new Date(
        Number(appointmentEndDate[0]),
        Number(appointmentEndDate[1]) - 1,
        Number(appointmentEndDate[2])
      );

      if (
        currentDate >= startTimeAppointment &&
        currentDate <= endTimeAppointment
      ) {
        return true;
      }
    });

    dataFiltered.sort((firstAppointment, secondAppointment) => {
      const firstAppointmentStartDateAndTime = firstAppointment.date_hour_begin;

      const firstAppointmentStartDateAndTimeArray =
        firstAppointmentStartDateAndTime.split("T");

      const firstAppointmentStartDate =
        firstAppointmentStartDateAndTimeArray[0].split("-");

      const firstAppointmentStartTime =
        firstAppointmentStartDateAndTimeArray[1].split(":");

      const firstStartTimeAppointment = new Date(
        Number(firstAppointmentStartDate[0]),
        Number(firstAppointmentStartDate[1]) - 1,
        Number(firstAppointmentStartDate[2])
      );

      firstStartTimeAppointment.setUTCHours(
        Number(firstAppointmentStartTime[0]),
        Number(firstAppointmentStartTime[1])
      );

      const secondAppointmentStartDateAndTime =
        secondAppointment.date_hour_begin;

      const secondAppointmentStartDateAndTimeArray =
        secondAppointmentStartDateAndTime.split("T");

      const secondAppointmentStartDate =
        secondAppointmentStartDateAndTimeArray[0].split("-");

      const secondAppointmentStartTime =
        secondAppointmentStartDateAndTimeArray[1].split(":");

      const secondStartTimeAppointment = new Date(
        Number(secondAppointmentStartDate[0]),
        Number(secondAppointmentStartDate[1]) - 1,
        Number(secondAppointmentStartDate[2])
      );

      secondStartTimeAppointment.setUTCHours(
        Number(secondAppointmentStartTime[0]),
        Number(secondAppointmentStartTime[1])
      );

      if (firstStartTimeAppointment < secondStartTimeAppointment) {
        return -1;
      } else if (firstStartTimeAppointment > secondStartTimeAppointment) {
        return 1;
      } else {
        return 0;
      }
    });

    if (document.getElementById("dailyAppointmentsModal")) {
      document.getElementById("dailyAppointmentsModal").remove();
    }

    const dailyAppointmentsModal = DailyAppointmentsModal(date, dataFiltered);

    document.body.appendChild(dailyAppointmentsModal);

    MessageNotification("Horário desbloqueado com sucesso", " #28a745");
  } catch (error) {
    MessageNotification(error.message, "#ff6347");
  }
}

export { BlockedCard };

// const test = {
//   observation: "TESTE PARA VER SE TUDO ESTÁ CONFORME O DESEJADO",
//   date_hour_begin: new Date("2025-04-02T12:34:56.789Z"),
//   date_hour_end: new Date("2025-04-02T15:20:56.789Z"),
// };

// const test2 = [
//   {
//     id: "11111111-1111-1111-1111-111111111111",
//     client: "João Silva",
//     staff: "Carlos Mendes",
//     service: "Corte Masculino",
//     date_hour_begin: "2025-04-10T10:00:00",
//     date_hour_end: "2025-04-10T11:00:00",
//     status: "BLOQUEADO",
//     observation: "Horário reservado para manutenção",
//     created_at: "2025-04-01T08:00:00",
//     updated_at: "2025-04-01T08:00:00",
//   },
//   {
//     id: "55555555-5555-5555-5555-555555555555",
//     client: "Roberto Oliveira",
//     staff: "Fernanda Souza",
//     service: "Barba Completa",
//     date_hour_begin: "2025-04-12T14:00:00",
//     date_hour_end: "2025-04-12T15:00:00",
//     status: "BLOQUEADO",
//     observation: "Funcionário indisponível nesse horário",
//     created_at: "2025-04-01T08:30:00",
//     updated_at: "2025-04-01T08:30:00",
//   },
//   {
//     id: "99999999-9999-9999-9999-999999999999",
//     client: "Carlos Pereira",
//     staff: "Ana Martins",
//     service: "Corte + Barba",
//     date_hour_begin: "2025-04-15T09:00:00",
//     date_hour_end: "2025-04-15T10:00:00",
//     status: "CONCLUÍDO",
//     observation: "Cliente pediu estilo degradê",
//     created_at: "2025-04-01T09:00:00",
//     updated_at: "2025-04-01T09:00:00",
//   },
//   {
//     id: "13131313-1313-1313-1313-131313131313",
//     client: "Lucas Almeida",
//     staff: "Ricardo Lima",
//     service: "Hidratação Capilar",
//     date_hour_begin: "2025-04-18T16:00:00",
//     date_hour_end: "2025-04-18T17:00:00",
//     status: "CANCELADO",
//     observation: "Cancelado pelo cliente",
//     created_at: "2025-04-01T09:30:00",
//     updated_at: "2025-04-01T09:30:00",
//   },
//   {
//     id: "17171717-1717-1717-1717-171717171717",
//     client: "Fernando Souza",
//     staff: "Beatriz Rocha",
//     service: "Corte Infantil",
//     date_hour_begin: "2025-04-20T11:00:00",
//     date_hour_end: "2025-04-20T12:00:00",
//     status: "AGENDADO",
//     observation: "Aguardando confirmação do funcionário",
//     created_at: "2025-04-01T10:00:00",
//     updated_at: "2025-04-01T10:00:00",
//   },
// ];

// document.body.appendChild(BlockedCard(test2, test));