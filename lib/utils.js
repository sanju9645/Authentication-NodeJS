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


module.exports = { 
  getQuotes,
  secureExecute
};
