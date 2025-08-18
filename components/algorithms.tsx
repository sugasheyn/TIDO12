"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Brain, TrendingUp, Activity, Shield, Users, Globe } from "lucide-react"
import { dataGenerator } from "@/lib/data-generator"
import { safeNumberFormat, safeDateFormat, safeTimeFormat, safeDateOnlyFormat } from "@/lib/utils";

interface Algorithm {
  id: string
  name: string
  description: string
  type: "machine_learning" | "statistical" | "pattern_recognition" | "optimization" | "classification" | "regression"
  status: "active" | "training" | "evaluating" | "deployed"
  accuracy: number
  performance: number
  lastUpdated: Date
  version: string
  applications: string[]
}

interface AlgorithmMetric {
  id: string
  name: string
  value: number
  unit: string
  target: number
  trend: "improving" | "stable" | "declining"
  lastUpdated: Date
}

export function Algorithms() {
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([])
  const [metrics, setMetrics] = useState<AlgorithmMetric[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateData = () => {
      const algorithmData: Algorithm[] = [
        {
          id: "algo-1",
          name: "Glucose Pattern Recognition v2.1",
          description: "Advanced neural network for identifying complex glucose patterns and trends",
          type: "pattern_recognition",
          status: "deployed",
          accuracy: 94.2,
          performance: 98.5,
          lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          version: "2.1.0",
          applications: ["CGM Analysis", "Trend Prediction", "Anomaly Detection"]
        },
        {
          id: "algo-2",
          name: "Insulin Dosing Optimization",
          description: "Machine learning algorithm for personalized insulin dose recommendations",
          type: "optimization",
          status: "active",
          accuracy: 91.8,
          performance: 95.2,
          lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          version: "1.8.3",
          applications: ["Dose Calculation", "Timing Optimization", "Safety Validation"]
        },
        {
          id: "algo-3",
          name: "Risk Factor Analysis",
          description: "Statistical model for identifying T1D complications risk factors",
          type: "statistical",
          status: "deployed",
          accuracy: 89.5,
          performance: 92.1,
          lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          version: "3.2.1",
          applications: ["Risk Assessment", "Prevention Planning", "Early Warning"]
        },
        {
          id: "algo-4",
          name: "Exercise Impact Predictor",
          description: "ML model predicting blood sugar response to different exercise types",
          type: "regression",
          status: "training",
          accuracy: 87.3,
          performance: 90.8,
          lastUpdated: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
          version: "1.5.0",
          applications: ["Exercise Planning", "Safety Monitoring", "Performance Tracking"]
        },
        {
          id: "algo-5",
          name: "Diet Response Classifier",
          description: "Classification algorithm for predicting glycemic response to foods",
          type: "classification",
          status: "evaluating",
          accuracy: 85.9,
          performance: 88.7,
          lastUpdated: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
          version: "2.0.0",
          applications: ["Meal Planning", "Carb Counting", "Nutrition Guidance"]
        },
        {
          id: "algo-6",
          name: "Multi-Source Data Fusion",
          description: "Advanced algorithm for combining data from multiple sources",
          type: "machine_learning",
          status: "deployed",
          accuracy: 92.7,
          performance: 96.3,
          lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          version: "2.3.1",
          applications: ["Data Integration", "Quality Assessment", "Cross-Validation"]
        }
      ]
      setAlgorithms(algorithmData)

      const metricData: AlgorithmMetric[] = [
        {
          id: "metric-1",
          name: "Active Algorithms",
          value: 6,
          unit: "algorithms",
          target: 8,
          trend: "improving",
          lastUpdated: new Date()
        },
        {
          id: "metric-2",
          name: "Average Accuracy",
          value: 90,
          unit: "%",
          target: 92,
          trend: "improving",
          lastUpdated: new Date()
        },
        {
          id: "metric-3",
          name: "System Performance",
          value: 94,
          unit: "%",
          target: 95,
          trend: "stable",
          lastUpdated: new Date()
        },
        {
          id: "metric-4",
          name: "Training Success Rate",
          value: 87,
          unit: "%",
          target: 90,
          trend: "improving",
          lastUpdated: new Date()
        },
        {
          id: "metric-5",
          name: "Deployment Success",
          value: 95,
          unit: "%",
          target: 95,
          trend: "stable",
          lastUpdated: new Date()
        },
        {
          id: "metric-6",
          name: "Model Updates",
          value: 12,
          unit: "updates/month",
          target: 15,
          trend: "improving",
          lastUpdated: new Date()
        }
      ]
      setMetrics(metricData)
      setLoading(false)
    }

    generateData()
  }, [])

  const getTypeColor = (type: string) => {
    switch (type) {
      case "machine_learning": return "bg-blue-100 text-blue-800"
      case "statistical": return "bg-purple-100 text-purple-800"
      case "pattern_recognition": return "bg-green-100 text-green-800"
      case "optimization": return "bg-orange-100 text-orange-800"
      case "classification": return "bg-pink-100 text-pink-800"
      case "regression": return "bg-indigo-100 text-indigo-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "deployed": return "bg-green-100 text-green-800"
      case "active": return "bg-blue-100 text-blue-800"
      case "training": return "bg-yellow-100 text-yellow-800"
      case "evaluating": return "bg-purple-100 text-purple-800"
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
        <h2 className="text-2xl font-bold text-foreground">⚡ AI Algorithms & Methods</h2>
        <p className="text-muted-foreground">Advanced machine learning and statistical algorithms powering T1D insights</p>
      </div>

      <Tabs defaultValue="algorithms" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="algorithms">🤖 Algorithms</TabsTrigger>
          <TabsTrigger value="metrics">📊 Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="algorithms" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {algorithms.map((algorithm) => (
              <Card key={algorithm.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className={getTypeColor(algorithm.type)}>
                      {algorithm.type.replace("_", " ").toUpperCase()}
                    </Badge>
                    <Badge className={getStatusColor(algorithm.status)}>
                      {algorithm.status.toUpperCase()}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{algorithm.name}</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    Version {algorithm.version}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{algorithm.description}</p>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium">Accuracy</span>
                        <div className="text-lg font-semibold">{algorithm.accuracy}%</div>
                        <Progress value={algorithm.accuracy} className="h-2 mt-1" />
                      </div>
                      <div>
                        <span className="text-sm font-medium">Performance</span>
                        <div className="text-lg font-semibold">{algorithm.performance}%</div>
                        <Progress value={algorithm.performance} className="h-2 mt-1" />
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Applications: </span>
                      <div className="mt-1 space-y-1">
                        {algorithm.applications.map((app, i) => (
                          <div key={i} className="text-sm flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            {app}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Last Updated: </span>
                      <span className="text-sm text-muted-foreground">
                        {safeDateOnlyFormat(algorithm.lastUpdated)}
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
                        {safeNumberFormat(metric.value)}
                      </span>
                      <span className="text-lg text-muted-foreground">{metric.unit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {getTrendIcon(metric.trend)} Target: {safeNumberFormat(metric.target)}
                      </span>
                    </div>
                    <Progress 
                      value={Math.min((metric.value / metric.target) * 100, 100)} 
                      className="h-2" 
                    />
                    <div className="text-xs text-muted-foreground">
                      Updated: {safeTimeFormat(metric.lastUpdated)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Algorithm Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Algorithm Performance Overview
          </CardTitle>
          <CardDescription>Real-time performance metrics and system health</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">System Health</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Active Models</span>
                  <span className="font-semibold">{algorithms.filter(a => a.status === "deployed" || a.status === "active").length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Training Models</span>
                  <span className="font-semibold">{algorithms.filter(a => a.status === "training").length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Evaluation Models</span>
                  <span className="font-semibold">{algorithms.filter(a => a.status === "evaluating").length}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Performance Metrics</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Avg Accuracy</span>
                  <span className="font-semibold">
                    {Math.round(algorithms.reduce((sum, a) => sum + a.accuracy, 0) / algorithms.length)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Performance</span>
                  <span className="font-semibold">
                    {Math.round(algorithms.reduce((sum, a) => sum + a.performance, 0) / algorithms.length)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total Updates</span>
                  <span className="font-semibold">
                    {algorithms.reduce((sum, a) => sum + parseInt(a.version.split('.')[0]), 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">🧠 Explore Algorithm Details</h3>
            <p className="text-muted-foreground mb-4">
              Dive deeper into algorithm performance and contribute to model improvement
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="default">View Details</Button>
              <Button variant="outline">Contribute Data</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
