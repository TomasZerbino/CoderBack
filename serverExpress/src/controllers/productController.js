const { productService } = require("../service/index.js");

class ProductController {
  async index(req, res) {
    try {
      const { page = 1 } = req.query;
      const prods = await productService.getProducts(page);
      const user = req.user;
      const { docs, hasPrevPage, hasNextPage, prevPage, nextPage } = prods;
      res.render("products", {
        products: docs,
        hasNextPage,
        hasPrevPage,
        prevPage,
        nextPage,
        nombre: user ? user.user.first_name : null,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async show(req, res) {
    try {
      const prod = await productService.getProductById(req.params.pid);
      res.send(prod);
    } catch (error) {
      console.log(error);
    }
  }

  async store(req, res) {
    try {
      const prod = req.body;
      const newProd = await productService.addProducts(prod);
      res.send(newProd);
    } catch (error) {
      console.log(error);
    }
  }

  async update(req, res) {
    try {
      const updatedProd = await productService.updateProduct(
        parseInt(req.params.pid),
        req.body
      );
      res.send(updatedProd);
    } catch (error) {
      console.log(error);
    }
  }

  async destroy(req, res) {
    try {
      const deletedProd = await productService.deleteProduct(
        parseInt(req.params.pid)
      );
      res.send(deletedProd);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ProductController();
