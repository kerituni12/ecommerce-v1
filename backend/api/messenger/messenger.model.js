const mongoose = require("mongoose");

// Category Schema
var MessengerSchema = mongoose.Schema({
  userId: {
    type: String,
  },
  loop: {
    type: Number,
  },
  isVerify: {
    type: Boolean,
  },
  admin: {
    type: Number,
  },
});

var Mess = (module.exports = mongoose.model("Messenger", MessengerSchema));
