const userModel = require("../models/user.model");
const { userService } = require("../service");
const { createHash } = require("../utils/bcryptHash");

class UserController {
  async index(req, res) {
    try {
      const { page = 1 } = req.query;
      const users = userService.getUsers(page);
      const { docs, hasPrevPage, hasNextPage, prevPage, nextPage } = users;

      res.render("users", {
        products: docs,
        hasNextPage,
        hasPrevPage,
        prevPage,
        nextPage,
        nombre: null,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async show(req, res) {
    try {
      const user = await userService.getUserById(req.params.uid);
      res.send(user);
    } catch (error) {
      console.log(error);
    }
  }

  async store(req, res) {
    try {
      let user = req.body;

      if (!user.first_name || !user.last_name) {
        return res.send("Todos los campos son requeridos");
      }

      let newUser = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: createHash(user.password),
      };

      let result = await userService.addUser(newUser);
      res.send(result);
    } catch (error) {
      return done(error);
    }
  }

  async update(req, res) {
    try {
      const { uid } = req.params;
      let user = req.body;

      let userDB = await userService.getById();

      if (!userDB) return res.send("Usuario no existente");

      if (!user.first_name || !user.last_name) {
        return res.send("Todos los campos son requeridos");
      }

      let updatedUser = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      };

      let result = await userService.updateUser({ _id: uid }, updatedUser);
      res.send(result);
    } catch (error) {
      return done(error);
    }
  }

  async destroy(req, res) {
    try {
      let { uid } = req.params;

      let result = await userService.deleteUser({ _id: uid });
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserController();
