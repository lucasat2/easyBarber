const express = require("express");
const customerController = require("../controller/customerController");
const router = express.Router();

router.get("/services/:company", customerController.listServicesByCompany);
router.get("/:company", customerController.listCompanyId);

module.exports = router;
