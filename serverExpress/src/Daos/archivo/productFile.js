const { promises } = require("fs");
const fsp = promises;

class ProductDaoFile {
  constructor() {
    this.path = "./prods.json";
  }

  async addProducts(title, description, price, thumbnail, stock) {
    if (title && description && price && thumbnail && stock) {
      const prods = await this.getProducts();
      const productToadd = {
        title,
        description,
        price,
        thumbnail,
        code: prods.length * 2,
        status: true,
        stock,
      };

      const prodsArr = await this.getProducts(); //tira el error si el archivo no existe pero despues lo crea
      const newProd = [...prodsArr, productToadd];
      const jsonProd = JSON.stringify(newProd, "null", 2);
      await fsp.writeFile(this.path, jsonProd, "utf-8");
      return console.log("Producto agregado");
    }
    return console.log("falta agregar un campo");
  }

  async getProducts() {
    try {
      const prodsArr = await fsp.readFile(this.path, "utf-8");
      return JSON.parse(prodsArr);
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const prodByPk = products.find((prod) => prod.code === id);
    if (prodByPk) {
      return prodByPk;
    }
    return "Not found";
  }

  async updateProduct(id, update) {
    const products = await this.getProducts();
    const prodIndex = products.findIndex((prod) => prod.code === id);
    const updatedProdsArr = products;
    if (prodIndex !== -1) {
      updatedProdsArr[prodIndex] = {
        ...products[prodIndex],
        ...update,
      };

      await fsp.writeFile(
        this.path,
        JSON.stringify(updatedProdsArr, "null", 2),
        "utf-8"
      );
    } else {
      return "Not found";
    }
  }

  async deleteProduct(id) {
    const products = await this.getProducts();

    if (products.find((prod) => prod.code === id)) {
      const deletedProd = products.filter((prod) => prod.code !== id);
      const deletedProdJson = JSON.stringify(deletedProd, "null", 2);
      await fsp.writeFile(this.path, deletedProdJson, "utf-8");
      console.log(`Producto ${id} eliminado`);
    } else {
      console.log("Producto no encontrado");
    }
  }
}

const prods = new ProductDaoFile();

module.exports = ProductDaoFile;
