require('dotenv').config();

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'CustomError';
    this.statusCode = statusCode || 500;
  }
}

class ErrorHandler {
  constructor(constantsLib) {
    this.constantsLib = constantsLib;
  }

  handle(err, req, res, next) {
    console.error(err); // Log the error to the console

    let errorMessage = this.constantsLib.generalInfo.INTERNAL_SERVER_ERR;
    let errorMessageNote = this.constantsLib.generalInfo.INTERNAL_SERVER_ERR_NOTE;
    let statusCode = 500;

    if (err instanceof CustomError) {
      errorMessage = err.message;
      statusCode = err.statusCode;
    }
    res.status(statusCode).render('error', { statusCode, errorMessage, errorMessageNote });
  }
}

module.exports = ErrorHandler;
