const mongoose = require("mongoose");

const shippingSchema = {
  address: { type: String, required: true },
  city: { type: String, required: true },
  ward: { type: String, required: true },
};

const userSchema = {
  id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  email: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
};

const paymentSchema = {
  paymentMethod: { type: String, required: true },
  paymentDetail: { type: Object },
};

const orderItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const OrderSchema = new mongoose.Schema(
  {
    user: userSchema,
    orderItems: [orderItemSchema],
    shipping: shippingSchema,
    payment: paymentSchema,
    itemsPrice: { type: Number },
    shippingPrice: { type: Number },
    totalPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
