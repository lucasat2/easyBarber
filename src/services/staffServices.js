const staffRepository = require("../repository/staffRepository.js");

const listAllStaff = async userId => {
	try {
		const result = await staffRepository.getAllStaff(userId);

		return result;
	} catch (error) {
		throw error;
	}
};

const getEmployeeDetails = async (employeeId, userId) => {
	try {
		const response = await staffRepository.findStaffInfo(employeeId, userId);

		return response;
	} catch (error) {
		throw error;
	}
};

const createStaff = async (
	name,
	surname,
	cpf,
	email,
	phoneNumber,
	birthdate,
	postalCode,
	userId
) => {
	try {
		const result = await staffRepository.createStaff(
			name,
			surname,
			cpf,
			email,
			phoneNumber,
			birthdate,
			postalCode,
			userId
		);

		if (result) {
			return result;
		}
	} catch (error) {
		throw error;
	}
};

const linkServicesToStaff = async (userId, staffId, serviceId) => {
	try {
		const response = await staffRepository.associateServicesWithStaff(
			userId,
			staffId,
			serviceId
		);

		return response;
	} catch (error) {
		throw error;
	}
};

const attachSchedulesToStaff = async (userId, staffId, schedulesData) => {
	try {
		const response = await staffRepository.bindSchedulesToStaff(
			userId,
			staffId,
			schedulesData
		);

		return response;
	} catch (error) {
		throw error;
	}
};

const updateStaff = async (
	name,
	surname,
	cpf,
	email,
	phoneNumber,
	birthdate,
	postalCode,
	id
) => {
	try {
		await staffRepository.updateStaff(
			name,
			surname,
			cpf,
			email,
			phoneNumber,
			birthdate,
			postalCode,
			id
		);
	} catch (error) {
		throw error;
	}
};

const deleteStaff = async (staffId, userId) => {
  try {
    const response = await staffRepository.removeStaff(staffId, userId);

    return response;
  } catch (error) {
    throw error;
  }
};

const detachServiceFromStaff = async (userId, staffId, serviceId) => {
	try {
		const response = await staffRepository.unlinkServiceFromStaff(
			userId,
			staffId,
			serviceId
		);

		return response;
	} catch (error) {
		throw error;
	}
};

const getStaffServicesById = async id => {
	try {
		const response = await staffRepository.getStaffServices(id);

		return response;
	} catch (error) {
		throw error;
	}
};

const getStaffHoursById = async id => {
	try {
		const response = await staffRepository.getStaffHours(id);

		return response;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	listAllStaff,
	getEmployeeDetails,
	createStaff,
	linkServicesToStaff,
	attachSchedulesToStaff,
	updateStaff,
	deleteStaff,
	detachServiceFromStaff,
	getStaffServicesById,
	getStaffHoursById
};
