function SchedulingTimelineEmployeesCard(name, image) {
  const employeesDiv = document.createElement("div");
  employeesDiv.classList.add("schedulingTimelineEmployeesCard");

  const employeesImageDiv = document.createElement("div");
  employeesImageDiv.style.backgroundImage = `url("https://picsum.photos/490")`;
  employeesImageDiv.classList.add("schedulingTimelineHeaderEmployeesCardImage");
  employeesDiv.appendChild(employeesImageDiv);

  const employeesNameDiv = document.createElement("div");
  employeesNameDiv.innerText = name;
  employeesNameDiv.classList.add("schedulingTimelineHeaderEmployeesCardName");
  employeesDiv.appendChild(employeesNameDiv);

  return employeesDiv;
}

export { SchedulingTimelineEmployeesCard };