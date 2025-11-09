export interface PiPaymentConfig {
  apiKey: string
  environment: "testnet" | "mainnet"
}

export interface PaymentRequest {
  amount: number
  currency: string
  description: string
  orderId: string
  userId: string
}

export interface PaymentResponse {
  transactionId: string
  status: "pending" | "completed" | "failed"
  amount: number
  timestamp: string
}

// Mock Pi Network payment integration
export async function initiatePiPayment(request: PaymentRequest): Promise<PaymentResponse> {
  // In production, this would call the actual Pi Network API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        transactionId: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: "completed",
        amount: request.amount,
        timestamp: new Date().toISOString(),
      })
    }, 2000)
  })
}

export async function verifyPiPayment(transactionId: string): Promise<PaymentResponse | null> {
  // In production, this would verify with Pi Network API
  return {
    transactionId,
    status: "completed",
    amount: 0,
    timestamp: new Date().toISOString(),
  }
}

export function formatPiAmount(amount: number): string {
  return `π${amount.toFixed(2)}`
}
