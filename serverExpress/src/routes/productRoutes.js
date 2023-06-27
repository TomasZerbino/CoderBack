const { Router } = require("express");
const {
  index,
  show,
  store,
  update,
  destroy,
} = require("../controllers/productController");
const productRouter = Router();

productRouter.get("/", index);

productRouter.get("/:pid", show);

productRouter.post("/", store);

productRouter.put("/:pid", update);

productRouter.delete("/:pid", destroy);

module.exports = productRouter;
