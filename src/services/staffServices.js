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

const deleteStaff = async (id) => {
  try {
    await staffRepository.removeStaff(id);
  } catch (error) {
    throw error;
  }
};

module.exports = { listAllStaff, createStaff, updateStaff, deleteStaff };
