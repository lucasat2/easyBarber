const express = require("express");
const loginRoutes = require("./loginRoutes.js");
const logoutRoutes = require("./logoutRoutes.js");
const usersRoutes = require("./usersRoutes.js");
const staffRoutes = require("./staffRoutes.js")

// const dashboard = require("./dashboard.js");
const router = express.Router();

router.use("/login", loginRoutes);
router.use("/logout", logoutRoutes);
router.use("/users", usersRoutes);
router.use("/staff", staffRoutes);

// router.use("/dashboard", dashboard)

module.exports = router;