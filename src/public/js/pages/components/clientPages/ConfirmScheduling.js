import ServicesPage from "./ServicesPage.js";
import {MessageNotification} from "../MessageNotification.js";

function navigateTo(pageFunction) {
	const root = document.getElementById("root");
	root.innerHTML = "";
	root.appendChild(pageFunction());
}

function createInput(labelText, type, id) {
	const wrapper = document.createElement("div");
	wrapper.style.marginBottom = "15px";

	const label = document.createElement("label");
	label.textContent = labelText;
	label.setAttribute("for", id);
	label.style.display = "block";
	label.style.marginBottom = "5px";

	const input = document.createElement("input");
	input.type = type;
	input.id = id;
	input.name = id;
	input.style.width = "100%";
	input.style.padding = "8px";
	input.style.border = "1px solid #ccc";
	input.style.borderRadius = "5px";
	input.style.boxSizing = "border-box";

	wrapper.appendChild(label);
	wrapper.appendChild(input);

	return wrapper;
}

// --- Regex Validation Functions ---
function isValidEmail(email) {
	// Basic email regex (you might want to use a more robust one)
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
	// Phone number regex for (XX) XXXXX-XXXX format
	const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
	return phoneRegex.test(phoneNumber);
}

export default function ConfirmScheduling(obj) {
	const div = document.createElement("div");
	div.style.width = "100%";
	div.style.maxWidth = "1200px";
	div.style.margin = "0 auto";
	div.style.padding = "20px";
	div.style.fontFamily = "Arial, sans-serif";
	div.style.display = "flex";
	div.style.flexWrap = "wrap";
	div.style.gap = "20px";
	div.style.justifyContent = "center";

	const containerCheck = document.createElement("div");
	containerCheck.style.marginBottom = "0";
	containerCheck.style.border = "1px solid #ccc";
	containerCheck.style.borderRadius = "8px";
	containerCheck.style.padding = "20px";
	containerCheck.style.backgroundColor = "#f9f9f9";
	containerCheck.style.flex = "1";
	containerCheck.style.minWidth = "300px";

	const pStaff = document.createElement("p");
	pStaff.style.fontWeight = "bold";
	pStaff.style.marginBottom = "10px";
	pStaff.innerHTML = `Profissional: ${obj.objStaff.name}`;

	const divDate = document.createElement("div");
	divDate.style.marginBottom = "10px";
	divDate.innerHTML = `<p>Data: ${obj.dateDaySelected
		.split("-")
		.reverse()
		.join("/")}</p> <p>Hora: ${obj.hourSelected}</p>`;

	const divService = document.createElement("div");
	divService.innerHTML = `<h3>${obj.objService.name}</h3> <p>Tempo: ${obj.objService.time} min</p> <p>R$ ${obj.objService.cost}</p>`;

	containerCheck.appendChild(pStaff);
	containerCheck.appendChild(divDate);
	containerCheck.appendChild(divService);

	const containerConfirm = document.createElement("div");
	containerConfirm.style.border = "1px solid #ccc";
	containerConfirm.style.borderRadius = "8px";
	containerConfirm.style.padding = "20px";
	containerConfirm.style.backgroundColor = "#f9f9f9";
	containerConfirm.style.flex = "1";
	containerConfirm.style.minWidth = "300px";

	const nameInput = createInput("Nome:", "text", "name");
	const emailInput = createInput("E-mail:", "email", "email");
	const phoneInput = createInput("Celular:", "tel", "phone");

	const obsWrapper = document.createElement("div");
	obsWrapper.style.marginBottom = "15px";

	const obsLabel = document.createElement("label");
	obsLabel.textContent = "Observação:";
	obsLabel.setAttribute("for", "obs");
	obsLabel.style.display = "block";
	obsLabel.style.marginBottom = "5px";

	const obsInput = document.createElement("textarea");
	obsInput.id = "obs";
	obsInput.name = "obs";
	obsInput.style.width = "100%";
	obsInput.style.padding = "8px";
	obsInput.style.border = "1px solid #ccc";
	obsInput.style.borderRadius = "5px";
	obsInput.style.height = "80px";
	obsInput.style.boxSizing = "border-box";

	obsWrapper.appendChild(obsLabel);
	obsWrapper.appendChild(obsInput);

	const buttonContainer = document.createElement("div");
	buttonContainer.style.display = "flex";
	buttonContainer.style.justifyContent = "space-between";
	buttonContainer.style.marginTop = "20px";

	const back = document.createElement("div");
	back.innerText = "Voltar";
	back.style.background = "#EB4335";
	back.style.padding = "10px 20px";
	back.style.fontWeight = "700";
	back.style.textAlign = "center";
	back.style.cursor = "pointer";
	back.style.borderRadius = "8px";
	back.style.width = "fit-content";
	back.style.color = "white";

	back.addEventListener("mouseover", () => {
		back.style.background = "#ff3725";
	});

	back.addEventListener("mouseout", () => {
		back.style.background = "#EB4335";
	});

	back.addEventListener("click", () => {
		navigateTo(ServicesPage);
	});

	const buttonConfirm = document.createElement("div");
	buttonConfirm.innerText = "Confirmar";
	buttonConfirm.style.background = "#DEE33E";
	buttonConfirm.style.padding = "10px 20px";
	buttonConfirm.style.fontWeight = "700";
	buttonConfirm.style.textAlign = "center";
	buttonConfirm.style.cursor = "pointer";
	buttonConfirm.style.borderRadius = "8px";
	buttonConfirm.style.width = "fit-content";

	buttonConfirm.addEventListener("mouseover", () => {
		buttonConfirm.style.background = "#ffd700";
	});

	buttonConfirm.addEventListener("mouseout", () => {
		buttonConfirm.style.background = "#DEE33E";
	});

	// --- Error Message Container ---
	const errorContainer = document.createElement("div");
	errorContainer.style.color = "red";
	errorContainer.style.marginTop = "10px";
	errorContainer.style.display = "none"; // Initially hidden
	containerConfirm.appendChild(errorContainer);

	// --- Success Message Container ---
	const successContainer = document.createElement("div");
	successContainer.style.color = "green";
	successContainer.style.marginTop = "10px";
	successContainer.style.display = "none";
	containerConfirm.appendChild(successContainer);

	buttonConfirm.addEventListener("click", () => {
		const nameValue = nameInput.querySelector("input").value.trim();
		const emailValue = emailInput.querySelector("input").value.trim();
		const phoneValue = phoneInput.querySelector("input").value.trim();
		const obsValue = obsInput.value.trim();

		let errors = [];

		if (!nameValue) {
			errors.push("Nome");
		}
		if (!emailValue) {
			errors.push("E-mail");
		} else if (!isValidEmail(emailValue)) {
			errors.push("E-mail inválido");
		}
		if (!phoneValue) {
			errors.push("Celular");
		} else if (!isValidPhoneNumber(phoneValue)) {
			errors.push("Celular inválido");
		}

		if (errors.length > 0) {
			errorContainer.textContent = `Preencha os campos corretamente: ${errors.join(
				", "
			)}.`;
			errorContainer.style.display = "block";
			successContainer.style.display = "none"; // Hide success message if there are errors
		} else {
			errorContainer.style.display = "none";
			// --- Data to be sent ---
			const dataToSend = {
				idCompany: obj.objCompany.idCompany,
				idStaff: obj.objStaff.id,
				idService: obj.objService.id,
				date: obj.dateDaySelected,
				clientName: nameValue,
				clientEmail: emailValue,
				clientPhoneNumber: phoneValue,
				startTime: obj.hourSelected,
				observation: obsValue
			};

			// --- Fetch ---
			fetch("/api/customer/company/services/staff/schedule/appointments", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(dataToSend)
			})
				.then(response => {
					if (!response.ok) {
						return response.json().then(errorData => {
							throw new Error(errorData.error || "Falha desconhecida");
						});
					}
					return response.json();
				})
				.then(data => {
					MessageNotification(data.message, "#28a745");
				})
				.catch(error => {
					MessageNotification(error.message, "#ff6347");
				});
		}
	});

	containerConfirm.appendChild(nameInput);
	containerConfirm.appendChild(emailInput);
	containerConfirm.appendChild(phoneInput);
	containerConfirm.appendChild(obsWrapper);

	buttonContainer.appendChild(buttonConfirm);
	buttonContainer.appendChild(back);
	containerConfirm.appendChild(buttonContainer);

	div.appendChild(containerCheck);
	div.appendChild(containerConfirm);

	return div;
}
