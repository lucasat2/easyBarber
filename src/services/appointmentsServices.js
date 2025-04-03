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

module.exports = {
  createAppointment,
  listAllAppointmentsByEmployee,
  blockEmployeeSchedule,
};