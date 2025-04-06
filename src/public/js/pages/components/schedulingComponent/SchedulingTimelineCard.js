import { getGlobalAppointments } from "../setAndGetGlobalVariables.js";
import { DailyAppointmentsModal } from "./DailyAppointmentsModal.js";

function SchedulingTimelineCard(
  shouldBindDataToDiv,
  date,
  text,
  color,
  height,
  width
) {
  const schedulingTimelineCard = document.createElement("div");
  schedulingTimelineCard.classList.add("SchedulingTimelineCardDefault");
  schedulingTimelineCard.innerText = text;
  schedulingTimelineCard.style.height = height;
  schedulingTimelineCard.style.width = width;
  if (color) schedulingTimelineCard.style.backgroundColor = color;

  if (shouldBindDataToDiv) {
    schedulingTimelineCard.addEventListener("click", function () {
      const appointments = getGlobalAppointments();

      const currentDateAndTimeArray = date.split("T");

      const currentDateArray = currentDateAndTimeArray[0].split("-");

      const currentDate = new Date(
        Number(currentDateArray[0]),
        Number(currentDateArray[1]) - 1,
        Number(currentDateArray[2])
      );

      const appointmentsFiltered = appointments.filter((appointment) => {
        const appointmentStartDateAndTime = appointment.date_hour_begin;

        const appointmentStartDateAndTimeArray =
          appointmentStartDateAndTime.split("T");

        const appointmentStartDate =
          appointmentStartDateAndTimeArray[0].split("-");

        const startTimeAppointment = new Date(
          Number(appointmentStartDate[0]),
          Number(appointmentStartDate[1]) - 1,
          Number(appointmentStartDate[2])
        );

        const appointmentEndDateAndTime = appointment.date_hour_end;

        const appointmentEndDateAndTimeArray =
          appointmentEndDateAndTime.split("T");

        const appointmentEndDate = appointmentEndDateAndTimeArray[0].split("-");

        const endTimeAppointment = new Date(
          Number(appointmentEndDate[0]),
          Number(appointmentEndDate[1]) - 1,
          Number(appointmentEndDate[2])
        );

        if (
          currentDate >= startTimeAppointment &&
          currentDate <= endTimeAppointment
        ) {
          return true;
        }
      });

      appointmentsFiltered.sort((firstAppointment, secondAppointment) => {
        const firstAppointmentStartDateAndTime =
          firstAppointment.date_hour_begin;

        const firstAppointmentStartDateAndTimeArray =
          firstAppointmentStartDateAndTime.split("T");

        const firstAppointmentStartDate =
          firstAppointmentStartDateAndTimeArray[0].split("-");

        const firstAppointmentStartTime =
          firstAppointmentStartDateAndTimeArray[1].split(":");

        const firstStartTimeAppointment = new Date(
          Number(firstAppointmentStartDate[0]),
          Number(firstAppointmentStartDate[1]) - 1,
          Number(firstAppointmentStartDate[2])
        );

        firstStartTimeAppointment.setUTCHours(
          Number(firstAppointmentStartTime[0]),
          Number(firstAppointmentStartTime[1])
        );

        const secondAppointmentStartDateAndTime =
          secondAppointment.date_hour_begin;

        const secondAppointmentStartDateAndTimeArray =
          secondAppointmentStartDateAndTime.split("T");

        const secondAppointmentStartDate =
          secondAppointmentStartDateAndTimeArray[0].split("-");

        const secondAppointmentStartTime =
          secondAppointmentStartDateAndTimeArray[1].split(":");

        const secondStartTimeAppointment = new Date(
          Number(secondAppointmentStartDate[0]),
          Number(secondAppointmentStartDate[1]) - 1,
          Number(secondAppointmentStartDate[2])
        );

        secondStartTimeAppointment.setUTCHours(
          Number(secondAppointmentStartTime[0]),
          Number(secondAppointmentStartTime[1])
        );

        if (firstStartTimeAppointment < secondStartTimeAppointment) {
          return -1;
        } else if (firstStartTimeAppointment > secondStartTimeAppointment) {
          return 1;
        } else {
          return 0;
        }
      });

      const dailyAppointmentsModal = DailyAppointmentsModal(
        date,
        appointmentsFiltered
      );

      document.body.appendChild(dailyAppointmentsModal);
    });
  }

  return schedulingTimelineCard;
}

export { SchedulingTimelineCard };