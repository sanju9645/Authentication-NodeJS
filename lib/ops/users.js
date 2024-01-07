/*
* Functions associated with Users table
*/
const User = require('../../server/models/User');

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

module.exports = {
  userByEmail
}
