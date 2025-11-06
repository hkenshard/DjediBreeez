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
  // Here you would integrate with email service or store in database
  console.log('Contact form submission:', body)
  return c.json({ success: true, message: 'Message received' })
})

// Subscription inquiry
app.post('/api/subscribe', async (c) => {
  const body = await c.req.json()
  // Here you would integrate with payment processor
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
        <title>Infinite Hub - Your Success Network</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            .gradient-bg {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .gradient-text {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .card-hover {
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .card-hover:hover {
                transform: translateY(-5px);
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            }
            .pulse-glow {
                animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            @keyframes pulse {
                0%, 100% {
                    opacity: 1;
                }
                50% {
                    opacity: .8;
                }
            }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Navigation -->
        <nav class="bg-white shadow-lg fixed w-full top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <h1 class="text-2xl font-bold gradient-text">Infinite Hub</h1>
                    </div>
                    <div class="hidden md:flex space-x-8">
                        <a href="#services" class="text-gray-700 hover:text-purple-600 transition">Services</a>
                        <a href="#crypto" class="text-gray-700 hover:text-purple-600 transition">Crypto Gems</a>
                        <a href="#products" class="text-gray-700 hover:text-purple-600 transition">Digital Products</a>
                        <a href="#companies" class="text-gray-700 hover:text-purple-600 transition">Companies</a>
                        <a href="#contact" class="text-gray-700 hover:text-purple-600 transition">Contact</a>
                    </div>
                    <button class="md:hidden text-gray-700">
                        <i class="fas fa-bars text-2xl"></i>
                    </button>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="gradient-bg text-white pt-32 pb-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 class="text-5xl md:text-6xl font-bold mb-6">
                    Transform Your Future
                </h1>
                <p class="text-xl md:text-2xl mb-8 text-purple-100">
                    Life Coach | Business Consultant | Financial Growth Expert
                </p>
                <p class="text-lg mb-10 max-w-3xl mx-auto">
                    Connect with expert guidance across multiple ventures - from crypto investments to credit repair, business funding to personal development. Your hub for infinite possibilities.
                </p>
                <div class="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="#contact" class="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                        Schedule Consultation
                    </a>
                    <a href="#services" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition">
                        Explore Services
                    </a>
                </div>
            </div>
        </section>

        <!-- Services Overview -->
        <section id="services" class="py-20 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-4xl font-bold text-center mb-4">
                    <span class="gradient-text">Comprehensive Services</span>
                </h2>
                <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Everything you need to grow personally, financially, and professionally
                </p>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Crypto Gems -->
                    <div class="card-hover bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-xl border border-purple-200">
                        <div class="text-purple-600 text-4xl mb-4">
                            <i class="fas fa-gem"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Crypto Gems VIP</h3>
                        <p class="text-gray-700 mb-4">
                            Exclusive access to hand-picked cryptocurrency opportunities with high growth potential.
                        </p>
                        <ul class="text-gray-600 space-y-2 mb-6">
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Daily market analysis</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Early project alerts</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Private community access</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Expert guidance</li>
                        </ul>
                        <div class="text-center">
                            <p class="text-3xl font-bold text-purple-600 mb-2">$250/mo</p>
                            <p class="text-sm text-gray-500 mb-4">Early bird pricing</p>
                            <a href="#crypto" class="block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                                Join Now
                            </a>
                        </div>
                    </div>

                    <!-- Credit Repair -->
                    <div class="card-hover bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl border border-green-200">
                        <div class="text-green-600 text-4xl mb-4">
                            <i class="fas fa-credit-card"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Credit Repair</h3>
                        <p class="text-gray-700 mb-4">
                            Professional credit restoration services to improve your financial standing and unlock opportunities.
                        </p>
                        <ul class="text-gray-600 space-y-2 mb-6">
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Remove negative items</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Improve credit scores</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Expert guidance</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Proven results</li>
                        </ul>
                        <div class="text-center">
                            <a href="#contact" class="block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                                Get Started
                            </a>
                        </div>
                    </div>

                    <!-- Life Coaching -->
                    <div class="card-hover bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-xl border border-orange-200">
                        <div class="text-orange-600 text-4xl mb-4">
                            <i class="fas fa-user-tie"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Life Coaching</h3>
                        <p class="text-gray-700 mb-4">
                            Personal development and business consulting to help you achieve your goals and maximize potential.
                        </p>
                        <ul class="text-gray-600 space-y-2 mb-6">
                            <li><i class="fas fa-check text-green-500 mr-2"></i>One-on-one sessions</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Goal setting & strategy</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Accountability & support</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Personalized roadmap</li>
                        </ul>
                        <div class="text-center">
                            <a href="#contact" class="block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition">
                                Book Session
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Crypto Gems Detailed Section -->
        <section id="crypto" class="py-20 bg-gradient-to-br from-purple-900 to-blue-900 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <div class="inline-block pulse-glow mb-4">
                        <i class="fas fa-gem text-6xl text-yellow-400"></i>
                    </div>
                    <h2 class="text-4xl md:text-5xl font-bold mb-4">
                        Crypto Gems VIP Community
                    </h2>
                    <p class="text-xl text-purple-200 max-w-2xl mx-auto">
                        Gain exclusive access to high-potential cryptocurrency opportunities before they explode
                    </p>
                </div>

                <div class="grid md:grid-cols-2 gap-8 mb-12">
                    <div class="bg-white/10 backdrop-blur-lg p-8 rounded-xl">
                        <h3 class="text-2xl font-bold mb-4">What You Get</h3>
                        <ul class="space-y-3">
                            <li class="flex items-start">
                                <i class="fas fa-chart-line text-yellow-400 mr-3 mt-1"></i>
                                <span>Daily market analysis and trend reports</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-bell text-yellow-400 mr-3 mt-1"></i>
                                <span>Real-time alerts for emerging opportunities</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-users text-yellow-400 mr-3 mt-1"></i>
                                <span>Private Telegram/Discord community</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-graduation-cap text-yellow-400 mr-3 mt-1"></i>
                                <span>Educational resources and strategies</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-headset text-yellow-400 mr-3 mt-1"></i>
                                <span>Direct access to expert guidance</span>
                            </li>
                        </ul>
                    </div>

                    <div class="bg-white/10 backdrop-blur-lg p-8 rounded-xl">
                        <h3 class="text-2xl font-bold mb-4">Membership Tiers</h3>
                        <div class="space-y-4">
                            <div class="bg-white/5 p-4 rounded-lg">
                                <div class="flex justify-between items-center mb-2">
                                    <h4 class="font-bold text-xl">Early Bird</h4>
                                    <span class="bg-green-500 text-white px-3 py-1 rounded-full text-sm">ACTIVE</span>
                                </div>
                                <p class="text-3xl font-bold text-yellow-400 mb-2">$250/month</p>
                                <p class="text-purple-200 text-sm">Limited spots available - lock in this rate forever</p>
                            </div>
                            <div class="bg-white/5 p-4 rounded-lg opacity-60">
                                <div class="flex justify-between items-center mb-2">
                                    <h4 class="font-bold text-xl">Premium</h4>
                                    <span class="bg-gray-500 text-white px-3 py-1 rounded-full text-sm">COMING</span>
                                </div>
                                <p class="text-3xl font-bold mb-2">$1,000/month</p>
                                <p class="text-purple-200 text-sm">Premium access with additional perks</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-center">
                    <button onclick="openSubscribeModal()" class="bg-yellow-400 text-purple-900 px-12 py-4 rounded-lg font-bold text-xl hover:bg-yellow-300 transition transform hover:scale-105">
                        Join Crypto Gems VIP
                    </button>
                    <p class="mt-4 text-purple-200">Limited spots at $250/month - Price increases soon!</p>
                </div>
            </div>
        </section>

        <!-- Digital Products -->
        <section id="products" class="py-20 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-4xl font-bold text-center mb-4">
                    <span class="gradient-text">Digital Products</span>
                </h2>
                <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Downloadable resources to accelerate your success
                </p>

                <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <!-- Ebook -->
                    <div class="card-hover bg-white p-8 rounded-xl border border-gray-200 shadow-lg">
                        <div class="text-blue-600 text-5xl mb-4">
                            <i class="fas fa-book"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Success Blueprint</h3>
                        <p class="text-gray-700 mb-6">
                            Comprehensive guide to building wealth, improving credit, and achieving financial freedom. 
                            Over 200 pages of actionable strategies and insider knowledge.
                        </p>
                        <div class="mb-6">
                            <p class="text-4xl font-bold text-blue-600 mb-2">$300</p>
                            <p class="text-sm text-gray-500">Instant digital download</p>
                        </div>
                        <button onclick="purchaseProduct('ebook')" class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                            <i class="fas fa-shopping-cart mr-2"></i>Purchase Now
                        </button>
                    </div>

                    <!-- Vendors Bundle -->
                    <div class="card-hover bg-white p-8 rounded-xl border border-gray-200 shadow-lg relative overflow-hidden">
                        <div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            POPULAR
                        </div>
                        <div class="text-green-600 text-5xl mb-4">
                            <i class="fas fa-store"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-3">500+ Vendors Bundle</h3>
                        <p class="text-gray-700 mb-6">
                            Massive database of verified vendors for credit building, funding sources, suppliers, 
                            and business resources. Updated regularly with new contacts.
                        </p>
                        <div class="mb-6">
                            <p class="text-4xl font-bold text-green-600 mb-2">$500</p>
                            <p class="text-sm text-gray-500">Lifetime access + updates</p>
                        </div>
                        <button onclick="purchaseProduct('vendors')" class="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                            <i class="fas fa-shopping-cart mr-2"></i>Purchase Now
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Companies Network -->
        <section id="companies" class="py-20 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-4xl font-bold text-center mb-4">
                    <span class="gradient-text">Our Network</span>
                </h2>
                <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Access our ecosystem of companies designed to accelerate your success
                </p>

                <div class="grid md:grid-cols-3 gap-8">
                    <!-- Infinite Motion -->
                    <a href="https://3000-izsdx92hnqvxowuff4e4l-ad490db5.sandbox.novita.ai/" target="_blank" class="card-hover bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200 text-center">
                        <div class="text-blue-600 text-5xl mb-4">
                            <i class="fas fa-infinity"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Infinite Motion</h3>
                        <p class="text-gray-700 mb-4">
                            The Future of Business Intelligence
                        </p>
                        <ul class="text-left text-gray-600 space-y-2 mb-6 text-sm">
                            <li><i class="fas fa-check text-blue-500 mr-2"></i>Identity Resolution Technology</li>
                            <li><i class="fas fa-check text-blue-500 mr-2"></i>AI Voice Receptionist</li>
                            <li><i class="fas fa-check text-blue-500 mr-2"></i>AI SEO (GEO) Platform</li>
                            <li><i class="fas fa-check text-blue-500 mr-2"></i>Data Marketplace</li>
                        </ul>
                        <span class="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                            Visit Site <i class="fas fa-external-link-alt ml-2"></i>
                        </span>
                    </a>

                    <!-- Infinite Capital Group -->
                    <a href="https://3000-iqdjpj1jogqst53fx3bw3-18e660f9.sandbox.novita.ai/" target="_blank" class="card-hover bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl border border-green-200 text-center">
                        <div class="text-green-600 text-5xl mb-4">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Infinite Capital Group</h3>
                        <p class="text-gray-700 mb-4">
                            Expand Your Hustle
                        </p>
                        <ul class="text-left text-gray-600 space-y-2 mb-6 text-sm">
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Business Funding $25K-$15M</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Credit Repair Services</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Primary Tradelines</li>
                            <li><i class="fas fa-check text-green-500 mr-2"></i>Private Equity Lending</li>
                        </ul>
                        <span class="inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
                            Visit Site <i class="fas fa-external-link-alt ml-2"></i>
                        </span>
                    </a>

                    <!-- Infinite Guide -->
                    <div class="card-hover bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-200 text-center">
                        <div class="text-purple-600 text-5xl mb-4">
                            <i class="fas fa-mobile-alt"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Infinite Guide</h3>
                        <p class="text-gray-700 mb-4">
                            Your Personal Success App
                        </p>
                        <ul class="text-left text-gray-600 space-y-2 mb-6 text-sm">
                            <li><i class="fas fa-check text-purple-500 mr-2"></i>Goal Tracking & Management</li>
                            <li><i class="fas fa-check text-purple-500 mr-2"></i>Daily Motivation & Tips</li>
                            <li><i class="fas fa-check text-purple-500 mr-2"></i>Resource Library</li>
                            <li><i class="fas fa-check text-purple-500 mr-2"></i>Progress Analytics</li>
                        </ul>
                        <span class="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold">
                            Coming Soon <i class="fas fa-clock ml-2"></i>
                        </span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="py-20 bg-gray-50">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-4xl font-bold text-center mb-4">
                    <span class="gradient-text">Get In Touch</span>
                </h2>
                <p class="text-center text-gray-600 mb-12">
                    Ready to start your journey? Let's connect and discuss your goals.
                </p>

                <form id="contactForm" class="bg-white p-8 rounded-xl shadow-lg">
                    <div class="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">First Name</label>
                            <input type="text" name="firstName" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Last Name</label>
                            <input type="text" name="lastName" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                        </div>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">Email</label>
                        <input type="email" name="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">Phone (Optional)</label>
                        <input type="tel" name="phone" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">Service Interest</label>
                        <select name="service" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent">
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
                        <label class="block text-gray-700 font-semibold mb-2">Message</label>
                        <textarea name="message" rows="5" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"></textarea>
                    </div>
                    <button type="submit" class="w-full bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition text-lg">
                        Send Message
                    </button>
                </form>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 class="text-xl font-bold mb-4 gradient-text">Infinite Hub</h3>
                        <p class="text-gray-400">Your central hub for success across all ventures.</p>
                    </div>
                    <div>
                        <h4 class="font-bold mb-4">Services</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="#crypto" class="hover:text-white transition">Crypto Gems</a></li>
                            <li><a href="#services" class="hover:text-white transition">Credit Repair</a></li>
                            <li><a href="#services" class="hover:text-white transition">Life Coaching</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold mb-4">Companies</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="https://3000-izsdx92hnqvxowuff4e4l-ad490db5.sandbox.novita.ai/" target="_blank" class="hover:text-white transition">Infinite Motion</a></li>
                            <li><a href="https://3000-iqdjpj1jogqst53fx3bw3-18e660f9.sandbox.novita.ai/" target="_blank" class="hover:text-white transition">Infinite Capital Group</a></li>
                            <li><a href="#" class="hover:text-white transition">Infinite Guide (Coming Soon)</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold mb-4">Connect</h4>
                        <div class="flex space-x-4 text-2xl">
                            <a href="#" class="text-gray-400 hover:text-white transition"><i class="fab fa-facebook"></i></a>
                            <a href="#" class="text-gray-400 hover:text-white transition"><i class="fab fa-twitter"></i></a>
                            <a href="#" class="text-gray-400 hover:text-white transition"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="text-gray-400 hover:text-white transition"><i class="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>
                <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 Infinite Hub. All rights reserved.</p>
                </div>
            </div>
        </footer>

        <!-- Subscribe Modal -->
        <div id="subscribeModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-xl max-w-md w-full p-8 relative">
                <button onclick="closeSubscribeModal()" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-2xl"></i>
                </button>
                <h3 class="text-2xl font-bold mb-4">Join Crypto Gems VIP</h3>
                <p class="text-gray-600 mb-6">Get started with our exclusive crypto community at the early bird price of $250/month.</p>
                <form id="subscribeForm" class="space-y-4">
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Email</label>
                        <input type="email" name="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Full Name</label>
                        <input type="text" name="name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                    </div>
                    <button type="submit" class="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                        Continue to Payment
                    </button>
                    <p class="text-sm text-gray-500 text-center">You'll be redirected to our secure payment page</p>
                </form>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
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
                alert(\`Thank you for your interest in \${product === 'ebook' ? 'Success Blueprint' : '500+ Vendors Bundle'}! We will contact you with payment details.\`);
                // In production, this would redirect to payment processor
            }

            // Smooth Scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });
        </script>
    </body>
    </html>
  `)
})

export default app
