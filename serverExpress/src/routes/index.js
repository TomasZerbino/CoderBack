const productRoutes = require("./productRoutes");
const cartRoutes = require("./cartRoutes");
const userRouter = require("./userRoutes");
const sessiontRouter = require("./sessionRoutes");
const viewRouter = require("./viewRoutes");
const contactRoutes = require("./contactRoutes");

module.exports = (app) => {
  app.use("/products", productRoutes);
  app.use("/contact", contactRoutes);
  app.use("/cart", cartRoutes);
  app.use("/user", userRouter);
  app.use("/session", sessiontRouter);
  app.use("/view", viewRouter);
};
