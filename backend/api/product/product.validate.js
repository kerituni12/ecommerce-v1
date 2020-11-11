const { body } = require("express-validator");

exports.productRule = [body("title", "Title must not be empty.").isLength({ min: 1 }).trim()];
