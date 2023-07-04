const UserDaoMongo = require("../Daos/mongo/userMongo");
const ProductDaoMongo = require("../Daos/mongo/productMongo");
const ContactDaoMongo = require("../Daos/mongo/contactMongo");
const ContactRepository = require("../repositories/contactRepository");
const ProductRepository = require("../repositories/productRepository");
const UserRepository = require("../repositories/userRepository");

const contactService = new ContactRepository(new ContactDaoMongo());
const productService = new ProductRepository(new ProductDaoMongo());
const userService = new UserRepository(new UserDaoMongo());

module.exports = {
  userService,
  productService,
  contactService,
};
