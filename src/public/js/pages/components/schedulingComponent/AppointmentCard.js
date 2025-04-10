import { MessageNotification } from "../MessageNotification.js";
import { DailyAppointmentsModal } from "./DailyAppointmentsModal.js";
import { fetchAppointmentsByEmployee } from "../fetchData.js";
import {
  getSelectedEmployeeId,
  setGlobalAppointments,
  getEditedCurrentTime,
} from "../setAndGetGlobalVariables.js";
import { SchedulingTimelineDiv } from "./SchedulingTimelineContainer.js";

function AppointmentCard(date, appointmentData) {
  const cardContainer = document.createElement("div");
  cardContainer.style.display = "flex";
  cardContainer.style.justifyContent = "space-between";
  cardContainer.style.padding = "20px";
  cardContainer.style.margin = "15px";
  cardContainer.style.backgroundColor = "#fff";
  cardContainer.style.boxShadow = "0 0 12px rgba(0, 0, 0, 0.3)";
  cardContainer.style.borderRadius = "8px";
  cardContainer.style.alignItems = "center";
  cardContainer.style.flexWrap = "wrap";
  cardContainer.style.width = "60vw";

  const infoContainer = document.createElement("div");
  infoContainer.style.display = "flex";
  infoContainer.style.flexDirection = "column";
  infoContainer.style.rowGap = "10px";
  infoContainer.style.flex = "1";
  infoContainer.style.marginRight = "20px";
  cardContainer.appendChild(infoContainer);

  const serviceNameArea = document.createElement("h3");
  infoContainer.appendChild(serviceNameArea);

  const clientNameArea = document.createElement("p");
  infoContainer.appendChild(clientNameArea);

  const clientPhoneNumberArea = document.createElement("p");
  infoContainer.appendChild(clientPhoneNumberArea);

  const dateArea = document.createElement("p");
  infoContainer.appendChild(dateArea);

  const timeArea = document.createElement("p");
  infoContainer.appendChild(timeArea);

  const priceArea = document.createElement("p");
  infoContainer.appendChild(priceArea);

  const observationArea = document.createElement("p");
  infoContainer.appendChild(observationArea);

  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.flexDirection = "column";
  cardContainer.appendChild(buttonContainer);

  const doneButton = document.createElement("button");
  doneButton.textContent = "Realizado";
  doneButton.style.padding = "10px 0px";
  doneButton.style.width = "150px";
  doneButton.style.backgroundColor = "#9FA324";
  doneButton.style.color = "#fff";
  doneButton.style.border = "none";
  doneButton.style.cursor = "pointer";
  doneButton.style.borderRadius = "5px";
  doneButton.style.marginBottom = "10px";
  doneButton.style.fontSize = "16px";
  buttonContainer.appendChild(doneButton);

  doneButton.addEventListener("mouseover", function () {
    doneButton.style.backgroundColor = "#7F821B";
  });
  doneButton.addEventListener("mouseout", function () {
    doneButton.style.backgroundColor = "#9FA324";
  });

  doneButton.addEventListener("click", () => {
    updateAppointmentStatus(
      "CONCLUÍDO",
      "Agendamento finalizado com sucesso",
      date,
      appointmentData
    );
  });

  const absentButton = document.createElement("button");
  absentButton.textContent = "Ausente";
  absentButton.style.padding = "10px 0px";
  absentButton.style.width = "150px";
  absentButton.style.backgroundColor = "#A6A6A6";
  absentButton.style.color = "#fff";
  absentButton.style.border = "none";
  absentButton.style.cursor = "pointer";
  absentButton.style.borderRadius = "5px";
  absentButton.style.marginBottom = "10px";
  absentButton.style.fontSize = "16px";
  buttonContainer.appendChild(absentButton);

  absentButton.addEventListener("mouseover", function () {
    absentButton.style.backgroundColor = "#7F7F7F";
  });
  absentButton.addEventListener("mouseout", function () {
    absentButton.style.backgroundColor = "#A6A6A6";
  });

  absentButton.addEventListener("click", () => {
    updateAppointmentStatus(
      "CANCELADO",
      "Agendamento alterado com sucesso",
      date,
      appointmentData
    );
  });

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancelado";
  cancelButton.style.padding = "10px 0px";
  cancelButton.style.width = "150px";
  cancelButton.style.backgroundColor = "#dc3545";
  cancelButton.style.color = "#fff";
  cancelButton.style.border = "none";
  cancelButton.style.cursor = "pointer";
  cancelButton.style.borderRadius = "5px";
  cancelButton.style.fontSize = "16px";
  buttonContainer.appendChild(cancelButton);

  cancelButton.addEventListener("mouseover", function () {
    cancelButton.style.backgroundColor = "#c82333";
  });
  cancelButton.addEventListener("mouseout", function () {
    cancelButton.style.backgroundColor = "#dc3545";
  });

  cancelButton.addEventListener("click", () => {
    updateAppointmentStatus(
      "CANCELADO",
      "Agendamento cancelado com sucesso",
      date,
      appointmentData
    );
  });

  function fillRequiredFields() {
    fetch(`/api/appointments/${appointmentData.id}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.error || "Falha desconhecida");
          });
        }

        return response.json();
      })
      .then((data) => {
        serviceNameArea.textContent = data.service_name;

        clientNameArea.textContent = `Cliente: ${data.client_name}`;

        clientPhoneNumberArea.textContent = `Telefone: ${data.client_phone}`;

        const appointmentDateAndTime = data.date_hour_begin;

        const appointmentDateAndTimeArray = appointmentDateAndTime.split("T");

        const appointmentDateArray = appointmentDateAndTimeArray[0].split("-");

        const appointmentTimeArray = appointmentDateAndTimeArray[1].split(":");

        const date = `${appointmentDateArray[2]}/${appointmentDateArray[1]}/${appointmentDateArray[0]}`;

        const time = `${appointmentTimeArray[0]}:${appointmentTimeArray[1]}`;

        dateArea.textContent = `Data: ${date}`;

        timeArea.textContent = `Horário: ${time}`;

        priceArea.textContent = `Preço: ${data.service_price}`;

        observationArea.textContent = `Observação: ${data.observation}`;
      })
      .catch((error) => {
        MessageNotification(error.message, "#ff6347");
      });
  }

  fillRequiredFields();

  return cardContainer;
}

async function updateAppointmentStatus(
  newStatus,
  successMessage,
  date,
  appointmentData
) {
  try {
    const response = await fetch("/api/appointments/updateStatus", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appointmentId: appointmentData.id,
        staffId: appointmentData.staff_id,
        newStatus: newStatus,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.error || "Falha desconhecida");
    }

    const result = await fetch(
      `/api/appointments/employee/${appointmentData.staff_id}`
    );

    if (!result.ok) {
      const errorData = await result.json();

      throw new Error(errorData.error || "Falha desconhecida");
    }

    const data = await result.json();

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

    const { month, year } = getEditedCurrentTime();
    const employeeScheduleTimeline = SchedulingTimelineDiv(month, year);

    const employeeScheduleTimelineContainer = document.getElementById(
      "employeeScheduleTimelineContainer"
    );
    employeeScheduleTimelineContainer.innerHTML = "";
    employeeScheduleTimelineContainer.appendChild(employeeScheduleTimeline);

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

    MessageNotification(successMessage, " #28a745");
  } catch (error) {
    MessageNotification(error.message, "#ff6347");
  }
}

export { AppointmentCard, updateAppointmentStatus };