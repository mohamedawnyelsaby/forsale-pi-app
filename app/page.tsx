"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { mockProducts } from "@/lib/products"
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, MapPin, User } from "lucide-react"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = mockProducts.find((p) => p.id === params.id)
  const [isFavorite, setIsFavorite] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
            <Link href="/buy">
              <Button className="bg-primary hover:bg-primary/90">Back to Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link
            href="/buy"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <p className="text-sm text-primary font-semibold mb-2">{product.category}</p>
                <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>
                <p className="text-xl text-muted-foreground">{product.description}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-foreground font-semibold">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="bg-secondary border border-border rounded-lg p-6">
                <p className="text-muted-foreground text-sm mb-2">Price</p>
                <p className="text-4xl font-bold text-primary">${product.price.toLocaleString()}</p>
              </div>

              {/* Seller Info */}
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{product.seller}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {product.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Condition */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary border border-border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Condition</p>
                  <p className="font-semibold text-foreground capitalize">{product.condition}</p>
                </div>
                <div className="bg-secondary border border-border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Listed</p>
                  <p className="font-semibold text-foreground">{new Date(product.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button className="flex-1 bg-primary hover:bg-primary/90 gap-2 h-12 text-base">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>
                <Button
                  onClick={() => setIsFavorite(!isFavorite)}
                  variant="outline"
                  className={`border-border hover:bg-secondary bg-transparent gap-2 h-12 ${
                    isFavorite ? "bg-primary/10 border-primary" : ""
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? "fill-primary text-primary" : ""}`} />
                </Button>
                <Button variant="outline" className="border-border hover:bg-secondary bg-transparent gap-2 h-12">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
