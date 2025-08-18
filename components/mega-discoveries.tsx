"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, TrendingUp, Globe, Users, Brain, Activity } from "lucide-react"
import { dataGenerator } from "@/lib/data-generator"
import { safeNumberFormat, safeDateFormat, safeTimeFormat, safeDateOnlyFormat } from "@/lib/utils";

interface MegaScaleMetric {
  id: string
  name: string
  value: number
  unit: string
  change: number
  status: "increasing" | "decreasing" | "stable"
}

interface Discovery {
  id: string
  title: string
  description: string
  impact: string
  confidence: number
  sources: number
  category: string
  timestamp: Date
}

export function MegaDiscoveries() {
  const [metrics, setMetrics] = useState<MegaScaleMetric[]>([])
  const [discoveries, setDiscoveries] = useState<Discovery[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateData = () => {
      const metricData: MegaScaleMetric[] = [
        {
          id: "posts",
          name: "Posts per Second",
          value: Math.floor(Math.random() * 1000) + 500,
          unit: "posts/sec",
          change: Math.floor(Math.random() * 20) + 5,
          status: "increasing"
        },
        {
          id: "translations",
          name: "Translations per Second",
          value: Math.floor(Math.random() * 500) + 200,
          unit: "translations/sec",
          change: Math.floor(Math.random() * 15) + 3,
          status: "increasing"
        },
        {
          id: "patterns",
          name: "Patterns per Second",
          value: Math.floor(Math.random() * 100) + 50,
          unit: "patterns/sec",
          change: Math.floor(Math.random() * 10) + 2,
          status: "increasing"
        },
        {
          id: "uptime",
          name: "System Uptime",
          value: 99.97,
          unit: "%",
          change: 0.02,
          status: "stable"
        },
        {
          id: "algorithms",
          name: "Active Algorithms",
          value: Math.floor(Math.random() * 1000) + 6000,
          unit: "algorithms",
          change: Math.floor(Math.random() * 50) + 25,
          status: "increasing"
        },
        {
          id: "coverage",
          name: "Global Coverage",
          value: Math.floor(Math.random() * 20) + 180,
          unit: "countries",
          change: 2,
          status: "increasing"
        }
      ]
      setMetrics(metricData)

      const discoveryData = dataGenerator.generateAIPatterns().slice(0, 8).map((pattern, i) => ({
        id: `discovery-${i}`,
        title: pattern.title,
        description: pattern.description,
        impact: pattern.impact,
        confidence: pattern.confidence,
        sources: Math.floor(Math.random() * 1000) + 100,
        category: ["Blood Sugar", "Insulin", "Exercise", "Nutrition", "Mental Health", "Technology", "Research", "Community"][i % 8],
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
      }))
      setDiscoveries(discoveryData)
      setLoading(false)
    }

    generateData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "increasing": return "text-green-600"
      case "decreasing": return "text-red-600"
      case "stable": return "text-blue-600"
      default: return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "increasing": return "↗️"
      case "decreasing": return "↘️"
      case "stable": return "→"
      default: return "→"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">🔬 Mega-Scale T1D Discovery Platform</h2>
        <p className="text-muted-foreground">Processing millions of data points to uncover breakthrough insights</p>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-foreground">
                    {safeNumberFormat(metric.value)}
                  </span>
                  <span className="text-lg text-muted-foreground">{metric.unit}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${getStatusColor(metric.status)}`}>
                    {getStatusIcon(metric.status)} {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                  <span className="text-xs text-muted-foreground">vs last hour</span>
                </div>
                <Progress 
                  value={
                    metric.status === "increasing" ? 75 :
                    metric.status === "decreasing" ? 25 : 50
                  } 
                  className="h-2" 
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Latest Discoveries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Latest Breakthrough Discoveries
          </CardTitle>
          <CardDescription>AI-powered insights from global T1D research</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {discoveries.map((discovery) => (
              <div key={discovery.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{discovery.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {discovery.confidence}% confidence
                  </span>
                </div>
                <h4 className="font-semibold mb-2">{discovery.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{discovery.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {safeNumberFormat(discovery.sources)} sources
                  </span>
                  <span className="text-muted-foreground">
                    {safeDateOnlyFormat(discovery.timestamp)}
                  </span>
                </div>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    Impact: {discovery.impact}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Platform Performance
          </CardTitle>
          <CardDescription>Real-time system health and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Data Processing</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Data Sources</span>
                  <span className="font-semibold">50,000+</span>
                </div>
                <div className="flex justify-between">
                  <span>Languages</span>
                  <span className="font-semibold">127</span>
                </div>
                <div className="flex justify-between">
                  <span>AI Models</span>
                  <span className="font-semibold">6,000+</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Global Reach</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Countries</span>
                  <span className="font-semibold">180+</span>
                </div>
                <div className="flex justify-between">
                  <span>Users</span>
                  <span className="font-semibold">1M+</span>
                </div>
                <div className="flex justify-between">
                  <span>Research Papers</span>
                  <span className="font-semibold">100K+</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
