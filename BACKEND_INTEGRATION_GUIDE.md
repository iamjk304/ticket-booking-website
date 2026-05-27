# Backend Integration Guide

This guide explains how to integrate the Node.js/Express backend with the existing frontend.

## 🎯 Overview

The backend is now complete with:
- ✅ Express server with REST API
- ✅ MySQL/PostgreSQL database support via Sequelize
- ✅ JWT authentication
- ✅ Complete CRUD operations for flights, trains, bookings, and users
- ✅ Input validation and error handling
- ✅ Database seeding script

## 📋 Prerequisites

Before starting, ensure you have:
- Node.js (v14 or higher)
- MySQL or PostgreSQL installed
- Git (for version control)

## 🚀 Quick Start

### 1. Install Backend Dependencies

```bash
cd ticket-booking-website/backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
# Database Configuration
DB_TYPE=mysql          # or postgres
DB_HOST=localhost
DB_NAME=travelease_db
DB_USER=root
DB_PASSWORD=your_password_here
DB_PORT=3306          # 3306 for MySQL, 5432 for PostgreSQL

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:8000
```

### 3. Create Database

**For MySQL:**
```bash
mysql -u root -p
CREATE DATABASE travelease_db;
exit;
```

**For PostgreSQL:**
```bash
psql -U postgres
CREATE DATABASE travelease_db;
\q
```

### 4. Initialize Database (Create Tables & Seed Data)

```bash
npm run init-db
```

This will:
- Create all database tables
- Seed 18 flights (8 US + 10 Indian)
- Seed 18 trains (8 US + 10 Indian)

### 5. Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

### 6. Test API

Open browser or use curl:
```bash
# Health check
curl http://localhost:5000/api/health

# Get all flights
curl http://localhost:5000/api/flights

# Search flights
curl "http://localhost:5000/api/flights/search?from=New%20York&to=Los%20Angeles"
```

## 🔗 Frontend Integration

### Option 1: Use API Helper (Recommended)

The `js/api-config.js` file provides ready-to-use API functions.

**Include in HTML:**
```html
<script src="js/api-config.js"></script>
```

**Example Usage:**

```javascript
// Register user
const userData = {
    email: 'user@example.com',
    password: 'password123',
    first_name: 'John',
    last_name: 'Doe',
    phone: '1234567890'
};

try {
    const response = await API.auth.register(userData);
    console.log('User registered:', response.data);
    // Store token
    localStorage.setItem('token', response.data.token);
} catch (error) {
    console.error('Registration failed:', error.message);
}

// Login user
const credentials = {
    email: 'user@example.com',
    password: 'password123'
};

try {
    const response = await API.auth.login(credentials);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
} catch (error) {
    console.error('Login failed:', error.message);
}

// Search flights
const searchParams = {
    from: 'New York',
    to: 'Los Angeles',
    sortBy: 'price-low'
};

try {
    const response = await API.flights.search(searchParams);
    console.log('Flights found:', response.data);
} catch (error) {
    console.error('Search failed:', error.message);
}

// Create booking
const bookingData = {
    trip_type: 'flight',
    trip_id: 1,
    travel_date: '2026-06-15',
    passengers: [
        {
            first_name: 'John',
            last_name: 'Doe',
            age: 30,
            gender: 'male',
            seat_number: 'A1'
        }
    ],
    payment_method: 'Credit Card',
    contact_email: 'user@example.com',
    contact_phone: '1234567890'
};

try {
    const response = await API.bookings.create(bookingData);
    console.log('Booking created:', response.data);
} catch (error) {
    console.error('Booking failed:', error.message);
}
```

### Option 2: Direct Fetch API

```javascript
// Example: Login with fetch
async function login(email, password) {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message);
        }
        
        // Store token
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

// Example: Protected request with token
async function getUserBookings() {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch('http://localhost:5000/api/bookings', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message);
        }
        
        return data.data;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
    }
}
```

## 🔄 Migration Steps

### 1. Update Authentication (js/auth.js)

Replace localStorage-only auth with API calls:

