// app/page.tsx (الكود الآمن للتشغيل)
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
// تم حذف جميع استيرادات Lucide-React التي لم تستخدم (لضمان النظافة فقط)

import {
  Menu, X, Search, ShoppingCart, LogOut, Star, ArrowRight, Zap, CheckCircle2,
  Github, Twitter, Linkedin, ShoppingBag, HomeIcon, Car, Shirt, Watch, Sofa, Smartphone,
} from "lucide-react"


// ============================================================================
// TYPES & INTERFACES (تم تركها كما هي)
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
// HEADER COMPONENT (تم تركه كما هو)
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
            <Link href="#buy" className="text-foreground hover:text-primary transition">Buy</Link>
            <Link href="#sell" className="text-foreground hover:text-primary transition">Sell</Link>
            <Link href="#categories" className="text-foreground hover:text-primary transition">Categories</Link>
            <Link href="#about" className="text-foreground hover:text-primary transition">About</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-secondary rounded-lg transition"><Search className="w-5 h-5 text-foreground" /></button>
            <button className="p-2 hover:bg-secondary rounded-lg transition"><ShoppingCart className="w-5 h-5 text-foreground" /></button>

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
              // تم تعديل هذا الزر ليقوم بالتسجيل كمستخدم تجريبي بدلاً من انتظار دالة خارجية مفقودة
              <button
                onClick={() => {
                   const dummyUser: UserProfile = { id: "test-id-123", full_name: "Test User", email: "test@example.com" };
                   localStorage.setItem("user", JSON.stringify(dummyUser));
                   window.location.reload(); // لإعادة تحميل الصفحة وعرض المستخدم
                }}
                className="hidden sm:inline-flex px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition"
              >
                Sign In (Test)
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
            <Link href="#buy" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg">Buy</Link>
            <Link href="#sell" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg">Sell</Link>
            <Link href="#categories" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg">Categories</Link>
            <Link href="#about" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg">About</Link>
          </nav>
        )}
      </div>
    </header>
  )
}

// ... بقية المكونات (Hero, Categories, FeaturedProducts, HowItWorks, Footer) كما هي ...
// لم يتم تغيير أي شيء في هذه المكونات لأنها تبدو سليمة ولا تتصل بالخدمات

// ============================================================================
// MAIN PAGE COMPONENT (التعديل الرئيسي هنا)
// ============================================================================

export default function ForsalePage() {
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    // محاكاة تحقق المستخدم - سيظل الكود كما هو
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleSignOut = () => {
    // دالة تسجيل الخروج لا تتصل بـ Supabase الآن
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

// ضع هنا جميع المكونات المتبقية (Hero, Categories, FeaturedProducts, HowItWorks, Footer)
// التي لم يتم تغييرها في الكود الذي أرسلته.
// ...
// ...
