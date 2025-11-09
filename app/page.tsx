"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Copy, Users, TrendingUp, Gift } from "lucide-react"

export default function ReferralPage() {
  const [copied, setCopied] = useState(false)
  const referralCode = "FORSALE_USER123"
  const referrals = 12
  const earnings = 450.75

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Referral Program</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Earn money by referring friends to Forsale. Get 5% commission on every purchase they make.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Stats */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-2">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Referrals</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{referrals}</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 space-y-2">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Total Earnings</span>
              </div>
              <p className="text-3xl font-bold text-primary">${earnings.toFixed(2)}</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 space-y-2">
              <div className="flex items-center gap-3">
                <Gift className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Commission Rate</span>
              </div>
              <p className="text-3xl font-bold text-foreground">5%</p>
            </div>
          </div>

          {/* Referral Code */}
          <div className="bg-card border border-border rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Your Referral Code</h2>
            <div className="bg-secondary border border-border rounded-lg p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Share this code with friends</p>
                <code className="text-2xl font-bold text-foreground">{referralCode}</code>
              </div>
              <button onClick={handleCopyCode} className="p-3 bg-primary hover:bg-primary/90 rounded-lg transition">
                <Copy className={`w-5 h-5 ${copied ? "text-green-500" : "text-primary-foreground"}`} />
              </button>
            </div>
            {copied && <p className="text-sm text-green-500 mt-2">Copied to clipboard!</p>}
          </div>

          {/* How It Works */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: 1,
                  title: "Share Your Code",
                  description: "Share your unique referral code with friends and family",
                },
                {
                  step: 2,
                  title: "They Sign Up",
                  description: "Your friends create an account using your referral code",
                },
                {
                  step: 3,
                  title: "You Earn",
                  description: "Get 5% commission on every purchase they make",
                },
              ].map((item) => (
                <div key={item.step} className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
