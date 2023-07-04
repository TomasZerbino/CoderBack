const { Router } = require("express");
const {
  index,
  show,
  store,
  update,
  destroy,
} = require("../controllers/productController");
const { passportCall } = require("../passport-jwt/passportCall");

const productRouter = Router();

productRouter.get(
  "/",
  passportCall("jwt", {
    session: false,
  }),
  index
);

productRouter.get("/:pid", show);

productRouter.post("/", store);

productRouter.put("/:pid", update);

productRouter.delete("/:pid", destroy);

module.exports = productRouter;
