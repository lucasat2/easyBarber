const express = require("express");
const staffController = require("../controller/staffController.js");
const { verifyActiveSession } = require("../middleware");
const router = express.Router();

router.get("/",verifyActiveSession, staffController.list);

module.exports = router;