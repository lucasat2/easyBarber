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
	const {company} = req.body;

	const idCompany = await customerServices.listCompanyByName(company);

	if (!idCompany) {
		return res.status(404).json({error: "Empresa não encontrada"});
	}

	const result = await customerServices.listServicesCompanyByIdCompany(
		idCompany
	);

	if (!result) {
		return res.status(404).json({error: "Nenhum serviço encontrado"});
	}
	res.json({result});
};

const listStaffByService = async (req, res) => {
	const {company, service} = req.body;

	const idCompany = await customerServices.listCompanyByName(company);

	if (!idCompany) {
		return res.status(404).json({error: "Empresa não encontrada"});
	}

	const result = await customerServices.listStaffByCompanyAndService(
		idCompany,
		service
	);

	if (!result) {
		return res
			.status(404)
			.json({error: "Nenhum funcionário encontrado para o serviço"});
	}
	res.json({result});
};

const listScheduleByStaff = async (req, res) => {
	const {company, service, staff, date} = req.body;

	const idCompany = await customerServices.listCompanyByName(company);

	if (!idCompany) {
		return res.status(404).json({error: "Empresa não encontrada"});
	}

	const result = await customerServices.listStaffByCompanyAndService(
		idCompany,
		service
	);

	if (!result) {
		return res
			.status(404)
			.json({error: "Nenhum funcionário encontrado para o serviço"});
	}

	let exists = false;
	result.forEach(i => {
		if (i.id == staff) {
			exists = true;
			return;
		}
	});

	if (!exists) {
		return res
			.status(404)
			.json({error: "Este funcionário não faz esse serviço"});
	}

	if (!date) {
		return res.status(404).json({error: "Envie uma data"});
	}

	const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

	if (!dateRegex.test(date)) {
		return res
			.status(400)
			.json({error: "Formato de data inválido. Use YYYY-MM-DD"});
	}

	const getSchedules = await customerServices.listSchedulesBuStaff(staff, date);
	if(!getSchedules) {
		return res
			.status(400)
			.json({error: "Funcionário não trabalha nesse dia"});
	}

	res.json({getSchedules});
};

module.exports = {
	listCompanyId,
	listServicesByCompany,
	listStaffByService,
	listScheduleByStaff
};
