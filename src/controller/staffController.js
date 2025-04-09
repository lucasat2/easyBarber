const validator = require("validator");
const staffServices = require("../services/staffServices");
const phonePattern = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
const codePostalPattern = /^\d{5}-?\d{3}$/;
const cpfPattern = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
const todayDate = new Date();

const list = async (req, res) => {
	try {
		const userId = req.user.id;

		if (!validator.isUUID(userId)) {
			return res.status(400).json({
				error: "ID de usuário inválido"
			});
		}

		const response = await staffServices.listAllStaff(userId);

		if (!Array.isArray(response)) {
			return res
				.status(response.errorStatus)
				.json({error: response.errorMessage});
		}

		res.status(200).json({response});
	} catch (error) {
		console.log(error);

		res.status(500).json({error: "Falha ao listar os funcionários"});
	}
};

const getStaffData = async (req, res) => {
	try {
		const employeeId = req.params.id;

		const userId = req.user.id;

		if (!validator.isUUID(employeeId)) {
			return res.status(400).json({error: "ID inválido de funcionário"});
		}

		if (!validator.isUUID(userId)) {
			return res.status(400).json({error: "ID inválido de usuário"});
		}

		const result = await staffServices.getEmployeeDetails(employeeId, userId);

		if (!result.errorStatus) {
			return res.status(200).json(result);
		}

		res.status(result.errorStatus).json({error: result.errorMessage});
	} catch (error) {
		console.log(error);

		res
			.status(500)
			.json({error: "Falha no servidor ao buscar os dados do funcionário"});
	}
};

const create = async (req, res) => {
	try {
		const {name, surname, cpf, email, phoneNumber, birthdate, postalCode} =
			req.body;

		const userId = req.user.id;

		if (!validator.isUUID(userId)) {
			return res.status(400).json({
				error: "ID de usuário inválido"
			});
		}

		if (name && !validator.isAlpha(name, "pt-BR")) {
			return res.status(400).json({
				error: "O nome deve conter apenas letras"
			});
		}

		if (surname && !validator.isAlpha(surname, "pt-BR", {ignore: " "})) {
			return res.status(400).json({
				error: "O sobrenome deve conter apenas letras"
			});
		}

		if (cpf && !cpfPattern.test(cpf)) {
			return res.status(400).json({
				error: "O formato de CPF está inválido"
			});
		}

		if (phoneNumber && !phonePattern.test(phoneNumber)) {
			return res.status(400).json({
				error: "O telefone deve conter DDD e entre 9 ou 8 números"
			});
		}

		if (
			birthdate &&
			(!validator.isDate(birthdate) || new Date(birthdate) >= todayDate)
		) {
			return res.status(400).json({
				error: "Data de nascimento não pode ser presente ou futura"
			});
		}

		if (email && !validator.isEmail(email)) {
			return res.status(400).json({error: "Formato de e-mail inválido"});
		}

		if (postalCode && !codePostalPattern.test(postalCode)) {
			return res.status(400).json({error: "Formato de CEP inválido"});
		}

		const result = await staffServices.createStaff(
			name,
			surname,
			cpf,
			email,
			phoneNumber,
			birthdate,
			postalCode,
			userId
		);

		if (result) {
			return res.status(result.errorStatus).json({error: result.errorMessage});
		}

		res.status(201).json({message: "Funcionário criado com sucesso"});
	} catch (error) {
		console.log(error);

		res.status(500).json({error: "Falha ao criar o funcionário"});
	}
};

const assignServicesToStaff = async (req, res) => {
	try {
		const {staffId, serviceId} = req.body;

		const userId = req.user.id;

		if (!validator.isUUID(staffId)) {
			return res.status(400).json({error: "ID de funcionário inválido"});
		}

		if (!validator.isUUID(serviceId)) {
			return res.status(400).json({error: "ID de serviço inválido"});
		}

		if (!validator.isUUID(userId)) {
			return res.status(400).json({error: "ID de usuário inválido"});
		}

		const result = await staffServices.linkServicesToStaff(
			userId,
			staffId,
			serviceId
		);

		if (result) {
			return res.status(result.errorCode).json({error: result.errorMessage});
		}

		res.status(201).json({message: "Associação realizada com sucesso"});
	} catch (error) {
		console.log(error);

		res.status(500).json({error: "Falha ao associar o funcionário ao serviço"});
	}
};

