require('dotenv').config();

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
  let toastBody     = constantsLib.loginPagePhrases.REGISTRATION_SUCCESS_MESSAGE;
  let status        = false;

  if (!UtilsLib.validateEmail(email)) {
    toastBody = constantsLib.loginPagePhrases.EMAIL_INVALID_ERROR_NOTE;
  } else if (UtilsLib.checkNull(password)) {
    toastBody = constantsLib.loginPagePhrases.PASSWORD_NULL_NOTE;
  } else if (!UtilsLib.checkStringsEqual(password, passwordTwo, true)) {
    toastBody = constantsLib.loginPagePhrases.PASSWORD_MATCHING_ERROR;
  } else if (UtilsLib.checkNull(name)) {
    toastBody = constantsLib.loginPagePhrases.NAME_NULL_NOTE;
  } else if (!UtilsLib.checkDateValid(dob, false)) {
    toastBody = constantsLib.loginPagePhrases.DOB_INVALID_NOTE;
  } else {
    status = true;
  }
  return [status, toastBody];
}

const validateForgotPasswordForm = async (req) => {
  const email   = req.body.login_email_field;
  let toastBody = constantsLib.loginPagePhrases.RESET_PASSWORD_LINK_GENERATION_SUCCESS_MESSAGE;
  let status    = false;
  let resetUser = null;

  if (!UtilsLib.validateEmail(email)) {
    return [false, constantsLib.loginPagePhrases.EMAIL_INVALID_ERROR_NOTE];
  } 

  resetUser = await userOps.userByEmail(email);

  if (!resetUser) {
    toastBody = constantsLib.loginPagePhrases.RESET_PASSWORD_NO_USER_EXIST_MESSAGE;
  } else if (resetUser.googleId) {
    toastBody = constantsLib.loginPagePhrases.RESET_PASSWORD_WITH_GOOGLE_USER_ERROR_NOTE;
    toastBody += `'${constantsLib.loginPagePhrases.SIGN_IN_WITH_GOOGLE_BUTTON_LABEL}'` 
  } else {
    status = true;
  }
  
  return [status, toastBody, resetUser];
};

const validateResetPasswordForm = (req) => {
  const password    = req.body.login_password_field;
  const passwordTwo = req.body.confirm_password_field;
  let status = toastBody = false;

  if (UtilsLib.checkNull(password)) {
    toastBody = constantsLib.loginPagePhrases.PASSWORD_NULL_NOTE;
  } else if (!UtilsLib.checkStringsEqual(password, passwordTwo, true)) {
    toastBody = constantsLib.loginPagePhrases.PASSWORD_MATCHING_ERROR;
  } else {
    status = true;
  }

  return [status, toastBody];
}

const createUser = async (userData) => {
  return await UtilsLib.immediateExpr(async () => {
    const { email, name, dateOfBirth, hash, salt, googleId, emailVerified } = userData;

    const existingUser = await userOps.userByEmail(email);

    if (existingUser) {
      return existingUser;
    }
    const isAdmin = await userOps.userIsAdmin(email);

    const newUser = new UserModel({
      email,
      name,
      dateOfBirth,
      hash,
      salt,
      googleId,
      emailVerified: emailVerified || false,
      isAdmin
    });

    const savedUser = await newUser.save();
    return savedUser;
  });
};

const createUserFromReqData = async (body) => {
  const email = body.login_email_field;

  if (! await userOps.userByEmail(email)) {
    const saltHash = passportLib.genPassword(body.login_password_field);
    
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
  const someone = await userOps.userByEmail(req.body.login_email_field);

  if (!someone) {
    return { status: false, message: constantsLib.loginPagePhrases.NO_USER_FOUND_NOTE };
  }
  const isValid = passportLib.validPassword(req.body.login_password_field, someone.hash, someone.salt);
  
  if (!isValid) {
    return { status: false, message: constantsLib.loginPagePhrases.INCORRECT_PASSWORD };
  }
  const tokenObject = passportLib.issueJWT(someone);
  
  if (!tokenObject.token) {
    return { status: false, message: constantsLib.loginPagePhrases.JWT_TOKEN_CREATING_ISSUE_NOTE };
  }

  if (!someone.emailVerified) {
    const emailStatus = await sendUserVerificationEmail(someone);

    if (emailStatus.status) {
      return { status: false, message: constantsLib.loginPagePhrases.USER_EMAIL_NOT_VERIFIED };
    }
    return emailStatus;
  }
  
  return { status: true, token: tokenObject.token, expiresIn: tokenObject.expires, message: "Successfully Logged In" };
};

const composeUserVerificationEmail = async (_id, uniqueString, email) => {
  const url  = `${process.env.HOME_URL}user/verify/${_id}/${uniqueString}`;
  const data = {
    title      : constantsLib.confirmEmailData.TITLE,
    teamName   : constantsLib.confirmEmailData.TEAM_NAME,
    buttonName : constantsLib.confirmEmailData.BUTTON_NAME,
    textOne    : constantsLib.confirmEmailData.TEXT_ONE,
    textTwo    : constantsLib.confirmEmailData.TEXT_TWO,
    mainColor  : constantsLib.confirmEmailData.MAIN_COLOR,
    snippet    : constantsLib.confirmEmailData.SNIPPET,
    subject    : constantsLib.confirmEmailData.SUBJECT,
    confirmAccountLink: url
  };

  await UtilsLib.composeAndSendEmail(email, data);
}

const composeForgotPasswordEmail = async (_id, uniqueString, email) => {
  const url  = `${process.env.HOME_URL}user/password-reset/${_id}/${uniqueString}`;
  const data = {
    title      : constantsLib.forgotPasswordEmailData.TITLE,
    teamName   : constantsLib.forgotPasswordEmailData.TEAM_NAME,
    buttonName : constantsLib.forgotPasswordEmailData.BUTTON_NAME,
    textOne    : constantsLib.forgotPasswordEmailData.TEXT_ONE,
    textTwo    : constantsLib.forgotPasswordEmailData.TEXT_TWO,
    mainColor  : constantsLib.forgotPasswordEmailData.MAIN_COLOR,
    snippet    : constantsLib.forgotPasswordEmailData.SNIPPET,
    subject    : constantsLib.forgotPasswordEmailData.SUBJECT,
    confirmAccountLink: url
  };

  await UtilsLib.composeAndSendEmail(email, data);
}

const sendComposeForgotPasswordEmail = async (_id, uniqueString, email) => {
  return await composeForgotPasswordEmail(_id, uniqueString, email);
}


const sendUserVerificationEmail = async ({ _id, email }) => {
  try {
    const uniqueString = uuidv4() + _id;
    const saltRounds = 10;
    const hashedUniqueString = await bcrypt.hash(uniqueString, saltRounds);

    userVerificationLib.saveUserVerificationIfNotExists({ _id, email, identifier: hashedUniqueString });

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
