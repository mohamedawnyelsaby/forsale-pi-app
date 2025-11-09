import { ShoppingBag, Home, Car, Shirt, Zap, Sofa, Watch, Smartphone } from "lucide-react"

const categories = [
  { name: "Electronics", icon: Smartphone, color: "from-blue-500 to-blue-600" },
  { name: "Real Estate", icon: Home, color: "from-green-500 to-green-600" },
  { name: "Vehicles", icon: Car, color: "from-red-500 to-red-600" },
  { name: "Fashion", icon: Shirt, color: "from-pink-500 to-pink-600" },
  { name: "Accessories", icon: Watch, color: "from-purple-500 to-purple-600" },
  { name: "Furniture", icon: Sofa, color: "from-orange-500 to-orange-600" },
  { name: "Energy", icon: Zap, color: "from-yellow-500 to-yellow-600" },
  { name: "More", icon: ShoppingBag, color: "from-gray-500 to-gray-600" },
]

export function Categories() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Explore Categories</h2>
          <p className="text-lg text-muted-foreground">
            Find anything you're looking for across our diverse marketplace
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.name}
                className="group relative overflow-hidden bg-card border border-border rounded-xl p-6 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative space-y-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground text-left">{category.name}</h3>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
