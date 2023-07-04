class ProductDaoMemory {
  constructor() {
    this.products = [];
  }
  async getProducts() {
    return this.products;
  }
  async getProductById(pid) {
    return this.product.find((products) => pid === products.id);
  }
  async addProduct(newProd) {
    return this.products.push(newProd);
  }
  async updateProduct(pid, prod) {}
  async deleteProduct(pid) {}
}

module.exports = ProductDaoMemory;
