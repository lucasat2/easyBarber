import { createSchedulingTimelineCard } from "./schedulingTimelineCard.js";

function createSchedulingTimelineDiv() {
  const schedulingTimelineDiv = document.createElement("div");
  schedulingTimelineDiv.classList.add("schedulingTimelineDiv");

  const days = ["D", "S", "T", "Q", "Q", "S", "S"];

  for (let i = 0; i < days.length; i++) {
    const schedulingTimelineDivHeader = createSchedulingTimelineCard(
      false,
      "",
      days[i],
      "transparent",
      "30px",
      "80px"
    );
    schedulingTimelineDivHeader.classList.add("schedulingTimelineDivHeader");
    schedulingTimelineDiv.appendChild(schedulingTimelineDivHeader);
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const currentMonth = today.getUTCMonth();
  const currentYear = today.getUTCFullYear();

  const getDaysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getUTCDate();

  const monthStartDate = new Date(currentYear, currentMonth, 1);
  const monthStartDay = monthStartDate.getUTCDay();

  for (let j = 0; j < monthStartDay; j++) {
    const schedulingTimelineCard = createSchedulingTimelineCard(
      false,
      "",
      "",
      "#transparent",
      "80px",
      "80px"
    );
    schedulingTimelineDiv.appendChild(schedulingTimelineCard);
  }

  for (let k = 0; k < getDaysInMonth; k++) {
    const date = new Date(currentYear, currentMonth, k + 1);

    const schedulingTimelineCard = createSchedulingTimelineCard(
      true,
      date.toISOString(),
      k + 1,
      "#D9D9D9",
      "80px",
      "80px"
    );
    schedulingTimelineCard.classList.add("schedulingTimelineCard");
    schedulingTimelineDiv.appendChild(schedulingTimelineCard);
  }

  return schedulingTimelineDiv;
}

export { createSchedulingTimelineDiv };