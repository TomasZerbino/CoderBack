const { cartModel } = require("./models/cart.model");

class cartDaoMongo {
  async getcarts() {
    const carts = await cartModel.find({});
  }
  async getcartById() {}
  async addcart() {}
  async updatecart() {}
  async deletecart() {}
}

module.exports = new cartDaoMongo();
