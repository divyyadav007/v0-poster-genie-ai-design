"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Wand2,
  Download,
  Share2,
  ImageIcon,
  Sparkles,
  RefreshCw,
  Copy,
  AlertCircle,
  Zap,
  MessageSquare,
} from "lucide-react"
import toast from "react-hot-toast"

interface GenerationState {
  isGenerating: boolean
  generatedImage: string | null
  prompt: string
  caption: string
  isGeneratingCaption: boolean
}

export default function CreatePosterPage() {
  const [formData, setFormData] = useState({
    prompt: "",
    size: "",
    addLogo: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [generation, setGeneration] = useState<GenerationState>({
    isGenerating: false,
    generatedImage: null,
    prompt: "",
    caption: "",
    isGeneratingCaption: false,
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.prompt.trim()) {
      newErrors.prompt = "Please describe your poster"
    } else if (formData.prompt.trim().length < 10) {
      newErrors.prompt = "Description should be at least 10 characters"
    }

    if (!formData.size) {
      newErrors.size = "Please select a poster size"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleGeneratePoster = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors below")
      return
    }

    setGeneration((prev) => ({ ...prev, isGenerating: true, prompt: formData.prompt }))
    toast.loading("Generating your poster with DALL·E...")

    try {
      // Simulate DALL·E API call
      await new Promise((resolve) => setTimeout(resolve, 4000))

      // Simulate generated image URL
      const imageUrl = `https://picsum.photos/1024/1024?random=${Date.now()}`

      setGeneration((prev) => ({
        ...prev,
        isGenerating: false,
        generatedImage: imageUrl,
      }))

      toast.dismiss()
      toast.success("Poster generated successfully!")
    } catch (error) {
      setGeneration((prev) => ({ ...prev, isGenerating: false }))
      toast.dismiss()
      toast.error("Failed to generate poster. Please try again.")
    }
  }

  const handleGenerateCaption = async () => {
    if (!formData.prompt.trim()) {
      toast.error("Please enter a poster description first")
      return
    }

    setGeneration((prev) => ({ ...prev, isGeneratingCaption: true }))
    toast.loading("Generating caption with GPT-4o...")

    try {
      // Simulate GPT-4o API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const sampleCaption = `🎨 Exciting news! ${formData.prompt} ✨\n\nDon't miss out on this amazing opportunity! \n\n#AI #Design #Creative #PosterGenie #Marketing #SocialMedia #Innovation`

      setGeneration((prev) => ({
        ...prev,
        isGeneratingCaption: false,
        caption: sampleCaption,
      }))

      toast.dismiss()
      toast.success("Caption generated!")
    } catch (error) {
      setGeneration((prev) => ({ ...prev, isGeneratingCaption: false }))
      toast.dismiss()
      toast.error("Failed to generate caption. Please try again.")
    }
  }

  const handleDownload = () => {
    if (!generation.generatedImage) {
      toast.error("No image to download")
      return
    }

    // Create download link
    const link = document.createElement("a")
    link.href = generation.generatedImage
    link.download = `poster-${Date.now()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast.success("Poster downloaded!")
  }

  const handleShare = () => {
    if (!generation.generatedImage) {
      toast.error("No image to share")
      return
    }

    if (navigator.share) {
      navigator.share({
        title: "My AI Generated Poster",
        text: generation.caption || "Check out my AI-generated poster!",
        url: generation.generatedImage,
      })
    } else {
      navigator.clipboard.writeText(generation.generatedImage)
      toast.success("Image URL copied to clipboard!")
    }
  }

  const handleCopyCaption = () => {
    if (!generation.caption) {
      toast.error("No caption to copy")
      return
    }

    navigator.clipboard.writeText(generation.caption)
    toast.success("Caption copied to clipboard!")
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Poster</h1>
            <p className="text-gray-600 mt-1">Generate stunning posters with AI in seconds</p>
          </div>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <Sparkles className="w-3 h-3 mr-1" />
            Powered by DALL·E & GPT-4o
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Form */}
          <Card className="neumorphic border-0">
            <CardHeader>
              <CardTitle className="text-gray-900">Poster Details</CardTitle>
              <CardDescription>Describe your poster and customize the settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Prompt Input */}
              <div className="space-y-2">
                <Label htmlFor="prompt" className="text-sm font-medium text-gray-700">
                  Describe your poster *
                </Label>
                <Textarea
                  id="prompt"
                  placeholder="Describe your poster in detail... e.g., 'A vibrant holiday sale poster with festive colors, snowflakes, and bold text announcing 50% off'"
                  value={formData.prompt}
                  onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                  className={`form-input min-h-[120px] resize-none ${errors.prompt ? "border-red-500 focus:ring-red-500" : ""}`}
                  rows={5}
                />
                {errors.prompt && (
                  <div className="flex items-center space-x-1 form-error">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.prompt}</span>
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  Be specific about colors, style, text, and mood for best results
                </p>
              </div>

              {/* Poster Size */}
              <div className="space-y-2">
                <Label htmlFor="size" className="text-sm font-medium text-gray-700">
                  Poster Size *
                </Label>
                <Select onValueChange={(value) => setFormData({ ...formData, size: value })}>
                  <SelectTrigger className={`form-input ${errors.size ? "border-red-500" : ""}`}>
                    <SelectValue placeholder="Select poster size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="square">Square (1:1) - Instagram Post</SelectItem>
                    <SelectItem value="a4">A4 Portrait - Print Ready</SelectItem>
                    <SelectItem value="story">Story (9:16) - Instagram/Facebook Stories</SelectItem>
                    <SelectItem value="banner">Banner (16:9) - Facebook Cover</SelectItem>
                  </SelectContent>
                </Select>
                {errors.size && (
                  <div className="flex items-center space-x-1 form-error">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.size}</span>
                  </div>
                )}
              </div>

              {/* Add Logo Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <Label htmlFor="add-logo" className="text-sm font-medium text-gray-700">
                    Add Logo
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">Automatically add your brand logo to the poster</p>
                </div>
                <Switch
                  id="add-logo"
                  checked={formData.addLogo}
                  onCheckedChange={(checked) => setFormData({ ...formData, addLogo: checked })}
                />
              </div>

              {/* AI Engine Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">AI Engine</Label>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center justify-between p-3 border-2 border-green-200 bg-green-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-green-800">DALL·E 3</p>
                        <p className="text-xs text-green-600">OpenAI's latest image generator</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between p-3 border border-gray-200 bg-gray-50 rounded-xl opacity-50 cursor-not-allowed">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-400 rounded-lg flex items-center justify-center">
                            <ImageIcon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-600">Leonardo AI</p>
                            <p className="text-xs text-gray-500">Advanced AI art generator</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-gray-500">
                          Coming Soon
                        </Badge>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Leonardo AI integration coming soon!</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between p-3 border border-gray-200 bg-gray-50 rounded-xl opacity-50 cursor-not-allowed">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-400 rounded-lg flex items-center justify-center">
                            <Zap className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-600">Runway ML</p>
                            <p className="text-xs text-gray-500">Creative AI platform</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-gray-500">
                          Coming Soon
                        </Badge>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Runway ML integration coming soon!</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGeneratePoster}
                className="w-full btn-primary h-12 text-lg"
                disabled={generation.isGenerating}
              >
                {generation.isGenerating ? (
                  <div className="flex items-center space-x-2">
                    <div className="spinner"></div>
                    <span>Generating...</span>
                  </div>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Generate Poster
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Right Panel - Preview & Results */}
          <div className="space-y-6">
            {/* Poster Preview */}
            <Card className="neumorphic border-0">
              <CardHeader>
                <CardTitle className="text-gray-900">Poster Preview</CardTitle>
                <CardDescription>Your generated poster will appear here</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden">
                  {generation.generatedImage ? (
                    <img
                      src={generation.generatedImage || "/placeholder.svg"}
                      alt="Generated poster"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : generation.isGenerating ? (
                    <div className="text-center">
                      <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p className="text-lg font-medium text-gray-700">Creating your poster...</p>
                      <p className="text-sm text-gray-500 mt-1">This may take a few moments</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-600">Poster Preview</p>
                      <p className="text-sm text-gray-500 mt-1">Fill out the form and click generate</p>
                    </div>
                  )}
                </div>

                {generation.generatedImage && (
                  <div className="flex space-x-2 mt-4">
                    <Button onClick={handleDownload} className="flex-1 btn-primary">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button onClick={handleShare} variant="outline" className="flex-1 btn-secondary bg-transparent">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button
                      onClick={handleGeneratePoster}
                      variant="outline"
                      className="btn-secondary bg-transparent"
                      disabled={generation.isGenerating}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Caption Generator */}
            <Card className="neumorphic border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-gray-900">GPT-4o Caption Generator</CardTitle>
                    <CardDescription>Generate engaging social media captions</CardDescription>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    GPT-4o
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handleGenerateCaption}
                  className="w-full btn-secondary"
                  disabled={generation.isGeneratingCaption || !formData.prompt.trim()}
                >
                  {generation.isGeneratingCaption ? (
                    <div className="flex items-center space-x-2">
                      <div className="spinner"></div>
                      <span>Generating Caption...</span>
                    </div>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Generate Caption
                    </>
                  )}
                </Button>

                {generation.caption && (
                  <div className="space-y-3">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <Label className="text-sm font-medium text-blue-800">Generated Caption</Label>
                        <Button
                          onClick={handleCopyCaption}
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-blue-600 hover:text-blue-700"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <Textarea
                        value={generation.caption}
                        onChange={(e) => setGeneration((prev) => ({ ...prev, caption: e.target.value }))}
                        className="bg-white border-blue-200 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        rows={4}
                      />
                    </div>

                    <Button
                      onClick={handleGenerateCaption}
                      variant="outline"
                      size="sm"
                      className="w-full btn-secondary bg-transparent"
                      disabled={generation.isGeneratingCaption}
                    >
                      <RefreshCw className="w-3 h-3 mr-2" />
                      Regenerate Caption
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
