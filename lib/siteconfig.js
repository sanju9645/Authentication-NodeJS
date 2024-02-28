global.UserVerificationModel = require('../server/models/UserVerification');
global.UserModel             = require('../server/models/User');

global.hooksLib            = require('./hooks');
global.UtilsLib            = require('./utils');
global.constantsLib        = require('./constants');
global.userLib             = require('./user');
global.passportLib         = require('./passport');
global.ravenLib            = require('./eRavenConfig');
global.errorHandlerLib     = require('./errorHandler');
global.userVerificationLib = require('./userVerification');

global.userOps = require('./ops/users');

global.databaseConfig   = require('../server/config/database');
global.googleAuthConfig = require('../server/config/google-auth');
global.passportConfig   = require('../server/config/passport');

global.portalController = require('../server/controllers/portalController');

global.portalRoutes = require('../server/routes/portal');
