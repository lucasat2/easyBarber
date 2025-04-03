import { SchedulingTimelineSelectionContainer } from "./SchedulingTimelineSelectionContainer.js";
import { SchedulingTimelineEmployeesCard } from "./SchedulingTimelineEmployeesCard.js";
import { SchedulingTimelineDateCard } from "./SchedulingTimelineDateCard.js";
import { SchedulingTimelineDiv } from "./SchedulingTimelineContainer.js";
import * as modalAppointment from "./modalAppointmentScheduling.js";

let selectElement = null;

function EmployeeScheduleDashboard(employeeName, staff) {
  const employeeSchedulingTimelineSection = document.createElement("div");
  employeeSchedulingTimelineSection.classList.add(
    "employeeSchedulingTimelineSection"
  );

  const employeeSchedulingTimelineHeader = document.createElement("div");
  employeeSchedulingTimelineHeader.classList.add(
    "employeeSchedulingTimelineHeader"
  );
  employeeSchedulingTimelineSection.appendChild(
    employeeSchedulingTimelineHeader
  );

  // Verificar se o select já existe para não recriá-lo
  if (!selectElement) {
    selectElement = SchedulingTimelineSelectionContainer(
      "Selecione um funcionário",
      staff
    );
  }

  employeeSchedulingTimelineHeader.appendChild(selectElement);

  const employeeCard = SchedulingTimelineEmployeesCard(
    employeeName,
    "../assets/signUp/logo.jpeg"
  );
  employeeSchedulingTimelineHeader.appendChild(employeeCard);

  const employeeSchedulingTimelineHeaderManagementButton =
    document.createElement("button");
  employeeSchedulingTimelineHeaderManagementButton.innerText =
    "Gerenciar horário";
  employeeSchedulingTimelineHeaderManagementButton.classList.add(
    "employeeSchedulingTimelineHeaderManagementButton"
  );
  employeeSchedulingTimelineHeader.appendChild(
    employeeSchedulingTimelineHeaderManagementButton
  );

  const dateCard = SchedulingTimelineDateCard();
  employeeSchedulingTimelineHeader.appendChild(dateCard);

  const employeeScheduleTimelineContainer = document.createElement("div");
  employeeScheduleTimelineContainer.id = "employeeScheduleTimelineContainer";
  employeeSchedulingTimelineSection.appendChild(
    employeeScheduleTimelineContainer
  );

  const employeeScheduleTimeline = SchedulingTimelineDiv(
    new Date().getMonth(),
    new Date().getFullYear()
  );
  employeeScheduleTimelineContainer.appendChild(employeeScheduleTimeline);

  employeeSchedulingTimelineHeaderManagementButton.addEventListener(
    "click",
    () => {
      modalAppointment.createModal();
    }
  );

  return employeeSchedulingTimelineSection;
}

export { EmployeeScheduleDashboard };
