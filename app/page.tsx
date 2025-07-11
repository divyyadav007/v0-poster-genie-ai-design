import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  Code,
  Star,
  ArrowRight,
  Check,
  X,
  Crown,
  Building2,
  GraduationCap,
  Heart,
  Briefcase,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">PosterGenie.ai</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">
                Features
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </a>
              <a href="#target-market" className="text-gray-600 hover:text-gray-900">
                For Organizations
              </a>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Start Free Trial</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Event Marketing Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Automate Event Posters</span>
            <br />& Social Media Posts
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your organization's event marketing with AI. Generate professional posters, maintain brand
            consistency, and schedule posts across all platforms automatically.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              Watch Demo
            </Button>
          </div>

          {/* AI Tools Showcase */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Powered by Leading AI Technologies</h3>
                <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Wand2 className="w-6 h-6 text-green-600" />
                    </div>
                    <span>DALL·E 3</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Zap className="w-6 h-6 text-purple-600" />
                    </div>
                    <span>Runway ML</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                    <span>GPT-4o</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Star className="w-6 h-6 text-orange-600" />
                    </div>
                    <span>Leonardo AI</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center"
                  >
                    <div className="text-center">
                      <Wand2 className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">AI Generated Event Poster</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Market */}
      <section id="target-market" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Organizations</h2>
            <p className="text-xl text-gray-600">Trusted by educational institutions, NGOs, and enterprises</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: GraduationCap,
                title: "Colleges & Universities",
                description: "Streamline event promotion for academic institutions",
                color: "text-blue-600",
                bg: "bg-blue-100",
              },
              {
                icon: Heart,
                title: "NGOs",
                description: "Amplify your cause with professional event marketing",
                color: "text-red-600",
                bg: "bg-red-100",
              },
              {
                icon: Briefcase,
                title: "Corporate Teams",
                description: "HR & Marketing teams for internal events",
                color: "text-green-600",
                bg: "bg-green-100",
              },
              {
                icon: Building2,
                title: "Event Agencies",
                description: "Scale your event management services",
                color: "text-purple-600",
                bg: "bg-purple-100",
              },
            ].map((target, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className={`w-16 h-16 ${target.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <target.icon className={`w-8 h-8 ${target.color}`} />
                  </div>
                  <CardTitle className="text-xl">{target.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{target.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Event Marketing Automation</h2>
            <p className="text-xl text-gray-600">Everything you need to streamline your event promotion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Upload,
                title: "Logo Upload & Profile Creation",
                desc: "Maintain brand consistency across all posters",
              },
              {
                icon: Calendar,
                title: "Event Calendar & Scheduling",
                desc: "Plan and schedule your events in advance",
              },
              {
                icon: Wand2,
                title: "AI Poster Generation",
                desc: "DALL·E, Runway ML, Leonardo AI integration",
              },
              {
                icon: Sparkles,
                title: "Logo Integration (OpenCV)",
                desc: "Automatic logo placement with perfect positioning",
              },
              {
                icon: MessageSquare,
                title: "GPT-4o Prompt Generation",
                desc: "Smart captions and content generation",
              },
              {
                icon: Share2,
                title: "Social Media Automation",
                desc: "Meta, LinkedIn, Twitter API integration",
              },
              {
                icon: BarChart3,
                title: "Analytics Dashboard",
                desc: "Track engagement and performance",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                desc: "Review mechanism before posting",
              },
              {
                icon: Code,
                title: "API Access",
                desc: "Integrate with your existing systems",
              },
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{feature.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Exact from Business Plan */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Freemium to Enterprise - Scale as you grow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Freemium Plan */}
            <Card className="border-gray-200 relative">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Freemium</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹0</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>5 poster credits/month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Basic templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Standard quality downloads</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>1 user account</span>
                  </li>
                  <li className="flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-3" />
                    <span>No shared library</span>
                  </li>
                  <li className="flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-3" />
                    <span>No analytics</span>
                  </li>
                </ul>
                <Button className="w-full bg-transparent" variant="outline">
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-purple-500 shadow-xl scale-105 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600">
                Most Popular
              </Badge>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Pro Plan</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹499</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <CardDescription>For growing organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>100 poster credits/month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Premium templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>High-Res PNG downloads</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>1 user account</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Basic scheduling</span>
                  </li>
                  <li className="flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-3" />
                    <span>No shared library</span>
                  </li>
                  <li className="flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-3" />
                    <span>No analytics dashboard</span>
                  </li>
                </ul>
                <Button className="w-full">Start Pro Trial</Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-yellow-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="enterprise-gradient text-black">
                  <Crown className="w-3 h-3 mr-1" />
                  Enterprise
                </Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹10,000</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <CardDescription>For large organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>1000+ poster credits/month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Event-specific & custom templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Ultra High-Res PNG + PDF</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Up to 10 team members</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Shared library</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Full calendar automation</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Analytics dashboard</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>WhatsApp integration</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>QR code generator</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Dedicated account manager</span>
                  </li>
                </ul>
                <Button className="w-full enterprise-gradient text-black hover:opacity-90">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Organizations</h2>
            <p className="text-xl text-gray-600">See how PosterGenie.ai transforms event marketing</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Priya Sharma",
                title: "Marketing Head, Delhi University",
                quote:
                  "PosterGenie.ai has revolutionized how we promote our academic events. The AI-generated posters maintain our brand consistency while saving hours of design work.",
                rating: 5,
                organization: "University",
              },
              {
                name: "Rajesh Kumar",
                title: "Founder, GreenEarth NGO",
                quote:
                  "As an NGO, we needed professional-looking posters on a tight budget. PosterGenie.ai delivers exactly that with incredible automation.",
                rating: 5,
                organization: "NGO",
              },
              {
                name: "Anita Patel",
                title: "HR Director, TechCorp India",
                quote:
                  "The WhatsApp integration and team collaboration features are game-changers for our internal event management.",
                rating: 5,
                organization: "Corporate",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.title}</CardDescription>
                      <Badge variant="outline" className="mt-1">
                        {testimonial.organization}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Event Marketing?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join organizations worldwide who trust PosterGenie.ai for their event promotion needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Free Trial
                <Zap className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">PosterGenie.ai</span>
              </div>
              <p className="text-gray-400 mb-4">
                AI-powered poster creation and social media automation platform for organizations.
              </p>
              <p className="text-sm text-gray-500">
                Founded by Divyanshu Yadav
                <br />
                B. Tech CSE-AI | 2nd Year
                <br />
                +91 8601058784
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Organizations</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Universities
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    NGOs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Enterprises
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Event Agencies
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-400 mb-4">Get the latest updates and tips</p>
              <div className="flex space-x-2">
                <Input placeholder="Enter your email" className="bg-gray-800 border-gray-700" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PosterGenie.ai. All rights reserved. | Startup Valuation: ₹10 Lakhs (Post-Money)</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
