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

const findServiceById = async (serviceId, userId) => {
  try {
    const response = await servicesRepository.getServiceDetails(
      serviceId,
      userId
    );

    return response;
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

const deleteService = async (serviceId, userId) => {
  try {
    const response = await servicesRepository.deleteService(serviceId, userId);

    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createService,
  findServiceById,
  listAllCompanyServices,
  updateService,
  deleteService,
};
