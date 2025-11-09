import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { network } = await request.json()

    if (!["testnet", "mainnet"].includes(network)) {
      return NextResponse.json({ error: "Invalid network" }, { status: 400 })
    }

    // In production, update user's network preference in database
    console.log(`[Pi Network] Switched to ${network}`)

    return NextResponse.json({ success: true, network })
  } catch (error) {
    console.error("[Pi Network] Network switch error:", error)
    return NextResponse.json({ error: "Failed to switch network" }, { status: 500 })
  }
}
