// ===================================
// TravelEase Backend Server
// Node.js + Express + MySQL/PostgreSQL
// ===================================

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import database connection
const db = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const flightRoutes = require('./routes/flights');
const trainRoutes = require('./routes/trains');
const bookingRoutes = require('./routes/bookings');
const userRoutes = require('./routes/users');

// Initialize Express app
const app = express();

// ===================================
// Middleware
// ===================================

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:8000',
    credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// ===================================
// Routes
// ===================================

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'success',
        message: 'TravelEase API is running',
        timestamp: new Date().toISOString(),
        database: db.sequelize ? 'connected' : 'disconnected'
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// ===================================
// Database Connection & Server Start
// ===================================

const PORT = process.env.PORT || 5000;

// Test database connection and start server
db.sequelize.authenticate()
    .then(() => {
        console.log('✅ Database connection established successfully');
        
        // Sync database (creates tables if they don't exist)
        return db.sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    })
    .then(() => {
        console.log('✅ Database synchronized');
        
        // Start server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🗄️  Database: ${process.env.DB_TYPE || 'not configured'}`);
            console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:8000'}`);
        });
    })
    .catch((err) => {
        console.error('❌ Unable to connect to database:', err);
        process.exit(1);
    });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Promise Rejection:', err);
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    process.exit(1);
});

module.exports = app;

// Made with Bob
