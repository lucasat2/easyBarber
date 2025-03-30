const pool = require("../db");

const insertNewUser = async (
  name,
  cnpj,
  phoneNumber,
  state,
  city,
  street,
  number,
  postalCode,
  email,
  hashedPassword
) => {
  let client;

  try {
    const isEmailRegisteredQuery = "SELECT * FROM users WHERE email = $1";

    const insertNewAddressQuery =
      "INSERT INTO companies_address (state, city, street, number, postal_code) VALUES ($1, $2, $3, $4, $5)";

    const findAddressDataQuery =
      "SELECT * FROM companies_address WHERE number = $1 AND postal_code = $2";

    const insertNewCompanyQuery =
      "INSERT INTO companies (company_address_id, name, cnpj, phone_number, link_client) VALUES ($1, $2, $3, $4, $5)";

    const findCompanyDataQuery = "SELECT * FROM companies WHERE cnpj = $1";

    const insertNewUserQuery =
      "INSERT INTO users (company_id, email, password) VALUES ($1, $2, $3)";

    client = await pool.connect();

    await client.query("BEGIN");

    const {
      rows: [user],
    } = await client.query(isEmailRegisteredQuery, [email]);

    if (user) {
      return { errorCode: 409, errorMessage: "E-mail já cadastrado" };
    }

    await client.query(insertNewAddressQuery, [
      state,
      city,
      street,
      number,
      postalCode,
    ]);

    const {
      rows: [companyAddressData],
    } = await client.query(findAddressDataQuery, [number, postalCode]);

    if (!companyAddressData) {
      return {
        errorCode: 404,
        errorMessage: "Falha ao encontrar o ID do endereço",
      };
    }

    const companyAddressId = companyAddressData.id;

    const companyLinkPage = `http://localhost/${name}`;

    await client.query(insertNewCompanyQuery, [
      companyAddressId,
      name,
      cnpj,
      phoneNumber,
      companyLinkPage,
    ]);

    const {
      rows: [companyData],
    } = await client.query(findCompanyDataQuery, [cnpj]);

    if (!companyData) {
      return {
        errorCode: 404,
        errorMessage: "Falha ao encontrar o ID da empresa",
      };
    }

    const companyId = companyData.id;

    await client.query(insertNewUserQuery, [companyId, email, hashedPassword]);

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

const updateUser = async (
  userId,
  name,
  cnpj,
  phoneNumber,
  state,
  city,
  street,
  number,
  postalCode,
  email,
  hashedPassword
) => {
  let client;

  try {
    const findUserDataQuery = "SELECT * FROM users WHERE id = $1";

    const findCompanyDataQuery = "SELECT * FROM companies WHERE id = $1";

    client = await pool.connect();

    await client.query("BEGIN");

    const {
      rows: [userData],
    } = await client.query(findUserDataQuery, [userId]);

    if (!userData) {
      return {
        errorCode: 404,
        errorMessage: "Falha ao encontrar os dados do usuário",
      };
    }

    const companyId = userData.company_id;

    const {
      rows: [companyData],
    } = await client.query(findCompanyDataQuery, [companyId]);

    if (!companyData) {
      return {
        errorCode: 404,
        errorMessage: "Falha ao encontrar os dados da empresa",
      };
    }

    const companyAddressId = companyData.company_address_id;

    if (name) {
      const updateCompanyName =
        "UPDATE companies SET name = $1, link_client = $2, updated_at = NOW() WHERE id = $2";

      const newLinkPage = `http://localhost/${name}`;

      await client.query(updateCompanyName, [name, newLinkPage, companyId]);
    }

    if (cnpj) {
      const updateCnpjQuery =
        "UPDATE companies SET cnpj = $1, updated_at = NOW() WHERE id = $2";

      await client.query(updateCnpjQuery, [cnpj, companyId]);
    }

    if (phoneNumber) {
      const updatePhoneNumberQuery =
        "UPDATE companies SET phone_number = $1, updated_at = NOW() WHERE id = $2";

      await client.query(updatePhoneNumberQuery, [phoneNumber, companyId]);
    }

    if (state) {
      const updateStateQuery =
        "UPDATE companies_address SET state = $1, updated_at = NOW() WHERE id = $2";

      await client.query(updateStateQuery, [state, companyAddressId]);
    }

    if (city) {
      const updateCityQuery =
        "UPDATE companies_address SET city = $1, updated_at = NOW() WHERE id = $2";

      await client.query(updateCityQuery, [city, companyAddressId]);
    }

    if (street) {
      const updateStreetQuery =
        "UPDATE companies_address SET street = $1, updated_at = NOW() WHERE id = $2";

      await client.query(updateStreetQuery, [street, companyAddressId]);
    }

    if (number) {
      const updateNumberQuery =
        "UPDATE companies_address SET number = $1, updated_at = NOW() WHERE id = $2";

      await client.query(updateNumberQuery, [number, companyAddressId]);
    }

    if (postalCode) {
      const updateNumberQuery =
        "UPDATE companies_address SET postal_code = $1, updated_at = NOW() WHERE id = $2";

      await client.query(updateNumberQuery, [postalCode, companyAddressId]);
    }

    if (email) {
      const updateEmailQuery =
        "UPDATE users SET email = $1, updated_at = NOW() WHERE id = $2";

      await client.query(updateEmailQuery, [email, userId]);
    }

    if (hashedPassword) {
      const updatePasswordQuery =
        "UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2";

      await client.query(updatePasswordQuery, [hashedPassword, userId]);
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

module.exports = {
  insertNewUser,
  updateUser,
};