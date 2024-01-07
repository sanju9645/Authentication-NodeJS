const utils     = require('../../lib/utils');
const constants = require('../../lib/constants');
const passport  = require('../../lib/passport');
const User      = require('../models/User');
const user      = require('../../lib/ops/users');

const quote = utils.getQuotes();
const data  = {
  quote,
  constants
};

const getLocals = (additionalData = {}) => {
  const locals = {
    ...data,
    ...additionalData,
  };

  return locals;
}

const fmtAdditionalData = (status, toastBody) => {
  let additionalData = {
    isLoginPage: true,
    portalToastId: 'portal'
  };

  if (status) {
    additionalData = getLocals({
      ...additionalData,
      sucessToastBody : toastBody,
      sucessToastAction : ' '
    });
  } else {
    additionalData = getLocals({
      ...additionalData,
      dangerToastBody : toastBody,
      dangerToastAction : ' '
    });
  }
  return additionalData;
}

const validateRegisterUserForm = (req) => {
  const email       = req.body.login_email_field;
  const name        = req.body.register_full_name;
  const password    = req.body.login_password_field;
  const passwordTwo = req.body.confirm_password_field;
  const dob         = req.body.register_dob;
  let toastBody     = constants.loginPagePhrases.REGISTRATION_SUCCESS_MESSAGE;
  let status        = false;

  if (!utils.validateEmail(email)) {
    toastBody = constants.loginPagePhrases.EMAIL_INVALID_ERROR_NOTE;
  } else if (utils.checkNull(password)) {
    toastBody = constants.loginPagePhrases.PASSWORD_NULL_NOTE;
  } else if (!utils.checkStringsEqual(password, passwordTwo, true)) {
    toastBody = constants.loginPagePhrases.PASSWORD_MATCHING_ERROR;
  } else if (utils.checkNull(name)) {
    toastBody = constants.loginPagePhrases.NAME_NULL_NOTE;
  } else if (!utils.checkDateValid(dob, false)) {
    toastBody = constants.loginPagePhrases.DOB_INVALID_NOTE;
  } else {
    status = true;
  }
  return [status, toastBody];
}

const createUserFromReqData = async (body) => {
  if (! await user.userByEmail(body.login_email_field)) {
    const saltHash = passport.genPassword(body.login_password_field);
    const newUser  = new User({
      email: body.login_email_field,
      name: body.register_full_name,
      dateOfBirth: body.register_dob,
      hash: saltHash.hash,
      salt: saltHash.salt
    });

    try {
      newUser.save()
        .then((user) => {
          return user;
        });
    } catch (err) {
      console.log('createUserFromReqData ' + user)
      return false;
    }
  }
  return false;
}

const handleUserLogin = async (req, res) => {
  const someone = await user.userByEmail(req.body.login_email_field);

  if (someone) {
    const isValid = passport.validPassword(req.body.login_password_field, someone.hash, someone.salt);

    if (isValid) {
      const tokenObject = passport.issueJWT(someone);

      if (tokenObject.token) {
        // res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
        res.cookie('jwt', tokenObject.token, { httpOnly: true, secure: true });
        return true; // Return here to avoid further processing
      }
    }
  }
  return false; // Indicates login failure
};

const login_get = async (req, res) => {
  utils.secureExecute(req, res, (req, res) => {
    const additionalData = {
      isLoginPage: true,
      portalToastId: 'portal',
    };
    const locals = getLocals(additionalData);

    res.render('login', { locals });
  });
};

const register_get = async (req, res) => {
  utils.secureExecute(req, res, (req, res) => {
    const additionalData = {
      isLoginPage: false,
      portalToastId: 'portal',
    };
    const locals = getLocals(additionalData);
    
    res.render('login', { locals });
  });
};

const register_post = async (req, res) => {
  utils.secureExecute(req, res, async (req, res) => {
    let [isValid, toastBody] = validateRegisterUserForm(req);
    let status = false;

    if (isValid) {
      if (await user.userByEmail(req.body.login_email_field)) {
        toastBody = constants.loginPagePhrases.USER_EXIST_WITH_SAME_MAIL;
      } else {
        status = createUserFromReqData(req.body);

        if (!status) {
          toastBody = constants.loginPagePhrases.USER_CREATION_ERROR_MESSAGE;
        }
      }
    }

    const locals = getLocals(fmtAdditionalData(status, toastBody));
    res.render('login', { locals });
  });
};

const login_post = async (req, res) => {
  utils.secureExecute(req, res, async (req, res) => {
    const loginSuccess = await handleUserLogin(req, res);

    if (loginSuccess) {
      res.send("<h1>Succesfully Logged In</h1>");
    } else {
    // return res.status(401).json({ success: false, msg: constants.loginPagePhrases.NO_USER_FOUND_NOTE });
    const additionalData = {
      isLoginPage: true,
      portalToastId: 'portal',
      dangerToastBody : constants.loginPagePhrases.NO_USER_FOUND_NOTE,
      dangerToastAction : ' '
    };
    const locals = getLocals(additionalData);
    res.render('login', { locals });
    }
  });
};

module.exports = {
  login_get,
  register_get,
  register_post,
  login_post
}

