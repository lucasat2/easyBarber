const express = require("express");
const loginController = require("../controller/loginController.js");
const router = express.Router();

router.post("/", loginController.login);

module.exports = router;