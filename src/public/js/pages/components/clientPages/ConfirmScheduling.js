import ServicesPage from "./ServicesPage.js";
import {MessageNotification} from "../MessageNotification.js";
import navigateTo from "./NavigateTo.js";

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

export default function ConfirmScheduling(obj) {
	const div = document.createElement("div");
	div.style.width = "100%";
	div.style.maxWidth = "1200px";
	div.style.margin = "0 auto";
	div.style.padding = "20px";
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

	const pStaff = document.createElement("h3");
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

	// Serviço (nome)
	const nameWrapper = document.createElement("div");
	nameWrapper.style.display = "flex";
	nameWrapper.style.gap = "0.5rem";

	const nameText = document.createElement("h3");
	nameText.textContent = obj.objService.name;

	nameWrapper.style.display = "flex";
	nameWrapper.style.alignItems = "center";
	nameWrapper.appendChild(nameText);

	// Tempo
	const timeWrapper = document.createElement("div");
	timeWrapper.style.display = "flex";
	timeWrapper.style.gap = "0.5rem";

	const timeIcon = document.createElement("img");
	timeIcon.src = "../assets/externalSchedulingPage/time.svg";
	timeIcon.alt = "Ícone tempo";
	timeIcon.style.width = "24px";

	const timeText = document.createElement("p");
	timeText.textContent = `Tempo: ${obj.objService.time} min`;

	timeWrapper.style.display = "flex";
	timeWrapper.style.alignItems = "center";
	timeWrapper.appendChild(timeIcon);
	timeWrapper.appendChild(timeText);

	// Custo
	const costWrapper = document.createElement("div");
	costWrapper.style.display = "flex";
	costWrapper.style.gap = "0.5rem";

	const costIcon = document.createElement("img");
	costIcon.src = "../assets/externalSchedulingPage/payments.svg";
	costIcon.alt = "Ícone custo";
	costIcon.style.width = "24px";

	const costText = document.createElement("p");
	costText.textContent = `R$ ${obj.objService.cost
		.toString()
		.replace(".", ",")}`;

	costWrapper.style.display = "flex";
	costWrapper.style.alignItems = "center";
	costWrapper.appendChild(costIcon);
	costWrapper.appendChild(costText);

	// Junta tudo no divService
	divService.appendChild(nameWrapper);
	divService.appendChild(timeWrapper);
	divService.appendChild(costWrapper);

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
	obsInput.style.resize = "vertical";

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
		}

		if (errors.length > 0) {
			MessageNotification(
				`Preencha os campos corretamente: ${errors.join(", ")}.`,
				"#ff6347"
			);
		} else {
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
