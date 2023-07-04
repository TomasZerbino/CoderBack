const { contactService } = require("../service");

class contactController {
  async index(req, res) {
    // let result =
    res.send({
      status: "success",
      payload: "cont get",
    });
  }
  async store(req, res) {
    let { first_name, last_name, phone } = req.body;
    let result = await contactService.createContact({
      first_name,
      last_name,
      phone,
    });
    res.send({
      status: "success",
      payload: result,
    });
  }
}

module.exports = new contactController();
