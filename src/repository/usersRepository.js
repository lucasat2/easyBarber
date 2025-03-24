const pool = require("../db");

const insertNewUser = async (
  name,
  surname,
  companyName,
  email,
  hashedPassword
) => {
  let client;

  try {
    const isEmailRegisteredQuery = "SELECT * FROM users WHERE email = $1";

    const insertUserQuery =
      "INSERT INTO users (name, surname, company_name, email, password) VALUES ($1, $2, $3, $4, $5)";

    client = await pool.connect();

    const {
      rows: [user],
    } = await client.query(isEmailRegisteredQuery, [email]);

    if (user) {
      return { errorCode: 409, errorMessage: "E-mail já cadastrado" };
    }

    await client.query(insertUserQuery, [
      name,
      surname,
      companyName,
      email,
      hashedPassword,
    ]);
  } catch (error) {
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
};

const updateUser = async (userId, name, surname, companyName, email, phone, cnpj) => {
  let client;
  try {
    client = await pool.connect();

    await client.query("BEGIN");

    if (name) {
      const query = "UPDATE users SET name = $1, updated_at = NOW() WHERE id = $2";
      await client.query(query, [name, userId]);
    }
    if (surname) {
      const query = "UPDATE users SET surname = $1, updated_at = NOW() WHERE id = $2";
      await client.query(query, [surname, userId]);
    }
    if (companyName) {
      const users = await client.query("SELECT * FROM users WHERE id = $1", [userId]);

      const query = "UPDATE company SET name = $1, updated_at = NOW()  WHERE id = $2";
      await client.query(query, [companyName, users.rows[0].company_id]);
    }
    if (email) {
      const query = "UPDATE users SET email = $1, updated_at = NOW() WHERE id = $2";
      await client.query(query, [email, userId]);
    }
    if (phone) {
      const query = "UPDATE users SET phone = $1, updated_at = NOW() WHERE id = $2";
      await client.query(query, [phone, userId]);
    }
    if (cnpj) {
      const users = await client.query("SELECT * FROM users WHERE id = $1", [userId]);

      const query = "UPDATE company SET cnpj = $1, updated_at = NOW() WHERE id = $2";
      await client.query(query, [cnpj, users.rows[0].company_id]);
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

const getUserById = async (userId) => {
  let client;
  try {
    client = await pool.connect();

    const query = "SELECT * FROM users WHERE id = $1";
    const { rows } = await client.query(query, [userId]);
    return rows[0];
  } catch (error) {
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}

module.exports = {
  insertNewUser,
  updateUser,
  getUserById,
};
