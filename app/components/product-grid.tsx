"use client"

import { ShoppingCart, Heart } from "lucide-react"

interface Product {
  id: number
  name: string
  desc: string
  price: number
  image: string
  rating: number
  seller: string
}

interface ProductGridProps {
  products: Product[]
  onAddToCart: (product: Product) => void
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  return (
    <div className="products">
      {products.map((product) => (
        <div key={product.id} className="product">
          <img src={product.image || "/placeholder.svg"} alt={product.name} />
          <div className="title">{product.name}</div>
          <div className="desc">{product.desc}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
            <div className="price">π {product.price}</div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                className="ghost"
                style={{ padding: "6px", borderRadius: "6px" }}
                onClick={() => onAddToCart(product)}
              >
                <ShoppingCart size={16} />
              </button>
              <button className="ghost" style={{ padding: "6px", borderRadius: "6px" }}>
                <Heart size={16} />
              </button>
            </div>
          </div>
          <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "8px" }}>
            ⭐ {product.rating} • {product.seller}
          </div>
        </div>
      ))}
    </div>
  )
}
