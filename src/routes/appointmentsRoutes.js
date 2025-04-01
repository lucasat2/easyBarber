const express = require("express");
const appointmentsController = require("../controller/appointmentsController.js");
const { verifyActiveSession } = require("../middleware");
const router = express.Router();

router.get(
  "/",
  verifyActiveSession,
  appointmentsController.listAllAppointmentsByEmployee
);
router.post("/", verifyActiveSession, appointmentsController.createAppointment);
router.post(
  "/blockSchedule",
  verifyActiveSession,
  appointmentsController.blockTimeForStaff
);

module.exports = router;