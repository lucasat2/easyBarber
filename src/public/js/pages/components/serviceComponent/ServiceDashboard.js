import {MessageNotification} from "../MessageNotification.js";
import {ServicesCard} from "./ServiceCard.js";
import {ServiceModal} from "./ServiceModal.js";

function ServiceDashboard() {
	const mainContainer = document.createElement("div");
	mainContainer.classList.add("serviceDashboardMainContainer");

	const registerStaffButton = document.createElement("button");
	registerStaffButton.innerText = "Cadastrar um novo serviço";
	registerStaffButton.classList.add("registerStaffButton");
	mainContainer.appendChild(registerStaffButton);

	registerStaffButton.addEventListener("click", () => {
		ServiceModal(false, {});
	});

	fetch("/api/services")
		.then(response => {
			if (!response.ok) {
				return response.json().then(errorData => {
					throw new Error(errorData.error || "Falha Desconhecida");
				});
			}

			return response.json();
		})
		.then(data => {
			if (data.length === 0) {
				mainContainer.style.backgroundColor = "#fff";

				const noDataContainer = document.createElement("div");
				noDataContainer.classList.add("noDataContainer");
				mainContainer.appendChild(noDataContainer);

				const noDataImage = document.createElement("div");
				noDataImage.classList.add("noDataImage");
				noDataContainer.appendChild(noDataImage);

				const noDataTitle = document.createElement("div");
				noDataTitle.innerText = "Sem serviços cadastrados";
				noDataTitle.classList.add("noDataTitle");
				noDataContainer.appendChild(noDataTitle);
			}

			for (let j = 0; j < data.length; j++) {
				const serviceCard = ServicesCard(data[j]);
				mainContainer.appendChild(serviceCard);
			}
		})
		.catch(error => {
			MessageNotification(error.message, "#ff6347");
		});

	return mainContainer;
}

export {ServiceDashboard};
