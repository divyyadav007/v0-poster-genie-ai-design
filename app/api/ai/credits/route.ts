import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const organizationId = searchParams.get("organizationId")

    if (!organizationId) {
      return NextResponse.json({ error: "Organization ID required" }, { status: 400 })
    }

    const credits = await aiService.getCreditBalance(organizationId)

    return NextResponse.json(credits)
  } catch (error) {
    console.error("Credits fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
