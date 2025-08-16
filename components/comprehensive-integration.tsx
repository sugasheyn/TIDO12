"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Database, Users, TrendingUp, Activity, Shield, Zap } from "lucide-react"
import { dataGenerator } from "@/lib/data-generator"

interface DataSource {
  id: string
  name: string
  type: "clinical" | "research" | "community" | "technology" | "public" | "government"
  status: "active" | "inactive" | "maintenance" | "error"
  lastSync: Date
  recordCount: number
  quality: number
  coverage: string[]
}

interface IntegrationMetric {
  id: string
  name: string
  value: number
  unit: string
  target: number
  trend: "improving" | "stable" | "declining"
  lastUpdated: Date
}

export function ComprehensiveIntegration() {
  const [sources, setSources] = useState<DataSource[]>([])
  const [metrics, setMetrics] = useState<IntegrationMetric[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateData = () => {
      const sourceData: DataSource[] = [
        {
          id: "source-1",
          name: "T1D Exchange Registry",
          type: "clinical",
          status: "active",
          lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000),
          recordCount: 25000000,
          quality: 95,
          coverage: ["US", "Canada", "Europe", "Australia"]
        },
        {
          id: "source-2",
          name: "Dexcom CGM Data",
          type: "technology",
          status: "active",
          lastSync: new Date(Date.now() - 15 * 60 * 1000),
          recordCount: 15000000,
          quality: 92,
          coverage: ["Global"]
        },
        {
          id: "source-3",
          name: "PubMed Research",
          type: "research",
          status: "active",
          lastSync: new Date(Date.now() - 6 * 60 * 60 * 1000),
          recordCount: 500000,
          quality: 88,
          coverage: ["Global"]
        },
        {
          id: "source-4",
          name: "Reddit Community",
          type: "community",
          status: "active",
          lastSync: new Date(Date.now() - 30 * 60 * 1000),
          recordCount: 1000000,
          quality: 75,
          coverage: ["Global"]
        },
        {
          id: "source-5",
          name: "FDA Adverse Events",
          type: "government",
          status: "active",
          lastSync: new Date(Date.now() - 12 * 60 * 60 * 1000),
          recordCount: 800000,
          quality: 90,
          coverage: ["US"]
        },
        {
          id: "source-6",
          name: "ClinicalTrials.gov",
          type: "research",
          status: "active",
          lastSync: new Date(Date.now() - 8 * 60 * 60 * 1000),
          recordCount: 1200000,
          quality: 87,
          coverage: ["Global"]
        }
      ]
      setSources(sourceData)

      const metricData: IntegrationMetric[] = [
        {
          id: "metric-1",
          name: "Data Sources Connected",
          value: 50,
          unit: "sources",
          target: 60,
          trend: "improving",
          lastUpdated: new Date()
        },
        {
          id: "metric-2",
          name: "Total Records Processed",
          value: 45,
          unit: "million",
          target: 50,
          trend: "improving",
          lastUpdated: new Date()
        },
        {
          id: "metric-3",
          name: "Data Quality Score",
          value: 87,
          unit: "%",
          target: 90,
          trend: "stable",
          lastUpdated: new Date()
        },
        {
          id: "metric-4",
          name: "Real-time Sync Rate",
          value: 94,
          unit: "%",
          target: 95,
          trend: "improving",
          lastUpdated: new Date()
        },
        {
          id: "metric-5",
          name: "API Response Time",
          value: 180,
          unit: "ms",
          target: 200,
          trend: "stable",
          lastUpdated: new Date()
        },
        {
          id: "metric-6",
          name: "Global Coverage",
          value: 180,
          unit: "countries",
          target: 200,
          trend: "improving",
          lastUpdated: new Date()
        }
      ]
      setMetrics(metricData)
      setLoading(false)
    }

    generateData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "inactive": return "bg-red-100 text-red-800"
      case "maintenance": return "bg-yellow-100 text-yellow-800"
      case "error": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "clinical": return "bg-blue-100 text-blue-800"
      case "research": return "bg-purple-100 text-purple-800"
      case "community": return "bg-green-100 text-green-800"
      case "technology": return "bg-orange-100 text-orange-800"
      case "public": return "bg-gray-100 text-gray-800"
      case "government": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving": return "↗️"
      case "declining": return "↘️"
      case "stable": return "→"
      default: return "→"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-64 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">🌐 All Sources Integration</h2>
        <p className="text-muted-foreground">Comprehensive data integration across all T1D research sources</p>
      </div>

      <Tabs defaultValue="sources" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sources">📡 Data Sources</TabsTrigger>
          <TabsTrigger value="metrics">📊 Integration Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="sources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sources.map((source) => (
              <Card key={source.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(source.status)}>
                      {source.status.toUpperCase()}
                    </Badge>
                    <Badge className={getTypeColor(source.type)}>
                      {source.type.toUpperCase()}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{source.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Record Count</span>
                      <span className="text-sm font-semibold">
                        {source.recordCount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Data Quality</span>
                      <span className="text-sm font-semibold">{source.quality}%</span>
                    </div>
                    <Progress value={source.quality} className="h-2" />
                    <div>
                      <span className="text-sm font-medium">Coverage: </span>
                      <span className="text-sm text-muted-foreground">
                        {source.coverage.join(", ")}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Last Sync: </span>
                      <span className="text-sm text-muted-foreground">
                        {source.lastSync.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
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
                        {metric.value.toLocaleString()}
                      </span>
                      <span className="text-lg text-muted-foreground">{metric.unit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {getTrendIcon(metric.trend)} Target: {metric.target.toLocaleString()}
                      </span>
                    </div>
                    <Progress 
                      value={Math.min((metric.value / metric.target) * 100, 100)} 
                      className="h-2" 
                    />
                    <div className="text-xs text-muted-foreground">
                      Updated: {metric.lastUpdated.toLocaleTimeString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Integration Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Integration Platform Overview
          </CardTitle>
          <CardDescription>Real-time data integration and processing capabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Data Processing</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Sources</span>
                  <span className="font-semibold">50+</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Types</span>
                  <span className="font-semibold">15+</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Speed</span>
                  <span className="font-semibold">1M+ records/hour</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Global Coverage</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Countries</span>
                  <span className="font-semibold">180+</span>
                </div>
                <div className="flex justify-between">
                  <span>Languages</span>
                  <span className="font-semibold">127</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Zones</span>
                  <span className="font-semibold">24/7</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">🔗 Connect Your Data Source</h3>
            <p className="text-muted-foreground mb-4">
              Integrate your T1D research or clinical data with our comprehensive platform
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="default">Request Integration</Button>
              <Button variant="outline">View API Docs</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
