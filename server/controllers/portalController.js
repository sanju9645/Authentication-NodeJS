const utils     = require('../../lib/utils');
const constants = require('../../lib/constants');
const user      = require('../../lib/ops/users');
const userLib   = require('../../lib/user');
const raven     = require('../../lib/eRavenConfig');
const UserVerification = require('../models/UserVerification');
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { error } = require('console');


const login_get = async (req, res) => {
  utils.secureExecute(req, res, (req, res) => {
    const additionalData = {
      isLoginPage: true,
      portalToastId: 'portal',
    };
    const locals = utils.getLocals(additionalData);

    res.render('login', { locals });
  });
};

const register_get = async (req, res) => {
  utils.secureExecute(req, res, (req, res) => {
    const additionalData = {
      isLoginPage: false,
      portalToastId: 'portal',
    };
    const locals = utils.getLocals(additionalData);
    
    res.render('login', { locals });
  });
};

const register_post = async (req, res) => {
  utils.secureExecute(req, res, async (req, res) => {
    let [isValid, toastBody] = userLib.validateRegisterUserForm(req);
    let status = false;

    if (isValid) {
      if (await user.userByEmail(req.body.login_email_field)) {
        toastBody = constants.loginPagePhrases.USER_EXIST_WITH_SAME_MAIL;
      } else {
        status = userLib.createUserFromReqData(req.body);

        if (!status) {
          toastBody = constants.loginPagePhrases.USER_CREATION_ERROR_MESSAGE;
        }
      }
    }

    const locals = utils.getLocals(utils.fmtAdditionalData(status, toastBody));
    res.render('login', { locals });
  });
};

const login_post = async (req, res) => {
  utils.secureExecute(req, res, async (req, res) => {
    const loginResult = await userLib.handleUserLogin(req, res);

    if (loginResult.status) {
      res.send(`<h1>${loginResult.message}</h1>`);
    } else {
      const additionalData = {
        isLoginPage: true,
        portalToastId: 'portal',
        dangerToastBody : loginResult.message,
        dangerToastAction : ' '
      };
      const locals = utils.getLocals(additionalData);
      res.render('login', { locals });
    }
  });
};

const verify_get = async (req, res) => {
  let result = { status: false, message: constants.loginPagePhrases.EMAIL_VERIFICATION_ERROR_NOTE };

  try {
    const {userId, uniqueString} = req.params;
    const userVerification = await UserVerification.find({ userId });

    if (userVerification.length > 0) {
      const { expiresAt, identifier: hashedUniqueString } = userVerification[0];

      if (expiresAt < Date.now()) {
        await UserVerification.deleteOne({ userId });
        await User.deleteOne({ _id: userId });
        result = { status: false, message: constants.loginPagePhrases.CONFIRMATION_LINK_EXPIRED_TEXT };
      } else {
        const isMatch = await bcrypt.compare(uniqueString, hashedUniqueString);

        if (isMatch) {
          await User.updateOne({ _id: userId }, { emailVerified: true });
          await UserVerification.deleteOne({ userId });
          result = { status: true, message: constants.loginPagePhrases.EMAIL_VERIFIED_NOTE };
        } else {
          result = { status: false, message: constants.loginPagePhrases.INCORRECT_USER_VERIFICATION_DETAILS_NOTE };
        }
      }
    } else {
      result = { status: false, message: constants.loginPagePhrases.ACCOUNT_RECORD_EXISTENCE_ERROR_NOTE };
    }
  } catch (error) {
    console.error(error);
    result = { status: false, message: constants.loginPagePhrases.USER_RECORD_CHECKING_ERROR_NOTE };
  }

  const locals = utils.getLocals(utils.fmtAdditionalData(result.status, result.message));
  res.render('login', { locals });
}

const auth_google_get = async (req, res) => {
  const email = req.user.email;
  
  let newUser = await user.userByEmail(email);

  if (! newUser) {
    const isAdmin = await user.userIsAdmin(email);

    newUser = userLib.createUser({
      email,
      name     : req.user.fullName,
      googleId : req.user.googleId,
      emailVerified : true,
      isAdmin
    });
  }

  if (newUser) {
    res.send(`Hello ${newUser.name} ${newUser.email}`);
  } else {
    res.status(500).send("An error occurred");
  }
}

module.exports = {
  login_get,
  register_get,
  register_post,
  login_post,
  verify_get,
  auth_google_get
}
