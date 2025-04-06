import {MessageNotification} from "../MessageNotification.js";

export default async function StaffServicesSelection(staffId) {
	try {
		const response = await fetch("/api/services");

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || "Falha Desconhecida");
		}

		const services = await response.json();

		const associatedRes = await fetch(`/api/staff/serviceStaff/${staffId}`);

		if (!associatedRes.ok) {
			const errorData = await associatedRes.json();
			throw new Error(errorData.error || "Falha Desconhecida");
		}

		const associatedServices = await associatedRes.json();

		const associatedServiceIds = associatedServices.map(
			item => item.service_id
		);

		const serviceStates = {};
		services.forEach(service => {
			serviceStates[service.id] = associatedServiceIds.includes(service.id);
		});

		const div = document.createElement("div");
		Object.assign(div.style, {
			position: "fixed",
			top: "0",
			left: "0",
			width: "100vw",
			height: "100vh",
			backgroundColor: "rgba(0, 0, 0, 0.6)",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			zIndex: "100"
		});

		const modalContent = document.createElement("div");
		Object.assign(modalContent.style, {
			backgroundColor: "#fff",
			padding: "2rem",
			borderRadius: "8px",
			boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
			display: "flex",
			flexDirection: "column",
			gap: "1rem",
			minWidth: "400px",
			maxHeight: "80vh",
			overflowY: "auto",
			position: "relative"
		});

		const title = document.createElement("h2");
		title.textContent = "Selecionar Serviços";
		title.style.marginBottom = "1rem";
		modalContent.appendChild(title);

		const icons = {};

		services.forEach(service => {
			const serviceRow = document.createElement("label");
			(serviceRow.style.userSelect = "none"),
				(serviceRow.style.display = "flex");
			serviceRow.style.justifyContent = "space-between";
			serviceRow.style.alignItems = "center";
			serviceRow.style.cursor = "pointer";
			serviceRow.style.padding = "0.5rem 0";

			const name = document.createElement("span");
			name.textContent = service.name;

			const toggleButton = document.createElement("button");
			Object.assign(toggleButton.style, {
				background: serviceStates[service.id] ? "#dee33e" : "#e74c3c",
				border: "none",
				cursor: "pointer",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "0.25rem",
				borderRadius: "0.5rem"
			});

			const icon = document.createElement("img");
			icon.src = serviceStates[service.id]
				? "../../assets/staff/check.svg"
				: "../../assets/staff/close.svg";
			icon.alt = "Status do serviço";
			icon.style.padding = "5px 10px";

			icons[service.id] = icon;

			toggleButton.appendChild(icon);

			toggleButton.addEventListener("click", () => {
				serviceStates[service.id] = !serviceStates[service.id];
				icon.src = serviceStates[service.id]
					? "../../assets/staff/check.svg"
					: "../../assets/staff/close.svg";
				toggleButton.style.backgroundColor = serviceStates[service.id]
					? "#dee33e"
					: "#e74c3c";
			});

			serviceRow.appendChild(name);
			serviceRow.appendChild(toggleButton);
			modalContent.appendChild(serviceRow);
		});

		const buttonsContainer = document.createElement("div");
		buttonsContainer.style.display = "flex";
		buttonsContainer.style.justifyContent = "flex-end";
		buttonsContainer.style.gap = "1rem";
		buttonsContainer.style.marginTop = "1rem";

		const saveButton = document.createElement("button");
		saveButton.textContent = "Salvar Seleção";
		Object.assign(saveButton.style, {
			padding: "10px 20px",
			backgroundColor: "#dee33e",
			border: "none",
			borderRadius: "4px",
			cursor: "pointer",
			fontSize: "1rem"
		});
		saveButton.addEventListener("click", async () => {
			const promises = [];

			services.forEach(service => {
				const isSelected = serviceStates[service.id];
				const wasAssociated = associatedServiceIds.includes(service.id);

				if (isSelected && !wasAssociated) {
					// Associar novo
					promises.push(
						fetch("/api/staff/associateServices", {
							method: "POST",
							headers: {"Content-Type": "application/json"},
							body: JSON.stringify({staffId, serviceId: service.id})
						})
					);
				} else if (!isSelected && wasAssociated) {
					// Desassociar
					promises.push(
						fetch("/api/staff/disassociateServices", {
							method: "DELETE",
							headers: {"Content-Type": "application/json"},
							body: JSON.stringify({staffId, serviceId: service.id})
						})
					);
				}
			});

			if (promises.length === 0) {
				MessageNotification("Nenhuma alteração feita.", "#6c757d");
				return;
			}

			const responses = await Promise.all(promises);

			const hasError = responses.some(res => !res.ok);

			if (hasError) {
				// Correção no bloco catch de response
				if (!response.ok) {
					const errorData = await response.json().catch(() => ({}));
					throw new Error(errorData?.error || "Falha Desconhecida");
				}

				// Correção no bloco de associatedRes
				if (!associatedRes.ok) {
					const errorData = await associatedRes.json().catch(() => ({}));
					throw new Error(errorData?.error || "Falha Desconhecida");
				}

				// Correção na parte que trata os erros após o Promise.all
				const hasError = responses.some(res => !res.ok);

				if (hasError) {
					const errorRes = responses.find(res => !res.ok);
					const errorData = await errorRes.json().catch(() => ({}));
					throw new Error(errorData?.error || "Falha Desconhecida");
				}
			} else {
				MessageNotification("Serviços atualizados com sucesso!", "#28a745");
				div.remove();
			}
		});

		const cancelButton = document.createElement("button");
		cancelButton.textContent = "Cancelar";
		Object.assign(cancelButton.style, {
			padding: "10px 20px",
			fontSize: "1rem",
			backgroundColor: "#6c757d",
			color: "#fff",
			border: "none",
			borderRadius: "4px",
			cursor: "pointer"
		});

		cancelButton.addEventListener("click", () => {
			div.remove();
		});

		buttonsContainer.appendChild(saveButton);
		buttonsContainer.appendChild(cancelButton);
		modalContent.appendChild(buttonsContainer);

		div.addEventListener("click", e => {
			if (e.target === div) {
				div.remove();
			}
		});

		div.appendChild(modalContent);
		return div;
	} catch (e) {
		MessageNotification(e.message, "#ff6347");
	}
}
