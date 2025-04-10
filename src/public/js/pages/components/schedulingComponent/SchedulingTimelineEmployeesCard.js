function SchedulingTimelineEmployeesCard(name) {
  const employeesDiv = document.createElement("div");
  employeesDiv.classList.add("schedulingTimelineEmployeesCard");

  const firstLetter = name.charAt(0).toUpperCase();

  const employeesImageDiv = document.createElement("div");
  employeesImageDiv.textContent = firstLetter;
  employeesImageDiv.style.backgroundColor = generateRandomColor();
  employeesImageDiv.classList.add("schedulingTimelineHeaderEmployeesCardImage");
  employeesDiv.appendChild(employeesImageDiv);

  const employeesNameDiv = document.createElement("div");
  employeesNameDiv.innerText = name;
  employeesNameDiv.classList.add("schedulingTimelineHeaderEmployeesCardName");
  employeesDiv.appendChild(employeesNameDiv);

  return employeesDiv;
}

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


export { SchedulingTimelineEmployeesCard , generateRandomColor};