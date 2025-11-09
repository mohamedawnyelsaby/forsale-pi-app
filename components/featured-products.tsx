import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 299,
    rating: 4.8,
    reviews: 324,
    image: "/premium-wireless-headphones.png",
  },
  {
    id: 2,
    name: "Modern Apartment in Downtown",
    category: "Real Estate",
    price: 450000,
    rating: 4.9,
    reviews: 156,
    image: "/modern-apartment-downtown.jpg",
  },
  {
    id: 3,
    name: "Tesla Model 3",
    category: "Vehicles",
    price: 45000,
    rating: 4.7,
    reviews: 89,
    image: "/tesla-model-3-sleek-profile.png",
  },
  {
    id: 4,
    name: "Designer Leather Jacket",
    category: "Fashion",
    price: 599,
    rating: 4.6,
    reviews: 234,
    image: "/designer-leather-jacket.jpg",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Featured Listings</h2>
            <p className="text-lg text-muted-foreground">Handpicked by our AI for you</p>
          </div>
          <Button variant="outline" className="hidden md:inline-flex border-border hover:bg-secondary bg-transparent">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-background border border-border rounded-xl overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48 bg-secondary">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-primary font-semibold">{product.category}</p>
                    <h3 className="font-semibold text-foreground line-clamp-2">{product.name}</h3>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="text-lg font-bold text-primary">${product.price.toLocaleString()}</div>
                  <button className="p-2 bg-primary hover:bg-primary/90 rounded-lg transition">
                    <ShoppingCart className="w-4 h-4 text-primary-foreground" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Button className="w-full bg-primary hover:bg-primary/90">View All Products</Button>
        </div>
      </div>
    </section>
  )
}
