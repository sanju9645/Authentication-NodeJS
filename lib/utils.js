const Quote = require('inspirational-quotes');
const constants = require('./constants');

const getQuotes = () => {
  const quote  = Quote.getQuote();
  const text   = quote.text ? quote.text : constants.LOGIN_PAGE_HEADING;
  const author = quote.author ? quote.author : constants.LOGIN_PAGE_SUB_HEADING;

  return { text, author };
}

module.exports = { getQuotes };
