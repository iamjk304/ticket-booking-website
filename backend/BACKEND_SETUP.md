# 🚀 Backend Setup Guide - TravelEase

## Complete Node.js + MySQL/PostgreSQL Backend Implementation

This guide will help you set up the complete backend for your TravelEase ticket booking website.

---

## 📋 Prerequisites

Before starting, ensure you have:

- ✅ **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- ✅ **MySQL** (v8.0+) OR **PostgreSQL** (v13+)
- ✅ **npm** or **yarn** package manager
- ✅ **Git** (for version control)

---

## 🗄️ Database Installation

### Option A: MySQL Installation

**Windows:**
1. Download MySQL Installer from [mysql.com](https://dev.mysql.com/downloads/installer/)
2. Run installer and choose "Developer Default"
3. Set root password during installation
4. Remember your password!

**Mac:**
```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

**Linux:**
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

### Option B: PostgreSQL Installation

**Windows:**
1. Download from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run installer
3. Set password for postgres user
4. Remember your password!

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

---

## 🔧 Backend Setup Steps

### Step 1: Install Dependencies

```powershell
cd ticket-booking-website/backend
npm install
```

This will install all required packages:
- express (web framework)
- sequelize (ORM)
- mysql2 or pg (database drivers)
- bcryptjs (password hashing)
- jsonwebtoken (authentication)
- cors, helmet, morgan (middleware)

### Step 2: Create Database

**For MySQL:**
```sql
mysql -u root -p
CREATE DATABASE travelease_db;
EXIT;
```

**For PostgreSQL:**
```sql
psql -U postgres
CREATE DATABASE travelease_db;
\q
```

### Step 3: Configure Environment

1. Copy `.env.example` to `.env`:
```powershell
copy .env.example .env
```

2. Edit `.env` file with your database credentials:

**For MySQL:**
```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=travelease_db
DB_USER=root
DB_PASSWORD=your_mysql_password

PORT=5000
NODE_ENV=development
JWT_SECRET=your_random_secret_key_here
FRONTEND_URL=http://localhost:8000
```

**For PostgreSQL:**
```env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=travelease_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password

PORT=5000
NODE_ENV=development
JWT_SECRET=your_random_secret_key_here
FRONTEND_URL=http://localhost:8000
```

### Step 4: Initialize Database

Run the database initialization script:
```powershell
npm run init-db
```

This will:
- Create all necessary tables
- Seed initial flight and train data
- Create test user accounts

### Step 5: Start Backend Server

**Development mode (with auto-reload):**
```powershell
npm run dev
```

**Production mode:**
```powershell
npm start
```

You should see:
```
✅ Database connection established successfully
✅ Database synchronized
🚀 Server running on port 5000
📍 Environment: development
🗄️  Database: mysql (or postgres)
🌐 Frontend URL: http://localhost:8000
```

---

## 🧪 Testing the Backend

### Test 1: Health Check

Open browser or use curl:
```
http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "success",
  "message": "TravelEase API is running",
  "timestamp": "2026-05-27T12:00:00.000Z",
  "database": "connected"
}
```

### Test 2: Get Flights

```
http://localhost:5000/api/flights
```

Should return list of flights.

### Test 3: Register User

Use Postman or curl:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Flights
- `GET /api/flights` - Get all flights
- `GET /api/flights/search` - Search flights
- `GET /api/flights/:id` - Get flight by ID

### Trains
- `GET /api/trains` - Get all trains
- `GET /api/trains/search` - Search trains
- `GET /api/trains/:id` - Get train by ID

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/password` - Change password

---

## 🗃️ Database Schema

### Tables Created:

1. **users**
   - id, email, password, first_name, last_name, phone
   - created_at, updated_at

2. **flights**
   - id, name, number, origin, destination, departure, arrival
   - duration, stops, class, price, available_seats, date

3. **trains**
   - id, name, number, origin, destination, departure, arrival
   - duration, stops, class, price, available_seats, date

4. **bookings**
   - id, user_id, trip_id, trip_type (flight/train)
   - booking_date, total_amount, status, seats

5. **passengers**
   - id, booking_id, first_name, last_name, age, gender

---

## 🔐 Authentication Flow

1. **Register**: User creates account → Password hashed → Stored in DB
2. **Login**: User logs in → JWT token generated → Sent to frontend
3. **Protected Routes**: Frontend sends JWT in headers → Backend verifies → Access granted

---

## 🌐 Frontend Integration

### Update Frontend to Use API

Replace localStorage calls with API calls:

**Before (localStorage):**
```javascript
const results = searchTrips(params);
```

**After (API):**
```javascript
const response = await fetch('http://localhost:5000/api/flights/search', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(params)
});
const results = await response.json();
```

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to database"
**Solution:**
- Check if MySQL/PostgreSQL is running
- Verify credentials in `.env` file
- Ensure database exists

### Issue: "Port 5000 already in use"
**Solution:**
- Change PORT in `.env` file
- Or kill process using port 5000

### Issue: "Module not found"
**Solution:**
```powershell
cd backend
npm install
```

### Issue: "Authentication failed"
**Solution:**
- Check JWT_SECRET in `.env`
- Verify token is being sent in headers

---

## 📦 Project Structure

```
backend/
├── config/
│   ├── database.js          # Database connection
│   └── initDatabase.js      # Database initialization
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── flightController.js  # Flight operations
│   ├── trainController.js   # Train operations
│   └── bookingController.js # Booking operations
├── models/
│   ├── User.js             # User model
│   ├── Flight.js           # Flight model
│   ├── Train.js            # Train model
│   ├── Booking.js          # Booking model
│   └── Passenger.js        # Passenger model
├── routes/
│   ├── auth.js             # Auth routes
│   ├── flights.js          # Flight routes
│   ├── trains.js           # Train routes
│   ├── bookings.js         # Booking routes
│   └── users.js            # User routes
├── middleware/
│   ├── auth.js             # JWT verification
│   └── validation.js       # Input validation
├── .env                    # Environment variables
├── .env.example            # Example env file
├── package.json            # Dependencies
└── server.js               # Main server file
```

---

## 🚀 Deployment

### Deploy to Heroku

1. Install Heroku CLI
2. Create Heroku app:
```bash
heroku create travelease-api
```

3. Add database addon:
```bash
heroku addons:create cleardb:ignite  # MySQL
# OR
heroku addons:create heroku-postgresql:hobby-dev  # PostgreSQL
```

4. Set environment variables:
```bash
heroku config:set JWT_SECRET=your_secret
heroku config:set FRONTEND_URL=https://yourdomain.com
```

5. Deploy:
```bash
git push heroku main
```

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/)

---

## ✅ Next Steps

1. ✅ Install Node.js and database
2. ✅ Run `npm install` in backend folder
3. ✅ Create database
4. ✅ Configure `.env` file
5. ✅ Run `npm run init-db`
6. ✅ Start server with `npm run dev`
7. ✅ Test API endpoints
8. ✅ Update frontend to use API
9. ✅ Deploy to production

---

**Need help? Check the troubleshooting section or create an issue on GitHub!**

🎉 **Your backend is ready to power your ticket booking website!**