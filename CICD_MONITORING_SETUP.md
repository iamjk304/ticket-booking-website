# 🚀 CI/CD Pipeline & Monitoring Setup Guide

Complete guide to set up automated deployments and monitoring for TravelEase.

---

## Part 1: CI/CD Pipeline Setup (GitHub Actions)

### Step 1: Configure GitHub Secrets

1. **Go to your GitHub repository**
   - Navigate to: `https://github.com/iamjk304/ticket-booking-website`

2. **Click Settings → Secrets and variables → Actions**

3. **Add these secrets** (Click "New repository secret" for each):

#### Secret 1: EC2_SSH_KEY
- **Name**: `EC2_SSH_KEY`
- **Value**: Your EC2 private key content
  
**How to get it:**
```bash
# On your local computer where you have the .pem file
cat ~/Downloads/travelease-key.pem
```
Copy the entire output (including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`)

#### Secret 2: EC2_HOST
- **Name**: `EC2_HOST`
- **Value**: Your EC2 public IP address (e.g., `3.85.123.45`)

**How to get it:**
- Go to AWS EC2 Console
- Select your instance
- Copy the "Public IPv4 address"

#### Secret 3: EC2_USER
- **Name**: `EC2_USER`
- **Value**: `ubuntu`

#### Secret 4: DB_PASSWORD
- **Name**: `DB_PASSWORD`
- **Value**: `SecurePass123` (or your actual password)

#### Secret 5: DB_ROOT_PASSWORD
- **Name**: `DB_ROOT_PASSWORD`
- **Value**: `SecureRootPass123` (or your actual root password)

#### Secret 6: JWT_SECRET
- **Name**: `JWT_SECRET`
- **Value**: `your_secret_key_123` (or generate a random one)

---

### Step 2: Push GitHub Actions Workflow

The workflow file is already created at `.github/workflows/deploy.yml`

**Commit and push it:**

```bash
# On your local computer
cd ticket-booking-website

git add .github/workflows/deploy.yml
git add backend/Dockerfile
git add docker-compose.simple.yml
git commit -m "Add CI/CD pipeline with GitHub Actions"
git push origin main
```

---

### Step 3: Verify CI/CD Pipeline

1. **Go to GitHub → Actions tab**
2. You should see the workflow running
3. It will:
   - ✅ Run tests
   - ✅ Build Docker images
   - ✅ Deploy to EC2 automatically

**From now on:**
- Every push to `main` branch = automatic deployment! 🎉
- No more manual SSH and docker commands!

---

## Part 2: CloudWatch Monitoring Setup

### Step 1: Create IAM Role for EC2

1. **Go to AWS IAM Console**
   - Search for "IAM" in AWS Console

2. **Create Role**
   - Click "Roles" → "Create role"
   - **Trusted entity type**: AWS service
   - **Use case**: EC2
   - Click "Next"

3. **Add Permissions**
   - Search and select these policies:
     - ✅ `CloudWatchAgentServerPolicy`
     - ✅ `AmazonSSMManagedInstanceCore`
   - Click "Next"

4. **Name the Role**
   - **Role name**: `TravelEase-EC2-CloudWatch-Role`
   - Click "Create role"

5. **Attach Role to EC2 Instance**
   - Go to EC2 Console
   - Select your instance
   - Actions → Security → Modify IAM role
   - Select `TravelEase-EC2-CloudWatch-Role`
   - Click "Update IAM role"

---

### Step 2: Install CloudWatch Agent on EC2

**SSH into your EC2 instance**, then run:

```bash
# Download and run the setup script
cd /opt/travelease
curl -O https://raw.githubusercontent.com/iamjk304/ticket-booking-website/main/cloudwatch-setup.sh
chmod +x cloudwatch-setup.sh
sudo ./cloudwatch-setup.sh
```

**Or manually:**

```bash
# Download CloudWatch Agent
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb

# Install
sudo dpkg -i -E ./amazon-cloudwatch-agent.deb

# Create config directory
sudo mkdir -p /opt/aws/amazon-cloudwatch-agent/etc/

# Create configuration file
sudo nano /opt/aws/amazon-cloudwatch-agent/etc/config.json
```

**Paste this configuration:**

```json
{
  "agent": {
    "metrics_collection_interval": 60,
    "run_as_user": "root"
  },
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/log/syslog",
            "log_group_name": "/aws/ec2/travelease/syslog",
            "log_stream_name": "{instance_id}",
            "retention_in_days": 7
          }
        ]
      }
    }
  },
  "metrics": {
    "namespace": "TravelEase/EC2",
    "metrics_collected": {
      "cpu": {
        "measurement": [
          {"name": "cpu_usage_idle", "unit": "Percent"}
        ],
        "metrics_collection_interval": 60
      },
      "disk": {
        "measurement": [
          {"name": "used_percent", "unit": "Percent"}
        ],
        "metrics_collection_interval": 60,
        "resources": ["*"]
      },
      "mem": {
        "measurement": [
          {"name": "mem_used_percent", "unit": "Percent"}
        ],
        "metrics_collection_interval": 60
      }
    }
  }
}
```

**Start CloudWatch Agent:**

```bash
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
    -a fetch-config \
    -m ec2 \
    -s \
    -c file:/opt/aws/amazon-cloudwatch-agent/etc/config.json
