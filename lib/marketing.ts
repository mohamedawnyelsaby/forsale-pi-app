export interface Promotion {
  id: string
  title: string
  description: string
  discount: number
  code: string
  expiresAt: string
  category?: string
}

export interface ReferralProgram {
  id: string
  userId: string
  referralCode: string
  referralsCount: number
  earningsTotal: number
  createdAt: string
}

export interface Analytics {
  totalUsers: number
  totalOrders: number
  totalRevenue: number
  activeListings: number
  averageOrderValue: number
  conversionRate: number
}

export const promotions: Promotion[] = [
  {
    id: "promo_1",
    title: "Welcome Bonus",
    description: "Get 10% off on your first purchase",
    discount: 10,
    code: "WELCOME10",
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    category: "all",
  },
  {
    id: "promo_2",
    title: "Electronics Sale",
    description: "20% off on all electronics",
    discount: 20,
    code: "TECH20",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    category: "Electronics",
  },
  {
    id: "promo_3",
    title: "Fashion Week",
    description: "15% off on fashion items",
    discount: 15,
    code: "FASHION15",
    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    category: "Fashion",
  },
]

export const mockAnalytics: Analytics = {
  totalUsers: 125000,
  totalOrders: 45000,
  totalRevenue: 2500000,
  activeListings: 85000,
  averageOrderValue: 55.56,
  conversionRate: 3.2,
}
