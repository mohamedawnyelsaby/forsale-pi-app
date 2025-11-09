import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft } from "lucide-react"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-8 space-y-6 text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
            <Mail className="w-8 h-8 text-primary" />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Verify Your Email</h1>
            <p className="text-muted-foreground">
              We've sent a verification link to your email address. Please check your inbox and click the link to verify
              your account.
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-secondary/50 border border-border rounded-lg p-4 space-y-2">
            <p className="text-sm text-foreground font-medium">Didn't receive the email?</p>
            <p className="text-sm text-muted-foreground">Check your spam folder or try signing up again.</p>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4">
            <Link href="/auth/signin">
              <Button className="w-full bg-primary hover:bg-primary/90">Back to Sign In</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full border-border hover:bg-secondary bg-transparent">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
