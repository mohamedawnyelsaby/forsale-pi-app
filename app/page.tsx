"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Download, Home } from "lucide-react"

export default function OrderConfirmationPage({ params }: { params: { transactionId: string } }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-6">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Order Confirmed</h1>
              <p className="text-muted-foreground">Thank you for your purchase on Forsale</p>
            </div>

            {/* Transaction ID */}
            <div className="bg-secondary border border-border rounded-lg p-4 space-y-2">
              <p className="text-sm text-muted-foreground">Transaction ID</p>
              <p className="font-mono text-foreground break-all">{params.transactionId}</p>
            </div>

            {/* Details */}
            <div className="bg-secondary/50 border border-border rounded-lg p-6 text-left space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <p className="font-semibold text-green-500">Payment Completed</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                <p className="font-semibold text-foreground">Pi Network (π)</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                <p className="font-semibold text-foreground">{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            {/* Info */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-sm text-blue-500">
              <p>
                Your order will be processed and shipped within 24-48 hours. You'll receive tracking information via
                email.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/dashboard" className="flex-1">
                <Button className="w-full bg-primary hover:bg-primary/90 gap-2 h-12">
                  <Home className="w-4 h-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <Button variant="outline" className="flex-1 border-border hover:bg-secondary bg-transparent gap-2 h-12">
                <Download className="w-4 h-4" />
                Download Invoice
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
