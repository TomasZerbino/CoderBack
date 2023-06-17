const { Router } = require("express");
const { userModel } = require("../models/user.model");
const passport = require("passport");
const { generateToken } = require("../utils/jwt");
const { createHash } = require("../utils/bcryptHash");
const { passportCall } = require("../passport-jwt/passportCall");
const { authorization } = require("../passport-jwt/authorizationJwtRole");

const sessionRouter = Router();

// @fix: se debe usar el passport
sessionRouter.post(
  "/login",
  passportCall("login", {
    session: false,
  }),
  async (req, res) => {
    try {
      // @fix: esta lógica ya está hecha en el passport
      // const { email, password } = req.body;
      // if (email === "adminCoder@coder.com" && password === "adminCoder123") {
      //   const user = {
      //     email: "adminCoder@coder.com",
      //     first_name: "Admin",
      //     last_name: "Admin",
      //   };
      //   const access_token = generateToken(user);
      //   console.log(access_token);
      //   res.redirect("/products");
      // }
      // const user = await userModel.findOne({ email, password });

      // if (!user) return res.send("Email o contraseña incorrecta");

      const { user } = req;
      const access_token = generateToken({
        email: user.email,
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
  }
);

// @fix: se debe usar el passport
sessionRouter.post(
  "/register",
  passportCall("register", {
    session: false,
  }),
  async (req, res) => {
    try {
      // @fix: esta lógica ya está hecha en el passport
      // const { first_name, last_name, email, password } = req.body;

      // const exist = await userModel.findOne({ email });

      // if (exist) return res.send("Usuario ya existe");

      // const newUser = {
      //   first_name,
      //   last_name,
      //   email,
      //   password: createHash(password),
      // };

      // const user = await userModel.create(newUser);
      const { user } = req;
      const access_token = generateToken({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
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
  }
);

// @fix: el LOGOUT debe eliminar la cookie
sessionRouter.post("/logout", async (req, res) => {
  try {
    res.clearCookie("coderCookieToken");
    res.send("logout exitoso");
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
  passportCall("jwt", {
    session: false,
  }),
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

// @fix: deben mantenerse los endpoints para que el login por github siga funcionando
sessionRouter.get(
  "/github",
  passportCall("github", { scope: ["user:email"], session: false })
);
sessionRouter.get(
  "/githubcb",
  passportCall("github", { failureRedirect: "/view/login" }),
  async (req, res) => {
    const { user } = req;
    const access_token = generateToken({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: "user",
    });

    res
      .cookie("coderCookieToken", access_token, {
        maxAge: 60 * 60 * 100,
        httpOnly: true,
      })
      .redirect("/products");
  }
);
