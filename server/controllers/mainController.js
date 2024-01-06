const utils = require('../../lib/utils');
const constants = require('../../lib/constants');

const login_get = async (req, res) => {
  utils.secureExecute(req, res, (req, res) => {
    const quote = utils.getQuotes();
    const locals = {
      quote,
      constants,
      isLoginPage: true,
      portalToastId : 'portal'
    };
    res.render('login', { locals });
  });
};

const register_get = async (req, res) => {
  utils.secureExecute(req, res, (req, res) => {
    const quote = utils.getQuotes();
    const locals = {
      quote,
      constants,
      isLoginPage: false,
      portalToastId : 'portal'
    };
    res.render('login', { locals });
  });
};

module.exports = {
  login_get,
  register_get
}
