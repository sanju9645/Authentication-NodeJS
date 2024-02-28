
class UserVerificationService {
  constructor(UserVerificationModel) {
    this.UserVerificationModel = UserVerificationModel;
  }

  async saveUserVerificationIfNotExists({ _id, email, identifier }) {
    try {
      const existingRecord = await this.getExistingUserVerification(email);

      if (!existingRecord) {
        const newUserVerification = new this.UserVerificationModel({
          userId: _id,
          email,
          identifier,
          createdAt: Date.now(),
          expiresAt: Date.now() + 21600000,
        });

        await newUserVerification.save();

        console.log("New UserVerification record saved successfully.");
        return { success: true, message: "UserVerification record saved." };
      } else {
        await this.updateExistingUserVerification(existingRecord._id, identifier);
        console.log("A UserVerification record with the same email already exists.");
        return { success: false, message: "UserVerification record already exists." };
      }
    } catch (error) {
      console.error("Error saving UserVerification record:", error);
      return { success: false, message: "Error saving UserVerification record." };
    }
  }

  async getExistingUserVerification(email) {
    return await this.UserVerificationModel.findOne({ email });
  }

  async updateExistingUserVerification(_id, identifier) {
    return await this.UserVerificationModel.findOneAndUpdate(
      { _id },
      { $set: { identifier } },
      { new: true }
    );
  }
}

module.exports = new UserVerificationService(UserVerificationModel);
