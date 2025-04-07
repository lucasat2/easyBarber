import {
  fetchStaff,
  fetchServices,
  fetchAppointmentsByEmployee,
} from "../fetchData.js";
import { MessageNotification } from "../MessageNotification.js";
import {
  setGlobalAppointments,
  getEditedCurrentTime,
  getSelectedEmployeeId,
} from "../setAndGetGlobalVariables.js";
import { SchedulingTimelineDiv } from "./SchedulingTimelineContainer.js";

function createModal() {
  //Cria a estrutura do modal
  const overlay = document.createElement("div");
  overlay.classList.add("appointmentModalOverlay");

  const modal = document.createElement("div");
  modal.classList.add("appointmentModal");

  //Botões de mudança de estado
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("appointmentToggleContainer");

  const btnAppoint = document.createElement("button");
  btnAppoint.textContent = "Agendar novo horário";
  btnAppoint.classList.add("appointmentToggleActive");

  const btnBlock = document.createElement("button");
  btnBlock.textContent = "Bloquear um horário";
  btnBlock.classList.add("appointmentToggleInactive");

  //Onde ficará o formulário
  const formContainer = document.createElement("div");

  // Troca visual e de conteúdo
  btnAppoint.addEventListener("click", async () => {
    updateToggle("agendar");
    renderForm("agendar");
  });

  btnBlock.addEventListener("click", async () => {
    updateToggle("bloquear");
    renderForm("bloquear");
  });

  //Atualiza visual dos botões de escolha
  function updateToggle(mode) {
    if (mode === "agendar") {
      btnAppoint.classList.add("appointmentToggleActive");
      btnAppoint.classList.remove("appointmentToggleInactive");
      btnBlock.classList.add("appointmentToggleInactive");
      btnBlock.classList.remove("appointmentToggleActive");
    } else {
      btnBlock.classList.add("appointmentToggleActive");
      btnBlock.classList.remove("appointmentToggleInactive");
      btnAppoint.classList.add("appointmentToggleInactive");
      btnAppoint.classList.remove("appointmentToggleActive");
    }
  }

  //Função para gerar dois formulários diferentes
  async function renderForm(mode) {
    formContainer.innerHTML = "";

    if (mode === "agendar") {
      const form = await createApointForm();
      formContainer.appendChild(form);
    } else {
      const form = await createBlockForm();
      formContainer.appendChild(form);
    }
  }

  //Posicionamento dos elementos
  toggleContainer.appendChild(btnAppoint);
  toggleContainer.appendChild(btnBlock);

  modal.appendChild(toggleContainer);
  modal.appendChild(formContainer);

  renderForm("agendar");

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });
}

//Função cria campo de input
function createField(labelText, element) {
  const label = document.createElement("label");
  label.textContent = labelText;
  label.appendChild(element);
  label.classList.add("modalLabel");
  return label;
}

//Função para criar o formulário de agendamento
async function createApointForm() {
  const { selectStaff, selectService } = await populateSelects();

  const form = document.createElement("form");
  form.id = "form-agendamento";

  // Data
  const inputData = document.createElement("input");
  inputData.type = "date";
  inputData.required = true;
  inputData.classList.add("modalBoxStyles");
  inputData.name = "date";

  //
  const inputClientName = document.createElement("input");
  inputClientName.type = "text";
  inputClientName.placeholder = "Nome do cliente";
  inputClientName.required = true;
  inputClientName.classList.add("modalBoxStyles");
  inputClientName.name = "clientName";

  const inputClientPhone = document.createElement("input");
  inputClientPhone.type = "tel";
  inputClientPhone.placeholder = "Telefone do cliente";
  inputClientPhone.required = true;
  inputClientPhone.classList.add("modalBoxStyles");
  inputClientPhone.name = "clientPhone";

  const inputClientEmail = document.createElement("input");
  inputClientEmail.type = "email";
  inputClientEmail.placeholder = "E-mail do cliente";
  inputClientEmail.required = true;
  inputClientEmail.classList.add("modalBoxStyles");
  inputClientEmail.name = "clientEmail";

  // Horário inicial
  const selectDateTime = document.createElement("input");
  selectDateTime.type = "time";
  selectDateTime.required = true;
  selectDateTime.classList.add("modalBoxStyles");
  selectDateTime.name = "appointmentTime";

  // Observações
  const textareaObs = document.createElement("textarea");
  textareaObs.placeholder = "Observações";
  textareaObs.classList.add("modalBoxStyles");
  textareaObs.name = "observation";

  // Botões
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

  // Linhas
  const line1 = document.createElement("div");
  line1.classList.add("modalFormRows");

  line1.appendChild(createField("Profissional", selectStaff));
  line1.appendChild(createField("Nome do Cliente", inputClientName));

  const line2 = document.createElement("div");
  line2.classList.add("modalFormRows");
  line2.appendChild(createField("Serviço", selectService));
  line2.appendChild(createField("Telefone do Cliente", inputClientPhone));

  const line3 = document.createElement("div");
  line3.classList.add("modalFormRows");
  line3.appendChild(createField("Data", inputData));
  line3.appendChild(createField("E-mail do cliente", inputClientEmail));

  const line4 = document.createElement("div");
  line4.classList.add("modalFormRows");
  line4.appendChild(createField("Horário inicial", selectDateTime));
  line4.appendChild(createField("Observações", textareaObs));

  const divButtons = document.createElement("div");
  divButtons.classList.add("appointmentModalButtons");
  divButtons.appendChild(btnSave);
  divButtons.appendChild(btnCancel);

  // Montar o form
  form.appendChild(line1);
  form.appendChild(line2);
  form.appendChild(line3);
  form.appendChild(line4);
  form.appendChild(divButtons);

  // Ao enviar o formulário
  form.addEventListener("submit", async (e) => {
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
        observation: textareaObs.value,
      };

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
            id: employeeId,
          });
          setGlobalAppointments(appointments);
        } catch (error) {
          console.error("Erro ao buscar agendamentos:", error.message);
        }
      }

      const { month, year } = getEditedCurrentTime();
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

