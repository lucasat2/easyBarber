const staffRepository = require("../repository/staffRepository.js");

const listAllStaff = async (userId) => {
  try {
    const result = await staffRepository.getAllStaff(userId);

    return result;
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

const deleteStaff = async (staffId) => {
  try {
    await staffRepository.removeStaff(staffId);
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

module.exports = {
  listAllStaff,
  createStaff,
  linkServicesToStaff,
  updateStaff,
  deleteStaff,
  detachServiceFromStaff,
};