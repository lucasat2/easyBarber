import { MessageNotification } from "../MessageNotification.js";
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

  const nameInputLabel = document.createElement("label");
  nameInputLabel.setAttribute("for", "serviceName");
  nameInputLabel.innerText = "Nome:";
  modalBody.appendChild(nameInputLabel);

  const nameInput = document.createElement("input");
  nameInput.placeholder = "Nome";
  nameInput.id = "serviceName";
  nameInput.classList.add("serviceNameModalInput");
  modalBody.appendChild(nameInput);

  const priceAndDurationFields = document.createElement("div");
  priceAndDurationFields.classList.add("serviceModalPriceAndDurationFields");
  modalBody.appendChild(priceAndDurationFields);

  const priceInputLabel = document.createElement("label");
  priceInputLabel.setAttribute("for", "servicePrice");
  priceInputLabel.innerText = "Preço:";
  priceInputLabel.classList.add("serviceInputLabel");
  priceAndDurationFields.appendChild(priceInputLabel);

  const priceInput = document.createElement("input");
  priceInput.placeholder = "Preço";
  priceInput.id = "servicePrice";
  priceInput.classList.add("servicePriceAndDurationModalInputs");
  priceInputLabel.appendChild(priceInput);

  const durationInputLabel = document.createElement("label");
  durationInputLabel.setAttribute("for", "serviceDuration");
  durationInputLabel.innerText = "Duração (minutos):";
  durationInputLabel.classList.add("serviceInputLabel");
  priceAndDurationFields.appendChild(durationInputLabel);

  const durationInput = document.createElement("input");
  durationInput.placeholder = "Duração (minutos)";
  durationInput.id = "serviceDuration";
  durationInput.classList.add("servicePriceAndDurationModalInputs");
  durationInputLabel.appendChild(durationInput);

  const descriptionInputLabel = document.createElement("label");
  descriptionInputLabel.setAttribute("for", "serviceDescription");
  descriptionInputLabel.innerText = "Descrição:";
  modalBody.appendChild(descriptionInputLabel);

  const descriptionInput = document.createElement("textarea");
  descriptionInput.placeholder = "Descrição";
  descriptionInput.id = "serviceDescription";
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
    priceInput.value = serviceData.price.replace(".", ",");
    durationInput.value = serviceData.average_duration;
    descriptionInput.value = serviceData.description;
  }

  function saveService(isEditable) {
    const name = nameInput.value.trim();
    const price = priceInput.value.trim().replace(",", ".");
    const duration = durationInput.value.trim();
    const description = descriptionInput.value.trim();

    const method = isEditable ? "PUT" : "POST";
    const body = {
      name,
      description,
      price,
      averageDuration: duration,
    };

    if (isEditable) {
      body.serviceID = serviceData.id;
    }

    fetch("/api/services", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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

        MessageNotification(data.message, "#28a745");
      })
      .catch((error) => {
        MessageNotification(error.message, "#ff6347");
      });
  }

  document.body.appendChild(containerModal);
}

export { ServiceModal };