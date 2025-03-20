const logout = (req, res) => {
  res.cookie("session_id", "", { expires: new Date(0) });
  res.status(200).json({ success: true });
};

module.exports = { logout };