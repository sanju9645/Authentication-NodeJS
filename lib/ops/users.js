/*
* Functions associated with Users table
*/

const userById = async (id) => {
  return UserModel.findOne({ _id : id })
    .then((user) => {
      if (user) {
        return user;
      }
      return null;
    })
    .catch((err) => {
      console.error('userById ' + err);
      return null;
    });
}

const userByEmail = async (email) => {
  return UserModel.findOne({ email : email })
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
  const adminemails = await UtilsLib.getAdminEmails();

  if (adminemails.includes(email)) {
    isAdmin = true;
  }

  return isAdmin;
}

module.exports = {
  userByEmail,
  userIsAdmin,
  userById
}
