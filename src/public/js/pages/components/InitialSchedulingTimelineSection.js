import { SchedulingTimelineSelectionContainer } from "./SchedulingTimelineSelectionContainer.js";
import { fetchStaff } from "./fetchData.js";

async function fetchAppointmentsByEmployee(employeeData) {
  try {
    const response = await fetch(`/api/appointments/${employeeData.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.error || "Falha não identificada");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

async function InitialSchedulingTimelineSection() {
  const schedulingTimelineSection = document.createElement("div");
  schedulingTimelineSection.id = "schedulingTimelineSection";
  schedulingTimelineSection.classList.add("initialSchedulingTimelineSection");

  let staffList;

  try {
    staffList = await fetchStaff();
  } catch (error) {
    MessageNotification(error.message, "#ff6347");

    staffList = [];
  }

  const selectElement = SchedulingTimelineSelectionContainer(
    "Selecione um funcionário",
    staffList
  );

  selectElement.addEventListener("change", async (event) => {
    const employeeId = event.target.value;

    if (employeeId) {
      const appointments = await fetchAppointmentsByEmployee(employeeId);
      console.log("Funcionário ID Selecionado:", employeeId);
      console.log("Agendamentos do Funcionário:", appointments);
    }
  });

  schedulingTimelineSection.appendChild(selectElement);

  const initialSchedulingTimelineDiv = document.createElement("div");
  initialSchedulingTimelineDiv.classList.add("initialSchedulingTimelineDiv");
  schedulingTimelineSection.appendChild(initialSchedulingTimelineDiv);

  const initialSchedulingTimelineImage = document.createElement("div");
  initialSchedulingTimelineImage.classList.add(
    "initialSchedulingTimelineImage"
  );
  initialSchedulingTimelineDiv.appendChild(initialSchedulingTimelineImage);

  const initialSchedulingTimelineText = document.createElement("div");
  initialSchedulingTimelineText.innerText = "Nenhum funcionário selecionado";
  initialSchedulingTimelineDiv.appendChild(initialSchedulingTimelineText);

  return schedulingTimelineSection;
}

export { InitialSchedulingTimelineSection };

// document.body.appendChild(InitialSchedulingTimelineSection());
