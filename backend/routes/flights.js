// ===================================
// Flight Routes
// ===================================

const express = require('express');
const router = express.Router();
const { validateSearch, validateId, handleValidationErrors } = require('../middleware/validation');
const {
    getAllFlights,
    searchFlights,
    getFlightById,
    updateAvailability
} = require('../controllers/flightController');

// @route   GET /api/flights
// @desc    Get all flights
// @access  Public
router.get('/', getAllFlights);

// @route   GET /api/flights/search
// @desc    Search flights
// @access  Public
router.get('/search', validateSearch, handleValidationErrors, searchFlights);

// @route   GET /api/flights/:id
// @desc    Get single flight by ID
// @access  Public
router.get('/:id', validateId, handleValidationErrors, getFlightById);

// @route   PUT /api/flights/:id/availability
// @desc    Update flight availability (internal use)
// @access  Private
router.put('/:id/availability', validateId, handleValidationErrors, updateAvailability);

module.exports = router;

// Made with Bob
