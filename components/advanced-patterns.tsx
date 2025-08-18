"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Zap, TrendingUp, Activity, Shield, Users, Globe } from "lucide-react"
import { dataGenerator } from "@/lib/data-generator"

interface AIPattern {
  id: string
  name: string
  description: string
  type: "temporal" | "spatial" | "correlational" | "causal" | "anomaly" | "trend"
  confidence: number
  complexity: "low" | "medium" | "high"
  impact: string
  applications: string[]
  lastDetected: Date
  frequency: number
}

interface PatternAnalysis {
  id: string
  patternId: string
  analysisType: string
  result: string
  confidence: number
  timestamp: Date
  analyst: string
}

export function AdvancedPatterns() {
  const [patterns, setPatterns] = useState<AIPattern[]>([])
  const [analyses, setAnalyses] = useState<PatternAnalysis[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateData = () => {
      const patternData: AIPattern[] = [
        {
          id: "pattern-1",
          name: "Circadian Insulin Sensitivity",
          description: "Daily variation in insulin effectiveness following 24-hour cycles",
          type: "temporal",
          confidence: 94,
          complexity: "high",
          impact: "High - Optimizes insulin timing",
          applications: ["Insulin scheduling", "Meal timing", "Exercise planning"],
          lastDetected: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          frequency: 0.87
        },
        {
          id: "pattern-2",
          name: "Geographic Blood Sugar Variation",
          description: "Regional differences in glucose control patterns",
          type: "spatial",
          confidence: 78,
          complexity: "medium",
          impact: "Medium - Regional treatment optimization",
          applications: ["Regional guidelines", "Climate adaptation", "Cultural factors"],
          lastDetected: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          frequency: 0.65
        },
        {
          id: "pattern-3",
          name: "Stress-Glucose Correlation",
          description: "Strong correlation between stress levels and glucose variability",
          type: "correlational",
          confidence: 89,
          complexity: "medium",
          impact: "High - Stress management integration",
          applications: ["Stress monitoring", "Intervention timing", "Mental health support"],
          lastDetected: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          frequency: 0.92
        },
        {
          id: "pattern-4",
          name: "Exercise-Induced Hypoglycemia",
          description: "Predictable blood sugar drops following specific exercise patterns",
          type: "causal",
          confidence: 91,
          complexity: "low",
          impact: "High - Exercise safety",
          applications: ["Exercise protocols", "Safety guidelines", "Prevention strategies"],
          lastDetected: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          frequency: 0.88
        },
        {
          id: "pattern-5",
          name: "Unexpected Glucose Spikes",
          description: "Anomalous glucose increases without clear triggers",
          type: "anomaly",
          confidence: 67,
          complexity: "high",
          impact: "Medium - Early warning system",
          applications: ["Alert systems", "Investigation protocols", "Prevention"],
          lastDetected: new Date(Date.now() - 12 * 60 * 60 * 1000),
          frequency: 0.23
        },
        {
          id: "pattern-6",
          name: "Long-term HbA1c Trends",
          description: "Gradual improvement in long-term glucose control",
          type: "trend",
          confidence: 82,
          complexity: "medium",
          impact: "Medium - Progress tracking",
          applications: ["Treatment evaluation", "Goal setting", "Motivation"],
          lastDetected: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          frequency: 0.76
        }
      ]
      setPatterns(patternData)

      const analysisData: PatternAnalysis[] = patternData.flatMap((pattern) => [
        {
          id: `analysis-${pattern.id}-1`,
          patternId: pattern.id,
          analysisType: "Statistical Validation",
          result: "Pattern confirmed with 95% confidence interval",
          confidence: Math.floor(Math.random() * 20) + 80,
          timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
          analyst: "AI Pattern Engine v2.1"
        },
        {
          id: `analysis-${pattern.id}-2`,
          patternId: pattern.id,
          analysisType: "Clinical Relevance",
          result: "High clinical significance for T1D management",
          confidence: Math.floor(Math.random() * 20) + 75,
          timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
          analyst: "Clinical Validation AI"
        }
      ])
      setAnalyses(analysisData)
      setLoading(false)
    }

    generateData()
  }, [])

  const getTypeColor = (type: string) => {
    switch (type) {
      case "temporal": return "bg-blue-100 text-blue-800"
      case "spatial": return "bg-green-100 text-green-800"
      case "correlational": return "bg-purple-100 text-purple-800"
      case "causal": return "bg-orange-100 text-orange-800"
      case "anomaly": return "bg-red-100 text-red-800"
      case "trend": return "bg-indigo-100 text-indigo-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "low": return "bg-green-100 text-green-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "high": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
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
        <h2 className="text-2xl font-bold text-foreground">🤖 AI Pattern Detection</h2>
        <p className="text-muted-foreground">Advanced machine learning algorithms uncovering hidden T1D patterns</p>
      </div>

      <Tabs defaultValue="patterns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="patterns">🔍 Detected Patterns</TabsTrigger>
          <TabsTrigger value="analysis">📊 Pattern Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="patterns" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patterns.map((pattern) => (
              <Card key={pattern.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className={getTypeColor(pattern.type)}>
                      {pattern.type.toUpperCase()}
                    </Badge>
                    <Badge className={getComplexityColor(pattern.complexity)}>
                      {pattern.complexity.toUpperCase()}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{pattern.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{pattern.description}</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Confidence</span>
                      <span className="text-sm font-semibold">{pattern.confidence}%</span>
                    </div>
                    <Progress value={pattern.confidence} className="h-2" />
                    <div>
                      <span className="text-sm font-medium">Impact: </span>
                      <span className="text-sm text-muted-foreground">{pattern.impact}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Frequency: </span>
                      <span className="text-sm text-muted-foreground">
                        {(pattern.frequency * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Applications: </span>
                      <div className="mt-1 space-y-1">
                        {pattern.applications.slice(0, 2).map((app, i) => (
                          <div key={i} className="text-sm flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            {app}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Last Detected: </span>
                      <span className="text-sm text-muted-foreground">
                        {safeDateOnlyFormat(pattern.lastDetected)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analyses.map((analysis) => (
              <Card key={analysis.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{analysis.analysisType}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {analysis.confidence}% confidence
                    </span>
                  </div>
                  <CardTitle className="text-lg">Pattern Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-muted-foreground">{analysis.result}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Confidence</span>
                      <span className="text-sm font-semibold">{analysis.confidence}%</span>
                    </div>
                    <Progress value={analysis.confidence} className="h-2" />
                    <div>
                      <span className="text-sm font-medium">Analyst: </span>
                      <span className="text-sm text-muted-foreground">{analysis.analyst}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Timestamp: </span>
                      <span className="text-sm text-muted-foreground">
                        {safeDateOnlyFormat(analysis.timestamp)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Pattern Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Pattern Detection Statistics
          </CardTitle>
          <CardDescription>Overview of AI pattern recognition performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {patterns.length}
              </div>
              <div className="text-sm text-muted-foreground">Active Patterns</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(patterns.reduce((sum, p) => sum + p.confidence, 0) / patterns.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Confidence</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {patterns.filter(p => p.complexity === "high").length}
              </div>
              <div className="text-sm text-muted-foreground">Complex Patterns</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {analyses.length}
              </div>
              <div className="text-sm text-muted-foreground">Analyses Run</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">🧠 Explore Pattern Insights</h3>
            <p className="text-muted-foreground mb-4">
              Dive deeper into AI-detected patterns and their clinical implications
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="default">View Detailed Analysis</Button>
              <Button variant="outline">Export Patterns</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
