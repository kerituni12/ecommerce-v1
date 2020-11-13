require("module-alias/register");

const app = require("@configs/express");
const mongoose = require("@configs/mongoose");
mongoose.connect();
module.exports = app;
