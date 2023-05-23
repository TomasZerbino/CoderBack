function isAdmin(req, res, next) {
  if (req.session?.user?.role === "admin") {
    return next();
  }
  res.send("no eres admin");
}

module.exports = {
  isAdmin,
};
