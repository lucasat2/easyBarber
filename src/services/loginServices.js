const loginRepository = require("../repository/loginRepository.js");
const { comparePassword } = require("../utils/comparePassword.js");
const jwt = require("jsonwebtoken");
const config = require("../config");

const findRegisteredUser = async (email) => {
  try {
    const user = await loginRepository.getUser(email);

    return user;
  } catch (error) {
    throw error;
  }
};

const authenticateUser = async (userData, password) => {
  try {
    if (userData.deleted) {
      return { auth: false, error: "E-mail inexistente" };
    }

    const isPasswordValid = await comparePassword(password, userData.password);

    if (!isPasswordValid) {
      return { auth: false, error: "Senha inválida" };
    }

    const user = {
      id: userData.id,
      userStatus: userData.deleted,
    };

    const sessionToken = jwt.sign({ user }, config.SECRET_KEY, {
      expiresIn: 864000,
    });

    return {
      auth: true,
      sessionToken: sessionToken,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findRegisteredUser,
  authenticateUser,
};