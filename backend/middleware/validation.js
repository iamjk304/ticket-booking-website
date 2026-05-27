// ===================================
// Validation Middleware
// ===================================

const { body, param, query, validationResult } = require('express-validator');

// Handle validation errors
exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

// User registration validation
exports.validateRegister = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('first_name')
        .trim()
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ max: 100 })
        .withMessage('First name must not exceed 100 characters'),
    body('last_name')
        .trim()
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({ max: 100 })
        .withMessage('Last name must not exceed 100 characters'),
    body('phone')
        .optional()
        .isMobilePhone()
        .withMessage('Please provide a valid phone number')
];

// User login validation
exports.validateLogin = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

// Search validation
exports.validateSearch = [
    query('from')
        .trim()
        .notEmpty()
        .withMessage('Departure city is required'),
    query('to')
        .trim()
        .notEmpty()
        .withMessage('Destination city is required'),
    query('date')
        .optional()
        .isISO8601()
        .withMessage('Invalid date format')
];

// Booking creation validation
exports.validateBooking = [
    body('trip_type')
        .isIn(['flight', 'train'])
        .withMessage('Trip type must be either flight or train'),
    body('trip_id')
        .isInt({ min: 1 })
        .withMessage('Valid trip ID is required'),
    body('travel_date')
        .isISO8601()
        .withMessage('Valid travel date is required'),
    body('passengers')
        .isArray({ min: 1 })
        .withMessage('At least one passenger is required'),
    body('passengers.*.first_name')
        .trim()
        .notEmpty()
        .withMessage('Passenger first name is required'),
    body('passengers.*.last_name')
        .trim()
        .notEmpty()
        .withMessage('Passenger last name is required'),
    body('passengers.*.age')
        .isInt({ min: 0, max: 150 })
        .withMessage('Valid passenger age is required'),
    body('passengers.*.gender')
        .isIn(['male', 'female', 'other'])
        .withMessage('Valid gender is required'),
    body('passengers.*.seat_number')
        .trim()
        .notEmpty()
        .withMessage('Seat number is required'),
    body('payment_method')
        .trim()
        .notEmpty()
        .withMessage('Payment method is required'),
    body('contact_email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid contact email is required'),
    body('contact_phone')
        .trim()
        .notEmpty()
        .withMessage('Contact phone is required')
];

// ID parameter validation
exports.validateId = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('Valid ID is required')
];

// Booking reference validation
exports.validateBookingReference = [
    param('reference')
        .trim()
        .notEmpty()
        .matches(/^BK[A-Z0-9]+$/)
        .withMessage('Valid booking reference is required')
];

// Profile update validation
exports.validateProfileUpdate = [
    body('first_name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('First name cannot be empty')
        .isLength({ max: 100 })
        .withMessage('First name must not exceed 100 characters'),
    body('last_name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Last name cannot be empty')
        .isLength({ max: 100 })
        .withMessage('Last name must not exceed 100 characters'),
    body('phone')
        .optional()
        .isMobilePhone()
        .withMessage('Please provide a valid phone number')
];

// Password change validation
exports.validatePasswordChange = [
    body('current_password')
        .notEmpty()
        .withMessage('Current password is required'),
    body('new_password')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters long'),
    body('confirm_password')
        .custom((value, { req }) => value === req.body.new_password)
        .withMessage('Passwords do not match')
];

// Made with Bob
