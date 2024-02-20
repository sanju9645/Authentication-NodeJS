const mongoose = require('mongoose');

const UserVerificationSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  userId: {
    type: String,
  },
  identifier: {
    type: String,
  },
  expiresAt: {
    type: Date,
    default: () => {
      // Set the default expiration to 6 hours from createdAt
      return new Date(this.createdAt.getTime() + 6 * 60 * 60 * 1000);
    }
  }
});

const UserVerification = mongoose.model('UserVerification', UserVerificationSchema);

module.exports = UserVerification;