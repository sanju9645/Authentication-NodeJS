/*
* Functions associated with Users table
*/

class UserService {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  async userById(id) {
    return await UtilsLib.immediateExpr(async () => {
      const user = await this.UserModel.findOne({ _id: id });

      if (user) {
        return user;
      }

      return null;
    });
  }

  async userByEmail(email) {
    return await UtilsLib.immediateExpr(async () => {
      const user = await this.UserModel.findOne({ email });
      if (user) {
        return user;
      }

      return null;
    });
  }

  async isUserAdmin(email) {
    return await UtilsLib.immediateExpr(async () => {
      const adminEmails = await UtilsLib.getAdminEmails();
      const isAdmin     = adminEmails.some((aE) => aE === email);

      return isAdmin;
    });
  }
};

module.exports = new UserService(UserModel);

