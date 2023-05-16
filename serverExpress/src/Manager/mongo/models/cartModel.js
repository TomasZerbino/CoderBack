const { Schema, model, SchemaType } = require("mongoose");

const collection = "cart";

const cartSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
    },
  ],
});

const cartModel = model(collection, cartSchema);

module.exports = {
  cartModel,
};
