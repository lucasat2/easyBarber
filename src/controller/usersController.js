const validator = require("validator");
const usersServices = require("../services/usersServices.js");
const companyNamePattern = /^[A-Za-z0-9&-]{3,20}$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const createUser = async (req, res) => {
  try {
    const { name, surname, companyName, email, password } = req.body;

    if (!name || !surname || !companyName || !email || !password) {
      return res
        .status(400)
        .json({ error: "Preenchimento obrigatório de todos os campos" });
    }

    if (
      !validator.isAlpha(name) ||
      !validator.isLength(name, { min: 3, max: 20 })
    ) {
      return res.status(400).json({
        error:
          "O nome deve ter entre 3 e 20 caracteres, e conter apenas letras",
      });
    }

    if (
      !validator.isAlpha(surname) ||
      !validator.isLength(surname, { min: 3, max: 50 })
    ) {
      return res.status(400).json({
        error:
          "O sobrenome deve ter entre 3 e 50 caracteres, e conter apenas letras",
      });
    }

    if (!companyNamePattern.test(companyName)) {
      return res.status(400).json({
        error:
          "O nome da empresa deve ter entre 3 e 20 caracteres, e conter apenas letras, números, & e/ou hífen",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Formato de e-mail inválido" });
    }

    if (!passwordPattern.test(password)) {
      return res.status(400).json({
        error:
          "A senha deve possuir pelo menos 8 caracteres, uma letra minúscula, uma letra maiúscula, um número e um caractere especial",
      });
    }

    const result = await usersServices.createUser(
      name,
      surname,
      companyName,
      email,
      password
    );

    if (result) {
      return res.status(result.errorCode).json({ error: result.errorMessage });
    }

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Falha ao criar o usuário" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id; 
    const userData = req.body; 

    
    const updatedUser = await userService.updateUser(userId, userData);

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar usuário.' });
  }
};

module.exports = {createUser, updateUser };