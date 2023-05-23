const productRoutes = require("./productRoutes");
const cartRoutes = require("./cartRoutes");
const userRouter = require("./userRoutes");
const sessiontRouter = require("./sessionRoutes");
const viewRouter = require("./viewRoutes");

module.exports = (app) => {
  app.use("/products", productRoutes);
  app.use("/cart", cartRoutes);
  app.use("/user", userRouter);
  app.use("/session", sessiontRouter);
  app.use("/view", viewRouter);
};
