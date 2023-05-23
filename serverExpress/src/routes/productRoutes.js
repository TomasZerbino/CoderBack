const { Router } = require("express");
const productManager = require("../Manager/mongo/productMongo.js");
const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const prods = await productManager.getProducts(page);

    const { docs, hasPrevPage, hasNextPage, prevPage, nextPage } = prods;
    res.render("products", {
      products: docs,
      hasNextPage,
      hasPrevPage,
      prevPage,
      nextPage,
      nombre: req.session.user.first_name,
    });
    console.log(req.session);
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
