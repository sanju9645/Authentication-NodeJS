/*
* Functions associated with Users table
*/
const User  = require('../../server/models/User');
const utils = require('../../lib/utils');


const userByEmail = async (email) => {
  return User.findOne({ email : email })
    .then((user) => {
      if (user) {
        return user;
      }
      return null;
    })
    .catch((err) => {
      console.error('userByEmail ' + err);
      return null;
    });
}

const userIsAdmin = async (email) => {
  let isAdmin = false;
  const adminemails = await utils.getAdminEmails();

  if (adminemails.includes(email)) {
    isAdmin = true;
  }

  return isAdmin;
}

module.exports = {
  userByEmail,
  userIsAdmin
}
