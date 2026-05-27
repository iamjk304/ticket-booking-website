# 🚀 Deploy to GitHub - Complete Guide

This guide provides step-by-step instructions to push your complete ticket booking website to GitHub.

## 📋 Prerequisites

1. **Git installed** - Check with: `git --version`
2. **GitHub account** - Sign up at https://github.com
3. **Project ready** - All files in `ticket-booking-website` folder

## 🎯 Quick Start (Copy & Paste Commands)

### Step 1: Initialize Git Repository

Open terminal/command prompt in the `ticket-booking-website` folder and run:

```bash
# Initialize git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: Complete ticket booking website with backend"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name**: `ticket-booking-website` (or your preferred name)
3. **Description**: "Full-stack flight and train ticket booking system with Node.js backend"
4. **Visibility**: Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

### Step 3: Connect to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add GitHub as remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ticket-booking-website.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Example with actual username:**
```bash
git remote add origin https://github.com/johndoe/ticket-booking-website.git
git branch -M main
git push -u origin main
```

### Step 4: Verify Upload

1. Go to your GitHub repository URL
2. Refresh the page
3. You should see all your files!

## 🌐 Deploy Frontend to GitHub Pages (Optional)

GitHub Pages allows you to host the frontend for free!

### Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes
7. Your site will be live at: `https://YOUR_USERNAME.github.io/ticket-booking-website/`

### Important Notes for GitHub Pages

**Frontend works immediately** - The HTML/CSS/JS will work right away with sample data.

**Backend requires separate hosting** - GitHub Pages only hosts static files. For the backend:
- Deploy backend to Heroku, Railway, or AWS
- Update `js/api-config.js` with your backend URL

## 📝 Complete Command Reference

### Initial Setup
```bash
# Navigate to project folder
cd ticket-booking-website

# Initialize git
git init

# Check status
git status

# Add all files
git add .

# Commit
git commit -m "Initial commit: Complete ticket booking website with backend"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/ticket-booking-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Future Updates
```bash
# Check what changed
git status

# Add specific files
git add filename.html

# Or add all changes
git add .

# Commit with message
git commit -m "Description of changes"

# Push to GitHub
git push
```

### Common Git Commands
```bash
# View commit history
git log

# View remote URL
git remote -v

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Merge branch
git merge feature-name

# Pull latest changes
git pull

# Clone repository
git clone https://github.com/YOUR_USERNAME/ticket-booking-website.git
```

## 🔧 Troubleshooting

### Issue: "git: command not found"
**Solution**: Install Git from https://git-scm.com/downloads

### Issue: "Permission denied (publickey)"
**Solution**: Use HTTPS instead of SSH, or set up SSH keys:
```bash
# Use HTTPS URL
git remote set-url origin https://github.com/YOUR_USERNAME/ticket-booking-website.git
```

### Issue: "Repository not found"
**Solution**: 
1. Check repository name is correct
2. Verify you're logged into GitHub
3. Ensure repository exists

### Issue: "Failed to push"
**Solution**:
```bash
# Pull first, then push
git pull origin main --allow-unrelated-histories
git push origin main
```

### Issue: "Large files warning"
**Solution**: 
- GitHub has 100MB file limit
- Our project is well under this limit
- If you added large files, remove them:
```bash
git rm --cached large-file.zip
git commit -m "Remove large file"
```

## 📦 What Gets Uploaded

### Included Files (✅)
- All HTML files (5 pages)
- All CSS files (2 files)
- All JavaScript files (7 files)
- Backend code (20+ files)
- Documentation (6 markdown files)
- Configuration files (.gitignore, package.json)

### Excluded Files (❌)
- `node_modules/` - Dependencies (too large)
- `.env` - Sensitive credentials
- `.DS_Store` - Mac system files
- `*.log` - Log files

These are excluded via `.gitignore` file.

## 🎨 Customize Repository

### Add Repository Description
1. Go to repository on GitHub
2. Click ⚙️ (Settings) icon next to About
3. Add description: "Full-stack ticket booking system"
4. Add topics: `javascript`, `nodejs`, `express`, `mysql`, `booking-system`
5. Add website URL (if deployed)

### Add README Badge
Add this to top of README.md:
```markdown
![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/ticket-booking-website)
![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/ticket-booking-website)
![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/ticket-booking-website)
```

### Create Releases
1. Go to **Releases** tab
2. Click **Create a new release**
3. Tag: `v1.0.0`
4. Title: "Initial Release - Full-Stack Booking System"
5. Description: List features
6. Click **Publish release**

## 🚀 Deploy Backend (Separate from GitHub Pages)

### Option 1: Heroku (Recommended)

```bash
# Install Heroku CLI
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add PostgreSQL database
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set JWT_SECRET=your_secret_key
heroku config:set NODE_ENV=production

