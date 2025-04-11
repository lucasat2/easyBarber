import {
	fetchStaff,
	fetchServices,
	fetchAppointmentsByEmployee
} from "../fetchData.js";
import {MessageNotification} from "../MessageNotification.js";
import {
	setGlobalAppointments,
	getEditedCurrentTime,
	getSelectedEmployeeId
} from "../setAndGetGlobalVariables.js";
import {SchedulingTimelineDiv} from "./SchedulingTimelineContainer.js";

function createModal() {
	const overlay = document.createElement("div");
	overlay.classList.add("appointmentModalOverlay");

	const modal = document.createElement("div");
	modal.classList.add("appointmentModal");

	const toggleContainer = document.createElement("div");
	toggleContainer.classList.add("appointmentToggleContainer");

	const btnAppoint = document.createElement("button");
	btnAppoint.textContent = "Agendar novo horário";
	btnAppoint.classList.add("appointmentToggleActive");

	const btnBlock = document.createElement("button");
	btnBlock.textContent = "Bloquear um horário";
	btnBlock.classList.add("appointmentToggleInactive");

	const formContainer = document.createElement("div");

	btnAppoint.addEventListener("click", async () => {
		updateToggle("agendar");
		renderForm("agendar");
	});

	btnBlock.addEventListener("click", async () => {
		updateToggle("bloquear");
		renderForm("bloquear");
	});

	function updateToggle(mode) {
		if (mode === "agendar") {
			btnAppoint.classList.add("appointmentToggleActive");
			btnAppoint.classList.remove("appointmentToggleInactive");
			btnBlock.classList.add("appointmentToggleInactive");
			btnBlock.classList.remove("appointmentToggleActive");
		} else if (mode === "bloquear") {
			btnBlock.classList.add("appointmentToggleActive");
			btnBlock.classList.remove("appointmentToggleInactive");
			btnAppoint.classList.add("appointmentToggleInactive");
			btnAppoint.classList.remove("appointmentToggleActive");
		}
	}

	let renderId = 0;

	async function renderForm(mode) {
		const currentId = ++renderId;
		formContainer.innerHTML = "";

		let form;
		if (mode === "agendar") {
			form = await createApointForm();
		} else if (mode === "bloquear") {
			form = await createBlockForm();
		}

		if (currentId === renderId) {
			formContainer.innerHTML = "";
			formContainer.appendChild(form);
		}
	}

	toggleContainer.appendChild(btnAppoint);
	toggleContainer.appendChild(btnBlock);

	modal.appendChild(toggleContainer);
	modal.appendChild(formContainer);

	renderForm("agendar");
	overlay.appendChild(modal);
	document.body.appendChild(overlay);

	overlay.addEventListener("click", e => {
		if (e.target === overlay) {
			document.body.removeChild(overlay);
		}
	});
}

function createField(labelText, element) {
	const label = document.createElement("label");
	label.textContent = labelText;
	label.appendChild(element);
	label.classList.add("modalLabel");
	return label;
}

