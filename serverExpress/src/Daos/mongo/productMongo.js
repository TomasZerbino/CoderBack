const { productModel } = require("../../models/product.model");

class ProductManagerMongo {
  async getProducts(pages) {
    try {
      const prods = await productModel.paginate(
        {},
        { limit: 10, page: pages, lean: true }
      );
      return prods;
    } catch (error) {
      return new Error(error);
    }
  }
  async getProductById(pid) {
    try {
      return await productModel.findOne({ _id: pid });
    } catch (error) {
      return new Error(error);
    }
  }
  async addProduct(newProd) {
    try {
      return await productModel.create(newProd);
    } catch (error) {
      return new Error(error);
    }
  }
  async updateProduct(pid, prod) {
    try {
      return await productModel.updateOne({ _id: pid }, { prod });
    } catch (error) {
      return new Error(error);
    }
  }
  async deleteProduct(pid) {
    try {
      return await productModel.findOneAndDelete({ _id: pid });
    } catch (error) {
      return new Error(error);
    }
  }
}

module.exports = ProductManagerMongo;
