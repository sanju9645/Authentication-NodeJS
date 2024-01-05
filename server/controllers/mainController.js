const utils = require('../../lib/utils');
const constants = require('../../lib/constants');

const index_get = async (req, res) => {
  utils.secureExecute(req, res, (req, res) => {
    const quote = utils.getQuotes();
    const locals = {
      quote,
      constants,
    };
    res.render('login', { locals });
  });
};

module.exports = {
  index_get
}
