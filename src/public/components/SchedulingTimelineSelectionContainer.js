function SchedulingTimelineSelectionContainer(initialOptionText, data) {
  const selectionSection = document.createElement("div");
  selectionSection.classList.add("schedulingTimelineHeaderSelectionSection");

  const selectionContainer = document.createElement("select");
  selectionContainer.classList.add(
    "schedulingTimelineHeaderSelectionContainer"
  );
  selectionSection.appendChild(selectionContainer);

  const initialOption = document.createElement("option");
  initialOption.innerText = initialOptionText;
  initialOption.value = initialOptionText;
  initialOption.disabled = "true";
  initialOption.selected = "true";
  selectionContainer.appendChild(initialOption);

  for (let i = 0; i < data.length; i++) {
    const name = data[i].name;

    const selectionOptions = document.createElement("option");
    selectionOptions.innerText = name;
    selectionOptions.value = name;
    selectionContainer.appendChild(selectionOptions);
  }

  const customArrow = document.createElement("div");
  customArrow.classList.add("schedulingTimelineHeaderCustomArrow");
  selectionSection.appendChild(customArrow);

  return selectionSection;
}

export { SchedulingTimelineSelectionContainer };