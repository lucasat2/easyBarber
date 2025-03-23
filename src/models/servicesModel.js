const db = require("../db");

const createService = async (company_id, name, description, price, average_duration) => {
  const query = `
    INSERT INTO services (company_id, name, description, price, average_duration)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [company_id, name, description, price, average_duration];
  const result = await db.query(query, values);
  return result.rows[0];
};

const getServices = async () => {
  const query = "SELECT * FROM services;";
  const result = await db.query(query);
  return result.rows;
};

const updateService = async (id, name, description, price, average_duration) => {
  const query = `
    UPDATE services
    SET name = $1, description = $2, price = $3, average_duration = $4, updated_at = NOW()
    WHERE id = $5
    RETURNING *;
  `;
  const values = [name, description, price, average_duration, id];
  const result = await db.query(query, values);
  return result.rows[0];
};

const deleteService = async (id) => {
  const query = "DELETE FROM services WHERE id = $1 RETURNING *;";
  const values = [id];
  const result = await db.query(query, values);
  return result.rows[0];
};

module.exports = {
  createService,
  getServices,
  updateService,
  deleteService,
};
