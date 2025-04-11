import {MessageNotification} from "../MessageNotification.js";

function EditUserProfileModal() {
	const containerModal = document.createElement("div");
	containerModal.classList.add("editUserProfileModalMainContainer");

	containerModal.addEventListener("click", event => {
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
	saveButton.addEventListener("click", async () => {
		await updateUserData();
	});

	modalBody.appendChild(saveButton);

	async function updateUserData() {
		try {
			const response = await fetch("/api/users", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
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
					password: passwordInput.value
				})
			});

			if (!response.ok) {
				const errorData = await response.json();

				throw new Error(errorData.error || "Falha Desconhecida");
			}

			const data = await response.json();

			MessageNotification(data.message, "#28a745");

			const answer = await fetch("/api/users/company");

			if (!answer.ok) {
				throw new Error(
					"Falha ao atualizar o nome da empresa no perfil superior"
				);
			}

			const result = await answer.json();

			document.getElementById("username").innerText = result.name;
		} catch (error) {
			MessageNotification(error.message, "#ff6347");
		}
	}

	async function getInfo() {
		try {
			const response = await fetch("/api/users/company/info");

			if (!response.ok) {
				const errorData = await response.json();

				throw new Error(errorData.error || "Falha Desconhecida");
			}

			const data = await response.json();

			companyNameInput.value = data.name || "";
			cnpjInput.value = data.cnpj || "";
			phoneNumberInput.value = data.phoneNumber || "";
			stateInput.value = data.state || "";
			cityInput.value = data.city || "";
			addressInput.value = data.street || "";
			numberInput.value = data.number || "";
			postalCodeInput.value = data.postalCode || "";
			emailInput.value = data.email || "";
			passwordInput.value = "";
		} catch (error) {
			MessageNotification(error.message, "#ff6347");
		}
	}
	getInfo();

	document.body.appendChild(containerModal);
}

export {EditUserProfileModal};
