const express = require("express");

const userRouter = require("../api/user/user.router");
const productRouter = require("../api/product/product.router");
const categoryRouter = require("../api/category/category.router");
const orderRouter = require("../api/order/order.router");
const authRouter = require("../api/auth/auth.router");
const mailchimpRouter = require("../api/mailchimp/mailchimp.router");
const vnPayRouter = require("../api/vnpay/vnpay.router");

const app = express();

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);
app.use("/auth", authRouter);
app.use("/mailchimp", mailchimpRouter);
app.use("/vnpay", vnPayRouter);
module.exports = app;
