const express = require("express");
const logoutController = require("../controller/logoutController.js");
const { verifyActiveSession } = require("../middleware");
const router = express.Router();

router.post("/", verifyActiveSession, logoutController.logout);

module.exports = router;