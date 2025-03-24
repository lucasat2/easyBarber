const express = require("express");
const loginRoutes = require("./loginRoutes.js");
const logoutRoutes = require("./logoutRoutes.js");
const usersRoutes = require("./usersRoutes.js");
const appointmentsRoutes = require("./appointmentsRoutes.js");
const router = express.Router();

router.use("/login", loginRoutes);
router.use("/logout", logoutRoutes);
router.use("/users", usersRoutes);
router.use("/appointments", appointmentsRoutes);

module.exports = router;