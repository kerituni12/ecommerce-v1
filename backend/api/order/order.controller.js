const Order = require("./order.model");
const { APIError } = require("@helpers/ErrorHandler");

exports.getAllOrder = async (req, res, next) => {
  try {
    const orders = await Order.find();
    return res.json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order === null) throw new APIError({ message: "Order not exits" });
    return res.json({ order });
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const { _id, ...orderBody } = req.body;
    const order = new Order(orderBody);
    const orderData = await order.save();
    return res.json({ order: orderData });
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const result = await Order.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    if (result === null) throw new APIError({ message: "Order not exits" });
    return res.json({ result });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const result = await Order.findOneAndRemove({ _id: req.params.id });
    if (result === null) throw new APIError({ message: "Order not exits" });
    return res.end();
  } catch (err) {
    next(err);
  }
};
