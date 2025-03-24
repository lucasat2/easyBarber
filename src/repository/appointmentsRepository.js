const pool = require("../db");

const insertNewAppointment = async (
  employeeId,
  serviceId,
  date,
  clientId,
  startTime,
  observation
) => {
  let client;

  try {
    client = await pool.connect();

    const isServiceBeingPerformedByEmployeeQuery =
      "SELECT * FROM services_staffs WHERE service_id = $1 AND staff_id = $2";

    const getEmployeeSchedulesDataQuery =
      "SELECT * FROM schedules_staffs WHERE staff_id = $1";

    const getEmployeeShiftsQuery = "SELECT * FROM schedules WHERE id = $1";

    const getServiceDataQuery = "SELECT * FROM services WHERE id = $1";

    const {
      rows: [isServiceBeingPerformedByEmployee],
    } = await client.query(isServiceBeingPerformedByEmployeeQuery, [
      serviceId,
      employeeId,
    ]);

    if (!isServiceBeingPerformedByEmployee) {
      return {
        errorCode: 404,
        errorMessage: "Funcionário não executa o serviço solicitado",
      };
    }

    const { rows: employeeSchedulesData } = await client.query(
      getEmployeeSchedulesDataQuery,
      [employeeId]
    );

    if (employeeSchedulesData.length === 0) {
      return {
        errorCode: 404,
        errorMessage: "Erro ao localizar os IDs dos horários do funcionário",
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
          errorCode: 404,
          errorMessage: "Falha ao listar os turnos do funcionário",
        };
      }

      employeeSchedules.push(employeeSchedule);
    }

    const serviceDate = new Date(date);
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

    for (let j = 0; j < employeeSchedules.length; j++) {
      const employeeShiftPerDay = employeeSchedules[j];

      if (
        employeeShiftPerDay.week_day === serviceDayName &&
        employeeShiftPerDay.status === false
      ) {
        return {
          errorCode: 409,
          errorMessage: "Funcionário não está disponível no dia solicitado",
        };
      }
    }

    const {
      rows: [serviceData],
    } = await client.query(getServiceDataQuery, [serviceId]);

    if (!serviceData) {
      return {
        errorCode: 404,
        errorMessage: "Falha ao localizar as informações do serviço",
      };
    }

    const serviceDuration = serviceData.average_duration;
    let serviceDurationMinutes = serviceDuration;
    let serviceDurationHours = 0;

    if (serviceDurationMinutes > 59) {
      while (serviceDurationMinutes > 59) {
        serviceDurationMinutes -= 60;
        serviceDurationHours++;
      }
    }

    const serviceStartTimeArray = startTime.split(":");

    const serviceStartTime = new Date(date).setUTCHours(
      serviceStartTimeArray[0],
      serviceStartTimeArray[1]
    );

    const serviceEndTime = new Date(date).setUTCHours(
      Number(serviceStartTimeArray[0]) + serviceDurationHours,
      Number(serviceStartTimeArray[1]) + serviceDurationMinutes
    );

  } catch (error) {
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
};

module.exports = { insertNewAppointment };