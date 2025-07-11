"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, Wand2, Calendar, Plus, ImageIcon, Clock } from "lucide-react"

export default function EventsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState("")

  const handleGeneratePrompt = () => {
    // Simulate AI prompt generation
    setGeneratedPrompt(
      "Create a vibrant and eye-catching poster for a Product Launch Event. The design should feature modern typography, bold colors (purple and blue gradient), and include space for a company logo. The poster should convey excitement and innovation, with a professional yet dynamic aesthetic suitable for social media sharing.",
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-gray-600">Create and manage your events for poster generation</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Event
        </Button>
      </div>

      {/* Create Event Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Event</CardTitle>
            <CardDescription>Fill in the details to generate AI-powered poster prompts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Event Details */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="event-title">Event Title</Label>
                  <Input id="event-title" placeholder="Enter event title" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event-type">Event Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product-launch">Product Launch</SelectItem>
                      <SelectItem value="sale">Sale/Promotion</SelectItem>
                      <SelectItem value="webinar">Webinar</SelectItem>
                      <SelectItem value="conference">Conference</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="holiday">Holiday Special</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-date">Date</Label>
                    <Input id="event-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-time">Time</Label>
                    <Input id="event-time" type="time" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event-notes">Notes</Label>
                  <Textarea id="event-notes" placeholder="Additional details about your event..." rows={4} />
                </div>

                {/* Logo Upload */}
                <div className="space-y-2">
                  <Label>Logo Upload</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Drag & drop your logo here, or click to browse</p>
                    <Button variant="outline" className="mt-2 bg-transparent">
                      Choose File
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Column - GPT Prompt Section */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>AI Prompt Generator</Label>
                  <Button onClick={handleGeneratePrompt} className="w-full">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Prompt from Event Info
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manual-prompt">Generated Prompt</Label>
                  <Textarea
                    id="manual-prompt"
                    value={generatedPrompt}
                    onChange={(e) => setGeneratedPrompt(e.target.value)}
                    placeholder="AI-generated prompt will appear here..."
                    rows={8}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Generate Poster
                  </Button>
                  <Button variant="outline">Save Event</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Black Friday Sale",
            type: "Sale/Promotion",
            date: "2024-11-29",
            time: "00:00",
            status: "Active",
            postersGenerated: 5,
          },
          {
            title: "Product Launch Webinar",
            type: "Webinar",
            date: "2024-12-15",
            time: "14:00",
            status: "Scheduled",
            postersGenerated: 3,
          },
          {
            title: "Holiday Special Offer",
            type: "Holiday",
            date: "2024-12-25",
            time: "09:00",
            status: "Draft",
            postersGenerated: 1,
          },
          {
            title: "New Year Conference",
            type: "Conference",
            date: "2025-01-01",
            time: "10:00",
            status: "Planning",
            postersGenerated: 0,
          },
        ].map((event, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <Badge
                  variant={
                    event.status === "Active"
                      ? "default"
                      : event.status === "Scheduled"
                        ? "secondary"
                        : event.status === "Draft"
                          ? "outline"
                          : "secondary"
                  }
                >
                  {event.status}
                </Badge>
              </div>
              <CardDescription>{event.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  {event.postersGenerated} posters generated
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" className="flex-1">
                    <Wand2 className="w-4 h-4 mr-1" />
                    Generate
                  </Button>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
