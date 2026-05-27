// ===================================
// Train Controller
// ===================================

const { Train, Sequelize } = require('../config/database');
const Op = Sequelize.Op || {
    like: '$like$',
    gte: '$gte$',
    lte: '$lte$'
};

// @desc    Get all trains
// @route   GET /api/trains
// @access  Public
exports.getAllTrains = async (req, res) => {
    try {
        const trains = await Train.findAll({
            where: { is_active: true },
            order: [['departure_time', 'ASC']]
        });

        res.status(200).json({
            success: true,
            count: trains.length,
            data: trains
        });
    } catch (error) {
        console.error('Get all trains error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching trains',
            error: error.message
        });
    }
};

// @desc    Search trains
// @route   GET /api/trains/search
// @access  Public
exports.searchTrains = async (req, res) => {
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

        const trains = await Train.findAll({
            where: whereClause,
            order: orderClause
        });

        res.status(200).json({
            success: true,
            count: trains.length,
            data: trains
        });
    } catch (error) {
        console.error('Search trains error:', error);
        res.status(500).json({
            success: false,
            message: 'Error searching trains',
            error: error.message
        });
    }
};

// @desc    Get single train by ID
// @route   GET /api/trains/:id
// @access  Public
exports.getTrainById = async (req, res) => {
    try {
        const train = await Train.findByPk(req.params.id);

        if (!train) {
            return res.status(404).json({
                success: false,
                message: 'Train not found'
            });
        }

        if (!train.is_active) {
            return res.status(404).json({
                success: false,
                message: 'Train is not available'
            });
        }

        res.status(200).json({
            success: true,
            data: train
        });
    } catch (error) {
        console.error('Get train by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching train',
            error: error.message
        });
    }
};

// @desc    Update train availability (reduce seats after booking)
// @route   PUT /api/trains/:id/availability
// @access  Private (Internal use)
exports.updateAvailability = async (req, res) => {
    try {
        const { seats_to_book } = req.body;
        const train = await Train.findByPk(req.params.id);

        if (!train) {
            return res.status(404).json({
                success: false,
                message: 'Train not found'
            });
        }

        if (train.available_seats < seats_to_book) {
            return res.status(400).json({
                success: false,
                message: 'Not enough seats available'
            });
        }

        await train.update({
            available_seats: train.available_seats - seats_to_book
        });

        res.status(200).json({
            success: true,
            message: 'Train availability updated',
            data: train
        });
    } catch (error) {
        console.error('Update train availability error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating train availability',
            error: error.message
        });
    }
};

// Made with Bob
