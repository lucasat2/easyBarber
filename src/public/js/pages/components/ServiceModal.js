import { MessageNotification } from "./MessageNotification.js";
import { ServiceDashboard } from "./ServiceDashboard.js";

function ServiceModal(isEdit, serviceData) {
  const containerModal = document.createElement("div");
  containerModal.classList.add("serviceModalMainContainer");

  containerModal.addEventListener("click", (event) => {
    if (event.target === containerModal) {
      containerModal.remove();
    }
  });

  const modalContent = document.createElement("div");
  modalContent.classList.add("serviceModalContent");
  containerModal.appendChild(modalContent);

  const modalHeader = document.createElement("div");
  modalHeader.classList.add("serviceModalHeader");
  modalContent.appendChild(modalHeader);

  const closeButton = document.createElement("div");
  closeButton.innerHTML = "&#10006;";
  closeButton.classList.add("serviceModalCloseButton");
  modalHeader.appendChild(closeButton);

  closeButton.addEventListener("click", () => containerModal.remove());

  const modalBody = document.createElement("div");
  modalBody.classList.add("serviceModalBody");
  modalContent.appendChild(modalBody);

  const nameInput = document.createElement("input");
  nameInput.placeholder = "Nome";
  nameInput.classList.add("serviceNameModalInput");
  modalBody.appendChild(nameInput);

  const priceAndDurationFields = document.createElement("div");
  priceAndDurationFields.classList.add("serviceModalPriceAndDurationFields");
  modalBody.appendChild(priceAndDurationFields);

  const priceInput = document.createElement("input");
  priceInput.placeholder = "Preço";
  priceInput.classList.add("servicePriceAndDurationModalInputs");
  priceAndDurationFields.appendChild(priceInput);

  const durationInput = document.createElement("input");
  durationInput.placeholder = "Duração (minutos)";
  durationInput.classList.add("servicePriceAndDurationModalInputs");
  priceAndDurationFields.appendChild(durationInput);

  const descriptionInput = document.createElement("textarea");
  descriptionInput.placeholder = "Descrição";
  descriptionInput.classList.add("serviceModalTextArea");
  modalBody.appendChild(descriptionInput);

  const saveButton = document.createElement("button");
  saveButton.innerText = "Salvar";
  saveButton.classList.add("serviceModalSaveButton");
  modalBody.appendChild(saveButton);
  saveButton.addEventListener("click", () => {
    saveService(isEdit);
  });

  if (isEdit) {
    nameInput.value = serviceData.name;
    priceInput.value = serviceData.price;
    durationInput.value = serviceData.average_duration;
    descriptionInput.value = serviceData.description;
  }

  function saveService(isEditable) {
    if (isEditable) {
      fetch("/api/services", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceID: serviceData.id,
          name: nameInput.value,
          description: descriptionInput.value,
          price: priceInput.value,
          averageDuration: durationInput.value,
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
          containerModal.remove();

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
    } else {
      fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameInput.value,
          description: descriptionInput.value,
          price: priceInput.value,
          averageDuration: durationInput.value,
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
          containerModal.remove();

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
  }

  document.body.appendChild(containerModal);
}

export { ServiceModal };