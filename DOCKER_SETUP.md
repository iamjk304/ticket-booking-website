# 🐳 Docker Setup Guide for TravelEase

This guide will help you run the entire TravelEase application using Docker containers.

## Prerequisites

**Only Docker is required!** No need to install Node.js, MySQL, or Python.

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows/Mac/Linux)
- That's it! 🎉

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/iamjk304/ticket-booking-website.git
cd ticket-booking-website
```

### 2. Start All Services

```bash
docker-compose up -d
```

This single command will:
- ✅ Pull MySQL 8.0 image
- ✅ Pull Nginx Alpine image
- ✅ Build Node.js backend
- ✅ Create network between containers
- ✅ Start all services

### 3. Initialize Database

Wait for MySQL to be ready (about 30 seconds), then run:

```bash
docker-compose exec backend npm run init-db
```

### 4. Access the Application

- **Frontend:** http://localhost:8000
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/health

## Docker Commands

### View Running Containers
```bash
docker-compose ps
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### Stop All Services
```bash
docker-compose down
```

### Stop and Remove All Data
```bash
docker-compose down -v
```

### Restart Services
```bash
docker-compose restart
```

### Rebuild After Code Changes
```bash
docker-compose up -d --build
```

## Container Details

### 🗄️ MySQL Container
- **Image:** mysql:8.0
- **Port:** 3306
- **Database:** travelease_db
- **User:** travelease_user
- **Password:** Bhaiya@6 (change in production!)
- **Volume:** mysql_data (persistent storage)

### 🚀 Backend Container
- **Image:** Custom Node.js 18 Alpine
- **Port:** 5000
- **Environment:** Production
- **Auto-restart:** Yes

### 🌐 Frontend Container
- **Image:** nginx:alpine
- **Port:** 8000
- **Serves:** Static HTML, CSS, JS files
- **Proxy:** API requests to backend

## Environment Variables

Create a `.env` file in the root directory to customize:

```env
# Database
DB_NAME=travelease_db
DB_USER=travelease_user
DB_PASSWORD=your_secure_password

# JWT
JWT_SECRET=your_super_secret_jwt_key

# Ports (optional)
FRONTEND_PORT=8000
BACKEND_PORT=5000
MYSQL_PORT=3306
```

## Troubleshooting

### MySQL Connection Issues
```bash
# Check if MySQL is healthy
docker-compose ps

# View MySQL logs
docker-compose logs mysql

# Restart MySQL
docker-compose restart mysql
```

### Backend Not Starting
```bash
# Check backend logs
docker-compose logs backend

# Rebuild backend
docker-compose up -d --build backend
```

### Port Already in Use
```bash
# Stop conflicting services
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8000 | xargs kill -9
```

## Production Deployment

### 1. Update Environment Variables
```bash
# Create production .env file
cp .env.example .env
# Edit .env with secure values
```

### 2. Use Production Docker Compose
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### 3. Enable SSL (Optional)
Add SSL certificates and update nginx.conf for HTTPS.

## Database Backup

### Backup Database
```bash
docker-compose exec mysql mysqldump -u root -p travelease_db > backup.sql
```

### Restore Database
```bash
docker-compose exec -T mysql mysql -u root -p travelease_db < backup.sql
```

## Scaling

### Scale Backend Instances
```bash
docker-compose up -d --scale backend=3
```

### Add Load Balancer
Update nginx.conf to distribute traffic across backend instances.

## Monitoring

### Container Stats
```bash
docker stats
```

### Health Checks
```bash
# Backend health
curl http://localhost:5000/api/health

# Frontend health
curl http://localhost:8000
```

## Cleanup

### Remove All Containers and Images
```bash
docker-compose down --rmi all -v
```

### Remove Unused Docker Resources
```bash
docker system prune -a
```

## Benefits of Docker Setup

✅ **No Installation Required** - Only Docker needed
✅ **Consistent Environment** - Works same on all systems
✅ **Easy Deployment** - One command to start everything
✅ **Isolated Services** - No conflicts with other apps
✅ **Easy Scaling** - Scale services independently
✅ **Version Control** - Docker images are versioned
✅ **Quick Rollback** - Easy to revert to previous version

## Support

For issues or questions:
- GitHub Issues: https://github.com/iamjk304/ticket-booking-website/issues
- Email: your-email@example.com

---

Made with ❤️ by Bob