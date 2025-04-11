class AppointmentDTO {
  client_id;
  created_at;
  date_hour_begin;
  date_hour_end;
  id;
  observation;
  service_id;
  staff_id;
  status;
  updated_at;
  appointmentStart;
  appointmentEnd

  constructor(data) {
    this.client_id = data.client_id;
    this.created_at = data.created_at;
    this.date_hour_begin = data.date_hour_begin;
    this.date_hour_end = data.date_hour_end;
    this.id = data.id;
    this.observation = data.observation;
    this.service_id = data.service_id;
    this.staff_id = data.staff_id;
    this.status = data.status;
    this.appointmentStart = this.convertAppointmentDate(this.date_hour_begin)
    this.appointmentEnd = this.convertAppointmentDate(this.date_hour_end)
  }

  convertAppointmentDate(date) {
    const convertedDate = new Date(date);

    const appointmentDate = new Date(
      convertedDate.getUTCFullYear(),
      convertedDate.getUTCMonth(),
      convertedDate.getUTCDate(),
      0, 0, 0
    ).toLocaleString("pt-BR");
  
    return appointmentDate;
  }
}

module.exports = {AppointmentDTO}