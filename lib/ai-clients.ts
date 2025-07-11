// AI API clients configuration and initialization
export interface AIGenerationOptions {
  prompt: string
  aspectRatio: string
  style?: string
  quality?: string
  size?: string
}

export interface AIResponse {
  success: boolean
  imageUrl?: string
  error?: string
  creditsUsed: number
  generationTime: number
}

// DALL·E 3 Client
export class DalleClient {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async generateImage(options: AIGenerationOptions): Promise<AIResponse> {
    const startTime = Date.now()

    try {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: options.prompt,
          n: 1,
          size: this.mapAspectRatioToSize(options.aspectRatio),
          quality: options.quality || "hd",
          style: options.style || "vivid",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || "DALL·E generation failed")
      }

      return {
        success: true,
        imageUrl: data.data[0].url,
        creditsUsed: 1,
        generationTime: Date.now() - startTime,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        creditsUsed: 0,
        generationTime: Date.now() - startTime,
      }
    }
  }

  private mapAspectRatioToSize(aspectRatio: string): string {
    const sizeMap: Record<string, string> = {
      square: "1024x1024",
      landscape: "1792x1024",
      portrait: "1024x1792",
    }
    return sizeMap[aspectRatio] || "1024x1024"
  }
}

// Leonardo AI Client
export class LeonardoClient {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async generateImage(options: AIGenerationOptions): Promise<AIResponse> {
    const startTime = Date.now()

    try {
      // Step 1: Create generation
      const generationResponse = await fetch("https://cloud.leonardo.ai/api/rest/v1/generations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: options.prompt,
          modelId: "6bef9f1b-29cb-40c7-b9df-32b51c1f67d3", // Leonardo Creative model
          width: this.getDimensions(options.aspectRatio).width,
          height: this.getDimensions(options.aspectRatio).height,
          num_images: 1,
          guidance_scale: 7,
          sd_version: "v2",
        }),
      })

      const generationData = await generationResponse.json()

      if (!generationResponse.ok) {
        throw new Error(generationData.error || "Leonardo generation failed")
      }

      const generationId = generationData.sdGenerationJob.generationId

      // Step 2: Poll for completion
      let attempts = 0
      const maxAttempts = 30

      while (attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 2000)) // Wait 2 seconds

        const statusResponse = await fetch(`https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`, {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        })

        const statusData = await statusResponse.json()

        if (statusData.generations_by_pk?.status === "COMPLETE") {
          const imageUrl = statusData.generations_by_pk.generated_images[0]?.url

          return {
            success: true,
            imageUrl,
            creditsUsed: 1,
            generationTime: Date.now() - startTime,
          }
        }

        attempts++
      }

      throw new Error("Generation timeout")
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        creditsUsed: 0,
        generationTime: Date.now() - startTime,
      }
    }
  }

  private getDimensions(aspectRatio: string): { width: number; height: number } {
    const dimensionMap: Record<string, { width: number; height: number }> = {
      square: { width: 1024, height: 1024 },
      landscape: { width: 1344, height: 768 },
      portrait: { width: 768, height: 1344 },
      story: { width: 512, height: 912 },
    }
    return dimensionMap[aspectRatio] || { width: 1024, height: 1024 }
  }
}

// Runway ML Client
export class RunwayClient {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async generateImage(options: AIGenerationOptions): Promise<AIResponse> {
    const startTime = Date.now()

    try {
      const response = await fetch("https://api.runwayml.com/v1/image_generations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: options.prompt,
          model: "runway-ml/stable-diffusion-v1-5",
          width: this.getDimensions(options.aspectRatio).width,
          height: this.getDimensions(options.aspectRatio).height,
          num_inference_steps: 50,
          guidance_scale: 7.5,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Runway generation failed")
      }

      return {
        success: true,
        imageUrl: data.images[0].url,
        creditsUsed: 1,
        generationTime: Date.now() - startTime,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        creditsUsed: 0,
        generationTime: Date.now() - startTime,
      }
    }
  }

  private getDimensions(aspectRatio: string): { width: number; height: number } {
    const dimensionMap: Record<string, { width: number; height: number }> = {
      square: { width: 512, height: 512 },
      landscape: { width: 768, height: 512 },
      portrait: { width: 512, height: 768 },
      story: { width: 512, height: 896 },
    }
    return dimensionMap[aspectRatio] || { width: 512, height: 512 }
  }
}

// GPT-4o Client for prompt generation
export class GPTClient {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async generatePrompt(
    eventDescription: string,
    organizationType: string,
    style: string,
  ): Promise<{ success: boolean; prompt?: string; error?: string }> {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are an expert poster design prompt generator for ${organizationType} organizations. Create detailed, professional prompts for AI image generation that will result in stunning event posters.`,
            },
            {
              role: "user",
              content: `Create a detailed AI image generation prompt for this event: "${eventDescription}". 
              
              Style preference: ${style}
              Organization type: ${organizationType}
              
              The prompt should include:
              - Visual composition and layout
              - Color scheme and typography style
              - Mood and atmosphere
              - Professional design elements
              - Space for logo placement
              
              Make it specific and detailed for best AI generation results.`,
            },
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || "GPT-4o prompt generation failed")
      }

      return {
        success: true,
        prompt: data.choices[0].message.content,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  async generateCaption(
    eventDescription: string,
    platform: string,
  ): Promise<{ success: boolean; caption?: string; error?: string }> {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are a social media expert specializing in ${platform} content for educational and organizational events.`,
            },
            {
              role: "user",
              content: `Create an engaging ${platform} caption for this event: "${eventDescription}". 
              
              Include:
              - Compelling hook
              - Event details
              - Call to action
              - Relevant hashtags
              - Appropriate emojis
              
              Keep it optimized for ${platform} best practices.`,
            },
          ],
          max_tokens: 200,
          temperature: 0.8,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || "Caption generation failed")
      }

      return {
        success: true,
        caption: data.choices[0].message.content,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }
}
