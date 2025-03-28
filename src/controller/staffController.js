const validator = require("validator");
const staffServices = require("../services/staffServices");
const phonePattern = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
const codePostalPattern = /^\d{5}-?\d{3}$/;
const cpfPattern = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
const todayDate = new Date()

const list = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!validator.isUUID(userId)) {
      return res.status(400).json({
        error: "ID de usuário inválido",
      });
    }

    const response = await staffServices.listAllStaff(userId);

    if (!Array.isArray(response)) {
      return res
        .status(response.errorStatus)
        .json({ error: response.errorMessage });
    }

    res.status(200).json({ response });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Falha ao listar os funcionários" });
  }
};

const create = async (req, res) => {
  try {
    const { name, surname, cpf, email, phoneNumber, birthdate, postalCode } =
      req.body;

    const userId = req.user.id;

    if (!validator.isUUID(userId)) {
      return res.status(400).json({
        error: "ID de usuário inválido",
      });
    }


    if (name && !validator.isAlpha(name, "pt-BR")) {
      return res.status(400).json({
        error: "O nome deve conter apenas letras",
      });
    }

    if (surname && !validator.isAlpha(surname, "pt-BR", { ignore: " " })) {
      return res.status(400).json({
        error: "O sobrenome deve conter apenas letras",
      });
    }

    if (cpf && !cpfPattern.test(cpf)) {
      return res.status(400).json({
        error: "O formato de CPF está inválido",
      });
    }

    if (phoneNumber && !phonePattern.test(phoneNumber)) {
      return res.status(400).json({
        error: "O telefone deve conter DDD e entre 9 ou 8 números",
      });
    }

    if (birthdate && (!validator.isDate(birthdate) || new Date(birthdate) >= todayDate)) {
      return res.status(400).json({
        error: "Data de nascimento não pode ser presente ou futura",
      });
    }

    if (email && !validator.isEmail(email)) {
      return res.status(400).json({ error: "Formato de e-mail inválido" });
    }

    if (postalCode && !codePostalPattern.test(postalCode)) {
      return res.status(400).json({ error: "Formato de CEP inválido" });
    }

    const result = await staffServices.createStaff(
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
      return res
        .status(result.errorStatus)
        .json({ error: result.errorMessage });
    }

    res.status(201).json({ message: "Funcionário criado com sucesso" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Falha ao criar o funcionário" });
  }
};

const update = async (req, res) => {
  try {
    const {
      name,
      surname,
      cpf,
      email,
      phoneNumber,
      birthdate,
      postalCode,
      id,
    } = req.body;

    if (
      !name ||
      !surname ||
      !cpf ||
      !email ||
      !phoneNumber ||
      !birthdate ||
      !postalCode
    ) {
      return res
        .status(400)
        .json({ error: "Preenchimento obrigatório de todos os campos" });
    }

    if (!validator.isUUID(id)) {
      return res.status(400).json({
        error: "ID de funcionário inválido",
      });
    }

    if (!validator.isAlpha(name, "pt-BR")) {
      return res.status(400).json({
        error: "O nome deve conter apenas letras",
      });
    }

    if (!validator.isAlpha(surname, "pt-BR", { ignore: " " })) {
      return res.status(400).json({
        error: "O sobrenome deve conter apenas letras",
      });
    }

    if (!cpfPattern.test(cpf)) {
      return res.status(400).json({
        error: "O formato de CPF está inválido",
      });
    }

    if (!phonePattern.test(phoneNumber)) {
      return res.status(400).json({
        error: "O telefone deve conter DDD e entre 9 ou 8 números",
      });
    }

    if (birthdate && (!validator.isDate(birthdate) || new Date(birthdate) >= todayDate)) {
      return res.status(400).json({
        error: "Data de nascimento não pode ser presente ou futura",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Formato de e-mail inválido" });
    }

    if (!codePostalPattern.test(postalCode)) {
      return res.status(400).json({ error: "Formato de CEP inválido" });
    }

    await staffServices.updateStaff(
      name,
      surname,
      cpf,
      email,
      phoneNumber,
      birthdate,
      postalCode,
      id
    );

    res.status(201).json({ message: "Funcionário atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Falha ao atualizar o funcionário" });
  }
};

const remove = async (req, res) => {

  const {staffId} = req.body
  try {
    await staffServices.deleteStaff(staffId);

    res.status(200).json({ message: "Funcionário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Falha ao deletar o funcionário" });
  }
};

module.exports = { list, create, update, remove };
