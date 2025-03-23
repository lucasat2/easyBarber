const express = require("express");
const router = express.Router();
const servicesController = require("../controller/servicesController");

router.post("/services", servicesController.createService);
router.get("/services", servicesController.getServices);
router.put("/services/:id", servicesController.updateService);
router.delete("/services/:id", servicesController.deleteService);

module.exports = router;
