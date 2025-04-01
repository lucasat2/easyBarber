const pool = require("../db");

const getCompanyId = async company => {
	let client;
	try {
		client = await pool.connect();

		const query = "SELECT * FROM companies WHERE id = $1";

		const result = await client.query(query, [company]);

		if (result.rows.length > 0) {
			return result.rows[0].name;
		} else {
			return null;
		}
	} catch (e) {
		throw e;
	} finally {
		if (client) {
			client.release();
		}
	}
};

const getServices = async company => {
	let client;
	try {
		client = await pool.connect();

		const query = "SELECT * FROM services WHERE company_id = $1";

		const result = await client.query(query, [company]);

		if (result.rows.length <= 0) {
			return null;
		}
		const filteredRows = result.rows.map(
			({created_at, updated_at, ...rest}) => rest
		);

		return filteredRows;
	} catch (e) {
		throw e;
	} finally {
		if (client) {
			client.release();
		}
	}
};

const getServicesByStaff = async idService => {
	let client;
	try {
		client = await pool.connect();

		const query = "SELECT * FROM services_staffs WHERE service_id = $1";

		const result = await client.query(query, [idService]);

		if (result.rows.length <= 0) {
			return null;
		}

		const resultObj = result.rows;

		const staffObj = [];

		for (const e of resultObj) {
			const queryGetStaff = "SELECT * FROM staffs WHERE id = $1";
			const resultGet = await client.query(queryGetStaff, [e.staff_id]);

			if (resultGet.rows.length <= 0) {
				return null;
			}

			const resultObj = resultGet.rows;
			const staffJson = {
				id: resultObj[0].id,
				company_id: resultObj[0].company_id,
				name: resultObj[0].name,
				surname: resultObj[0].surname,
				email: resultObj[0].email
			};
			staffObj.push(staffJson);
		}

		return staffObj;
	} catch (e) {
		throw e;
	} finally {
		if (client) {
			client.release();
		}
	}
};

