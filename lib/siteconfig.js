global.utils            = require('./utils');
global.constants        = require('./constants');
global.userLib          = require('./user');
global.passportLib         = require('./passport');
global.raven            = require('./eRavenConfig');
global.errorHandler     = require('./errorHandler');
global.userVerification = require('./userVerification');

global.user             = require('./ops/users');

global.database      = require('../server/config/database');
global.googleAuth     = require('../server/config/google-auth');
global.passportConfig = require('../server/config/passport');

global.portalController = require('../server/controllers/portalController');

global.UserVerification = require('../server/models/UserVerification');
global.User             = require('../server/models/User');

global.portalRoutes = require('../server/routes/portal');
