const servicesService = require("../services/servicesService");

const createService = async (req, res) => {
  try {
    const { company_id, name, description, price, average_duration } = req.body;

    if (!company_id || !name || !description || !price || !average_duration) {
      return res.status(400).json({ error: "Preenchimento obrigatório de todos os campos" });
    }

    const result = await servicesService.createService(company_id, name, description, price, average_duration);

    if (result.error) {
      return res.status(result.errorCode).json({ error: result.errorMessage });
    }

    res.status(201).json({ message: "Serviço criado com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Falha ao criar o serviço" });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await servicesService.getServices();
    res.status(200).json(services);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Falha ao buscar os serviços" });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, average_duration } = req.body;

    if (!name || !description || !price || !average_duration) {
      return res.status(400).json({ error: "Preenchimento obrigatório de todos os campos" });
    }

    const result = await servicesService.updateService(id, name, description, price, average_duration);

    if (result.error) {
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
    const { id } = req.params;
    const result = await servicesService.deleteService(id);

    if (result.error) {
      return res.status(result.errorCode).json({ error: result.errorMessage });
    }

    res.status(200).json({ message: "Serviço deletado com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Falha ao deletar o serviço" });
  }
};

module.exports = {
  createService,
  getServices,
  updateService,
  deleteService,
};
