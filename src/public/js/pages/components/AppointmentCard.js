function AppointmentCard() {
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

  const buttonContainer = document.createElement("div");
  cardContainer.appendChild(buttonContainer);

  const doneButton = document.createElement("button");
  doneButton.textContent = "Realizado";
  buttonContainer.appendChild(doneButton);

  const absentButton = document.createElement("button");
  absentButton.textContent = "Ausente";
  buttonContainer.appendChild(absentButton);

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancelado";
  buttonContainer.appendChild(cancelButton);

  cardContainer.style.display = "flex";
  cardContainer.style.justifyContent = "space-between";
  cardContainer.style.padding = "20px";
  cardContainer.style.marginBottom = "15px";
  cardContainer.style.backgroundColor = "#fff";
  cardContainer.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  cardContainer.style.borderRadius = "8px";
  cardContainer.style.alignItems = "center";
  cardContainer.style.flexWrap = "wrap";
  cardContainer.style.width = "60vw";

  infoContainer.style.flex = "1";
  infoContainer.style.marginRight = "20px";

  buttonContainer.style.display = "flex";
  buttonContainer.style.flexDirection = "column";

  doneButton.style.padding = "10px 0px";
  doneButton.style.width = "150px";
  doneButton.style.backgroundColor = "#9FA324";
  doneButton.style.color = "#fff";
  doneButton.style.border = "none";
  doneButton.style.cursor = "pointer";
  doneButton.style.borderRadius = "5px";
  doneButton.style.marginBottom = "10px";
  doneButton.style.fontSize = "16px";

  doneButton.addEventListener("mouseover", function () {
    doneButton.style.backgroundColor = "#7F821B";
  });
  doneButton.addEventListener("mouseout", function () {
    doneButton.style.backgroundColor = "#9FA324";
  });

  absentButton.style.padding = "10px 0px";
  absentButton.style.width = "150px";
  absentButton.style.backgroundColor = "#A6A6A6";
  absentButton.style.color = "#fff";
  absentButton.style.border = "none";
  absentButton.style.cursor = "pointer";
  absentButton.style.borderRadius = "5px";
  absentButton.style.marginBottom = "10px";
  absentButton.style.fontSize = "16px";

  absentButton.addEventListener("mouseover", function () {
    absentButton.style.backgroundColor = "#7F7F7F";
  });
  absentButton.addEventListener("mouseout", function () {
    absentButton.style.backgroundColor = "#A6A6A6";
  });

  cancelButton.style.padding = "10px 0px";
  cancelButton.style.width = "150px";
  cancelButton.style.backgroundColor = "#dc3545";
  cancelButton.style.color = "#fff";
  cancelButton.style.border = "none";
  cancelButton.style.cursor = "pointer";
  cancelButton.style.borderRadius = "5px";
  cancelButton.style.fontSize = "16px";

  cancelButton.addEventListener("mouseover", function () {
    cancelButton.style.backgroundColor = "#c82333";
  });
  cancelButton.addEventListener("mouseout", function () {
    cancelButton.style.backgroundColor = "#dc3545";
  });

  return cardContainer;
}

export { AppointmentCard };