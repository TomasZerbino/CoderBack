const { productModel } = require("../../models/product.model");

class ProductDaoMongo {
  async get(pages) {
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
  async getById(pid) {
    try {
      const prod = await productModel.findOne({ _id: pid });
      return prod;
    } catch (error) {
      return new Error(error);
    }
  }
  async create(newProd) {
    try {
      const prodAdded = await productModel.create(newProd);
      return prodAdded;
    } catch (error) {
      return new Error(error);
    }
  }
  async update(pid, prod) {
    try {
      return await productModel.update({ _id: pid }, { prod });
    } catch (error) {
      return new Error(error);
    }
  }
  async delete(pid) {}
}

module.exports = ProductDaoMongo;
