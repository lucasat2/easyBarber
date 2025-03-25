const appointmentsRepository = require("../repository/appointmentsRepository.js");

const listAllAppointmentsByEmployee = async employeeId => {
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
	listAllAppointmentsByEmployee
};
