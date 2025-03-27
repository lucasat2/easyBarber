import { SchedulingTimelineCard } from "./SchedulingTimelineCard.js";

function SchedulingTimelineDiv(month, year) {
  const schedulingTimelineContainer = document.createElement("div");
  schedulingTimelineContainer.classList.add("schedulingTimelineMain");

  const days = ["D", "S", "T", "Q", "Q", "S", "S"];

  for (let i = 0; i < days.length; i++) {
    const schedulingTimelineDivHeader = SchedulingTimelineCard(
      false,
      "",
      days[i],
      "transparent",
      "30px",
      "80px"
    );
    schedulingTimelineDivHeader.classList.add("schedulingTimelineMainHeader");
    schedulingTimelineContainer.appendChild(schedulingTimelineDivHeader);
  }

  const getDaysInMonth = new Date(year, month + 1, 0).getUTCDate();

  const monthStartDate = new Date(year, month, 1);
  const monthStartDay = monthStartDate.getUTCDay();

  for (let j = 0; j < monthStartDay; j++) {
    const schedulingTimelineCard = SchedulingTimelineCard(
      false,
      "",
      "",
      "#transparent",
      "70px",
      "70px"
    );
    schedulingTimelineContainer.appendChild(schedulingTimelineCard);
  }

  for (let k = 0; k < getDaysInMonth; k++) {
    const date = new Date(year, month, k + 1);

    const schedulingTimelineCard = SchedulingTimelineCard(
      true,
      date.toISOString(),
      k + 1,
      "#D9D9D9",
      "70px",
      "70px"
    );
    schedulingTimelineCard.classList.add("schedulingTimelineMainCard");
    schedulingTimelineContainer.appendChild(schedulingTimelineCard);
  }

  return schedulingTimelineContainer;
}

export { SchedulingTimelineDiv };