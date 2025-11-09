// Complete Pi Network Integration for Forsale
export interface PiPaymentConfig {
  network: "testnet" | "mainnet"
  userId: string
}

export interface PiTransaction {
  id: string
  amount: number
  currency: string
  status: "pending" | "completed" | "failed"
  timestamp: number
  network: "testnet" | "mainnet"
}

// Client-side interface only - actual operations handled by server
export class PiNetworkClient {
  private network: "testnet" | "mainnet" = "testnet"

  setNetwork(network: "testnet" | "mainnet"): void {
    this.network = network
  }

  getNetwork(): "testnet" | "mainnet" {
    return this.network
  }

  // Client-side method to initiate payment (calls server endpoint)
  async initiatePayment(amount: number, orderId: string): Promise<{ transactionId: string }> {
    const response = await fetch("/api/pi-network/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, orderId, network: this.network }),
    })

    if (!response.ok) throw new Error("Payment initiation failed")
    return response.json()
  }

  // Client-side method to check transaction status
  async checkTransactionStatus(transactionId: string): Promise<PiTransaction> {
    const response = await fetch(`/api/pi-network/transaction/${transactionId}`)

    if (!response.ok) throw new Error("Failed to check transaction status")
    return response.json()
  }

  // Client-side method to switch network
  async switchNetwork(network: "testnet" | "mainnet"): Promise<boolean> {
    const response = await fetch("/api/pi-network/switch-network", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ network }),
    })

    if (response.ok) {
      this.network = network
      return true
    }
    return false
  }
}

export const piNetworkClient = new PiNetworkClient()
