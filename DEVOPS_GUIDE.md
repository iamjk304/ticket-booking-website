# 🚀 DevOps & Production Deployment Guide

Complete guide for deploying TravelEase to production using modern DevOps practices.

## Table of Contents
1. [CI/CD Pipeline](#cicd-pipeline)
2. [Production Deployment](#production-deployment)
3. [Cloud Platforms](#cloud-platforms)
4. [Monitoring & Logging](#monitoring--logging)
5. [Security Best Practices](#security-best-practices)
6. [Scaling & Performance](#scaling--performance)

---

## CI/CD Pipeline

### GitHub Actions Workflow

The project includes automated CI/CD pipeline (`.github/workflows/ci-cd.yml`) that:

1. **Test Stage**
   - Runs on every push and PR
   - Installs dependencies
   - Runs linting
   - Executes tests

2. **Build Stage**
   - Builds Docker images
   - Pushes to GitHub Container Registry
   - Tags with commit SHA and branch name

3. **Deploy Stage**
   - Deploys to production server
   - Only runs on `main` branch
   - Automatic rollback on failure

### Setup GitHub Secrets

Go to your repository → Settings → Secrets and add:

```
PROD_HOST=your-server-ip
PROD_USER=ubuntu
PROD_SSH_KEY=your-private-ssh-key
DB_ROOT_PASSWORD=secure-password
JWT_SECRET=random-secret-key
```

---

## Production Deployment

### Option 1: VPS/Dedicated Server (AWS EC2, DigitalOcean, etc.)

#### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create application directory
sudo mkdir -p /opt/travelease
sudo chown $USER:$USER /opt/travelease
```

#### 2. Clone Repository

```bash
cd /opt/travelease
git clone https://github.com/iamjk304/ticket-booking-website.git .
```

#### 3. Configure Environment

```bash
# Copy and edit production environment file
cp .env.production .env
nano .env

# Update these values:
# - DB_PASSWORD
# - DB_ROOT_PASSWORD
# - JWT_SECRET
# - FRONTEND_URL
```

#### 4. Setup SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot -y

# Get SSL certificate
sudo certbot certonly --standalone -d your-domain.com -d www.your-domain.com

# Copy certificates
sudo mkdir -p ssl
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem ssl/
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem ssl/
```

#### 5. Deploy Application

```bash
# Start production containers
docker-compose -f docker-compose.prod.yml up -d

# Initialize database
docker-compose -f docker-compose.prod.yml exec backend npm run init-db

# Check status
docker-compose -f docker-compose.prod.yml ps
```

#### 6. Setup Auto-renewal for SSL

```bash
# Add cron job
sudo crontab -e

# Add this line:
0 0 1 * * certbot renew --quiet && docker-compose -f /opt/travelease/docker-compose.prod.yml restart frontend
```

---

### Option 2: AWS Deployment

#### Using AWS ECS (Elastic Container Service)

1. **Push Images to ECR**
```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com

# Tag and push
docker tag travelease-backend:latest YOUR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/travelease-backend:latest
docker push YOUR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/travelease-backend:latest
```

2. **Create ECS Task Definition**
   - Use `docker-compose.prod.yml` as reference
   - Configure task with 2 vCPU, 4GB RAM
   - Add environment variables

3. **Setup RDS for MySQL**
   - Create MySQL 8.0 instance
   - Configure security groups
   - Update backend environment variables

4. **Configure Application Load Balancer**
   - Create target groups for backend and frontend
   - Setup health checks
   - Configure SSL certificate

5. **Deploy ECS Service**
   - Set desired count: 2 (for high availability)
   - Enable auto-scaling
   - Configure CloudWatch alarms

---

### Option 3: Google Cloud Platform

#### Using Cloud Run

```bash
# Build and push to GCR
gcloud builds submit --tag gcr.io/PROJECT_ID/travelease-backend

# Deploy to Cloud Run
gcloud run deploy travelease-backend \
  --image gcr.io/PROJECT_ID/travelease-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars DB_HOST=CLOUD_SQL_IP
```

---

### Option 4: Azure Deployment

#### Using Azure Container Instances

```bash
# Create resource group
az group create --name travelease-rg --location eastus

# Create container
az container create \
  --resource-group travelease-rg \
  --name travelease-backend \
  --image ghcr.io/iamjk304/ticket-booking-website:latest \
  --dns-name-label travelease \
  --ports 5000
```

---

### Option 5: Kubernetes (K8s)

#### Deploy to Kubernetes Cluster

```bash
# Create namespace
kubectl create namespace travelease

# Apply configurations
kubectl apply -f k8s/

# Check deployment
kubectl get pods -n travelease
kubectl get services -n travelease
```

---

## Monitoring & Logging

### 1. Application Monitoring

#### Setup Prometheus + Grafana

```yaml
# Add to docker-compose.prod.yml
prometheus:
  image: prom/prometheus
  volumes:
    - ./prometheus.yml:/etc/prometheus/prometheus.yml
  ports:
    - "9090:9090"

grafana:
  image: grafana/grafana
  ports:
    - "3000:3000"
  environment:
    - GF_SECURITY_ADMIN_PASSWORD=admin
```

#### Setup New Relic

```bash
# Add to backend package.json
npm install newrelic

# Add to server.js
require('newrelic');
```

### 2. Log Management

#### ELK Stack (Elasticsearch, Logstash, Kibana)

```yaml
elasticsearch:
  image: docker.elastic.co/elasticsearch/elasticsearch:8.0.0
  environment:
    - discovery.type=single-node

logstash:
  image: docker.elastic.co/logstash/logstash:8.0.0
  volumes:
    - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf

kibana:
  image: docker.elastic.co/kibana/kibana:8.0.0
  ports:
    - "5601:5601"
```

### 3. Error Tracking

#### Sentry Integration

```bash
# Install Sentry
npm install @sentry/node

# Add to server.js
const Sentry = require("@sentry/node");
Sentry.init({ dsn: process.env.SENTRY_DSN });
```

---

## Security Best Practices

### 1. Environment Variables
- Never commit `.env` files
- Use secrets management (AWS Secrets Manager, Azure Key Vault)
- Rotate credentials regularly

### 2. SSL/TLS
- Always use HTTPS in production
- Enable HSTS headers
- Use strong cipher suites

### 3. Database Security
- Use strong passwords
- Enable SSL for database connections
- Regular backups
- Implement read replicas

### 4. API Security
- Rate limiting (implemented in nginx.prod.conf)
- JWT token expiration
- Input validation
- CORS configuration

### 5. Container Security
- Use official base images
- Scan images for vulnerabilities
- Run containers as non-root user
- Keep images updated

---

## Scaling & Performance

### Horizontal Scaling

#### Scale Backend Instances

```bash
# Docker Compose
docker-compose -f docker-compose.prod.yml up -d --scale backend=5

# Kubernetes
kubectl scale deployment backend --replicas=5 -n travelease
```

### Vertical Scaling

Update resource limits in `docker-compose.prod.yml`:

```yaml
deploy:
  resources:
    limits:
      cpus: '2'
      memory: 2G
```

### Database Optimization

1. **Enable Query Caching**
2. **Add Indexes**
3. **Use Connection Pooling**
4. **Implement Read Replicas**

### CDN Integration

Use CloudFlare or AWS CloudFront for static assets:

```nginx
# Update nginx.prod.conf
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    proxy_pass https://cdn.your-domain.com;
}
```

### Redis Caching

Add Redis for session and data caching:

```yaml
redis:
  image: redis:alpine
  ports:
    - "6379:6379"
  volumes:
    - redis_data:/data
```

---

## Backup & Disaster Recovery

### Database Backup

```bash
# Automated daily backup
0 2 * * * docker-compose -f /opt/travelease/docker-compose.prod.yml exec -T mysql mysqldump -u root -p$DB_ROOT_PASSWORD travelease_db > /backups/db_$(date +\%Y\%m\%d).sql
```

### Application Backup

```bash
# Backup application files
tar -czf travelease_backup_$(date +%Y%m%d).tar.gz /opt/travelease
```

---

## Health Checks & Alerts

### Setup Health Check Endpoints

Already implemented:
- Backend: `/api/health`
- Frontend: `/health`
- HAProxy Stats: `:8404/stats`

### Configure Alerts

Use UptimeRobot, Pingdom, or CloudWatch:
- Monitor endpoint availability
- Alert on 5xx errors
- Track response times
- Database connection status

---

## Cost Optimization

### Cloud Provider Comparison

| Provider | Monthly Cost (Estimate) |
|----------|------------------------|
| DigitalOcean Droplet | $12-24 |
| AWS EC2 t3.medium | $30-40 |
| Google Cloud Run | $10-20 |
| Azure Container Instances | $15-30 |

### Tips to Reduce Costs

1. Use spot instances (AWS)
2. Enable auto-scaling
3. Implement caching
4. Optimize images
5. Use CDN for static assets

---

## Troubleshooting

### Common Issues

#### Container Won't Start
```bash
docker-compose logs backend
docker-compose ps
```

#### Database Connection Failed
```bash
docker-compose exec mysql mysql -u root -p
SHOW DATABASES;
```

#### High Memory Usage
```bash
docker stats
# Adjust resource limits in docker-compose.prod.yml
```

---

## Support & Resources

- **Documentation:** [GitHub Wiki](https://github.com/iamjk304/ticket-booking-website/wiki)
- **Issues:** [GitHub Issues](https://github.com/iamjk304/ticket-booking-website/issues)
- **Docker Hub:** [Docker Documentation](https://docs.docker.com/)
- **Kubernetes:** [K8s Documentation](https://kubernetes.io/docs/)

---

Made with ❤️ by Bob