const validator = require("validator");
const servicesService = require("../services/servicesService");
const priceRegex = /^\d+(\.\d{1,2})?$/;

const createService = async (req, res) => {
  try {
    const { name, description, price, averageDuration } = req.body;
    const userId = req.user.id;

    if (!validator.isUUID(userId)) {
      return res.status(400).json({ error: "ID de usuário inválido" });
    }

    if (!name || !description || !price || !averageDuration) {
      return res
        .status(400)
        .json({ error: "Preenchimento obrigatório de todos os campos" });
    }

    if (!validator.isLength(name, { min: 1, max: 50 })) {
      return res.status(400).json({
        error: "O nome do serviço deve conter no máximo 50 caracteres",
      });
    }

    if (!validator.isLength(description, { min: 1, max: 100 })) {
      return res.status(400).json({
        error: "O campo de descrição deve conter no máximo 100 caracteres",
      });
    }

    if (!priceRegex.test(price)) {
      return res.status(400).json({
        error: "Preço deve ser um número válido com até duas casas decimais",
      });
    }

    if (!validator.isInt(averageDuration, { min: 1 })) {
      return res
        .status(400)
        .json({ error: "Duração deve ser um número válido e em minutos" });
    }

    const result = await servicesService.createService(
      userId,
      name,
      description,
      price,
      averageDuration
    );

    if (result) {
      return res.status(result.errorCode).json({ error: result.errorMessage });
    }

    res.status(201).json({ message: "Serviço criado com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Falha ao criar o serviço" });
  }
};

const getServiceData = async (req, res) => {
  try {
    const serviceId = req.params.id;

    const userId = req.user.id;

    if (!validator.isUUID(serviceId)) {
      return res.status(400).json({ error: "ID inválido de serviço" });
    }

    if (!validator.isUUID(userId)) {
      return res.status(400).json({ error: "ID inválido de usuário" });
    }

    const result = await servicesService.findServiceById(serviceId, userId);

    if (!result.errorCode) {
      return res.status(200).json(result);
    }

    res.status(result.errorCode).json({ error: result.errorMessage });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ error: "Falha no servidor ao buscar informações do serviço" });
  }
};

const listAllCompanyServices = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!validator.isUUID(userId)) {
      return res.status(400).json({ error: "ID de usuário inválido" });
    }

    const result = await servicesService.listAllCompanyServices(userId);

    if (!Array.isArray(result)) {
      return res.status(result.errorCode).json({ error: result.errorMessage });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Falha ao buscar os serviços da empresa" });
  }
};

const updateService = async (req, res) => {
  try {
    const userId = req.user.id;

    const { serviceID, name, description, price, averageDuration } = req.body;

    if (!validator.isUUID(serviceID)) {
      return res.status(400).json({ error: "ID de serviço inválido" });
    }

    if (!validator.isUUID(userId)) {
      return res.status(400).json({ error: "ID de usuário inválido" });
    }

    if (name && !validator.isLength(name, { min: 1, max: 50 })) {
      return res.status(400).json({
        error: "O nome do serviço deve conter no máximo 50 caracteres",
      });
    }

    if (description && !validator.isLength(description, { min: 1, max: 100 })) {
      return res.status(400).json({
        error: "O campo de descrição deve conter no máximo 100 caracteres",
      });
    }

    if (price && !validator.isFloat(price, { min: 0 })) {
      return res
        .status(400)
        .json({ error: "Preço deve ser um número positivo" });
    }

    if (averageDuration && !validator.isInt(averageDuration, { min: 1 })) {
      return res
        .status(400)
        .json({ error: "Duração deve ser um número válido e em minutos" });
    }

    const result = await servicesService.updateService(
      userId,
      serviceID,
      name,
      description,
      price,
      averageDuration
    );

    if (result) {
      return res.status(result.errorCode).json({ error: result.errorMessage });
    }

    res.status(200).json({ message: "Serviço atualizado com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Falha ao atualizar o serviço" });
  }
};

const deleteService = async (req, res) => {
  try {
    const { serviceId } = req.body;

    const userId = req.user.id;

    if (!validator.isUUID(serviceId)) {
      return res.status(400).json({ error: "ID inválido de serviço" });
    }

    if (!validator.isUUID(userId)) {
      return res.status(400).json({ error: "ID inválido de usuário" });
    }

    const result = await servicesService.deleteService(serviceId, userId);

    if (result) {
      return res
        .status(result.statusCode)
        .json({ error: result.statusMessage });
    }

    res.status(200).json({ message: "Serviço deletado com sucesso" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Falha ao deletar o serviço" });
  }
};

module.exports = {
  createService,
  getServiceData,
  listAllCompanyServices,
  updateService,
  deleteService,
};