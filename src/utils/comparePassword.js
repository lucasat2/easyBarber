const bcrypt = require("bcrypt");

async function comparePassword(password, hashedPassword) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);

    return match;
  } catch (error) {
    throw error;
  }
}

module.exports = { comparePassword };