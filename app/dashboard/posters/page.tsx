"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Wand2, Download, Share2, Calendar, ImageIcon, Zap } from "lucide-react"

export default function PostersPage() {
  const [selectedEngine, setSelectedEngine] = useState("dalle")
  const [aspectRatio, setAspectRatio] = useState("square")
  const [logoOverlay, setLogoOverlay] = useState(true)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Poster Generator</h1>
          <p className="text-gray-600">Create stunning AI-powered posters for your campaigns</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Poster Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Poster Preview</CardTitle>
            <CardDescription>Your generated poster will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-600">Poster Preview</p>
                <p className="text-sm text-gray-500">Generate a poster to see preview</p>
              </div>
            </div>

            {/* Poster Actions */}
            <div className="flex space-x-2 mt-4">
              <Button className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Generation Settings</CardTitle>
            <CardDescription>Customize your poster generation</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="settings" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="prompt">Prompt</TabsTrigger>
              </TabsList>

              <TabsContent value="settings" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>AI Engine</Label>
                  <Select value={selectedEngine} onValueChange={setSelectedEngine}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dalle">DALL·E 3</SelectItem>
                      <SelectItem value="leonardo">Leonardo AI</SelectItem>
                      <SelectItem value="runway">Runway ML</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Template Style</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="bold">Bold & Vibrant</SelectItem>
                      <SelectItem value="elegant">Elegant</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Aspect Ratio</Label>
                  <Select value={aspectRatio} onValueChange={setAspectRatio}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="square">Square (1:1)</SelectItem>
                      <SelectItem value="a4">A4 Portrait</SelectItem>
                      <SelectItem value="story">Story (9:16)</SelectItem>
                      <SelectItem value="banner">Banner (16:9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="logo-overlay">Logo Overlay</Label>
                  <Switch id="logo-overlay" checked={logoOverlay} onCheckedChange={setLogoOverlay} />
                </div>

                <Button className="w-full">
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Poster
                </Button>
              </TabsContent>

              <TabsContent value="prompt" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="custom-prompt">Custom Prompt</Label>
                  <Textarea id="custom-prompt" placeholder="Describe the poster you want to create..." rows={6} />
                </div>

                <div className="space-y-2">
                  <Label>Style Keywords</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Modern", "Minimalist", "Colorful", "Professional", "Creative", "Bold"].map((keyword) => (
                      <Badge key={keyword} variant="outline" className="cursor-pointer hover:bg-purple-100">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Generate with Custom Prompt
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Recent Posters */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Posters</CardTitle>
          <CardDescription>Your recently generated posters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group relative">
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center border hover:shadow-lg transition-shadow cursor-pointer">
                  <ImageIcon className="w-8 h-8 text-purple-600" />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-lg transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="secondary">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-center mt-2 text-gray-600">Poster {i}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
