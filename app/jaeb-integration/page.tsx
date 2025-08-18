"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Database, TrendingUp, CheckCircle, ExternalLink, Activity } from "lucide-react"
import { safeNumberFormat, safeDateFormat, safeTimeFormat, safeDateOnlyFormat } from "@/lib/utils";

interface JaebIntegrationData {
  sources: any[]
  integratedFindings: any[]
  summary: any
}

export default function JaebIntegrationPage() {
  const [data, setData] = useState<JaebIntegrationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSource, setSelectedSource] = useState<string | null>(null)

  useEffect(() => {
    fetchJaebData()
  }, [])

  const fetchJaebData = async () => {
    try {
      const response = await fetch("/api/jaeb-integration")
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error("Error fetching Jaeb integration data:", error)
    } finally {
      setLoading(false)
    }
  }

  const performCrossValidation = async (query: string) => {
    try {
      const response = await fetch("/api/jaeb-integration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "cross_validate",
          sourceIds: data?.sources.map((s) => s.id) || [],
          correlationQuery: query,
        }),
      })
      const result = await response.json()
      console.log("Cross-validation results:", result)
    } catch (error) {
      console.error("Error performing cross-validation:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading Jaeb Center Integration...</p>
        </div>
      </div>
    )
  }

  if (!data) return <div>Error loading data</div>

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Jaeb Center Data Integration</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive T1D clinical datasets with cross-validation analysis
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {safeNumberFormat(data.summary.totalDataPoints)} Data Points
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Regulatory Sources</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.summary.regulatorySources}</div>
            <p className="text-xs text-muted-foreground">FDA MAUDE, EMA, MHRA</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clinical Trials</CardTitle>
            <Database className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.summary.clinicalTrials}</div>
            <p className="text-xs text-muted-foreground">Active T1D studies</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Datasets</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.summary.openDatasets}</div>
            <p className="text-xs text-muted-foreground">Public research data</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Validated Findings</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.summary.validatedFindings}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round(data.summary.avgConfidence * 100)}% avg confidence
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sources" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
          <TabsTrigger value="findings">Integrated Findings</TabsTrigger>
          <TabsTrigger value="validation">Cross-Validation</TabsTrigger>
        </TabsList>

        <TabsContent value="sources" className="space-y-4">
          <div className="grid gap-4">
            {data.sources.map((source) => (
              <Card
                key={source.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedSource(source.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{source.name}</CardTitle>
                      <CardDescription>
                        {source.subType} • {source.geolocation.country}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={source.status === "active" ? "default" : "secondary"}>{source.status}</Badge>
                      <Badge variant="outline">{source.updateCadence}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Health Score</span>
                      <span className="text-sm font-medium">{source.healthScore}%</span>
                    </div>
                    <Progress value={source.healthScore} className="h-2" />
                    <div className="flex flex-wrap gap-1 mt-2">
                      {source.dataTypes.slice(0, 3).map((type: string) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type.replace("_", " ")}
                        </Badge>
                      ))}
                      {source.dataTypes.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{source.dataTypes.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="findings" className="space-y-4">
          <div className="grid gap-4">
            {data.integratedFindings.map((finding) => (
              <Card key={finding.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{finding.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">{Math.round(finding.confidence * 100)}% confidence</Badge>
                      <Badge variant={finding.clinicalRelevance === "high" ? "destructive" : "secondary"}>
                        {finding.clinicalRelevance} relevance
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{finding.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Evidence Sources</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          FDA MAUDE Reports: <span className="font-medium">{finding.evidence.fdaMaudeReports}</span>
                        </div>
                        <div>
                          Jaeb Center Samples: <span className="font-medium">{finding.evidence.jaebCenterSamples}</span>
                        </div>
                        <div>
                          Social Media Mentions:{" "}
                          <span className="font-medium">{finding.evidence.socialMediaMentions}</span>
                        </div>
                        <div>
                          Peer-Reviewed Studies:{" "}
                          <span className="font-medium">{finding.evidence.peerReviewedStudies}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Correlation Strength: {Math.round(finding.correlationStrength * 100)}%
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="validation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cross-Validation Analysis</CardTitle>
              <CardDescription>
                Validate findings across multiple data sources using advanced correlation algorithms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={() => performCrossValidation("CGM accuracy patterns")}>
                  Validate CGM Accuracy Patterns
                </Button>
                <Button onClick={() => performCrossValidation("Insulin pump occlusions")}>
                  Validate Pump Occlusion Patterns
                </Button>
                <Button onClick={() => performCrossValidation("Exercise effects")}>
                  Validate Exercise Correlations
                </Button>
                <Button onClick={() => performCrossValidation("Environmental factors")}>
                  Validate Environmental Factors
                </Button>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Validation Methodology</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Persistent Topological Knowledge Graph analysis</li>
                  <li>• Temporal pattern mining across data sources</li>
                  <li>• Statistical significance testing (p &lt; 0.05)</li>
                  <li>• Cross-source correlation validation</li>
                  <li>• Clinical relevance scoring</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
