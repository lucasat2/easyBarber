import { MessageNotification } from "../MessageNotification.js";
import { AppointmentCard, updateAppointmentStatus } from "./AppointmentCard.js";
import {
  getEditedCurrentTime,
  getSelectedEmployeeId,
  setGlobalAppointments,
} from "../setAndGetGlobalVariables.js";
import { SchedulingTimelineDiv } from "./SchedulingTimelineContainer.js";
import { fetchAppointmentsByEmployee } from "../fetchData.js";

function FinishedCard(date, appointmentData) {
  const cardContainer = document.createElement("div");
  cardContainer.style.display = "flex";
  cardContainer.style.justifyContent = "space-between";
  cardContainer.style.padding = "20px";
  cardContainer.style.margin = "15px";
  cardContainer.style.color = "#FFF";
  cardContainer.style.backgroundColor = "#9FA324";
  cardContainer.style.boxShadow = "0 0px 12px rgba(0, 0, 0, 0.3)";
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

  const buttonArea = document.createElement("div");
  buttonArea.style.display = "flex";
  buttonArea.style.flexDirection = "column";
  buttonArea.style.rowGap = "10px";
  cardContainer.appendChild(buttonArea);

  const statusArea = document.createElement("div");
  statusArea.textContent = "Finalizado";
  statusArea.style.width = "150px";
  statusArea.style.textAlign = "center";
  statusArea.style.fontSize = "20px";
  buttonArea.appendChild(statusArea);

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

  const undoButton = document.createElement("button");
  undoButton.innerText = "Desfazer";
  undoButton.style.padding = "10px 0px";
  undoButton.style.width = "150px";
  undoButton.style.backgroundColor = "#fff";
  undoButton.style.color = "#9FA324";
  undoButton.style.border = "none";
  undoButton.style.cursor = "pointer";
  undoButton.style.borderRadius = "5px";
  undoButton.style.marginBottom = "10px";
  undoButton.style.fontSize = "20px";
  buttonArea.appendChild(undoButton);

  undoButton.addEventListener("mouseover", function () {
    undoButton.style.backgroundColor = "#f0f0f0";
  });
  undoButton.addEventListener("mouseout", function () {
    undoButton.style.backgroundColor = "#fff";
  });

  undoButton.addEventListener("click", async function () {
    updateAppointmentStatus(
      "AGENDADO",
      "Status do serviço alterado com sucesso",
      date,
      appointmentData
    );
    const newAppointment = AppointmentCard(date, appointmentData);
    console.log(date, appointmentData);
    cardContainer.innerHTML = "";
    cardContainer.appendChild(newAppointment);

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
  });

  fillRequiredFields();

  return cardContainer;
}

export { FinishedCard };