"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Share2, Facebook, Twitter, Linkedin, Instagram, MessageSquare, Zap, CalendarIcon } from "lucide-react"

export default function CalendarPage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["facebook", "instagram"])
  const [caption, setCaption] = useState(
    "🚀 Exciting news! Our latest product is here to revolutionize your workflow. Don't miss out on this game-changing innovation! #ProductLaunch #Innovation #TechNews",
  )

  const platforms = [
    { id: "facebook", name: "Facebook", icon: Facebook, color: "text-blue-600" },
    { id: "twitter", name: "Twitter", icon: Twitter, color: "text-sky-500" },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "text-blue-700" },
    { id: "instagram", name: "Instagram", icon: Instagram, color: "text-pink-600" },
  ]

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId],
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Social Media Scheduler</h1>
          <p className="text-gray-600">Schedule and manage your social media posts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Post Composer */}
        <div className="space-y-6">
          {/* Poster Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Selected Poster</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center border">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-xl">PG</span>
                  </div>
                  <p className="font-semibold">Product Launch Poster</p>
                  <p className="text-sm text-gray-600">1080x1080px</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Caption Editor */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Caption</CardTitle>
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  AI Generate
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={4}
                placeholder="Write your caption here..."
              />
              <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                <span>{caption.length} characters</span>
                <span>Optimal: 125-150 chars</span>
              </div>
            </CardContent>
          </Card>

          {/* Platform Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {platforms.map((platform) => (
                  <div key={platform.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <Checkbox
                      id={platform.id}
                      checked={selectedPlatforms.includes(platform.id)}
                      onCheckedChange={() => togglePlatform(platform.id)}
                    />
                    <platform.icon className={`w-5 h-5 ${platform.color}`} />
                    <label htmlFor={platform.id} className="font-medium cursor-pointer">
                      {platform.name}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Scheduling */}
        <div className="space-y-6">
          {/* Schedule Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <input type="date" className="w-full p-2 border rounded-md" defaultValue="2024-12-15" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <input type="time" className="w-full p-2 border rounded-md" defaultValue="14:00" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Timezone</label>
                <Select defaultValue="ist">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                    <SelectItem value="utc">UTC (UTC+0:00)</SelectItem>
                    <SelectItem value="est">EST (UTC-5:00)</SelectItem>
                    <SelectItem value="pst">PST (UTC-8:00)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Zap className="w-4 h-4 mr-2" />
                  Auto-Schedule
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Manual Schedule
                </Button>
              </div>

              <Button variant="secondary" className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Post Now
              </Button>
            </CardContent>
          </Card>

          {/* Optimal Times */}
          <Card>
            <CardHeader>
              <CardTitle>Optimal Posting Times</CardTitle>
              <CardDescription>Based on your audience engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { platform: "Facebook", time: "2:00 PM", engagement: "89%" },
                  { platform: "Instagram", time: "11:00 AM", engagement: "92%" },
                  { platform: "Twitter", time: "9:00 AM", engagement: "76%" },
                  { platform: "LinkedIn", time: "8:00 AM", engagement: "84%" },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.platform}</p>
                      <p className="text-sm text-gray-600">{item.time}</p>
                    </div>
                    <Badge variant="secondary">{item.engagement}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Schedule Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Posts Calendar</CardTitle>
          <CardDescription>Overview of your upcoming posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-medium text-gray-600 p-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 6 + 1
              const hasPost = [5, 12, 18, 25, 30].includes(i)

              return (
                <div
                  key={i}
                  className={`aspect-square border rounded-lg p-2 ${
                    day > 0 && day <= 31 ? "hover:bg-gray-50" : "bg-gray-100"
                  }`}
                >
                  {day > 0 && day <= 31 && (
                    <>
                      <div className="text-sm">{day}</div>
                      {hasPost && <div className="w-2 h-2 bg-purple-600 rounded-full mt-1"></div>}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
