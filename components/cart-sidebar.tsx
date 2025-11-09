"use client"

import { Trash2 } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartSidebarProps {
  items: CartItem[]
  onRemove: (id: number) => void
  onCheckout: () => void
}

export function CartSidebar({ items, onRemove, onCheckout }: CartSidebarProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="right">
      <div className="card">
        <div style={{ fontWeight: "700", marginBottom: "14px", fontSize: "18px" }}>🛒 Cart</div>

        {items.length === 0 ? (
          <div style={{ textAlign: "center", color: "var(--muted)", padding: "20px" }}>Your cart is empty</div>
        ) : (
          <>
            <div style={{ maxHeight: "400px", overflowY: "auto", marginBottom: "14px" }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: "10px",
                    background: "rgba(255, 212, 0, 0.05)",
                    borderRadius: "8px",
                    marginBottom: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: "700", fontSize: "14px" }}>{item.name}</div>
                    <div style={{ fontSize: "12px", color: "var(--muted)" }}>
                      π {item.price} × {item.quantity}
                    </div>
                  </div>
                  <button
                    className="ghost"
                    style={{ padding: "4px", borderRadius: "4px" }}
                    onClick={() => onRemove(item.id)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "12px", marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700", fontSize: "16px" }}>
                <span>Total:</span>
                <span style={{ color: "var(--pi-yellow)" }}>π {total.toFixed(2)}</span>
              </div>
            </div>

            <button className="btn" style={{ width: "100%" }} onClick={onCheckout}>
              Checkout with Pi
            </button>
          </>
        )}
      </div>
    </div>
  )
}
