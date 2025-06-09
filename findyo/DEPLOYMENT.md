# Findyo Deployment Guide

## Quick Start for GitHub Deployment

### 1. Create a New Repository on GitHub
1. Go to GitHub.com and create a new repository named `findyo`
2. **Do NOT initialize with README, .gitignore, or license** (we already have these)

### 2. Update Configuration
1. Open `package.json` and replace `yourusername` in the homepage field with your actual GitHub username:
   ```json
   "homepage": "https://YOUR_GITHUB_USERNAME.github.io/findyo"
   ```

### 3. Add Your Google Maps API Key to GitHub Secrets
1. Go to your repository on GitHub
2. Click Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `REACT_APP_GOOGLE_MAPS_API_KEY`
5. Value: Your Google Maps API key from the `.env` file

### 4. Push to GitHub
```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/findyo.git
git branch -M main
git push -u origin main
```

### 5. Enable GitHub Pages
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: Select `gh-pages` (will be created automatically after first deployment)
4. Click Save

### 6. Wait for Deployment
- The GitHub Action will automatically build and deploy your app
- Check the Actions tab to see deployment progress
- Your app will be live at: `https://YOUR_GITHUB_USERNAME.github.io/findyo`

## Manual Deployment (Alternative)
If you prefer manual deployment:
```bash
npm run deploy
```

## Environment Variables
- The app works without Google Maps API key (shows placeholder)
- For full functionality, add your API key to GitHub Secrets
- Local development: copy `.env.example` to `.env` and add your key

## Troubleshooting
- If deployment fails, check the Actions tab for error logs
- Ensure your API key is correctly set in GitHub Secrets
- Make sure the homepage URL in package.json matches your repository
