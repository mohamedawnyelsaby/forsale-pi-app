import type { Product } from "./products"

export interface CartItem {
  product: Product
  quantity: number
  addedAt: string
}

export interface Cart {
  items: CartItem[]
  total: number
}

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
}

export function addToCart(items: CartItem[], product: Product, quantity = 1): CartItem[] {
  const existingItem = items.find((item) => item.product.id === product.id)

  if (existingItem) {
    return items.map((item) =>
      item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
    )
  }

  return [
    ...items,
    {
      product,
      quantity,
      addedAt: new Date().toISOString(),
    },
  ]
}

export function removeFromCart(items: CartItem[], productId: string): CartItem[] {
  return items.filter((item) => item.product.id !== productId)
}

export function updateCartItemQuantity(items: CartItem[], productId: string, quantity: number): CartItem[] {
  if (quantity <= 0) {
    return removeFromCart(items, productId)
  }

  return items.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
}
