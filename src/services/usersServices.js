const { hashPassword } = require("../utils/hashPassword.js");
const usersRepository = require("../repository/usersRepository.js");

const createUser = async (name, surname, companyName, email, password) => {
  try {
    const hashedPassword = await hashPassword(password);

    if (!hashedPassword) {
      return {
        errorCode: 500,
        errorMessage: "Falha na geração do hash da senha",
      };
    }

    const result = await usersRepository.insertNewUser(
      name,
      surname,
      companyName,
      email,
      hashedPassword
    );

    if (result) {
      return result;
    }
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId, userData) => {
  try {
    // Verifica se o usuário existe
    const existingUser = await userRepository.getUserById(userId);
    if (!existingUser) {
      return null;
    }

    // Atualiza os dados do usuário
    const updatedUser = await userRepository.updateUser(userId, userData);
    return updatedUser;
  } catch (error) {
    throw new Error('Erro ao atualizar usuário: ' + error.message);
  }
};

module.exports = {
  createUser,updateUser
};