#!/bin/bash
# CloudWatch Alarms Setup Script for TravelEase

echo "🚨 Creating CloudWatch Alarms for TravelEase..."

# Get the SNS Topic ARN
SNS_TOPIC_ARN=$(aws sns list-topics --query "Topics[?contains(TopicArn, 'TravelEase-Alerts')].TopicArn" --output text)

if [ -z "$SNS_TOPIC_ARN" ]; then
    echo "❌ Error: TravelEase-Alerts SNS topic not found!"
    echo "Please create the SNS topic first."
    exit 1
fi

echo "✅ Found SNS Topic: $SNS_TOPIC_ARN"

# Get Instance ID
INSTANCE_ID=$(ec2-metadata --instance-id | cut -d " " -f 2)
echo "✅ Instance ID: $INSTANCE_ID"

# Get hostname
HOSTNAME=$(hostname)
echo "✅ Hostname: $HOSTNAME"

echo ""
echo "Creating alarms..."
echo ""

# Alarm 1: High CPU Usage (when idle < 20%, meaning usage > 80%)
echo "1️⃣ Creating High CPU Usage Alarm..."
aws cloudwatch put-metric-alarm \
    --alarm-name "TravelEase-High-CPU-Usage" \
    --alarm-description "Alert when CPU usage exceeds 80%" \
    --actions-enabled \
    --alarm-actions "$SNS_TOPIC_ARN" \
    --metric-name cpu_usage_idle \
    --namespace TravelEase/EC2 \
    --statistic Average \
    --dimensions Name=host,Value=$HOSTNAME \
    --period 300 \
    --evaluation-periods 2 \
    --threshold 20 \
    --comparison-operator LessThanThreshold \
    --treat-missing-data notBreaching

if [ $? -eq 0 ]; then
    echo "✅ High CPU alarm created successfully!"
else
    echo "❌ Failed to create High CPU alarm"
fi

echo ""

# Alarm 2: High Memory Usage (when memory > 80%)
echo "2️⃣ Creating High Memory Usage Alarm..."
aws cloudwatch put-metric-alarm \
    --alarm-name "TravelEase-High-Memory-Usage" \
    --alarm-description "Alert when Memory usage exceeds 80%" \
    --actions-enabled \
    --alarm-actions "$SNS_TOPIC_ARN" \
    --metric-name mem_used_percent \
    --namespace TravelEase/EC2 \
    --statistic Average \
    --dimensions Name=host,Value=$HOSTNAME \
    --period 300 \
    --evaluation-periods 2 \
    --threshold 80 \
    --comparison-operator GreaterThanThreshold \
    --treat-missing-data notBreaching

if [ $? -eq 0 ]; then
    echo "✅ High Memory alarm created successfully!"
else
    echo "❌ Failed to create High Memory alarm"
fi

echo ""

# Alarm 3: Low Disk Space (when disk usage > 80%)
echo "3️⃣ Creating Low Disk Space Alarm..."
aws cloudwatch put-metric-alarm \
    --alarm-name "TravelEase-Low-Disk-Space" \
    --alarm-description "Alert when Disk usage exceeds 80%" \
    --actions-enabled \
    --alarm-actions "$SNS_TOPIC_ARN" \
    --metric-name used_percent \
    --namespace TravelEase/EC2 \
    --statistic Average \
    --dimensions Name=device,Value=nvme0n1p1 Name=fstype,Value=ext4 Name=host,Value=$HOSTNAME Name=path,Value=/ \
    --period 300 \
    --evaluation-periods 2 \
    --threshold 80 \
    --comparison-operator GreaterThanThreshold \
    --treat-missing-data notBreaching

if [ $? -eq 0 ]; then
    echo "✅ Low Disk Space alarm created successfully!"
else
    echo "❌ Failed to create Low Disk Space alarm"
fi

echo ""
echo "🎉 CloudWatch Alarms Setup Complete!"
echo ""
echo "📊 Summary:"
echo "  ✅ High CPU Usage Alarm (triggers when CPU > 80%)"
echo "  ✅ High Memory Usage Alarm (triggers when Memory > 80%)"
echo "  ✅ Low Disk Space Alarm (triggers when Disk > 80%)"
echo ""
echo "📧 Email notifications will be sent to your confirmed email address"
echo ""
echo "🔍 View alarms at: https://console.aws.amazon.com/cloudwatch/home#alarmsV2:"
echo ""

# Made with Bob
