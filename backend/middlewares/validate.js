const { validationResult } = require("express-validator");
const { APIError } = require("../helpers/ErrorHandler");

module.exports = function validateMiddleware(schemas) {
  return async (req, res, next) => {
    await Promise.all(schemas.map((schema) => schema.run(req)));
    const errors = validationResult(req);
    errors.isEmpty() ? next() : next(new APIError({ errors: errors.array(), message: "Validate Error" }));
  };
};
