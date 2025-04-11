const validator = require("validator");
const appointmentsServices = require("../services/appointmentsServices.js");
const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/;
const phonePattern = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

const listAllAppointmentsByEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validator.isUUID(id)) {
      return res
        .status(400)
        .json({ error: "Formato de ID do funcionário inválido" });
    }

    const result = await appointmentsServices.listAllAppointmentsByEmployee(id);

    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: "Falha ao listar os agendamentos do funcionário" });
  }
};

const getAppointmentFullData = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const userId = req.user.id;

    if (!validator.isUUID(appointmentId)) {
      return res.status(400).json({ error: "ID inválido de agendamento" });
    }

    if (!validator.isUUID(userId)) {
      return res.status(400).json({ error: "ID inválido de usuário" });
    }

    const result = await appointmentsServices.getAppointmentFullInfo(
      appointmentId,
      userId
    );

    if (!result.statusCode) {
      return res.status(200).json(result);
    }

    res.status(result.statusCode).json({ error: result.statusMessage });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ error: "Falha no servidor ao buscar os dados do agendamento" });
  }
};

const createAppointment = async (req, res) => {
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

    if (!phonePattern.test(clientPhoneNumber)) {
      return res
        .status(400)
        .json({ error: "Formato de número de telefone inválido" });
    }

    if (!timePattern.test(startTime)) {
      return res.status(400).json({ error: "Horário inválido" });
    }

    if (
      !validator.matches(observation, /^[a-zA-Z0-9À-ÿ\s.,]*$/) ||
      !validator.isLength(observation, { min: 0, max: 100 })
    ) {
      return res.status(400).json({
        error:
          "O campo de observação deve conter no máximo 100 caracteres e apenas letras, números, vírgulas, espaços e/ou pontos",
      });
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

    if (
      !validator.matches(observation, /^[a-zA-Z0-9À-ÿ\s.,]*$/) ||
      !validator.isLength(observation, { min: 0, max: 100 })
    ) {
      return res.status(400).json({
        error:
          "O campo de observação deve conter no máximo 100 caracteres e apenas letras, números, vírgulas, espaços e/ou pontos",
      });
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

const updateScheduleStatus = async (req, res) => {
  try {
    const { appointmentId, staffId, newStatus } = req.body;

    const userId = req.user.id;

    if (!validator.isUUID(appointmentId)) {
      return res.status(400).json({ error: "ID inválido de agendamento" });
    }

    if (!validator.isUUID(staffId)) {
      return res.status(400).json({ error: "ID inválido de funcionário" });
    }

    if (!validator.isUUID(userId)) {
      return res.status(400).json({ error: "ID inválido de usuário" });
    }

    const validStatus = ["AGENDADO", "CONCLUÍDO", "CANCELADO", "BLOQUEADO"];

    if (typeof newStatus !== "string") {
      return res.status(400).json({ error: "Formato inválido de status" });
    }

    if (!validStatus.includes(newStatus)) {
      return res.status(400).json({ error: "Status inválido" });
    }

    const result = await appointmentsServices.setScheduleStatus(
      userId,
      appointmentId,
      staffId,
      newStatus
    );

    if (result) {
      return res
        .status(result.statusCode)
        .json({ error: result.statusMessage });
    }

    res
      .status(200)
      .json({ message: "Status de agendamento alterado com sucesso" });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Falha no servidor durante o processo de alteração do status",
    });
  }
};

module.exports = {
  createAppointment,
  getAppointmentFullData,
  listAllAppointmentsByEmployee,
  blockTimeForStaff,
  updateScheduleStatus,
};