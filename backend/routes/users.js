// ===================================
// User Routes
// ===================================

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { validateProfileUpdate, validatePasswordChange, handleValidationErrors } = require('../middleware/validation');
const {
    getProfile,
    updateProfile,
    changePassword,
    deleteAccount
} = require('../controllers/userController');

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, getProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, validateProfileUpdate, handleValidationErrors, updateProfile);

// @route   PUT /api/users/password
// @desc    Change password
// @access  Private
router.put('/password', protect, validatePasswordChange, handleValidationErrors, changePassword);

// @route   DELETE /api/users/account
// @desc    Delete user account (soft delete)
// @access  Private
router.delete('/account', protect, deleteAccount);

module.exports = router;

// Made with Bob
