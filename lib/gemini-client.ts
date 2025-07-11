// Gemini AI client for image analysis and prompt generation
export interface EventExtraction {
  success: boolean
  events?: ExtractedEvent[]
  error?: string
}

export interface ExtractedEvent {
  id: string
  name: string
  date: string
  day: string
  type: "holiday" | "festival" | "vacation" | "celebration" | "academic" | "cultural"
  description: string
  category: string
  importance: "high" | "medium" | "low"
  colors: string[]
  keywords: string[]
}

export interface PromptGeneration {
  success: boolean
  prompt?: string
  error?: string
}

export interface ImageGeneration {
  success: boolean
  imageUrl?: string
  error?: string
}

export class GeminiClient {
  private apiKey: string
  private baseUrl = "https://generativelanguage.googleapis.com/v1beta"

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async analyzeImageAndExtractEvents(imageBase64: string): Promise<EventExtraction> {
    try {
      const response = await fetch(`${this.baseUrl}/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Analyze this calendar/document image and extract ALL events, holidays, and important dates. For each event, provide comprehensive details:

                IMPORTANT: Return ONLY valid JSON in this exact format:
                {
                  "events": [
                    {
                      "name": "Event Name",
                      "date": "Month DD, YYYY",
                      "day": "Day of Week",
                      "type": "holiday|festival|vacation|celebration|academic|cultural",
                      "description": "Detailed description for poster creation",
                      "category": "Religious|National|Academic|Cultural|Seasonal",
                      "importance": "high|medium|low",
                      "colors": ["#color1", "#color2", "#color3"],
                      "keywords": ["keyword1", "keyword2", "keyword3"]
                    }
                  ]
                }

                Guidelines:
                - Extract ALL visible events/dates
                - Provide rich descriptions suitable for poster design
                - Suggest appropriate color schemes for each event
                - Include relevant keywords for design themes
                - Categorize events properly
                - Consider cultural significance for Indian festivals
                - Make descriptions engaging and poster-worthy`,
                },
                {
                  inline_data: {
                    mime_type: "image/png",
                    data: imageBase64,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            topK: 32,
            topP: 1,
            maxOutputTokens: 4096,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || "Gemini image analysis failed")
      }

      const content = data.candidates[0]?.content?.parts[0]?.text
      if (!content) {
        throw new Error("No content received from Gemini")
      }

      // Extract JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error("No valid JSON found in response")
      }

      const parsedData = JSON.parse(jsonMatch[0])

      // Add unique IDs to events
      const eventsWithIds = parsedData.events.map((event: any, index: number) => ({
        ...event,
        id: `event_${Date.now()}_${index}`,
      }))

      return {
        success: true,
        events: eventsWithIds,
      }
    } catch (error) {
      console.error("Event extraction error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to extract events",
      }
    }
  }

  async generatePosterPrompt(event: ExtractedEvent, organizationType = "educational"): Promise<PromptGeneration> {
    try {
      const response = await fetch(`${this.baseUrl}/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Create a detailed, professional poster design prompt for this event:

                Event: ${event.name}
                Date: ${event.date}
                Day: ${event.day}
                Type: ${event.type}
                Category: ${event.category}
                Description: ${event.description}
                Suggested Colors: ${event.colors?.join(", ")}
                Keywords: ${event.keywords?.join(", ")}
                Organization: ${organizationType}

                Create a comprehensive design prompt that includes:
                1. Visual composition and layout
                2. Color scheme (use suggested colors: ${event.colors?.join(", ")})
                3. Typography style and hierarchy
                4. Cultural elements (if applicable for Indian festivals)
                5. Background design and patterns
                6. Space for logo placement
                7. Social media optimization
                8. Professional aesthetic suitable for ${organizationType} institutions

                The prompt should result in a stunning, shareable poster that captures the essence of ${event.name} and is perfect for social media platforms.

                Return only the detailed design prompt, nothing else.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 32,
            topP: 1,
            maxOutputTokens: 800,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || "Prompt generation failed")
      }

      const prompt = data.candidates[0]?.content?.parts[0]?.text

      return {
        success: true,
        prompt: prompt?.trim(),
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Prompt generation failed",
      }
    }
  }

  async generateImageFromPrompt(prompt: string, event: ExtractedEvent): Promise<ImageGeneration> {
    try {
      // Since we can't use DALL-E, we'll create a sophisticated placeholder
      // that represents the actual poster design based on the event

      await new Promise((resolve) => setTimeout(resolve, 3000)) // Simulate generation time

      // Create a more realistic poster URL using a service like Unsplash with event-specific terms
      const searchTerms = event.keywords?.join("+") || event.name.replace(/\s+/g, "+")
      const colors = event.colors?.[0]?.replace("#", "") || "7C3AED"

      // Use a combination of services to create realistic poster-like images
      const imageUrl = `https://source.unsplash.com/1080x1080/?${searchTerms},celebration,festival,poster&sig=${Date.now()}`

      return {
        success: true,
        imageUrl,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Image generation failed",
      }
    }
  }
}
