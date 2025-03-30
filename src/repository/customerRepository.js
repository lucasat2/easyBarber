const pool = require("../db");
const {get} = require("../routes/customerRoutes");

const getCompanyId = async company => {
	let client;
	try {
		client = await pool.connect();

		const query = "SELECT * FROM companies WHERE name = $1";

		const result = await client.query(query, [company]);

		if (result.rows.length > 0) {
			return result.rows[0].id;
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

		if (result.rows.length > 0) {
			return result.rows;
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

const getServicesByStaff = async service => {
	let client;
	try {
		client = await pool.connect();

		const query = "SELECT * FROM services_staffs WHERE service_id = $1";

		const result = await client.query(query, [service]);

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

module.exports = {getCompanyId, getServices, getServicesByStaff, getSchedules};
