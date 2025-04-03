import { getGlobalAppointments } from "./setAndGetGlobalVariables.js";

function SchedulingTimelineCard(
  shouldBindDataToDiv,
  date,
  text,
  color,
  height,
  width
) {
  const schedulingTimelineCard = document.createElement("div");
  schedulingTimelineCard.classList.add("SchedulingTimelineCardDefault")
  schedulingTimelineCard.innerText = text;
  schedulingTimelineCard.style.height = height;
  schedulingTimelineCard.style.width = width;
  if (color)
  schedulingTimelineCard.style.backgroundColor = color;

  const appointments = getGlobalAppointments();


  // Formatar a data para comparação (AAAA-MM-DD)
  let formattedDate = "";
  const parsedDate = new Date(date)

    if (date && !isNaN(parsedDate)) {
      formattedDate = parsedDate.toISOString().split("T")[0];
    }
  // Verificar se a data coincide com um agendamento
  const hasAppointment = appointments.some((appointment) => {
    const appointmentDate = new Date(appointment.date_hour_begin);
    if (!isNaN(appointmentDate)) {
      const appointmentFormattedDate = appointmentDate.toISOString().split("T")[0];
      return appointmentFormattedDate === formattedDate;
    }
    console.log(hasAppointment)
    return false;
  });

  if (hasAppointment) {
    schedulingTimelineCard.classList.add('has-appointment');
    schedulingTimelineCard.addEventListener('click', () => {
      alert(`Clique no dia com agendamento: ${formattedDate}`);
      // Aqui podemos chamar a função futura para abrir os detalhes do agendamento
    });
  }

  if (shouldBindDataToDiv) {
    schedulingTimelineCard.currentDate = date;

    schedulingTimelineCard.addEventListener("click", function () {
      console.log(this.currentDate);
    });
  }

  return schedulingTimelineCard;
}

export { SchedulingTimelineCard };