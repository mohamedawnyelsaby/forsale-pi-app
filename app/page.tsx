"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { mockAnalytics } from "@/lib/marketing"
import { Users, ShoppingCart, TrendingUp, Package } from "lucide-react"

export default function AnalyticsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/auth/signin")
          return
        }

        // In production, check if user is admin
        setIsAdmin(true)
      } catch (error) {
        console.error("Error checking auth:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [supabase, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
            <p className="text-muted-foreground">Loading analytics...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
            <p className="text-muted-foreground">You don't have permission to view this page</p>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-foreground mb-8">Platform Analytics</h1>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-xl p-6 space-y-2">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Total Users</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{mockAnalytics.totalUsers.toLocaleString()}</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 space-y-2">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Total Orders</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{mockAnalytics.totalOrders.toLocaleString()}</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 space-y-2">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Total Revenue</span>
              </div>
              <p className="text-3xl font-bold text-primary">${(mockAnalytics.totalRevenue / 1000000).toFixed(1)}M</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 space-y-2">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Active Listings</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{mockAnalytics.activeListings.toLocaleString()}</p>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-foreground">Performance Metrics</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-foreground">Average Order Value</span>
                    <span className="font-bold text-primary">${mockAnalytics.averageOrderValue.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(mockAnalytics.averageOrderValue / 100) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-foreground">Conversion Rate</span>
                    <span className="font-bold text-primary">{mockAnalytics.conversionRate}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${mockAnalytics.conversionRate * 10}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-foreground">Growth Indicators</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                  <span className="text-foreground">Monthly Growth</span>
                  <span className="text-green-500 font-bold">+12.5%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                  <span className="text-foreground">User Retention</span>
                  <span className="text-green-500 font-bold">87.3%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                  <span className="text-foreground">Customer Satisfaction</span>
                  <span className="text-green-500 font-bold">4.8/5.0</span>
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
