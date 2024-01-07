const Quote = require('inspirational-quotes');
const constants = require('./constants');

const getQuotes = () => {
  const quote  = Quote.getQuote();
  const text   = quote.text ? quote.text : constants.LOGIN_PAGE_HEADING;
  const author = quote.author ? quote.author : constants.LOGIN_PAGE_SUB_HEADING;

  return { text, author };
}

const secureExecute = (req, res, callback) => {
  try {
    callback(req, res);
  } catch (err) {
    console.error(constants.generalInfo.INTERNAL_SERVER_ERR + err);
    // Handle the error response here or rethrow the error
    res.status(500).send(constants.generalInfo.INTERNAL_SERVER_ERR);
  }
};

const checkNull = (inputValue) => {
  let isValidInput = inputValue === '';

  return isValidInput;
}

const validateEmail = (email) => {
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email !== '';

  return isValidEmail;
}

const checkStringsEqual = (stringOne, stringTwo, notNull = false) => {
  stringOne = stringOne.trim();
  stringTwo = stringTwo.trim();

  if (notNull) {
    if (checkNull(stringOne) || checkNull(stringTwo)) {
      return false;
    }
  }

  if (stringOne === stringTwo) {
    return true;
  }
  return false;
}

const checkDateValid = (date, allowFutureDate = true) => {
  if (checkNull(date)) {
    return false;
  }
  const dob = date.trim();
  const selectedDate = new Date(dob);

  if (isNaN(selectedDate.getTime())) {
    return false;
  }

  if (allowFutureDate) {
    const currentDate  = new Date();

    if (selectedDate > currentDate) {
      return false; // Date of birth should not be in the future
    }
  }

  return true;
}

module.exports = { 
  getQuotes,
  secureExecute,
  validateEmail,
  checkNull,
  checkStringsEqual,
  checkDateValid
};
