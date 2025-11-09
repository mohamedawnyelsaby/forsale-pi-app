"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { LogOut, Settings, ShoppingBag, Heart, Clock, Plus } from "lucide-react"

interface UserProfile {
  id: string
  full_name: string
  email: string
  avatar_url: string | null
  bio: string
}

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (!authUser) {
          router.push("/auth/signin")
          return
        }

        const { data: profile } = await supabase.from("profiles").select("*").eq("id", authUser.id).single()

        if (profile) {
          setUser(profile)
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [supabase, router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="border-border hover:bg-secondary bg-transparent gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Section */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                <span className="text-3xl font-bold text-primary-foreground">
                  {user.full_name.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* User Info */}
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">{user.full_name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                {user.bio && <p className="text-foreground mt-2">{user.bio}</p>}
              </div>
            </div>

            {/* Edit Button */}
            <Link href="/dashboard/edit-profile">
              <Button className="bg-primary hover:bg-primary/90 gap-2">
                <Settings className="w-4 h-4" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border rounded-xl p-6 space-y-2">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">Active Listings</span>
            </div>
            <p className="text-3xl font-bold text-foreground">0</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 space-y-2">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">Saved Items</span>
            </div>
            <p className="text-3xl font-bold text-foreground">0</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 space-y-2">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">Recent Orders</span>
            </div>
            <p className="text-3xl font-bold text-foreground">0</p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/sell">
            <Button className="w-full bg-primary hover:bg-primary/90 h-12 text-base gap-2">
              <Plus className="w-5 h-5" />
              Start Selling
            </Button>
          </Link>
          <Link href="/buy">
            <Button variant="outline" className="w-full border-border hover:bg-secondary bg-transparent h-12 text-base">
              Browse Products
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
