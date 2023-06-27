const { Router } = require("express");
const passport = require("passport");
const { generateToken } = require("../utils/jwt");
const { createHash } = require("../utils/bcryptHash");
const { passportCall } = require("../passport-jwt/passportCall");
const { authorization } = require("../passport-jwt/authorizationJwtRole");
const {
  login,
  register,
  logout,
  github,
} = require("../controllers/sessionController");

const sessionRouter = Router();

sessionRouter.post("/login", passportCall("login", { session: false }), login);

sessionRouter.post(
  "/register",
  passportCall("register", { session: false }),
  register
);

sessionRouter.post("/logout", logout);

sessionRouter.get(
  "/current",
  passportCall("jwt", {
    session: false,
  }),
  authorization("user"),
  (req, res) => {
    res.send(req.user);
  }
);

sessionRouter.get(
  "/github",
  passportCall("github", { scope: ["user:email"], session: false })
);

sessionRouter.get(
  "/githubcb",
  passportCall("github", { failureRedirect: "/view/login" }),
  github
);

module.exports = sessionRouter;

// sessionRouter.post(
//   "/register",
//   passport.authenticate("register", {
//     failureRedirect: "/session/failregister",
//   }),
//   async (req, res) => {
//     req.session.user = {
//       email: req.user.email,
//       first_name: req.user.first_name,
//       last_name: req.user.last_name,
//       role: "user",
//     };
//     res.redirect("/products");
//   }
// );

// sessionRouter.post(
//   "/login",
//   passport.authenticate("login", {
//     failureRedirect: "/session/faillogin",
//   }),
//   async (req, res) => {
//     if (!req.user) res.send("err");
//     req.session.user = {
//       email: req.user.email,
//       first_name: req.user.first_name,
//       last_name: req.user.last_name,
//       role: "user",
//     };
//     res.send("07");
//   }
// );

// sessionRouter.get("/faillogin", async (req, res) => {
//   res.send("fallo autenticacion");
// });

// sessionRouter.get("/failregister", async (req, res) => {
//   res.send("fallo autenticacion");
// });
