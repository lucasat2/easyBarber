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

const listStaffByCompanyAndService = async (idCompany, service) => {
	try {
		const result = await customerRepository.getServices(idCompany);
		const serviceObj = result.find(item => item.name == service);

		if (serviceObj) {
			const resultQuery = await customerRepository.getServicesByStaff(
				serviceObj.id
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

module.exports = {
	listCompanyByName,
	listServicesCompanyByIdCompany,
	listStaffByCompanyAndService,
	listSchedulesBuStaff
};
