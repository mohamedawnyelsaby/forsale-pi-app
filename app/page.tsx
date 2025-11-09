"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { CartItem } from "@/lib/cart"
import { calculateCartTotal } from "@/lib/cart"
import { initiatePiPayment } from "@/lib/pi-payment"
import { ArrowLeft, AlertCircle, CheckCircle2, Loader } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
  })

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart)
        if (items.length === 0) {
          router.push("/cart")
        }
        setCartItems(items)
      } catch (error) {
        console.error("Error loading cart:", error)
        router.push("/cart")
      }
    } else {
      router.push("/cart")
    }
    setLoading(false)
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setProcessing(true)

    try {
      // Validate form
      if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
        throw new Error("Please fill in all required fields")
      }

      const total = calculateCartTotal(cartItems)

      // Initiate Pi Network payment
      const paymentResponse = await initiatePiPayment({
        amount: total,
        currency: "PI",
        description: `Forsale Order - ${cartItems.length} items`,
        orderId: `order_${Date.now()}`,
        userId: "user_123", // This would come from auth context
      })

      if (paymentResponse.status === "completed") {
        setSuccess(true)
        // Clear cart
        localStorage.removeItem("cart")
        setTimeout(() => {
          router.push(`/order-confirmation/${paymentResponse.transactionId}`)
        }, 2000)
      } else {
        throw new Error("Payment failed. Please try again.")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
            <p className="text-muted-foreground">Loading checkout...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (cartItems.length === 0) {
    return null
  }

  const total = calculateCartTotal(cartItems)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                {/* Success Message */}
                {success && (
                  <div className="flex gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-500">Payment successful</p>
                      <p className="text-sm text-green-500/80">Redirecting to order confirmation...</p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="flex gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                {!success && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Shipping Information */}
                    <div>
                      <h2 className="text-xl font-bold text-foreground mb-4">Shipping Information</h2>
                      <div className="space-y-4">
                        {/* Full Name */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Full Name <span className="text-destructive">*</span>
                          </label>
                          <Input
                            type="text"
                            name="fullName"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                            disabled={processing}
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Email <span className="text-destructive">*</span>
                          </label>
                          <Input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                            disabled={processing}
                          />
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Phone <span className="text-destructive">*</span>
                          </label>
                          <Input
                            type="tel"
                            name="phone"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={handleChange}
                            className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                            disabled={processing}
                          />
                        </div>

                        {/* Address */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Address <span className="text-destructive">*</span>
                          </label>
                          <Input
                            type="text"
                            name="address"
                            placeholder="123 Main Street"
                            value={formData.address}
                            onChange={handleChange}
                            className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                            disabled={processing}
                          />
                        </div>

                        {/* City, Country, Zip */}
                        <div className="grid grid-cols-3 gap-4">
                          <Input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                            disabled={processing}
                          />
                          <Input
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={formData.country}
                            onChange={handleChange}
                            className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                            disabled={processing}
                          />
                          <Input
                            type="text"
                            name="zipCode"
                            placeholder="Zip Code"
                            value={formData.zipCode}
                            onChange={handleChange}
                            className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                            disabled={processing}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="border-t border-border pt-6">
                      <h2 className="text-xl font-bold text-foreground mb-4">Payment Method</h2>
                      <div className="bg-secondary border border-border rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                            <span className="text-lg font-bold text-primary">π</span>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">Pi Network</p>
                            <p className="text-sm text-muted-foreground">Secure blockchain payment</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={processing}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 gap-2"
                    >
                      {processing ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        `Pay π${total.toFixed(2)}`
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-2xl p-6 space-y-6 sticky top-20">
                <h2 className="text-xl font-bold text-foreground">Order Summary</h2>

                {/* Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-foreground">
                        {item.product.name} x{item.quantity}
                      </span>
                      <span className="text-foreground font-semibold">
                        π{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-foreground">
                    <span>Subtotal</span>
                    <span>π{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Shipping</span>
                    <span>π0.00</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Tax</span>
                    <span>π0.00</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 flex justify-between text-lg font-bold text-foreground">
                  <span>Total</span>
                  <span className="text-primary">π{total.toFixed(2)}</span>
                </div>

                {/* Pi Network Info */}
                <div className="bg-secondary/50 border border-border rounded-lg p-4 text-xs text-muted-foreground space-y-2">
                  <p className="font-semibold text-foreground">Pi Network Payment</p>
                  <p>Powered by Pi Network blockchain. Testnet environment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
