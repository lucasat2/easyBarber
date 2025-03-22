function createSchedulingTimelineCard(
  shouldBindDataToDiv,
  date,
  text,
  color,
  height,
  width
) {
  const schedulingTimelineCard = document.createElement("div");
  schedulingTimelineCard.innerText = text;
  schedulingTimelineCard.style.height = height;
  schedulingTimelineCard.style.width = width;
  schedulingTimelineCard.style.backgroundColor = color;

  if (shouldBindDataToDiv) {
    schedulingTimelineCard.currentDate = date;

    schedulingTimelineCard.addEventListener("click", function () {
      console.log(this.currentDate);
    });
  }

  return schedulingTimelineCard;
}

export { createSchedulingTimelineCard };