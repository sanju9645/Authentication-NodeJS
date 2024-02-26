const Quote = require('inspirational-quotes');
const path  = require('path');
const ejs   = require('ejs');

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

    const additionalData = {
      'statusCode'       : 500,
      'errorMessage'     : constants.generalInfo.INTERNAL_SERVER_ERR,
      'errorMessageNote' : constants.generalInfo.INTERNAL_SERVER_ERR
    };

    const locals = getLocals(additionalData);

    res.status(500).render('error', { locals });
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
      return false;
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

const fmtAdditionalData = (additionalData, toastData = false) => {
  const toastKey       = toastData.status ? 'successToastBody' : 'dangerToastBody';
  const toastActionKey = `${toastData.status ? 'success' : 'danger'}ToastAction`;

  additionalData = getLocals({
    ...additionalData,
    portalToastId : 'portal',
  });

  if (toastData) {
    additionalData = {
      ...additionalData,
      [toastKey] : toastData.toastBody,
      [toastActionKey] : ' '
    };
  }

  return additionalData;
}

const composeAndSendEmail = async (email, data) => {
  const ejsFilePath = path.join(__dirname, '..', 'views', 'email.ejs');

  const str = await new Promise((resolve, reject) => {
    ejs.renderFile(ejsFilePath, data, {}, (err, str) => {
      if (err) {
        reject(err);
      } else {
        resolve(str);
      }
    });
  });

  const mailOptions = {
    to      : email,
    subject : data.subject,
    html    : str
  };

  await raven.sendRaven(mailOptions);
}

const immediateExpr = async (callback, errorCallback = null) => {
  try {
    return await callback();
  } catch (err) {
    console.error('Error in createUser:', err);

    if (errorCallback) {
      errorCallback(err);
    }
    return false;
  }
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
  getLocals,
  composeAndSendEmail,
  immediateExpr
};
