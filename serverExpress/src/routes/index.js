const productRoutes = require("./productRoutes");
const cartRoutes = require("./cartRoutes");
const userRouter = require("./userRoutes");

module.exports = (app) => {
  app.use("/products", productRoutes);
  app.use("/cart", cartRoutes);
  app.use("/user", userRouter);
};
