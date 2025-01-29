const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 1000, // Starting balance for users
  },
  resetPasswordToken: {
     type: String 
  }, // Add this field
  resetPasswordExpires: { 
    type: Date 
  }, // Add this field
  isVerified: {
       type: Boolean, default: false 
      }, // Add this field
  verificationToken: {
     type: String 
    }, // Add this field
});

module.exports = mongoose.model('User', UserSchema);