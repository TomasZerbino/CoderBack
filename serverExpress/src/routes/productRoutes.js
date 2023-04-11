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

productRouter.post("/", async (req, res) => {
  const prod = req.body;
  const newProd = await product.addProducts(
    prod.title,
    prod.description,
    prod.price,
    prod.thumbnail,
    prod.stock
  );
  res.send(newProd);
});

productRouter.put("/:pid", async (req, res) => {
  try {
    const updatedProd = await product.updateProduct(
      parseInt(req.params.pid),
      req.body
    );
    res.send(updatedProd);
  } catch (error) {
    console.log(error);
  }
});

productRouter.delete("/:pid", async (req, res) => {
  const deletedProd = await product.deleteProduct(parseInt(req.params.pid));
  res.send(deletedProd);
});

module.exports = productRouter;
