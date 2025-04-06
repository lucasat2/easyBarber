import StaffInformation from "./StaffInformation.js";
import StaffShiftEditor from "./StaffSchedule.js";
import StaffServicesSelection from "./StaffServicesSelection.js";
import StaffDelete from "./StaffDelete.js";

export default async function StaffManager() {
	const div = document.createElement("div");
	div.style.display = "flex";
	div.style.flexDirection = "column";
	div.style.gap = "2rem";

	// Botão de cadastro
	const createButton = document.createElement("button");
	createButton.textContent = "Cadastrar um novo Funcionário";
	Object.assign(createButton.style, {
		backgroundColor: "#DEE33E",
		color: "black",
		padding: "10px",
		border: "none",
		width: "100%",
		fontSize: "16px",
		fontWeight: "700",
		cursor: "pointer",
		borderRadius: "0.5rem"
	});

	// Evento ainda vazio
	createButton.addEventListener("click", async () => {
		const root = document.getElementById("root");
		const section = await StaffInformation({}, loadStaff);

		root.appendChild(section);
	});

	div.appendChild(createButton);

	// Lista de funcionários
	const staffList = document.createElement("div");
	staffList.style.display = "flex";
	staffList.style.flexDirection = "column";
	staffList.style.gap = "10px";
	staffList.style.background = "white";
	staffList.style.padding = "1rem 2rem";

	div.appendChild(staffList);

	// Função para criar um item de funcionário
	function createStaffItem({id, name, surname}) {
		const item = document.createElement("div");
		Object.assign(item.style, {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flexWrap: "wrap",
			padding: "10px"
		});

		const nameDiv = document.createElement("div");
		nameDiv.textContent = `${name} ${surname}`;
		nameDiv.style.fontWeight = "bold";

		const buttonGroup = document.createElement("div");
		buttonGroup.style.display = "flex";
		buttonGroup.style.gap = "0.5rem";

		["Horários", "Serviços", "Editar", "Deletar"].forEach(label => {
			const btn = document.createElement("button");
			btn.textContent = label;

			const isDelete = label === "Deletar";

			const isEdit = label === "Editar";

			Object.assign(btn.style, {
				backgroundColor: "#DEE33E",
				color: "black",
				padding: "7px 15px",
				border: "none",
				width: "fit-content",
				fontSize: "16px",
				cursor: "pointer",
				borderRadius: "0.5rem"
			});

			if (isEdit) {
				btn.style.backgroundColor = "#3498DB";
				const deleteIcon = document.createElement("img");

				// Use the absolute path here:
				deleteIcon.src = "../../assets/staff/edit.svg";
				deleteIcon.alt = "Deletar";
				deleteIcon.style.width = "20px";
				deleteIcon.style.height = "20px";

				btn.textContent = "";
				btn.appendChild(deleteIcon);
			}

			if (isDelete) {
				btn.style.backgroundColor = "#E74C3C";
				const deleteIcon = document.createElement("img");

				// Use the absolute path here:
				deleteIcon.src = "../../assets/staff/delete.svg";
				deleteIcon.alt = "Deletar";
				deleteIcon.style.width = "20px";
				deleteIcon.style.height = "20px";

				btn.textContent = "";
				btn.appendChild(deleteIcon);
			}

			btn.addEventListener("click", async () => {
				switch (label) {
					case "Editar":
						try {
							const res = await fetch(`/api/staff/${id}`);

							if (!res.ok) {
								const errorData = await res.json();
								throw new Error(errorData.error || "Falha Desconhecida");
							}

							const data = await res.json();

							const modal = await StaffInformation(data, loadStaff);

							const root = document.getElementById("root");

							root.appendChild(modal);
						} catch (err) {
							MessageNotification(err.message, "#ff6347");
						}
						break;

					case "Horários":
						try {
							const modal = await StaffShiftEditor(id);

							const root = document.getElementById("root");

							root.appendChild(modal);
						} catch (err) {
							console.error("Erro ao carregar funcionário:", err);
							alert("Erro ao carregar os dados do funcionário.");
						}
						break;

					case "Serviços":
						try {
							const modal = await StaffServicesSelection(id);

							const root = document.getElementById("root");

							root.appendChild(modal);
						} catch (err) {
							console.error("Erro ao carregar serviço:", err);
							alert("Erro ao carregar os dados do serviço.");
						}
						break;

					case "Deletar":
						try {
							const modal = await StaffDelete(id, loadStaff);

							const root = document.getElementById("root");

							root.appendChild(modal);
						} catch (err) {
							console.error("Erro ao carregar deletar:", err);
							alert("Erro ao deletar.");
						}
						break;
				}
			});

			buttonGroup.appendChild(btn);
		});

		item.appendChild(nameDiv);
		item.appendChild(buttonGroup);

		return item;
	}

	// Carrega os funcionários
	async function loadStaff() {
		try {
			const res = await fetch("/api/staff");
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.error || "Falha Desconhecida");
			}

			const data = await res.json();
			staffList.innerHTML = "";

			if (data.response.length === 0) {
				const div = document.createElement("div");
				Object.assign(div.style, {
					display: "flex",
					flexDirection: "column",
					rowGap: "10px",
					justifyContent: "center",
					alignItems: "center",
					fontFamily: "'Fredoka', sans-serif",
					fontSize: "50px",
					color: "#9fa324",
					height: "calc(77vh - 108px)"
				});

				const svg = document.createElement("img");
				svg.src = "../../assets/staff/person_cancel.svg";
				svg.style.width = "100px";
				svg.style.height = "100px";

				div.appendChild(svg);

				const message = document.createElement("p");
				message.innerHTML = "Nenhum funcionário cadastrado";

				div.appendChild(message);
				staffList.appendChild(div);
				return;
			}

			data.response.forEach(staff => {
				const staffItem = createStaffItem(staff);
				staffList.appendChild(staffItem);
			});
		} catch (err) {
			console.error("Erro ao buscar funcionários", err);
			MessageNotification(err.message, "#ff6347");
		}
	}

	loadStaff();

	return div;
}
