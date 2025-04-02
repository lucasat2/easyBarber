import { SchedulingTimelineSelectionContainer } from "./SchedulingTimelineSelectionContainer.js";
import { SchedulingTimelineEmployeesCard } from "./SchedulingTimelineEmployeesCard.js";
import { SchedulingTimelineDateCard } from "./SchedulingTimelineDateCard.js";
import { SchedulingTimelineDiv } from "./SchedulingTimelineContainer.js";
import { fetchAppointmentsByEmployee } from "./fetchData.js";
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

    // Adicionar o evento apenas uma vez
    selectElement.addEventListener("change", async function (event) {
      const selectedIndex = event.target.selectedIndex;
      const selectedOptions = event.target.options[selectedIndex];
      const employeeId = selectedOptions.value;
      document.querySelector(".schedulingTimelineHeaderSelectionContainer").value = ''

      if (employeeId) {
        try {
          const appointments = await fetchAppointmentsByEmployee({
            id: employeeId,
          });
          console.log("Funcionário ID Selecionado:", employeeId);
          console.log("Agendamentos do Funcionário:", appointments);
        } catch (error) {
          console.error("Erro ao buscar agendamentos:", error.message);
        }
      }
    });
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

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const currentMonth = today.getUTCMonth();
  const currentYear = today.getUTCFullYear();

  const employeeScheduleTimeline = SchedulingTimelineDiv(
    currentMonth,
    currentYear
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
