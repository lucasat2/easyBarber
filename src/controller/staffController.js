const validator = require("validator");
const staffRepository = require ("../repository/staffRepository.js");

const list = async (req, res) => {
  try {
    const response = await staffRepository.listAllStaff();

    res.status(200).json({response});
  } catch (error) {
    res.status(500).json({error});
  }
};

const create = async (req, res) => {
  try{  
    const {name, surname, cpf, email, phone_number, cep, address} = req.body;

    if (!name || !surname || !email ) {
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

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Formato de e-mail inválido" });
    }

    const result = await staffRepository.createStaff(
      name, 
      surname, 
      cpf, 
      email, 
      phone_number, 
      cep, 
      address
    );

    if (result) {
      return res.status(result.errorCode).json({ error: result.errorMessage });
    }

    res.status(201).json({ message: "Funcionário criado com sucesso" });
  } catch (error) {

    res.status(500).json({ error: "Falha ao criar o funcionário" });;
  }
}

const update = async (req, res) => {
  try{  
    const {name, surname, cpf, email, phone_number, cep, address, id} = req.body;

    if (!name || !surname || !email ) {
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

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Formato de e-mail inválido" });
    }

    const result = await staffRepository.updateStaff(
      name, 
      surname, 
      cpf, 
      email, 
      phone_number, 
      cep, 
      address,
      id
    );

    if (result) {
      return res.status(result.errorCode).json({ error: result.errorMessage });
    }

    res.status(201).json({ message: "Funcionário atualizado com sucesso" });
  } catch (error) {

    res.status(500).json({ error: "Falha ao atualizar o funcionário" });;
  }
}

const remove  = async (req, res) => {
  const id = req.body.id;

  try {
    const response = await staffRepository.removeStaff(id);

    res.status(200).json({response});
  } catch (error) {
    res.status(500).json({error});
  }
};

module.exports = {list, create, update, remove}