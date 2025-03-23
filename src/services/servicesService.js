const servicesModel = require("../models/servicesModel");

const createService = async (company_id, name, description, price, average_duration) => {
  try {
    const service = await servicesModel.createService(company_id, name, description, price, average_duration);
    return service;
  } catch (error) {
    console.log(error);
    return { error: true, errorCode: 500, errorMessage: "Falha ao criar o serviço" };
  }
};

const getServices = async () => {
  try {
    const services = await servicesModel.getServices();
    return services;
  } catch (error) {
    console.log(error);
    return { error: true, errorCode: 500, errorMessage: "Falha ao buscar os serviços" };
  }
};

const updateService = async (id, name, description, price, average_duration) => {
  try {
    const service = await servicesModel.updateService(id, name, description, price, average_duration);
    return service;
  } catch (error) {
    console.log(error);
    return { error: true, errorCode: 500, errorMessage: "Falha ao atualizar o serviço" };
  }
};

const deleteService = async (id) => {
  try {
    const service = await servicesModel.deleteService(id);
    return service;
  } catch (error) {
    console.log(error);
    return { error: true, errorCode: 500, errorMessage: "Falha ao deletar o serviço" };
  }
};

module.exports = {
  createService,
  getServices,
  updateService,
  deleteService,
};
