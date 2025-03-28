const pool = require("../db");

const createService = async (
  userId,
  name,
  description,
  price,
  averageDuration
) => {
  let client;

  try {
    const findUserDataQuery = `SELECT * FROM users WHERE id = $1;`;

    const createServiceQuery = `
      INSERT INTO services (company_id, name, description, price, average_duration)
      VALUES ($1, $2, $3, $4, $5);
    `;
    client = await pool.connect();
    await client.query("BEGIN");
    const {
      rows: [userData],
    } = await client.query(findUserDataQuery, [userId]);
    if (!userData) {
      return { errorCode: 404, errorMessage: "Usuário não encontrado" };
    }
    const companyId = userData.company_id;

    await client.query(createServiceQuery, [
      companyId,
      name,
      description,
      price,
      averageDuration,
    ]);
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

const listAllCompanyServices = async (userId) => {
  let client;
  try {
    const findUserDataQuery = `SELECT * FROM users WHERE id = $1;`;

    const listAllCompanyServicesQuery = `
      SELECT * FROM services WHERE company_id = $1;
    `;
    client = await pool.connect();

    const {
      rows: [userData],
    } = await client.query(findUserDataQuery, [userId]);

    if (!userData) {
      return { errorCode: 404, errorMessage: "Usuário não encontrado" };
    }

    const companyId = userData.company_id;

    const { rows: allCompanyServices } = await client.query(
      listAllCompanyServicesQuery,
      [companyId]
    );

    return allCompanyServices;
  } catch (error) {
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
};

const updateService = async (
  userId,
  serviceID,
  name,
  description,
  price,
  averageDuration
) => {
  let client;

  try {
    const findUserDataQuery = `SELECT * FROM users WHERE id = $1;`;

    client = await pool.connect();

    await client.query("BEGIN");

    const {
      rows: [userData],
    } = await client.query(findUserDataQuery, [userId]);

    if (!userData) {
      return { errorCode: 404, errorMessage: "Usuário não encontrado" };
    }

    const companyID = userData.company_id;

    const dataArray = {
      company_id: companyID,
      name: name,
      description: description,
      price: price,
      average_duration: averageDuration,
    };

    for (const key in dataArray) {
      if (dataArray[key]) {
        const updateQuery = `UPDATE services SET ${key} = $1, updated_at = NOW() WHERE id = $2;`;

        await client.query(updateQuery, [dataArray[key], serviceID]);
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

const deleteService = async (serviceID) => {
  let client;

  try {
    client = await pool.connect();

    const query = "DELETE FROM services WHERE id = $1";

    await client.query(query, [serviceID]);
  } catch (error) {
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
};

module.exports = {
  createService,
  listAllCompanyServices,
  updateService,
  deleteService,
};
