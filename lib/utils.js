
const Quote = require('inspirational-quotes');
const path  = require('path');
const ejs   = require('ejs');

class Utils {
  static getQuotes() {
    const quote = Quote.getQuote();
    const text = quote.text ? quote.text : constantsLib.LOGIN_PAGE_HEADING;
    const author = quote.author ? quote.author : constantsLib.LOGIN_PAGE_SUB_HEADING;
    return { text, author };
  }

  static secureExecute(req, res, callback) {
    try {
      callback(req, res);
    } catch (err) {
      console.error(constantsLib.generalInfo.INTERNAL_SERVER_ERR + err);
      const additionalData = {
        'statusCode': 500,
        'errorMessage': constantsLib.generalInfo.INTERNAL_SERVER_ERR,
        'errorMessageNote': constantsLib.generalInfo.INTERNAL_SERVER_ERR
      };
      const locals = Utils.getLocals(additionalData);
      res.status(500).render('error', { locals });
    }
  }

  static checkNull(inputValue) {
    return inputValue === '';
  }

  static validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email !== '';
  }

  static checkStringsEqual(stringOne, stringTwo, notNull = false) {
    stringOne = stringOne.trim();
    stringTwo = stringTwo.trim();
    if (notNull) {
      if (Utils.checkNull(stringOne) || Utils.checkNull(stringTwo)) {
        return false;
      }
    }
    return stringOne === stringTwo;
  }

  static checkDateValid(date, allowFutureDate = true) {
    if (Utils.checkNull(date)) {
      return false;
    }
    const dob = date.trim();
    const selectedDate = new Date(dob);
    if (isNaN(selectedDate.getTime())) {
      return false;
    }
    if (allowFutureDate) {
      const currentDate = new Date();
      if (selectedDate > currentDate) {
        return false;
      }
    }
    return true;
  }

  static async getAdminEmails() {
    const adminEmailsString = process.env.ADMIN_EMAILS || '';
    let adminEmails = adminEmailsString.split(',').map(email => email.trim());
    adminEmails = Array.isArray(adminEmails) ? adminEmails : [];
    return adminEmails;
  }

  static getLocals(additionalData = {}) {
    const quote = Utils.getQuotes();
    const data = {
      quote,
      constantsLib
    };
    const locals = {
      ...data,
      ...additionalData,
    };
    return locals;
  }

  static fmtAdditionalData(additionalData, toastData = false) {
    const toastKey = toastData.status ? 'successToastBody' : 'dangerToastBody';
    const toastActionKey = `${toastData.status ? 'success' : 'danger'}ToastAction`;
    additionalData = Utils.getLocals({
      ...additionalData,
      portalToastId: 'portal',
    });
    if (toastData) {
      additionalData = {
        ...additionalData,
        [toastKey]: toastData.toastBody,
        [toastActionKey]: ' '
      };
    }
    return additionalData;
  }

  static async composeAndSendEmail(email, data) {
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
      to: email,
      subject: data.subject,
      html: str
    };
    await ravenLib.sendRaven(mailOptions);
  }

  static async immediateExpr(callback, errorCallback = null) {
    try {
      return await callback();
    } catch (err) {
      console.error('Error:', err);
      
      if (errorCallback) {
        errorCallback(err);
      }
      return null;
    }
  }
}

module.exports = Utils;
