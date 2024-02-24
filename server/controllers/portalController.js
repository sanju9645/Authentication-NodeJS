require('dotenv').config();

const lib = require('../../lib/siteconfig');

const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

const login_get = async (req, res) => {
  lib.utils.secureExecute(req, res, (req, res) => {
    const locals = lib.utils.fmtAdditionalData({isLoginPage : true});
    
    res.render('index', { locals });
  });
};

const register_get = async (req, res) => {
  lib.utils.secureExecute(req, res, (req, res) => {
    const locals = lib.utils.fmtAdditionalData({isRegisterPage : true, title : 'Register'});

    res.render('index', { locals });
  });
};

const register_post = async (req, res) => {
  lib.utils.secureExecute(req, res, async (req, res) => {
    let [isValid, toastBody] = lib.userLib.validateRegisterUserForm(req);
    let status = false;

    if (isValid) {
      if (await lib.user.userByEmail(req.body.login_email_field)) {
        toastBody = lib.constants.loginPagePhrases.USER_EXIST_WITH_SAME_MAIL;
      } else {
        status = lib.userLib.createUserFromReqData(req.body);

        if (!status) {
          toastBody = lib.constants.loginPagePhrases.USER_CREATION_ERROR_MESSAGE;
        }
      }
    }

    const locals = lib.utils.fmtAdditionalData({isLoginPage : true}, {status, toastBody});
    res.render('index', { locals });
  });
};

const login_post = async (req, res) => {
  lib.utils.secureExecute(req, res, async (req, res) => {
    const loginResult = await lib.userLib.handleUserLogin(req, res);

    if (loginResult.status) {
      res.send(`<h1>${loginResult.message}</h1>`);
    } else {
      const status    = false;
      const toastBody = loginResult.message;
      const locals    = lib.utils.fmtAdditionalData({isLoginPage : true}, {status, toastBody});
      res.render('index', { locals });
    }
  });
};

const verify_get = (req, res) => {
  lib.utils.secureExecute(req, res, async (req, res) => {
    let result = { status: false, message: lib.constants.loginPagePhrases.EMAIL_VERIFICATION_ERROR_NOTE };
    const {userId, uniqueString} = req.params;
    const userVerification = await lib.UserVerification.find({ userId });

    if (userVerification.length > 0) {
      const { expiresAt, identifier: hashedUniqueString } = userVerification[0];

      if (expiresAt < Date.now()) {
        await lib.UserVerification.deleteOne({ userId });
        await lib.User.deleteOne({ _id: userId });
        result = { status: false, message: lib.constants.loginPagePhrases.CONFIRMATION_LINK_EXPIRED_TEXT };
      } else {
        const isMatch = await bcrypt.compare(uniqueString, hashedUniqueString);

        if (isMatch) {
          await lib.User.updateOne({ _id: userId }, { emailVerified: true });
          await lib.UserVerification.deleteOne({ userId });
          result = { status: true, message: lib.constants.loginPagePhrases.EMAIL_VERIFIED_NOTE };
        } else {
          result = { status: false, message: lib.constants.loginPagePhrases.INCORRECT_USER_VERIFICATION_DETAILS_NOTE };
        }
      }
    } else {
      result = { status: false, message: lib.constants.loginPagePhrases.ACCOUNT_RECORD_EXISTENCE_ERROR_NOTE };
    }

    const locals = lib.utils.fmtAdditionalData({isLoginPage : true}, {status : result.status, toastBody : result.message});
    res.render('index', { locals });
  });
}

const auth_google_get = (req, res) => {
  lib.utils.secureExecute(req, res, async (req, res) => {
    const email = req.user.email;
    let newUser = await lib.user.userByEmail(email);

    if (! newUser) {
      const isAdmin = await lib.user.userIsAdmin(email);

      newUser = await lib.userLib.createUser({
        email,
        name     : req.user.fullName,
        googleId : req.user.googleId,
        emailVerified : true,
        isAdmin
      });
    }

    if (newUser) {
      await lib.User.updateOne({ _id: newUser._id }, { profilePicture: req.user.profilePhoto });
      res.send(`Hello ${newUser.name} ${newUser.email}`);
    } else {
      res.status(500).render('error', { locals });
    }
  });
}

