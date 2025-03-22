function createSchedulingTimelineHeader(employeesData) {
  const schedulingTimelineHeader = document.createElement("div");
  schedulingTimelineHeader.classList.add("schedulingTimelineHeader");

  const staffSelectionContainer = createSelectionContainer(
    "Selecione um funcionário",
    employeesData
  );
  schedulingTimelineHeader.appendChild(staffSelectionContainer);

  return schedulingTimelineHeader;
}

// const test = [
//   {
//     name: "João",
//   },
//   {
//     name: "Bruno",
//   },
//   {
//     name: "Gabriell",
//   },
//   {
//     name: "Anderson",
//   },
// ];

// document.body.appendChild(createSchedulingTimelineHeader(test));

function createSelectionContainer(initialOptionText, data) {
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

function createEmployeesCard(name, image) {
  const employeesDiv = document.createElement("div");
  employeesDiv.classList.add("schedulingTimelineEmployeesCard");

  const employeesImageDiv = document.createElement("div");
  employeesImageDiv.style.backgroundImage = `url("${image}")`;
  employeesImageDiv.classList.add("schedulingTimelineHeaderEmployeesCardImage");
  employeesDiv.appendChild(employeesImageDiv);

  const employeesNameDiv = document.createElement("div");
  employeesNameDiv.innerText = name;
  employeesNameDiv.classList.add("schedulingTimelineHeaderEmployeesCardName");
  employeesDiv.appendChild(employeesNameDiv);

  return employeesDiv;
}

// document
//   .querySelector(".schedulingTimelineHeader")
//   .appendChild(
//     createEmployeesCard("Anderson", "../assets/signUp/cadeira.jpeg")
//   );

function createDateCard() {
  const dateCard = document.createElement("div");
  dateCard.classList.add("schedulingTimelineHeaderDateCard");

  const dateCardImageContainer = document.createElement("div");
  dateCardImageContainer.classList.add(
    "schedulingTimelineHeaderCardImageContainer"
  );
  dateCard.appendChild(dateCardImageContainer);

  const dateCardImage = document.createElement("div");
  dateCardImage.classList.add("schedulingTimelineHeaderCardImage");
  dateCardImageContainer.appendChild(dateCardImage);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayMonth = today.getUTCMonth();
  const todayYear = today.getFullYear();
  let displayMonthYear;

  switch (todayMonth) {
    case 0:
      displayMonthYear = `Janeiro de ${todayYear}`;
      break;
    case 1:
      displayMonthYear = `Fevereiro de ${todayYear}`;
      break;
    case 2:
      displayMonthYear = `Março de ${todayYear}`;
      break;
    case 3:
      displayMonthYear = `Abril de ${todayYear}`;
      break;
    case 4:
      displayMonthYear = `Maio de ${todayYear}`;
      break;
    case 5:
      displayMonthYear = `Junho de ${todayYear}`;
      break;
    case 6:
      displayMonthYear = `Julho de ${todayYear}`;
      break;
    case 7:
      displayMonthYear = `Agosto de ${todayYear}`;
      break;
    case 8:
      displayMonthYear = `Setembro de ${todayYear}`;
      break;
    case 9:
      displayMonthYear = `Outubro de ${todayYear}`;
      break;
    case 10:
      displayMonthYear = `Novembro de ${todayYear}`;
      break;
    case 11:
      displayMonthYear = `Dezembro de ${todayYear}`;
      break;
  }

  const dateCardText = document.createElement("div");
  dateCardText.innerText = `Hoje, ${displayMonthYear}`;
  dateCardText.classList.add("schedulingTimelineHeaderDateCardText");
  dateCard.appendChild(dateCardText);

  return dateCard;
}

// document
//   .querySelector(".schedulingTimelineHeader")
//   .appendChild(createDateCard());

function createDateBlocker() {
  const dateBlockerLabel = document.createElement("label");
  dateBlockerLabel.classList.add("schedulingTimelineHeaderDateBlocker");

  const dateBlockerInput = document.createElement("input");
  dateBlockerInput.type = "checkbox";
  dateBlockerInput.classList.add("schedulingTimelineHeaderDateBlockerInput");
  dateBlockerLabel.appendChild(dateBlockerInput);

  const dateBlockerCheckboxIndicator = document.createElement("span");
  dateBlockerCheckboxIndicator.classList.add(
    "schedulingTimelineHeaderDateBlockerCheckboxIndicator"
  );
  dateBlockerLabel.appendChild(dateBlockerCheckboxIndicator);

  const dateBlockerSpan = document.createElement("span");
  dateBlockerSpan.innerText = "Bloquer dia";
  dateBlockerSpan.classList.add("schedulingTimelineHeaderDateBlockerSpan");
  dateBlockerLabel.appendChild(dateBlockerSpan);

  return dateBlockerLabel;
}

// document
//   .querySelector(".schedulingTimelineHeader")
//   .appendChild(createDateBlocker());