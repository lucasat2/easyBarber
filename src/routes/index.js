const express = require("express");
const router = express.Router();
const loginRoutes = require("./loginRoutes.js");
const logoutRoutes = require("./logoutRoutes.js");
const usersRoutes = require("./usersRoutes.js");
const appointmentsRoutes = require("./appointmentsRoutes.js");
const staffRoutes = require("./staffRoutes.js")

router.use("/login", loginRoutes);
router.use("/logout", logoutRoutes);
router.use("/users", usersRoutes);
router.use("/appointments", appointmentsRoutes);
router.use("/staff", staffRoutes);

module.exports = router;