async function createApointForm() {
	const {selectStaff, selectService} = await populateSelects();

	const form = document.createElement("form");
	form.id = "form-agendamento";

	const inputData = document.createElement("input");
	inputData.type = "date";
	inputData.classList.add("modalBoxStyles");
	inputData.name = "date";

	const inputClientName = document.createElement("input");
	inputClientName.type = "text";
	inputClientName.placeholder = "Nome do cliente";
	inputClientName.classList.add("modalBoxStyles");
	inputClientName.name = "clientName";

	const inputClientPhone = document.createElement("input");
	inputClientPhone.type = "tel";
	inputClientPhone.placeholder = "Telefone do cliente";
	inputClientPhone.classList.add("modalBoxStyles");
	inputClientPhone.name = "clientPhone";

	inputClientPhone.addEventListener("input", e => {
		const input = e.target;
		const selectionStart = input.selectionStart;
		const raw = input.value.replace(/\D/g, "");

		let formatted = "";

		if (raw.length <= 10) {
			formatted = raw.replace(
				/^(\d{0,2})(\d{0,4})(\d{0,4}).*/,
				(_, ddd, p1, p2) => {
					return `${ddd ? "(" + ddd : ""}${ddd && p1 ? ") " + p1 : ""}${
						p2 ? "-" + p2 : ""
					}`;
				}
			);
		} else {
			formatted = raw.replace(
				/^(\d{0,2})(\d{0,5})(\d{0,4}).*/,
				(_, ddd, p1, p2) => {
					return `${ddd ? "(" + ddd : ""}${ddd && p1 ? ") " + p1 : ""}${
						p2 ? "-" + p2 : ""
					}`;
				}
			);
		}

		const oldLength = input.value.length;
		input.value = formatted;
		const newLength = formatted.length;
		const diff = newLength - oldLength;

		input.setSelectionRange(selectionStart + diff, selectionStart + diff);
	});

	const inputClientEmail = document.createElement("input");
	inputClientEmail.type = "email";
	inputClientEmail.placeholder = "E-mail do cliente";
	inputClientEmail.classList.add("modalBoxStyles");
	inputClientEmail.name = "clientEmail";

	const selectDateTime = document.createElement("input");
	selectDateTime.type = "time";
	selectDateTime.classList.add("modalBoxStyles");
	selectDateTime.name = "appointmentTime";

	const textareaObs = document.createElement("textarea");
	textareaObs.placeholder = "Observações";
	textareaObs.classList.add("modalBoxStyles");
	textareaObs.name = "observation";

	const btnSave = document.createElement("button");
	btnSave.id = "modalButtonSaveAppointment";
	btnSave.textContent = "Salvar";
	btnSave.type = "submit";

	const btnCancel = document.createElement("button");
	btnCancel.id = "modalButtonCancelAppointment";
	btnCancel.textContent = "Cancelar";
	btnCancel.type = "button";

	btnCancel.addEventListener("click", () => {
		document.body.removeChild(
			document.querySelector(".appointmentModalOverlay")
		);
	});

	const line1 = document.createElement("div");
	line1.classList.add("modalFormRows");
	const line2 = document.createElement("div");
	line2.classList.add("modalFormRows");
	const line3 = document.createElement("div");
	line3.classList.add("modalFormRows");
	const line4 = document.createElement("div");
	line4.classList.add("modalFormRows");
	const divButtons = document.createElement("div");
	divButtons.classList.add("appointmentModalButtons");

	form.appendChild(line1);
	form.appendChild(line2);
	form.appendChild(line3);
	form.appendChild(line4);
	form.appendChild(divButtons);

	line1.appendChild(createField("Profissional", selectStaff));
	line1.appendChild(createField("Nome do Cliente", inputClientName));

	line2.appendChild(createField("Serviço", selectService));
	line2.appendChild(createField("Telefone do Cliente", inputClientPhone));

	line3.appendChild(createField("Data", inputData));
	line3.appendChild(createField("E-mail do cliente", inputClientEmail));

	line4.appendChild(createField("Horário inicial", selectDateTime));
	line4.appendChild(createField("Observações", textareaObs));

	divButtons.appendChild(btnSave);
	divButtons.appendChild(btnCancel);

	form.addEventListener("submit", async e => {
		try {
			e.preventDefault();

			const data = {
				employeeId: selectStaff.value,
				serviceId: selectService.value,
				date: inputData.value,
				clientName: inputClientName.value,
				clientEmail: inputClientEmail.value,
				clientPhoneNumber: inputClientPhone.value,
				startTime: selectDateTime.value,
				observation: textareaObs.value
			};

			const response = await fetch("/api/appointments", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(data)
			});

			if (!response.ok) {
				const errorData = await response.json();

				throw new Error(errorData.error || "Falha não identificada");
			}
			const result = await response.json();
			const employeeId = getSelectedEmployeeId();
			if (employeeId) {
				try {
					const appointments = await fetchAppointmentsByEmployee({
						id: employeeId
					});
					setGlobalAppointments(appointments);
				} catch (error) {
					console.error("Erro ao buscar agendamentos:", error.message);
				}
			}

			const {month, year} = getEditedCurrentTime();
			const employeeScheduleTimeline = SchedulingTimelineDiv(month, year);

			const employeeScheduleTimelineContainer = document.getElementById(
				"employeeScheduleTimelineContainer"
			);
			employeeScheduleTimelineContainer.innerHTML = "";
			employeeScheduleTimelineContainer.appendChild(employeeScheduleTimeline);

			MessageNotification(result.message, " #28a745");
		} catch (error) {
			MessageNotification(error.message, "#ff6347");
		}
	});

	return form;
}

