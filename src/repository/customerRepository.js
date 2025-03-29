const pool = require("../db");

const getCompanyId = async company => {
	let client;
	try {
		client = await pool.connect();

		const query = "SELECT * FROM companies WHERE name = $1";

		const result = await client.query(query, [company]);

		if (result.rows.length > 0) {
			return result.rows[0].id;
		} else {
			return null;
		}
	} catch (e) {
		throw e;
	} finally {
		if (client) {
			client.release();
		}
	}
};

const getServices = async company => {
	let client;
	try {
		client = await pool.connect();

		const query = "SELECT * FROM services WHERE company_id = $1";

		const result = await client.query(query, [company]);

		if (result.rows.length > 0) {
			return result.rows;
		} else {
			return null;
		}
	} catch (e) {
		throw e;
	} finally {
		if (client) {
			client.release();
		}
	}
};

module.exports = {getCompanyId, getServices};
