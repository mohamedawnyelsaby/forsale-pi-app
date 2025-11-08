"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  LogOut,
  Star,
  ArrowRight,
  Zap,
  CheckCircle2,
  Github,
  Twitter,
  Linkedin,
  ShoppingBag,
  HomeIcon,
  Car,
  Shirt,
  Watch,
  Sofa,
  Smartphone,
} from "lucide-react"

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Product {
  id: number
  name: string
  category: string
  price: number
  rating: number
  reviews: number
  image: string
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface UserProfile {
  id: string
  full_name: string
  email: string
}

// ============================================================================
// HEADER COMPONENT
// ============================================================================

function Header({ user, onSignOut }: { user: UserProfile | null; onSignOut: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline">Forsale</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#buy" className="text-foreground hover:text-primary transition">
              Buy
            </Link>
            <Link href="#sell" className="text-foreground hover:text-primary transition">
              Sell
            </Link>
            <Link href="#categories" className="text-foreground hover:text-primary transition">
              Categories
            </Link>
            <Link href="#about" className="text-foreground hover:text-primary transition">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-secondary rounded-lg transition">
              <Search className="w-5 h-5 text-foreground" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg transition">
              <ShoppingCart className="w-5 h-5 text-foreground" />
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded-lg transition"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{user.full_name.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="hidden sm:inline text-sm text-foreground">{user.full_name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
                    <button
                      onClick={onSignOut}
                      className="w-full flex items-center gap-2 px-4 py-3 text-destructive hover:bg-secondary transition text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="hidden sm:inline-flex px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition">
                Sign In
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition"
            >
              {isOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link href="#buy" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg">
              Buy
            </Link>
            <Link href="#sell" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg">
              Sell
            </Link>
            <Link href="#categories" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg">
              Categories
            </Link>
            <Link href="#about" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg">
              About
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

// ============================================================================
// HERO SECTION
// ============================================================================

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-card via-background to-background py-20 md:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full border border-border">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">AI-Powered Marketplace</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Buy & Sell <span className="text-primary">Everything</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Experience the future of commerce. AI handles everything from search to delivery. Zero human
                intervention, pure intelligence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition flex items-center justify-center gap-2">
                Start Buying
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-3 border border-border hover:bg-secondary bg-transparent text-foreground rounded-lg transition">
                Start Selling
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <div>
                <div className="text-2xl font-bold text-primary">10M+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">AI Support</div>
              </div>
            </div>
          </div>

          <div className="relative h-96 md:h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-2xl"></div>
            <div className="relative bg-card border border-border rounded-2xl p-8 h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary/40 rounded-full flex items-center justify-center">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <p className="text-foreground font-semibold">Powered by AI</p>
                <p className="text-sm text-muted-foreground">On Pi Network</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CATEGORIES SECTION
// ============================================================================

function Categories() {
  const categories = [
    { name: "Electronics", icon: Smartphone, color: "from-blue-500 to-blue-600" },
    { name: "Real Estate", icon: HomeIcon, color: "from-green-500 to-green-600" },
    { name: "Vehicles", icon: Car, color: "from-red-500 to-red-600" },
    { name: "Fashion", icon: Shirt, color: "from-pink-500 to-pink-600" },
    { name: "Accessories", icon: Watch, color: "from-purple-500 to-purple-600" },
    { name: "Furniture", icon: Sofa, color: "from-orange-500 to-orange-600" },
    { name: "Energy", icon: Zap, color: "from-yellow-500 to-yellow-600" },
    { name: "More", icon: ShoppingBag, color: "from-gray-500 to-gray-600" },
  ]

  return (
    <section id="categories" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Explore Categories</h2>
          <p className="text-lg text-muted-foreground">
            Find anything you're looking for across our diverse marketplace
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.name}
                className="group relative overflow-hidden bg-card border border-border rounded-xl p-6 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <div className="relative space-y-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground text-left">{category.name}</h3>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// FEATURED PRODUCTS SECTION
// ============================================================================

function FeaturedProducts() {
  const products: Product[] = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      category: "Electronics",
      price: 299,
      rating: 4.8,
      reviews: 324,
      image: "/wireless-headphones.png",
    },
    {
      id: 2,
      name: "Modern Apartment in Downtown",
      category: "Real Estate",
      price: 450000,
      rating: 4.9,
      reviews: 156,
      image: "/modern-apartment-living.png",
    },
    {
      id: 3,
      name: "Tesla Model 3",
      category: "Vehicles",
      price: 45000,
      rating: 4.7,
      reviews: 89,
      image: "/tesla-model-3-sleek-profile.png",
    },
    {
      id: 4,
      name: "Designer Leather Jacket",
      category: "Fashion",
      price: 599,
      rating: 4.6,
      reviews: 234,
      image: "/classic-leather-jacket.png",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Featured Listings</h2>
            <p className="text-lg text-muted-foreground">Handpicked by our AI for you</p>
          </div>
          <button className="hidden md:inline-flex px-6 py-2 border border-border hover:bg-secondary bg-transparent text-foreground rounded-lg transition">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-background border border-border rounded-xl overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="relative overflow-hidden h-48 bg-secondary">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <p className="text-xs text-primary font-semibold">{product.category}</p>
                  <h3 className="font-semibold text-foreground line-clamp-2">{product.name}</h3>
                </div>

                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="text-lg font-bold text-primary">${product.price.toLocaleString()}</div>
                  <button className="p-2 bg-primary hover:bg-primary/90 rounded-lg transition">
                    <ShoppingCart className="w-4 h-4 text-primary-foreground" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <button className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition">
            View All Products
          </button>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// HOW IT WORKS SECTION
// ============================================================================

function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "AI Search",
      description: "Our AI understands what you want and finds the perfect match instantly",
    },
    {
      icon: ShoppingCart,
      title: "Secure Payment",
      description: "Pay safely with Pi Network. Your transaction is protected end-to-end",
    },
    {
      icon: Zap,
      title: "Smart Shipping",
      description: "AI optimizes delivery routes and tracks your package in real-time",
    },
    {
      icon: CheckCircle2,
      title: "AI Support",
      description: "24/7 intelligent support resolves issues before they become problems",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How Forsale Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience seamless buying and selling powered entirely by artificial intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
                )}

                <div className="relative bg-card border border-border rounded-xl p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            { title: "Zero Human Intervention", desc: "Fully automated from start to finish" },
            { title: "Lightning Fast", desc: "AI processes everything in seconds" },
            { title: "Global Scale", desc: "Available in 50+ countries worldwide" },
          ].map((benefit, i) => (
            <div key={i} className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// FOOTER COMPONENT
// ============================================================================

function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  Status
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  Cookies
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Follow</h4>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">F</span>
            </div>
            <span className="font-semibold text-foreground">Forsale</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 Forsale. Powered by AI on Pi Network. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function ForsalePage() {
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    // Simulate user check
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header user={user} onSignOut={handleSignOut} />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <HowItWorks />
      <Footer />
    </main>
  )
}
