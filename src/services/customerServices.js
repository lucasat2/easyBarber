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
		// const result = await customerRepository.getServicesByStaff(idCompany, service);

		if (serviceObj) {
      // 
			// console.log(serviceObj.id);
      const resultQuery = await customerRepository.getServicesByStaff(serviceObj.id);

			return resultQuery;
		}
    // 
    // console.log("erro")
	} catch (e) {
		throw e;
	}
};

module.exports = {
	listCompanyByName,
	listServicesCompanyByIdCompany,
	listStaffByCompanyAndService
};
