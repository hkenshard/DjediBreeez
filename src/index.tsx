import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// API Routes
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Contact form submission
app.post('/api/contact', async (c) => {
  const body = await c.req.json()
  console.log('Contact form submission:', body)
  return c.json({ success: true, message: 'Message received' })
})

// Subscription inquiry
app.post('/api/subscribe', async (c) => {
  const body = await c.req.json()
  console.log('Subscription inquiry:', body)
  return c.json({ success: true, message: 'Subscription inquiry received' })
})

// Main page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Djedi Breeez | Building Expressing Ascending</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;600;700;900&display=swap" rel="stylesheet">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Exo 2', sans-serif;
                background: #000000;
                color: #ffffff;
                overflow-x: hidden;
            }

            /* Neon Colors */
            :root {
                --neon-purple: #9000ff;
                --neon-pink: #ff00ff;
                --neon-blue: #00ffff;
                --neon-cyan: #00d4ff;
            }

            /* Particle Background */
            #particles-js {
                position: fixed;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 0;
                background: radial-gradient(ellipse at center, #0a0a1a 0%, #000000 100%);
            }

            .particle {
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                animation: twinkle 3s infinite;
            }

            @keyframes twinkle {
                0%, 100% { opacity: 0.2; }
                50% { opacity: 1; }
            }

            /* Content Layer */
            .content-layer {
                position: relative;
                z-index: 1;
            }

            /* Neon Text Glow */
            .neon-text {
                text-shadow: 
                    0 0 10px var(--neon-blue),
                    0 0 20px var(--neon-blue),
                    0 0 30px var(--neon-purple),
                    0 0 40px var(--neon-purple);
                animation: neon-flicker 3s ease-in-out infinite;
            }

            @keyframes neon-flicker {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.95; }
            }

            /* Infinity Logo Gradient */
            .infinity-gradient {
                background: linear-gradient(135deg, var(--neon-purple) 0%, var(--neon-pink) 50%, var(--neon-blue) 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            /* Neon Border */
            .neon-border {
                border: 2px solid var(--neon-blue);
                box-shadow: 
                    0 0 10px var(--neon-blue),
                    inset 0 0 10px rgba(0, 255, 255, 0.1);
                transition: all 0.3s ease;
            }

            .neon-border:hover {
                box-shadow: 
                    0 0 20px var(--neon-blue),
                    0 0 30px var(--neon-purple),
                    inset 0 0 20px rgba(0, 255, 255, 0.2);
                transform: translateY(-5px);
            }

            /* Glass Card Effect */
            .glass-card {
                background: rgba(20, 20, 40, 0.6);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(144, 0, 255, 0.3);
                transition: all 0.4s ease;
            }

            .glass-card:hover {
                background: rgba(20, 20, 40, 0.8);
                border-color: var(--neon-purple);
                box-shadow: 
                    0 0 30px rgba(144, 0, 255, 0.5),
                    inset 0 0 20px rgba(144, 0, 255, 0.1);
                transform: translateY(-10px);
            }

            /* Neon Button */
            .neon-button {
                background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
                color: white;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 2px;
                padding: 16px 40px;
                border: none;
                border-radius: 50px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                transition: all 0.3s ease;
                box-shadow: 
                    0 0 20px rgba(144, 0, 255, 0.6),
                    0 0 40px rgba(255, 0, 255, 0.4);
            }

            .neon-button:hover {
                transform: scale(1.05);
                box-shadow: 
                    0 0 30px var(--neon-purple),
                    0 0 60px var(--neon-pink);
            }

            .neon-button::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                transition: left 0.5s ease;
            }

            .neon-button:hover::before {
                left: 100%;
            }

            /* Infinity Symbol Animation */
            .infinity-symbol {
                display: inline-block;
                font-size: 120px;
                background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink), var(--neon-blue));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                filter: drop-shadow(0 0 20px var(--neon-purple)) 
                        drop-shadow(0 0 40px var(--neon-pink));
                animation: float 3s ease-in-out infinite;
            }

            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }

            /* Nav Bar */
            .nav-bar {
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(10px);
                border-bottom: 1px solid rgba(144, 0, 255, 0.3);
            }

            /* Mobile Menu */
            .mobile-menu {
                display: none;
                background: rgba(10, 10, 26, 0.98);
                backdrop-filter: blur(10px);
            }

            .mobile-menu.active {
                display: block;
            }

            /* Scroll Animation */
            .fade-in {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }

            .fade-in.visible {
                opacity: 1;
                transform: translateY(0);
            }

            /* Price Tag */
            .price-tag {
                font-size: 3rem;
                font-weight: 900;
                background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                text-shadow: 0 0 30px var(--neon-purple);
            }

            /* Footer Links */
            .footer-link {
                color: rgba(255, 255, 255, 0.7);
                transition: all 0.3s ease;
            }

            .footer-link:hover {
                color: var(--neon-blue);
                text-shadow: 0 0 10px var(--neon-blue);
            }
        </style>
    </head>
    <body>
        <!-- Particle Background -->
        <div id="particles-js"></div>

        <div class="content-layer">
            <!-- Navigation -->
            <nav class="nav-bar fixed w-full top-0 z-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-20">
                        <div class="flex items-center space-x-3">
                            <span class="text-4xl infinity-gradient">∞</span>
                            <div>
                                <h1 class="text-2xl font-bold neon-text">DJEDI BREEEZ</h1>
                                <p class="text-xs text-gray-400 uppercase tracking-widest">Building Expressing Ascending</p>
                            </div>
                        </div>
                        <div class="hidden md:flex space-x-8">
                            <a href="#services" class="text-gray-300 hover:text-cyan-400 transition font-semibold uppercase tracking-wide">Services</a>
                            <a href="#crypto" class="text-gray-300 hover:text-cyan-400 transition font-semibold uppercase tracking-wide">Crypto Gems</a>
                            <a href="#products" class="text-gray-300 hover:text-cyan-400 transition font-semibold uppercase tracking-wide">Products</a>
                            <a href="#companies" class="text-gray-300 hover:text-cyan-400 transition font-semibold uppercase tracking-wide">Network</a>
                            <a href="#contact" class="text-gray-300 hover:text-cyan-400 transition font-semibold uppercase tracking-wide">Contact</a>
                        </div>
                        <button id="mobileMenuBtn" class="md:hidden text-cyan-400 text-2xl">
                            <i class="fas fa-bars"></i>
                        </button>
                    </div>
                </div>
                <!-- Mobile Menu -->
                <div id="mobileMenu" class="mobile-menu md:hidden">
                    <div class="px-4 py-6 space-y-4">
                        <a href="#services" class="block text-gray-300 hover:text-cyan-400 transition font-semibold uppercase tracking-wide py-2">Services</a>
                        <a href="#crypto" class="block text-gray-300 hover:text-cyan-400 transition font-semibold uppercase tracking-wide py-2">Crypto Gems</a>
                        <a href="#products" class="block text-gray-300 hover:text-cyan-400 transition font-semibold uppercase tracking-wide py-2">Products</a>
                        <a href="#companies" class="block text-gray-300 hover:text-cyan-400 transition font-semibold uppercase tracking-wide py-2">Network</a>
                        <a href="#contact" class="block text-gray-300 hover:text-cyan-400 transition font-semibold uppercase tracking-wide py-2">Contact</a>
                    </div>
                </div>
            </nav>

            <!-- Hero Section -->
            <section class="min-h-screen flex items-center justify-center pt-20 px-4">
                <div class="text-center max-w-5xl mx-auto">
                    <div class="mb-8">
                        <span class="infinity-symbol">∞</span>
                    </div>
                    <h1 class="text-6xl md:text-8xl font-black mb-6 neon-text">
                        DJEDI BREEEZ
                    </h1>
                    <p class="text-2xl md:text-4xl font-bold mb-8 infinity-gradient uppercase tracking-wider">
                        Building Expressing Ascending
                    </p>
                    <p class="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Life Coach | Business Consultant | Crypto Expert | Financial Strategist
                    </p>
                    <p class="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
                        Your central hub connecting crypto investments, credit repair, business funding, and personal development. Transform your future with infinite possibilities.
                    </p>
                    <div class="flex flex-col sm:flex-row justify-center gap-6">
                        <a href="#contact">
                            <button class="neon-button">
                                Schedule Consultation
                            </button>
                        </a>
                        <a href="#services">
                            <button class="neon-border bg-transparent text-cyan-400 px-10 py-4 rounded-full font-bold uppercase tracking-wider">
                                Explore Services
                            </button>
                        </a>
                    </div>
                </div>
            </section>

            <!-- Services Overview -->
            <section id="services" class="py-20 px-4">
                <div class="max-w-7xl mx-auto">
                    <div class="text-center mb-16 fade-in">
                        <h2 class="text-5xl md:text-6xl font-black mb-4">
                            <span class="infinity-gradient">COMPREHENSIVE SERVICES</span>
                        </h2>
                        <p class="text-xl text-gray-400 max-w-2xl mx-auto">
                            Everything you need to grow personally, financially, and professionally
                        </p>
                    </div>
                    
                    <div class="grid md:grid-cols-3 gap-8">
                        <!-- Crypto Gems -->
                        <div class="glass-card p-8 rounded-2xl fade-in">
                            <div class="text-6xl mb-6 infinity-gradient">
                                <i class="fas fa-gem"></i>
                            </div>
                            <h3 class="text-3xl font-bold mb-4 neon-text">CRYPTO GEMS VIP</h3>
                            <p class="text-gray-300 mb-6 leading-relaxed">
                                Exclusive access to hand-picked cryptocurrency opportunities with explosive growth potential.
                            </p>
                            <ul class="text-gray-400 space-y-3 mb-8">
                                <li class="flex items-center">
                                    <i class="fas fa-check text-cyan-400 mr-3"></i>
                                    Daily market analysis
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-check text-cyan-400 mr-3"></i>
                                    Early project alerts
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-check text-cyan-400 mr-3"></i>
                                    Private community
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-check text-cyan-400 mr-3"></i>
                                    Expert guidance
                                </li>
                            </ul>
                            <div class="text-center mb-6">
                                <p class="price-tag">$250<span class="text-xl text-gray-400">/mo</span></p>
                                <p class="text-sm text-gray-500 uppercase tracking-wide">Early Bird Pricing</p>
                            </div>
                            <a href="#crypto" class="block">
                                <button class="neon-button w-full">
                                    Join Now
                                </button>
                            </a>
                        </div>

                        <!-- Credit Repair -->
                        <div class="glass-card p-8 rounded-2xl fade-in">
                            <div class="text-6xl mb-6 infinity-gradient">
                                <i class="fas fa-credit-card"></i>
                            </div>
                            <h3 class="text-3xl font-bold mb-4 neon-text">CREDIT REPAIR</h3>
                            <p class="text-gray-300 mb-6 leading-relaxed">
                                Professional credit restoration to improve your financial standing and unlock opportunities.
                            </p>
                            <ul class="text-gray-400 space-y-3 mb-8">
                                <li class="flex items-center">
                                    <i class="fas fa-check text-cyan-400 mr-3"></i>
                                    Remove negative items
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-check text-cyan-400 mr-3"></i>
                                    Improve credit scores
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-check text-cyan-400 mr-3"></i>
                                    Expert guidance
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-check text-cyan-400 mr-3"></i>
                                    Proven results
                                </li>
                            </ul>
                            <a href="#contact" class="block mt-auto">
                                <button class="neon-button w-full">
                                    Get Started
                                </button>
                            </a>
                        </div>

                        <!-- Life Coaching -->
                        <div class="glass-card p-8 rounded-2xl fade-in">
                            <div class="text-6xl mb-6 infinity-gradient">
                                <i class="fas fa-user-tie"></i>
                            </div>
                            <h3 class="text-3xl font-bold mb-4 neon-text">LIFE COACHING</h3>
                            <p class="text-gray-300 mb-6 leading-relaxed">
                                Personal development and business consulting to help you achieve your goals and maximize potential.
                            </p>
                            <ul class="text-gray-400 space-y-3 mb-8">
                                <li class="flex items-center">
                                    <i class="fas fa-check text-cyan-400 mr-3"></i>
                                    One-on-one sessions
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-check text-cyan-400 mr-3"></i>
                                    Goal setting & strategy
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-check text-cyan-400 mr-3"></i>
                                    Accountability & support
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-check text-cyan-400 mr-3"></i>
                                    Personalized roadmap
                                </li>
                            </ul>
                            <a href="#contact" class="block">
                                <button class="neon-button w-full">
                                    Book Session
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Crypto Gems Detailed Section -->
            <section id="crypto" class="py-20 px-4" style="background: linear-gradient(180deg, rgba(10, 10, 26, 0) 0%, rgba(144, 0, 255, 0.1) 100%);">
                <div class="max-w-7xl mx-auto">
                    <div class="text-center mb-16 fade-in">
                        <div class="inline-block mb-6">
                            <i class="fas fa-gem text-8xl infinity-gradient" style="filter: drop-shadow(0 0 30px #ff00ff);"></i>
                        </div>
                        <h2 class="text-5xl md:text-7xl font-black mb-6 neon-text">
                            CRYPTO GEMS VIP
                        </h2>
                        <p class="text-2xl text-gray-300 max-w-3xl mx-auto">
                            Gain exclusive access to high-potential cryptocurrency opportunities before they explode
                        </p>
                    </div>

                    <div class="grid md:grid-cols-2 gap-8 mb-12">
                        <div class="glass-card p-10 rounded-2xl fade-in">
                            <h3 class="text-3xl font-bold mb-6 infinity-gradient">WHAT YOU GET</h3>
                            <ul class="space-y-4 text-lg">
                                <li class="flex items-start">
                                    <i class="fas fa-chart-line text-cyan-400 mr-4 mt-1 text-2xl"></i>
                                    <span class="text-gray-300">Daily market analysis and trend reports</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-bell text-cyan-400 mr-4 mt-1 text-2xl"></i>
                                    <span class="text-gray-300">Real-time alerts for emerging opportunities</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-users text-cyan-400 mr-4 mt-1 text-2xl"></i>
                                    <span class="text-gray-300">Private Telegram/Discord community</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-graduation-cap text-cyan-400 mr-4 mt-1 text-2xl"></i>
                                    <span class="text-gray-300">Educational resources and strategies</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-headset text-cyan-400 mr-4 mt-1 text-2xl"></i>
                                    <span class="text-gray-300">Direct access to expert guidance</span>
                                </li>
                            </ul>
                        </div>

                        <div class="glass-card p-10 rounded-2xl fade-in">
                            <h3 class="text-3xl font-bold mb-6 infinity-gradient">MEMBERSHIP TIERS</h3>
                            <div class="space-y-6">
                                <div class="glass-card p-6 rounded-xl neon-border">
                                    <div class="flex justify-between items-center mb-3">
                                        <h4 class="font-bold text-2xl">EARLY BIRD</h4>
                                        <span class="bg-green-500 text-black px-4 py-1 rounded-full text-sm font-bold uppercase">Active</span>
                                    </div>
                                    <p class="text-5xl font-black infinity-gradient mb-2">$250<span class="text-xl text-gray-400">/month</span></p>
                                    <p class="text-gray-400">Limited spots available - lock in this rate forever</p>
                                </div>
                                <div class="glass-card p-6 rounded-xl opacity-60">
                                    <div class="flex justify-between items-center mb-3">
                                        <h4 class="font-bold text-2xl">PREMIUM</h4>
                                        <span class="bg-gray-500 text-black px-4 py-1 rounded-full text-sm font-bold uppercase">Coming</span>
                                    </div>
                                    <p class="text-5xl font-black mb-2">$1,000<span class="text-xl text-gray-400">/month</span></p>
                                    <p class="text-gray-400">Premium access with additional perks</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="text-center fade-in">
                        <button onclick="openSubscribeModal()" class="neon-button text-2xl px-16 py-6">
                            Join Crypto Gems VIP
                        </button>
                        <p class="mt-6 text-gray-400 text-lg">Limited spots at $250/month - Price increases soon!</p>
                    </div>
                </div>
            </section>

            <!-- Digital Products -->
            <section id="products" class="py-20 px-4">
                <div class="max-w-7xl mx-auto">
                    <div class="text-center mb-16 fade-in">
                        <h2 class="text-5xl md:text-6xl font-black mb-4">
                            <span class="infinity-gradient">DIGITAL PRODUCTS</span>
                        </h2>
                        <p class="text-xl text-gray-400 max-w-2xl mx-auto">
                            Downloadable resources to accelerate your success
                        </p>
                    </div>

                    <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <!-- Ebook -->
                        <div class="glass-card p-10 rounded-2xl fade-in relative overflow-hidden">
                            <div class="text-6xl mb-6 infinity-gradient">
                                <i class="fas fa-book"></i>
                            </div>
                            <h3 class="text-3xl font-bold mb-4 neon-text">SUCCESS BLUEPRINT</h3>
                            <p class="text-gray-300 mb-8 leading-relaxed">
                                Comprehensive guide to building wealth, improving credit, and achieving financial freedom. 
                                Over 200 pages of actionable strategies.
                            </p>
                            <div class="mb-8">
                                <p class="price-tag">$300</p>
                                <p class="text-sm text-gray-500 uppercase tracking-wide">Instant Digital Download</p>
                            </div>
                            <button onclick="purchaseProduct('ebook')" class="neon-button w-full">
                                <i class="fas fa-shopping-cart mr-3"></i>Purchase Now
                            </button>
                        </div>

                        <!-- Vendors Bundle -->
                        <div class="glass-card p-10 rounded-2xl fade-in relative overflow-hidden">
                            <div class="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold uppercase">
                                Popular
                            </div>
                            <div class="text-6xl mb-6 infinity-gradient">
                                <i class="fas fa-store"></i>
                            </div>
                            <h3 class="text-3xl font-bold mb-4 neon-text">500+ VENDORS BUNDLE</h3>
                            <p class="text-gray-300 mb-8 leading-relaxed">
                                Massive database of verified vendors for credit building, funding sources, and business resources. Updated regularly.
                            </p>
                            <div class="mb-8">
                                <p class="price-tag">$500</p>
                                <p class="text-sm text-gray-500 uppercase tracking-wide">Lifetime Access + Updates</p>
                            </div>
                            <button onclick="purchaseProduct('vendors')" class="neon-button w-full">
                                <i class="fas fa-shopping-cart mr-3"></i>Purchase Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Companies Network -->
            <section id="companies" class="py-20 px-4" style="background: linear-gradient(180deg, rgba(144, 0, 255, 0.05) 0%, rgba(0, 0, 0, 0) 100%);">
                <div class="max-w-7xl mx-auto">
                    <div class="text-center mb-16 fade-in">
                        <h2 class="text-5xl md:text-6xl font-black mb-4">
                            <span class="infinity-gradient">THE NETWORK</span>
                        </h2>
                        <p class="text-xl text-gray-400 max-w-2xl mx-auto">
                            Access our ecosystem of companies designed to accelerate your success
                        </p>
                    </div>

                    <div class="grid md:grid-cols-3 gap-8">
                        <!-- Infinite Motion -->
                        <a href="https://3000-izsdx92hnqvxowuff4e4l-ad490db5.sandbox.novita.ai/" target="_blank" class="glass-card p-8 rounded-2xl text-center fade-in">
                            <div class="text-6xl mb-6 infinity-gradient">
                                <i class="fas fa-infinity"></i>
                            </div>
                            <h3 class="text-2xl font-bold mb-3 neon-text">INFINITE MOTION</h3>
                            <p class="text-gray-400 mb-6 uppercase text-sm tracking-wider">
                                The Future of Business Intelligence
                            </p>
                            <ul class="text-left text-gray-400 space-y-3 mb-8 text-sm">
                                <li><i class="fas fa-check text-cyan-400 mr-2"></i>Identity Resolution Technology</li>
                                <li><i class="fas fa-check text-cyan-400 mr-2"></i>AI Voice Receptionist</li>
                                <li><i class="fas fa-check text-cyan-400 mr-2"></i>AI SEO (GEO) Platform</li>
                                <li><i class="fas fa-check text-cyan-400 mr-2"></i>Data Marketplace</li>
                            </ul>
                            <button class="neon-border bg-transparent text-cyan-400 px-8 py-3 rounded-full font-bold uppercase w-full">
                                Visit Site <i class="fas fa-external-link-alt ml-2"></i>
                            </button>
                        </a>

                        <!-- Infinite Capital Group -->
                        <a href="https://3000-iqdjpj1jogqst53fx3bw3-18e660f9.sandbox.novita.ai/" target="_blank" class="glass-card p-8 rounded-2xl text-center fade-in">
                            <div class="text-6xl mb-6 infinity-gradient">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                            <h3 class="text-2xl font-bold mb-3 neon-text">INFINITE CAPITAL GROUP</h3>
                            <p class="text-gray-400 mb-6 uppercase text-sm tracking-wider">
                                Expand Your Hustle
                            </p>
                            <ul class="text-left text-gray-400 space-y-3 mb-8 text-sm">
                                <li><i class="fas fa-check text-cyan-400 mr-2"></i>Business Funding $25K-$15M</li>
                                <li><i class="fas fa-check text-cyan-400 mr-2"></i>Credit Repair Services</li>
                                <li><i class="fas fa-check text-cyan-400 mr-2"></i>Primary Tradelines</li>
                                <li><i class="fas fa-check text-cyan-400 mr-2"></i>Private Equity Lending</li>
                            </ul>
                            <button class="neon-border bg-transparent text-cyan-400 px-8 py-3 rounded-full font-bold uppercase w-full">
                                Visit Site <i class="fas fa-external-link-alt ml-2"></i>
                            </button>
                        </a>

                        <!-- Infinite Guide -->
                        <div class="glass-card p-8 rounded-2xl text-center fade-in">
                            <div class="text-6xl mb-6 infinity-gradient">
                                <i class="fas fa-mobile-alt"></i>
                            </div>
                            <h3 class="text-2xl font-bold mb-3 neon-text">INFINITE GUIDE</h3>
                            <p class="text-gray-400 mb-6 uppercase text-sm tracking-wider">
                                Your Personal Success App
                            </p>
                            <ul class="text-left text-gray-400 space-y-3 mb-8 text-sm">
                                <li><i class="fas fa-check text-cyan-400 mr-2"></i>Goal Tracking & Management</li>
                                <li><i class="fas fa-check text-cyan-400 mr-2"></i>Daily Motivation & Tips</li>
                                <li><i class="fas fa-check text-cyan-400 mr-2"></i>Resource Library</li>
                                <li><i class="fas fa-check text-cyan-400 mr-2"></i>Progress Analytics</li>
                            </ul>
                            <button class="neon-border bg-transparent text-gray-500 px-8 py-3 rounded-full font-bold uppercase w-full cursor-not-allowed">
                                Coming Soon <i class="fas fa-clock ml-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Contact Section -->
            <section id="contact" class="py-20 px-4">
                <div class="max-w-3xl mx-auto">
                    <div class="text-center mb-12 fade-in">
                        <h2 class="text-5xl md:text-6xl font-black mb-4">
                            <span class="infinity-gradient">GET IN TOUCH</span>
                        </h2>
                        <p class="text-xl text-gray-400">
                            Ready to start your journey? Let's connect and discuss your goals.
                        </p>
                    </div>

                    <form id="contactForm" class="glass-card p-10 rounded-2xl fade-in">
                        <div class="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label class="block text-gray-300 font-semibold mb-2 uppercase text-sm tracking-wide">First Name</label>
                                <input type="text" name="firstName" required class="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-cyan-400 focus:outline-none text-white">
                            </div>
                            <div>
                                <label class="block text-gray-300 font-semibold mb-2 uppercase text-sm tracking-wide">Last Name</label>
                                <input type="text" name="lastName" required class="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-cyan-400 focus:outline-none text-white">
                            </div>
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-300 font-semibold mb-2 uppercase text-sm tracking-wide">Email</label>
                            <input type="email" name="email" required class="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-cyan-400 focus:outline-none text-white">
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-300 font-semibold mb-2 uppercase text-sm tracking-wide">Phone (Optional)</label>
                            <input type="tel" name="phone" class="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-cyan-400 focus:outline-none text-white">
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-300 font-semibold mb-2 uppercase text-sm tracking-wide">Service Interest</label>
                            <select name="service" class="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-cyan-400 focus:outline-none text-white">
                                <option value="">Select a service...</option>
                                <option value="crypto">Crypto Gems VIP</option>
                                <option value="credit">Credit Repair</option>
                                <option value="coaching">Life Coaching</option>
                                <option value="consultation">General Consultation</option>
                                <option value="funding">Business Funding</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-300 font-semibold mb-2 uppercase text-sm tracking-wide">Message</label>
                            <textarea name="message" rows="5" required class="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-cyan-400 focus:outline-none text-white"></textarea>
                        </div>
                        <button type="submit" class="neon-button w-full text-xl py-4">
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            <!-- Footer -->
            <footer class="py-12 px-4 border-t border-purple-500/20">
                <div class="max-w-7xl mx-auto">
                    <div class="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div class="flex items-center space-x-2 mb-4">
                                <span class="text-4xl infinity-gradient">∞</span>
                                <div>
                                    <h3 class="text-xl font-bold neon-text">DJEDI BREEEZ</h3>
                                    <p class="text-xs text-gray-500 uppercase">Building Expressing Ascending</p>
                                </div>
                            </div>
                            <p class="text-gray-500">Your central hub for infinite success.</p>
                        </div>
                        <div>
                            <h4 class="font-bold mb-4 uppercase text-sm tracking-wider text-cyan-400">Services</h4>
                            <ul class="space-y-2">
                                <li><a href="#crypto" class="footer-link">Crypto Gems</a></li>
                                <li><a href="#services" class="footer-link">Credit Repair</a></li>
                                <li><a href="#services" class="footer-link">Life Coaching</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-bold mb-4 uppercase text-sm tracking-wider text-cyan-400">Network</h4>
                            <ul class="space-y-2">
                                <li><a href="https://3000-izsdx92hnqvxowuff4e4l-ad490db5.sandbox.novita.ai/" target="_blank" class="footer-link">Infinite Motion</a></li>
                                <li><a href="https://3000-iqdjpj1jogqst53fx3bw3-18e660f9.sandbox.novita.ai/" target="_blank" class="footer-link">Infinite Capital Group</a></li>
                                <li><a href="#" class="footer-link">Infinite Guide</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-bold mb-4 uppercase text-sm tracking-wider text-cyan-400">Connect</h4>
                            <div class="flex space-x-4 text-2xl">
                                <a href="#" class="footer-link text-3xl"><i class="fab fa-facebook"></i></a>
                                <a href="#" class="footer-link text-3xl"><i class="fab fa-twitter"></i></a>
                                <a href="#" class="footer-link text-3xl"><i class="fab fa-instagram"></i></a>
                                <a href="#" class="footer-link text-3xl"><i class="fab fa-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="border-t border-purple-500/20 pt-8 text-center text-gray-500">
                        <p>&copy; 2025 Djedi Breeez. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>

        <!-- Subscribe Modal -->
        <div id="subscribeModal" class="hidden fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" style="backdrop-filter: blur(10px);">
            <div class="glass-card rounded-2xl max-w-md w-full p-10 relative neon-border">
                <button onclick="closeSubscribeModal()" class="absolute top-6 right-6 text-gray-400 hover:text-cyan-400 transition">
                    <i class="fas fa-times text-3xl"></i>
                </button>
                <h3 class="text-3xl font-bold mb-4 neon-text">JOIN CRYPTO GEMS VIP</h3>
                <p class="text-gray-400 mb-8">Get started with our exclusive crypto community at the early bird price of $250/month.</p>
                <form id="subscribeForm" class="space-y-6">
                    <div>
                        <label class="block text-gray-300 font-semibold mb-2 uppercase text-sm tracking-wide">Email</label>
                        <input type="email" name="email" required class="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-cyan-400 focus:outline-none text-white">
                    </div>
                    <div>
                        <label class="block text-gray-300 font-semibold mb-2 uppercase text-sm tracking-wide">Full Name</label>
                        <input type="text" name="name" required class="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-cyan-400 focus:outline-none text-white">
                    </div>
                    <button type="submit" class="neon-button w-full">
                        Continue to Payment
                    </button>
                    <p class="text-sm text-gray-500 text-center">You'll be redirected to our secure payment page</p>
                </form>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
            // Particle Background Generation
            function createParticles() {
                const particlesContainer = document.getElementById('particles-js');
                const particleCount = 100;
                
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.top = Math.random() * 100 + '%';
                    particle.style.animationDelay = Math.random() * 3 + 's';
                    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
                    particlesContainer.appendChild(particle);
                }
            }
            createParticles();

            // Mobile Menu Toggle
            document.getElementById('mobileMenuBtn').addEventListener('click', () => {
                document.getElementById('mobileMenu').classList.toggle('active');
            });

            // Subscribe Modal
            function openSubscribeModal() {
                document.getElementById('subscribeModal').classList.remove('hidden');
            }

            function closeSubscribeModal() {
                document.getElementById('subscribeModal').classList.add('hidden');
            }

            // Subscribe Form
            document.getElementById('subscribeForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData);
                
                try {
                    const response = await axios.post('/api/subscribe', data);
                    alert('Thank you! We will contact you shortly with payment details.');
                    closeSubscribeModal();
                    e.target.reset();
                } catch (error) {
                    alert('There was an error. Please try again or contact us directly.');
                }
            });

            // Contact Form
            document.getElementById('contactForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData);
                
                try {
                    const response = await axios.post('/api/contact', data);
                    alert('Thank you for your message! We will get back to you soon.');
                    e.target.reset();
                } catch (error) {
                    alert('There was an error. Please try again or contact us directly.');
                }
            });

            // Purchase Product
            function purchaseProduct(product) {
                alert('Thank you for your interest in ' + (product === 'ebook' ? 'Success Blueprint' : '500+ Vendors Bundle') + '! We will contact you with payment details.');
            }

            // Smooth Scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        // Close mobile menu if open
                        document.getElementById('mobileMenu').classList.remove('active');
                    }
                });
            });

            // Fade-in Animation on Scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        </script>
    </body>
    </html>
  `)
})

export default app
