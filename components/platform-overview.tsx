"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp, CheckCircle, Globe, Database, Brain } from "lucide-react"

export function PlatformOverview() {
  const stats = [
    { label: "Active Sources", value: "6,247", change: "+23", icon: Database, color: "text-blue-600" },
    { label: "Daily Articles", value: "1,834", change: "+156", icon: Activity, color: "text-emerald-600" },
    { label: "AI Insights", value: "47", change: "+12", icon: Brain, color: "text-purple-600" },
    { label: "Pattern Alerts", value: "8", change: "+3", icon: TrendingUp, color: "text-orange-600" },
  ]

  const sourceCategories = [
    { name: "Medical Journals", count: 2000, percentage: 85, status: "healthy" },
    { name: "Social Media", count: 2000, percentage: 92, status: "healthy" },
    { name: "Clinical Trials", count: 800, percentage: 78, status: "warning" },
    { name: "Regulatory", count: 500, percentage: 95, status: "healthy" },
    { name: "Industry News", count: 700, percentage: 88, status: "healthy" },
    { name: "Community Forums", count: 247, percentage: 91, status: "healthy" },
  ]

  const recentDiscoveries = [
    {
      title: "CGM Accuracy Patterns in Cold Weather",
      source: "Reddit r/diabetes_t1",
      confidence: 87,
      type: "Community Insight",
    },
    {
      title: "New Insulin Formulation Shows Promise",
      source: "Diabetes Care Journal",
      confidence: 95,
      type: "Clinical Research",
    },
    {
      title: "DIY Loop System Safety Concerns",
      source: "Multiple Forums",
      confidence: 78,
      type: "Safety Alert",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-600">{stat.change}</span> from yesterday
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Source Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Source Health Monitor
            </CardTitle>
            <CardDescription>Real-time monitoring of data source availability and quality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sourceCategories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        category.status === "healthy"
                          ? "bg-emerald-500"
                          : category.status === "warning"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    />
                    <span className="text-sm font-medium">{category.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {category.count.toLocaleString()}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                </div>
                <Progress value={category.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Discoveries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Recent AI Discoveries
            </CardTitle>
            <CardDescription>Latest patterns and insights identified by our AI system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentDiscoveries.map((discovery, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-sm leading-tight">{discovery.title}</h4>
                  <Badge
                    variant={
                      discovery.type === "Safety Alert"
                        ? "destructive"
                        : discovery.type === "Clinical Research"
                          ? "default"
                          : "secondary"
                    }
                    className="text-xs"
                  >
                    {discovery.type}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{discovery.source}</span>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>{discovery.confidence}% confidence</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Global Activity Map - Enhanced Real-time Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Global T1D Research Activity
          </CardTitle>
          <CardDescription>Real-time visualization of research activity across different regions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-emerald-100/50">
              <div className="grid grid-cols-6 gap-4 p-6 h-full">
                {/* Real-time Activity Hotspots */}
                <div className="col-span-2 space-y-3">
                  <div className="bg-blue-500/20 rounded-lg p-3 border border-blue-200 hover:bg-blue-500/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">North America</span>
                    </div>
                    <div className="text-xs text-gray-600">2,847 active sources</div>
                    <div className="text-xs text-blue-600 font-medium">+127 posts/hour</div>
                  </div>
                  <div className="bg-emerald-500/20 rounded-lg p-3 border border-emerald-200 hover:bg-emerald-500/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Europe</span>
                    </div>
                    <div className="text-xs text-gray-600">1,923 active sources</div>
                    <div className="text-xs text-emerald-600 font-medium">+89 posts/hour</div>
                  </div>
                </div>

                <div className="col-span-2 space-y-3">
                  <div className="bg-purple-500/20 rounded-lg p-3 border border-purple-200 hover:bg-purple-500/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Asia Pacific</span>
                    </div>
                    <div className="text-xs text-gray-600">1,156 active sources</div>
                    <div className="text-xs text-purple-600 font-medium">+156 posts/hour</div>
                  </div>
                  <div className="bg-orange-500/20 rounded-lg p-3 border border-orange-200 hover:bg-orange-500/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Latin America</span>
                    </div>
                    <div className="text-xs text-gray-600">321 active sources</div>
                    <div className="text-xs text-orange-600 font-medium">+34 posts/hour</div>
                  </div>
                </div>

                <div className="col-span-2 space-y-3">
                  <div className="bg-red-500/20 rounded-lg p-3 border border-red-200 hover:bg-red-500/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Live Processing</span>
                    </div>
                    <div className="text-xs text-gray-600">6,247 total sources</div>
                    <div className="text-xs text-red-600 font-medium">127 posts/minute</div>
                  </div>
                  <div className="bg-yellow-500/20 rounded-lg p-3 border border-yellow-200 hover:bg-yellow-500/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">AI Discoveries</span>
                    </div>
                    <div className="text-xs text-gray-600">47 new insights today</div>
                    <div className="text-xs text-yellow-600 font-medium">89% confidence avg</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
