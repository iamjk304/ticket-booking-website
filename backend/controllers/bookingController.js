// ===================================
// Booking Controller
// ===================================

const { Booking, Passenger, Flight, Train, User } = require('../config/database');
const { Op } = require('sequelize');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
    try {
        const {
            trip_type,
            trip_id,
            travel_date,
            passengers,
            payment_method,
            contact_email,
            contact_phone
        } = req.body;

        // Get trip details (flight or train)
        let trip;
        if (trip_type === 'flight') {
            trip = await Flight.findByPk(trip_id);
        } else {
            trip = await Train.findByPk(trip_id);
        }

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: `${trip_type} not found`
            });
        }

        // Check seat availability
        if (trip.available_seats < passengers.length) {
            return res.status(400).json({
                success: false,
                message: 'Not enough seats available'
            });
        }

        // Calculate total amount
        const total_amount = trip.price * passengers.length;

        // Extract seat numbers
        const selected_seats = passengers.map(p => p.seat_number);

        // Create booking
        const booking = await Booking.create({
            user_id: req.user.id,
            trip_type,
            trip_id,
            from_city: trip.from_city,
            to_city: trip.to_city,
            departure_time: trip.departure_time,
            arrival_time: trip.arrival_time,
            travel_date,
            number_of_passengers: passengers.length,
            selected_seats,
            total_amount,
            payment_method,
            payment_status: 'completed', // Mock payment - always successful
            booking_status: 'confirmed',
            contact_email,
            contact_phone
        });

        // Create passenger records
        const passengerRecords = passengers.map(p => ({
            booking_id: booking.id,
            first_name: p.first_name,
            last_name: p.last_name,
            age: p.age,
            gender: p.gender,
            seat_number: p.seat_number,
            passenger_type: p.age < 12 ? 'child' : 'adult'
        }));

        await Passenger.bulkCreate(passengerRecords);

        // Update trip availability
        await trip.update({
            available_seats: trip.available_seats - passengers.length
        });

        // Fetch complete booking with passengers
        const completeBooking = await Booking.findByPk(booking.id, {
            include: [
                {
                    model: Passenger,
                    as: 'passengers'
                }
            ]
        });

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: completeBooking
        });
    } catch (error) {
        console.error('Create booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating booking',
            error: error.message
        });
    }
};

// @desc    Get user's bookings
// @route   GET /api/bookings
// @access  Private
exports.getUserBookings = async (req, res) => {
    try {
        const { status, trip_type } = req.query;

        const whereClause = {
            user_id: req.user.id
        };

        if (status) {
            whereClause.booking_status = status;
        }

        if (trip_type) {
            whereClause.trip_type = trip_type;
        }

        const bookings = await Booking.findAll({
            where: whereClause,
            include: [
                {
                    model: Passenger,
                    as: 'passengers'
                }
            ],
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        console.error('Get user bookings error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching bookings',
            error: error.message
        });
    }
};

// @desc    Get single booking by ID
// @route   GET /api/bookings/:id
// @access  Private
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findOne({
            where: {
                id: req.params.id,
                user_id: req.user.id
            },
            include: [
                {
                    model: Passenger,
                    as: 'passengers'
                }
            ]
        });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        console.error('Get booking by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching booking',
            error: error.message
        });
    }
};

// @desc    Get booking by reference number
// @route   GET /api/bookings/reference/:reference
// @access  Public
exports.getBookingByReference = async (req, res) => {
    try {
        const booking = await Booking.findOne({
            where: {
                booking_reference: req.params.reference
            },
            include: [
                {
                    model: Passenger,
                    as: 'passengers'
                }
            ]
        });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        console.error('Get booking by reference error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching booking',
            error: error.message
        });
    }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findOne({
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        if (booking.booking_status === 'cancelled') {
            return res.status(400).json({
                success: false,
                message: 'Booking is already cancelled'
            });
        }

        // Update booking status
        await booking.update({
            booking_status: 'cancelled',
            payment_status: 'refunded'
        });

        // Restore seat availability
        let trip;
        if (booking.trip_type === 'flight') {
            trip = await Flight.findByPk(booking.trip_id);
        } else {
            trip = await Train.findByPk(booking.trip_id);
        }

        if (trip) {
            await trip.update({
                available_seats: trip.available_seats + booking.number_of_passengers
            });
        }

        res.status(200).json({
            success: true,
            message: 'Booking cancelled successfully',
            data: booking
        });
    } catch (error) {
        console.error('Cancel booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Error cancelling booking',
            error: error.message
        });
    }
};

// Made with Bob
