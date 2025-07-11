import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventDescription, platform } = body

    if (!eventDescription || !platform) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await aiService.generateCaption(eventDescription, platform)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Caption generation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
