export default async function StaffServicesSelection(staffId) {
	const response = await fetch("/api/services");
	const services = await response.json();

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

	const serviceStates = {}; // Armazena se o serviço está selecionado ou não

	services.forEach(service => {
		serviceStates[service.id] = false;

		const serviceRow = document.createElement("label");
		(serviceRow.style.userSelect = "none"), (serviceRow.style.display = "flex");
		serviceRow.style.justifyContent = "space-between";
		serviceRow.style.alignItems = "center";
		serviceRow.style.cursor = "pointer";
		serviceRow.style.padding = "0.5rem 0";

		const name = document.createElement("span");
		name.textContent = service.name;

		const toggleButton = document.createElement("button");
		Object.assign(toggleButton.style, {
			background: "#e74c3c",
			border: "none",
			cursor: "pointer",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			padding: "0.25rem",
			borderRadius: "0.5rem"
		});

		const icon = document.createElement("img");
		icon.src = "../../assets/staff/close.svg";
		icon.alt = "Status do serviço";
    icon.style.padding = "5px 10px";

		toggleButton.appendChild(icon);

		toggleButton.addEventListener("click", () => {
			serviceStates[service.id] = !serviceStates[service.id];

			if (serviceStates[service.id]) {
				icon.src = "../../assets/staff/check.svg";
				toggleButton.style.backgroundColor = "#dee33e";
			} else {
				icon.src = "../../assets/staff/close.svg";
				toggleButton.style.backgroundColor = "#e74c3c";
			}
		});

		serviceRow.appendChild(name);
		serviceRow.appendChild(toggleButton);
		modalContent.appendChild(serviceRow);
	});

	// Container de botões
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
		const selected = Object.entries(serviceStates)
			.filter(([_, selected]) => selected)
			.map(([serviceId]) => ({staffId, serviceId}));

		if (selected.length === 0) {
			alert("Selecione ao menos um serviço!");
			return;
		}

		try {
			await Promise.all(
				selected.map(data =>
					fetch("/api/staff/associateServices", {
						method: "POST",
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify(data)
					})
				)
			);

			alert("Serviços associados com sucesso!");
			div.remove();
		} catch (err) {
			alert("Erro ao salvar serviços.");
			console.error(err);
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

	buttonsContainer.appendChild(cancelButton);
	buttonsContainer.appendChild(saveButton);
	modalContent.appendChild(buttonsContainer);

	// Clicar fora do modal fecha
	div.addEventListener("click", e => {
		if (e.target === div) {
			div.remove();
		}
	});

	div.appendChild(modalContent);
	return div;
}
