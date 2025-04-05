const pool = require("../db");

let client;

const getAllStaff = async userId => {
	try {
		const getCompanyData = "SELECT * FROM users WHERE id = $1";

		client = await pool.connect();

		const {
			rows: [user]
		} = await client.query(getCompanyData, [userId]);

		if (!user) {
			return {errorStatus: 404, errorMessage: "Usuário não encontrado"};
		}

		const companyId = user.company_id;

		const getAllEmployees =
			"SELECT * FROM staffs WHERE company_id = $1 AND status = true";

		const {rows: allEmployees} = await client.query(getAllEmployees, [
			companyId
		]);

		if (!allEmployees) {
			return {errorStatus: 404, errorMessage: "Falha ao listar funcionários"};
		}

		return allEmployees;
	} catch (error) {
		throw error;
	} finally {
		if (client) {
			client.release();
		}
	}
};

const findStaffInfo = async (employeeId, userId) => {
	try {
		const getUserDataQuery = "SELECT * FROM users WHERE id = $1";

		const getEmployeeDataQuery =
			"SELECT * FROM staffs WHERE id = $1 AND company_id = $2";

		client = await pool.connect();

		const {
			rows: [userData]
		} = await client.query(getUserDataQuery, [userId]);

		if (!userData) {
			return {errorStatus: 404, errorMessage: "Usuário não encontrado"};
		}

		const companyId = userData.company_id;

		const {
			rows: [employeeData]
		} = await client.query(getEmployeeDataQuery, [employeeId, companyId]);

		if (!employeeData) {
			return {
				errorStatus: 403,
				errorMessage: "Funcionário não pertence a empresa"
			};
		}

		return employeeData;
	} catch (error) {
		throw error;
	} finally {
		if (client) {
			client.release();
		}
	}
};

const createStaff = async (
	name,
	surname,
	cpf,
	email,
	phoneNumber,
	birthdate,
	postalCode,
	userId
) => {
	const getUserDataQuery = "SELECT * FROM users WHERE id = $1";

	const createStaffsQuery =
		"INSERT INTO staffs (company_id, name, surname, cpf, email, phone_number, birthdate, postal_code, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";

	try {
		client = await pool.connect();

		const {
			rows: [userData]
		} = await client.query(getUserDataQuery, [userId]);

		if (!userData) {
			return {errorStatus: 404, errorMessage: "Usuário não encontrado"};
		}
		const companyId = userData.company_id;

		await client.query(createStaffsQuery, [
			companyId,
			name,
			surname,
			cpf,
			email,
			phoneNumber,
			birthdate,
			postalCode,
			true
		]);
	} catch (error) {
		throw error;
	} finally {
		if (client) {
			client.release();
		}
	}
};

const associateServicesWithStaff = async (userId, staffId, serviceId) => {
	try {
		const getUserDataQuery = "SELECT * FROM users WHERE id = $1";

		const isServiceAvailableInCompanyQuery =
			"SELECT * FROM services WHERE id = $1 AND company_id = $2";

		const isEmployeeOfCompanyQuery =
			"SELECT * FROM staffs WHERE id = $1 AND company_id = $2";

		const isEmployeeAlreadyAssignedToServiceQuery =
			"SELECT * FROM services_staffs WHERE service_id = $1 AND staff_id = $2";

		const addServicesToStaffQuery =
			"INSERT INTO services_staffs (service_id, staff_id) VALUES ($1, $2)";

		client = await pool.connect();

		const {
			rows: [userData]
		} = await client.query(getUserDataQuery, [userId]);

		if (!userData) {
			return {
				errorCode: 404,
				errorMessage: "Usuário não encontrado"
			};
		}

		const companyId = userData.company_id;

		const {
			rows: [isServiceAvailableInCompany]
		} = await client.query(isServiceAvailableInCompanyQuery, [
			serviceId,
			companyId
		]);

		if (!isServiceAvailableInCompany) {
			return {
				errorCode: 409,
				errorMessage: "A empresa não executa o serviço desejado"
			};
		}

		const {
			rows: [isEmployeeOfCompany]
		} = await client.query(isEmployeeOfCompanyQuery, [staffId, companyId]);

		if (!isEmployeeOfCompany) {
			return {
				errorCode: 409,
				errorMessage: "O funcionário não faz parte da empresa"
			};
		}

		const {
			rows: [isEmployeeAlreadyAssignedToService]
		} = await client.query(isEmployeeAlreadyAssignedToServiceQuery, [
			serviceId,
			staffId
		]);

		if (isEmployeeAlreadyAssignedToService) {
			return {
				errorCode: 409,
				errorMessage: "O funcionário já está associado ao serviço"
			};
		}

		await client.query(addServicesToStaffQuery, [serviceId, staffId]);
	} catch (error) {
		throw error;
	} finally {
		if (client) {
			client.release();
		}
	}
};

