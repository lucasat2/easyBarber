import { SchedulingTimelineDiv } from "./SchedulingTimelineContainer.js";
import { setEditedCurrentTime } from "../setAndGetGlobalVariables.js";

function SchedulingTimelineDateCard() {
  const dateCard = document.createElement("div");
  dateCard.classList.add("schedulingTimelineHeaderDateCard");

  const dateCardCarousel = document.createElement("div");
  dateCardCarousel.classList.add("schedulingTimelineHeaderDateCardCarousel");
  dateCard.appendChild(dateCardCarousel);

  const dateCardCarouselForwardMonth = document.createElement("div");
  dateCardCarouselForwardMonth.innerHTML = "&uharl;";
  dateCardCarouselForwardMonth.classList.add(
    "schedulingTimelineHeaderDateCardCarouselForwardMonth"
  );
  dateCardCarouselForwardMonth.addEventListener(
    "click",
    createNextMonthScheduleDashboard
  );
  dateCardCarousel.appendChild(dateCardCarouselForwardMonth);

  const dateCardCarouselPreviousMonth = document.createElement("div");
  dateCardCarouselPreviousMonth.innerHTML = "&dharr;";
  dateCardCarouselPreviousMonth.classList.add(
    "schedulingTimelineHeaderDateCardCarouselPreviousMonth"
  );
  dateCardCarouselPreviousMonth.addEventListener(
    "click",
    createLastMonthScheduleDashboard
  );
  dateCardCarousel.appendChild(dateCardCarouselPreviousMonth);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayMonth = today.getUTCMonth();
  const todayYear = today.getFullYear();
  let displayMonthYear = getMonthYearString(todayMonth, todayYear);

  const dateCardText = document.createElement("div");
  dateCardText.innerText = displayMonthYear;
  dateCardText.classList.add("schedulingTimelineHeaderDateCardText");
  dateCard.appendChild(dateCardText);

  return dateCard;
}

const today = new Date();
today.setUTCHours(0, 0, 0, 0);
let currentMonth = today.getUTCMonth();
let currentYear = today.getUTCFullYear();

function createLastMonthScheduleDashboard() {
  currentMonth += 1;
  if (currentMonth === 12) {
    currentMonth = 0;
    currentYear += 1;
  }

  setEditedCurrentTime(currentMonth, currentYear);

  const displayMonthYear = getMonthYearString(currentMonth, currentYear);
  const schedulingTimelineHeaderDateCardText = document.querySelector(
    ".schedulingTimelineHeaderDateCardText"
  );
  schedulingTimelineHeaderDateCardText.innerText = displayMonthYear;

  const employeeNewScheduleTimeline = SchedulingTimelineDiv(
    currentMonth,
    currentYear
  );

  const employeeScheduleTimelineContainer = document.getElementById(
    "employeeScheduleTimelineContainer"
  );
  employeeScheduleTimelineContainer.innerHTML = "";
  employeeScheduleTimelineContainer.appendChild(employeeNewScheduleTimeline);
}

function createNextMonthScheduleDashboard() {
  currentMonth -= 1;
  if (currentMonth === -1) {
    currentMonth = 11;
    currentYear -= 1;
  }

  setEditedCurrentTime(currentMonth, currentYear);

  const displayMonthYear = getMonthYearString(currentMonth, currentYear);

  const schedulingTimelineHeaderDateCardText = document.querySelector(
    ".schedulingTimelineHeaderDateCardText"
  );
  schedulingTimelineHeaderDateCardText.innerText = displayMonthYear;

  const employeeNewScheduleTimeline = SchedulingTimelineDiv(
    currentMonth,
    currentYear
  );

  const employeeScheduleTimelineContainer = document.getElementById(
    "employeeScheduleTimelineContainer"
  );
  employeeScheduleTimelineContainer.innerHTML = "";
  employeeScheduleTimelineContainer.appendChild(employeeNewScheduleTimeline);
}

function getMonthYearString(month, year) {
  switch (month) {
    case 0:
      return `Janeiro de ${year}`;
    case 1:
      return `Fevereiro de ${year}`;
    case 2:
      return `Março de ${year}`;
    case 3:
      return `Abril de ${year}`;
    case 4:
      return `Maio de ${year}`;
    case 5:
      return `Junho de ${year}`;
    case 6:
      return `Julho de ${year}`;
    case 7:
      return `Agosto de ${year}`;
    case 8:
      return `Setembro de ${year}`;
    case 9:
      return `Outubro de ${year}`;
    case 10:
      return `Novembro de ${year}`;
    case 11:
      return `Dezembro de ${year}`;
  }
}
export { SchedulingTimelineDateCard };
