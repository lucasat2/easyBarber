function FinishedCard(appointmentData) {
  const cardContainer = document.createElement("div");

  const infoContainer = document.createElement("div");
  cardContainer.appendChild(infoContainer);

  const serviceNameArea = document.createElement("h3");
  serviceNameArea.textContent = "Corte e Barba";
  infoContainer.appendChild(serviceNameArea);

  const clientNameArea = document.createElement("p");
  clientNameArea.textContent = "Cliente: Felipe Ozias";
  infoContainer.appendChild(clientNameArea);

  const clientPhoneNumberArea = document.createElement("p");
  clientPhoneNumberArea.textContent = "E-mail: felipe.ozias@gmail.com";
  infoContainer.appendChild(clientPhoneNumberArea);

  const dateArea = document.createElement("p");
  dateArea.textContent = `Data: 16/03/2025`;
  infoContainer.appendChild(dateArea);

  const timeArea = document.createElement("p");
  timeArea.textContent = `Horário: 09:00 (Horário Padrão de Brasília)`;
  infoContainer.appendChild(timeArea);

  const priceArea = document.createElement("p");
  priceArea.textContent = `Preço: R$250`;
  infoContainer.appendChild(priceArea);

  const observationArea = document.createElement("p");
  observationArea.textContent = `Observação: Corte completo, cabelo e barba`;
  infoContainer.appendChild(observationArea);

  const statusArea = document.createElement("div");
  statusArea.textContent = "Finalizado";
  cardContainer.appendChild(statusArea);

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

  infoContainer.style.flex = "1";
  infoContainer.style.marginRight = "20px";

  statusArea.style.width = "150px";
  statusArea.style.textAlign = "center";
  statusArea.style.fontSize = "20px";

  return cardContainer;
}

export { FinishedCard };
