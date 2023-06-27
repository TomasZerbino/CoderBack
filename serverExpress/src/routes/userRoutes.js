const { Router } = require("express");
const {
  index,
  store,
  update,
  destroy,
} = require("../controllers/userController");
const { isAdmin } = require("../middleware/isAdmin");

const userRouter = Router();

userRouter.get("/", isAdmin, index);

// userRouter.get("/:uid");

userRouter.post("/", store);

userRouter.put("/:uid", update);

userRouter.delete("/:uid", destroy);

module.exports = userRouter;
