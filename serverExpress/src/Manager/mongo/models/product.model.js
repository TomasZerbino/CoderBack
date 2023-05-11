const { Schema, model } = require("mongoose");

const collection = "products";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: String,
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
  },
});

const productModel = model(collection, productSchema);

module.exports = {
  productModel,
};
