export interface Product {
  id: string
  name: string
  category: string
  price: number
  rating: number
  reviews: number
  image: string
  description: string
  seller: string
  location: string
  condition: "new" | "like-new" | "good" | "fair"
  createdAt: string
}

// Mock products database
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 299,
    rating: 4.8,
    reviews: 324,
    image: "/wireless-headphones.png",
    description: "High-quality wireless headphones with noise cancellation",
    seller: "TechStore",
    location: "New York, USA",
    condition: "new",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Modern Apartment in Downtown",
    category: "Real Estate",
    price: 450000,
    rating: 4.9,
    reviews: 156,
    image: "/modern-apartment-living.png",
    description: "Beautiful 2-bedroom apartment with city views",
    seller: "RealEstateAgency",
    location: "Downtown, USA",
    condition: "new",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Tesla Model 3",
    category: "Vehicles",
    price: 45000,
    rating: 4.7,
    reviews: 89,
    image: "/tesla-model-3-sleek-profile.png",
    description: "2023 Tesla Model 3 with full autopilot",
    seller: "AutoDealer",
    location: "Los Angeles, USA",
    condition: "like-new",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Designer Leather Jacket",
    category: "Fashion",
    price: 599,
    rating: 4.6,
    reviews: 234,
    image: "/classic-leather-jacket.png",
    description: "Premium Italian leather jacket",
    seller: "FashionBoutique",
    location: "Milan, Italy",
    condition: "new",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Gold Necklace",
    category: "Accessories",
    price: 899,
    rating: 4.9,
    reviews: 156,
    image: "/gold-necklace.png",
    description: "18K gold necklace with diamond pendant",
    seller: "JewelryStore",
    location: "Dubai, UAE",
    condition: "new",
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Modern Sofa Set",
    category: "Furniture",
    price: 1299,
    rating: 4.5,
    reviews: 89,
    image: "/modern-sofa.png",
    description: "Contemporary 3-piece sofa set",
    seller: "FurnitureStore",
    location: "London, UK",
    condition: "new",
    createdAt: new Date().toISOString(),
  },
]

export function searchProducts(query: string, filters: SearchFilters): Product[] {
  let results = mockProducts

  // Text search
  if (query.trim()) {
    const searchTerm = query.toLowerCase()
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm),
    )
  }

  // Category filter
  if (filters.category && filters.category !== "all") {
    results = results.filter((p) => p.category === filters.category)
  }

  // Price range filter
  if (filters.minPrice !== undefined) {
    results = results.filter((p) => p.price >= filters.minPrice!)
  }
  if (filters.maxPrice !== undefined) {
    results = results.filter((p) => p.price <= filters.maxPrice!)
  }

  // Condition filter
  if (filters.condition && filters.condition !== "all") {
    results = results.filter((p) => p.condition === filters.condition)
  }

  // Rating filter
  if (filters.minRating !== undefined) {
    results = results.filter((p) => p.rating >= filters.minRating!)
  }

  // Sort
  if (filters.sortBy === "price-low") {
    results.sort((a, b) => a.price - b.price)
  } else if (filters.sortBy === "price-high") {
    results.sort((a, b) => b.price - a.price)
  } else if (filters.sortBy === "rating") {
    results.sort((a, b) => b.rating - a.rating)
  } else if (filters.sortBy === "newest") {
    results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  return results
}

export interface SearchFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  condition?: string
  minRating?: number
  sortBy?: string
}
