"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  Download,
  Share2,
  Calendar,
  ImageIcon,
  RefreshCw,
  Eye,
  Sparkles,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  FileImage,
  Trash2,
} from "lucide-react"
import toast from "react-hot-toast"
import type { ProcessedEvent, ProcessingResult } from "@/lib/ai-service"

interface ProcessingProgress {
  current: number
  total: number
  event: string
}

export default function AIGeneratorPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [extractedEvents, setExtractedEvents] = useState<ProcessedEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<ProcessedEvent | null>(null)
  const [processingProgress, setProcessingProgress] = useState<ProcessingProgress | null>(null)
  const [processingStats, setProcessingStats] = useState<{
    total: number
    successful: number
    failed: number
    processingTime: number
  } | null>(null)

  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB")
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Reset state
    setIsProcessing(true)
    setExtractedEvents([])
    setSelectedEvent(null)
    setProcessingProgress(null)
    setProcessingStats(null)

    try {
      const formData = new FormData()
      formData.append("image", file)
      formData.append("organizationId", "org_du_123")
      formData.append("organizationType", "educational")

      const response = await fetch("/api/ai/process-image", {
        method: "POST",
        body: formData,
      })

      const result: ProcessingResult = await response.json()

      if (result.success && result.events) {
        setExtractedEvents(result.events)
        setProcessingStats({
          total: result.totalEvents || 0,
          successful: result.successfulEvents || 0,
          failed: result.failedEvents || 0,
          processingTime: result.processingTime || 0,
        })

        toast.success(`🎉 Successfully processed ${result.successfulEvents}/${result.totalEvents} events!`, {
          duration: 5000,
        })
      } else {
        throw new Error(result.error || "Failed to process image")
      }
    } catch (error) {
      console.error("Processing error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to process image")
    } finally {
      setIsProcessing(false)
      setProcessingProgress(null)
    }
  }, [])

  const handleRegenerateEvent = async (event: ProcessedEvent) => {
    if (!event) return

    const loadingToast = toast.loading(`Regenerating poster for ${event.name}...`)

    try {
      const response = await fetch("/api/ai/regenerate-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: {
            name: event.name,
            date: event.date,
            day: event.day,
            type: event.type,
            description: event.description,
            category: event.category,
            colors: event.colors,
            keywords: event.keywords,
          },
          organizationType: "educational",
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Update the event in the list
        setExtractedEvents((prev) =>
          prev.map((e) =>
            e.id === event.id
              ? {
                  ...e,
                  prompt: result.prompt,
                  imageUrl: result.imageUrl,
                  status: "image_generated" as const,
                }
              : e,
          ),
        )

        // Update selected event if it's the same
        if (selectedEvent?.id === event.id) {
          setSelectedEvent({
            ...event,
            prompt: result.prompt,
            imageUrl: result.imageUrl,
            status: "image_generated",
          })
        }

        toast.success("Poster regenerated successfully!", { id: loadingToast })
      } else {
        throw new Error(result.error || "Regeneration failed")
      }
    } catch (error) {
      toast.error("Failed to regenerate poster", { id: loadingToast })
    }
  }

  const handleDownloadPoster = (event: ProcessedEvent) => {
    if (!event.imageUrl) {
      toast.error("No image available to download")
      return
    }

    // Create download link
    const link = document.createElement("a")
    link.href = event.imageUrl
    link.download = `${event.name.replace(/\s+/g, "_")}_poster.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast.success(`Downloaded poster for ${event.name}`)
  }

  const handleSharePoster = (event: ProcessedEvent) => {
    if (!event.imageUrl) {
      toast.error("No image available to share")
      return
    }

    if (navigator.share) {
      navigator.share({
        title: `${event.name} - ${event.date}`,
        text: event.description,
        url: event.imageUrl,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(event.imageUrl)
      toast.success("Image URL copied to clipboard!")
    }
  }

  const clearUpload = () => {
    setUploadedImage(null)
    setExtractedEvents([])
    setSelectedEvent(null)
    setProcessingStats(null)
  }

  const getStatusIcon = (status: ProcessedEvent["status"]) => {
    switch (status) {
      case "image_generated":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "prompt_generated":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: ProcessedEvent["status"]) => {
    switch (status) {
      case "image_generated":
        return "bg-green-100 text-green-800 border-green-200"
      case "prompt_generated":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">AI Event Poster Generator</h1>
          <p className="text-gray-600">Upload your event calendar and let AI create stunning posters automatically</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Sparkles className="w-3 h-3 mr-1" />
            Powered by Gemini AI
          </Badge>
        </div>
      </div>

      {/* Processing Stats */}
      {processingStats && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-800">Processing Complete!</h3>
                  <p className="text-sm text-green-700">
                    Successfully generated {processingStats.successful} out of {processingStats.total} posters
                  </p>
                </div>
              </div>
              <div className="text-right text-sm text-green-700">
                <p>Processing time: {Math.round(processingStats.processingTime / 1000)}s</p>
                <p>Success rate: {Math.round((processingStats.successful / processingStats.total) * 100)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Image Upload & Preview */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Upload Event Calendar</CardTitle>
                <CardDescription>Upload an image of your event calendar, holiday list, or schedule</CardDescription>
              </div>
              {uploadedImage && (
                <Button variant="outline" size="sm" onClick={clearUpload}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!uploadedImage ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-600 mb-2">Upload Event Calendar</p>
                <p className="text-sm text-gray-500 mb-4">
                  Drag & drop your calendar image here, or click to browse
                  <br />
                  <span className="text-xs">Supports: JPG, PNG, WebP (Max: 10MB)</span>
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={isProcessing}
                />
                <label htmlFor="image-upload">
                  <Button variant="outline" className="cursor-pointer bg-transparent" disabled={isProcessing}>
                    <FileImage className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Uploaded calendar"
                    className="w-full h-64 object-contain border rounded-lg bg-gray-50"
                  />
                  {isProcessing && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                      <div className="text-center text-white">
                        <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                        <p className="text-sm font-medium">
                          {processingProgress?.event || "Analyzing image with Gemini AI..."}
                        </p>
                        {processingProgress && (
                          <p className="text-xs mt-1">
                            {processingProgress.current}/{processingProgress.total}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-reupload"
                    disabled={isProcessing}
                  />
                  <label htmlFor="image-reupload" className="flex-1">
                    <Button variant="outline" className="w-full cursor-pointer bg-transparent" disabled={isProcessing}>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Different Image
                    </Button>
                  </label>
                </div>
              </div>
            )}

            {isProcessing && processingProgress && (
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing Events...</span>
                  <span>
                    {processingProgress.current}/{processingProgress.total}
                  </span>
                </div>
                <Progress value={(processingProgress.current / processingProgress.total) * 100} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Panel - Event Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Event Preview</CardTitle>
            <CardDescription>
              {selectedEvent ? `Viewing: ${selectedEvent.name}` : "Select an event to view details and poster"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedEvent ? (
              <div className="space-y-4">
                {selectedEvent.imageUrl ? (
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={selectedEvent.imageUrl || "/placeholder.svg"}
                      alt={selectedEvent.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        {selectedEvent.status === "failed" ? "Generation failed" : "Generating poster..."}
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{selectedEvent.name}</h3>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(selectedEvent.status)}
                      <Badge className={getStatusColor(selectedEvent.status)}>
                        {selectedEvent.status.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Date</p>
                      <p className="font-medium">{selectedEvent.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Day</p>
                      <p className="font-medium">{selectedEvent.day}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Type</p>
                      <Badge variant="outline">{selectedEvent.type}</Badge>
                    </div>
                    <div>
                      <p className="text-gray-500">Category</p>
                      <Badge variant="outline">{selectedEvent.category}</Badge>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm mb-1">Description</p>
                    <p className="text-sm">{selectedEvent.description}</p>
                  </div>

                  {selectedEvent.colors && selectedEvent.colors.length > 0 && (
                    <div>
                      <p className="text-gray-500 text-sm mb-2">Color Palette</p>
                      <div className="flex space-x-2">
                        {selectedEvent.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-6 h-6 rounded-full border border-gray-300"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedEvent.keywords && selectedEvent.keywords.length > 0 && (
                    <div>
                      <p className="text-gray-500 text-sm mb-2">Keywords</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedEvent.keywords.map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedEvent.prompt && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs font-medium text-gray-700 mb-1">AI Generated Prompt:</p>
                      <p className="text-xs text-gray-600">{selectedEvent.prompt}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => handleRegenerateEvent(selectedEvent)}
                    disabled={isProcessing}
                    variant="outline"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button onClick={() => handleDownloadPoster(selectedEvent)} disabled={!selectedEvent.imageUrl}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleSharePoster(selectedEvent)}
                    disabled={!selectedEvent.imageUrl}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" disabled={!selectedEvent.imageUrl}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </div>
            ) : (
              <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Select an event to preview poster</p>
                  <p className="text-sm text-gray-500 mt-2">Upload a calendar image to get started</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Extracted Events Grid */}
      {extractedEvents.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Generated Posters ({extractedEvents.length})</CardTitle>
                <CardDescription>Events automatically detected and processed from your calendar</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="grid" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>

              <TabsContent value="grid" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {extractedEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedEvent?.id === event.id ? "border-purple-500 bg-purple-50" : "border-gray-200"
                      }`}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                        {event.imageUrl ? (
                          <img
                            src={event.imageUrl || "/placeholder.svg"}
                            alt={event.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            {getStatusIcon(event.status)}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm truncate">{event.name}</h3>
                          <Badge className={`text-xs ${getStatusColor(event.status)}`}>
                            {event.status === "image_generated" && "✓"}
                            {event.status === "prompt_generated" && "⏳"}
                            {event.status === "failed" && "✗"}
                            {event.status === "extracted" && "📄"}
                          </Badge>
                        </div>

                        <div className="text-xs text-gray-600 space-y-1">
                          <p>{event.date}</p>
                          <p>{event.day}</p>
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                        </div>

                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-xs bg-transparent"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDownloadPoster(event)
                            }}
                            disabled={!event.imageUrl}
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-xs bg-transparent"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSharePoster(event)
                            }}
                            disabled={!event.imageUrl}
                          >
                            <Share2 className="w-3 h-3 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="list" className="mt-4">
                <div className="space-y-2">
                  {extractedEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                        selectedEvent?.id === event.id ? "border-purple-500 bg-purple-50" : "border-gray-200"
                      }`}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          {event.imageUrl ? (
                            <img
                              src={event.imageUrl || "/placeholder.svg"}
                              alt={event.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              {getStatusIcon(event.status)}
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium truncate">{event.name}</h3>
                            <Badge className={`text-xs ${getStatusColor(event.status)}`}>
                              {event.status.replace("_", " ")}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{event.date}</span>
                            <span>{event.day}</span>
                            <Badge variant="outline" className="text-xs">
                              {event.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 truncate mt-1">{event.description}</p>
                        </div>

                        <div className="flex space-x-2 flex-shrink-0">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRegenerateEvent(event)
                            }}
                            disabled={isProcessing}
                          >
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDownloadPoster(event)
                            }}
                            disabled={!event.imageUrl}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSharePoster(event)
                            }}
                            disabled={!event.imageUrl}
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Sample Calendar for Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Sample Calendar for Testing</CardTitle>
          <CardDescription>Try uploading this sample holiday calendar to see the AI in action</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden bg-gray-50 p-4">
            <img
              src="/images/sample-calendar.png"
              alt="Sample Holiday Calendar"
              className="w-full h-auto max-h-96 object-contain mx-auto"
            />
          </div>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">How it works:</h4>
                <ol className="text-sm text-blue-800 mt-2 space-y-1 list-decimal list-inside">
                  <li>Upload your event calendar image (like the BBD sample above)</li>
                  <li>Gemini AI automatically detects all events and dates</li>
                  <li>AI generates optimized poster prompts for each event</li>
                  <li>Professional posters are created for social media sharing</li>
                  <li>Download, share, or schedule your posters instantly</li>
                </ol>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
