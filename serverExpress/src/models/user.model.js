const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const collection = "users";

const userSchema = new Schema({
  first_name: {
    type: String,
    require: true,
    index: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  cart: [
    {
      cart: {
        type: Schema.Types.ObjectId,
        ref: "cart",
      },
    },
  ],
  role: { type: String, default: "user" },
});

// userSchema.plugin(mongoosePaginate);

const userModel = model(collection, userSchema);

module.exports = {
  userModel,
};
