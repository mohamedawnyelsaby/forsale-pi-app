// Analytics and Performance Tracking
export interface AnalyticsEvent {
  event: string
  timestamp: number
  userId?: string
  data: Record<string, any>
}

class AnalyticsEngine {
  private events: AnalyticsEvent[] = []

  trackEvent(event: string, data: Record<string, any> = {}): void {
    this.events.push({
      event,
      timestamp: Date.now(),
      data,
    })
  }

  trackPageView(page: string): void {
    this.trackEvent("page_view", { page })
  }

  trackSearch(query: string, results: number): void {
    this.trackEvent("search", { query, results })
  }

  trackProductView(productId: string, category: string): void {
    this.trackEvent("product_view", { productId, category })
  }

  trackAddToCart(productId: string, price: number): void {
    this.trackEvent("add_to_cart", { productId, price })
  }

  trackCheckout(total: number, itemCount: number): void {
    this.trackEvent("checkout", { total, itemCount })
  }

  trackPurchase(orderId: string, amount: number): void {
    this.trackEvent("purchase", { orderId, amount })
  }

  getAnalytics() {
    return {
      totalEvents: this.events.length,
      events: this.events,
      summary: {
        searches: this.events.filter((e) => e.event === "search").length,
        views: this.events.filter((e) => e.event === "product_view").length,
        purchases: this.events.filter((e) => e.event === "purchase").length,
      },
    }
  }
}

export const analytics = new AnalyticsEngine()
