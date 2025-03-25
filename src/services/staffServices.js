const staffRepository = require("../repository/staffRepository.js");


const listAllStaff = async () => {
  try {
    const staff = await staffRepository.getAllStaff();

    return staff;
  } catch (error) {
    throw error;
  }
};

const createStaff = async (staffName, surname, cpf, email, phone_number, birthdate, cep, address, userId) => {
  try {
    await staffRepository.createStaff(      
      staffName,
      surname,
      cpf,
      email,
      phone_number,
      birthdate,
      cep,
      address,
      userId);

  } catch (error) {
    throw error;
  }
};

const updateStaff = async (staffName, surname, cpf, email, phone_number, cep, address, id) => {
  try {
    await staffRepository.updateStaff(staffName, surname, cpf, email, phone_number, cep, address, id);

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

module.exports = {listAllStaff, createStaff, updateStaff, deleteStaff}