async function createBlockForm() {
	const form = document.createElement("form");

	const selectStaff = document.createElement("select");
	selectStaff.classList.add("modalBoxStyles");

	try {
		const staffList = await fetchStaff();

		staffList.forEach(staff => {
			const option = document.createElement("option");
			option.value = staff.id;
			option.textContent = staff.name;
			selectStaff.appendChild(option);
		});
	} catch (error) {
		MessageNotification(error.message, "#ff6347");
	}

	const inputStartDate = document.createElement("input");
	inputStartDate.type = "date";
	inputStartDate.classList.add("modalBoxStyles");

	const inputStartTime = document.createElement("input");
	inputStartTime.type = "time";
	inputStartTime.classList.add("modalBoxStyles");

	const inputEndDate = document.createElement("input");
	inputEndDate.type = "date";
	inputEndDate.classList.add("modalBoxStyles");

	const inputEndTime = document.createElement("input");
	inputEndTime.type = "time";
	inputEndTime.classList.add("modalBoxStyles");

	const textareaObs = document.createElement("textarea");
	textareaObs.placeholder = "Observações";
	textareaObs.classList.add("modalBoxStyles");
	textareaObs.classList.remove("modalLabel");

	const btnSave = document.createElement("button");
	btnSave.id = "modalButtonSaveBlock";
	btnSave.textContent = "Salvar";
	btnSave.type = "submit";

	const btnCancel = document.createElement("button");
	btnCancel.id = "modalButtonCancelBlock";
	btnCancel.textContent = "Cancelar";
	btnCancel.type = "button";

	btnCancel.addEventListener("click", () => {
		document.body.removeChild(
			document.querySelector(".appointmentModalOverlay")
		);
	});

	const line1 = document.createElement("div");
	line1.classList.add("modalFormRows");
	line1.appendChild(createField("Profissional", selectStaff));

	const line2 = document.createElement("div");
	line2.classList.add("modalFormRows");
	line2.appendChild(createField("Data inicial do bloqueio", inputStartDate));
	line2.appendChild(createField("Horário inicial do bloqueio", inputStartTime));

	const line3 = document.createElement("div");
	line3.classList.add("modalFormRows");
	line3.appendChild(createField("Data final do bloqueio", inputEndDate));
	line3.appendChild(createField("Horário final do bloqueio", inputEndTime));

	const divButtons = document.createElement("div");
	divButtons.classList.add("appointmentModalButtons");
	divButtons.appendChild(btnSave);
	divButtons.appendChild(btnCancel);

	form.appendChild(line1);
	form.appendChild(line2);
	form.appendChild(line3);
	form.appendChild(createField("Observações", textareaObs));
	form.appendChild(divButtons);

	form.addEventListener("submit", async e => {
		try {
			e.preventDefault();

			const data = {
				staffId: selectStaff.value,
				startDate: inputStartDate.value,
				startTime: inputStartTime.value,
				endDate: inputEndDate.value,
				endTime: inputEndTime.value,
				observation: textareaObs.value
			};

			const response = await fetch("/api/appointments/blockSchedule", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(data)
			});

			if (!response.ok) {
				const errorData = await response.json();

				throw new Error(errorData.error || "Falha não identificada");
			}
			const result = await response.json();
			const employeeId = getSelectedEmployeeId();

			if (employeeId) {
				try {
					const appointments = await fetchAppointmentsByEmployee({
						id: employeeId
					});
					setGlobalAppointments(appointments);
				} catch (error) {
					console.error("Erro ao buscar agendamentos:", error.message);
				}
			}

			const {month, year} = getEditedCurrentTime();
			const employeeScheduleTimeline = SchedulingTimelineDiv(month, year);

			const employeeScheduleTimelineContainer = document.getElementById(
				"employeeScheduleTimelineContainer"
			);
			employeeScheduleTimelineContainer.innerHTML = "";
			employeeScheduleTimelineContainer.appendChild(employeeScheduleTimeline);

			MessageNotification(result.message, " #28a745");
		} catch (error) {
			MessageNotification(error.message, "#ff6347");
		}
	});

	return form;
}

async function populateSelects() {
	const selectStaff = document.createElement("select");
	selectStaff.classList.add("modalBoxStyles");

	try {
		const staffList = await fetchStaff();

		staffList.forEach(staff => {
			const option = document.createElement("option");
			option.value = staff.id;
			option.textContent = `${staff.name} ${staff.surname}`;
			selectStaff.appendChild(option);
		});
	} catch (error) {
		MessageNotification(error.message, "#ff6347");
	}

	const selectService = document.createElement("select");
	selectService.classList.add("modalBoxStyles");

	try {
		const serviceList = await fetchServices();

		serviceList.forEach(service => {
			const option = document.createElement("option");
			option.value = service.id;
			option.textContent = service.name;
			selectService.appendChild(option);
		});
	} catch (error) {
		MessageNotification(error.message, "#ff6347");
	}

	return {selectStaff, selectService};
}

export {
	createModal,
	createField,
	createApointForm,
	createBlockForm,
	populateSelects
};
