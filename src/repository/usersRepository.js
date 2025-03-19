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
      "INSERT INTO users (name, surname, companyName, email, password) VALUES ($1, $2, $3, $4, $5)";

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

module.exports = {
  insertNewUser,
};