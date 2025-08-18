"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Search, Brain, Database, Globe, TrendingUp, Shield, Users, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <span className="block text-blue-600">T1D AI Platform</span>
              <span className="block text-gray-900">Intelligent Diabetes Discovery</span>
              </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              Advanced AI-powered platform for discovering, analyzing, and connecting diabetes research, 
              community insights, and real-time data from 150+ sources worldwide.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/real-data">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Database className="mr-2 h-5 w-5" />
                  Explore Real Data
                </Button>
              </Link>
              <Link href="/discoveries">
                <Button variant="outline" size="lg">
                  <Search className="mr-2 h-5 w-5" />
                  View Discoveries
                </Button>
              </Link>
            </div>
          </div>
        </div>
          </div>

      {/* Main Navigation Cards */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* AI & Discovery Hub */}
          <Card className="border-2 border-blue-200 hover:border-blue-300 transition-all">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-blue-600" />
            </div>
              <CardTitle className="text-xl">AI & Discovery Hub</CardTitle>
              <CardDescription>Advanced AI-powered research and pattern detection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    AI Detection & Analysis
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  <Link href="/ai-insights-dashboard">
                    <DropdownMenuItem>
                      <Brain className="mr-2 h-4 w-4" />
                      AI Insights Dashboard
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/advanced-ai-discovery-dashboard">
                    <DropdownMenuItem>
                      <Search className="mr-2 h-4 w-4" />
                      Advanced AI Discovery
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/advanced-patterns">
                    <DropdownMenuItem>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Pattern Detection
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/advanced-correlation-dashboard">
                    <DropdownMenuItem>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Correlation Analysis
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          {/* Data & Research Hub */}
          <Card className="border-2 border-green-200 hover:border-green-300 transition-all">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Data & Research Hub</CardTitle>
              <CardDescription>Comprehensive data sources and research insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Research & Data Sources
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  <Link href="/real-data">
                    <DropdownMenuItem>
                      <Database className="mr-2 h-4 w-4" />
                      Real Data Dashboard
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/research">
                    <DropdownMenuItem>
                      <Search className="mr-2 h-4 w-4" />
                      Research Database
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/public-data">
                    <DropdownMenuItem>
                      <Globe className="mr-2 h-4 w-4" />
                      Public Data Sources
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/rss-feed-dashboard">
                    <DropdownMenuItem>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      RSS Feed Dashboard
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          {/* Community & Insights Hub */}
          <Card className="border-2 border-purple-200 hover:border-purple-300 transition-all">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Community & Insights Hub</CardTitle>
              <CardDescription>Community insights and collaborative discoveries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Community & Discoveries
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  <Link href="/community">
                    <DropdownMenuItem>
                      <Users className="mr-2 h-4 w-4" />
                      Community Hub
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/discoveries">
                    <DropdownMenuItem>
                      <Search className="mr-2 h-4 w-4" />
                      All Discoveries
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/mega-discoveries">
                    <DropdownMenuItem>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Mega Discoveries
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/live-feed">
                    <DropdownMenuItem>
                      <Globe className="mr-2 h-4 w-4" />
                      Live Feed
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          {/* Analytics & Patterns Hub */}
          <Card className="border-2 border-orange-200 hover:border-orange-300 transition-all">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Analytics & Patterns Hub</CardTitle>
              <CardDescription>Advanced analytics and pattern recognition</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Analytics & Patterns
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  <Link href="/analytics-dashboard">
                    <DropdownMenuItem>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Analytics Dashboard
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/patterns/anomalies">
                    <DropdownMenuItem>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Anomaly Detection
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/patterns/correlations">
                    <DropdownMenuItem>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Correlation Patterns
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/unaddressed">
                    <DropdownMenuItem>
                      <Search className="mr-2 h-4 w-4" />
                      Unaddressed Topics
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          {/* Integration & Tools Hub */}
          <Card className="border-2 border-red-200 hover:border-red-300 transition-all">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-xl">Integration & Tools Hub</CardTitle>
              <CardDescription>External integrations and specialized tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Integrations & Tools
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  <Link href="/jaeb-integration">
                    <DropdownMenuItem>
                      <Database className="mr-2 h-4 w-4" />
                      JAEB Integration
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/comprehensive-integration">
                    <DropdownMenuItem>
                      <Globe className="mr-2 h-4 w-4" />
                      Comprehensive Integration
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/expanded-sources">
                    <DropdownMenuItem>
                      <Search className="mr-2 h-4 w-4" />
                      Expanded Sources
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/unified-insights">
                    <DropdownMenuItem>
                      <Brain className="mr-2 h-4 w-4" />
                      Unified Insights
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          {/* Quick Access Hub */}
          <Card className="border-2 border-indigo-200 hover:border-indigo-300 transition-all">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle className="text-xl">Quick Access Hub</CardTitle>
              <CardDescription>Fast access to key features and recent discoveries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/dashboard">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Main Dashboard
                </Button>
              </Link>
              <Link href="/live-feed">
                <Button variant="outline" className="w-full">
                  <Globe className="mr-2 h-4 w-4" />
                  Live Updates
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Platform Features</h2>
          <p className="mt-4 text-lg text-gray-600">Discover what makes our platform unique</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Database className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">150+ Data Sources</h3>
            <p className="text-gray-600">Comprehensive coverage from RSS feeds, research databases, and community platforms</p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Brain className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Discovery</h3>
            <p className="text-gray-600">Advanced pattern recognition and correlation analysis using machine learning</p>
              </div>
          
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Updates</h3>
            <p className="text-gray-600">Hourly updates from all sources with automatic content validation</p>
          </div>
        </div>
      </div>
    </div>
  )
}