const password_reset_get = (req, res) => {
  lib.utils.secureExecute(req, res, (req, res) => {
    const locals = lib.utils.fmtAdditionalData({resetPasswordRequest : true, title: 'Reset Password'});

    res.render('index', { locals });
  });
}

const password_reset_post = (req, res) => {
  lib.utils.secureExecute(req, res, async (req, res) => {
    const [isValid, toastBody, resetUser] = await lib.userLib.validateForgotPasswordForm(req);

    if (isValid) {
      const secret = process.env.JWT_SECRET + resetUser.salt;
      const payload = {
        email : resetUser.email,
        id    : resetUser._id
      };
      const token = jwt.sign(payload, secret, {expiresIn: '15m'});

      await lib.userLib.sendComposeForgotPasswordEmail(resetUser._id, token, resetUser.email);
    }
    const locals = lib.utils.fmtAdditionalData({isLoginPage : true}, {status: isValid, toastBody});
    res.render('index', { locals });
  });
}

const password_reset_verify_get = async (req, res) => {
  lib.utils.secureExecute(req, res, async (req, res) => {
    const {id, token} = req.params;
    const resetUser = await lib.user.userById(id);

    if (resetUser) {
      const secret = process.env.JWT_SECRET + resetUser.salt;
      try {
        const payload = jwt.verify(token, secret);
        const locals = lib.utils.fmtAdditionalData({passwordResetSubmitPage : true, title : 'Reset Password', resetUserEmail : resetUser.email, id, token});
        res.render('index', { locals });
      } catch(error) {
        const locals = lib.utils.fmtAdditionalData({isLoginPage : true}, {status: false, toastBody: lib.constants.loginPagePhrases.RESET_PASSWORD_LINK_EXPIRED_NOTE});
        res.render('index', { locals });
      }
    } else {
      const locals = lib.utils.fmtAdditionalData({isLoginPage : true}, {status: false, toastBody: lib.constants.loginPagePhrases.RESET_PASSWORD_LINK_INVALID_NOTE});
      res.render('index', { locals });
    }
  });
}

const password_reset_verify_post = async (req, res) => {
  lib.utils.secureExecute(req, res, async (req, res) => {
    const {id, token} = req.params;
    let status;
    let toastBody;
    const resetUser = await lib.user.userById(id);

    if (!resetUser) {
      toastBody = lib.constants.loginPagePhrases.RESET_PASSWORD_LINK_INVALID_NOTE;
      status    = false;
    } else {
      try {
        const secret = process.env.JWT_SECRET + resetUser.salt;
        jwt.verify(token, secret); // If jwt.verify fails, it will throw an error caught by the catch block
        [status, toastBody] = lib.userLib.validateResetPasswordForm(req);

        if (status) {
          const saltHash = passport.genPassword(req?.body?.login_password_field);
          await lib.User.updateOne({ _id: resetUser._id }, { hash: saltHash.hash, salt: saltHash.salt });
          toastBody = lib.constants.loginPagePhrases.RESET_PASSWORD_SUCCESS_NOTE;
        }
      } catch(error) {
        status    = false;
        toastBody = lib.constants.loginPagePhrases.RESET_PASSWORD_LINK_EXPIRED_NOTE;
      }
    }
    const locals = lib.utils.fmtAdditionalData({isLoginPage: true}, {status, toastBody});
    res.render('index', { locals });
  });
}

module.exports = {
  login_get,
  register_get,
  register_post,
  login_post,
  verify_get,
  auth_google_get,
  password_reset_get,
  password_reset_post,
  password_reset_verify_get,
  password_reset_verify_post
}