//Função para gerar formulário de bloquear horário
async function createBlockForm() {
  const form = document.createElement("form");
  form.id = "form-bloqueio";

  // Select Profissional
  const selectStaff = document.createElement("select");
  selectStaff.classList.add("modalBoxStyles");

  try {
    const staffList = await fetchStaff();

    staffList.forEach((staff) => {
      const option = document.createElement("option");
      option.value = staff.id;
      option.textContent = staff.name;
      selectStaff.appendChild(option);
    });
  } catch (error) {
    MessageNotification(error.message, "#ff6347");
  }

  // Inputs de data e hora para início
  const inputStartDate = document.createElement("input");
  inputStartDate.type = "date";
  inputStartDate.required = true;
  inputStartDate.classList.add("modalBoxStyles");

  const inputStartTime = document.createElement("input");
  inputStartTime.type = "time";
  inputStartTime.required = true;
  inputStartTime.classList.add("modalBoxStyles");

  // Inputs de data e hora para término
  const inputEndDate = document.createElement("input");
  inputEndDate.type = "date";
  inputEndDate.required = true;
  inputEndDate.classList.add("modalBoxStyles");

  const inputEndTime = document.createElement("input");
  inputEndTime.type = "time";
  inputEndTime.required = true;
  inputEndTime.classList.add("modalBoxStyles");

  // Observações
  const textareaObs = document.createElement("textarea");
  textareaObs.placeholder = "Observações";
  textareaObs.classList.add("modalBoxStyles");
  textareaObs.classList.remove("modalLabel");

  // Botões
  const btnSave = document.createElement("button");
  btnSave.id = "modalButtonSaveBlock";
  btnSave.textContent = "Salvar bloqueio";
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

  // Linhas do formulário
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

  // Montar form
  form.appendChild(line1);
  form.appendChild(line2);
  form.appendChild(line3);
  form.appendChild(createField("Observações", textareaObs));
  form.appendChild(divButtons);

  // Ao enviar o formulário
  form.addEventListener("submit", async (e) => {
    try {
      e.preventDefault();

      const data = {
        staffId: selectStaff.value,
        startDate: inputStartDate.value,
        startTime: inputStartTime.value,
        endDate: inputEndDate.value,
        endTime: inputEndTime.value,
        observation: textareaObs.value,
      };

      const response = await fetch("/api/appointments/blockSchedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
            id: employeeId,
          });
          setGlobalAppointments(appointments);
        } catch (error) {
          console.error("Erro ao buscar agendamentos:", error.message);
        }
      }

      const { month, year } = getEditedCurrentTime();
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

// Preenchendo os selects no modal
async function populateSelects() {
  const selectStaff = document.createElement("select");
  selectStaff.classList.add("modalBoxStyles");
  selectStaff.required = true;

  try {
    const staffList = await fetchStaff();

    staffList.forEach((staff) => {
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
  selectService.required = true;

  try {
    const serviceList = await fetchServices();

    serviceList.forEach((service) => {
      const option = document.createElement("option");
      option.value = service.id;
      option.textContent = service.name;
      selectService.appendChild(option);
    });
  } catch (error) {
    MessageNotification(error.message, "#ff6347");
  }

  return { selectStaff, selectService };
}

export {
  createModal,
  createField,
  createApointForm,
  createBlockForm,
  populateSelects,
};