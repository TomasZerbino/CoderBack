function chekLogin(req, res, next) {
  if (req.session?.user) {
    return next();
  }
  res.redirect("/view/login");
}

module.exports = {
  chekLogin,
};
