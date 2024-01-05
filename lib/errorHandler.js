require('dotenv').config();

const constants = require('./constants');

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'CustomError';
    this.statusCode = statusCode || 500;
  }
}

const errorHandler = (err, req, res, next) => {
  console.error(err); // Log the error to the console

  // Handle different types of errors gracefully
  let errorMessage = constants.generalInfo.INTERNAL_SERVER_ERR;
  let errorMessageNote = constants.generalInfo.INTERNAL_SERVER_ERR_NOTE;
  let statusCode   = 500;

  if (err instanceof CustomError) {
    errorMessage = err.message;
    statusCode   = err.statusCode
  }
  res.status(statusCode).render('error', {statusCode, errorMessage, errorMessageNote});
}

module.exports = {
  errorHandler
}
