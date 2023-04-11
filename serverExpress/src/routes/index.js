const productRoutes = require("./productRoutes");
const cartRoutes = require("./cartRoutes");

module.exports = (app) => {
  app.use("/products", productRoutes);
  app.use("/cart", cartRoutes);
};
