"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Activity, Users, Globe, Zap, Shield, Database } from "lucide-react"
import { dataGenerator } from "@/lib/data-generator"
import { safeNumberFormat, safeDateFormat, safeTimeFormat, safeDateOnlyFormat } from "@/lib/utils";

interface DashboardMetric {
  id: string
  name: string
  value: number
  unit: string
  change: number
  trend: "up" | "down" | "stable"
  target: number
  category: "performance" | "engagement" | "quality" | "coverage"
}

interface SystemAlert {
  id: string
  type: "info" | "warning" | "error" | "success"
  title: string
  message: string
  timestamp: Date
  priority: "low" | "medium" | "high" | "critical"
}

export function IntegratedDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([])
  const [alerts, setAlerts] = useState<SystemAlert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateData = () => {
      const metricData: DashboardMetric[] = [
        {
          id: "metric-1",
          name: "Active Users",
          value: 12500,
          unit: "users",
          change: 12.5,
          trend: "up",
          target: 15000,
          category: "engagement"
        },
        {
          id: "metric-2",
          name: "Data Processing Rate",
          value: 2.8,
          unit: "M records/hour",
          change: 8.2,
          trend: "up",
          target: 3.0,
          category: "performance"
        },
        {
          id: "metric-3",
          name: "API Response Time",
          value: 145,
          unit: "ms",
          change: -5.8,
          trend: "up",
          target: 150,
          category: "performance"
        },
        {
          id: "metric-4",
          name: "Data Quality Score",
          value: 94.2,
          unit: "%",
          change: 1.8,
          trend: "up",
          target: 95.0,
          category: "quality"
        },
        {
          id: "metric-5",
          name: "Global Coverage",
          value: 187,
          unit: "countries",
          change: 3.2,
          trend: "up",
          target: 200,
          category: "coverage"
        },
        {
          id: "metric-6",
          name: "System Uptime",
          value: 99.97,
          unit: "%",
          change: 0.02,
          trend: "up",
          target: 99.99,
          category: "performance"
        }
      ]
      setMetrics(metricData)

      const alertData: SystemAlert[] = [
        {
          id: "alert-1",
          type: "success",
          title: "Data Sync Completed",
          message: "All data sources synchronized successfully",
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          priority: "low"
        },
        {
          id: "alert-2",
          type: "info",
          title: "New Data Source Added",
          message: "ClinicalTrials.gov integration completed",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          priority: "medium"
        },
        {
          id: "alert-3",
          type: "warning",
          title: "High API Usage",
          message: "API calls approaching rate limit",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          priority: "medium"
        },
        {
          id: "alert-4",
          type: "error",
          title: "Data Source Offline",
          message: "Reddit API experiencing intermittent issues",
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          priority: "high"
        }
      ]
      setAlerts(alertData)
      setLoading(false)
    }

    generateData()
  }, [])

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "text-green-600"
      case "down": return "text-red-600"
      case "stable": return "text-blue-600"
      default: return "text-gray-600"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return "↗️"
      case "down": return "↘️"
      case "stable": return "→"
      default: return "→"
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "success": return "bg-green-100 text-green-800 border-green-200"
      case "warning": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "error": return "bg-red-100 text-red-800 border-red-200"
      case "info": return "bg-blue-100 text-blue-800 border-blue-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-100 text-red-800"
      case "high": return "bg-orange-100 text-orange-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
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
        <h2 className="text-2xl font-bold text-foreground">📈 Integrated Dashboard</h2>
        <p className="text-muted-foreground">Real-time platform performance and system health monitoring</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">📊 Overview</TabsTrigger>
          <TabsTrigger value="performance">⚡ Performance</TabsTrigger>
          <TabsTrigger value="alerts">🚨 System Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
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
                      <span className={`text-sm ${getTrendColor(metric.trend)}`}>
                        {getTrendIcon(metric.trend)} {metric.change > 0 ? '+' : ''}{metric.change}%
                      </span>
                      <span className="text-xs text-muted-foreground">vs last hour</span>
                    </div>
                    <Progress 
                      value={Math.min((metric.value / metric.target) * 100, 100)} 
                      className="h-2" 
                    />
                    <div className="text-xs text-muted-foreground">
                      Target: {safeNumberFormat(metric.target)} {metric.unit}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  System Performance
                </CardTitle>
                <CardDescription>Real-time performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Usage</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory Usage</span>
                      <span>67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Network I/O</span>
                      <span>23%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Disk I/O</span>
                      <span>34%</span>
                    </div>
                    <Progress value={34} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Processing
                </CardTitle>
                <CardDescription>Data pipeline performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Data Sources</span>
                      <span>50/50</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Processing Queue</span>
                      <span>12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Error Rate</span>
                      <span>0.3%</span>
                    </div>
                    <Progress value={0.3} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Sync Status</span>
                      <span>98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <Card key={alert.id} className={`border ${getAlertColor(alert.type)}`}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{alert.title}</h4>
                        <Badge className={getPriorityColor(alert.priority)}>
                          {alert.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                      <span className="text-xs text-muted-foreground">
                        {safeNumberFormat(alert.timestamp)}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      Dismiss
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Button variant="outline" size="sm" className="h-20 flex-col">
              <Database className="h-5 w-5 mb-2" />
              <span className="text-xs">Sync Data</span>
            </Button>
            <Button variant="outline" size="sm" className="h-20 flex-col">
              <Users className="h-5 w-5 mb-2" />
              <span className="text-xs">User Management</span>
            </Button>
            <Button variant="outline" size="sm" className="h-20 flex-col">
              <Shield className="h-5 w-5 mb-2" />
              <span className="text-xs">Security</span>
            </Button>
            <Button variant="outline" size="sm" className="h-20 flex-col">
              <Globe className="h-5 w-5 mb-2" />
              <span className="text-xs">Global Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
