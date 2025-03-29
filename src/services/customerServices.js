const customerRepository = require("../repository/customerRepository.js");

const listCompanyByName = async (company) => {
  try {
    const result = await customerRepository.getCompanyId(
      company
    );

    return result;
  } catch (e) {
    throw e;
  }
};

const listServicesCompanyByIdCompany = async (idCompany) => {
  try {
    const result = await customerRepository.getServices(
      idCompany
    );

    return result;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  listCompanyByName,
  listServicesCompanyByIdCompany
};