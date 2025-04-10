const pool = require("../db");

const getUserData = async (email) => {
  let client;

  try {
    client = await pool.connect();

    const query = "SELECT * FROM users WHERE email = $1";

    const {
      rows: [user],
    } = await client.query(query, [email]);

    return user;
  } catch (error) {
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
};

module.exports = { getUserData };