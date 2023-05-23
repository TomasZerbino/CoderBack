const { Router } = require("express");
const userManager = require("../Manager/mongo/userMongo");
const { isAdmin } = require("../middleware/isAdmin");

const userRouter = Router();

userRouter.get("/", isAdmin, async (req, res) => {
  try {
    const users = await userManager.getUsers(1);
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

userRouter.get("/:pid", async (req, res) => {
  try {
    const users = await userManager.getUserById(req.params.pid);
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const users = req.body;
    const newuser = await userManager.addUser(user);
    res.send(newuser);
  } catch (error) {
    console.log(error);
  }
});

userRouter.put("/:pid", async (req, res) => {
  try {
    const updateduser = await userManager.updateUser(req.params.pid, req.body);
    res.send(updateduser);
  } catch (error) {
    console.log(error);
  }
});

userRouter.delete("/:pid", async (req, res) => {
  try {
    const deletedProd = await userManager.deleteUser(req.params.pid);
    res.send(deletedProd);
  } catch (error) {
    console.log(error);
  }
});

module.exports = userRouter;
