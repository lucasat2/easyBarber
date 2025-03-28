const express = require("express");
const staffController = require("../controller/staffController.js");
const { verifyActiveSession } = require("../middleware");
const router = express.Router();

router.get("/", verifyActiveSession, staffController.list);
router.post("/", verifyActiveSession, staffController.create);
router.put("/", verifyActiveSession, staffController.update);
router.delete("/", verifyActiveSession, staffController.remove);

module.exports = router;