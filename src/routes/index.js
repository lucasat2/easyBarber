const express = require("express");
const loginRoutes = require("./loginRoutes.js");
const logoutRoutes = require("./logoutRoutes.js");
const usersRoutes = require("./usersRoutes.js");
const router = express.Router();

router.use("/login", loginRoutes);
router.use("/logout", logoutRoutes);
router.use("/users", usersRoutes);

module.exports = router;