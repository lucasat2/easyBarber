const pool = require("../db");

const getAllStaff = async () => {
  const query = "SELECT * FROM staff";
  try {
    const client = await pool.connect();
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
};

const createStaff = async (
  id,
  company_id,
  name,
  surname,
  cpf,
  email,
  phone_number,
  cep,
  address,
  created_at,
  updated_at
) => {
  const query = 
    "INSERT INTO staff (name, surname, cpf, email, phone_number, cep, address, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";

  try {
    const client = await pool.connect();

    await client.query(query, [
      company_id,
      name,
      surname,
      cpf,
      email,
      phone_number,
      cep,
      address,
      created_at,
      updated_at
    ]);

  } catch (error){
    throw error;
  } finally {
    if (client){
      client.release();
    }
  }
}

const updateStaff = async (
  company_id,
  name,
  surname,
  cpf,
  email,
  phone_number,
  cep,
  address,
  created_at,
  updated_at
) => {
  const query =
    "UPDATE staff SET name = $1, surname = $2, cpf = $3, email = $4, phone_number = $5, cep = $6, address = $7, updated_at = $8 WHERE id = $9";

  try {
    const client = await pool.connect();

    await client.query(query, [
      name,
      surname,
      cpf,
      email,
      phone_number,
      cep,
      address,
      updated_at,
      id
    ]);

  } catch (error){
    throw error;
  } finally {
    if (client){
      client.release();
    }
  }
}

const removeStaff = async (id) => {
  const query = "DELETE FROM staff WHERE id = $1";

  try {
    const client = await pool.connect();

    await client.query(query, [id]);
  } catch (error) {
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}

module.exports = { getAllStaff, createStaff, updateStaff, removeStaff };
