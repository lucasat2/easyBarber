import {MessageNotification} from "../MessageNotification.js";

// Função reutilizável para criar campos com label
function createLabeledInput(placeholder) {
	const wrapper = document.createElement("label");
	wrapper.classList.add("editUserProfileModalInputWrapper");

	const p = document.createElement("p");
  p.innerText = `${placeholder}:`

	const input = document.createElement("input");
	input.placeholder = placeholder;
	input.classList.add("editUserProfileModalInputs");

	wrapper.appendChild(p);
	wrapper.appendChild(input);

	return {wrapper, input};
}

function EditUserProfileModal() {
	const containerModal = document.createElement("div");
	containerModal.classList.add("editUserProfileModalMainContainer");

	// Fecha o modal clicando fora do conteúdo
	containerModal.addEventListener("click", event => {
		if (event.target === containerModal) containerModal.remove();
	});

	// Estrutura do modal
	const modalContent = document.createElement("div");
	modalContent.classList.add("editUserProfileModalContent");
	containerModal.appendChild(modalContent);

	const modalHeader = document.createElement("div");
	modalHeader.classList.add("editUserProfileModalHeader");
	modalContent.appendChild(modalHeader);

	const closeButton = document.createElement("div");
	closeButton.innerHTML = "&#10006;";
	closeButton.classList.add("editUserProfileModalCloseButton");
	closeButton.addEventListener("click", () => containerModal.remove());
	modalHeader.appendChild(closeButton);

	const modalBody = document.createElement("div");
	modalBody.classList.add("editUserProfileModalBody");
	modalContent.appendChild(modalBody);

	const modalTitle = document.createElement("div");
	modalTitle.innerText = "Editar";
	modalTitle.classList.add("editUserProfileModalTitle");
	modalBody.appendChild(modalTitle);

	// Campos do formulário
	const fields = [
		{label: "Nome da Empresa", ref: "companyName"},
		{label: "CNPJ", ref: "cnpj"},
		{label: "Telefone", ref: "phoneNumber"},
		{label: "Estado", ref: "state"},
		{label: "Cidade", ref: "city"},
		{label: "Endereço", ref: "address"},
		{label: "Número", ref: "number"},
		{label: "CEP", ref: "postalCode"},
		{label: "E-mail", ref: "email"},
		{label: "Senha", ref: "password"}
	];

	const inputs = {};

	for (let i = 0; i < fields.length; i += 2) {
		const row = document.createElement("div");
		row.classList.add("editUserProfileModalFields");

		[fields[i], fields[i + 1]].forEach(field => {
			if (!field) return;
			const {wrapper, input} = createLabeledInput(field.label,);
			inputs[field.ref] = input;
			row.appendChild(wrapper);
		});

		modalBody.appendChild(row);
	}

	// Botão de salvar
	const saveButton = document.createElement("button");
	saveButton.innerText = "Salvar";
	saveButton.classList.add("editUserProfileModalSaveButton");
	saveButton.addEventListener("click", async () => {
		await updateUserData();
	});
	modalBody.appendChild(saveButton);

	// Função para salvar as informações
	async function updateUserData() {
		try {
			const response = await fetch("/api/users", {
				method: "PUT",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({
					name: inputs.companyName.value,
					cnpj: inputs.cnpj.value,
					phoneNumber: inputs.phoneNumber.value,
					state: inputs.state.value,
					city: inputs.city.value,
					street: inputs.address.value,
					number: inputs.number.value,
					postalCode: inputs.postalCode.value,
					email: inputs.email.value,
					password: inputs.password.value
				})
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Falha Desconhecida");
			}

			const data = await response.json();
			MessageNotification(data.message, "#28a745");

			const profileUpdate = await fetch("/api/users/company");
			if (!profileUpdate.ok) {
				throw new Error("Falha ao atualizar o nome da empresa no topo");
			}

			const result = await profileUpdate.json();
			document.getElementById("username").innerText = result.name;
		} catch (error) {
			MessageNotification(error.message, "#ff6347");
		}
	}

	// Carrega as informações existentes
	async function getInfo() {
		try {
			const response = await fetch("/api/users/company/info");
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Falha Desconhecida");
			}

			const data = await response.json();
			inputs.companyName.value = data.name || "";
			inputs.cnpj.value = data.cnpj || "";
			inputs.phoneNumber.value = data.phoneNumber || "";
			inputs.state.value = data.state || "";
			inputs.city.value = data.city || "";
			inputs.address.value = data.street || "";
			inputs.number.value = data.number || "";
			inputs.postalCode.value = data.postalCode || "";
			inputs.email.value = data.email || "";
			inputs.password.value = "";
		} catch (error) {
			MessageNotification(error.message, "#ff6347");
		}
	}

	getInfo();
	document.body.appendChild(containerModal);
}

export {EditUserProfileModal};
