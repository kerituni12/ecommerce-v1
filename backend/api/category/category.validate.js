const { body } = require("express-validator");

exports.categoryCreateRule = [
  body("*").escape(),
  body("title", "Title must not be empty.").trim().isLength({ min: 1 }),   
  body("slug").trim(), 
];
