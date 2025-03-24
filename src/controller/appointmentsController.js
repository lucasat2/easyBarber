const validator = require("validator");
const appointmentsServices = require("../services/appointmentsServices.js");

const createAppointment = async (req, res) => {
  try {
    const { employeeId, serviceId, date, clientId, startTime, observation } =
      req.body;

    if (
      !employeeId ||
      !serviceId ||
      !date ||
      !clientId ||
      !startTime ||
      !observation
    ) {
      return res
        .status(400)
        .json({ error: "Preenchimento obrigatório de todos os campos" });
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

    if (!validator.isUUID(clientId)) {
      return res.status(400).json({ error: "ID inválido de cliente" });
    }

    await appointmentsServices.createAppointment(
      employeeId,
      serviceId,
      date,
      clientId,
      startTime,
      observation
    );

    res.status(201).json({ message: "Agendamento realizado com sucesso" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Falha ao criar o agendamento" });
  }
};

module.exports = {
  createAppointment,
};