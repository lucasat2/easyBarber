import { EmployeeScheduleDashboard } from "./EmployeeScheduleDashboard.js";

function SchedulingTimelineSelectionContainer(initialOptionText, data) {
  const selectionSection = document.createElement("div");
  selectionSection.classList.add("schedulingTimelineHeaderSelectionSection");

  const selectionContainer = document.createElement("select");
  selectionContainer.classList.add(
    "schedulingTimelineHeaderSelectionContainer"
  );
  selectionSection.appendChild(selectionContainer);

  selectionContainer.addEventListener("change", function () {
    const selectName = this.options[this.selectedIndex].text;

    const employeeScheduleTimeline = EmployeeScheduleDashboard(
      selectName,
      data
    );

    const schedulingTimelineSection = document.getElementById(
      "schedulingTimelineSection"
    );
    schedulingTimelineSection.innerHTML = "";
    schedulingTimelineSection.classList.remove(
      "initialSchedulingTimelineSection"
    );
    schedulingTimelineSection.classList.add("schedulingTimelineSection");
    schedulingTimelineSection.appendChild(employeeScheduleTimeline);
  });

  const initialOption = document.createElement("option");
  initialOption.innerText = initialOptionText;
  initialOption.value = '';
  initialOption.disabled = "true";
  initialOption.selected = "true";
  selectionContainer.appendChild(initialOption);

  for (let i = 0; i < data.length; i++) {
    const name = data[i].name;
    const id = data[i].id;

    const selectionOptions = document.createElement("option");
    selectionOptions.innerText = name;
    selectionOptions.value = id;
    selectionContainer.appendChild(selectionOptions);
  }

  const customArrow = document.createElement("div");
  customArrow.classList.add("schedulingTimelineHeaderCustomArrow");
  selectionSection.appendChild(customArrow);

  return selectionSection;
}

export { SchedulingTimelineSelectionContainer };
