const { Router } = require("express");
const {
  index,
  show,
  store,
  update,
  destroy,
} = require("../controllers/productController");
const { passportCall } = require("../passport-jwt/passportCall");
const { isAdmin } = require("../middleware/isAdmin");

const productRouter = Router();

productRouter.get(
  "/",
  passportCall("jwt", {
    session: false,
  }),
  index
);

productRouter.get("/:pid", show);

productRouter.post("/", isAdmin, store);

productRouter.put("/:pid", isAdmin, update);

productRouter.delete("/:pid", isAdmin, destroy);

module.exports = productRouter;
