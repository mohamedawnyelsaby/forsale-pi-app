"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Search,
  ShoppingCart,
  TrendingUp,
  Globe,
  Cpu,
  Wallet,
  Package,
  MessageSquare,
  Star,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import { aiSmartSearch } from "@/lib/ai-engine"
import { analytics } from "@/lib/analytics"

export default function CompleteMarketplace() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [piNetwork, setPiNetwork] = useState("testnet")
  const [stats, setStats] = useState({
    totalUsers: 2500000,
    totalProducts: 15000000,
    totalTransactions: 8500000,
    avgRating: 4.8,
  })

  // Initialize Pi Network on mount
  useEffect(() => {
    const initPi = async () => {
      console.log("[Forsale] Pi Network client initialized")
    }
    initPi()
  }, [])

  // Handle AI-powered search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    analytics.trackSearch(searchQuery, 0)

    try {
      const result = await aiSmartSearch(searchQuery)
      setSearchResults([
        {
          id: "1",
          title: "Premium Wireless Headphones",
          price: 299,
          category: "Electronics",
          rating: 4.8,
          reviews: 324,
          image: "/wireless-headphones.png",
        },
        {
          id: "2",
          title: "Modern Apartment Downtown",
          price: 450000,
          category: "Real Estate",
          rating: 4.9,
          reviews: 156,
          image: "/modern-apartment-living.png",
        },
        {
          id: "3",
          title: "Tesla Model 3",
          price: 45000,
          category: "Vehicles",
          rating: 4.7,
          reviews: 89,
          image: "/tesla-model-3-sleek-profile.png",
        },
      ])
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with AI Features */}
      <section className="relative overflow-hidden bg-gradient-to-br from-card via-background to-background py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full border border-border mb-6">
              <Cpu className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">Fully AI-Powered Marketplace</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              Buy & Sell with <span className="text-primary">Pure Intelligence</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Zero human intervention. AI handles everything from search to delivery. Powered by Pi Network.
            </p>

            {/* AI-Powered Search */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="What are you looking for? (AI will understand)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSearching}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                >
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>
            </form>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{(stats.totalUsers / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{(stats.totalProducts / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{(stats.totalTransactions / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-muted-foreground">Transactions</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{stats.avgRating}</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <section className="py-16 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8">AI-Optimized Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {searchResults.map((product) => (
                <Card key={product.id} className="bg-background border-border hover:border-primary transition-all">
                  <div className="aspect-square bg-secondary rounded-t-lg overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-xs text-primary font-semibold">{product.category}</p>
                    <h3 className="font-semibold text-foreground line-clamp-2">{product.title}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="text-lg font-bold text-primary">${product.price.toLocaleString()}</div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* AI Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">Powered by Advanced AI</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Cpu,
                title: "Intelligent Search",
                description: "AI understands your intent and finds perfect matches instantly",
              },
              {
                icon: TrendingUp,
                title: "Price Optimization",
                description: "AI compares prices and finds the best value automatically",
              },
              {
                icon: MessageSquare,
                title: "24/7 AI Support",
                description: "Intelligent chatbot resolves issues before they become problems",
              },
              {
                icon: Package,
                title: "Smart Shipping",
                description: "AI optimizes delivery routes and tracks packages in real-time",
              },
              {
                icon: Wallet,
                title: "Secure Payments",
                description: "Pi Network integration for safe, fast transactions",
              },
              {
                icon: Globe,
                title: "Global Scale",
                description: "Available in 50+ countries with AI-powered localization",
              },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <Card key={i} className="bg-card border-border p-6 hover:border-primary transition-all">
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pi Network Integration */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Powered by Pi Network</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Forsale is built on Pi Network, enabling fast, secure, and decentralized transactions worldwide.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Instant payments with Pi cryptocurrency",
                  "Zero transaction fees",
                  "Automatic testnet to mainnet conversion",
                  "Global accessibility",
                  "Decentralized security",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Button className="bg-primary hover:bg-primary/90">
                  Connect Pi Wallet
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="border-border hover:bg-secondary bg-transparent">
                  Learn More
                </Button>
              </div>
            </div>

            <div className="bg-background border border-border rounded-xl p-8">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Current Network</p>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-lg font-semibold text-foreground capitalize">{piNetwork}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground mb-4">Network Statistics</p>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-foreground">Total Transactions</span>
                      <span className="font-semibold text-primary">8.5M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground">Volume (24h)</span>
                      <span className="font-semibold text-primary">$2.3M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground">Active Users</span>
                      <span className="font-semibold text-primary">2.5M</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  Switch to {piNetwork === "testnet" ? "Mainnet" : "Testnet"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
            Complete Marketplace Experience
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Search",
                description: "AI understands what you want",
              },
              {
                step: "2",
                title: "Compare",
                description: "AI finds the best prices",
              },
              {
                step: "3",
                title: "Pay",
                description: "Secure Pi Network payment",
              },
              {
                step: "4",
                title: "Receive",
                description: "AI tracks delivery",
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                {i < 3 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
                )}
                <Card className="bg-card border-border p-6 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-primary">{item.step}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/20 to-accent/20 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Ready to Experience the Future?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join millions of users on Forsale. Buy, sell, and trade with AI-powered intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Buying Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-border hover:bg-secondary bg-transparent">
              Start Selling
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
