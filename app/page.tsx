"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Sparkles,
  Upload,
  Wand2,
  Share2,
  Calendar,
  BarChart3,
  Users,
  Zap,
  MessageSquare,
  Star,
  ArrowRight,
  Check,
  X,
  Crown,
  Play,
  ChevronRight,
  Globe,
  Shield,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [email, setEmail] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold gradient-text">PosterGenie.ai</span>
                <div className="text-xs text-gray-500">AI-Powered Poster Creation</div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
                Features
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
                Pricing
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
                How It Works
              </a>
              <Link href="/login">
                <Button variant="ghost" className="font-medium">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="btn-primary">Get Started Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-purple-100 text-purple-800 border-purple-200 px-4 py-2 text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by GPT-4o & DALL·E
          </Badge>

          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">AI Posters,</span>
            <br />
            <span className="text-gray-900">Scheduled and Automated</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            PosterGenie.ai helps you generate posters and schedule them in minutes using AI.
            <br />
            <span className="text-purple-600 font-medium">No design skills required.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/signup">
              <Button size="lg" className="btn-primary text-lg px-8 py-4 shadow-xl animate-pulse-glow">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="btn-secondary text-lg px-8 py-4 bg-transparent">
              <Play className="w-5 h-5 mr-2" />
              View Demo
            </Button>
          </div>

          {/* Hero Visual */}
          <div className="relative max-w-5xl mx-auto">
            <div className="neumorphic rounded-3xl p-8 bg-white shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Upload Calendar", icon: Upload, color: "bg-blue-500" },
                  { title: "AI Generates", icon: Wand2, color: "bg-purple-500" },
                  { title: "Share Everywhere", icon: Share2, color: "bg-green-500" },
                ].map((step, index) => (
                  <div key={index} className="text-center animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                    <div
                      className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-50 animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-30 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create professional posters in 3 simple steps with the power of AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload",
                description: "Upload your event calendar or describe your poster needs",
                icon: Upload,
                color: "from-blue-500 to-cyan-500",
              },
              {
                step: "02",
                title: "Generate",
                description: "AI analyzes and creates stunning posters using GPT-4o & DALL·E",
                icon: Wand2,
                color: "from-purple-500 to-pink-500",
              },
              {
                step: "03",
                title: "Share",
                description: "Download, schedule, and share across all social media platforms",
                icon: Share2,
                color: "from-green-500 to-emerald-500",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <Card className="neumorphic border-0 p-8 text-center card-hover">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl`}
                  >
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-300 mb-2">{item.step}</div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </Card>
                {index < 2 && (
                  <ChevronRight className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-8 text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, schedule, and manage your social media content
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Wand2,
                title: "AI Poster Generation",
                desc: "Create stunning posters with GPT-4o and DALL·E integration",
                color: "bg-purple-500",
              },
              {
                icon: Calendar,
                title: "Smart Scheduling",
                desc: "Schedule posts across multiple platforms automatically",
                color: "bg-blue-500",
              },
              {
                icon: BarChart3,
                title: "Analytics Dashboard",
                desc: "Track performance and engagement across all platforms",
                color: "bg-green-500",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                desc: "Work together with approval workflows and shared assets",
                color: "bg-orange-500",
              },
              {
                icon: Globe,
                title: "Multi-Platform",
                desc: "Facebook, Instagram, Twitter, LinkedIn integration",
                color: "bg-cyan-500",
              },
              {
                icon: Shield,
                title: "Brand Safety",
                desc: "Maintain brand consistency with custom templates",
                color: "bg-red-500",
              },
            ].map((feature, index) => (
              <Card key={index} className="neumorphic border-0 p-6 card-hover">
                <div
                  className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">Simple Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your needs. Start free, upgrade anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Freemium */}
            <Card className="neumorphic border-0 p-8 relative">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Freemium</h3>
                <div className="text-4xl font-bold mb-2 text-gray-900">₹0</div>
                <p className="text-gray-600">Perfect for getting started</p>
              </div>
              <ul className="space-y-4 mb-8">
                {["5 AI posters/month", "Basic templates", "Standard downloads", "Community support"].map(
                  (feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ),
                )}
                {["No team collaboration", "No analytics", "No scheduling"].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <X className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full btn-secondary">Get Started Free</Button>
            </Card>

            {/* Pro */}
            <Card className="neumorphic border-0 p-8 relative scale-105 shadow-2xl">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1">
                Most Popular
              </Badge>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Pro</h3>
                <div className="text-4xl font-bold mb-2 text-gray-900">₹499</div>
                <p className="text-gray-600">For growing businesses</p>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "100 AI posters/month",
                  "Premium templates",
                  "HD downloads",
                  "Social scheduling",
                  "Basic analytics",
                  "Email support",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full btn-primary">Start Pro Trial</Button>
            </Card>

            {/* Enterprise */}
            <Card className="neumorphic border-0 p-8 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1">
                <Crown className="w-3 h-3 mr-1" />
                Enterprise
              </Badge>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Enterprise</h3>
                <div className="text-4xl font-bold mb-2 text-gray-900">₹10,000</div>
                <p className="text-gray-600">For large organizations</p>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited posters",
                  "Custom templates",
                  "4K downloads",
                  "Advanced scheduling",
                  "Full analytics",
                  "Team collaboration",
                  "Priority support",
                  "Custom integrations",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600">
                Contact Sales
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">Loved by Teams</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how organizations are transforming their social media with AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                title: "Marketing Director",
                company: "TechCorp",
                quote:
                  "PosterGenie.ai has revolutionized our social media workflow. We create professional posters in minutes, not hours.",
                rating: 5,
                avatar: "SJ",
              },
              {
                name: "Dr. Raj Patel",
                title: "Dean of Marketing",
                company: "University College",
                quote:
                  "The AI understands our brand perfectly. Every poster maintains consistency while being uniquely creative.",
                rating: 5,
                avatar: "RP",
              },
              {
                name: "Maria Garcia",
                title: "Social Media Manager",
                company: "Creative Agency",
                quote:
                  "Our engagement rates increased 300% after switching to AI-generated content. The results speak for themselves.",
                rating: 5,
                avatar: "MG",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="neumorphic border-0 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                    <p className="text-sm text-purple-600">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Social Media?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams creating stunning content with AI. Start your free trial today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="max-w-sm bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
            />
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 font-semibold">
              Get Started Free
              <Zap className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <p className="text-sm text-purple-200">No credit card required • 5 free posters • Cancel anytime</p>
        </div>

        {/* Background Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full"></div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">PosterGenie.ai</span>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                AI-powered poster creation and social media automation platform for modern teams.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <Share2 className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PosterGenie.ai. All rights reserved. Made with ❤️ for creators worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
