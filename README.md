# Djedi Breeez - Teach Your Hustle

## Project Overview
**Djedi Breeez** is a cutting-edge consultant and life coach hub website featuring a stunning neon aesthetic inspired by Infinite Motion's brand identity. This site serves as the central platform for providing consultations, crypto gems subscriptions, digital products, and linking to the Infinite Motion and Infinite Capital Group companies.

### Design Aesthetic
- **Dark Theme**: Pure black background (#000000) with deep space vibes
- **Neon Colors**: Purple (#9000ff), Pink (#ff00ff), Cyan/Blue (#00ffff)
- **Particle Effects**: Animated star field background for cosmic feel
- **Neon Glow**: All interactive elements feature neon glow effects
- **Glass Morphism**: Translucent cards with backdrop blur
- **Typography**: Exo 2 font family for modern, futuristic look
- **Infinity Symbol**: Featured prominently as brand identity (∞)

## Live URLs
- **Development**: https://3000-i6gwbd8eze46kz213f3tp-5c13a017.sandbox.novita.ai
- **Production**: (To be deployed to Cloudflare Pages)

## Brand Identity
- **Name**: Djedi Breeez
- **Tagline**: "Building - Expressing - Ascending"
- **Character**: Purple skull with beanie, infinity symbol, guardian dragon
- **Logo**: Infinity symbol (∞) with neon purple/pink/blue gradient
- **Aesthetic**: Dark fantasy, mystical, powerful - representing infinite potential
- **Inspired By**: Infinite Motion's neon aesthetic

## Current Features

### ✅ Completed Services

1. **Hero Section & Navigation**
   - Professional gradient-styled hero section
   - Fixed navigation bar with smooth scrolling
   - Responsive mobile menu
   - Clear CTAs for consultation booking

2. **Crypto Gems VIP Community** ($250/month early bird → $1000/month premium)
   - Exclusive cryptocurrency investment group
   - Daily market analysis and trend reports
   - Real-time alerts for emerging opportunities
   - Private Telegram/Discord community access
   - Educational resources and expert guidance
   - Subscription inquiry form with modal

3. **Credit Repair Services**
   - Professional credit restoration
   - Remove negative items from credit reports
   - Improve credit scores with expert guidance
   - Contact form for inquiries

4. **Life Coaching & Consulting**
   - One-on-one coaching sessions
   - Goal setting and strategic planning
   - Accountability and personalized support
   - Business consulting services

5. **Digital Products**
   - **Success Blueprint eBook** ($300) - 200+ page comprehensive guide to wealth building and financial freedom
   - **500+ Vendors Bundle** ($500) - Massive database of verified vendors for credit building, funding sources, and business resources with lifetime access

6. **Company Network Integration**
   - **Infinite Motion**: Business intelligence platform with Identity Resolution, AI Voice Receptionist, AI SEO, and Data Marketplace
   - **Infinite Capital Group**: Business funding ($25K-$15M), credit repair, tradelines, and private equity lending
   - **Infinite Guide**: Personal success app (coming soon)

7. **Contact System**
   - Professional contact form
   - Service selection dropdown
   - API endpoints for form submissions
   - Email and phone collection

## Functional Entry Points

### API Endpoints
| Method | Path | Parameters | Description |
|--------|------|------------|-------------|
| GET | `/` | - | Main homepage |
| GET | `/api/health` | - | Health check endpoint |
| POST | `/api/contact` | firstName, lastName, email, phone, service, message | Contact form submission |
| POST | `/api/subscribe` | email, name | Crypto Gems VIP subscription inquiry |

### Page Sections
- `#services` - Service overview section
- `#crypto` - Detailed Crypto Gems VIP section
- `#products` - Digital products (ebook & vendors bundle)
- `#companies` - Company network (Infinite Motion, Infinite Capital Group, Infinite Guide)
- `#contact` - Contact form section

## Not Yet Implemented

### Payment Integration
- [ ] Stripe/PayPal integration for crypto subscription payments
- [ ] Payment processing for digital products ($300 ebook, $500 vendors bundle)
- [ ] Recurring billing for monthly crypto gems subscription
- [ ] Invoice generation and receipt emails

### Backend Services
- [ ] Email service integration (SendGrid/Mailgun) for contact form
- [ ] CRM integration for lead management
- [ ] Database for storing subscriber information
- [ ] Admin dashboard for managing subscriptions and inquiries

### Enhanced Features
- [ ] User authentication and login system
- [ ] Member portal for crypto gems subscribers
- [ ] Content delivery system for digital products
- [ ] Blog/resources section
- [ ] Testimonials and reviews system
- [ ] Calendar integration for booking life coaching sessions

### Infinite Guide App
- [ ] Update link when app URL is available
- [ ] Add detailed features and screenshots
- [ ] Integration with main hub

## Recommended Next Steps

### Priority 1: Payment Integration
1. **Setup Stripe Account**
   - Create Stripe account
   - Get API keys
   - Add to `.dev.vars` for local development
   - Configure as Cloudflare secrets for production

2. **Implement Payment Routes**
   ```typescript
   POST /api/payment/crypto-subscription
   POST /api/payment/purchase-ebook
   POST /api/payment/purchase-vendors
   ```

3. **Add Webhook Handlers**
   - Handle successful payments
   - Send confirmation emails
   - Deliver digital products

### Priority 2: Email & Notifications
1. **Email Service Setup**
   - Choose provider (SendGrid, Mailgun, or Resend)
   - Configure API credentials
   - Create email templates

2. **Automated Emails**
   - Contact form confirmation
   - Subscription welcome emails
   - Digital product delivery
   - Payment receipts

### Priority 3: Data Storage
1. **Setup Cloudflare D1 Database**
   ```bash
   npx wrangler d1 create webapp-production
   ```

2. **Create Database Schema**
   - Subscribers table
   - Contact inquiries table
   - Purchases table
   - User accounts table

3. **Update API Routes**
   - Store contact form submissions
   - Track subscription inquiries
   - Manage product purchases

### Priority 4: Member Portal
1. Create protected member area for crypto gems subscribers
2. Daily market analysis posts
3. Real-time notification system
4. Community forum or chat integration

## Tech Stack
- **Framework**: Hono (Cloudflare Workers)
- **Frontend**: HTML, TailwindCSS, Vanilla JavaScript
- **Icons**: Font Awesome 6
- **HTTP Client**: Axios
- **Deployment**: Cloudflare Pages
- **Process Manager**: PM2 (development)

## Data Architecture
- **Current**: In-memory form processing (development only)
- **Planned**: Cloudflare D1 SQLite database for data persistence
- **Future**: Integration with third-party payment APIs (Stripe)

## Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Wrangler CLI

### Local Development
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start development server
npm run dev:sandbox

# Or use PM2
pm2 start ecosystem.config.cjs

# Check logs
pm2 logs webapp --nostream

# Test the service
curl http://localhost:3000
```

### Available Scripts
```bash
npm run build          # Build for production
npm run dev:sandbox    # Start development server
npm run test          # Test local server
npm run clean-port    # Kill processes on port 3000
npm run git:status    # Check git status
npm run git:commit    # Commit changes with message
```

## Deployment

### Deploy to Cloudflare Pages
```bash
# Build the project
npm run build

# Deploy to production
npm run deploy:prod
```

### Setup Environment Variables
For payment integration and email services, add secrets:
```bash
npx wrangler pages secret put STRIPE_SECRET_KEY --project-name webapp
npx wrangler pages secret put EMAIL_API_KEY --project-name webapp
```

## Project Structure
```
webapp/
├── src/
│   ├── index.tsx          # Main Hono application
│   └── renderer.tsx       # JSX renderer
├── public/
│   └── static/            # Static assets
├── dist/                  # Build output
├── ecosystem.config.cjs   # PM2 configuration
├── wrangler.jsonc        # Cloudflare configuration
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## User Guide

### For Visitors
1. **Browse Services**: Navigate through the homepage to explore all services offered
2. **Join Crypto Gems VIP**: Click "Join Now" in the crypto section, fill out the form
3. **Purchase Digital Products**: Click "Purchase Now" on the ebook or vendors bundle
4. **Contact for Consultation**: Scroll to the contact section and submit the form
5. **Visit Partner Companies**: Click on Infinite Motion or Infinite Capital Group cards

### For Administrators
1. Monitor form submissions via API logs
2. Follow up with subscription inquiries
3. Send payment links for digital products
4. Schedule coaching sessions with clients

## Configuration

### Payment Tiers
- **Crypto Gems VIP Early Bird**: $250/month (current)
- **Crypto Gems VIP Premium**: $1,000/month (coming soon)
- **Success Blueprint eBook**: $300 (one-time)
- **500+ Vendors Bundle**: $500 (one-time, lifetime access)

### External Links
- Infinite Motion: https://3000-izsdx92hnqvxowuff4e4l-ad490db5.sandbox.novita.ai/
- Infinite Capital Group: https://3000-iqdjpj1jogqst53fx3bw3-18e660f9.sandbox.novita.ai/
- Infinite Guide: Coming soon

## Support & Contact
For questions or support regarding this website, please use the contact form on the site or reach out through the connected company websites.

## License
© 2025 Infinite Hub. All rights reserved.

---

**Last Updated**: January 2025
**Status**: ✅ Active Development
**Version**: 1.0.0

