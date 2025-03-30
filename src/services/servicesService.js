const servicesRepository = require("../repository/servicesRepository");

const createService = async (
  userId,
  name,
  description,
  price,
  averageDuration
) => {
  try {
    const result = await servicesRepository.createService(
      userId,
      name,
      description,
      price,
      averageDuration
    );
    if (result) {
      return result;
    }
  } catch (error) {
    throw error;
  }
};

const listAllCompanyServices = async (userId) => {
  try {
    const result = await servicesRepository.listAllCompanyServices(userId);

    return result;
  } catch (error) {
    throw error;
  }
};

const updateService = async (
  userId,
  serviceID,
  name,
  description,
  price,
  averageDuration
) => {
  try {
    const result = await servicesRepository.updateService(
      userId,
      serviceID,
      name,
      description,
      price,
      averageDuration
    );

    if (result) {
      return result;
    }
  } catch (error) {
    throw error;
  }
};

const deleteService = async (serviceID) => {
  try {
    await servicesRepository.deleteService(serviceID);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createService,
  listAllCompanyServices,
  updateService,
  deleteService,
};
