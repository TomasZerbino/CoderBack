const { productModel } = require("../models/product.model");
const { createHash } = require("../utils/bcryptHash");
const { generateToken } = require("../utils/jwt");

class SessionController {
  async login(req, res) {
    try {
      const { user } = req;

      const access_token = generateToken({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role ? user.role : "user",
      });

      res
        .cookie("coderCookieToken", access_token)
        .send({ message: "login success", access_token });
    } catch (error) {
      console.log(error);
    }
  }

  async register(req, res) {
    try {
      const { user } = req;

      const access_token = generateToken({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role ? user.role : "user",
      });

      res
        .cookie("coderCookieToken", access_token, {
          maxAge: 60 * 60 * 100,
          httpOnly: true,
        })
        .send({ message: "register success", access_token });
    } catch (error) {
      console.log(error);
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie("coderCookieToken");
      res.send("logout exitoso");
    } catch (error) {
      console.log(error);
    }
  }

  async github(req, res) {
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
}

module.exports = new SessionController();
