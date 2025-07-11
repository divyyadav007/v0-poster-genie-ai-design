import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Eye, Download, Share2, BarChart3 } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your poster performance and engagement</p>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+20.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shares</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.9%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Views Over Time</CardTitle>
            <CardDescription>Daily poster views for the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-t from-purple-50 to-transparent rounded-lg flex items-end justify-center p-4">
              <div className="flex items-end space-x-2 h-full w-full">
                {Array.from({ length: 30 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-purple-600 rounded-t flex-1"
                    style={{ height: `${Math.random() * 80 + 20}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Engagement */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement by Platform</CardTitle>
            <CardDescription>Performance across different social media platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { platform: "Instagram", engagement: 92, color: "bg-pink-500" },
                { platform: "Facebook", engagement: 78, color: "bg-blue-500" },
                { platform: "Twitter", engagement: 65, color: "bg-sky-500" },
                { platform: "LinkedIn", engagement: 84, color: "bg-blue-700" },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.platform}</span>
                    <span className="text-sm text-gray-600">{item.engagement}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.engagement}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Posters */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Posters</CardTitle>
          <CardDescription>Your most successful posters this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Black Friday Sale Banner",
                views: 12500,
                downloads: 890,
                shares: 234,
                engagement: 94,
              },
              {
                title: "Product Launch Announcement",
                views: 9800,
                downloads: 567,
                shares: 189,
                engagement: 87,
              },
              {
                title: "Holiday Special Offer",
                views: 8200,
                downloads: 445,
                shares: 156,
                engagement: 82,
              },
              {
                title: "Webinar Promotion",
                views: 6700,
                downloads: 334,
                shares: 123,
                engagement: 78,
              },
            ].map((poster, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{poster.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {poster.views.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        {poster.downloads}
                      </span>
                      <span className="flex items-center">
                        <Share2 className="w-4 h-4 mr-1" />
                        {poster.shares}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant={poster.engagement > 90 ? "default" : poster.engagement > 80 ? "secondary" : "outline"}>
                  {poster.engagement}% engagement
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audience Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Audience Demographics</CardTitle>
            <CardDescription>Who's engaging with your content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Age Groups</h4>
                <div className="space-y-2">
                  {[
                    { age: "18-24", percentage: 25 },
                    { age: "25-34", percentage: 45 },
                    { age: "35-44", percentage: 20 },
                    { age: "45+", percentage: 10 },
                  ].map((group, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{group.age}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${group.percentage * 2}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{group.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Best Posting Times</CardTitle>
            <CardDescription>When your audience is most active</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { day: "Monday", time: "9:00 AM", engagement: "89%" },
                { day: "Tuesday", time: "2:00 PM", engagement: "92%" },
                { day: "Wednesday", time: "11:00 AM", engagement: "87%" },
                { day: "Thursday", time: "3:00 PM", engagement: "94%" },
                { day: "Friday", time: "1:00 PM", engagement: "85%" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{item.day}</p>
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
  )
}
