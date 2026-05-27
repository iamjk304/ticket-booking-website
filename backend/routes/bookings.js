// ===================================
// Booking Routes
// ===================================

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { validateBooking, validateId, validateBookingReference, handleValidationErrors } = require('../middleware/validation');
const {
    createBooking,
    getUserBookings,
    getBookingById,
    getBookingByReference,
    cancelBooking
} = require('../controllers/bookingController');

// @route   POST /api/bookings
// @desc    Create new booking
// @access  Private
router.post('/', protect, validateBooking, handleValidationErrors, createBooking);

// @route   GET /api/bookings
// @desc    Get user's bookings
// @access  Private
router.get('/', protect, getUserBookings);

// @route   GET /api/bookings/reference/:reference
// @desc    Get booking by reference number
// @access  Public
router.get('/reference/:reference', validateBookingReference, handleValidationErrors, getBookingByReference);

// @route   GET /api/bookings/:id
// @desc    Get single booking by ID
// @access  Private
router.get('/:id', protect, validateId, handleValidationErrors, getBookingById);

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel booking
// @access  Private
router.put('/:id/cancel', protect, validateId, handleValidationErrors, cancelBooking);

module.exports = router;

// Made with Bob
