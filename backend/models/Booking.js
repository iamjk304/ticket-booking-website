// ===================================
// Booking Model
// ===================================

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Booking = sequelize.define('Booking', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        booking_reference: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        trip_type: {
            type: DataTypes.ENUM('flight', 'train'),
            allowNull: false
        },
        trip_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        from_city: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        to_city: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        departure_time: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        arrival_time: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        travel_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        number_of_passengers: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        selected_seats: {
            type: DataTypes.JSON,
            allowNull: false
        },
        total_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        payment_method: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        payment_status: {
            type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
            defaultValue: 'pending'
        },
        booking_status: {
            type: DataTypes.ENUM('confirmed', 'cancelled', 'completed'),
            defaultValue: 'confirmed'
        },
        contact_email: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        contact_phone: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        tableName: 'bookings',
        timestamps: true,
        underscored: true,
        indexes: [
            {
                fields: ['user_id']
            },
            {
                fields: ['booking_reference']
            },
            {
                fields: ['trip_type', 'trip_id']
            }
        ],
        hooks: {
            beforeCreate: async (booking) => {
                // Generate unique booking reference
                const timestamp = Date.now().toString(36).toUpperCase();
                const random = Math.random().toString(36).substring(2, 6).toUpperCase();
                booking.booking_reference = `BK${timestamp}${random}`;
            }
        }
    });

    return Booking;
};

// Made with Bob
