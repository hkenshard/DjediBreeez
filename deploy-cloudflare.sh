#!/bin/bash

# Cloudflare Pages Deployment Script
# This script will deploy your site to Cloudflare Pages

echo "☁️  Deploying Djedi Breeez to Cloudflare Pages..."
echo ""
echo "📋 Prerequisites:"
echo "   1. Code must be pushed to GitHub first"
echo "   2. You need a Cloudflare API Token"
echo ""
echo "To create a Cloudflare API Token:"
echo "1. Go to https://dash.cloudflare.com/profile/api-tokens"
echo "2. Click 'Create Token'"
echo "3. Use 'Edit Cloudflare Workers' template"
echo "4. Or create custom with: Account > Cloudflare Pages > Edit"
echo "5. Generate and copy the token"
echo ""
read -p "Do you have your Cloudflare API Token? (y/n): " ready

if [ "$ready" != "y" ]; then
    echo "Please create your token first, then run this script again."
    exit 0
fi

read -p "Enter your Cloudflare API Token: " token
echo ""

if [ -z "$token" ]; then
    echo "❌ Token is required!"
    exit 1
fi

# Set the token as environment variable
export CLOUDFLARE_API_TOKEN="$token"

echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "📤 Deploying to Cloudflare Pages..."
echo ""
read -p "Enter your desired project name (e.g., djedibreeez): " project_name

if [ -z "$project_name" ]; then
    project_name="djedibreeez"
fi

echo ""
echo "Creating Cloudflare Pages project..."
npx wrangler pages project create "$project_name" --production-branch main 2>/dev/null || echo "Project may already exist, continuing..."

echo ""
echo "Deploying to Cloudflare..."
npx wrangler pages deploy dist --project-name "$project_name"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully deployed to Cloudflare Pages!"
    echo "🔗 Your site will be live at: https://${project_name}.pages.dev"
    echo ""
    echo "📊 Cloudflare Dashboard: https://dash.cloudflare.com"
    echo ""
    echo "Note: It may take a few minutes for your site to be fully available."
else
    echo ""
    echo "❌ Deployment failed. Please check:"
    echo "   1. Your API token has correct permissions"
    echo "   2. You're logged into Cloudflare"
    echo "   3. The project name is available"
    echo ""
    echo "Try deploying via Cloudflare Dashboard instead:"
    echo "https://dash.cloudflare.com > Workers & Pages > Create"
fi
