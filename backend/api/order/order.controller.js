const Mongoose = require("mongoose");
const Order = require("./order.model");
const Product = require("../product/product.model");
const { APIError } = require("@helpers/ErrorHandler");

exports.getAllOrder = async (req, res, next) => {
  try {
    const orders = await Order.find();
    return res.json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.getReportForDay = async function (req, res) {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();

  // Array 1 is today, array 2 is yesterday

  let arr = [];
  let arr2 = [];

  // only support from 8h to 18h
  for (let i = 8; i <= 18; i++) {
    let sum1 = 0,
      sum2 = 0;
    await Order.find(function (err, orders) {
      orders.forEach((v, j) => {
        if (v.updatedAt.getMonth() == month) {
          if (v.updatedAt.getDate() == day && v.updatedAt.getHours() == i) sum1 += v.totalPrice;

          // not check day = 1 return day = 31 || 30 prev month
          if (v.updatedAt.getDate() == day - 1 && v.updatedAt.getHours() == i) sum2 += v.totalPrice;
        }
      });
    });
    arr.push(sum1);
    arr2.push(sum2);
  }

  const fakeData1 = [0, 300000, 0, 0, 0, 0, 0, 0, 450000, 0, 0];
  const fakeData2 = [0, 200000, 0, 0, 500000, 0, 0, 0, 450000, 0, 0];
  res.json({ arr: fakeData1, arr2: fakeData2 });
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

exports.getOrderOfUser = async (req, res, next) => {
  try {
    const orders = await Order.find({ "user.id": req.params.id });
    // if (orders === null) throw new APIError({ message: "Order not exits" });
    return res.json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const { _id, ...orderBody } = req.body;

    // update inventory of list product
    const bulkArr = [];
    for (const i of orderBody.orderItems) {
      bulkArr.push({
        updateOne: {
          filter: { _id: Mongoose.Types.ObjectId(i._id) },
          update: { $inc: { inventory: -i.quantity } },
        },
      });
    }
    await Product.bulkWrite(bulkArr);

    const order = new Order(orderBody);
    const orderData = await order.save();
    return res.cookie("orderId", orderData._id + "", { maxAge: 720000 }).json({ order: orderData });
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
