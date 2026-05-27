// ===================================
// Database Configuration
// Supports MySQL and PostgreSQL
// ===================================

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Database configuration based on DB_TYPE
const dbConfig = {
    database: process.env.DB_NAME || 'travelease_db',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || (process.env.DB_TYPE === 'postgres' ? 5432 : 3306),
    dialect: process.env.DB_TYPE || 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: true,
        underscored: true,
        freezeTableName: true
    }
};

// Initialize Sequelize
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
        logging: dbConfig.logging,
        pool: dbConfig.pool,
        define: dbConfig.define
    }
);

// Import models
const User = require('../models/User')(sequelize);
const Flight = require('../models/Flight')(sequelize);
const Train = require('../models/Train')(sequelize);
const Booking = require('../models/Booking')(sequelize);
const Passenger = require('../models/Passenger')(sequelize);

// Define associations
// User has many Bookings
User.hasMany(Booking, {
    foreignKey: 'user_id',
    as: 'bookings'
});
Booking.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

// Booking has many Passengers
Booking.hasMany(Passenger, {
    foreignKey: 'booking_id',
    as: 'passengers'
});
Passenger.belongsTo(Booking, {
    foreignKey: 'booking_id',
    as: 'booking'
});

// Flight can have many Bookings
Flight.hasMany(Booking, {
    foreignKey: 'trip_id',
    constraints: false,
    scope: {
        trip_type: 'flight'
    }
});

// Train can have many Bookings
Train.hasMany(Booking, {
    foreignKey: 'trip_id',
    constraints: false,
    scope: {
        trip_type: 'train'
    }
});

// Booking belongs to either Flight or Train (polymorphic)
Booking.belongsTo(Flight, {
    foreignKey: 'trip_id',
    constraints: false,
    as: 'flight'
});

Booking.belongsTo(Train, {
    foreignKey: 'trip_id',
    constraints: false,
    as: 'train'
});

// Export database instance and models
const db = {
    sequelize,
    Sequelize,
    User,
    Flight,
    Train,
    Booking,
    Passenger
};

module.exports = db;

// Made with Bob
