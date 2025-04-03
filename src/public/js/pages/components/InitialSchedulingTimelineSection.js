import { SchedulingTimelineSelectionContainer } from "./SchedulingTimelineSelectionContainer.js";
import { fetchStaff, fetchAppointmentsByEmployee } from "./fetchData.js";
import { setGlobalAppointments } from "./setAndGetGlobalVariables.js";
import { SchedulingTimelineDiv } from "./SchedulingTimelineContainer.js";

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
  
  // Verificar se o select já existe para não recriá-lo
  if (!selectElement) {
    selectElement = SchedulingTimelineSelectionContainer(
      "Selecione um funcionário",
      staff
    );

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
