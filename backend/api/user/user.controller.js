const User = require("./user.model");
const { APIError } = require("@helpers/ErrorHandler");

exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json({ users });
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user === null) throw new APIError({ message: "User not exits" });
    return res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const { _id, ...userBody } = req.body;
    const user = new User(userBody);
    const userData = await user.save();
    return res.json({ userData });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const result = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    if (result === null) throw new APIError({ message: "User not exits" });
    return res.json({ result });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const result = await User.findOneAndRemove({ _id: req.params.id });
    if (result === null) throw new APIError({ message: "User not exits" });
    return res.end();
  } catch (err) {
    next(err);
  }
};
