// DB connection
const mongoose = require("mongoose");
const { mongoUrl } = require("@configs/constants");

const mongoOptions = {
  useCreateIndex: true,
  keepAlive: 1,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

function connect() {
  mongoose
    .connect(mongoUrl, mongoOptions)
    .then(() => {
      console.log("mongodb connected");
    })
    .catch((err) => {
      console.err("App starting err:", err.message);
      process.exit(1);
    });
  return mongoose.connection;
}

module.exports = { connect };
