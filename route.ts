import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, amount, userId } = body

    if (action === "initiate_payment") {
      return NextResponse.json({
        success: true,
        transactionId: `tx_${Date.now()}`,
        status: "pending",
        amount: amount,
        network: "testnet",
      })
    }

    if (action === "check_balance") {
      return NextResponse.json({
        balance: 100.5,
        userId: userId,
        network: "testnet",
      })
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
