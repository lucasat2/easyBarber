import { ServiceModal } from "./ServiceModal.js";
import { ServiceDeleteModal } from "./ServiceDeleteModal.js";

function ServicesCard(serviceData) {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("serviceCardContainer");

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("serviceCardInfo");
  cardContainer.appendChild(infoContainer);

  const serviceNameArea = document.createElement("h3");
  serviceNameArea.innerText = serviceData.name;
  infoContainer.appendChild(serviceNameArea);

  const servicePriceArea = document.createElement("p");
  servicePriceArea.innerText = `R$ ${serviceData.price.replace(".", ",")}`;
  servicePriceArea.classList.add("servicePriceArea");
  infoContainer.appendChild(servicePriceArea);

  const serviceDurationArea = document.createElement("p");
  serviceDurationArea.classList.add("serviceDurationArea");
  infoContainer.appendChild(serviceDurationArea);

  const clockIcon = document.createElement("img");
  clockIcon.src = "../../../assets/servicesPage/clockIcon.svg";
  clockIcon.alt = "Relógio";
  clockIcon.classList.add("clockIcon");
  serviceDurationArea.appendChild(clockIcon);

  const durationText = document.createElement("span");
  durationText.innerText = `Duração: ${serviceData.average_duration} minutos`;
  serviceDurationArea.appendChild(durationText);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("serviceCardButtonContainer");
  cardContainer.appendChild(buttonContainer);

  const editButton = document.createElement("button");
  editButton.innerText = "Editar";
  editButton.classList.add("serviceCardEditButton");
  buttonContainer.appendChild(editButton);

  editButton.addEventListener("click", () => {
    ServiceModal(true, serviceData);
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Excluir";
  deleteButton.classList.add("serviceCardDeleteButton");
  buttonContainer.appendChild(deleteButton);

  deleteButton.addEventListener("click", () => {
    ServiceDeleteModal(serviceData);
  });

  return cardContainer;
}

export { ServicesCard };