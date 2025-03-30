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

const getServicesByStaff = async service => {
	let client;
	try {
		client = await pool.connect();

		const query = "SELECT * FROM services_staffs WHERE service_id = $1";

		const result = await client.query(query, [service]);

		if (result.rows.length <= 0) {
			return null;
		}

		const resultObj = result.rows;

		const staffObj = [];

		for (const e of resultObj) {
			const queryGetStaff = "SELECT * FROM staffs WHERE id = $1";
			const resultGet = await client.query(queryGetStaff, [e.staff_id]);

			if (resultGet.rows.length <= 0) {
				return null;
			}

			const resultObj = resultGet.rows;
      const staffJson = {
        id: resultObj[0].id,
        company_id: resultObj[0].company_id,
        name: resultObj[0].name,
        surname: resultObj[0].surname,
        email: resultObj[0].email,
      }
			staffObj.push(staffJson);
		}

		return staffObj;
	} catch (e) {
		throw e;
	} finally {
		if (client) {
			client.release();
		}
	}
};

module.exports = {getCompanyId, getServices, getServicesByStaff};
