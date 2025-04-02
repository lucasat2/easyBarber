const express = require("express");
const router = express.Router();
const servicesController = require("../controller/servicesController");

router.post("/", servicesController.createService);
router.get("/", servicesController.listAllCompanyServices);
router.get("/:id", servicesController.getServiceData);
router.put("/", servicesController.updateService);
router.delete("/", servicesController.deleteService);

module.exports = router;