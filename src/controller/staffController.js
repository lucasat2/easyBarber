const validator = require("validator");
const staffServices = require ("../services/staffServices");
const surnamePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,50}$/;
const phonePattern = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
const todayDate = new Date()



const list = async (req, res) => {
  try {
    const response = await staffServices.listAllStaff();

    res.status(200).json({response});

  } catch (error) {
    console.log(error)

    res.status(500).json({error: "Falha ao listar os funcionários"});
  }
};

const create = async (req, res) => {
  try{  
    const {name, surname, cpf, email, phone_number, birthdate, cep, address} = req.body;

    const userId = req.cookies.id 

    if (!name || !surname || !cpf || !email || !phone_number || !birthdate || !cep || !address ) {
      return res
        .status(400)
        .json({ error: "Preenchimento obrigatório de todos os campos" });
    }

    if (
      !validator.isAlpha(name, "pt-BR") ||
      !validator.isLength(name, { min: 3, max: 20 })
    ) {
      return res.status(400).json({
        error:
          "O nome deve ter entre 3 e 20 caracteres, e conter apenas letras",
      });
    }

    if (!surnamePattern.test(surname)) {
      return res.status(400).json({
        error:
          "O sobrenome deve ter entre 3 e 50 caracteres, e conter apenas letras",
      });
    }

    if(!phonePattern.test(phone_number)) {
      return res.status(400).json({
        error:
          "O telefone deve conter DDD e entre 9 ou 8 números"
      })
    }

    if (birthdate >= todayDate) {
      return res.status(400).json({
        error:
          "Data de nascimento não pode ser presente ou futura"
      })
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Formato de e-mail inválido" });
    }

    await staffServices.createStaff(
      name, 
      surname, 
      cpf, 
      email, 
      phone_number, 
      birthdate,
      cep, 
      address,
      userId
    );

    res.status(201).json({ message: "Funcionário criado com sucesso" });

  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Falha ao criar o funcionário" });;
  }
}

const update = async (req, res) => {
  try{  
    const {name, surname, cpf, email, phone_number, cep, address, id} = req.body;

    if (
      !validator.isAlpha(name, "pt-BR") ||
      !validator.isLength(name, { min: 3, max: 20 })
    ) {
      return res.status(400).json({
        error:
          "O nome deve ter entre 3 e 20 caracteres, e conter apenas letras",
      });
    }

    if (!surnamePattern.test(surname)) {
      return res.status(400).json({
        error:
          "O sobrenome deve ter entre 3 e 50 caracteres, e conter apenas letras",
      });
    }

    if(!phonePattern.test(phone_number)) {
      return res.status(400).json({
        error:
          "O telefone deve conter DDD e entre 9 ou 8 números"
      })
    }

    if (birthdate >= todayDate) {
      return res.status(400).json({
        error:
          "Data de nascimento não pode ser presente ou futura"
      })
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Formato de e-mail inválido" });
    }

    await staffServices.updateStaff(
      name, 
      surname, 
      cpf, 
      email, 
      phone_number, 
      cep, 
      address,
      id
    );

    res.status(201).json({ message: "Funcionário atualizado com sucesso" });
  } catch (error) {

    res.status(500).json({ error: "Falha ao atualizar o funcionário" });;
  }
}

const remove  = async (req, res) => {
  const id = req.body.id;

  try {
    const response = await staffServices.deleteStaff(id);

    res.status(200).json({response});
  } catch (error) {
    res.status(500).json({error});
  }
};

module.exports = {list, create, update, remove}