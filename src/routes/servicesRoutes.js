const express = require("express");
const router = express.Router();
const servicesController = require("../controller/servicesController");

router.post("/", servicesController.createService);
router.get("/:id", servicesController.getServiceData);
router.get("/", servicesController.listAllCompanyServices);
router.put("/", servicesController.updateService);
router.delete("/", servicesController.deleteService);

module.exports = router;