const bindSchedulesToStaff = async (userId, staffId, schedulesData) => {
	try {
		const userDataQuery = "SELECT * FROM users WHERE id = $1";

		const isEmployeeInCompanyQuery =
			"SELECT * FROM staffs WHERE id = $1 AND company_id = $2";

		const findEmployeeShifts =
			"SELECT * FROM schedules_staffs WHERE staff_id = $1";

		const insertNewScheduleQuery =
			"INSERT INTO schedules (week_day, start_time_1, end_time_1, status_1, start_time_2, end_time_2, status_2) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";

		const attachSchedulesToStaffQuery =
			"INSERT INTO schedules_staffs (schedule_id, staff_id) VALUES ($1, $2)";

		const findShiftInfoQuery = "SELECT * FROM schedules WHERE id = $1";

		const updateScheduleData =
			"UPDATE schedules SET week_day = $1, start_time_1 = $2, end_time_1 = $3, status_1 = $4, start_time_2 = $5, end_time_2 = $6, status_2 = $7, updated_at = NOW() WHERE id = $8";

		client = await pool.connect();

		await client.query("BEGIN");

		const {
			rows: [userData]
		} = await client.query(userDataQuery, [userId]);

		if (!userData) {
			return {errorStatus: 404, errorMessage: "Usuário não encontrado"};
		}

		const companyId = userData.company_id;

		const {
			rows: [isEmployeeInCompany]
		} = await client.query(isEmployeeInCompanyQuery, [staffId, companyId]);

		if (!isEmployeeInCompany) {
			return {
				errorStatus: 404,
				errorMessage: "O funcionário não faz da empresa"
			};
		}

		for (let i = 0; i < schedulesData.length; i++) {
			const scheduleData = schedulesData[i];

			const {rows: shiftsData} = await client.query(findEmployeeShifts, [
				staffId
			]);

			if (!shiftsData) {
				return {
					errorStatus: 404,
					errorMessage: "Falha ao listar os turnos do funcionário"
				};
			}

			if (shiftsData.length === 0) {
				const {
					rows: [scheduleInfo]
				} = await client.query(insertNewScheduleQuery, [
					scheduleData.week_day,
					scheduleData.start_time_1,
					scheduleData.end_time_1,
					scheduleData.status_1,
					scheduleData.start_time_2,
					scheduleData.end_time_2,
					scheduleData.status_2
				]);

				if (!scheduleInfo) {
					return {
						errorStatus: 500,
						errorMessage: "Falha ao criar um novo turno"
					};
				}

				const scheduleId = scheduleInfo.id;

				await client.query(attachSchedulesToStaffQuery, [scheduleId, staffId]);

				continue;
			}

			let hasBeenUpdated = false;

			for (let j = 0; j < shiftsData.length; j++) {
				const dailyShiftData = shiftsData[j];

				const shiftId = dailyShiftData.schedule_id;

				const {
					rows: [shiftInfo]
				} = await client.query(findShiftInfoQuery, [shiftId]);

				if (!shiftInfo) {
					return {
						errorStatus: 404,
						errorMessage:
							"Falha ao encontrar as informações do turno do funcionário"
					};
				}

				const day = shiftInfo.week_day;

				if (day === scheduleData.week_day) {
					await client.query(updateScheduleData, [
						scheduleData.week_day,
						scheduleData.start_time_1,
						scheduleData.end_time_1,
						scheduleData.status_1,
						scheduleData.start_time_2,
						scheduleData.end_time_2,
						scheduleData.status_2,
						shiftId
					]);

					hasBeenUpdated = true;
				}
			}

			if (!hasBeenUpdated) {
				const {
					rows: [infoSchedule]
				} = await client.query(insertNewScheduleQuery, [
					scheduleData.week_day,
					scheduleData.start_time_1,
					scheduleData.end_time_1,
					scheduleData.status_1,
					scheduleData.start_time_2,
					scheduleData.end_time_2,
					scheduleData.status_2
				]);

				if (!infoSchedule) {
					return {
						errorStatus: 500,
						errorMessage: "Falha ao criar um novo turno"
					};
				}

				const scheduleId = infoSchedule.id;

				await client.query(attachSchedulesToStaffQuery, [scheduleId, staffId]);
			}
		}

		await client.query("COMMIT");
	} catch (error) {
		await client.query("ROLLBACK");

		throw error;
	} finally {
		if (client) {
			client.release();
		}
	}
};

