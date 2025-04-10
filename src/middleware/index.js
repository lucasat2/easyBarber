const jwt = require("jsonwebtoken");
const config = require("../config");

const verifyActiveSession = (req, res, next) => {
  const sessionToken = req.cookies.session_id;
  if (!sessionToken) {
    return res.status(400).json({ error: "Token de sessão inválido" });
  }
  jwt.verify(sessionToken, config.SECRET_KEY, (error, decoded) => {
    if (error) {
      res.cookie("session_id", "", { expires: new Date(0) });
      return res.status(404).json({ error: "Sessão inválida" });
    } else {
      req.user = decoded.user;

      next();
    }
  });
};

module.exports = {
  verifyActiveSession,
};