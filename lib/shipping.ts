export interface ShippingCarrier {
  id: string
  name: string
  logo: string
  estimatedDays: number
  price: number
}

export interface TrackingEvent {
  status: "pending" | "processing" | "shipped" | "in-transit" | "out-for-delivery" | "delivered" | "failed"
  timestamp: string
  location: string
  description: string
}

export interface Shipment {
  id: string
  orderId: string
  carrier: ShippingCarrier
  trackingNumber: string
  status: TrackingEvent["status"]
  events: TrackingEvent[]
  estimatedDelivery: string
  createdAt: string
}

export const shippingCarriers: ShippingCarrier[] = [
  {
    id: "fedex",
    name: "FedEx",
    logo: "📦",
    estimatedDays: 2,
    price: 15.99,
  },
  {
    id: "ups",
    name: "UPS",
    logo: "📦",
    estimatedDays: 3,
    price: 12.99,
  },
  {
    id: "usps",
    name: "USPS",
    logo: "📮",
    estimatedDays: 5,
    price: 8.99,
  },
  {
    id: "dhl",
    name: "DHL",
    logo: "📦",
    estimatedDays: 4,
    price: 18.99,
  },
]

export function createShipment(orderId: string, carrier: ShippingCarrier): Shipment {
  const trackingNumber = `${carrier.id.toUpperCase()}${Date.now()}`
  const estimatedDelivery = new Date()
  estimatedDelivery.setDate(estimatedDelivery.getDate() + carrier.estimatedDays)

  return {
    id: `ship_${Date.now()}`,
    orderId,
    carrier,
    trackingNumber,
    status: "processing",
    events: [
      {
        status: "processing",
        timestamp: new Date().toISOString(),
        location: "Warehouse",
        description: "Your order is being prepared for shipment",
      },
    ],
    estimatedDelivery: estimatedDelivery.toISOString(),
    createdAt: new Date().toISOString(),
  }
}

export function updateShipmentStatus(shipment: Shipment, newStatus: TrackingEvent["status"]): Shipment {
  const statusMessages: Record<TrackingEvent["status"], string> = {
    pending: "Order pending",
    processing: "Order is being prepared",
    shipped: "Package has been shipped",
    "in-transit": "Package is in transit",
    "out-for-delivery": "Package is out for delivery",
    delivered: "Package has been delivered",
    failed: "Delivery failed",
  }

  const newEvent: TrackingEvent = {
    status: newStatus,
    timestamp: new Date().toISOString(),
    location: ["Warehouse", "Distribution Center", "Local Hub", "Your Area", "Delivered"][
      Math.floor(Math.random() * 5)
    ],
    description: statusMessages[newStatus],
  }

  return {
    ...shipment,
    status: newStatus,
    events: [...shipment.events, newEvent],
  }
}

export function getShipmentProgress(shipment: Shipment): number {
  const statuses: TrackingEvent["status"][] = [
    "pending",
    "processing",
    "shipped",
    "in-transit",
    "out-for-delivery",
    "delivered",
  ]
  const currentIndex = statuses.indexOf(shipment.status)
  return ((currentIndex + 1) / statuses.length) * 100
}
