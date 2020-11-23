const express = require("express");

const messengerRouter = require("../api/messenger/messenger.router");

const app = express();

app.use("/", messengerRouter);

module.exports = app;
