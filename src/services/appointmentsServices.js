const AppointmentDTO = require("../DTO/appointmentsDTO.js")
const appointmentsRepository = require("../repository/appointmentsRepository.js");

const listAllAppointmentsByEmployee = async (employeeId) => {
  try {
    const queryResult = await appointmentsRepository.getAllAppointmentsByEmployee(
      employeeId
    );

    const result = queryResult.map(result=> new AppointmentDTO.AppointmentDTO(result))
    return  result
  } catch (e) {
    throw e;
  }
};

const getAppointmentFullInfo = async (appointmentId, userId) => {
  try {
    const response = await appointmentsRepository.retrieveAppointmentFullData(
      appointmentId,
      userId
    );

    return response;
  } catch (error) {
    throw error;
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
  listAllAppointmentsByEmployee,
  getAppointmentFullInfo,
  createAppointment,
  blockEmployeeSchedule,
  setScheduleStatus,
};