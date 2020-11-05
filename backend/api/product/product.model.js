var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    inventory: { type: Number, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
