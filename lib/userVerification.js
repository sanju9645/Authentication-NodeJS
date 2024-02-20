const UserVerification = require('../server/models/UserVerification');

async function saveUserVerificationIfNotExists({ _id, email, identifier }) {
  try {
    const existingRecord = await UserVerification.findOne({ email: email });

    if (!existingRecord) {
      const newUserVerification = new UserVerification({
        userId     : _id,
        email      : email,
        identifier : identifier,
        createdAt  : Date.now(),
        expiresAt  : Date.now() + 21600000,
      });

      await newUserVerification.save();

      console.log("New UserVerification record saved successfully.");
      return { success: true, message: "UserVerification record saved." };
    } else {
      console.log("A UserVerification record with the same email already exists.");
      return { success: false, message: "UserVerification record already exists." };
    }
  } catch (error) {
    console.error("Error saving UserVerification record:", error);
    return { success: false, message: "Error saving UserVerification record." };
  }
}

module.exports = {
  saveUserVerificationIfNotExists
}