# Deploy
git subtree push --prefix backend heroku main

# Or if that doesn't work:
cd backend
git init
git add .
git commit -m "Backend deployment"
heroku git:remote -a your-app-name
git push heroku main

# Initialize database
heroku run npm run init-db

# View logs
heroku logs --tail
```

### Option 2: Railway

1. Go to https://railway.app
2. Sign in with GitHub
3. Click **New Project**
4. Select **Deploy from GitHub repo**
5. Choose your repository
6. Add PostgreSQL database
7. Set environment variables
8. Deploy automatically

### Option 3: Render

1. Go to https://render.com
2. Sign in with GitHub
3. Click **New +** → **Web Service**
4. Connect your repository
5. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add PostgreSQL database
7. Set environment variables
8. Deploy

## 🔗 Update Frontend API URL

After deploying backend, update `js/api-config.js`:

```javascript
const API_CONFIG = {
    // Change this to your deployed backend URL
    BASE_URL: 'https://your-app-name.herokuapp.com/api',
    // ... rest of config
};
```

Then commit and push:
```bash
git add js/api-config.js
git commit -m "Update API URL to production backend"
git push
```

## 📊 Repository Structure on GitHub

```
ticket-booking-website/
├── 📄 README.md
├── 📄 LICENSE (optional)
├── 📁 .github/
│   └── workflows/ (optional - CI/CD)
├── 📁 css/
├── 📁 js/
├── 📁 backend/
├── 📄 index.html
└── ... (all other files)
```

## ✅ Verification Checklist

After pushing to GitHub, verify:

- [ ] All files are visible on GitHub
- [ ] README.md displays correctly
- [ ] .gitignore is working (node_modules not uploaded)
- [ ] Repository description is set
- [ ] Topics/tags are added
- [ ] GitHub Pages is enabled (if using)
- [ ] Backend is deployed separately (if using)
- [ ] API URL is updated in frontend
- [ ] Website is accessible

## 🎉 Success!

Your complete ticket booking website is now on GitHub! 

**Repository URL**: `https://github.com/YOUR_USERNAME/ticket-booking-website`

**GitHub Pages URL** (if enabled): `https://YOUR_USERNAME.github.io/ticket-booking-website/`

## 📚 Next Steps

1. **Share your project** - Add link to portfolio/resume
2. **Get feedback** - Share with friends/community
3. **Add features** - Implement enhancements from PROJECT_SUMMARY.md
4. **Write blog post** - Document your development journey
5. **Create video demo** - Record walkthrough of features

## 💡 Pro Tips

1. **Commit often** - Small, frequent commits are better
2. **Write clear messages** - Describe what changed and why
3. **Use branches** - Create feature branches for new work
4. **Review before push** - Check `git status` and `git diff`
5. **Keep README updated** - Document new features
6. **Add screenshots** - Visual documentation helps users
7. **Tag releases** - Version your major updates
8. **Monitor issues** - Respond to user feedback

## 🆘 Need Help?

- **Git Documentation**: https://git-scm.com/doc
- **GitHub Guides**: https://guides.github.com
- **GitHub Support**: https://support.github.com
- **Stack Overflow**: Search for specific errors

---

**Happy Coding! 🚀**

Remember: Your first push might take a few minutes. Be patient!