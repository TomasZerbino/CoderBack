const { Router } = require("express");

const viewRouter = Router();

viewRouter.get("/register", async (req, res) => {
  res.render("register", {});
});

viewRouter.get("/login", async (req, res) => {
  res.render("login", {});
});

module.exports = viewRouter;
