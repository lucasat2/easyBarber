const staffRepository = require ("../repository/staffRepository.js");

const list = async (req, res) => {
  try {
    const response = await staffRepository.listAllStaff();

    res.status(200).json({response});
  } catch (error) {
    res.status(500).json({error});
  }
};

module.exports = {list}