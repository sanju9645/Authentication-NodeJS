require('dotenv').config();

const utils            = require('./utils');
const constants        = require('./constants');
const user             = require('./ops/users');
const passport         = require('./passport');
const User             = require('../server/models/User');
const raven            = require('./eRavenConfig');
const userVerification = require('./userVerification');
const { v4: uuidv4 }   = require("uuid");
const bcrypt           = require('bcrypt');
const ejs              = require('ejs');
const path             = require('path');

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

const validateForgotPasswordForm = async (req) => {
  const email   = req.body.login_email_field;
  let toastBody = constants.loginPagePhrases.RESET_PASSWORD_LINK_GENERATION_SUCCESS_MESSAGE;
  let status    = false;
  let resetUser = null;

  if (!utils.validateEmail(email)) {
    return [false, constants.loginPagePhrases.EMAIL_INVALID_ERROR_NOTE];
  } 

  resetUser = await user.userByEmail(email);

  if (!resetUser) {
    toastBody = constants.loginPagePhrases.RESET_PASSWORD_NO_USER_EXIST_MESSAGE;
  } else if (resetUser.googleId) {
    toastBody = constants.loginPagePhrases.RESET_PASSWORD_WITH_GOOGLE_USER_ERROR_NOTE;
    toastBody += `'${constants.loginPagePhrases.SIGN_IN_WITH_GOOGLE_BUTTON_LABEL}'` 
  } else {
    status = true;
  }
  
  return [status, toastBody, resetUser];
};

const validateResetPasswordForm = (req) => {
  const password    = req.body.login_password_field;
  const passwordTwo = req.body.confirm_password_field;
  let status = toastBody = false;

  if (utils.checkNull(password)) {
    toastBody = constants.loginPagePhrases.PASSWORD_NULL_NOTE;
  } else if (!utils.checkStringsEqual(password, passwordTwo, true)) {
    toastBody = constants.loginPagePhrases.PASSWORD_MATCHING_ERROR;
  } else {
    status = true;
  }

  return [status, toastBody];
}

const createUser = async (userData) => {
  const { email, name, dateOfBirth, hash, salt, googleId, emailVerified } = userData;
  const isAdmin = await user.userIsAdmin(email);

  const newUser = new User({
    email,
    name,
    dateOfBirth,
    hash,
    salt,
    googleId,
    emailVerified: emailVerified || false,
    isAdmin
  });

  try {
    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    console.error('Error in createUser:', err);
    return false;
  }
};

const createUserFromReqData = async (body) => {
  const email = body.login_email_field;

  if (! await user.userByEmail(email)) {
    const saltHash = passport.genPassword(body.login_password_field);
    
    const newUser = await createUser({
      email,
      name        : body.register_full_name,
      dateOfBirth : body.register_dob,
      hash        : saltHash.hash,
      salt        : saltHash.salt,
      googleId    : null 
    });

    if (newUser) {
      const emailStatus = await sendUserVerificationEmail(newUser);
    }

    return newUser;
  }
  
  return false;
}

const handleUserLogin = async (req, res) => {
  const someone = await user.userByEmail(req.body.login_email_field);

  if (!someone) {
    return { status: false, message: constants.loginPagePhrases.NO_USER_FOUND_NOTE };
  }
  const isValid = passport.validPassword(req.body.login_password_field, someone.hash, someone.salt);
  
  if (!isValid) {
    return { status: false, message: constants.loginPagePhrases.INCORRECT_PASSWORD };
  }
  const tokenObject = passport.issueJWT(someone);
  
  if (!tokenObject.token) {
    return { status: false, message: constants.loginPagePhrases.JWT_TOKEN_CREATING_ISSUE_NOTE };
  }

  if (!someone.emailVerified) {
    const emailStatus = await sendUserVerificationEmail(someone);

    if (emailStatus.status) {
      return { status: false, message: constants.loginPagePhrases.USER_EMAIL_NOT_VERIFIED };
    }
    return emailStatus;
  }
  
  return { status: true, token: tokenObject.token, expiresIn: tokenObject.expires, message: "Successfully Logged In" };
};

const composeUserVerificationEmail = async (_id, uniqueString, email) => {
  const url  = `${process.env.HOME_URL}user/verify/${_id}/${uniqueString}`;
  const data = {
    title      : constants.confirmEmailData.TITLE,
    teamName   : constants.confirmEmailData.TEAM_NAME,
    buttonName : constants.confirmEmailData.BUTTON_NAME,
    textOne    : constants.confirmEmailData.TEXT_ONE,
    textTwo    : constants.confirmEmailData.TEXT_TWO,
    mainColor  : constants.confirmEmailData.MAIN_COLOR,
    snippet    : constants.confirmEmailData.SNIPPET,
    subject    : constants.confirmEmailData.SUBJECT,
    confirmAccountLink: url
  };

  await utils.composeAndSendEmail(email, data);
}

const composeForgotPasswordEmail = async (_id, uniqueString, email) => {
  const url  = `${process.env.HOME_URL}user/password-reset/${_id}/${uniqueString}`;
  const data = {
    title      : constants.forgotPasswordEmailData.TITLE,
    teamName   : constants.forgotPasswordEmailData.TEAM_NAME,
    buttonName : constants.forgotPasswordEmailData.BUTTON_NAME,
    textOne    : constants.forgotPasswordEmailData.TEXT_ONE,
    textTwo    : constants.forgotPasswordEmailData.TEXT_TWO,
    mainColor  : constants.forgotPasswordEmailData.MAIN_COLOR,
    snippet    : constants.forgotPasswordEmailData.SNIPPET,
    subject    : constants.forgotPasswordEmailData.SUBJECT,
    confirmAccountLink: url
  };

  await utils.composeAndSendEmail(email, data);
}

const sendComposeForgotPasswordEmail = async (_id, uniqueString, email) => {
  return await composeForgotPasswordEmail(_id, uniqueString, email);
}


const sendUserVerificationEmail = async ({ _id, email }) => {
  try {
    const uniqueString = uuidv4() + _id;
    const saltRounds = 10;
    const hashedUniqueString = await bcrypt.hash(uniqueString, saltRounds);

    userVerification.saveUserVerificationIfNotExists({ _id, email, identifier: hashedUniqueString });

    await composeUserVerificationEmail(_id, uniqueString, email);

    return {
      status: true,
      message: "Verification email sent",
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: "An error occurred while sending verification email",
    };
  }
};


module.exports = {
  validateRegisterUserForm,
  createUserFromReqData,
  handleUserLogin,
  sendUserVerificationEmail,
  createUser,
  validateForgotPasswordForm,
  sendComposeForgotPasswordEmail,
  validateResetPasswordForm
};
