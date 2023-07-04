class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getProducts(pages) {
    return this.dao.get(pages);
  }
  async getProductById(pid) {
    return this.dao.getById(pid);
  }
  async addProduct(newProd) {
    return this.dao.create(newProd);
  }
  async updateProduct(pid, prod) {
    return this.dao.update(pid, prod);
  }
  async deleteProduct(pid) {
    return this.dao.delete(pid);
  }
}

module.exports = ProductRepository;
