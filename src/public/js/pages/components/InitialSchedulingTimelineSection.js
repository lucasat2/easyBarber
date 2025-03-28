import { SchedulingTimelineSelectionContainer } from "./SchedulingTimelineSelectionContainer.js";

const test = [
  {
    name: "Gabriell",
  },
  {
    name: "Bruno",
  },
  {
    name: "Lucas",
  },
  {
    name: "Fabiano",
  },
];

function InitialSchedulingTimelineSection() {
  const schedulingTimelineSection = document.createElement("div");
  schedulingTimelineSection.id = "schedulingTimelineSection";
  schedulingTimelineSection.classList.add("initialSchedulingTimelineSection");

  const selectElement = SchedulingTimelineSelectionContainer(
    "Selecione um funcionário",
    test
  );
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