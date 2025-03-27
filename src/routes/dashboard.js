const express = require("express");
const dashboard = require("../controller/dashboardController");
const router = express.Router();

router.get("/", dashboard.getPage);

module.exports = router;
