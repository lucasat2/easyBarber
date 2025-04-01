const customerRepository = require("../repository/customerRepository.js");

const listCompanyByName = async company => {
	try {
		const result = await customerRepository.getCompanyId(company);

		return result;
	} catch (e) {
		throw e;
	}
};

const listServicesCompanyByIdCompany = async idCompany => {
	try {
		const result = await customerRepository.getServices(idCompany);

		return result;
	} catch (e) {
		throw e;
	}
};

const listStaffByCompanyAndService = async (idCompany, idService) => {
	try {
		const result = await customerRepository.getServices(idCompany);
		const serviceObj = result.find(item => item.id == idService);

		if (serviceObj) {
			const resultQuery = await customerRepository.getServicesByStaff(
				idService
			);

			return resultQuery;
		}
	} catch (e) {
		throw e;
	}
};

const listSchedulesBuStaff = async (staff, date) => {
	try {
		const result = await customerRepository.getSchedules(staff, date);

		return result;
	} catch (e) {
		throw e;
	}
};

const insertNewAppointment = async (
	idCompany,
	idStaff,
	idService,
	date,
	clientName,
	clientEmail,
	clientPhoneNumber,
	startTime,
	observation
) => {
	try {
		const result = await customerRepository.insertNewAppointment(
			idCompany,
			idStaff,
			idService,
			date,
			clientName,
			clientEmail,
			clientPhoneNumber,
			startTime,
			observation
		);

		return result;
	} catch (e) {
		throw e;
	}
};

module.exports = {
	listCompanyByName,
	listServicesCompanyByIdCompany,
	listStaffByCompanyAndService,
	listSchedulesBuStaff,
	insertNewAppointment
};
