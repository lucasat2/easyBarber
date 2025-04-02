const express = require("express");
const staffController = require("../controller/staffController.js");
const { verifyActiveSession } = require("../middleware");
const router = express.Router();

router.get("/", verifyActiveSession, staffController.list);
router.post("/", verifyActiveSession, staffController.create);
router.post(
  "/associateServices",
  verifyActiveSession,
  staffController.assignServicesToStaff
);
router.post(
  "/associateShifts",
  verifyActiveSession,
  staffController.assignSchedulesToEmployee
);
router.put("/", verifyActiveSession, staffController.update);
router.delete("/", verifyActiveSession, staffController.remove);
router.delete(
  "/disassociateServices",
  verifyActiveSession,
  staffController.unassignServiceFromStaff
);

router.get(
  "/:employeeId",
  verifyActiveSession,
  staffController.listAllServicesByEmployee
);








module.exports = router;