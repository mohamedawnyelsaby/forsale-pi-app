import { CheckCircle2, Search, CreditCard, Truck, MessageSquare } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "AI Search",
    description: "Our AI understands what you want and finds the perfect match instantly",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Pay safely with Pi Network. Your transaction is protected end-to-end",
  },
  {
    icon: Truck,
    title: "Smart Shipping",
    description: "AI optimizes delivery routes and tracks your package in real-time",
  },
  {
    icon: MessageSquare,
    title: "AI Support",
    description: "24/7 intelligent support resolves issues before they become problems",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How Forsale Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience seamless buying and selling powered entirely by artificial intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
                )}

                {/* Card */}
                <div className="relative bg-card border border-border rounded-xl p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Benefits */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            { title: "Zero Human Intervention", desc: "Fully automated from start to finish" },
            { title: "Lightning Fast", desc: "AI processes everything in seconds" },
            { title: "Global Scale", desc: "Available in 50+ countries worldwide" },
          ].map((benefit, i) => (
            <div key={i} className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
