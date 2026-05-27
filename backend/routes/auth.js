// ===================================
// Authentication Routes
// ===================================

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { validateRegister, validateLogin, handleValidationErrors } = require('../middleware/validation');
const {
    register,
    login,
    getCurrentUser,
    logout
} = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', validateRegister, handleValidationErrors, register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validateLogin, handleValidationErrors, login);

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', protect, getCurrentUser);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', protect, logout);

module.exports = router;

// Made with Bob
