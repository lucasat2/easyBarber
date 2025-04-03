const express = require("express");
const appointmentsController = require("../controller/appointmentsController.js");
const { verifyActiveSession } = require("../middleware");
const router = express.Router();

router.get(
  "/employee/:id",
  verifyActiveSession,
  appointmentsController.listAllAppointmentsByEmployee
);
router.get(
  "/:id",
  verifyActiveSession,
  appointmentsController.getAppointmentFullData
);
router.post("/", verifyActiveSession, appointmentsController.createAppointment);
router.post(
  "/blockSchedule",
  verifyActiveSession,
  appointmentsController.blockTimeForStaff
);
router.put(
  "/updateStatus",
  verifyActiveSession,
  appointmentsController.updateScheduleStatus
);

module.exports = router;