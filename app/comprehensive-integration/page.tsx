"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Database, GitBranch, TrendingUp, Globe, Activity, Brain, Link, Zap, Target } from "lucide-react"

interface IntegratedInsight {
  id: string
  title: string
  description: string
  confidence: number
  datasets: string[]
  correlations: {
    social: number
    clinical: number
    cgm: number
  }
  methodology: string
  evidence: {
    type: "social_post" | "clinical_study" | "cgm_data" | "github_analysis"
    source: string
    data: any
    weight: number
  }[]
  clinicalRelevance: number
  novelty: number
}

export default function ComprehensiveIntegrationPage() {
  const [insights, setInsights] = useState<IntegratedInsight[]>([])
  const [loading, setLoading] = useState(false)
  const [metrics, setMetrics] = useState<any>(null)

  useEffect(() => {
    fetchIntegratedInsights()
  }, [])

  const fetchIntegratedInsights = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/datasets/integration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          datasets: ["bg-control", "glucobench", "cgm-lstm", "marjorie", "iglu"],
          correlationMethods: ["cross-validation", "multi-modal", "temporal-alignment"],
          analysisType: "discovery",
        }),
      })
      const data = await response.json()
      setInsights(data.insights)
      setMetrics(data.metrics)
    } catch (error) {
      console.error("Failed to fetch integrated insights:", error)
    } finally {
      setLoading(false)
    }
  }

  const getEvidenceIcon = (type: string) => {
    switch (type) {
      case "github_analysis":
        return <GitBranch className="h-4 w-4" />
      case "social_post":
        return <Globe className="h-4 w-4" />
      case "clinical_study":
        return <Activity className="h-4 w-4" />
      case "cgm_data":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Database className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Comprehensive Data Integration Platform</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unified analysis of GitHub datasets, clinical studies, and social media data to discover breakthrough
            insights in Type 1 Diabetes research
          </p>
        </div>

        {/* Metrics Overview */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Database className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">{metrics.datasetsProcessed}</div>
                <div className="text-sm text-gray-600">Datasets Integrated</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Link className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{metrics.correlationsFound}</div>
                <div className="text-sm text-gray-600">Correlations Found</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Brain className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">{(metrics.confidenceAverage * 100).toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Avg Confidence</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Zap className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold">{metrics.novelInsights}</div>
                <div className="text-sm text-gray-600">Novel Insights</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-red-600" />
                <div className="text-2xl font-bold">{(metrics.processingTime / 1000).toFixed(1)}s</div>
                <div className="text-sm text-gray-600">Processing Time</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Integrated Insights */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Multi-Source Validated Insights</h2>
            <Button onClick={fetchIntegratedInsights} disabled={loading}>
              {loading ? "Processing..." : "Refresh Analysis"}
            </Button>
          </div>

          {insights.map((insight) => (
            <Card key={insight.id} className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{insight.title}</CardTitle>
                    <CardDescription className="text-base">{insight.description}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {(insight.confidence * 100).toFixed(1)}% Confidence
                    </Badge>
                    <Badge variant="outline">Novelty: {(insight.novelty * 100).toFixed(0)}%</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Correlation Scores */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Social Media</span>
                      <span className="text-sm">{(insight.correlations.social * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={insight.correlations.social * 100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Clinical Data</span>
                      <span className="text-sm">{(insight.correlations.clinical * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={insight.correlations.clinical * 100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">CGM Data</span>
                      <span className="text-sm">{(insight.correlations.cgm * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={insight.correlations.cgm * 100} className="h-2" />
                  </div>
                </div>

                {/* Methodology */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Methodology</h4>
                  <p className="text-sm text-gray-700">{insight.methodology}</p>
                </div>

                {/* Evidence Sources */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Evidence Sources</h4>
                  {insight.evidence.map((evidence, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 bg-white border rounded-lg">
                      {getEvidenceIcon(evidence.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{evidence.source}</span>
                          <Badge variant="outline" className="text-xs">
                            Weight: {(evidence.weight * 100).toFixed(0)}%
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-600 space-y-1">
                          {Object.entries(evidence.data).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span>{key.replace(/_/g, " ")}:</span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clinical Relevance */}
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Clinical Relevance Score</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={insight.clinicalRelevance * 100} className="w-24 h-2" />
                    <span className="text-sm font-medium">{(insight.clinicalRelevance * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
