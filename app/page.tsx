"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { promotions } from "@/lib/marketing"
import { Copy, Tag, Calendar, Zap } from "lucide-react"
import { useState } from "react"

export default function PromotionsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/20 to-accent/20 py-12 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-foreground">Special Promotions</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover amazing deals and exclusive offers on Forsale
              </p>
            </div>
          </div>
        </section>

        {/* Promotions Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promotions.map((promo) => (
                <div
                  key={promo.id}
                  className="bg-card border border-border rounded-xl p-6 space-y-4 hover:border-primary transition"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground">{promo.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{promo.description}</p>
                    </div>
                    <div className="text-3xl font-bold text-primary">{promo.discount}%</div>
                  </div>

                  {/* Code */}
                  <div className="bg-secondary border border-border rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-2">Promo Code</p>
                    <div className="flex items-center justify-between">
                      <code className="font-mono font-bold text-foreground">{promo.code}</code>
                      <button
                        onClick={() => handleCopyCode(promo.code)}
                        className="p-2 hover:bg-border rounded transition"
                      >
                        <Copy
                          className={`w-4 h-4 ${
                            copiedCode === promo.code ? "text-green-500" : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm">
                    {promo.category && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Tag className="w-4 h-4" />
                        <span>{promo.category}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Expires {new Date(promo.expiresAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link href="/buy">
                    <Button className="w-full bg-primary hover:bg-primary/90 gap-2">
                      <Zap className="w-4 h-4" />
                      Shop Now
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
