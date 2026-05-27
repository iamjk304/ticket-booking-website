// ===================================
// Train Routes
// ===================================

const express = require('express');
const router = express.Router();
const { validateSearch, validateId, handleValidationErrors } = require('../middleware/validation');
const {
    getAllTrains,
    searchTrains,
    getTrainById,
    updateAvailability
} = require('../controllers/trainController');

// @route   GET /api/trains
// @desc    Get all trains
// @access  Public
router.get('/', getAllTrains);

// @route   GET /api/trains/search
// @desc    Search trains
// @access  Public
router.get('/search', validateSearch, handleValidationErrors, searchTrains);

// @route   GET /api/trains/:id
// @desc    Get single train by ID
// @access  Public
router.get('/:id', validateId, handleValidationErrors, getTrainById);

// @route   PUT /api/trains/:id/availability
// @desc    Update train availability (internal use)
// @access  Private
router.put('/:id/availability', validateId, handleValidationErrors, updateAvailability);

module.exports = router;

// Made with Bob
