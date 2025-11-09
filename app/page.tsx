"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { searchProducts, type SearchFilters, type Product } from "@/lib/products"
import { Search, Filter, Star, ShoppingCart, ChevronDown } from "lucide-react"

const categories = ["All", "Electronics", "Real Estate", "Vehicles", "Fashion", "Accessories", "Furniture"]
const conditions = ["All", "New", "Like-new", "Good", "Fair"]

export default function BuyPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<SearchFilters>({
    category: "all",
    minPrice: 0,
    maxPrice: 1000000,
    condition: "all",
    minRating: 0,
    sortBy: "newest",
  })
  const [showFilters, setShowFilters] = useState(false)

  const results = useMemo(() => searchProducts(searchQuery, filters), [searchQuery, filters])

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      category: category === "All" ? "all" : category,
    }))
  }

  const handleConditionChange = (condition: string) => {
    setFilters((prev) => ({
      ...prev,
      condition: condition === "All" ? "all" : condition.toLowerCase(),
    }))
  }

  const handlePriceChange = (type: "min" | "max", value: string) => {
    const numValue = value ? Number.parseInt(value) : undefined
    setFilters((prev) => ({
      ...prev,
      [type === "min" ? "minPrice" : "maxPrice"]: numValue,
    }))
  }

  const handleSortChange = (sortBy: string) => {
    setFilters((prev) => ({
      ...prev,
      sortBy,
    }))
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Search Section */}
        <section className="bg-card border-b border-border py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-foreground">Browse Products</h1>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products, categories, or sellers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground h-12"
                />
              </div>

              {/* Results Count */}
              <p className="text-sm text-muted-foreground">
                Found {results.length} product{results.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className={`${showFilters ? "block" : "hidden"} lg:block lg:col-span-1`}>
              <div className="bg-card border border-border rounded-xl p-6 space-y-6 sticky top-20">
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                  </h3>
                </div>

                {/* Category Filter */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">Category</h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition ${
                          (filters.category === "all" && cat === "All") || (filters.category === cat && cat !== "All")
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-secondary"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">Price Range</h4>
                  <div className="space-y-2">
                    <Input
                      type="number"
                      placeholder="Min price"
                      value={filters.minPrice || ""}
                      onChange={(e) => handlePriceChange("min", e.target.value)}
                      className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                    />
                    <Input
                      type="number"
                      placeholder="Max price"
                      value={filters.maxPrice || ""}
                      onChange={(e) => handlePriceChange("max", e.target.value)}
                      className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                {/* Condition Filter */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">Condition</h4>
                  <div className="space-y-2">
                    {conditions.map((cond) => (
                      <button
                        key={cond}
                        onClick={() => handleConditionChange(cond)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition ${
                          (filters.condition === "all" && cond === "All") ||
                          (filters.condition === cond.toLowerCase() && cond !== "All")
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-secondary"
                        }`}
                      >
                        {cond}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">Sort By</h4>
                  <div className="relative">
                    <select
                      value={filters.sortBy || "newest"}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground appearance-none cursor-pointer"
                    >
                      <option value="newest">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-6">
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  className="w-full border-border hover:bg-secondary bg-transparent gap-2"
                >
                  <Filter className="w-4 h-4" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
              </div>

              {/* Products */}
              {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No products found matching your criteria</p>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setFilters({
                        category: "all",
                        minPrice: 0,
                        maxPrice: 1000000,
                        condition: "all",
                        minRating: 0,
                        sortBy: "newest",
                      })
                    }}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden h-48 bg-secondary">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3 flex-1 flex flex-col">
          <div className="flex items-start justify-between">
            <div className="flex-1">
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
                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"}`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Location */}
          <p className="text-xs text-muted-foreground">{product.location}</p>

          {/* Price and Button */}
          <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
            <div className="text-lg font-bold text-primary">${product.price.toLocaleString()}</div>
            <button className="p-2 bg-primary hover:bg-primary/90 rounded-lg transition">
              <ShoppingCart className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
