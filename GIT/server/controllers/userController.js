
const User = require('../models/User');

const getUserProfile = async (req, res) => {
    console.log('getUserProfile called');
    try {
      // Get the user ID from the authenticated request
      const userId = req.userId;
  
      // Find the user in the database
      const user = await User.findById(userId).select('-password -verificationToken');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the user profile data
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  
  // controllers/authController.js
  const updateUserProfile = async (req, res) => {
    try {
      // Get the user ID from the authenticated request
      const userId = req.userId;
  
      // Extract updated fields from the request body
      const { username, email, firstName, lastName, phoneNumber } = req.body;
  
      // Find the user and update their profile
      const user = await User.findByIdAndUpdate(
        userId,
        { username, email, firstName, lastName, phoneNumber },
        { new: true, runValidators: true } // Return the updated user and run validators
      ).select('-password -verificationToken');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the updated user profile data
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

  module.exports = { getUserProfile, updateUserProfile };