const { userModel } = require("./models/user.model");

class UserManagerMongo {
  async getUsers(pages) {
    const users = await userModel.paginate(
      {},
      { limit: 10, page: pages, lean: true }
    );
    return users;
  }
  async getUserById() {}
  async addUser() {}
  async updateUser() {}
  async deleteUser() {}
}

module.exports = new UserManagerMongo();
