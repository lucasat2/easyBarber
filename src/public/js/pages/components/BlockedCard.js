function BlockedCard() {
  const cardContainer = document.createElement("div");

  const infoContainer = document.createElement("div");
  cardContainer.appendChild(infoContainer);

  const titleArea = document.createElement("h3");
  titleArea.textContent = "Horário Bloqueado";
  infoContainer.appendChild(titleArea);

  const startDateArea = document.createElement("p");
  startDateArea.textContent = "Data de Ínico: 12/03/2025";
  infoContainer.appendChild(startDateArea);

  const startTimeArea = document.createElement("p");
  startTimeArea.textContent = "Horário de Ínicio: 09:00";
  infoContainer.appendChild(startTimeArea);

  const endDateArea = document.createElement("p");
  endDateArea.textContent = `Data de Fim: 12/03/2025`;
  infoContainer.appendChild(endDateArea);

  const endTimeArea = document.createElement("p");
  endTimeArea.textContent = `Horário de Fim: 09:00`;
  infoContainer.appendChild(endTimeArea);

  const observationArea = document.createElement("p");
  observationArea.textContent = `Obervação: Tava com sono`;
  infoContainer.appendChild(observationArea);

  const buttonContainer = document.createElement("div");
  cardContainer.appendChild(buttonContainer);

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Desbloquear";
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

export { BlockedCard };