class BaseError extends Error {
  constructor({ message, isOperational, status = 500 }) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isOperational = isOperational;    
    Error.captureStackTrace(this, this.constructor.name);
  }
}

class APIError extends BaseError {
  constructor({ message, errors, isOperational = true, status = 400 }) {
    super({ message, status, isOperational });
    this.errors = errors;
  }
}

class ErrorHandler {
  // eslint-disable-next-line no-unused-vars
  async handleError(error) {}

  isTrustedError(error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}

const errorHandler = new ErrorHandler();
module.exports = { APIError, BaseError, errorHandler };
