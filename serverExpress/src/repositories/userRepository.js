class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getUsers(pages) {
    return this.dao.get(pages);
  }
  async getUserById(uid) {
    return this.dao.getById(uid);
  }
  async addUser(newUser) {
    return this.dao.create(newUser);
  }
  async updateUser(uid, user) {
    return this.dao.update(uid, user);
  }
  async deleteUser(uid) {
    return this.dao.delete(uid);
  }
}

module.exports = UserRepository;
