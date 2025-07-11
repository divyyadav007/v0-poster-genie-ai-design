"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ImageIcon,
  Calendar,
  Plus,
  Share2,
  Zap,
  Crown,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Download,
} from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleQuickAction = async (action: string) => {
    setIsLoading(true)
    toast.loading(`${action}...`)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.dismiss()
    toast.success(`${action} completed!`)
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your poster creation overview.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="btn-secondary bg-transparent">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
          <Link href="/dashboard/create">
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create New Poster
            </Button>
          </Link>
        </div>
      </div>

      {/* Plan Status */}
      <Card className="neumorphic border-0 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Pro Plan Active</h3>
                <p className="text-sm text-gray-600">Your Creative Company - Marketing Team</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-600">73/100</p>
              <p className="text-sm text-gray-600">Credits remaining</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700">Monthly usage</span>
              <span className="text-gray-700">27 credits used</span>
            </div>
            <Progress value={27} className="h-3 bg-white/50" />
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="neumorphic border-0 card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Posters Created</CardTitle>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <ImageIcon className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">156</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +23 this month
            </p>
          </CardContent>
        </Card>

        <Card className="neumorphic border-0 card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Credits Left</CardTitle>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Zap className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">73</div>
            <p className="text-xs text-gray-600 mt-1">Resets in 12 days</p>
          </CardContent>
        </Card>

        <Card className="neumorphic border-0 card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Scheduled Posts</CardTitle>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <p className="text-xs text-blue-600 mt-1">Next: Tomorrow 2:00 PM</p>
          </CardContent>
        </Card>

        <Card className="neumorphic border-0 card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Connected Accounts</CardTitle>
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Share2 className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">4</div>
            <p className="text-xs text-gray-600 mt-1">FB, IG, TW, LI</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="neumorphic border-0">
          <CardHeader>
            <CardTitle className="text-gray-900">Recent Activity</CardTitle>
            <CardDescription>Your latest poster creations and scheduled posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Holiday Sale Poster",
                  action: "Created",
                  time: "2 hours ago",
                  status: "completed",
                  icon: ImageIcon,
                  color: "bg-green-100 text-green-600",
                },
                {
                  title: "Black Friday Campaign",
                  action: "Scheduled",
                  time: "4 hours ago",
                  status: "scheduled",
                  icon: Calendar,
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  title: "Product Launch Poster",
                  action: "Generated",
                  time: "1 day ago",
                  status: "completed",
                  icon: Sparkles,
                  color: "bg-purple-100 text-purple-600",
                },
                {
                  title: "Social Media Post",
                  action: "Shared",
                  time: "2 days ago",
                  status: "shared",
                  icon: Share2,
                  color: "bg-orange-100 text-orange-600",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.color}`}>
                    <activity.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{activity.title}</p>
                    <p className="text-sm text-gray-600">
                      {activity.action} • {activity.time}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${
                      activity.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : activity.status === "scheduled"
                          ? "bg-blue-100 text-blue-700"
                          : activity.status === "shared"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="neumorphic border-0">
          <CardHeader>
            <CardTitle className="text-gray-900">Quick Actions</CardTitle>
            <CardDescription>Common tasks to boost your productivity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 btn-secondary bg-transparent"
                onClick={() => handleQuickAction("Creating poster")}
                disabled={isLoading}
              >
                <Sparkles className="w-6 h-6 text-purple-600" />
                <span className="text-sm font-medium">AI Generate</span>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 btn-secondary bg-transparent"
                onClick={() => handleQuickAction("Scheduling post")}
                disabled={isLoading}
              >
                <Calendar className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium">Schedule Post</span>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 btn-secondary bg-transparent"
                onClick={() => handleQuickAction("Analyzing performance")}
                disabled={isLoading}
              >
                <BarChart3 className="w-6 h-6 text-green-600" />
                <span className="text-sm font-medium">View Analytics</span>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 btn-secondary bg-transparent"
                onClick={() => handleQuickAction("Downloading assets")}
                disabled={isLoading}
              >
                <Download className="w-6 h-6 text-orange-600" />
                <span className="text-sm font-medium">Download All</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card className="neumorphic border-0">
        <CardHeader>
          <CardTitle className="text-gray-900">Performance Overview</CardTitle>
          <CardDescription>Your content performance across platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">94%</div>
              <p className="text-sm text-gray-600">Engagement Rate</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "94%" }}></div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">12.4K</div>
              <p className="text-sm text-gray-600">Total Reach</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "78%" }}></div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">89</div>
              <p className="text-sm text-gray-600">Posts This Month</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: "89%" }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
