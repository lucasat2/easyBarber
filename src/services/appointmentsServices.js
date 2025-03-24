const appointmentsRepository = require("../repository/appointmentsRepository.js");

const createAppointment = async (
  employeeId,
  serviceId,
  date,
  clientId,
  startTime,
  observation
) => {
  try {
    const result = await appointmentsRepository.insertNewAppointment(
      employeeId,
      serviceId,
      date,
      clientId,
      startTime,
      observation
    );

    if (result) {
      result;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAppointment,
};