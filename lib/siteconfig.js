const utils            = require('./utils');
const constants        = require('./constants');
const userLib          = require('./user');
const passport         = require('./passport');
const raven            = require('./eRavenConfig');
const errorHandler     = require('./errorHandler');
const userVerification = require('./userVerification');

const user             = require('./ops/users');

const database       = require('../server/config/database');
const googleAuth     = require('../server/config/google-auth');
const passportConfig = require('../server/config/passport');

const portalController = require('../server/controllers/portalController');

const UserVerification = require('../server/models/UserVerification');
const User             = require('../server/models/User');

const portalRoutes = require('../server/routes/portal');


module.exports = {
  utils,
  constants,
  userLib,
  passport,
  raven,
  errorHandler,
  userVerification,
  user,
  database,
  googleAuth,
  passportConfig,
  portalController,
  UserVerification,
  User,
  portalRoutes
};