```

---

### Step 3: Create CloudWatch Alarms

1. **Go to CloudWatch Console**
   - Search for "CloudWatch" in AWS Console

2. **Create CPU Alarm**
   - Click "Alarms" → "Create alarm"
   - Click "Select metric"
   - Choose "TravelEase/EC2" → Select your instance
   - Select "CPU_IDLE"
   - **Conditions**: Lower than 20 (means CPU usage > 80%)
   - **Period**: 5 minutes
   - Click "Next"

3. **Configure Notifications**
   - **Create new topic**: `TravelEase-Alerts`
   - **Email**: your-email@example.com
   - Click "Create topic"
   - **Check your email and confirm subscription!**

4. **Name the Alarm**
   - **Alarm name**: `TravelEase-High-CPU`
   - Click "Create alarm"

5. **Repeat for Memory Alarm**
   - Metric: `MEMORY_USED`
   - Threshold: Greater than 80
   - Name: `TravelEase-High-Memory`

6. **Create Disk Space Alarm**
   - Metric: `DISK_USED`
   - Threshold: Greater than 80
   - Name: `TravelEase-Low-Disk-Space`

---

### Step 4: Set Up Application Logging

**Add logging to your backend:**

```bash
# SSH to EC2
cd /opt/travelease/backend

# Install Winston logger
npm install winston winston-daily-rotate-file
```

**Create logging configuration** (already in your backend if using the template)

---

### Step 5: View Metrics & Logs

#### View Metrics:
1. Go to CloudWatch Console
2. Click "Metrics" → "All metrics"
3. Select "TravelEase/EC2"
4. View CPU, Memory, Disk usage graphs

#### View Logs:
1. Go to CloudWatch Console
2. Click "Log groups"
3. Select `/aws/ec2/travelease/syslog`
4. View real-time logs

#### Create Dashboard:
1. CloudWatch → Dashboards → Create dashboard
2. Name: `TravelEase-Monitoring`
3. Add widgets for:
   - CPU Usage
   - Memory Usage
   - Disk Usage
   - Network Traffic
   - Application Errors

---

## Part 3: Automated Backups

### Database Backup Script

**Create backup script on EC2:**

```bash
sudo nano /opt/travelease/backup.sh
```

**Add this content:**

```bash
#!/bin/bash
# TravelEase Database Backup Script

BACKUP_DIR="/opt/travelease/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/travelease_db_$DATE.sql"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
docker-compose -f /opt/travelease/docker-compose.simple.yml exec -T mysql \
    mysqldump -u root -pSecureRootPass123 travelease_db > $BACKUP_FILE

