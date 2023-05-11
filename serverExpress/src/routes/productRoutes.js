const { Router } = require("express");
const productManager = require("../Manager/mongo/productMongo");
const productRouter = Router();

const product = new productManager();

productRouter.get("/");

productRouter.get("/", async (req, res) => {
  try {
    const prod = await product.getProducts();
  } catch (error) {
    console.log(error);
  }
});

productRouter.get("/:pid", async (req, res) => {
  try {
    const prod = await product.getProductById(req.params.pid);
    res.send(prod);
  } catch (error) {
    console.log(error);
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const prod = req.body;
    const newProd = await product.addProducts(prod);
    res.send(newProd);
  } catch (error) {
    console.log(error);
  }
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
  try {
    const deletedProd = await product.deleteProduct(parseInt(req.params.pid));
    res.send(deletedProd);
  } catch (error) {
    console.log(error);
  }
});

module.exports = productRouter;
