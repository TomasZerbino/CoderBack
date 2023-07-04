class UserDaoMemory {
  constructor() {
    this.users = [];
  }

  async getUsers(pages) {
    return this.users;
  }
  async getUserById(uid) {
    return this.users.find((user) => uid === user.id);
  }
  async addUser(newUser) {
    return this.users.create(newUser);
  }
  async updateUser(uid, user) {
    return this.users;
  }
  async deleteUser(uid) {
    return this.users;
  }
}

module.exports = UserDaoMemory;