```javascript
// OLD: localStorage only
function login(email, password) {
    // Mock validation
    localStorage.setItem('isLoggedIn', 'true');
}

// NEW: API integration
async function login(email, password) {
    try {
        const response = await API.auth.login({ email, password });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('isLoggedIn', 'true');
        return response;
    } catch (error) {
        throw error;
    }
}
```

### 2. Update Search (js/search.js)

Replace local data with API calls:

```javascript
// OLD: Local data
const results = searchTrips(from, to, date, type);

// NEW: API integration
async function searchTrips(from, to, date, type) {
    try {
        const params = { from, to, date };
        const response = type === 'flight' 
            ? await API.flights.search(params)
            : await API.trains.search(params);
        return response.data;
    } catch (error) {
        console.error('Search error:', error);
        return [];
    }
}
```

### 3. Update Booking (js/booking.js)

Replace localStorage with API calls:

```javascript
// OLD: localStorage
function saveBooking(bookingData) {
    localStorage.setItem('currentBooking', JSON.stringify(bookingData));
}

// NEW: API integration
async function createBooking(bookingData) {
    try {
        const response = await API.bookings.create(bookingData);
        return response.data;
    } catch (error) {
        console.error('Booking error:', error);
        throw error;
    }
}
```

## 📡 API Endpoints Reference

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `POST /api/auth/logout` - Logout user (Protected)

### Flights
- `GET /api/flights` - Get all flights
- `GET /api/flights/search?from=X&to=Y` - Search flights
- `GET /api/flights/:id` - Get flight by ID

### Trains
- `GET /api/trains` - Get all trains
- `GET /api/trains/search?from=X&to=Y` - Search trains
- `GET /api/trains/:id` - Get train by ID

### Bookings
- `POST /api/bookings` - Create booking (Protected)
- `GET /api/bookings` - Get user bookings (Protected)
- `GET /api/bookings/:id` - Get booking by ID (Protected)
- `GET /api/bookings/reference/:ref` - Get booking by reference
- `PUT /api/bookings/:id/cancel` - Cancel booking (Protected)

### Users
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update profile (Protected)
- `PUT /api/users/password` - Change password (Protected)
- `DELETE /api/users/account` - Delete account (Protected)

## 🔒 Authentication Flow

1. **Register/Login**: User provides credentials
2. **Receive Token**: Backend returns JWT token
3. **Store Token**: Frontend stores token in localStorage
4. **Include Token**: Send token in Authorization header for protected routes
5. **Token Format**: `Authorization: Bearer <token>`

## 🐛 Troubleshooting

### CORS Issues
If you get CORS errors, ensure:
- Backend is running on port 5000
- Frontend URL is correctly set in `.env`
- CORS middleware is enabled in `server.js`

### Database Connection Failed
- Check database credentials in `.env`
- Ensure MySQL/PostgreSQL is running
- Verify database exists
- Check firewall settings

### Token Expired
- JWT tokens expire after 7 days (configurable)
- User needs to login again
- Implement token refresh if needed

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process or change PORT in .env
```

## 🚀 Deployment

### Backend Deployment (Heroku Example)

1. Create Heroku app:
```bash
heroku create your-app-name
```

2. Add database addon:
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

3. Set environment variables:
```bash
heroku config:set JWT_SECRET=your_secret
heroku config:set NODE_ENV=production
```

4. Deploy:
```bash
git push heroku main
```

5. Initialize database:
```bash
heroku run npm run init-db
```

### Update Frontend API URL

In `js/api-config.js`, change:
```javascript
BASE_URL: 'https://your-app-name.herokuapp.com/api'
```

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [JWT.io](https://jwt.io/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 💡 Tips

1. **Development**: Use `npm run dev` for auto-reload
2. **Testing**: Use Postman or Thunder Client for API testing
3. **Logging**: Check console for detailed error messages
4. **Security**: Never commit `.env` file to Git
5. **Performance**: Add database indexes for frequently queried fields

## 🎉 Next Steps

1. Test all API endpoints
2. Update frontend to use API calls
3. Test authentication flow
4. Test booking creation
5. Deploy to production
6. Monitor and optimize

For detailed API documentation, see `backend/BACKEND_SETUP.md`