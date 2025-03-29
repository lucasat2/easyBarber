const express = require("express");
const customerController = require("../controller/customerController");
const router = express.Router();

router.post("/services/company/getStaffIdsByService", customerController.listStaffByService);
router.post("/services/company", customerController.listServicesByCompany);
router.post("/company", customerController.listCompanyId);

module.exports = router;
