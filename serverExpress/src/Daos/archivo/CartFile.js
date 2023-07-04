const { promises } = require("fs");
const fs = require("fs");
const fsp = promises;

class CartDaoFile {
  constructor() {
    this.path = "./cart.json";
  }

  async newCart() {
    try {
      if (fs.existsSync(this.path)) {
        const cartsArr = await fsp.readFile(this.path, "utf-8");
        const parseCart = JSON.parse(cartsArr);
        const newCart = [
          ...parseCart,
          { id: parseCart.length * 2, products: [] },
        ];
        const jsonCart = JSON.stringify(newCart, "null", 2);
        await fsp.writeFile(this.path, jsonCart, "utf-8");
        console.log(jsonCart);
        return jsonCart;
      } else {
        await fsp.writeFile(this.path, "[]", "utf-8");
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addToCart(cid, pid) {
    try {
      const cartsArr = await fsp.readFile(this.path, "utf-8");
      const parseCart = JSON.parse(cartsArr);
      const cartIndex = await parseCart.findIndex((cart) => cart.id === cid);
      if (cartIndex !== -1) {
        const prod = parseCart[cartIndex].products.findIndex(
          (prod) => prod.prodId === pid
        );
        if (prod !== -1) {
          console.log(parseCart[cartIndex].products[prod].qty++);
          await fsp.writeFile(
            this.path,
            JSON.stringify(parseCart, "null", 2),
            "utf-8"
          );
        } else {
          parseCart[cartIndex].products.push({ prodId: pid, qty: 1 });
          await fsp.writeFile(
            this.path,
            JSON.stringify(parseCart, "null", 2),
            "utf-8"
          );
        }
      } else {
        console.log("Producto no encontrado");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getCart(cid) {
    const cartsArr = await fsp.readFile(this.path, "utf-8");
    const parseCart = JSON.parse(cartsArr);
    const cartByPk = parseCart.find((cart) => cart.id === cid);
    if (cartByPk) {
      return cartByPk;
    }
    return "Not found";
  }
}

module.exports = CartDaoFile;
