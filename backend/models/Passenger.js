// ===================================
// Passenger Model
// ===================================

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Passenger = sequelize.define('Passenger', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        booking_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'bookings',
                key: 'id'
            }
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 150
            }
        },
        gender: {
            type: DataTypes.ENUM('male', 'female', 'other'),
            allowNull: false
        },
        seat_number: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        passenger_type: {
            type: DataTypes.ENUM('adult', 'child', 'infant'),
            defaultValue: 'adult'
        }
    }, {
        tableName: 'passengers',
        timestamps: true,
        underscored: true,
        indexes: [
            {
                fields: ['booking_id']
            }
        ]
    });

    return Passenger;
};

// Made with Bob
