# 🔧 EC2 Connection Troubleshooting Guide

## Error: "Failed to connect to your instance - Error establishing SSH connection"

This error usually occurs due to security group misconfiguration or instance not being ready. Follow these steps:

---

## Solution 1: Check Security Group (Most Common Issue)

### Step 1: Go to Your EC2 Instance
1. Open [AWS EC2 Console](https://console.aws.amazon.com/ec2/)
2. Click **"Instances"** in left sidebar
3. Select your instance (checkbox)

### Step 2: Check Security Group
1. Scroll down to **"Security"** tab
2. Click on the security group name (blue link)
3. Click **"Edit inbound rules"**

### Step 3: Verify SSH Rule Exists
You should see a rule like this:

| Type | Protocol | Port Range | Source | Description |
|------|----------|------------|--------|-------------|
| SSH | TCP | 22 | 0.0.0.0/0 | Allow SSH from anywhere |

### Step 4: Add/Fix SSH Rule
If the SSH rule is missing or incorrect:

1. Click **"Add rule"**
2. **Type**: Select "SSH" from dropdown
3. **Protocol**: TCP (auto-filled)
4. **Port Range**: 22 (auto-filled)
5. **Source**: Select "Anywhere-IPv4" from dropdown
   - This will show: `0.0.0.0/0`
   - ⚠️ For better security, select "My IP" instead
6. **Description**: `SSH access`
7. Click **"Save rules"** (orange button at bottom)

---

## Solution 2: Wait for Instance to Be Fully Ready

### Check Instance Status
1. Go to EC2 Console → Instances
2. Select your instance
3. Check these indicators:

**Instance State:**
- Should be: **"Running"** (green dot)
- If "Pending": Wait 2-3 minutes

**Status Checks:**
- Should be: **"2/2 checks passed"** (green checkmark)
- If "Initializing": Wait 3-5 minutes
- Refresh the page every minute

**System Status:**
- Should show: "System reachability check passed"
- Should show: "Instance reachability check passed"

⏰ **Wait Time**: New instances take 2-5 minutes to fully initialize

---

## Solution 3: Use EC2 Instance Connect (Browser-Based)

This method works even if SSH from your computer doesn't:

### Step 1: Select Your Instance
1. Go to EC2 Console → Instances
2. Click on your instance (checkbox)

### Step 2: Connect via Browser
1. Click **"Connect"** button (top right, orange)
2. Choose **"EC2 Instance Connect"** tab
3. **User name**: Should be `ubuntu` (for Ubuntu AMI)
4. Click **"Connect"** button

### Step 3: If It Works
- You'll see a terminal in your browser
- You're now connected! ✅
- This means the instance is working, but your local SSH has issues

### Step 4: If It Still Fails
- Error means instance isn't ready yet
- Wait 5 more minutes
- Try again

---

## Solution 4: Check Instance Details

### Verify Instance Configuration
1. Select your instance
2. Check **"Details"** tab:

**Must Have:**
- ✅ **Public IPv4 address**: Should show an IP (like 3.85.123.45)
- ✅ **Public IPv4 DNS**: Should show a hostname
- ✅ **Key pair assigned**: Should show your key name

**If Missing Public IP:**
1. Instance was launched without public IP
2. You need to:
   - Stop the instance
   - Actions → Networking → Manage IP addresses
   - Enable "Auto-assign public IP"
   - Start the instance

---

## Solution 5: Verify AMI and Region

### Check You're Using Ubuntu
1. Select your instance
2. Look at **"AMI Name"** in Details tab
3. Should contain: "Ubuntu Server 22.04" or "Ubuntu Server 20.04"

### Check Correct Region
1. Look at top-right corner of AWS Console
2. Shows region like "N. Virginia" or "us-east-1"
3. Make sure you're in the same region where you created the instance

---

## Solution 6: Try Different Connection Methods

### Method A: EC2 Instance Connect (Easiest)
```
Already covered in Solution 3 above
```

### Method B: Session Manager (No SSH needed)
1. Go to EC2 Console
2. Select instance → Click "Connect"
3. Choose **"Session Manager"** tab
4. Click "Connect"
5. No security group changes needed!

### Method C: SSH from Local Computer

#### For Windows (PowerShell):
```powershell
# Navigate to where your key file is
cd Downloads

# Connect (replace with your IP)
ssh -i travelease-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

#### For Mac/Linux (Terminal):
```bash
# Set key permissions
chmod 400 ~/Downloads/travelease-key.pem

# Connect (replace with your IP)
ssh -i ~/Downloads/travelease-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

---

## Solution 7: Create New Instance (If Nothing Works)

If all else fails, create a fresh instance:

### Step 1: Terminate Old Instance
1. Select instance → Actions → Instance State → Terminate
2. Confirm termination

### Step 2: Launch New Instance with Correct Settings
1. Click **"Launch Instance"**
2. **Name**: `travelease-server-v2`
3. **AMI**: Ubuntu Server 22.04 LTS
4. **Instance type**: t2.micro (free tier) or t3.medium
5. **Key pair**: Use existing or create new
6. **Network settings**: Click "Edit"
   - ✅ **Auto-assign public IP**: ENABLE
   - ✅ **Allow SSH traffic from**: Anywhere (0.0.0.0/0)
   - ✅ **Allow HTTP traffic from**: Internet
   - ✅ **Allow HTTPS traffic from**: Internet
7. Click **"Launch instance"**
8. Wait 3-5 minutes
9. Try connecting again

---

## Quick Checklist

Before trying to connect, verify:

- [ ] Instance state is "Running" (green)
- [ ] Status checks show "2/2 checks passed"
- [ ] Instance has a Public IPv4 address
- [ ] Security group has SSH rule (port 22) from 0.0.0.0/0
- [ ] You waited at least 3-5 minutes after launch
- [ ] You're in the correct AWS region
- [ ] You're using the correct username (`ubuntu` for Ubuntu)

---

## Still Not Working?

### Try This Diagnostic:
1. Go to EC2 Console
2. Select your instance
3. Click **"Actions"** → **"Monitor and troubleshoot"** → **"Get system log"**
4. Look for any error messages
5. Share the last 20 lines if you need help

### Common Issues:
- **"No route to host"**: Security group blocking
- **"Connection refused"**: SSH service not started (wait longer)
- **"Permission denied"**: Wrong key file or username
- **"Connection timed out"**: Security group or network issue

---

## Next Steps After Successful Connection

Once you can connect:

1. ✅ Update system: `sudo apt update && sudo apt upgrade -y`
2. ✅ Install Docker: `curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh`
3. ✅ Install Docker Compose
4. ✅ Clone your repository
5. ✅ Deploy your application

Refer to **AWS_SETUP_GUIDE.md** for complete deployment steps.

---

## Need More Help?

**AWS Support Resources:**
- [EC2 Troubleshooting Guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/TroubleshootingInstancesConnecting.html)
- [Security Groups Guide](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)
- AWS Support (if you have a support plan)

**Common Questions:**
- Q: How long should I wait? A: 5 minutes minimum
- Q: Can I use PuTTY? A: Yes, but EC2 Instance Connect is easier
- Q: Is my key file wrong? A: Try EC2 Instance Connect first to rule this out

---

Made with ❤️ to help you connect successfully!