const assignSchedulesToEmployee = async (req, res) => {
	try {
		const {
			staffId,
			weekDay1,
			firstShiftStartTime1,
			firstShiftEndTime1,
			firstShiftStatus1,
			secondShiftStartTime1,
			secondShiftEndTime1,
			secondShiftStatus1,
			weekDay2,
			firstShiftStartTime2,
			firstShiftEndTime2,
			firstShiftStatus2,
			secondShiftStartTime2,
			secondShiftEndTime2,
			secondShiftStatus2,
			weekDay3,
			firstShiftStartTime3,
			firstShiftEndTime3,
			firstShiftStatus3,
			secondShiftStartTime3,
			secondShiftEndTime3,
			secondShiftStatus3,
			weekDay4,
			firstShiftStartTime4,
			firstShiftEndTime4,
			firstShiftStatus4,
			secondShiftStartTime4,
			secondShiftEndTime4,
			secondShiftStatus4,
			weekDay5,
			firstShiftStartTime5,
			firstShiftEndTime5,
			firstShiftStatus5,
			secondShiftStartTime5,
			secondShiftEndTime5,
			secondShiftStatus5,
			weekDay6,
			firstShiftStartTime6,
			firstShiftEndTime6,
			firstShiftStatus6,
			secondShiftStartTime6,
			secondShiftEndTime6,
			secondShiftStatus6,
			weekDay7,
			firstShiftStartTime7,
			firstShiftEndTime7,
			firstShiftStatus7,
			secondShiftStartTime7,
			secondShiftEndTime7,
			secondShiftStatus7
		} = req.body;

		const userId = req.user.id;

		if (!validator.isUUID(staffId)) {
			return res.status(400).json({error: "ID inválido de funcionário"});
		}

		if (!validator.isUUID(userId)) {
			return res.status(400).json({error: "ID inválido de usuário"});
		}

		const weeksDays = [
			weekDay1,
			weekDay2,
			weekDay3,
			weekDay4,
			weekDay5,
			weekDay6,
			weekDay7
		];

		for (let i = 0; i < weeksDays.length; i++) {
			const weekDay = weeksDays[i];

			if (!validator.isAlpha(weekDay, "pt-BR", {ignore: "-"})) {
				return res.status(400).json({
					error: "O nome do dia deve conter apenas letras e/ou hifén"
				});
			}
		}

		const dailyFirstShiftStartTimes = [
			firstShiftStartTime1,
			firstShiftStartTime2,
			firstShiftStartTime3,
			firstShiftStartTime4,
			firstShiftStartTime5,
			firstShiftStartTime6,
			firstShiftStartTime7
		];

		for (let j = 0; j < dailyFirstShiftStartTimes.length; j++) {
			const firstShiftStartTime = dailyFirstShiftStartTimes[j];

			if (!validator.isTime(firstShiftStartTime)) {
				return res.status(400).json({
					error: "Formato inválido de horário de início do primeiro turno"
				});
			}
		}

		const dailyFirstShiftEndTimes = [
			firstShiftEndTime1,
			firstShiftEndTime2,
			firstShiftEndTime3,
			firstShiftEndTime4,
			firstShiftEndTime5,
			firstShiftEndTime6,
			firstShiftEndTime7
		];

		for (let k = 0; k < dailyFirstShiftEndTimes.length; k++) {
			const firstShiftEndTime = dailyFirstShiftEndTimes[k];

			if (!validator.isTime(firstShiftEndTime)) {
				return res.status(400).json({
					error: "Formato inválido de horário do fim do primeiro turno"
				});
			}
		}

		const dailyFirstShiftStatus = [
			firstShiftStatus1,
			firstShiftStatus2,
			firstShiftStatus3,
			firstShiftStatus4,
			firstShiftStatus5,
			firstShiftStatus6,
			firstShiftStatus7
		];

		for (let l = 0; l < dailyFirstShiftStatus.length; l++) {
			const firstShiftStatus = dailyFirstShiftStatus[l];

			if (typeof firstShiftStatus !== "boolean") {
				return res
					.status(400)
					.json({error: "Padrão inválido de status do primero turno"});
			}
		}

		const dailySecondShiftStartTimes = [
			secondShiftStartTime1,
			secondShiftStartTime2,
			secondShiftStartTime3,
			secondShiftStartTime4,
			secondShiftStartTime5,
			secondShiftStartTime6,
			secondShiftStartTime7
		];

		for (let m = 0; m < dailySecondShiftStartTimes.length; m++) {
			const secondShiftStartTime = dailySecondShiftStartTimes[m];

			if (!validator.isTime(secondShiftStartTime)) {
				return res.status(400).json({
					error: "Formato inválido de horário de ínicio do segundo turno"
				});
			}
		}

		const dailySecondShiftEndTimes = [
			secondShiftEndTime1,
			secondShiftEndTime2,
			secondShiftEndTime3,
			secondShiftEndTime4,
			secondShiftEndTime5,
			secondShiftEndTime6,
			secondShiftEndTime7
		];

		for (let n = 0; n < dailySecondShiftEndTimes.length; n++) {
			const secondShiftEndTime = dailySecondShiftEndTimes[n];

			if (!validator.isTime(secondShiftEndTime)) {
				return res.status(400).json({
					error: "Formato inválido de horário do fim do segundo turno"
				});
			}
		}

		const dailySecondShiftStatus = [
			secondShiftStatus1,
			secondShiftStatus2,
			secondShiftStatus3,
			secondShiftStatus4,
			secondShiftStatus5,
			secondShiftStatus6,
			secondShiftStatus7
		];

		for (let o = 0; o < dailySecondShiftStatus.length; o++) {
			const secondShiftStatus = dailySecondShiftStatus[o];

			if (typeof secondShiftStatus !== "boolean") {
				return res
					.status(400)
					.json({error: "Padrão inválido de status do segundo turno"});
			}
		}

		const schedulesData = [
			{
				week_day: weekDay1,
				start_time_1: firstShiftStartTime1,
				end_time_1: firstShiftEndTime1,
				status_1: firstShiftStatus1,
				start_time_2: secondShiftStartTime1,
				end_time_2: secondShiftEndTime1,
				status_2: secondShiftStatus1
			},
			{
				week_day: weekDay2,
				start_time_1: firstShiftStartTime2,
				end_time_1: firstShiftEndTime2,
				status_1: firstShiftStatus2,
				start_time_2: secondShiftStartTime2,
				end_time_2: secondShiftEndTime2,
				status_2: secondShiftStatus2
			},
			{
				week_day: weekDay3,
				start_time_1: firstShiftStartTime3,
				end_time_1: firstShiftEndTime3,
				status_1: firstShiftStatus3,
				start_time_2: secondShiftStartTime3,
				end_time_2: secondShiftEndTime3,
				status_2: secondShiftStatus3
			},
			{
				week_day: weekDay4,
				start_time_1: firstShiftStartTime4,
				end_time_1: firstShiftEndTime4,
				status_1: firstShiftStatus4,
				start_time_2: secondShiftStartTime4,
				end_time_2: secondShiftEndTime4,
				status_2: secondShiftStatus4
			},
			{
				week_day: weekDay5,
				start_time_1: firstShiftStartTime5,
				end_time_1: firstShiftEndTime5,
				status_1: firstShiftStatus5,
				start_time_2: secondShiftStartTime5,
				end_time_2: secondShiftEndTime5,
				status_2: secondShiftStatus5
			},
			{
				week_day: weekDay6,
				start_time_1: firstShiftStartTime6,
				end_time_1: firstShiftEndTime6,
				status_1: firstShiftStatus6,
				start_time_2: secondShiftStartTime6,
				end_time_2: secondShiftEndTime6,
				status_2: secondShiftStatus6
			},
			{
				week_day: weekDay7,
				start_time_1: firstShiftStartTime7,
				end_time_1: firstShiftEndTime7,
				status_1: firstShiftStatus7,
				start_time_2: secondShiftStartTime7,
				end_time_2: secondShiftEndTime7,
				status_2: secondShiftStatus7
			}
		];

		const result = await staffServices.attachSchedulesToStaff(
			userId,
			staffId,
			schedulesData
		);

		if (result) {
			return res.status(result.errorStatus).json({error: result.errorMessage});
		}

		res.status(200).json({
			message: "Operação de vinculação de horário realizada com sucesso"
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			error:
				"Falha no servidor durante o processo de vinculação de horário do funcionário"
		});
	}
};

