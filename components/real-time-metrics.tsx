"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Zap, Clock, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

interface ActivityEvent {
  timestamp: Date
  event: string
  type: "discovery" | "processing" | "translation" | "alert" | "analysis" | "monitoring"
}

export function RealTimeMetrics() {
  const [metrics, setMetrics] = useState({
    currentProcessingRate: 127.3,
    queueSize: 1247,
    avgResponseTime: 2.4,
    errorRate: 1.2,
    activeWorkers: 12,
    systemLoad: 67,
  })

  const [recentActivity, setRecentActivity] = useState<ActivityEvent[]>([
    { timestamp: new Date(), event: "New pattern detected: CGM accuracy in cold weather", type: "discovery" },
    { timestamp: new Date(Date.now() - 30000), event: "Processing batch from r/diabetes_t1", type: "processing" },
    { timestamp: new Date(Date.now() - 60000), event: "Translation completed: 45 Spanish posts", type: "translation" },
    { timestamp: new Date(Date.now() - 90000), event: "Safety alert: Pump occlusion reports", type: "alert" },
    { timestamp: new Date(Date.now() - 120000), event: "Sentiment analysis: 89% accuracy", type: "analysis" },
  ])

  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "reconnecting">("connected")
  const [lastUpdate, setLastUpdate] = useState(new Date())

  const updateMetrics = useCallback(() => {
    try {
      setMetrics((prev) => ({
        ...prev,
        currentProcessingRate: Math.max(0, prev.currentProcessingRate + (Math.random() - 0.5) * 10),
        queueSize: Math.max(0, prev.queueSize + Math.floor((Math.random() - 0.5) * 100)),
        avgResponseTime: Math.max(0.1, prev.avgResponseTime + (Math.random() - 0.5) * 0.5),
        systemLoad: Math.max(0, Math.min(100, prev.systemLoad + (Math.random() - 0.5) * 10)),
      }))
      setConnectionStatus("connected")
      setLastUpdate(new Date())
    } catch (error) {
      console.error("Failed to update metrics:", error)
      setConnectionStatus("disconnected")
    }
  }, [])

  const addNewActivity = useCallback(() => {
    if (Math.random() < 0.3) {
      const events = [
        "New content from Dexcom community",
        "Pattern analysis completed",
        "Translation batch finished",
        "Sentiment update processed",
        "Source health check completed",
        "Breakthrough discovery: Exercise timing correlation",
        "Critical alert: Insulin pump recall notice",
        "AI model training completed",
        "Cross-validation study published",
        "Community insight: Sleep pattern effects",
      ]
      const types: ActivityEvent["type"][] = [
        "processing",
        "analysis",
        "translation",
        "analysis",
        "monitoring",
        "discovery",
        "alert",
        "processing",
        "analysis",
        "discovery",
      ]
      const randomIndex = Math.floor(Math.random() * events.length)

      setRecentActivity((prev) => [
        {
          timestamp: new Date(),
          event: events[randomIndex],
          type: types[randomIndex],
        },
        ...prev.slice(0, 9),
      ])
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      updateMetrics()
      addNewActivity()
    }, 5000) // Increased from 3000ms to 5000ms for better performance

    return () => clearInterval(interval)
  }, [updateMetrics, addNewActivity])

  const getEventIcon = useMemo(
    () => (type: string) => {
      switch (type) {
        case "discovery":
          return <TrendingUp className="h-4 w-4 text-emerald-500" />
        case "processing":
          return <Activity className="h-4 w-4 text-blue-500" />
        case "translation":
          return <Zap className="h-4 w-4 text-purple-500" />
        case "alert":
          return <AlertCircle className="h-4 w-4 text-red-500" />
        case "analysis":
          return <CheckCircle className="h-4 w-4 text-emerald-500" />
        default:
          return <Clock className="h-4 w-4 text-gray-500" />
      }
    },
    [],
  )

  const getEventBadge = useMemo(
    () => (type: string) => {
      switch (type) {
        case "discovery":
          return "default"
        case "processing":
          return "secondary"
        case "translation":
          return "outline"
        case "alert":
          return "destructive"
        case "analysis":
          return "default"
        default:
          return "secondary"
      }
    },
    [],
  )

  const systemComponents = useMemo(
    () => [
      { component: "AI Processing Pipeline", status: "healthy", uptime: 99.8 },
      { component: "Data Collection", status: "healthy", uptime: 99.5 },
      { component: "Translation Service", status: "healthy", uptime: 98.9 },
      { component: "Pattern Detection", status: "warning", uptime: 97.2 },
      { component: "Database", status: "healthy", uptime: 99.9 },
      { component: "API Gateway", status: "healthy", uptime: 99.7 },
    ],
    [],
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">Real-time System Metrics</h2>
          <p className="text-muted-foreground">Live monitoring of T1D AI research platform</p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              connectionStatus === "connected"
                ? "bg-green-500 animate-pulse"
                : connectionStatus === "reconnecting"
                  ? "bg-yellow-500 animate-pulse"
                  : "bg-red-500"
            }`}
          />
          <span className="text-sm text-muted-foreground">
            {connectionStatus === "connected"
              ? "Live"
              : connectionStatus === "reconnecting"
                ? "Reconnecting"
                : "Disconnected"}
          </span>
          <span className="text-xs text-muted-foreground">• Updated {lastUpdate.toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm group-hover:text-blue-600 transition-colors">Processing Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 transition-all duration-500 group-hover:scale-110">
              {metrics.currentProcessingRate.toFixed(1)}/min
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Activity className="h-3 w-3 text-blue-500 animate-pulse" />
              <span className="text-xs text-muted-foreground">Live Processing</span>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm group-hover:text-purple-600 transition-colors">Queue Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600 transition-all duration-500 group-hover:scale-110">
              {metrics.queueSize}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Items pending</div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm group-hover:text-emerald-600 transition-colors">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 transition-all duration-500 group-hover:scale-110">
              {metrics.avgResponseTime.toFixed(1)}s
            </div>
            <div className="text-xs text-muted-foreground mt-1">Average</div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm group-hover:text-orange-600 transition-colors">Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 transition-all duration-500 group-hover:scale-110">
              {metrics.errorRate.toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">Last hour</div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm group-hover:text-blue-600 transition-colors">Active Workers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 transition-all duration-500 group-hover:scale-110">
              {metrics.activeWorkers}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Processing</div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm group-hover:text-red-600 transition-colors">System Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 transition-all duration-500 group-hover:scale-110">
              {metrics.systemLoad}%
            </div>
            <Progress value={metrics.systemLoad} className="h-2 mt-2 transition-all duration-300 group-hover:h-3" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 animate-pulse" />
              Live Activity Feed
            </CardTitle>
            <CardDescription>Real-time system events and discoveries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 border rounded-lg transition-all duration-300 hover:bg-muted/50 hover:shadow-sm"
              >
                {getEventIcon(activity.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight">{activity.event}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={getEventBadge(activity.type) as any} className="text-xs">
                      {activity.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{activity.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              System Health
            </CardTitle>
            <CardDescription>Real-time system component status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemComponents.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg transition-all duration-300 hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      item.status === "healthy"
                        ? "bg-emerald-500 animate-pulse"
                        : item.status === "warning"
                          ? "bg-yellow-500 animate-pulse"
                          : "bg-red-500 animate-pulse"
                    }`}
                  />
                  <span className="text-sm font-medium">{item.component}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{item.uptime}%</div>
                  <div className="text-xs text-muted-foreground">uptime</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Real-time Performance</CardTitle>
          <CardDescription>Live system performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
            <div className="text-center space-y-2">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto" />
              <p className="text-gray-500 font-medium">Live Performance Charts</p>
              <p className="text-sm text-gray-400">Real-time system metrics and performance indicators</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
