const express = require("express");
const loginController = require("../controller/loginController.js");
const {verifyActiveSession} = require("../middleware/index.js")
const router = express.Router();

router.post("/", loginController.login);

// Rota para verificar a sessão do usuário
router.get("/checkLogin", verifyActiveSession, (req, res) => {
    res.json({loggedIn: true, user: req.user });
  });

module.exports = router;