const getSchedules = async (staff, date) => {
	let client;
	try {
		client = await pool.connect();

		// pega o funcionário
		const query = "SELECT * FROM schedules_staffs WHERE staff_id = $1";

		const result = await client.query(query, [staff]);

		if (result.rows.length <= 0) {
			return null;
		}

		const resultObj = result.rows;

		const schedules_staffs = [];

		// salta todos os dias de trabalho que o funcionário faz, isso serve pra pegar o id o schelues para depois pegar os horarios q ele faz
		resultObj.forEach(i => {
			schedules_staffs.push(i.schedule_id);
		});

		if (!schedules_staffs) {
			return null;
		}

		// Salva os horários e dias que esse funcionário trabalha
		const schedules = [];

		for (const e of schedules_staffs) {
			const query = "SELECT * FROM schedules WHERE id = $1";

			const result = await client.query(query, [e]);
			if (result.rows.length <= 0) {
				return null;
			}

			const staffSchedule = result.rows;
			schedules.push(staffSchedule[0]);
		}

		// Retorna somente os horários q o funcioário trabalha com relação ao status_1 e status_2
		const scheduleHours = [];

		for (const e of schedules) {
			const getCalidTimes = {
				id: e.id,
				week_day: e.week_day,
				...(e.status_1 && {
					start_time_1: e.start_time_1,
					end_time_1: e.end_time_1
				}),
				...(e.status_2 && {
					start_time_2: e.start_time_2,
					end_time_2: e.end_time_2
				})
			};
			scheduleHours.push(getCalidTimes);
		}

		// Verifica somente os horários em que o funcionário estará indisponível na data solicitada, passando a data e o funcionário
		const getDay =
			"SELECT * FROM appointments WHERE date_hour_begin::DATE = $1 AND staff_id = $2 AND status != 'CANCELADO'";
		const values = [date, staff]; // date deve estar no formato 'YYYY-MM-DD'

		const resultGetDay = await pool.query(getDay, values);

		const unavailableAppointments = resultGetDay.rows;

		const weekDays = [
			"Domingo",
			"Segunda-feira",
			"Terça-feira",
			"Quarta-feira",
			"Quinta-feira",
			"Sexta-feira",
			"Sábado"
		];

		const dateLocal = new Date(date + "T00:00:00"); // Adiciona uma hora fixa local
		const dayOfWeek = dateLocal.getDay();
		const dayName = weekDays[dayOfWeek];

		// horários disponíveis

		// Verifica se o funcionário tem aquele dia para trabalhar
		const correctDay = scheduleHours.find(
			e => e.week_day.toLowerCase() === dayName.toLowerCase()
		);

		if (!correctDay) {
			// funcionario não trabalha esse dia
			return null;
		}

		let availableTimes = [];

		// horários sem agendamento do funcionário
		const scheduleWithOutAppointments = [
			...(correctDay.start_time_1 && correctDay.end_time_1
				? [
						{
							start: correctDay.start_time_1,
							end: correctDay.end_time_1
						}
				  ]
				: []),
			...(correctDay.start_time_2 && correctDay.end_time_2
				? [
						{
							start: correctDay.start_time_2,
							end: correctDay.end_time_2
						}
				  ]
				: [])
		];
		// funcionario não tem agendamento esse dia
		if (unavailableAppointments.length == 0) {
			return {
				day: date,
				week_day: dayName,
				availableTimes: scheduleWithOutAppointments
			};
		}

		// funcionario tem agendamente esse dia

		// horários agendados
		const schedulesWithAppointments = unavailableAppointments.map(hour => {
			const start = new Date(hour.date_hour_begin);
			const end = new Date(hour.date_hour_end);

			return {
				start: `${String(start.getHours()).padStart(2, "0")}:${String(
					start.getMinutes()
				).padStart(2, "0")}:00`,
				end: `${String(end.getHours()).padStart(2, "0")}:${String(
					end.getMinutes()
				).padStart(2, "0")}:00`
			};
		});

		// restando assim o scheduleWithOutAppointments que tem todos os horários que o funcionário trabalha, sem os agendamentos
		// restando assim o schedulesWithAppointments que tem todos os horários agendados
		// restando tirar o schedulesWithAppointments (horários agendados) de scheduleWithOutAppointments (horário de trabalho do funcionário)

		const getAvailableTimes = (workPeriods, bookedPeriods) => {
			const availableTimes = [];

			// Ordena os períodos de trabalho e os períodos agendados
			workPeriods.sort((a, b) => a.start.localeCompare(b.start));
			bookedPeriods.sort((a, b) => a.start.localeCompare(b.start));

			let currentStart = null;
			let currentEnd = null;

			// Itera pelos períodos de trabalho
			for (const work of workPeriods) {
				currentStart = work.start;
				currentEnd = work.end;

				// Verifica os agendamentos que se sobrepõem ao período de trabalho
				for (const booked of bookedPeriods) {
					// Se o agendamento está dentro do período de trabalho, ajusta o horário disponível
					if (booked.start < currentEnd && booked.end > currentStart) {
						if (booked.start > currentStart) {
							availableTimes.push({
								start: currentStart,
								end: booked.start
							});
						}
						currentStart = booked.end; // Atualiza o início para após o agendamento
					}
				}

				// Caso o período de trabalho não tenha sido totalmente ocupado, adiciona o tempo restante
				if (currentStart < currentEnd) {
					availableTimes.push({
						start: currentStart,
						end: currentEnd
					});
				}
			}

			return availableTimes;
		};

		availableTimes = getAvailableTimes(
			scheduleWithOutAppointments,
			schedulesWithAppointments
		);

		return {day: date, week_day: dayName, availableTimes};

		// horários do funcionário
	} catch (e) {
		throw e;
	} finally {
		if (client) {
			client.release();
		}
	}
};

// GABRIELL O FEIO
const getAllAppointmentsByEmployee = async idStaff => {
	let client;
	try {
		client = await pool.connect();

		const query = "SELECT * FROM appointments WHERE staff_id = $1";

		const result = await client.query(query, [idStaff]);

		return result.rows;
	} catch (e) {
		throw e;
	} finally {
		if (client) {
			client.release();
		}
	}
};

