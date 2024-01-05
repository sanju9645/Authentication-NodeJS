const utils = require('../../lib/utils');
const constants = require('../../lib/constants');

const index_get = async (req, res) => {
  try {
    const quote = utils.getQuotes();
    const locals = {
      quote, constants 
    }
    res.render('login', { locals });
  } catch (err) {
    console.error(constants.generalInfo.INTERNAL_SERVER_ERR + err);
  }
}

module.exports = {
  index_get
}
