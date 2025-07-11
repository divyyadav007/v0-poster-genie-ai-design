import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { engine, prompt, aspectRatio, style, quality, organizationId, userId } = body

    // Validate required fields
    if (!engine || !prompt || !aspectRatio || !organizationId || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate poster using AI service
    const result = await aiService.generatePoster({
      engine,
      prompt,
      aspectRatio,
      style,
      quality,
      organizationId,
      userId,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("AI generation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
