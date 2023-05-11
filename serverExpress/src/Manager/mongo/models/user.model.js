const { Schema, model } = require("mongoose");

const collection = "users";

const userSchema = new Schema({
  first_name: String,
  last_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
});

const userModel = model(collection, userSchema);

module.exports = {
  userModel,
};
