# Multi-stage build for Node.js backend
FROM node:18-alpine AS backend

# Set working directory
WORKDIR /app/backend

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm install --production

# Copy backend source code
COPY backend/ ./

# Expose backend port
EXPOSE 5000

# Start backend server
CMD ["npm", "start"]

# Made with Bob
