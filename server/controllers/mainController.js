const utils = require('../../lib/utils');
const constants = require('../../lib/constants');

const index_get = async (req, res) => {
  try {
    const locals = {
      title       : constants.LOGIN_PAGE_TITLE,
      description : constants.LOGIN_PAGE_DESCRIPTION,
      quote       : utils.getQuotes().text ,
      author      : utils.getQuotes().author 
    }

    res.render('login', { locals });
  } catch (err) {
    console.error(process.env.INTERNAL_SERVER_ERR + err);
  }
}

module.exports = {
  index_get
}
