import { createAppointmentsCard } from "./appointmentsCard.js";

function createAppointmentsDashboard() {
  const appointmentsDashboard = document.createElement("div");
  appointmentsDashboard.style.width = "700px";
  appointmentsDashboard.style.display = "grid";
  appointmentsDashboard.style.fontFamily = `"Fredoka", sans-serif`;
  appointmentsDashboard.style.gridTemplateColumns = "repeat(7, 1fr)";
  appointmentsDashboard.style.gap = "15px";

  const days = ["D", "S", "T", "Q", "Q", "S", "S"];

  for (let i = 0; i < days.length; i++) {
    const appointmentsCard = createAppointmentsCard(
      false,
      "",
      days[i],
      "transparent",
      "30px",
      "80px"
    );
    appointmentsDashboard.appendChild(appointmentsCard);
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
    const appointmentsCard = createAppointmentsCard(
      false,
      "",
      "",
      "#transparent",
      "80px",
      "80px"
    );
    appointmentsDashboard.appendChild(appointmentsCard);
  }

  for (let k = 0; k < getDaysInMonth; k++) {
    const date = new Date(currentYear, currentMonth, k + 1);

    const appointmentsCard = createAppointmentsCard(
      true,
      date.toISOString(),
      k + 1,
      "#D9D9D9",
      "80px",
      "80px"
    );
    appointmentsDashboard.appendChild(appointmentsCard);
  }

  return appointmentsDashboard;
}

export { createAppointmentsDashboard };