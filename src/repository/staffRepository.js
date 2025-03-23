const pool = require("../db");

const getAllStaff = async () => {
  const query = "SELECT * FROM staff";
  try {
    
    const client = await pool.connect();
    const result = await client.query(query);
    result.rows;

  } catch (error) {
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
};

modul.exports = { getAllStaff };
