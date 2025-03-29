const express = require("express");
const router = express.Router();
const loginRoutes = require("./loginRoutes.js");
const logoutRoutes = require("./logoutRoutes.js");
const usersRoutes = require("./usersRoutes.js");
const servicesRoutes = require("./servicesRoutes.js");
const appointmentsRoutes = require("./appointmentsRoutes.js");
const staffRoutes = require("./staffRoutes.js");
const customerRoutes = require("./customerRoutes.js");

router.use("/customer", customerRoutes);

router.use("/login", loginRoutes);
router.use("/logout", logoutRoutes);
router.use("/users", usersRoutes);
router.use("/services", servicesRoutes);
router.use("/appointments", appointmentsRoutes);
router.use("/staff", staffRoutes);

module.exports = router;