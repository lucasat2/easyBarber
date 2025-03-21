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

const updateUser = async (userId, userData) => {
  let client;
  try {
    client = await pool.connect();

    const fields = Object.keys(userData);
    const values = Object.values(userData);

    if (fields.length === 0) {
      throw new Error("Nenhum dado para atualizar.");
    }

    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(", ");
    const query = `UPDATE users SET ${setClause} WHERE id = $1 RETURNING *`;

    const { rows } = await client.query(query, [userId, ...values]);
    return rows[0] || null;
  } catch (error) {
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
};

module.exports = {
  insertNewUser,
  updateUser,
};
