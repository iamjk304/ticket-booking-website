# 📦 GitHub Setup Guide

This guide will help you push your TravelEase ticket booking website to GitHub.

## Prerequisites

- Git installed on your computer ([Download Git](https://git-scm.com/downloads))
- A GitHub account ([Sign up](https://github.com/join))

## Step-by-Step Instructions

### 1. Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and log in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `ticket-booking-website` (or your preferred name)
   - **Description**: "A modern flight and train ticket booking website built with HTML, CSS, and JavaScript"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

### 2. Initialize Git in Your Project (Windows PowerShell)

Open PowerShell in the project directory and run these commands:

```powershell
# Navigate to the project directory
cd C:\Users\JaykishanVishwakarma\Desktop\ticket-booking-website

# Initialize Git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: Complete ticket booking website"

# Rename branch to main (if needed)
git branch -M main

# Add your GitHub repository as remote (replace with your actual repository URL)
git remote add origin https://github.com/YOUR_USERNAME/ticket-booking-website.git

# Push to GitHub
git push -u origin main
```

### 3. Replace YOUR_USERNAME

In the command above, replace `YOUR_USERNAME` with your actual GitHub username.

For example, if your username is `johndoe`, the command would be:
```powershell
git remote add origin https://github.com/johndoe/ticket-booking-website.git
```

### 4. Authentication

When you push for the first time, Git will ask for authentication:

**Option A: Personal Access Token (Recommended)**
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name and select scopes: `repo` (full control)
4. Copy the token
5. Use this token as your password when Git prompts

**Option B: GitHub CLI**
```powershell
# Install GitHub CLI (if not installed)
winget install --id GitHub.cli

# Authenticate
gh auth login
```

### 5. Verify Upload

After pushing, visit your repository URL:
```
https://github.com/YOUR_USERNAME/ticket-booking-website
```

You should see all your files uploaded!

## 🌐 Enable GitHub Pages (Optional)

To host your website for free on GitHub Pages:

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait a few minutes, then visit:
   ```
   https://YOUR_USERNAME.github.io/ticket-booking-website/
   ```

Your website is now live! 🎉

## 📝 Future Updates

When you make changes to your code:

```powershell
# Check status of changes
git status

# Add all changed files
git add .

# Commit with a descriptive message
git commit -m "Description of your changes"

# Push to GitHub
git push
```

## 🔧 Common Git Commands

```powershell
# Check current status
git status

# View commit history
git log --oneline

# Create a new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Merge a branch
git merge feature-name

# Pull latest changes
git pull

# View remote repositories
git remote -v

# Clone repository to another location
git clone https://github.com/YOUR_USERNAME/ticket-booking-website.git
```

## 🐛 Troubleshooting

### Problem: "fatal: not a git repository"
**Solution**: Make sure you're in the correct directory and have run `git init`

### Problem: "remote origin already exists"
**Solution**: Remove and re-add the remote:
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/ticket-booking-website.git
```

### Problem: "failed to push some refs"
**Solution**: Pull first, then push:
```powershell
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Problem: Authentication failed
**Solution**: Use a Personal Access Token instead of password (see Step 4)

## 📚 Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

## 🎯 Quick Start (Copy-Paste Ready)

Here's a complete script you can copy and paste (remember to replace YOUR_USERNAME):

```powershell
# Navigate to project
cd C:\Users\JaykishanVishwakarma\Desktop\ticket-booking-website

# Initialize and push
git init
git add .
git commit -m "Initial commit: Complete ticket booking website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ticket-booking-website.git
git push -u origin main
```

## ✅ Checklist

Before pushing to GitHub, make sure:

- [ ] All files are saved
- [ ] .gitignore is in place
- [ ] README.md is complete
- [ ] No sensitive data (API keys, passwords) in code
- [ ] Code is tested and working
- [ ] Repository name is correct
- [ ] GitHub repository is created
- [ ] Git is installed on your system

---

**Need Help?** Open an issue on GitHub or check the [Git documentation](https://git-scm.com/doc).

Good luck! 🚀