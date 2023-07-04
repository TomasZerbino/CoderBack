const { contactModel } = require("../../models/contact.model");

class ContactDaoMongo {
  async get() {
    let result = await contactModel.find({});
    return result;
  }

  async create(newContact) {
    let result = await contactModel.create(newContact);
    return result;
  }
}

module.exports = ContactDaoMongo;
