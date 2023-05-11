const ProductManager = require("../Manager/archivo/productManager");

const productManager = new ProductManager();

const socketProduct = async (io) => {
  const products = await productManager.getProducts();
  io.on("connection", (socket) => {
    console.log("ncc");

    socket.emit("productos", products);
  });
};

module.exports = {
  socketProduct,
};
