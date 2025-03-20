const express = require("express");
const usersController = require("../controller/usersController.js");
const router = express.Router();

router.post("/", usersController.createUser);

module.exports = router;