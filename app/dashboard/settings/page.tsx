"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { User, Users, MessageSquare, HardDrive, Eye, EyeOff, Copy, RefreshCw, Plus, Trash2, Crown } from "lucide-react"

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [whatsappConnected, setWhatsappConnected] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600">Manage your account and application preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <Button variant="outline">Change Avatar</Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" defaultValue="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue="Acme Inc." />
                </div>

                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive updates about your account</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-gray-600">Receive tips and product updates</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium text-red-600 mb-2">Danger Zone</h4>
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Team Management */}
        <TabsContent value="team">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>Manage your team and their permissions</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Invite Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "John Doe", email: "john@example.com", role: "Owner", status: "Active" },
                    { name: "Jane Smith", email: "jane@example.com", role: "Admin", status: "Active" },
                    { name: "Mike Johnson", email: "mike@example.com", role: "Editor", status: "Pending" },
                    { name: "Sarah Wilson", email: "sarah@example.com", role: "Viewer", status: "Active" },
                  ].map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">{member.name[0]}</span>
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={member.role === "Owner" ? "default" : "secondary"}>
                          {member.role === "Owner" && <Crown className="w-3 h-3 mr-1" />}
                          {member.role}
                        </Badge>
                        <Badge variant={member.status === "Active" ? "default" : "outline"}>{member.status}</Badge>
                        {member.role !== "Owner" && (
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Roles & Permissions</CardTitle>
                <CardDescription>Define what each role can do</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { role: "Owner", permissions: ["Full access", "Billing management", "Team management"] },
                    { role: "Admin", permissions: ["Create posters", "Manage events", "View analytics"] },
                    { role: "Editor", permissions: ["Create posters", "Edit events"] },
                    { role: "Viewer", permissions: ["View posters", "Download assets"] },
                  ].map((roleInfo, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">{roleInfo.role}</h4>
                      <div className="flex flex-wrap gap-2">
                        {roleInfo.permissions.map((permission, i) => (
                          <Badge key={i} variant="outline">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* API Access */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>Manage your API keys and integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>API Key</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      type={showApiKey ? "text" : "password"}
                      value="pk_live_1234567890abcdef"
                      readOnly
                      className="font-mono"
                    />
                    <Button variant="outline" size="icon" onClick={() => setShowApiKey(!showApiKey)}>
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate Key
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">API Usage</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Requests this month</span>
                    <span>2,450 / 10,000</span>
                  </div>
                  <Progress value={24.5} />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Documentation</h4>
                <p className="text-sm text-gray-600">Learn how to integrate PosterGenie.ai into your applications</p>
                <Button variant="outline">View API Docs</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* WhatsApp Integration */}
        <TabsContent value="whatsapp">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Integration</CardTitle>
              <CardDescription>Connect your WhatsApp for direct sharing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!whatsappConnected ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Connect WhatsApp</h3>
                  <p className="text-gray-600 mb-6">Share your posters directly to WhatsApp with one click</p>
                  <div className="space-y-4 max-w-sm mx-auto">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+91 98765 43210" />
                    </div>
                    <Button className="w-full" onClick={() => setWhatsappConnected(true)}>
                      Send OTP
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">WhatsApp Connected</p>
                        <p className="text-sm text-gray-600">+91 98765 43210</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <Label>Quick Share Settings</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Auto-compress images</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Include caption</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" onClick={() => setWhatsappConnected(false)}>
                    Disconnect WhatsApp
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Storage */}
        <TabsContent value="storage">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Storage Usage</CardTitle>
                <CardDescription>Monitor your storage consumption</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Storage Used</span>
                    <span className="text-2xl font-bold">2.4 GB / 10 GB</span>
                  </div>
                  <Progress value={24} className="h-3" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <HardDrive className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="font-medium">Posters</p>
                    <p className="text-sm text-gray-600">1.8 GB</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <User className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="font-medium">Logos</p>
                    <p className="text-sm text-gray-600">0.4 GB</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="font-medium">Team Assets</p>
                    <p className="text-sm text-gray-600">0.2 GB</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-sm text-gray-600">Need more storage?</span>
                  <Button variant="outline">Upgrade Plan</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Storage Management</CardTitle>
                <CardDescription>Clean up and organize your files</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Unused Posters</p>
                    <p className="text-sm text-gray-600">12 files • 340 MB</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Clean Up
                  </Button>
                </div>

                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Old Drafts</p>
                    <p className="text-sm text-gray-600">8 files • 120 MB</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Clean Up
                  </Button>
                </div>

                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Duplicate Files</p>
                    <p className="text-sm text-gray-600">5 files • 89 MB</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
