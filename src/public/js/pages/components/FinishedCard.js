import { MessageNotification } from "./MessageNotification.js";

function FinishedCard(appointmentData) {
  const cardContainer = document.createElement("div");
  cardContainer.style.display = "flex";
  cardContainer.style.justifyContent = "space-between";
  cardContainer.style.padding = "20px";
  cardContainer.style.marginBottom = "15px";
  cardContainer.style.color = "#FFF";
  cardContainer.style.backgroundColor = "#9FA324";
  cardContainer.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  cardContainer.style.borderRadius = "8px";
  cardContainer.style.alignItems = "center";
  cardContainer.style.flexWrap = "wrap";
  cardContainer.style.width = "60vw";

  const infoContainer = document.createElement("div");
  cardContainer.appendChild(infoContainer);
  infoContainer.style.flex = "1";
  infoContainer.style.marginRight = "20px";

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

  const statusArea = document.createElement("div");
  statusArea.textContent = "Finalizado";
  statusArea.style.width = "150px";
  statusArea.style.textAlign = "center";
  statusArea.style.fontSize = "20px";
  cardContainer.appendChild(statusArea);

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

        const appointmentDateAndTime = data.date_hour_begin.toISOString();

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

export { FinishedCard };