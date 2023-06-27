const { Router } = require("express");
const cartManager = require("../Daos/archivo/CartManager");

const cart = new cartManager();

const cartRouter = Router();

cartRouter.get("/:cid", async (req, res) => {
  try {
    const cartByPk = await cart.getCart(parseInt(req.params.cid));
    res.send(cartByPk);
  } catch (error) {
    console.log(error);
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    const newCart = await cart.newCart();
    res.send("Carrito creado");
  } catch (error) {
    console.log(error);
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const addProduct = await cart.addToCart(
      parseInt(req.params.cid),
      parseInt(req.params.pid)
    );
    res.send(addProduct);
  } catch (error) {
    console.log(error);
  }
});

module.exports = cartRouter;
