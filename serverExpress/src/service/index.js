const UserDaoMongo = require("../Daos/mongo/userMongo");
const ProductDaoMongo = require("../Daos/mongo/productMongo");

const productService = new ProductDaoMongo();
const userService = new UserDaoMongo();

module.exports = {
  userService,
  productService,
};
