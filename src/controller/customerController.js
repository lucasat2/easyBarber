const customerServices = require("../services/customerServices.js");

const listCompanyId = async (req, res) => {
	const {company} = req.body;
	const result = await customerServices.listCompanyByName(company);

	if (!result) {
		return res.status(404).json({error: "Empresa não encontrada"});
	}
	res.json({result});
};

const listServicesByCompany = async (req, res) => {
	const {idCompany} = req.body;

	const result = await customerServices.listServicesCompanyByIdCompany(
		idCompany
	);

	if (!result) {
		return res.status(404).json({error: "Nenhum serviço encontrado"});
	}
	res.json({result});
};

const listStaffByService = async (req, res) => {
	const {idCompany, idService} = req.body;

	const result = await customerServices.listStaffByCompanyAndService(
		idCompany,
		idService
	);

	if (!result) {
		return res
			.status(404)
			.json({error: "Nenhum funcionário encontrado para o serviço"});
	}
	res.json({result});
};

const listScheduleByStaff = async (req, res) => {
	const {idStaff, date} = req.body;

	if (!date) {
		return res.status(404).json({error: "Envie uma data"});
	}

	const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

	if (!dateRegex.test(date)) {
		return res
			.status(400)
			.json({error: "Formato de data inválido. Use YYYY-MM-DD"});
	}

	const getSchedules = await customerServices.listSchedulesBuStaff(
		idStaff,
		date
	);
	if (!getSchedules) {
		return res.status(400).json({error: "Funcionário não trabalha nesse dia"});
	}

	res.json({getSchedules});
};

const createAppointments = async (req, res) => {
	const {
		idCompany,
		idStaff,
		idService,
		date,
		clientName,
		clientEmail,
		clientPhoneNumber,
		startTime,
		observation
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

	if (!result) {
		return res
			.status(404)
			.json({error: "Não foi possível salvar o agendamento"});
	}
	res.json({result});
};

module.exports = {
	listCompanyId,
	listServicesByCompany,
	listStaffByService,
	listScheduleByStaff,
	createAppointments
};
