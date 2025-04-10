const loginServices = require("../services/loginServices.js");
const validator = require("validator");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (validator.isEmpty(email) || validator.isEmpty(password)) {
      return res.status(400).json({
        error: "Preenchimento obrigatório dos campos de e-mail e senha",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Formato de e-mail inválido" });
    }

    const result = await loginServices.authenticateUser(email, password);

    if (typeof result !== "string") {
      return res.status(result.errorCode).json({ error: result.errorMessage });
    }

    res.cookie("session_id", result, {
      httpOnly: true,
      maxAge: 864000000,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Falha no servidor" });
  }
};

module.exports = { login };