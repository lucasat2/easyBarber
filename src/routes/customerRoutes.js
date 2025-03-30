const express = require("express");
const customerController = require("../controller/customerController");
const router = express.Router();

// Retorna os horários que aquele funcionário tem disponível, passando a EMPRESA, o SERVIÇO e o FUNCIONÁRIO
router.post(
	"/company/services/staff/schedule",
	customerController.listScheduleByStaff
);

// Retorna os funcionários que fazem determinado serviço, passando a EMPRESA e o SERVIÇO
router.post("/company/services/staff", customerController.listStaffByService);

// Retorna o serviços que a EMPRESA faz passando o nome da EMPRESA
router.post("/company/services", customerController.listServicesByCompany);

// Retorna o ID da EMPRESA passando o nome da EMPRESA
router.post("/company", customerController.listCompanyId);

module.exports = router;
