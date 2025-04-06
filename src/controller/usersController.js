const validator = require("validator");
const usersServices = require("../services/usersServices.js");
const companyNamePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ&0-9- ]+$/;
const codePostalPattern = /^\d{5}-?\d{3}$/;
const passwordPattern =
  /^(?=.*[a-zà-öø-ÿ])(?=.*[A-ZÀ-ÖØ-ß])(?=.*\d)(?=.*[!@#$%^&*()_+={[}\]:;"'<>,.?/~`|\\-])[A-Za-zÀ-ÖØ-öø-ÿ\d!@#$%^&*()_+={[}\]:;"'<>,.?/~`|\\-]{8,}$/;
const cnpjPattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

const getCompanyData = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!validator.isUUID(userId)) {
      return res.status(400).json({ error: "ID de usuário inválido" });
    }

    const result = await usersServices.getAuthenticatedCompanyData(userId);

    if (!result.errorCode) {
      return res.status(200).json(result);
    }

    res.status(result.errorCode).json({ error: result.errorMessage });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ error: "Falha no servidor ao buscar os dados da empresa" });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      name,
      cnpj,
      phoneNumber,
      state,
      city,
      street,
      number,
      postalCode,
      email,
      password,
    } = req.body;

    if (
      !name ||
      !cnpj ||
      !phoneNumber ||
      !state ||
      !city ||
      !street ||
      !number ||
      !postalCode ||
      !email ||
      !password
    ) {
      return res
        .status(400)
        .json({ error: "Preenchimento obrigatório de todos os campos" });
    }

    if (!companyNamePattern.test(name)) {
      return res.status(400).json({
        error:
          "O nome da empresa deve conter apenas letras, números, & e/ou hífen",
      });
    }

    if (!cnpjPattern.test(cnpj)) {
      return res.status(400).json({ error: "Formato de CNPJ inválido" });
    }

    if (!validator.isMobilePhone(phoneNumber, "pt-BR", { strictMode: false })) {
      return res.status(400).json({ error: "Número de telefone inválido" });
    }

    if (!validator.isAlpha(state, "pt-BR", { ignore: " " })) {
      return res.status(400).json({
        error: "O nome do estado deve conter apenas letras",
      });
    }

    if (!validator.isAlpha(city, "pt-BR", { ignore: " " })) {
      return res.status(400).json({
        error: "O nome da cidade deve conter apenas letras",
      });
    }

    if (!validator.isAlpha(street, "pt-BR", { ignore: " " })) {
      return res.status(400).json({
        error: "O nome da rua deve conter apenas letras",
      });
    }

    if (!validator.isInt(number, { min: 1 })) {
      return res.status(400).json({
        error: "O número do endereço deve ser um número inteiro positivo",
      });
    }

    if (!codePostalPattern.test(postalCode)) {
      return res.status(400).json({ error: "Formato de CEP inválido" });
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

    const response = await usersServices.createUser(
      name,
      cnpj,
      phoneNumber,
      state,
      city,
      street,
      number,
      postalCode,
      email,
      password
    );

    if (response) {
      return res
        .status(response.errorCode)
        .json({ error: response.errorMessage });
    }

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Falha no servidor ao criar o usuário" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      name,
      cnpj,
      phoneNumber,
      state,
      city,
      street,
      number,
      postalCode,
      email,
      password,
    } = req.body;

    if (!validator.isUUID(userId)) {
      return res.status(400).json({ error: "ID de usuário inválido" });
    }

    if (name && !companyNamePattern.test(name)) {
      return res.status(400).json({
        error:
          "O nome da empresa deve conter apenas letras, números, & e/ou hífen",
      });
    }

    if (cnpj && !cnpjPattern.test(cnpj)) {
      return res.status(400).json({ error: "Formato de CNPJ inválido" });
    }

    if (
      phoneNumber &&
      !validator.isMobilePhone(phoneNumber, "pt-BR", { strictMode: false })
    ) {
      return res.status(400).json({ error: "Número de telefone inválido" });
    }

    if (state && !validator.isAlpha(state, "pt-BR", { ignore: " " })) {
      return res.status(400).json({
        error: "O nome do estado deve conter apenas letras",
      });
    }

    if (city && !validator.isAlpha(city, "pt-BR", { ignore: " " })) {
      return res.status(400).json({
        error: "O nome da cidade deve conter apenas letras",
      });
    }

    if (street && !validator.isAlpha(street, "pt-BR", { ignore: " " })) {
      return res.status(400).json({
        error: "O nome da rua deve conter apenas letras",
      });
    }

    if (number && !validator.isInt(number, { min: 1 })) {
      return res.status(400).json({
        error: "O número do endereço deve ser um número inteiro positivo",
      });
    }

    if (postalCode && !codePostalPattern.test(postalCode)) {
      return res.status(400).json({ error: "Formato de CEP inválido" });
    }

    if (email && !validator.isEmail(email)) {
      return res.status(400).json({ error: "Formato de e-mail inválido" });
    }

    if (password && !passwordPattern.test(password)) {
      return res.status(400).json({
        error:
          "A senha deve possuir pelo menos 8 caracteres, uma letra minúscula, uma letra maiúscula, um número e um caractere especial",
      });
    }

    const result = await usersServices.updateUser(
      userId,
      name,
      cnpj,
      phoneNumber,
      state,
      city,
      street,
      number,
      postalCode,
      email,
      password
    );

    if (result) {
      return res.status(result.errorCode).json({ error: result.errorMessage });
    }

    return res.status(200).json({ message: "Usuário atualizado com sucesso." });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
};

module.exports = { getCompanyData, createUser, updateUser };