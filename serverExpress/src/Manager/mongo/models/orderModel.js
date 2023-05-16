const { Schema, model, SchemaType } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const collection = "order";

const orderSchema = new Schema({
  name: String,
  price: Number,
  quantity: Number,
  date: Date,
});

orderSchema.plugin(mongoosePaginate);

const orderModel = model(collection, orderSchema);

module.exports = {
  orderModel,
};
