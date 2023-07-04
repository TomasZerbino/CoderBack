const { userModel } = require("../../models/user.model");

class UserDaoMongo {
  async getUsers(pages) {
    const users = await userModel.paginate(
      {},
      { limit: 10, page: pages, lean: true }
    );
    return users;
  }
  async getUserById(uid) {
    return await userModel.findOne({ _id: uid });
  }
  async addUser(newUser) {
    return await productModel.create(newUser);
  }
  async updateUser(uid, user) {
    return await productModel.updateOne({ _id: uid }, { user });
  }
  async deleteUser(uid) {
    return await productModel.findOneAndDelete({ _id: uid });
  }
}

module.exports = UserDaoMongo;
