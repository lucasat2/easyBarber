const appointmentsRepository = require("../repository/appointmentsRepository.js");

const listAllAppointmentsByEmployee = async (employeeId) => {
  try {
    const result = await appointmentsRepository.getAllAppointmentsByEmployee(
      employeeId
    );

    return result;
  } catch (e) {
    throw e;
  }
};

const createAppointment = async (
  userId,
  employeeId,
  serviceId,
  date,
  clientName,
  clientEmail,
  clientPhoneNumber,
  startTime,
  observation
) => {
  try {
    const result = await appointmentsRepository.insertNewAppointment(
      userId,
      employeeId,
      serviceId,
      date,
      clientName,
      clientEmail,
      clientPhoneNumber,
      startTime,
      observation
    );

    return result;
  } catch (error) {
    throw error;
  }
};

const blockEmployeeSchedule = async (
  userId,
  staffId,
  startDate,
  startTime,
  endDate,
  endTime,
  observation
) => {
  try {
    const response = await appointmentsRepository.setEmployeeScheduleAsBlocked(
      userId,
      staffId,
      startDate,
      startTime,
      endDate,
      endTime,
      observation
    );

    return response;
  } catch (error) {
    throw error;
  }
};

const setScheduleStatus = async (userId, appointmentId, staffId, newStatus) => {
  try {
    const response = await appointmentsRepository.modifyAppointmentStatus(
      userId,
      appointmentId,
      staffId,
      newStatus
    );

    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAppointment,
  listAllAppointmentsByEmployee,
  blockEmployeeSchedule,
  setScheduleStatus,
};