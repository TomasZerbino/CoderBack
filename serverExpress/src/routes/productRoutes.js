const { Router } = require("express");
const productManager = require("../productManager");
const productRouter = Router();

const product = new productManager();

productRouter.get("/");

productRouter.get("/", async (req, res) => {
  try {
    const prod = await product.getProducts();
    if (req.query.limit) {
      const limitProd = prod;
      limitProd.splice(req.query.limit, prod.length);
      res.send({ ...limitProd });
    } else {
      res.send({ ...prod });
    }
  } catch (error) {
    console.log(error);
  }
});

productRouter.get("/:pid", async (req, res) => {
  try {
    const prod = await product.getProductById(parseInt(req.params.pid));
    res.send(prod);
  } catch (error) {
    console.log(error);
  }
});

// productRouter.post();

productRouter.put("", async (req, res) => {
  try {
  } catch (error) {}
});

// productRouter.delete();

module.exports = productRouter;
