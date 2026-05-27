// ===================================
// Flight Model
// ===================================

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Flight = sequelize.define('Flight', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        flight_number: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        airline: {
            type: DataTypes.STRING(100),
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
        duration: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        stops: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        available_seats: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 60
        },
        total_seats: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 60
        },
        class_type: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'Economy'
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'flights',
        timestamps: true,
        underscored: true,
        indexes: [
            {
                fields: ['from_city', 'to_city']
            },
            {
                fields: ['flight_number']
            }
        ]
    });

    return Flight;
};

// Made with Bob
