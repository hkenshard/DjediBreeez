#!/bin/bash

# GitHub Deployment Script
# This script will push your code to GitHub

echo "🚀 Deploying Djedi Breeez to GitHub..."
echo ""
echo "⚠️  You'll need a GitHub Personal Access Token"
echo ""
echo "To create one:"
echo "1. Go to https://github.com/settings/tokens"
echo "2. Click 'Generate new token' (classic)"
echo "3. Give it a name like 'DjediBreeez Deploy'"
echo "4. Select scopes: 'repo' (full control)"
echo "5. Generate and copy the token"
echo ""
read -p "Enter your GitHub Personal Access Token: " token
echo ""

if [ -z "$token" ]; then
    echo "❌ Token is required!"
    exit 1
fi

# Configure git
git config user.email "you@example.com"
git config user.name "Djedi Breeez"

# Remove existing remote if any
git remote remove origin 2>/dev/null || true

# Add remote with token
git remote add origin https://${token}@github.com/hkenshard/DjediBreeez.git

# Push to main branch
echo "📤 Pushing to GitHub..."
git push -u origin main --force

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🔗 Repository: https://github.com/hkenshard/DjediBreeez"
    echo ""
    echo "Next step: Deploy to Cloudflare Pages"
else
    echo ""
    echo "❌ Push failed. Please check your token and try again."
fi
