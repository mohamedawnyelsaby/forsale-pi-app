import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // In production, fetch from database
    const transaction = {
      id,
      amount: 100,
      currency: "PI",
      status: "completed",
      timestamp: Date.now(),
      network: "testnet",
    }

    return NextResponse.json(transaction)
  } catch (error) {
    console.error("[Pi Network] Transaction lookup error:", error)
    return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
  }
}
