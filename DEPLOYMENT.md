# 🚀 Deployment Guide - Djedi Breeez Website

## Overview
This guide will help you deploy your Djedi Breeez website to Cloudflare Pages through GitHub.

---

## 📋 Prerequisites

### 1. GitHub Personal Access Token
- Go to: https://github.com/settings/tokens
- Click **"Generate new token (classic)"**
- Name: `DjediBreeez Deploy`
- Scopes: Check **"repo"** (full control of private repositories)
- Click **"Generate token"**
- **COPY THE TOKEN** - You won't see it again!

### 2. Cloudflare Account
- Sign up at: https://dash.cloudflare.com/sign-up
- Verify your email

### 3. Cloudflare API Token
- Go to: https://dash.cloudflare.com/profile/api-tokens
- Click **"Create Token"**
- Use **"Edit Cloudflare Workers"** template
- Or create custom token with these permissions:
  - Account > Cloudflare Pages > Edit
  - Zone > DNS > Edit (optional)
- Click **"Create Token"**
- **COPY THE TOKEN**

---

## 🔄 Step 1: Push to GitHub

### Option A: Using the Deploy Script (In Sandbox)

```bash
cd /home/user/webapp
./deploy.sh
```

When prompted, paste your GitHub Personal Access Token.

### Option B: Manual Git Push (In Sandbox)

```bash
cd /home/user/webapp

# Configure git
git config user.email "your-email@example.com"
git config user.name "Your Name"

# Push with token in URL (replace YOUR_TOKEN)
git remote set-url origin https://YOUR_TOKEN@github.com/hkenshard/DjediBreeez.git
git push -u origin main --force
```

### Option C: Push from Your Local Computer

```bash
# Clone the repository
git clone https://github.com/hkenshard/DjediBreeez.git
cd DjediBreeez

# Copy all files from the sandbox to this directory
# (Download from sandbox or use the files you have)

git add .
git commit -m "Add Djedi Breeez website"
git push origin main
```

---

## ☁️ Step 2: Deploy to Cloudflare Pages

### Method 1: Via Cloudflare Dashboard (Easiest)

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com
   - Select your account
   - Go to **"Workers & Pages"**

2. **Create Pages Project**
   - Click **"Create application"**
   - Select **"Pages"** tab
   - Click **"Connect to Git"**

3. **Connect GitHub Repository**
   - Authorize Cloudflare to access GitHub
   - Select repository: **"hkenshard/DjediBreeez"**
   - Click **"Begin setup"**

4. **Configure Build Settings**
   ```
   Project name: djedibreeez (or your choice)
   Production branch: main
   Framework preset: None
   Build command: npm run build
   Build output directory: dist
   ```

5. **Environment Variables** (Optional)
   - No environment variables needed for basic deployment

6. **Deploy**
   - Click **"Save and Deploy"**
   - Wait for build to complete (2-3 minutes)
   - Your site will be live at: `https://djedibreeez.pages.dev`

### Method 2: Via Wrangler CLI (Advanced)

First, set up Cloudflare authentication in sandbox:

```bash
# In the sandbox, if you have the Cloudflare API token
export CLOUDFLARE_API_TOKEN="your-api-token-here"

# Or add to .dev.vars file
echo "CLOUDFLARE_API_TOKEN=your-token" > .dev.vars
```

Then deploy:

```bash
cd /home/user/webapp

# Install dependencies (if not already done)
npm install

# Build the project
npm run build

# Login to Wrangler
npx wrangler login
# This will open a browser - authorize Cloudflare

# Create Pages project (first time only)
npx wrangler pages project create djedibreeez --production-branch main

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name djedibreeez
```

---

## 🎯 Step 3: Configure Custom Domain (Optional)

### In Cloudflare Dashboard:

1. Go to your Pages project
2. Click **"Custom domains"**
3. Click **"Set up a custom domain"**
4. Enter your domain (e.g., `djedibreeez.com`)
5. Follow DNS setup instructions
6. Wait for DNS propagation (can take up to 24 hours)

---

## 🔐 Step 4: Set Environment Variables (For Future Features)

When you add payment processing or email services:

### Via Cloudflare Dashboard:
1. Go to your Pages project
2. Click **"Settings"** > **"Environment variables"**
3. Add variables:
   - `STRIPE_SECRET_KEY`
   - `EMAIL_API_KEY`
   - etc.

### Via Wrangler CLI:
```bash
npx wrangler pages secret put STRIPE_SECRET_KEY --project-name djedibreeez
npx wrangler pages secret put EMAIL_API_KEY --project-name djedibreeez
```

---

## 📝 Deployment Checklist

- [ ] GitHub Personal Access Token created
- [ ] Code pushed to GitHub repository
- [ ] Cloudflare account created
- [ ] Cloudflare Pages project created
- [ ] GitHub repository connected to Cloudflare
- [ ] Build settings configured
- [ ] First deployment successful
- [ ] Site accessible at `*.pages.dev` URL
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic)

---

## 🔄 Future Updates

After initial deployment, any push to GitHub will automatically trigger a new deployment:

```bash
cd /home/user/webapp

# Make your changes to src/index.tsx or other files

# Commit and push
git add .
git commit -m "Update website"
git push origin main
```

Cloudflare will automatically:
1. Detect the push
2. Build your project
3. Deploy the new version
4. Update your live site

---

## 🐛 Troubleshooting

### Build Fails on Cloudflare

**Check build settings:**
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: 18 or higher

**Common issues:**
- Missing dependencies: Add to `package.json`
- Build timeout: Optimize build process
- Environment variables: Check if needed for build

### Site Not Loading

**Check:**
1. Build completed successfully
2. DNS configured correctly (if using custom domain)
3. SSL certificate issued (automatic, may take a few minutes)
4. No errors in Cloudflare Pages logs

### Git Push Fails

**Solutions:**
- Check GitHub token is valid and has `repo` scope
- Ensure token is not expired
- Try force push: `git push -f origin main`
- Check repository exists and you have access

---

## 📞 Support Resources

- **Cloudflare Pages Docs**: https://developers.cloudflare.com/pages/
- **Cloudflare Community**: https://community.cloudflare.com/
- **GitHub Docs**: https://docs.github.com/
- **Wrangler Docs**: https://developers.cloudflare.com/workers/wrangler/

---

## 🎉 Success!

Once deployed, your site will be live at:
- **Cloudflare URL**: `https://djedibreeez.pages.dev`
- **Custom Domain**: `https://yourdomain.com` (if configured)

**Features:**
- ✅ Global CDN (super fast worldwide)
- ✅ Automatic HTTPS/SSL
- ✅ Automatic deployments from GitHub
- ✅ Preview deployments for branches
- ✅ Free hosting (generous limits)
- ✅ DDoS protection
- ✅ Analytics available

---

## 📊 Your URLs

- **Repository**: https://github.com/hkenshard/DjediBreeez
- **Live Site**: Will be `https://djedibreeez.pages.dev` after deployment
- **Cloudflare Dashboard**: https://dash.cloudflare.com

---

**Ready to go live? Follow the steps above!** 🚀✨
