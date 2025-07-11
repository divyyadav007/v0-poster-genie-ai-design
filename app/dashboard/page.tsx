import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ImageIcon,
  Calendar,
  TrendingUp,
  Users,
  Plus,
  Activity,
  Clock,
  Share2,
  Zap,
  MessageSquare,
  QrCode,
  Crown,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Organization Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your event marketing overview.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <QrCode className="w-4 h-4 mr-2" />
            Generate QR
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Event Poster
          </Button>
        </div>
      </div>

      {/* Plan Status */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Pro Plan Active</h3>
                <p className="text-sm text-gray-600">Delhi University - Marketing Department</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-600">73/100</p>
              <p className="text-sm text-gray-600">Credits remaining</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Monthly usage</span>
              <span>27 credits used</span>
            </div>
            <Progress value={27} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posters Generated</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+23 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Next: Tomorrow 2:00 PM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Social Reach</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2K</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 active today</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your scheduled events and poster campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Annual Tech Fest 2024",
                  date: "Tomorrow, 2:00 PM",
                  platform: "All Platforms",
                  status: "Ready",
                  type: "University Event",
                },
                {
                  title: "Student Orientation Program",
                  date: "Dec 18, 10:00 AM",
                  platform: "Instagram, Facebook",
                  status: "In Review",
                  type: "Academic",
                },
                {
                  title: "Research Symposium",
                  date: "Dec 22, 3:00 PM",
                  platform: "LinkedIn, Twitter",
                  status: "Draft",
                  type: "Academic",
                },
                {
                  title: "Winter Break Notice",
                  date: "Dec 25, 9:00 AM",
                  platform: "WhatsApp, Email",
                  status: "Scheduled",
                  type: "Announcement",
                },
              ].map((event, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium">{event.title}</p>
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Share2 className="w-4 h-4 mr-1" />
                        <span>{event.platform}</span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={
                      event.status === "Ready"
                        ? "default"
                        : event.status === "Scheduled"
                          ? "secondary"
                          : event.status === "In Review"
                            ? "outline"
                            : "secondary"
                    }
                  >
                    {event.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Generation Stats */}
        <Card>
          <CardHeader>
            <CardTitle>AI Generation Analytics</CardTitle>
            <CardDescription>Performance of your AI-generated content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* AI Engine Usage */}
              <div>
                <h4 className="font-medium mb-3">AI Engine Usage</h4>
                <div className="space-y-3">
                  {[
                    { engine: "DALL·E 3", usage: 45, color: "bg-green-500" },
                    { engine: "Leonardo AI", usage: 30, color: "bg-blue-500" },
                    { engine: "Runway ML", usage: 20, color: "bg-purple-500" },
                    { engine: "GPT-4o (Captions)", usage: 85, color: "bg-orange-500" },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.engine}</span>
                        <span className="text-sm text-gray-600">{item.usage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.usage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h4 className="font-medium mb-3">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" className="justify-start bg-transparent">
                    <Zap className="w-4 h-4 mr-2" />
                    Bulk Generate
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start bg-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    WhatsApp Share
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start bg-transparent">
                    <QrCode className="w-4 h-4 mr-2" />
                    QR Codes
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start bg-transparent">
                    <Activity className="w-4 h-4 mr-2" />
                    Analytics
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Team Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions across your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "Generated poster",
                  item: "Tech Fest 2024 Banner",
                  user: "Priya Sharma",
                  time: "2 hours ago",
                  icon: ImageIcon,
                },
                {
                  action: "Scheduled post",
                  item: "Orientation Program",
                  user: "Rajesh Kumar",
                  time: "4 hours ago",
                  icon: Calendar,
                },
                {
                  action: "Shared to WhatsApp",
                  item: "Research Symposium",
                  user: "Anita Patel",
                  time: "1 day ago",
                  icon: MessageSquare,
                },
                {
                  action: "Generated QR code",
                  item: "Event Registration",
                  user: "System",
                  time: "2 days ago",
                  icon: QrCode,
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <activity.icon className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">
                      {activity.user} {activity.action}
                    </p>
                    <p className="text-sm text-gray-600">{activity.item}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Organization Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Organization Performance</CardTitle>
            <CardDescription>Key metrics for your event marketing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">94%</div>
                  <p className="text-sm text-gray-600">Engagement Rate</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">12.4K</div>
                  <p className="text-sm text-gray-600">Total Reach</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">89</div>
                  <p className="text-sm text-gray-600">Events This Year</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Platform Performance</h4>
                {[
                  { platform: "Instagram", reach: "18.2K", engagement: "12.4%" },
                  { platform: "Facebook", reach: "15.8K", engagement: "8.9%" },
                  { platform: "LinkedIn", reach: "8.4K", engagement: "15.2%" },
                  { platform: "WhatsApp", reach: "2.8K", engagement: "45.6%" },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{item.platform}</span>
                    <div className="text-right">
                      <p className="text-sm font-medium">{item.reach} reach</p>
                      <p className="text-xs text-gray-600">{item.engagement} engagement</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
