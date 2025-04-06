import { ServiceModal } from "./ServiceModal.js";
import { ServiceDashboard } from "./ServiceDashboard.js";
import { MessageNotification } from "./MessageNotification.js";

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
  servicePriceArea.innerText = `R$: ${serviceData.price}`;
  infoContainer.appendChild(servicePriceArea);

  const serviceDurationArea = document.createElement("p");
  serviceDurationArea.innerText = `Duração: ${serviceData.average_duration} minutos`;
  infoContainer.appendChild(serviceDurationArea);

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
    deleteService(serviceData);
  });

  return cardContainer;
}

function deleteService(serviceData) {
  fetch("/api/services/remove", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      serviceId: serviceData.id,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.error || "Falha Desconhecida");
        });
      }

      return response.json();
    })
    .then((data) => {
      const serviceDashboard = ServiceDashboard();

      const main = document.getElementById("main");
      main.innerHTML = "";
      main.style.padding = "30px";
      main.appendChild(serviceDashboard);

      MessageNotification(data.message, " #28a745");
    })
    .catch((error) => {
      MessageNotification(error.message, "#ff6347");
    });
}

export { ServicesCard };