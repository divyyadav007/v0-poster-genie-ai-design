"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  LayoutDashboard,
  Wand2,
  Calendar,
  BarChart3,
  Users,
  Settings,
  Sparkles,
  User,
  LogOut,
  Plus,
  ChevronDown,
  Bell,
  Search,
  Crown,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import toast from "react-hot-toast"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Wand2, label: "Create Poster", href: "/dashboard/create" },
  { icon: Calendar, label: "Events", href: "/dashboard/events" },
  { icon: Calendar, label: "Calendar", href: "/dashboard/calendar" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

function DashboardHeader() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleCreateAction = (action: string) => {
    switch (action) {
      case "poster":
        router.push("/dashboard/create")
        toast.success("Opening poster creator...")
        break
      case "event":
        router.push("/dashboard/events")
        toast.success("Opening event creator...")
        break
      case "schedule":
        router.push("/dashboard/calendar")
        toast.success("Opening scheduler...")
        break
      default:
        break
    }
  }

  const handleLogout = () => {
    toast.success("Logged out successfully")
    router.push("/login")
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-white px-6 shadow-sm">
      <SidebarTrigger className="-ml-1 lg:hidden" />

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search posters, events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 rounded-xl">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          </span>
        </Button>

        {/* Create Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => handleCreateAction("poster")}>
              <Wand2 className="w-4 h-4 mr-2" />
              Create Poster
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleCreateAction("event")}>
              <Calendar className="w-4 h-4 mr-2" />
              Add Event
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleCreateAction("schedule")}>
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-gray-100">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex items-center justify-start gap-2 p-3">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">John Doe</p>
                <p className="w-[200px] truncate text-sm text-muted-foreground">john@company.com</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
              <User className="w-4 h-4 mr-2" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/dashboard/team")}>
              <Users className="w-4 h-4 mr-2" />
              Team Management
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar className="border-r bg-white shadow-sm">
          <SidebarHeader className="border-b p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <span className="text-xl font-bold gradient-text">PosterGenie.ai</span>
                <div className="flex items-center space-x-2 mt-1">
                  <Crown className="w-3 h-3 text-purple-600" />
                  <span className="text-xs text-purple-600 font-medium">Pro Plan</span>
                </div>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition
                      className={\`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-gray-100 ${
                        pathname === item.href
                          ? "bg-purple-100 text-purple-700 border border-purple-200"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <div className="space-y-3">
              <div className="text-xs text-gray-600">
                <p className="font-medium">Credits Usage</p>
                <div className="flex items-center justify-between mt-1">
                  <span>73 / 100 used</span>
                  <span className="text-purple-600 font-medium">73%</span>
                </div>
              </div>
              <Progress value={73} className="h-2" />
              <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                Upgrade Plan
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
