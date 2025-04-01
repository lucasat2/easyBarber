const loginRepository = require("../repository/loginRepository.js");
const { comparePassword } = require("../utils/comparePassword.js");
const jwt = require("jsonwebtoken");
const config = require("../config");

const authenticateUser = async (email, password) => {
  try {
    const userData = await loginRepository.getUserData(email);

    if (!userData) {
      return {
        errorCode: 404,
        errorMessage: "E-mail não cadastrado",
      };
    }

    const isPasswordValid = await comparePassword(password, userData.password);

    if (!isPasswordValid) {
      return { errorCode: 404, errorMessage: "Senha inválida" };
    }

    const user = {
      id: userData.id,
    };

    const sessionToken = jwt.sign({ user }, config.SECRET_KEY, {
      expiresIn: 864000,
    });

    return sessionToken;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  authenticateUser,
};