const update = async (req, res) => {
	try {
		const {name, surname, cpf, email, phoneNumber, birthdate, postalCode, id} =
			req.body;

		if (
			!name ||
			!surname ||
			!cpf ||
			!email ||
			!phoneNumber ||
			!birthdate ||
			!postalCode
		) {
			return res
				.status(400)
				.json({error: "Preenchimento obrigatório de todos os campos"});
		}

		if (!validator.isUUID(id)) {
			return res.status(400).json({
				error: "ID de funcionário inválido"
			});
		}

		if (!validator.isAlpha(name, "pt-BR")) {
			return res.status(400).json({
				error: "O nome deve conter apenas letras"
			});
		}

		if (!validator.isAlpha(surname, "pt-BR", {ignore: " "})) {
			return res.status(400).json({
				error: "O sobrenome deve conter apenas letras"
			});
		}

		if (!cpfPattern.test(cpf)) {
			return res.status(400).json({
				error: "O formato de CPF está inválido"
			});
		}

		if (!phonePattern.test(phoneNumber)) {
			return res.status(400).json({
				error: "O telefone deve conter DDD e entre 9 ou 8 números"
			});
		}

		if (
			birthdate &&
			(!validator.isDate(birthdate) || new Date(birthdate) >= todayDate)
		) {
			return res.status(400).json({
				error: "Data de nascimento não pode ser presente ou futura"
			});
		}

		if (!validator.isEmail(email)) {
			return res.status(400).json({error: "Formato de e-mail inválido"});
		}

		if (!codePostalPattern.test(postalCode)) {
			return res.status(400).json({error: "Formato de CEP inválido"});
		}

		await staffServices.updateStaff(
			name,
			surname,
			cpf,
			email,
			phoneNumber,
			birthdate,
			postalCode,
			id
		);

		res.status(201).json({message: "Funcionário atualizado com sucesso"});
	} catch (error) {
		res.status(500).json({error: "Falha ao atualizar o funcionário"});
	}
};

