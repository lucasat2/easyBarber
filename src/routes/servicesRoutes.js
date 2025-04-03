const express = require("express");
const router = express.Router();
const servicesController = require("../controller/servicesController");
const { verifyActiveSession } = require("../middleware");

router.post("/", verifyActiveSession, servicesController.createService);
router.get("/", verifyActiveSession, servicesController.listAllCompanyServices);
router.get("/:id", verifyActiveSession, servicesController.getServiceData);
router.put("/", verifyActiveSession, servicesController.updateService);
router.delete("/", verifyActiveSession, servicesController.deleteService);

module.exports = router;