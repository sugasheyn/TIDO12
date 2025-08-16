"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Activity, Brain, Eye, Shield, TrendingUp } from "lucide-react"
import { dataGenerator } from "@/lib/data-generator"

interface BloodTestResult {
  id: string
  testName: string
  value: number
  unit: string
  referenceRange: string
  status: "normal" | "high" | "low" | "critical"
  trend: "improving" | "stable" | "declining"
  lastTested: Date
}

interface HealthRecommendation {
  id: string
  category: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  impact: string
  actions: string[]
}

export function PersonalizedHealth() {
  const [bloodTests, setBloodTests] = useState<BloodTestResult[]>([])
  const [recommendations, setRecommendations] = useState<HealthRecommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateData = () => {
      const testData: BloodTestResult[] = [
        {
          id: "hba1c",
          testName: "HbA1c",
          value: 7.2,
          unit: "%",
          referenceRange: "4.0-5.6",
          status: "high",
          trend: "improving",
          lastTested: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        },
        {
          id: "glucose",
          testName: "Fasting Glucose",
          value: 145,
          unit: "mg/dL",
          referenceRange: "70-100",
          status: "high",
          trend: "stable",
          lastTested: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        },
        {
          id: "cholesterol",
          testName: "Total Cholesterol",
          value: 180,
          unit: "mg/dL",
          referenceRange: "<200",
          status: "normal",
          trend: "improving",
          lastTested: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        },
        {
          id: "kidney",
          testName: "Creatinine",
          value: 0.9,
          unit: "mg/dL",
          referenceRange: "0.6-1.2",
          status: "normal",
          trend: "stable",
          lastTested: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      ]
      setBloodTests(testData)

      const recData = dataGenerator.generateAIPatterns().slice(0, 6).map((pattern, i) => ({
        id: `rec-${i}`,
        category: ["Blood Sugar", "Heart Health", "Kidney Function", "Eye Health", "Mental Health", "Exercise"][i % 6],
        title: pattern.title,
        description: pattern.description,
        priority: ["high", "medium", "low"][i % 3] as "high" | "medium" | "low",
        impact: pattern.impact,
        actions: pattern.recommendations
      }))
      setRecommendations(recData)
      setLoading(false)
    }

    generateData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "bg-green-100 text-green-800"
      case "high": return "bg-orange-100 text-orange-800"
      case "low": return "bg-blue-100 text-blue-800"
      case "critical": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving": return "↘️"
      case "declining": return "↗️"
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
        <h2 className="text-2xl font-bold text-foreground">💊 Personalized Health Optimization</h2>
        <p className="text-muted-foreground">AI-powered health insights and personalized recommendations</p>
      </div>

      <Tabs defaultValue="blood-tests" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="blood-tests">🩸 Blood Tests</TabsTrigger>
          <TabsTrigger value="recommendations">💡 Recommendations</TabsTrigger>
          <TabsTrigger value="trends">📈 Health Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="blood-tests" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bloodTests.map((test) => (
              <Card key={test.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{test.testName}</CardTitle>
                    <Badge className={getStatusColor(test.status)}>
                      {test.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-foreground">
                        {test.value} {test.unit}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {getTrendIcon(test.trend)}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Reference: {test.referenceRange}
                    </div>
                    <Progress 
                      value={
                        test.status === "normal" ? 50 :
                        test.status === "high" ? 80 :
                        test.status === "low" ? 20 : 90
                      } 
                      className="h-2" 
                    />
                    <div className="text-xs text-muted-foreground">
                      Last tested: {test.lastTested.toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <Card key={rec.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{rec.category}</Badge>
                    <Badge 
                      variant={rec.priority === "high" ? "destructive" : rec.priority === "medium" ? "default" : "secondary"}
                    >
                      {rec.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{rec.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{rec.description}</p>
                  <p className="text-sm font-medium mb-2">Impact: {rec.impact}</p>
                  <div className="space-y-1">
                    {rec.actions.slice(0, 3).map((action, i) => (
                      <div key={i} className="text-sm flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        {action}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Health Progress Overview
              </CardTitle>
              <CardDescription>Your health metrics over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">↘️</div>
                  <div className="text-lg font-semibold">HbA1c</div>
                  <div className="text-sm text-muted-foreground">Improving</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">→</div>
                  <div className="text-lg font-semibold">Glucose</div>
                  <div className="text-sm text-muted-foreground">Stable</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">↘️</div>
                  <div className="text-lg font-semibold">Cholesterol</div>
                  <div className="text-sm text-muted-foreground">Improving</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