const remove = async (req, res) => {
  const { staffId } = req.body;

  const userId = req.user.id;

  try {
    if (!validator.isUUID(staffId)) {
      return res.status(400).json({ error: "ID inválido de funcionário" });
    }

    if (!validator.isUUID(userId)) {
      return res.status(400).json({ error: "ID inválido de usuário" });
    }

    const result = await staffServices.deleteStaff(staffId, userId);

    if (result) {
      return res
        .status(result.statusCode)
        .json({ error: result.statusMessage });
    }

    res.status(200).json({ message: "Funcionário deletado com sucesso" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Falha ao deletar o funcionário" });
  }
};

const unassignServiceFromStaff = async (req, res) => {
	try {
		const {staffId, serviceId} = req.body;

		const userId = req.user.id;

		if (!validator.isUUID(staffId)) {
			return res.status(400).json({error: "ID de funcionário inválido"});
		}

		if (!validator.isUUID(serviceId)) {
			return res.status(400).json({error: "ID de serviço inválido"});
		}

		if (!validator.isUUID(userId)) {
			return res.status(400).json({error: "ID de usuário inválido"});
		}

		const result = await staffServices.detachServiceFromStaff(
			userId,
			staffId,
			serviceId
		);

		if (result) {
			return res.status(result.errorCode).json({error: result.errorMessage});
		}

		res.status(200).json({message: "Desvinculação realizada com sucesso"});
	} catch (error) {
		console.log(error);

		res.status(500).json({error: "Falha no processo de desvinculação"});
	}
};

const getServiceStaff = async (req, res) => {
	const id = req.params.id;
	try {
		const result = await staffServices.getStaffServicesById(id);

		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({error: "Falha ao pegar serviços do funcionário"});
	}
};

const getHoursStaff = async (req, res) => {
	const id = req.params.id;
	try {
		const result = await staffServices.getStaffHoursById(id);

		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({error: "Falha ao pegar horários do funcionário"});
	}
};

module.exports = {
	list,
	getStaffData,
	create,
	assignServicesToStaff,
	assignSchedulesToEmployee,
	update,
	remove,
	unassignServiceFromStaff,
	getServiceStaff,
	getHoursStaff
};
