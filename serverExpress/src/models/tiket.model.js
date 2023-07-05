const { Schema, model } = require("mongoose");

const collection = "tiket";

const tiketSchema = new Schema({
  purchaser: String,
  code: {
    type: String,
    require: true,
    unique: true,
  },
  purchase_date: Date,
  amount: Number,
});

const tiketModel = model(collection, tiketSchema);

module.exports = {
  tiketModel,
};
