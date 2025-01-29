const express = require('express');
const { transfer } = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
// Protect the /transfer route with authMiddleware
router.post('/transfer', authMiddleware, transfer);

module.exports = router;