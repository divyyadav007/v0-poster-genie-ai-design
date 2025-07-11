import { GeminiClient, type ExtractedEvent } from "./gemini-client"

export interface ProcessedEvent extends ExtractedEvent {
  prompt?: string
  imageUrl?: string
  status: "extracted" | "prompt_generated" | "image_generated" | "failed"
  createdAt: Date
  processingTime?: number
}

export interface ProcessingResult {
  success: boolean
  events?: ProcessedEvent[]
  totalEvents?: number
  successfulEvents?: number
  failedEvents?: number
  processingTime?: number
  error?: string
}

export class AIService {
  private geminiClient: GeminiClient

  constructor() {
    this.geminiClient = new GeminiClient("AIzaSyBQEmPeKEaJEXwfmRyWWB0lRYb6VV7VscA")
  }

  async processImageAndGeneratePosters(
    imageBase64: string,
    organizationId: string,
    organizationType = "educational",
    onProgress?: (progress: { current: number; total: number; event: string }) => void,
  ): Promise<ProcessingResult> {
    const startTime = Date.now()

    try {
      // Step 1: Extract events from image
      console.log("🔍 Extracting events from image...")
      onProgress?.({ current: 0, total: 100, event: "Analyzing image with Gemini AI..." })

      const extraction = await this.geminiClient.analyzeImageAndExtractEvents(imageBase64)

      if (!extraction.success || !extraction.events) {
        return {
          success: false,
          error: extraction.error || "Failed to extract events from image",
          processingTime: Date.now() - startTime,
        }
      }

      const totalEvents = extraction.events.length
      console.log(`📅 Found ${totalEvents} events`)

      // Step 2: Process each event
      const processedEvents: ProcessedEvent[] = []
      let successfulEvents = 0
      let failedEvents = 0

      for (let i = 0; i < extraction.events.length; i++) {
        const event = extraction.events[i]
        const eventStartTime = Date.now()

        onProgress?.({
          current: Math.round(((i + 1) / totalEvents) * 100),
          total: totalEvents,
          event: `Processing: ${event.name}`,
        })

        const processedEvent: ProcessedEvent = {
          ...event,
          status: "extracted",
          createdAt: new Date(),
        }

        try {
          // Generate prompt for this event
          console.log(`✨ Generating prompt for: ${event.name}`)
          const promptResult = await this.geminiClient.generatePosterPrompt(event, organizationType)

          if (promptResult.success && promptResult.prompt) {
            processedEvent.prompt = promptResult.prompt
            processedEvent.status = "prompt_generated"

            // Generate image from prompt
            console.log(`🎨 Generating image for: ${event.name}`)
            const imageResult = await this.geminiClient.generateImageFromPrompt(promptResult.prompt, event)

            if (imageResult.success && imageResult.imageUrl) {
              processedEvent.imageUrl = imageResult.imageUrl
              processedEvent.status = "image_generated"
              processedEvent.processingTime = Date.now() - eventStartTime
              successfulEvents++
            } else {
              processedEvent.status = "failed"
              failedEvents++
            }
          } else {
            processedEvent.status = "failed"
            failedEvents++
          }
        } catch (error) {
          console.error(`❌ Error processing event ${event.name}:`, error)
          processedEvent.status = "failed"
          failedEvents++
        }

        processedEvents.push(processedEvent)
      }

      // Log the processing for analytics
      await this.logEventProcessing({
        organizationId,
        totalEvents,
        successfulEvents,
        failedEvents,
        processingTime: Date.now() - startTime,
        timestamp: new Date(),
      })

      return {
        success: true,
        events: processedEvents,
        totalEvents,
        successfulEvents,
        failedEvents,
        processingTime: Date.now() - startTime,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Processing failed",
        processingTime: Date.now() - startTime,
      }
    }
  }

  async regenerateEventPoster(
    event: ExtractedEvent,
    organizationType = "educational",
  ): Promise<{
    success: boolean
    prompt?: string
    imageUrl?: string
    error?: string
  }> {
    try {
      // Generate new prompt
      const promptResult = await this.geminiClient.generatePosterPrompt(event, organizationType)

      if (!promptResult.success || !promptResult.prompt) {
        return {
          success: false,
          error: promptResult.error || "Failed to generate prompt",
        }
      }

      // Generate new image
      const imageResult = await this.geminiClient.generateImageFromPrompt(promptResult.prompt, event)

      if (!imageResult.success || !imageResult.imageUrl) {
        return {
          success: false,
          error: imageResult.error || "Failed to generate image",
        }
      }

      return {
        success: true,
        prompt: promptResult.prompt,
        imageUrl: imageResult.imageUrl,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Regeneration failed",
      }
    }
  }

  private async logEventProcessing(data: {
    organizationId: string
    totalEvents: number
    successfulEvents: number
    failedEvents: number
    processingTime: number
    timestamp: Date
  }): Promise<void> {
    console.log("📊 Event processing completed:", data)
  }
}

// Singleton instance
export const aiService = new AIService()
