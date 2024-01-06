const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  hash: {
    type: String,
    required: function() {
      return !this.googleId; // Require password if not using Google SSO
    },
  },
  salt: {
    type: String,
    required: function() {
      return !this.googleId; // Require password if not using Google SSO
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows null values for unique fields (needed for username/password users)
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;