import { SchedulingTimelineSelectionContainer } from "./SchedulingTimelineSelectionContainer.js";
import { fetchStaff } from "./fetchData.js";

async function fetchAppointmentsByEmployee(employeeId) {
  try {
    const response = await fetch(`/api/appointments/${employeeId.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) throw new Error("Erro ao buscar agendamentos");

    const appointments = await response.json();
    return appointments;
  } catch (error) {
    console.error("Erro ao obter os agendamentos:", error.message);
    return [];
  }
}

async function InitialSchedulingTimelineSection() {
  const schedulingTimelineSection = document.createElement("div");
  schedulingTimelineSection.id = "schedulingTimelineSection";
  schedulingTimelineSection.classList.add("initialSchedulingTimelineSection");
  const staffList = await fetchStaff();

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