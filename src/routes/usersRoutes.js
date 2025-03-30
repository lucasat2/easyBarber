const express = require("express");
const usersController = require("../controller/usersController.js");
const router = express.Router();

router.post("/", usersController.createUser);
router.put("/", usersController.updateUser);

module.exports = router;