# Compress backup
gzip $BACKUP_FILE

# Delete backups older than 7 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete

echo "Backup completed: ${BACKUP_FILE}.gz"

# Optional: Upload to S3
# aws s3 cp ${BACKUP_FILE}.gz s3://your-bucket/backups/
```

**Make it executable:**

```bash
chmod +x /opt/travelease/backup.sh
```

**Schedule daily backups:**

```bash
crontab -e
```

**Add this line (runs daily at 2 AM):**

```
0 2 * * * /opt/travelease/backup.sh >> /var/log/travelease-backup.log 2>&1
```

---

## Testing Everything

### Test CI/CD Pipeline:

```bash
# Make a small change
echo "# Test CI/CD" >> README.md

# Commit and push
git add README.md
git commit -m "Test CI/CD pipeline"
git push origin main

# Watch deployment in GitHub Actions tab
```

### Test CloudWatch Monitoring:

```bash
# Generate high CPU load (for testing)
stress --cpu 4 --timeout 60s

# Check CloudWatch metrics (wait 1-2 minutes)
# You should see CPU spike in CloudWatch dashboard
```

### Test Backup:

```bash
# Run backup manually
sudo /opt/travelease/backup.sh

# Check if backup was created
ls -lh /opt/travelease/backups/
```

---

## Success Checklist

### CI/CD Pipeline:
- [ ] GitHub Secrets configured
- [ ] Workflow file pushed to repository
- [ ] First deployment successful
- [ ] Automatic deployment on push works

### Monitoring:
- [ ] IAM role attached to EC2
- [ ] CloudWatch Agent installed
- [ ] Metrics visible in CloudWatch
- [ ] Alarms created
- [ ] Email notifications configured
- [ ] Dashboard created

### Backups:
- [ ] Backup script created
- [ ] Cron job scheduled
- [ ] Test backup successful
- [ ] Old backups auto-deleted

---

## Troubleshooting

### CI/CD Issues:

**Deployment fails:**
```bash
# Check GitHub Actions logs
# Verify secrets are correct
# Ensure EC2 security group allows SSH from GitHub IPs
```

**Can't connect to EC2:**
```bash
# Verify EC2_SSH_KEY secret is correct
# Check EC2 security group allows port 22
```

### CloudWatch Issues:

**No metrics showing:**
```bash
# Check IAM role is attached
sudo systemctl status amazon-cloudwatch-agent
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a query -m ec2 -c default -s
```

**Agent not running:**
```bash
sudo systemctl start amazon-cloudwatch-agent
sudo systemctl enable amazon-cloudwatch-agent
```

---

## Cost Estimation

### CloudWatch Costs:
- Metrics: ~$0.30/month (10 custom metrics)
- Logs: ~$0.50/month (1 GB ingestion)
- Alarms: $0.10/alarm/month
- **Total**: ~$1-2/month

### GitHub Actions:
- Free for public repositories
- 2,000 minutes/month for private repos
- **Total**: $0 (for public repo)

---

## Next Steps

After completing CI/CD and Monitoring:

1. ✅ Set up SSL certificate (HTTPS)
2. ✅ Configure custom domain
3. ✅ Implement rate limiting
4. ✅ Add application performance monitoring (APM)
5. ✅ Set up log aggregation (ELK stack)

---

## Support Resources

- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **CloudWatch Docs**: https://docs.aws.amazon.com/cloudwatch/
- **Troubleshooting**: Check logs in CloudWatch or GitHub Actions

---

🎉 **Congratulations!** You now have:
- ✅ Automated CI/CD pipeline
- ✅ Real-time monitoring
- ✅ Automated backups
- ✅ Alert notifications

Your DevOps setup is production-ready! 🚀

---

Made with ❤️ for TravelEase DevOps