// ===================================
// Flight Controller
// ===================================

const { Flight } = require('../config/database');
const { Op } = require('sequelize');

// @desc    Get all flights
// @route   GET /api/flights
// @access  Public
exports.getAllFlights = async (req, res) => {
    try {
        const flights = await Flight.findAll({
            where: { is_active: true },
            order: [['departure_time', 'ASC']]
        });

        res.status(200).json({
            success: true,
            count: flights.length,
            data: flights
        });
    } catch (error) {
        console.error('Get all flights error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching flights',
            error: error.message
        });
    }
};

// @desc    Search flights
// @route   GET /api/flights/search
// @access  Public
exports.searchFlights = async (req, res) => {
    try {
        const { from, to, date, minPrice, maxPrice, stops, sortBy } = req.query;

        // Build where clause
        const whereClause = {
            is_active: true
        };

        if (from) {
            whereClause.from_city = {
                [Op.like]: `%${from}%`
            };
        }

        if (to) {
            whereClause.to_city = {
                [Op.like]: `%${to}%`
            };
        }

        if (minPrice || maxPrice) {
            whereClause.price = {};
            if (minPrice) whereClause.price[Op.gte] = parseFloat(minPrice);
            if (maxPrice) whereClause.price[Op.lte] = parseFloat(maxPrice);
        }

        if (stops !== undefined) {
            whereClause.stops = parseInt(stops);
        }

        // Build order clause
        let orderClause = [['departure_time', 'ASC']];
        if (sortBy === 'price-low') {
            orderClause = [['price', 'ASC']];
        } else if (sortBy === 'price-high') {
            orderClause = [['price', 'DESC']];
        } else if (sortBy === 'duration') {
            orderClause = [['duration', 'ASC']];
        } else if (sortBy === 'departure') {
            orderClause = [['departure_time', 'ASC']];
        }

        const flights = await Flight.findAll({
            where: whereClause,
            order: orderClause
        });

        res.status(200).json({
            success: true,
            count: flights.length,
            data: flights
        });
    } catch (error) {
        console.error('Search flights error:', error);
        res.status(500).json({
            success: false,
            message: 'Error searching flights',
            error: error.message
        });
    }
};

// @desc    Get single flight by ID
// @route   GET /api/flights/:id
// @access  Public
exports.getFlightById = async (req, res) => {
    try {
        const flight = await Flight.findByPk(req.params.id);

        if (!flight) {
            return res.status(404).json({
                success: false,
                message: 'Flight not found'
            });
        }

        if (!flight.is_active) {
            return res.status(404).json({
                success: false,
                message: 'Flight is not available'
            });
        }

        res.status(200).json({
            success: true,
            data: flight
        });
    } catch (error) {
        console.error('Get flight by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching flight',
            error: error.message
        });
    }
};

// @desc    Update flight availability (reduce seats after booking)
// @route   PUT /api/flights/:id/availability
// @access  Private (Internal use)
exports.updateAvailability = async (req, res) => {
    try {
        const { seats_to_book } = req.body;
        const flight = await Flight.findByPk(req.params.id);

        if (!flight) {
            return res.status(404).json({
                success: false,
                message: 'Flight not found'
            });
        }

        if (flight.available_seats < seats_to_book) {
            return res.status(400).json({
                success: false,
                message: 'Not enough seats available'
            });
        }

        await flight.update({
            available_seats: flight.available_seats - seats_to_book
        });

        res.status(200).json({
            success: true,
            message: 'Flight availability updated',
            data: flight
        });
    } catch (error) {
        console.error('Update flight availability error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating flight availability',
            error: error.message
        });
    }
};

// Made with Bob