const updateStaff = async (
	name,
	surname,
	cpf,
	email,
	phoneNumber,
	birthdate,
	postalCode,
	id
) => {
	try {
		client = await pool.connect();

		await client.query("BEGIN");

		if (name) {
			const updateStaffName =
				"UPDATE staffs SET name = $1, updated_at = NOW() WHERE id = $2";

			await client.query(updateStaffName, [name, id]);
		}

		if (surname) {
			const updateStaffSurname =
				"UPDATE staffs SET surname = $1, updated_at = NOW() WHERE id = $2";

			await client.query(updateStaffSurname, [surname, id]);
		}

		if (cpf) {
			const updateStaffCpf =
				"UPDATE staffs SET cpf = $1, updated_at = NOW() WHERE id = $2";

			await client.query(updateStaffCpf, [cpf, id]);
		}

		if (email) {
			const updateStaffEmail =
				"UPDATE staffs SET email = $1, updated_at = NOW() WHERE id = $2";

			await client.query(updateStaffEmail, [email, id]);
		}

		if (phoneNumber) {
			const updtadeStaffPhoneNumber =
				"UPDATE staffs SET phone_number = $1, updated_at = NOW() WHERE id = $2";

			await client.query(updtadeStaffPhoneNumber, [phoneNumber, id]);
		}

		if (birthdate) {
			const updtadeStaffBirthdate =
				"UPDATE staffs SET birthdate = $1, updated_at = NOW() WHERE id = $2";

			await client.query(updtadeStaffBirthdate, [birthdate, id]);
		}

		if (postalCode) {
			const updateStaffPostalCode =
				"UPDATE staffs SET postal_code = $1, updated_at = NOW() WHERE id = $2";

			await client.query(updateStaffPostalCode, [postalCode, id]);
		}

		await client.query("COMMIT");
	} catch (error) {
		await client.query("ROLLBACK");
		throw error;
	} finally {
		if (client) {
			client.release();
		}
	}
};

const removeStaff = async staffId => {
	const deleteStaff = "DELETE FROM staffs WHERE id = $1";

	try {
		client = await pool.connect();

		await client.query(deleteStaff, [staffId]);
	} catch (error) {
		throw error;
	} finally {
		if (client) {
			client.release();
		}
	}
};

const unlinkServiceFromStaff = async (userId, staffId, serviceId) => {
	try {
		const getUserDataQuery = "SELECT * FROM users WHERE id = $1";

		const isServiceAvailableInCompanyQuery =
			"SELECT * FROM services WHERE id = $1 AND company_id = $2";

		const isEmployeeOfCompanyQuery =
			"SELECT * FROM staffs WHERE id = $1 AND company_id = $2";

		const isEmployeeAssignedToServiceQuery =
			"SELECT * FROM services_staffs WHERE service_id = $1 AND staff_id = $2";

		const removeServicesToStaffQuery =
			"DELETE FROM services_staffs WHERE service_id = $1 AND staff_id = $2";

		client = await pool.connect();

		const {
			rows: [userData]
		} = await client.query(getUserDataQuery, [userId]);

		if (!userData) {
			return {
				errorCode: 404,
				errorMessage: "Usuário não encontrado"
			};
		}

		const companyId = userData.company_id;

		const {
			rows: [isServiceAvailableInCompany]
		} = await client.query(isServiceAvailableInCompanyQuery, [
			serviceId,
			companyId
		]);

		if (!isServiceAvailableInCompany) {
			return {
				errorCode: 409,
				errorMessage: "A empresa não executa o serviço desejado"
			};
		}

		const {
			rows: [isEmployeeOfCompany]
		} = await client.query(isEmployeeOfCompanyQuery, [staffId, companyId]);

		if (!isEmployeeOfCompany) {
			return {
				errorCode: 409,
				errorMessage: "O funcionário não faz parte da empresa"
			};
		}

		const {
			rows: [isEmployeeAssignedToService]
		} = await client.query(isEmployeeAssignedToServiceQuery, [
			serviceId,
			staffId
		]);

		if (!isEmployeeAssignedToService) {
			return {
				errorCode: 409,
				errorMessage: "Funcionário não executa o serviço"
			};
		}

		await client.query(removeServicesToStaffQuery, [serviceId, staffId]);
	} catch (error) {
		throw error;
	} finally {
		if (client) {
			client.release();
		}
	}
};

const getStaffServices = async staffId => {
	let client;
	try {
		const query = `SELECT * FROM services_staffs WHERE staff_id = $1`;

		client = await pool.connect();

		const {rows: servicesLinked} = await client.query(query, [staffId]);

		return servicesLinked;
	} catch (error) {
		throw error;
	} finally {
		if (client) {
			client.release();
		}
	}
};

module.exports = {
	getAllStaff,
	findStaffInfo,
	createStaff,
	associateServicesWithStaff,
	bindSchedulesToStaff,
	updateStaff,
	removeStaff,
	unlinkServiceFromStaff,
	getStaffServices
};