const insertNewAppointment = async (
	idCompany,
	idStaff,
	idService,
	date,
	clientName,
	clientEmail,
	clientPhoneNumber,
	startTime,
	observation
) => {
	let client;

	try {
		client = await pool.connect();

		await client.query("BEGIN");

		const doesCompanyOfferServiceQuery =
			"SELECT * FROM services WHERE id = $1 AND company_id = $2";

		const isEmployeeBelongsToCompanyQuery =
			"SELECT * FROM staffs WHERE id = $1 AND company_id = $2";

		const getServiceDataQuery = "SELECT * FROM services WHERE id = $1";

		const isServiceBeingPerformedByEmployeeQuery =
			"SELECT * FROM services_staffs WHERE service_id = $1 AND staff_id = $2";

		const getEmployeeSchedulesDataQuery =
			"SELECT * FROM schedules_staffs WHERE staff_id = $1";

		const getEmployeeShiftsQuery = "SELECT * FROM schedules WHERE id = $1";

		const getClientDataQuery =
			"SELECT * FROM clients WHERE name = $1 AND email = $2 AND phone_number = $3";

		const createClientQuery =
			"INSERT INTO clients (name, email, phone_number) VALUES ($1, $2, $3)";

		const createAppointmentQuery =
			"INSERT INTO appointments (client_id, staff_id, service_id, date_hour_begin, date_hour_end, status, observation) VALUES ($1, $2, $3, $4, $5, $6, $7)";

		const {
			rows: [doesCompanyOfferService]
		} = await client.query(doesCompanyOfferServiceQuery, [
			idService,
			idCompany
		]);

		if (!doesCompanyOfferService) {
			return {
				statusCode: 404,
				statusMessage: "A empresa não oferece tal serviço"
			};
		}

		const {
			rows: [isEmployeeBelongsToCompany]
		} = await client.query(isEmployeeBelongsToCompanyQuery, [
			idStaff,
			idCompany
		]);

		if (!isEmployeeBelongsToCompany) {
			return {
				statusCode: 404,
				statusMessage: "O funcionário não pertence a empresa"
			};
		}

		const {
			rows: [serviceData]
		} = await client.query(getServiceDataQuery, [idService]);

		if (!serviceData) {
			return {
				statusCode: 404,
				statusMessage: "Falha ao localizar as informações do serviço"
			};
		}

		const {
			rows: [isServiceBeingPerformedByEmployee]
		} = await client.query(isServiceBeingPerformedByEmployeeQuery, [
			idService,
			idStaff
		]);

		if (!isServiceBeingPerformedByEmployee) {
			return {
				statusCode: 404,
				statusMessage: "Funcionário não executa o serviço solicitado"
			};
		}

		const {rows: employeeSchedulesData} = await client.query(
			getEmployeeSchedulesDataQuery,
			[idStaff]
		);

		if (employeeSchedulesData.length === 0) {
			return {
				statusCode: 404,
				statusMessage: "Erro ao localizar os IDs dos horários do funcionário"
			};
		}

		const employeeSchedules = [];

		for (let i = 0; i < employeeSchedulesData.length; i++) {
			const employeeScheduleId = employeeSchedulesData[i].schedule_id;

			const {
				rows: [employeeSchedule]
			} = await client.query(getEmployeeShiftsQuery, [employeeScheduleId]);

			if (!employeeSchedule) {
				return {
					statusCode: 404,
					statusMessage: "Falha ao listar os turnos do funcionário"
				};
			}

			employeeSchedules.push(employeeSchedule);
		}

		const serviceDuration = serviceData.average_duration;

		const serviceDateArray = date.split("-");

		const serviceDate = new Date(
			Number(serviceDateArray[0]),
			Number(serviceDateArray[1]) - 1,
			Number(serviceDateArray[2])
		);

		const serviceDay = serviceDate.getUTCDay();

		let serviceDayName;

		switch (serviceDay) {
			case 0:
				serviceDayName = "Domingo";
				break;
			case 1:
				serviceDayName = "Segunda-feira";
				break;
			case 2:
				serviceDayName = "Terça-feira";
				break;
			case 3:
				serviceDayName = "Quarta-feira";
				break;
			case 4:
				serviceDayName = "Quinta-feira";
				break;
			case 5:
				serviceDayName = "Sexta-feira";
				break;
			case 6:
				serviceDayName = "Sábado";
				break;
			default:
				serviceDayName = "Dia inválido";
		}

		const serviceStartTimeArray = startTime.split(":");

		const serviceStartTime = new Date(
			Number(serviceDateArray[0]),
			Number(serviceDateArray[1]) - 1,
			Number(serviceDateArray[2])
		);

		serviceStartTime.setUTCHours(
			Number(serviceStartTimeArray[0]),
			Number(serviceStartTimeArray[1])
		);

		const todayDate = new Date().toLocaleDateString("pt-BR");

		const todayDateArray = todayDate.split("/");

		const todayTime = new Date().toLocaleTimeString();

		const todayTimeArray = todayTime.split(":");

		const today = new Date(
			Number(todayDateArray[2]),
			Number(todayDateArray[1]) - 1,
			Number(todayDateArray[0])
		);

		today.setUTCHours(Number(todayTimeArray[0]), Number(todayTimeArray[1]));

		if (today.getTime() > serviceStartTime.getTime()) {
			return {
				statusCode: 409,
				statusMessage: "A data informada deve ser posterior à data atual"
			};
		}

		let endServiceMinutes = Number(serviceStartTimeArray[1]) + serviceDuration;

		let endServiceHours = Number(serviceStartTimeArray[0]);

		let endServiceDays = 0;

		if (endServiceMinutes > 59) {
			while (endServiceMinutes > 59) {
				endServiceMinutes -= 60;
				endServiceHours++;
			}
		}

		if (endServiceHours >= 24) {
			while (endServiceHours >= 24) {
				endServiceHours -= 24;
				endServiceDays++;
			}
		}

		const serviceEndTime = new Date(
			Number(serviceDateArray[0]),
			Number(serviceDateArray[1]) - 1,
			Number(serviceDateArray[2]) + endServiceDays
		);

		serviceEndTime.setUTCHours(endServiceHours, endServiceMinutes);

		let workDays = [];

		for (let j = 0; j < employeeSchedules.length; j++) {
			workDays.push(employeeSchedules[j].week_day);
		}

		if (!workDays.includes(serviceDayName)) {
			return {
				statusCode: 409,
				statusMessage: "Funcionário não está disponível no dia solicitado"
			};
		}

		for (let k = 0; k < employeeSchedules.length; k++) {
			const employeeShiftPerDay = employeeSchedules[k];

			if (employeeShiftPerDay.week_day === serviceDayName) {
				if (employeeShiftPerDay.status_1 !== false) {
					const firstShiftStartTimeArray =
						employeeShiftPerDay.start_time_1.split(":");

					const employeeFirstShiftStartTime = new Date(
						Number(serviceDateArray[0]),
						Number(serviceDateArray[1]) - 1,
						Number(serviceDateArray[2])
					);

					employeeFirstShiftStartTime.setUTCHours(
						Number(firstShiftStartTimeArray[0]),
						Number(firstShiftStartTimeArray[1])
					);

					const firstShiftEndTimeArray =
						employeeShiftPerDay.end_time_1.split(":");

					const employeeFirstShiftEndTime = new Date(
						Number(serviceDateArray[0]),
						Number(serviceDateArray[1]) - 1,
						Number(serviceDateArray[2])
					);

					employeeFirstShiftEndTime.setUTCHours(
						Number(firstShiftEndTimeArray[0]),
						Number(firstShiftEndTimeArray[1])
					);

					if (
						serviceStartTime.getTime() >=
							employeeFirstShiftStartTime.getTime() &&
						serviceStartTime.getTime() < employeeFirstShiftEndTime.getTime() &&
						serviceEndTime.getTime() > employeeFirstShiftStartTime.getTime() &&
						serviceEndTime.getTime() <= employeeFirstShiftEndTime.getTime()
					) {
						break;
					}
				}

				if (employeeShiftPerDay.status_2 !== false) {
					const secondShiftStartTimeArray =
						employeeShiftPerDay.start_time_2.split(":");

					const employeeSecondShiftStartTime = new Date(
						Number(serviceDateArray[0]),
						Number(serviceDateArray[1]) - 1,
						Number(serviceDateArray[2])
					);

					employeeSecondShiftStartTime.setUTCHours(
						Number(secondShiftStartTimeArray[0]),
						Number(secondShiftStartTimeArray[1])
					);

					const secondShiftEndTimeArray =
						employeeShiftPerDay.end_time_2.split(":");

					const employeeSecondShiftEndTime = new Date(
						Number(serviceDateArray[0]),
						Number(serviceDateArray[1]) - 1,
						Number(serviceDateArray[2])
					);

					employeeSecondShiftEndTime.setUTCHours(
						Number(secondShiftEndTimeArray[0]),
						Number(secondShiftEndTimeArray[1])
					);

					if (
						serviceStartTime.getTime() >=
							employeeSecondShiftStartTime.getTime() &&
						serviceStartTime.getTime() < employeeSecondShiftEndTime.getTime() &&
						serviceEndTime.getTime() > employeeSecondShiftStartTime.getTime() &&
						serviceEndTime.getTime() <= employeeSecondShiftEndTime.getTime()
					) {
						break;
					}
				}

				return {
					statusCode: 409,
					statusMessage: "Horário não compatível com o turno do funcionário"
				};
			}
		}

		const allAppointmentsByEmployee = await getAllAppointmentsByEmployee(
			idStaff
		);

		if (!allAppointmentsByEmployee) {
			return {
				statusCode: 404,
				statusMessage:
					"Falha ao listar os agendamentos existentes do funcionário"
			};
		}

		const allAppointmentsFilteredByEmployee = allAppointmentsByEmployee.filter(
			appointment => {
				if (appointment.status !== "CANCELADO") {
					return true;
				}
			}
		);

		let countAppointments = 0;

		for (let l = 0; l < allAppointmentsFilteredByEmployee.length; l++) {
			const appointmentData = allAppointmentsFilteredByEmployee[l];

			const appointmentStartDateAndTime =
				appointmentData.date_hour_begin.toISOString();

			const appointmentStartDateAndTimeArray =
				appointmentStartDateAndTime.split("T");

			const appointmentStartDate =
				appointmentStartDateAndTimeArray[0].split("-");

			const appointmentStartTime =
				appointmentStartDateAndTimeArray[1].split(":");

			const startTimeAppointment = new Date(
				Number(appointmentStartDate[0]),
				Number(appointmentStartDate[1]) - 1,
				Number(appointmentStartDate[2])
			);

			startTimeAppointment.setUTCHours(
				Number(appointmentStartTime[0]),
				Number(appointmentStartTime[1])
			);

			const appointmentEndDateAndTime =
				appointmentData.date_hour_end.toISOString();

			const appointmentEndDateAndTimeArray =
				appointmentEndDateAndTime.split("T");

			const appointmentEndDate = appointmentEndDateAndTimeArray[0].split("-");

			const appointmentEndTime = appointmentEndDateAndTimeArray[1].split(":");

			const endTimeAppointment = new Date(
				Number(appointmentEndDate[0]),
				Number(appointmentEndDate[1]) - 1,
				Number(appointmentEndDate[2])
			);

			endTimeAppointment.setUTCHours(
				Number(appointmentEndTime[0]),
				Number(appointmentEndTime[1])
			);

			if (
				(serviceStartTime.getTime() < startTimeAppointment.getTime() &&
					serviceEndTime.getTime() <= startTimeAppointment.getTime()) ||
				(serviceStartTime.getTime() >= endTimeAppointment.getTime() &&
					serviceEndTime.getTime() > endTimeAppointment.getTime())
			) {
				countAppointments++;
			}
		}

		if (countAppointments === allAppointmentsFilteredByEmployee.length) {
			let clientId;

			const {
				rows: [clientData]
			} = await client.query(getClientDataQuery, [
				clientName,
				clientEmail,
				clientPhoneNumber
			]);

			if (clientData) {
				clientId = clientData.id;
			} else {
				await client.query(createClientQuery, [
					clientName,
					clientEmail,
					clientPhoneNumber
				]);

				const {
					rows: [dataClient]
				} = await client.query(getClientDataQuery, [
					clientName,
					clientEmail,
					clientPhoneNumber
				]);

				clientId = dataClient.id;
			}

			await client.query(createAppointmentQuery, [
				clientId,
				idStaff,
				idService,
				serviceStartTime,
				serviceEndTime,
				"AGENDADO",
				observation
			]);

			await client.query("COMMIT");

			return {
				statusCode: 201,
				statusMessage: "Agendamento realizado com sucesso"
			};
		}

		await client.query("COMMIT");

		return {
			statusCode: 409,
			statusMessage: "Horário não disponível do funcionário"
		};
	} catch (error) {
		await client.query("ROLLBACK");

		throw error;
	} finally {
		if (client) {
			client.release();
		}
	}
};

module.exports = {
	getCompanyId,
	getServices,
	getServicesByStaff,
	getSchedules,
	insertNewAppointment
};
