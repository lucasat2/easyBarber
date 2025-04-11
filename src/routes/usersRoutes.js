const express = require("express");
const usersController = require("../controller/usersController.js");
const { verifyActiveSession } = require("../middleware");
const router = express.Router();

router.get("/company/info", verifyActiveSession, usersController.getCompanyInfo);
router.get("/company", verifyActiveSession, usersController.getCompanyData);
router.post("/", usersController.createUser);
router.put("/", verifyActiveSession, usersController.updateUser);

module.exports = router;