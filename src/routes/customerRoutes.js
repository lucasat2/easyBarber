const express = require("express");
const customerController = require("../controller/customerController");
const router = express.Router();

// Rota para salvar o agendamento, passando
router.post(
	"/company/services/staff/schedule/appointments",
	customerController.createAppointments
);

// Retorna os horários que aquele funcionário tem disponível, passando o ID do FUNCIONÁRIO e a DATA
router.post(
	"/company/services/staff/schedule",
	customerController.listScheduleByStaff
);

// Retorna os funcionários que fazem determinado serviço, passando o ID da EMPRESA e o ID do SERVIÇO
router.post("/company/services/staff", customerController.listStaffByService);

// Retorna o serviços que a EMPRESA faz passando o ID da EMPRESA
router.post("/company/services", customerController.listServicesByCompany);

// Retorna o nome da EMPRESA passando o ID da EMPRESA
router.post("/company", customerController.listCompanyId);

module.exports = router;
