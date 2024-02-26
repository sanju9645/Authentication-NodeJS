require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

const login_get = async (req, res) => {
  UtilsLib.secureExecute(req, res, (req, res) => {
    const locals = UtilsLib.fmtAdditionalData({isLoginPage : true});
    
    res.render('index', { locals });
  });
};

const register_get = async (req, res) => {
  UtilsLib.secureExecute(req, res, (req, res) => {
    const locals = UtilsLib.fmtAdditionalData({isRegisterPage : true, title : 'Register'});

    res.render('index', { locals });
  });
};

const register_post = async (req, res) => {
  UtilsLib.secureExecute(req, res, async (req, res) => {
    let [isValid, toastBody] = userLib.validateRegisterUserForm(req);
    let status = false;

    if (isValid) {
      if (await userOps.userByEmail(req.body.login_email_field)) {
        toastBody = constantsLib.loginPagePhrases.USER_EXIST_WITH_SAME_MAIL;
      } else {
        status = userLib.createUserFromReqData(req.body);

        if (!status) {
          toastBody = constantsLib.loginPagePhrases.USER_CREATION_ERROR_MESSAGE;
        }
      }
    }

    const locals = UtilsLib.fmtAdditionalData({isLoginPage : true}, {status, toastBody});
    res.render('index', { locals });
  });
};

const login_post = async (req, res) => {
  UtilsLib.secureExecute(req, res, async (req, res) => {
    const loginResult = await userLib.handleUserLogin(req, res);

    if (loginResult.status) {
      res.send(`<h1>${loginResult.message}</h1>`);
    } else {
      const status    = false;
      const toastBody = loginResult.message;
      const locals    = UtilsLib.fmtAdditionalData({isLoginPage : true}, {status, toastBody});
      res.render('index', { locals });
    }
  });
};

const verify_get = (req, res) => {
  UtilsLib.secureExecute(req, res, async (req, res) => {
    let result = { status: false, message: constantsLib.loginPagePhrases.EMAIL_VERIFICATION_ERROR_NOTE };
    const {userId, uniqueString} = req.params;
    const verifiedUser = await UserVerificationModel.find({ userId });

    if (verifiedUser.length > 0) {
      const { expiresAt, identifier: hashedUniqueString } = verifiedUser[0];

      if (expiresAt < Date.now()) {
        await UserVerificationModel.deleteOne({ userId });
        await UserModel.deleteOne({ _id: userId });
        result = { status: false, message: constantsLib.loginPagePhrases.CONFIRMATION_LINK_EXPIRED_TEXT };
      } else {
        const isMatch = await bcrypt.compare(uniqueString, hashedUniqueString);

        if (isMatch) {
          await UserModel.updateOne({ _id: userId }, { emailVerified: true });
          await UserVerificationModel.deleteOne({ userId });
          result = { status: true, message: constantsLib.loginPagePhrases.EMAIL_VERIFIED_NOTE };
        } else {
          result = { status: false, message: constantsLib.loginPagePhrases.INCORRECT_USER_VERIFICATION_DETAILS_NOTE };
        }
      }
    } else {
      result = { status: false, message: constantsLib.loginPagePhrases.ACCOUNT_RECORD_EXISTENCE_ERROR_NOTE };
    }

    const locals = UtilsLib.fmtAdditionalData({isLoginPage : true}, {status : result.status, toastBody : result.message});
    res.render('index', { locals });
  });
}

const auth_google_protected_get = (req, res) => {
  UtilsLib.secureExecute(req, res, async (req, res) => {
    const newUser = await userLib.createUser({
      email    : req.user.email,
      name     : req.user.fullName,
      googleId : req.user.googleId,
      emailVerified : true,
    });

    if (newUser) {
      await UserModel.updateOne({ _id: newUser._id }, { profilePicture: req.user.profilePhoto });
      res.send(`Hello ${newUser.name} ${newUser.email}`);
    } else {
      res.status(500).render('error', { locals });
    }
  });
}

const password_reset_get = (req, res) => {
  UtilsLib.secureExecute(req, res, (req, res) => {
    const locals = UtilsLib.fmtAdditionalData({resetPasswordRequest : true, title: 'Reset Password'});

    res.render('index', { locals });
  });
}

const password_reset_post = (req, res) => {
  UtilsLib.secureExecute(req, res, async (req, res) => {
    const [isValid, toastBody, resetUser] = await userLib.validateForgotPasswordForm(req);

    if (isValid) {
      const secret = process.env.JWT_SECRET + resetUser.salt;
      const payload = {
        email : resetUser.email,
        id    : resetUser._id
      };
      const token = jwt.sign(payload, secret, {expiresIn: '15m'});

      await userLib.sendComposeForgotPasswordEmail(resetUser._id, token, resetUser.email);
    }
    const locals = UtilsLib.fmtAdditionalData({isLoginPage : true}, {status: isValid, toastBody});
    res.render('index', { locals });
  });
}

const password_reset_verify_get = async (req, res) => {
  UtilsLib.secureExecute(req, res, async (req, res) => {
    const {id, token} = req.params;
    const resetUser = await userOps.userById(id);

    if (resetUser) {
      const secret = process.env.JWT_SECRET + resetUser.salt;
      try {
        const payload = jwt.verify(token, secret);
        const locals = UtilsLib.fmtAdditionalData({passwordResetSubmitPage : true, title : 'Reset Password', resetUserEmail : resetUser.email, id, token});
        res.render('index', { locals });
      } catch(error) {
        const locals = UtilsLib.fmtAdditionalData({isLoginPage : true}, {status: false, toastBody: constantsLib.loginPagePhrases.RESET_PASSWORD_LINK_EXPIRED_NOTE});
        res.render('index', { locals });
      }
    } else {
      const locals = UtilsLib.fmtAdditionalData({isLoginPage : true}, {status: false, toastBody: constantsLib.loginPagePhrases.RESET_PASSWORD_LINK_INVALID_NOTE});
      res.render('index', { locals });
    }
  });
}

const password_reset_verify_post = async (req, res) => {
  UtilsLib.secureExecute(req, res, async (req, res) => {
    const {id, token} = req.params;
    let status;
    let toastBody;
    const resetUser = await userOps.userById(id);

    if (!resetUser) {
      toastBody = constantsLib.loginPagePhrases.RESET_PASSWORD_LINK_INVALID_NOTE;
      status    = false;
    } else {
      try {
        const secret = process.env.JWT_SECRET + resetUser.salt;
        jwt.verify(token, secret); // If jwt.verify fails, it will throw an error caught by the catch block
        [status, toastBody] = userLib.validateResetPasswordForm(req);

        if (status) {
          const saltHash = passportLib.genPassword(req?.body?.login_password_field);
          await UserModel.updateOne({ _id: resetUser._id }, { hash: saltHash.hash, salt: saltHash.salt });
          toastBody = constantsLib.loginPagePhrases.RESET_PASSWORD_SUCCESS_NOTE;
        }
      } catch(error) {
        status    = false;
        toastBody = constantsLib.loginPagePhrases.RESET_PASSWORD_LINK_EXPIRED_NOTE;
      }
    }
    const locals = UtilsLib.fmtAdditionalData({isLoginPage: true}, {status, toastBody});
    res.render('index', { locals });
  });
}

module.exports = {
  login_get,
  register_get,
  register_post,
  login_post,
  verify_get,
  auth_google_protected_get,
  password_reset_get,
  password_reset_post,
  password_reset_verify_get,
  password_reset_verify_post
}
