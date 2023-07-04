const { userModel } = require("../../models/user.model");

class UserDaoMongo {
  async get(pages) {
    const users = await userModel.paginate(
      {},
      { limit: 10, page: pages, lean: true }
    );
    return users;
  }
  async getById(uid) {
    return await userModel.findOne({ _id: uid });
  }
  async create(newUser) {
    return await productModel.create(newUser);
  }
  async update(uid, user) {
    return await productModel.updateOne({ _id: uid }, { user });
  }
  async delete(uid) {
    return await productModel.findOneAndDelete({ _id: uid });
  }
}

module.exports = UserDaoMongo;
