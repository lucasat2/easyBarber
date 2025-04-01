const validator = require("validator");
const appointmentsServices = require("../services/appointmentsServices.js");
const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/;

const listAllAppointmentsByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    if (!validator.isUUID(employeeId)) {
      return res
        .status(400)
        .json({ error: "Formato de ID do funcionário inválido" });
    }

    const result = await appointmentsServices.listAllAppointmentsByEmployee(
      employeeId
    );

    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: "Falha ao listar os agendamentos do funcionário" });
  }
};

const  createAppointment = async (req, res) => {
  try {
    const {
      employeeId,
      serviceId,
      date,
      clientName,
      clientEmail,
      clientPhoneNumber,
      startTime,
      observation,
    } = req.body;

    const userId = req.user.id;

    if (
      !employeeId ||
      !serviceId ||
      !date ||
      !clientName ||
      !clientEmail ||
      !clientPhoneNumber ||
      !startTime ||
      !observation
    ) {
      return res
        .status(400)
        .json({ error: "Preenchimento obrigatório de todos os campos" });
    }

    if (!validator.isUUID(userId)) {
      return res.status(400).json({ error: "ID inválido de usuário" });
    }

    if (!validator.isUUID(employeeId)) {
      return res.status(400).json({ error: "ID inválido de funcionário" });
    }

    if (!validator.isUUID(serviceId)) {
      return res.status(400).json({ error: "ID inválido de serviço" });
    }

    if (!validator.isDate(date)) {
      return res.status(400).json({ error: "Formato de data inválido" });
    }

    if (!validator.isAlpha(clientName, "pt-BR", { ignore: " " })) {
      return res
        .status(400)
        .json({ error: "Nome do cliente deve conter apenas letras" });
    }

    if (!validator.isEmail(clientEmail)) {
      return res.status(400).json({ error: "Formato de e-mail inválido" });
    }

    if (!validator.isMobilePhone(clientPhoneNumber, "pt-BR")) {
      return res
        .status(400)
        .json({ error: "Formato de número de telefone inválido" });
    }

    if (!timePattern.test(startTime)) {
      return res.status(400).json({ error: "Horário inválido" });
    }

    if (!validator.isAlpha(observation, "pt-BR", { ignore: " " })) {
      return res
        .status(400)
        .json({ error: "Campo de observação deve conter apenas letras" });
    }

    const result = await appointmentsServices.createAppointment(
      userId,
      employeeId,
      serviceId,
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
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Falha ao criar o agendamento" });
  }
};

const blockTimeForStaff = async (req, res) => {
  try {
    const { staffId, startDate, startTime, endDate, endTime, observation } =
      req.body;

    const userId = req.user.id;

    if (
      !staffId ||
      !startDate ||
      !startTime ||
      !endDate ||
      !endTime ||
      !observation
    ) {
      return res
        .status(400)
        .json({ error: "Preenchimento obrigatório de todos os campos" });
    }

    if (!validator.isUUID(userId)) {
      return res.status(400).json({ error: "ID de usuário inválido" });
    }

    if (!validator.isUUID(staffId)) {
      return res.status(400).json({ error: "ID de funcionário inválido" });
    }

    if (!validator.isDate(startDate)) {
      return res
        .status(400)
        .json({ error: "Formato inválido de data de início" });
    }

    if (!timePattern.test(startTime)) {
      return res
        .status(400)
        .json({ error: "Formato inválido de horário de início" });
    }

    if (!validator.isDate(endDate)) {
      return res.status(400).json({ error: "Formato inválido de data de fim" });
    }

    if (!timePattern.test(endTime)) {
      return res
        .status(400)
        .json({ error: "Formato inválido de horário de fim" });
    }

    if (!validator.isAlpha(observation, "pt-BR", { ignore: " " })) {
      return res
        .status(400)
        .json({ error: "Campo de observação deve conter apenas letras" });
    }

    const result = await appointmentsServices.blockEmployeeSchedule(
      userId,
      staffId,
      startDate,
      startTime,
      endDate,
      endTime,
      observation
    );

    if (result.statusCode === 201) {
      return res
        .status(result.statusCode)
        .json({ message: result.statusMessage });
    }

    res.status(result.statusCode).json({ error: result.statusMessage });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Falha no servidor ao bloquear o horário do funcionário",
    });
  }
};

module.exports = {
  createAppointment,
  listAllAppointmentsByEmployee,
  blockTimeForStaff,
};