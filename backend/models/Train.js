// ===================================
// Train Model
// ===================================

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Train = sequelize.define('Train', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        train_number: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        train_name: {
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
            defaultValue: 'Sleeper'
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'trains',
        timestamps: true,
        underscored: true,
        indexes: [
            {
                fields: ['from_city', 'to_city']
            },
            {
                fields: ['train_number']
            }
        ]
    });

    return Train;
};

// Made with Bob
