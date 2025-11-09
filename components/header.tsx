"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X, Search, ShoppingCart, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase"

interface UserProfile {
  id: string
  full_name: string
  email: string
  avatar_url: string | null
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (authUser) {
          const { data: profile } = await supabase.from("profiles").select("*").eq("id", authUser.id).single()

          if (profile) {
            setUser(profile)
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline">Forsale</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/buy" className="text-foreground hover:text-primary transition">
              Buy
            </Link>
            <Link href="/sell" className="text-foreground hover:text-primary transition">
              Sell
            </Link>
            <Link href="/categories" className="text-foreground hover:text-primary transition">
              Categories
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition">
              About
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-secondary rounded-lg transition">
              <Search className="w-5 h-5 text-foreground" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg transition">
              <ShoppingCart className="w-5 h-5 text-foreground" />
            </button>

            {!loading && (
              <>
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

                    {/* User Dropdown Menu */}
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2 px-4 py-3 text-foreground hover:bg-secondary transition"
                        >
                          <User className="w-4 h-4" />
                          Dashboard
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2 px-4 py-3 text-destructive hover:bg-secondary transition text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href="/auth/signin">
                    <Button className="hidden sm:inline-flex bg-primary hover:bg-primary/90">Sign In</Button>
                  </Link>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition"
            >
              {isOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link href="/buy" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg">
              Buy
            </Link>
            <Link href="/sell" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg">
              Sell
            </Link>
            <Link href="/categories" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg">
              Categories
            </Link>
            <Link href="/about" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg">
              About
            </Link>
            {user && (
              <>
                <Link href="/dashboard" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg">
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-destructive hover:bg-secondary rounded-lg"
                >
                  Sign Out
                </button>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
