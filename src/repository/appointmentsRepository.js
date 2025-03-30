const pool = require("../db");

const getAllAppointmentsByEmployee = async (employeeId) => {
  let client;
  try {
    client = await pool.connect();

    const query = "SELECT * FROM appointments WHERE staff_id = $1";

    const result = await client.query(query, [employeeId]);

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
  employeeId,
  serviceId,
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
      rows: [serviceData],
    } = await client.query(getServiceDataQuery, [serviceId]);

    if (!serviceData) {
      return {
        statusCode: 404,
        statusMessage: "Falha ao localizar as informações do serviço",
      };
    }

    const {
      rows: [isServiceBeingPerformedByEmployee],
    } = await client.query(isServiceBeingPerformedByEmployeeQuery, [
      serviceId,
      employeeId,
    ]);

    if (!isServiceBeingPerformedByEmployee) {
      return {
        statusCode: 404,
        statusMessage: "Funcionário não executa o serviço solicitado",
      };
    }

    const { rows: employeeSchedulesData } = await client.query(
      getEmployeeSchedulesDataQuery,
      [employeeId]
    );

    if (employeeSchedulesData.length === 0) {
      return {
        statusCode: 404,
        statusMessage: "Erro ao localizar os IDs dos horários do funcionário",
      };
    }

    const employeeSchedules = [];

    for (let i = 0; i < employeeSchedulesData.length; i++) {
      const employeeScheduleId = employeeSchedulesData[i].schedule_id;

      const {
        rows: [employeeSchedule],
      } = await client.query(getEmployeeShiftsQuery, [employeeScheduleId]);

      if (!employeeSchedule) {
        return {
          statusCode: 404,
          statusMessage: "Falha ao listar os turnos do funcionário",
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

    const todayDate = new Date().toLocaleDateString();

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
        statusMessage: "A data informada deve ser posterior à data atual",
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
        statusMessage: "Funcionário não está disponível no dia solicitado",
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
          statusMessage: "Horário não compatível com o turno do funcionário",
        };
      }
    }

    const allAppointmentsByEmployee = await getAllAppointmentsByEmployee(
      employeeId
    );

    if (allAppointmentsByEmployee.length === 0) {
      let clientId;

      const {
        rows: [clientData],
      } = await client.query(getClientDataQuery, [
        clientName,
        clientEmail,
        clientPhoneNumber,
      ]);

      if (clientData) {
        clientId = clientData.id;
      } else {
        await client.query(createClientQuery, [
          clientName,
          clientEmail,
          clientPhoneNumber,
        ]);

        const {
          rows: [dataClient],
        } = await client.query(getClientDataQuery, [
          clientName,
          clientEmail,
          clientPhoneNumber,
        ]);

        clientId = dataClient.id;
      }

      await client.query(createAppointmentQuery, [
        clientId,
        employeeId,
        serviceId,
        serviceStartTime,
        serviceEndTime,
        "Agendado",
        observation,
      ]);

      await client.query("COMMIT");

      return {
        statusCode: 201,
        statusMessage: "Agendamento realizado com sucesso",
      };
    }

    for (let l = 0; l < allAppointmentsByEmployee.length; l++) {
      const appointmentData = allAppointmentsByEmployee[l];

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
        let clientId;

        const {
          rows: [clientData],
        } = await client.query(getClientDataQuery, [
          clientName,
          clientEmail,
          clientPhoneNumber,
        ]);

        if (clientData) {
          clientId = clientData.id;
        } else {
          await client.query(createClientQuery, [
            clientName,
            clientEmail,
            clientPhoneNumber,
          ]);

          const {
            rows: [dataClient],
          } = await client.query(getClientDataQuery, [
            clientName,
            clientEmail,
            clientPhoneNumber,
          ]);

          clientId = dataClient.id;
        }

        await client.query(createAppointmentQuery, [
          clientId,
          employeeId,
          serviceId,
          serviceStartTime,
          serviceEndTime,
          "Agendado",
          observation,
        ]);

        return {
          statusCode: 201,
          statusMessage: "Agendamento realizado com sucesso",
        };
      }
    }

    await client.query("COMMIT");

    return {
      statusCode: 409,
      statusMessage: "Horário não disponível do funcionário",
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

module.exports = { insertNewAppointment, getAllAppointmentsByEmployee };