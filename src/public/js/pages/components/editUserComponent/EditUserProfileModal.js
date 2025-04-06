import { MessageNotification } from "../MessageNotification.js";

function EditUserProfileModal() {
  const containerModal = document.createElement("div");
  containerModal.classList.add("editUserProfileModalMainContainer");

  containerModal.addEventListener("click", (event) => {
    if (event.target === containerModal) {
      containerModal.remove();
    }
  });

  const modalContent = document.createElement("div");
  modalContent.classList.add("editUserProfileModalContent");
  containerModal.appendChild(modalContent);

  const modalHeader = document.createElement("div");
  modalHeader.classList.add("editUserProfileModalHeader");
  modalContent.appendChild(modalHeader);

  const closeButton = document.createElement("div");
  closeButton.innerHTML = "&#10006;";
  closeButton.classList.add("editUserProfileModalCloseButton");
  modalHeader.appendChild(closeButton);

  closeButton.addEventListener("click", () => containerModal.remove());

  const modalBody = document.createElement("div");
  modalBody.classList.add("editUserProfileModalBody");
  modalContent.appendChild(modalBody);

  const modalTitle = document.createElement("div");
  modalTitle.innerText = "Editar";
  modalTitle.classList.add("editUserProfileModalTitle");
  modalBody.appendChild(modalTitle);

  const companyNameAndCnpjFields = document.createElement("div");
  companyNameAndCnpjFields.classList.add("editUserProfileModalFields");
  modalBody.appendChild(companyNameAndCnpjFields);

  const companyNameInput = document.createElement("input");
  companyNameInput.placeholder = "Nome da Empresa";
  companyNameInput.classList.add("editUserProfileModalInputs");
  companyNameAndCnpjFields.appendChild(companyNameInput);

  const cnpjInput = document.createElement("input");
  cnpjInput.placeholder = "CNPJ";
  cnpjInput.classList.add("editUserProfileModalInputs");
  companyNameAndCnpjFields.appendChild(cnpjInput);

  const phoneNumberAndStateFields = document.createElement("div");
  phoneNumberAndStateFields.classList.add("editUserProfileModalFields");
  modalBody.appendChild(phoneNumberAndStateFields);

  const phoneNumberInput = document.createElement("input");
  phoneNumberInput.placeholder = "Telefone";
  phoneNumberInput.classList.add("editUserProfileModalInputs");
  phoneNumberAndStateFields.appendChild(phoneNumberInput);

  const stateInput = document.createElement("input");
  stateInput.placeholder = "Estado";
  stateInput.classList.add("editUserProfileModalInputs");
  phoneNumberAndStateFields.appendChild(stateInput);

  const cityAndAddressFields = document.createElement("div");
  cityAndAddressFields.classList.add("editUserProfileModalFields");
  modalBody.appendChild(cityAndAddressFields);

  const cityInput = document.createElement("input");
  cityInput.placeholder = "Cidade";
  cityInput.classList.add("editUserProfileModalInputs");
  cityAndAddressFields.appendChild(cityInput);

  const addressInput = document.createElement("input");
  addressInput.placeholder = "Endereço";
  addressInput.classList.add("editUserProfileModalInputs");
  cityAndAddressFields.appendChild(addressInput);

  const numberAndPostalCodeFields = document.createElement("div");
  numberAndPostalCodeFields.classList.add("editUserProfileModalFields");
  modalBody.appendChild(numberAndPostalCodeFields);

  const numberInput = document.createElement("input");
  numberInput.placeholder = "Número";
  numberInput.classList.add("editUserProfileModalInputs");
  numberAndPostalCodeFields.appendChild(numberInput);

  const postalCodeInput = document.createElement("input");
  postalCodeInput.placeholder = "CEP";
  postalCodeInput.classList.add("editUserProfileModalInputs");
  numberAndPostalCodeFields.appendChild(postalCodeInput);

  const emailAndPasswordFields = document.createElement("div");
  emailAndPasswordFields.classList.add("editUserProfileModalFields");
  modalBody.appendChild(emailAndPasswordFields);

  const emailInput = document.createElement("input");
  emailInput.placeholder = "E-mail";
  emailInput.classList.add("editUserProfileModalInputs");
  emailAndPasswordFields.appendChild(emailInput);

  const passwordInput = document.createElement("input");
  passwordInput.placeholder = "Senha";
  passwordInput.classList.add("editUserProfileModalInputs");
  emailAndPasswordFields.appendChild(passwordInput);

  const saveButton = document.createElement("button");
  saveButton.innerText = "Salvar";
  saveButton.classList.add("editUserProfileModalSaveButton");
  saveButton.addEventListener("click", updateUserData);
  modalBody.appendChild(saveButton);

  function updateUserData() {
    fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: companyNameInput.value,
        cnpj: cnpjInput.value,
        phoneNumber: phoneNumberInput.value,
        state: stateInput.value,
        city: cityInput.value,
        street: addressInput.value,
        number: numberInput.value,
        postalCode: postalCodeInput.value,
        email: emailInput.value,
        password: passwordInput.value,
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
        companyNameInput.value = "";
        cnpjInput.value = "";
        phoneNumberInput.value = "";
        stateInput.value = "";
        cityInput.value = "";
        addressInput.value = "";
        numberInput.value = "";
        postalCodeInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";

        MessageNotification(data.message, " #28a745");
      })
      .catch((error) => {
        companyNameInput.value = "";
        cnpjInput.value = "";
        phoneNumberInput.value = "";
        stateInput.value = "";
        cityInput.value = "";
        addressInput.value = "";
        numberInput.value = "";
        postalCodeInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";

        MessageNotification(error.message, "#ff6347");
      });
  }

  document.body.appendChild(containerModal);
}

export { EditUserProfileModal };