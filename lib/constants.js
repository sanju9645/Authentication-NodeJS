require('dotenv').config();

const generalInfo = {
  DEV_USERNAME             : "BurnBitBistro",
  DEV_GITHUB_PROFILE       : "https://github.com/sanju9645",
  INTERNAL_SERVER_ERR      : 'Internal Server Error!',
  INTERNAL_SERVER_ERR_NOTE : "Oops something went wrong. Try to refresh this page or <br> feel free to contact us if the problem presists.",
  COPY_RIGHT_TEXT          : "Copyright © " + new Date().getFullYear(),
  FULL_NAME_FIELD_LABEL    : "Full Name",
  PORTAL_SITE_NAME         : process.env.PORTAL_SITE_NAME
};

const confirmEmailData = {
  SUBJECT : "Verify Your Email",
  TITLE : "Confirm your account",
  TEAM_NAME : "BurnBitBistro",
  BUTTON_NAME : "Confirm Account",
  TEXT_ONE : "We're excited to have you get started. First, you need to confirm your account. Just press the button below.",
  TEXT_TWO : "If that doesn't work, copy and paste the following link in your browser:",
  MAIN_COLOR : process.env.PORTAL_PAGE_MAIN_COLOR
}

const loginPagePhrases = {
  LOGIN_PAGE_TITLE         : "Login",
  LOGIN_PAGE_DESCRIPTION   : "Node.js User Authentication",
  LOGIN_PAGE_HEADING       : 'Enigma Emporium',
  LOGIN_PAGE_SUB_HEADING   : "Dance Like Nobody's Watching, Encrypt Like Everybody Is",
  LOGIN_BOX_HEADING        : "Snicker Sign-In",
  LOGIN_BOX_SUB_HEADING    : "Secure the LOLs: Login Required!",
  EMAIL_FIELD_LABEL        : "Email",
  EMAIL_FIELD_PLACEHOLDER  : "Type in Your E-Raven",
  PASSWORD_FIELD_LABEL        : "Secret Handshake Key",
  PASSWORD_FIELD_PLACEHOLDER  : "Secret Handshake Required... And Password",
  FORGET_PASSWORD_LABEL       : "Lost in Cyberspace? Find Your Password Here",
  SIGN_IN_BUTTON_LABEL        : "Open Sesame, Fast!",
  CREATE_ACCOUNT_LABEL_1      : "Fresh face?",
  CREATE_ACCOUNT_LABEL_2      : "Join the club.",
  CREATE_ACCOUNT_LABEL_3      : "Takes under a minute!",
  LOGIN_PAGE_COPY_RIGHT_TEXT  : "Copyright © " + new Date().getFullYear(),
  REMEMBER_ME_LABEL           : "Remember me",
  REGISTER_PAGE_TITLE         : "Regitser",
  REGISTER_PAGE_DESCRIPTION   : "Node.js User Authentication",
  REGISTER_BOX_HEADING        : "Snickers Squad Sign-Up",
  REGISTER_BOX_SUB_HEADING    : "Don't Forget to LOL: Registration Rules Apply!",
  SIGN_UP_BUTTON_LABEL        : "Join the Club",
  BACK_TO_LOGIN_LABEL_1       : "Already Have Account? ",
  BACK_TO_LOGIN_LABEL_2       : "Login",
  FULL_NAME_FIELD_PLACEHOLDER : "Reveal Your Complete Aliases",
  DATE_OF_BIRTH_LABEL         : "Give us your born day!",
  DATE_OF_BIRTH_PLACEHOLDER   : "When's the cake day?",
  PASSWORD_CONFIRMATION_FIELD_LABEL       : "Password Round Two: The Confirmation",
  PASSWORD_CONFIRMATION_FIELD_PLACEHOLDER : "Password Re-do",
  REGISTRATION_SUCCESS_MESSAGE   : "High-fives! Log in and join the club",
  USER_CREATION_ERROR_MESSAGE    : "Oops! User creation failed. Give it another shot, please!",
  PASSWORD_MATCHING_ERROR        : "Passwords on a break, let's reunite them! 💔",
  EMAIL_INVALID_ERROR_NOTE       : "This email is on strike, demanding a better address!",
  PASSWORD_NULL_NOTE             : "Oh dear, your password is playing hide and seek!",
  NAME_NULL_NOTE                 : "No name? Even superheroes have one! 🦸‍♂️",
  DOB_INVALID_NOTE               : "Blank date of birth? Time-traveler or alien?",
  NO_USER_FOUND_NOTE             : "Interstellar error: User not on the cosmic map. Retry?",
  USER_EXIST_WITH_SAME_MAIL      : "Uh-oh! Email already claimed. You've got an email roomie!",
  USER_EMAIL_NOT_VERIFIED        : "Email hasn't been verified yet. Check your inbox",
  INCORRECT_PASSWORD             : "Oops! Your secret handshake didn't match. Try again?",
  JWT_TOKEN_CREATING_ISSUE_NOTE  : "Your secret code worked, but our secret door is stuck. Stand by!",
  CONFIRMATION_LINK_EXPIRED_TEXT : "Link has expired. Please sign up again",
  INCORRECT_USER_VERIFICATION_DETAILS_NOTE : "Invalid verification details passed. Check your inbox",
  EMAIL_VERIFIED_NOTE                      : "Hooray! Your email's is as real as unicorns!. Onwards to signing in!",
  EMAIL_VERIFICATION_ERROR_NOTE            : "An error occured while finalizing successful verification",
  ACCOUNT_RECORD_EXISTENCE_ERROR_NOTE      : "Account record doesn't exist or has been verified already. Please sign up or log in",
  USER_RECORD_CHECKING_ERROR_NOTE          : "An error occured while checking for existing user verification record"
};

const colors = {
  PORTAL_PAGE_MAIN_COLOR : process.env.PORTAL_PAGE_MAIN_COLOR,
  PORTAL_BOX_MAIN_HEADING_COLOR : process.env.PORTAL_BOX_MAIN_HEADING_COLOR,
  PORTAL_BOX_SUB_HEADING_COLOR : process.env.PORTAL_BOX_SUB_HEADING_COLOR,
  PORTAL_FORM_LABEL_COLOR : process.env.PORTAL_FORM_LABEL_COLOR,
  PORTAL_FORM_BUTTON_COLOR : process.env.PORTAL_FORM_BUTTON_COLOR,
  PORTAL_QUOTE_TEXT_COLOR : process.env.PORTAL_QUOTE_TEXT_COLOR,
  PORTAL_SITE_NAME_TEXT_COLOR : process.env.PORTAL_SITE_NAME_TEXT_COLOR
}

module.exports = {
  generalInfo,
  loginPagePhrases,
  colors,
  confirmEmailData
};
