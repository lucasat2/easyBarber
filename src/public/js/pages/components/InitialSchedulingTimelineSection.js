import { SchedulingTimelineSelectionContainer } from "./SchedulingTimelineSelectionContainer.js";
import { fetchStaff, fetchAppointmentsByEmployee } from "./fetchData.js";

let selectElement = null;

async function InitialSchedulingTimelineSection() {
  const schedulingTimelineSection = document.createElement("div");
  schedulingTimelineSection.id = "schedulingTimelineSection";
  schedulingTimelineSection.classList.add("initialSchedulingTimelineSection");

  let staff;

  try {
    staff = await fetchStaff();
  } catch (error) {
    MessageNotification(error.message, "#ff6347");

    staff = [];
  }
  console.log(staff)
  
  // Verificar se o select já existe para não recriá-lo
  if (!selectElement) {
    selectElement = SchedulingTimelineSelectionContainer(
      "Selecione um funcionário",
      staff
    );

    // Adicionar o evento apenas uma vez
    selectElement.addEventListener("change", async (event) => {
      const selectedIndex = event.target.selectedIndex;
      const selectedOptions = event.target.options[selectedIndex];
      const employeeId = selectedOptions.value;

      if (employeeId) {
        try {
          const appointments = await fetchAppointmentsByEmployee({ id: employeeId });
          console.log("Funcionário ID Selecionado:", employeeId);
          console.log("Agendamentos do Funcionário:", appointments);
        } catch (error) {
          console.error("Erro ao buscar agendamentos:", error.message);
        }
      }
    });
  }
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
