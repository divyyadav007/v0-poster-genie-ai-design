import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, organizationType } = body

    if (!event) {
      return NextResponse.json({ error: "Event data required" }, { status: 400 })
    }

    // Validate event structure
    if (!event.name || !event.date || !event.type) {
      return NextResponse.json({ error: "Invalid event data structure" }, { status: 400 })
    }

    const result = await aiService.regenerateEventPoster(event, organizationType || "educational")

    return NextResponse.json(result)
  } catch (error) {
    console.error("Event regeneration error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
