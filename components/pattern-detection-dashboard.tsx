"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TrendingUp, TrendingDown, AlertTriangle, Zap, Brain, Target } from "lucide-react"
import { safeNumberFormat, safeDateFormat, safeTimeFormat, safeDateOnlyFormat } from "@/lib/utils";

interface Pattern {
  id: string
  type: "trend" | "correlation" | "anomaly" | "discovery"
  title: string
  description: string
  confidence: number
  significance: number
  status: "active" | "validated" | "dismissed"
  created_at: string
}

interface Correlation {
  id: string
  entity_a: string
  entity_b: string
  correlation_type: "positive" | "negative" | "causal"
  strength: number
  p_value: number
}

interface Anomaly {
  id: string
  type: string
  entity: string
  severity: "low" | "medium" | "high" | "critical"
  description: string
  deviation_score: number
}

export default function PatternDetectionDashboard() {
  const [patterns, setPatterns] = useState<Pattern[]>([])
  const [correlations, setCorrelations] = useState<Correlation[]>([])
  const [anomalies, setAnomalies] = useState<Anomaly[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPatternData()
  }, [])

  const fetchPatternData = async () => {
    try {
      const [patternsRes, correlationsRes, anomaliesRes] = await Promise.all([
        fetch("/api/patterns/detect"),
        fetch("/api/patterns/correlations"),
        fetch("/api/patterns/anomalies"),
      ])

      const patternsData = await patternsRes.json()
      const correlationsData = await correlationsRes.json()
      const anomaliesData = await anomaliesRes.json()

      setPatterns(patternsData.patterns || [])
      setCorrelations(correlationsData.correlations || [])
      setAnomalies(anomaliesData.anomalies || [])
    } catch (error) {
      console.error("Failed to fetch pattern data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getPatternIcon = (type: string) => {
    switch (type) {
      case "trend":
        return <TrendingUp className="h-4 w-4" />
      case "correlation":
        return <Target className="h-4 w-4" />
      case "anomaly":
        return <AlertTriangle className="h-4 w-4" />
      case "discovery":
        return <Zap className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Pattern Detection Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Patterns</CardTitle>
            <Brain className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patterns.length}</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Correlations Found</CardTitle>
            <Target className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{correlations.length}</div>
            <p className="text-xs text-muted-foreground">
              High confidence: {correlations.filter((c) => Math.abs(c.strength) > 0.7).length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anomalies Detected</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{anomalies.length}</div>
            <p className="text-xs text-muted-foreground">
              Critical: {anomalies.filter((a) => a.severity === "critical").length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Detection Accuracy</CardTitle>
            <Zap className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <Progress value={94.2} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Critical Anomalies Alert */}
      {anomalies.filter((a) => a.severity === "critical").length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">Critical Anomalies Detected</AlertTitle>
          <AlertDescription className="text-red-700">
            {anomalies.filter((a) => a.severity === "critical").length} critical anomalies require immediate attention.
            <Button variant="link" className="p-0 h-auto text-red-700 underline ml-1">
              View Details
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Pattern Analysis Tabs */}
      <Tabs defaultValue="patterns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="patterns">Detected Patterns</TabsTrigger>
          <TabsTrigger value="correlations">Correlations</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
        </TabsList>

        <TabsContent value="patterns" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {patterns.map((pattern) => (
              <Card key={pattern.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getPatternIcon(pattern.type)}
                      <CardTitle className="text-lg">{pattern.title}</CardTitle>
                    </div>
                    <Badge variant={pattern.status === "active" ? "default" : "secondary"}>{pattern.status}</Badge>
                  </div>
                  <CardDescription>{pattern.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Confidence</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={pattern.confidence * 100} className="w-20" />
                        <span className="text-sm font-medium">{(pattern.confidence * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Significance</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={pattern.significance * 100} className="w-20" />
                        <span className="text-sm font-medium">{(pattern.significance * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Detected</span>
                      <span>{new Date(pattern.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="correlations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {correlations.map((correlation) => (
              <Card key={correlation.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Target className="h-4 w-4" />
                    <span>
                      {correlation.entity_a} ↔ {correlation.entity_b}
                    </span>
                  </CardTitle>
                  <CardDescription>{correlation.correlation_type} correlation detected</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Strength</span>
                      <div className="flex items-center space-x-2">
                        {correlation.strength > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                        <span className="font-medium">{Math.abs(correlation.strength).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">P-value</span>
                      <span className="font-medium">{correlation.p_value}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Sample Size</span>
                      <span className="font-medium">{safeNumberFormat(correlation.sample_size)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="anomalies" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {anomalies.map((anomaly) => (
              <Card key={anomaly.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span>{anomaly.entity}</span>
                    </CardTitle>
                    <Badge variant={getSeverityColor(anomaly.severity)}>{anomaly.severity}</Badge>
                  </div>
                  <CardDescription>{anomaly.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Deviation Score</span>
                      <span className="font-medium">{anomaly.deviation_score.toFixed(1)}σ</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Type</span>
                      <span className="font-medium capitalize">{anomaly.type.replace("_", " ")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
