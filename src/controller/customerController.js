const customerServices = require("../services/customerServices.js");

const listCompanyId = async (req, res) => {
  try {
    const { idCompany } = req.body;
    const result = await customerServices.listCompanyById(idCompany);

    if (!result) {
      return res.status(404).json({ error: "Empresa não encontrada" });
    }
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno ao buscar empresa" });
  }
};

const listServicesByCompany = async (req, res) => {
  try {
    const { idCompany } = req.body;

    const result = await customerServices.listServicesCompanyByIdCompany(
      idCompany
    );

    if (!result) {
      return res.status(404).json({ error: "Nenhum serviço encontrado" });
    }
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno ao buscar serviços" });
  }
};

const listStaffByService = async (req, res) => {
  try {
    const { idCompany, idService } = req.body;

    const result = await customerServices.listStaffByCompanyAndService(
      idCompany,
      idService
    );

    if (!result) {
      return res
        .status(404)
        .json({ error: "Nenhum funcionário encontrado para o serviço" });
    }
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno ao buscar funcionários" });
  }
};

const listScheduleByStaff = async (req, res) => {
  try {
    const { idStaff, date } = req.body;

    if (!date) {
      return res.status(404).json({ error: "Envie uma data" });
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(date)) {
      return res
        .status(400)
        .json({ error: "Formato de data inválido. Use YYYY-MM-DD" });
    }

    const getSchedules = await customerServices.listSchedulesBuStaff(
      idStaff,
      date
    );
    if (!getSchedules) {
      return res
        .status(400)
        .json({ error: "Funcionário não trabalha nesse dia" });
    }

    res.json({ getSchedules });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno ao buscar horários" });
  }
};

const createAppointments = async (req, res) => {
  try {
    const {
      idCompany,
      idStaff,
      idService,
      date,
      clientName,
      clientEmail,
      clientPhoneNumber,
      startTime,
      observation,
    } = req.body;
    const result = await customerServices.insertNewAppointment(
      idCompany,
      idStaff,
      idService,
      date,
      clientName,
      clientEmail,
      clientPhoneNumber,
      startTime,
      observation
    );

    if (result.statusCode === 201) {
      return res
        .status(result.statusCode)
        .json({ message: result.statusMessage });
    }

    res.status(result.statusCode).json({ error: result.statusMessage });
  } catch (e) {
    console.log(e);

    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  listCompanyId,
  listServicesByCompany,
  listStaffByService,
  listScheduleByStaff,
  createAppointments,
};