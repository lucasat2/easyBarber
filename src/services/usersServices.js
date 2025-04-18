const {hashPassword} = require("../utils/hashPassword.js");
const usersRepository = require("../repository/usersRepository.js");

const getAuthenticatedCompanyData = async userId => {
	try {
		const response = await usersRepository.retrieveCompanyData(userId);

		return response;
	} catch (error) {
		throw error;
	}
};

const createUser = async (
	name,
	cnpj,
	phoneNumber,
	state,
	city,
	street,
	number,
	postalCode,
	email,
	password
) => {
	try {
		const hashedPassword = await hashPassword(password);

		if (!hashedPassword) {
			return {
				errorCode: 500,
				errorMessage: "Falha na geração do hash da senha"
			};
		}

		const result = await usersRepository.insertNewUser(
			name,
			cnpj,
			phoneNumber,
			state,
			city,
			street,
			number,
			postalCode,
			email,
			hashedPassword
		);

		return result;
	} catch (error) {
		throw error;
	}
};

const updateUser = async (
	userId,
	name,
	cnpj,
	phoneNumber,
	state,
	city,
	street,
	number,
	postalCode,
	email,
	password
) => {
	try {
		let hashedPassword = password;

		if (hashedPassword.length !== 0) {
			hashedPassword = await hashPassword(password);

			if (!hashedPassword) {
				return {
					errorCode: 500,
					errorMessage: "Falha na geração do hash da senha"
				};
			}
		}

		const result = await usersRepository.updateUser(
			userId,
			name,
			cnpj,
			phoneNumber,
			state,
			city,
			street,
			number,
			postalCode,
			email,
			hashedPassword
		);

		return result;
	} catch (error) {
		throw error;
	}
};

const getCompanyDataInfo = async userId => {
	try {
		const response = await usersRepository.companyInfo(userId);

		return response;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	getAuthenticatedCompanyData,
	createUser,
	updateUser,
  getCompanyDataInfo
};
