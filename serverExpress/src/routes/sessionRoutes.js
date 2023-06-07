const { Router } = require("express");
const { userModel } = require("../models/user.model");
const passport = require("passport");
const { generateToken } = require("../utils/jwt");
const { createHash } = require("../utils/bcryptHash");
const { passportCall } = require("../passport-jwt/passportCall");
const { authorization } = require("../passport-jwt/authorizationJwtRole");

const sessionRouter = Router();

sessionRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "adminCoder@coder.com" && password === "adminCoder123") {
      const user = {
        email: "adminCoder@coder.com",
        first_name: "Admin",
        last_name: "Admin",
      };
      const access_token = generateToken(user);
      console.log(access_token);
      res.redirect("/products");
    }
    const user = await userModel.findOne({ email, password });

    if (!user) return res.send("Email o contraseña incorrecta");

    const access_token = generateToken({
      email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: "user",
    });

    console.log(access_token);

    res
      .cookie("coderCookieToken", access_token)
      .send({ message: "login success", access_token });
  } catch (error) {
    console.log(error);
  }
});

sessionRouter.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const exist = await userModel.findOne({ email });

    if (exist) return res.send("Usuario ya existe");

    const newUser = {
      first_name,
      last_name,
      email,
      password: createHash(password),
    };

    const user = await userModel.create(newUser);

    const access_token = generateToken({
      email,
      first_name,
      last_name,
      role: "user",
    });

    res
      .cookie("coderCookieToken", access_token, {
        maxAge: 60 * 60 * 100,
        httpOnly: true,
      })
      .send({ message: "login success", access_token });
  } catch (error) {
    console.log(error);
  }
});

// sessionRouter.post("/logout", async (req, res) => {
//   try {
//     req.session.destroy((err) => {
//       if (err) {
//         return res.send(err);
//       }
//       res.send("logout exitoso");
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

sessionRouter.get(
  "/current",
  passportCall("jwt"),
  authorization("user"),
  (req, res) => {
    res.send(req.user);
  }
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

// sessionRouter.get(
//   "/github",
//   passport.authenticate("github", { scope: ["user:email"] })
// );
// sessionRouter.get(
//   "/githubcb",
//   passport.authenticate("github", { failureRedirect: "/view/login" }),
//   async (req, res) => {
//     req.session.user = req.user;
//     res.redirect("/products");
//   }
// );
