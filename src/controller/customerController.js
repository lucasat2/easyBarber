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

	const response = await fetch("http://localhost:3000/api/customer/company", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({company})
	});

	if (!response.ok) {
		// Se não encontrar a empresa, retorna um erro
		return res.status(404).json({error: "Empresa não encontrada"});
	}

	const idCompany = await response.json();

	if (idCompany.error) {
		// Se a resposta retornar um erro, responde com erro
		return res.status(404).json({error: idCompany.error});
	}

	const result = await customerServices.listServicesCompanyByIdCompany(
		idCompany.result
	);

	if (!result) {
		return res.status(404).json({error: "Serviço não encontrada"});
	}
	res.json({result});
};

const listStaffByService = async (req, res) => {
	const {company, service} = req.body;

	const response = await fetch("http://localhost:3000/api/customer/company", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({company})
	});

	if (!response.ok) {
		return res.status(404).json({error: "Empresa não encontrada"});
	}

	const idCompany = await response.json();

	if (idCompany.error) {
		return res.status(404).json({error: idCompany.error});
	}

	const result = await customerServices.listStaffByCompanyAndService(
		idCompany.result,
		service
	);

	if (!result) {
		return res.status(404).json({error: "Serviço não encontrada"});
	}
	res.json({result});
};

module.exports = {listCompanyId, listServicesByCompany, listStaffByService};
