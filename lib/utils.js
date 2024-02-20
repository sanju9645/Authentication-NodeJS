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

const getAdminEmails = async () => {
  const adminemailsString = process.env.ADMIN_EMAILS || '';
  let adminemails = adminemailsString.split(',').map(email => email.trim());

  adminemails = Array.isArray(adminemails) ? adminemails : [];

  return adminemails;
};

const getLocals = (additionalData = {}) => {
  const quote = getQuotes();

  const data  = {
    quote,
    constants
  };
  
  const locals = {
    ...data,
    ...additionalData,
  };

  return locals;
}

const fmtAdditionalData = (status, toastBody) => {
  let additionalData = {
    isLoginPage: true,
    portalToastId: 'portal'
  };

  if (status) {
    additionalData = getLocals({
      ...additionalData,
      sucessToastBody : toastBody,
      sucessToastAction : ' '
    });
  } else {
    additionalData = getLocals({
      ...additionalData,
      dangerToastBody : toastBody,
      dangerToastAction : ' '
    });
  }
  return additionalData;
}

module.exports = { 
  getQuotes,
  secureExecute,
  validateEmail,
  checkNull,
  checkStringsEqual,
  checkDateValid,
  getAdminEmails,
  fmtAdditionalData,
  getLocals
};
