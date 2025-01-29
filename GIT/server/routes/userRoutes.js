const express = require('express');
const {getUserProfile, updateUserProfile} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
// Protect the /transfer route with authMiddleware
router.get('/profile', authMiddleware, getUserProfile);
router.put('/update-profile', authMiddleware, updateUserProfile);

module.exports = router;