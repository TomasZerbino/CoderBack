const { ContactDto } = require("../dto/contactDto");

class ContactRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getContact() {
    let result = await this.dao.get();
    return result;
  }

  async createContact(newContact) {
    let contactToInsert = new ContactDto(newContact);
    let result = await this.dao.create(contactToInsert);
    return result;
  }
}

module.exports = ContactRepository;
