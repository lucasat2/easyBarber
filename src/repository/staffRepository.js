const pool = require("../db");
let client;

const getAllStaff = async (userId) => {
  try {
    const getCompanyData = "SELECT * FROM users WHERE id = $1";

    client = await pool.connect();

    const {
      rows: [user],
    } = await client.query(getCompanyData, [userId]);

    if (!user) {
      return { errorStatus: 404, errorMessage: "Usuário não encontrado" };
    }

    const companyId = user.company_id;

    const getAllEmployees = "SELECT * FROM staffs WHERE company_id = $1";

    const { rows: allEmployees } = await client.query(getAllEmployees, [
      companyId,
    ]);

    if (!allEmployees) {
      return { errorStatus: 404, errorMessage: "Falha ao listar funcionários" };
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
    "INSERT INTO staffs (company_id, name, surname, cpf, email, phone_number, birthdate, postal_code) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)";

  try {
    client = await pool.connect();

    const {
      rows: [userData],
    } = await client.query(getUserDataQuery, [userId]);

    if (!userData) {
      return { errorStatus: 404, errorMessage: "Usuário não encontrado" };
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
    ]);
  } catch (error) {
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

  await client.query("BEGIN")

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

  await client.query("COMMIT")

  } catch (error) {
    await client.query("ROLLBACK")
    throw error;

  } finally {
    if (client) {
      client.release();
    }
  }
};

const removeStaff = async (id) => {
  const deleteStaff = "DELETE FROM staffs WHERE id = $1";

  try {
    client = await pool.connect();

    await client.query(deleteStaff, [id]);

  } catch (error) {
    throw error;

  } finally {
    if (client) {
      client.release();
    }
  }
};

module.exports = { getAllStaff, createStaff, updateStaff, removeStaff };
