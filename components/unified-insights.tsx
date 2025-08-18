"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link, TrendingUp, Activity, Shield, Zap, Users, Globe } from "lucide-react"
import { dataGenerator } from "@/lib/data-generator"

interface UnifiedInsight {
  id: string
  type: "cross_validation" | "pattern_emergence" | "contradiction_detection" | "breakthrough_discovery"
  title: string
  description: string
  confidence: number
  impact: string
  sources: string[]
  validationStatus: "pending" | "validated" | "contradicted" | "uncertain"
  currentTrend: "emerging" | "stable" | "declining" | "controversial"
  lastUpdated: Date
}

interface ValidationResult {
  id: string
  insightId: string
  source: string
  result: "supporting" | "contradicting" | "neutral"
  confidence: number
  evidence: string
  timestamp: Date
}

export function UnifiedInsights() {
  const [insights, setInsights] = useState<UnifiedInsight[]>([])
  const [validations, setValidations] = useState<ValidationResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateData = () => {
      const insightData: UnifiedInsight[] = [
        {
          id: "insight-1",
          type: "cross_validation",
          title: "Exercise Timing and Blood Sugar Control",
          description: "Consistent evidence across multiple studies showing optimal exercise timing for T1D management",
          confidence: 92,
          impact: "High - Improves treatment outcomes",
          sources: ["T1D Exchange", "PubMed", "Clinical Trials"],
          validationStatus: "validated",
          currentTrend: "stable",
          lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        },
        {
          id: "insight-2",
          type: "pattern_emergence",
          title: "Circadian Rhythm in Insulin Sensitivity",
          description: "Newly discovered pattern of insulin sensitivity variations throughout the day",
          confidence: 78,
          impact: "Medium - Potential for timing optimization",
          sources: ["CGM Data", "Sleep Studies", "Metabolic Research"],
          validationStatus: "pending",
          currentTrend: "emerging",
          lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
        },
        {
          id: "insight-3",
          type: "contradiction_detection",
          title: "Carbohydrate Counting Methods",
          description: "Conflicting evidence on the effectiveness of different carbohydrate counting approaches",
          confidence: 65,
          impact: "Medium - Affects dietary recommendations",
          sources: ["Nutrition Studies", "Patient Surveys", "Clinical Guidelines"],
          validationStatus: "contradicted",
          currentTrend: "controversial",
          lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
        },
        {
          id: "insight-4",
          type: "breakthrough_discovery",
          title: "Microbiome and Blood Sugar Stability",
          description: "Groundbreaking connection between gut microbiome composition and glucose variability",
          confidence: 85,
          impact: "Very High - New treatment avenue",
          sources: ["Microbiome Research", "Metabolic Studies", "AI Analysis"],
          validationStatus: "pending",
          currentTrend: "emerging",
          lastUpdated: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
        }
      ]
      setInsights(insightData)

      const validationData: ValidationResult[] = insightData.flatMap((insight) =>
        insight.sources.map((source, i) => ({
          id: `val-${insight.id}-${i}`,
          insightId: insight.id,
          source,
          result: ["supporting", "contradicting", "neutral"][Math.floor(Math.random() * 3)] as "supporting" | "contradicting" | "neutral",
          confidence: Math.floor(Math.random() * 40) + 60,
          evidence: `Evidence from ${source} analysis`,
          timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
        }))
      )
      setValidations(validationData)
      setLoading(false)
    }

    generateData()
  }, [])

  const getTypeColor = (type: string) => {
    switch (type) {
      case "cross_validation": return "bg-green-100 text-green-800"
      case "pattern_emergence": return "bg-blue-100 text-blue-800"
      case "contradiction_detection": return "bg-orange-100 text-orange-800"
      case "breakthrough_discovery": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getValidationColor = (status: string) => {
    switch (status) {
      case "validated": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "contradicted": return "bg-red-100 text-red-800"
      case "uncertain": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "emerging": return "↗️"
      case "declining": return "↘️"
      case "stable": return "→"
      case "controversial": return "↔️"
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
        <h2 className="text-2xl font-bold text-foreground">🔗 Unified Insights & Cross-Validation</h2>
        <p className="text-muted-foreground">AI-powered pattern recognition across all data sources</p>
      </div>

      <Tabs defaultValue="insights" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="insights">💡 Unified Insights</TabsTrigger>
          <TabsTrigger value="validation">✅ Validation Results</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight) => (
              <Card key={insight.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className={getTypeColor(insight.type)}>
                      {insight.type.replace("_", " ").toUpperCase()}
                    </Badge>
                    <Badge className={getValidationColor(insight.validationStatus)}>
                      {insight.validationStatus.toUpperCase()}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{insight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{insight.description}</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Confidence</span>
                      <span className="text-sm font-semibold">{insight.confidence}%</span>
                    </div>
                    <Progress value={insight.confidence} className="h-2" />
                    <div>
                      <span className="text-sm font-medium">Impact: </span>
                      <span className="text-sm text-muted-foreground">{insight.impact}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Current Trend: </span>
                      <span className="text-sm text-muted-foreground">
                        {getTrendIcon(insight.currentTrend)} {insight.currentTrend}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Sources: </span>
                      <span className="text-sm text-muted-foreground">
                        {insight.sources.join(", ")}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Last Updated: </span>
                      <span className="text-sm text-muted-foreground">
                        {safeDateOnlyFormat(insight.lastUpdated)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="validation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {validations.map((validation) => (
              <Card key={validation.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={
                        validation.result === "supporting" ? "default" :
                        validation.result === "contradicting" ? "destructive" : "secondary"
                      }
                    >
                      {validation.result.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {validation.confidence}% confidence
                    </span>
                  </div>
                  <CardTitle className="text-lg">{validation.source}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-muted-foreground">{validation.evidence}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Confidence</span>
                      <span className="text-sm font-semibold">{validation.confidence}%</span>
                    </div>
                    <Progress value={validation.confidence} className="h-2" />
                    <div>
                      <span className="text-sm font-medium">Timestamp: </span>
                      <span className="text-sm text-muted-foreground">
                        {safeDateOnlyFormat(validation.timestamp)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Validation Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Cross-Validation Summary
          </CardTitle>
          <CardDescription>Overall validation status across all insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {insights.filter(i => i.validationStatus === "validated").length}
              </div>
              <div className="text-sm text-muted-foreground">Validated</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">
                {insights.filter(i => i.validationStatus === "pending").length}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600">
                {insights.filter(i => i.validationStatus === "contradicted").length}
              </div>
              <div className="text-sm text-muted-foreground">Contradicted</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-600">
                {insights.filter(i => i.validationStatus === "uncertain").length}
              </div>
              <div className="text-sm text-muted-foreground">Uncertain</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">🔍 Validate New Insights</h3>
            <p className="text-muted-foreground mb-4">
              Help validate emerging patterns and contribute to T1D research
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="default">Submit Evidence</Button>
              <Button variant="outline">Review Claims</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
