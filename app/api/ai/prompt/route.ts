import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventDescription, organizationType, style } = body

    if (!eventDescription || !organizationType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await aiService.generateSmartPrompt(eventDescription, organizationType, style || "modern")

    return NextResponse.json(result)
  } catch (error) {
    console.error("Prompt generation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
