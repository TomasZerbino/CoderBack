const { Router } = require("express");
const { userModel } = require("../Manager/mongo/models/user.model");

const sessionRouter = Router();

sessionRouter.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const exist = await userModel.findOne({ email });

    if (exist) return res.send("Usuario ya existe");

    const newUser = {
      first_name,
      last_name,
      email,
      password,
    };

    const user = await userModel.create(newUser);

    req.session.user = {
      email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: "user",
    };
    res.redirect("/products");
  } catch (error) {
    console.log(error);
  }
});

sessionRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "adminCoder@coder.com" && password === "adminCoder123") {
      const user = {
        email: "adminCoder@coder.com",
        first_name: "Admin",
        last_name: "Admin",
      };
      req.session.user = {
        email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: "admin",
      };
      res.redirect("/products");
    }
    const user = await userModel.findOne({ email, password });

    if (!user) return res.send("Email o contraseña incorrecta");

    req.session.user = {
      email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: "user",
    };

    res.redirect("/products");
  } catch (error) {
    console.log(error);
  }
});

sessionRouter.post("/logout", async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.send(err);
      }
      res.send("logout exitoso");
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = sessionRouter;
