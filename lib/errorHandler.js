require('dotenv').config();

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
  if (err instanceof CustomError) {
    const errorMessage = `<h2 style="color: red;">${err.message}</h2>`;
    res.status(err.statusCode).send(errorMessage);
  } else {
    const errorMessage = `<h2 style="color: red;">${process.env.INTERNAL_SERVER_ERR_NOTE}</h2>`;
    res.status(500).send(errorMessage);
  }
}

module.exports = {
  errorHandler
}
