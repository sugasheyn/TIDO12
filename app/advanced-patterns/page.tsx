"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Brain, Network, Zap, AlertTriangle, CheckCircle, Clock, Target, Layers, GitBranch, Cpu } from "lucide-react"
import type { CrossDatasetPattern, MultiModalAnalysis } from "@/lib/advanced-pattern-types"
import { safeNumberFormat, safeDateFormat, safeTimeFormat, safeDateOnlyFormat } from "@/lib/utils";

export default function AdvancedPatternsPage() {
  const [patterns, setPatterns] = useState<CrossDatasetPattern[]>([])
  const [analyses, setAnalyses] = useState<MultiModalAnalysis[]>([])
  const [loading, setLoading] = useState(true)
  const [activeAnalysis, setActiveAnalysis] = useState<string | null>(null)

  useEffect(() => {
    fetchAdvancedPatterns()
  }, [])

  const fetchAdvancedPatterns = async () => {
    try {
      const response = await fetch("/api/advanced-patterns")
      const data = await response.json()

      if (data.success) {
        setPatterns(data.patterns)
        setAnalyses(data.multiModalAnalyses)
      }
    } catch (error) {
      console.error("Failed to fetch advanced patterns:", error)
    } finally {
      setLoading(false)
    }
  }

  const initiateNewAnalysis = async () => {
    try {
      const response = await fetch("/api/advanced-patterns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dataSources: ["social_media", "clinical_trials", "device_data", "research_papers"],
          algorithms: [
            "Persistent Topological Knowledge Graph",
            "Quantum-Inspired Clustering",
            "Hypergraph Neural Network",
            "Causal Discovery with Invariant Prediction",
          ],
        }),
      })

      const data = await response.json()
      if (data.success) {
        setActiveAnalysis(data.analysis.id)
      }
    } catch (error) {
      console.error("Failed to initiate analysis:", error)
    }
  }

  const getAlgorithmIcon = (algorithm: string) => {
    if (algorithm.includes("Topological")) return <Network className="h-4 w-4" />
    if (algorithm.includes("Quantum")) return <Zap className="h-4 w-4" />
    if (algorithm.includes("Neural")) return <Brain className="h-4 w-4" />
    if (algorithm.includes("Causal")) return <GitBranch className="h-4 w-4" />
    return <Cpu className="h-4 w-4" />
  }

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Analyzing cross-dataset patterns...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advanced Pattern Recognition</h1>
          <p className="text-gray-600 mt-2">AI-driven insights across all data sources and modalities</p>
        </div>
        <Button onClick={initiateNewAnalysis} className="bg-blue-600 hover:bg-blue-700">
          <Brain className="h-4 w-4 mr-2" />
          Run New Analysis
        </Button>
      </div>

      {/* Analysis Status */}
      {activeAnalysis && (
        <Alert className="border-blue-200 bg-blue-50">
          <Clock className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Analysis in Progress</AlertTitle>
          <AlertDescription className="text-blue-700">
            Advanced pattern recognition is running across all data sources. Estimated completion: 5 minutes.
            <Progress value={Math.random() * 100} className="mt-2" />
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cross-Dataset Patterns</p>
                <p className="text-2xl font-bold text-blue-600">{patterns.length}</p>
              </div>
              <Network className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Validated Patterns</p>
                <p className="text-2xl font-bold text-green-600">
                  {patterns.filter((p) => p.validationStatus === "validated").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Findings</p>
                <p className="text-2xl font-bold text-red-600">
                  {patterns.filter((p) => p.clinicalRelevance === "critical").length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round((patterns.reduce((acc, p) => acc + p.confidence, 0) / patterns.length) * 100)}%
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="patterns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="patterns">Cross-Dataset Patterns</TabsTrigger>
          <TabsTrigger value="multimodal">Multi-Modal Analysis</TabsTrigger>
          <TabsTrigger value="algorithms">Algorithm Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="patterns" className="space-y-6">
          <div className="space-y-6">
            {patterns.map((pattern) => (
              <Card key={pattern.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getAlgorithmIcon(pattern.algorithm)}
                        <Badge className={getRelevanceColor(pattern.clinicalRelevance)}>
                          {pattern.clinicalRelevance.toUpperCase()} RELEVANCE
                        </Badge>
                        <Badge variant={pattern.validationStatus === "validated" ? "default" : "secondary"}>
                          {pattern.validationStatus.toUpperCase()}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{pattern.name}</CardTitle>
                      <CardDescription className="mt-2 text-base">{pattern.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">Confidence</div>
                      <div className="text-2xl font-bold text-green-600">{Math.round(pattern.confidence * 100)}%</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Algorithm Used */}
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Algorithm:</h4>
                      <Badge variant="outline" className="text-sm">
                        {pattern.algorithm}
                      </Badge>
                    </div>

                    {/* Data Types */}
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Data Sources:</h4>
                      <div className="flex flex-wrap gap-2">
                        {pattern.dataTypes.map((type, idx) => (
                          <Badge key={idx} variant="outline">
                            {type.replace("_", " ").toUpperCase()}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Key Insights */}
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Generated Insights:</h4>
                      <div className="space-y-3">
                        {pattern.insights.map((insight, idx) => (
                          <Card key={idx} className="p-3 bg-gray-50">
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="font-medium">{insight.title}</h5>
                              <Badge
                                className={
                                  insight.urgency === "critical"
                                    ? "bg-red-100 text-red-800"
                                    : insight.urgency === "high"
                                      ? "bg-orange-100 text-orange-800"
                                      : insight.urgency === "medium"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-gray-100 text-gray-800"
                                }
                              >
                                {insight.urgency.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                            <div className="text-xs text-gray-500">
                              <strong>Potential Impact:</strong> {insight.potentialImpact}
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Relationships */}
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Data Relationships:</h4>
                      <div className="space-y-2">
                        {pattern.relationships.map((rel, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {rel.sourceType.replace("_", " ")}
                              </Badge>
                              <span className="text-sm">↔</span>
                              <Badge variant="outline" className="text-xs">
                                {rel.targetType.replace("_", " ")}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                className={
                                  rel.relationshipType === "causal"
                                    ? "bg-red-100 text-red-800"
                                    : rel.relationshipType === "correlational"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-800"
                                }
                              >
                                {rel.relationshipType}
                              </Badge>
                              <span className="text-sm font-medium">{Math.round(rel.strength * 100)}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="multimodal" className="space-y-6">
          <div className="space-y-6">
            {analyses.map((analysis) => (
              <Card key={analysis.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5" />
                    Multi-Modal Analysis {analysis.id}
                  </CardTitle>
                  <CardDescription>
                    Cross-validation confidence: {Math.round(analysis.crossValidation.overallConfidence * 100)}%
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="sources" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="sources">Data Sources</TabsTrigger>
                      <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
                      <TabsTrigger value="emergent">Emergent Patterns</TabsTrigger>
                      <TabsTrigger value="validation">Cross-Validation</TabsTrigger>
                    </TabsList>

                    <TabsContent value="sources" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {analysis.inputSources.map((source, idx) => (
                          <Card key={idx} className="p-4">
                            <div className="space-y-2">
                              <h4 className="font-medium">{source.type.replace("_", " ").toUpperCase()}</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span>Quality:</span>
                                  <span>{Math.round(source.quality * 100)}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Volume:</span>
                                  <span>{safeNumberFormat(source.volume)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Velocity:</span>
                                  <span>{source.velocity}/min</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Variety:</span>
                                  <span>{Math.round(source.variety * 100)}%</span>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="algorithms" className="space-y-4">
                      <div className="space-y-4">
                        {analysis.algorithms.map((algorithm, idx) => (
                          <Card key={idx} className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                {getAlgorithmIcon(algorithm.name)}
                                <h4 className="font-medium">{algorithm.name}</h4>
                                <Badge variant="outline">{algorithm.type.replace("_", " ")}</Badge>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-green-600">
                                  {Math.round(algorithm.performance.accuracy * 100)}%
                                </div>
                                <div className="text-xs text-gray-600">accuracy</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <div className="text-gray-600">Precision</div>
                                <div className="font-medium">{Math.round(algorithm.performance.precision * 100)}%</div>
                              </div>
                              <div>
                                <div className="text-gray-600">Recall</div>
                                <div className="font-medium">{Math.round(algorithm.performance.recall * 100)}%</div>
                              </div>
                              <div>
                                <div className="text-gray-600">F1 Score</div>
                                <div className="font-medium">{algorithm.performance.f1Score.toFixed(2)}</div>
                              </div>
                              <div>
                                <div className="text-gray-600">Processing Time</div>
                                <div className="font-medium">{algorithm.performance.processingTime}s</div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="emergent" className="space-y-4">
                      <div className="space-y-4">
                        {analysis.emergentPatterns.map((pattern, idx) => (
                          <Card key={idx} className="p-4">
                            <h4 className="font-medium mb-3">{pattern.description}</h4>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                              <div className="text-center">
                                <div className="text-lg font-bold text-blue-600">
                                  {Math.round(pattern.emergenceLevel * 100)}%
                                </div>
                                <div className="text-xs text-gray-600">Emergence</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-purple-600">
                                  {Math.round(pattern.complexity * 100)}%
                                </div>
                                <div className="text-xs text-gray-600">Complexity</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-green-600">
                                  {Math.round(pattern.novelty * 100)}%
                                </div>
                                <div className="text-xs text-gray-600">Novelty</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-orange-600">
                                  {Math.round(pattern.stability * 100)}%
                                </div>
                                <div className="text-xs text-gray-600">Stability</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-red-600">
                                  {Math.round(pattern.predictability * 100)}%
                                </div>
                                <div className="text-xs text-gray-600">Predictability</div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="validation" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-4">
                          <h4 className="font-medium mb-3">Consensus Findings</h4>
                          <div className="space-y-3">
                            {analysis.crossValidation.consensusFindings.map((finding, idx) => (
                              <div key={idx} className="p-3 bg-green-50 rounded-lg">
                                <div className="font-medium text-green-800">{finding.finding}</div>
                                <div className="text-sm text-green-600 mt-1">
                                  Confidence: {Math.round(finding.confidence * 100)}% | Significance:{" "}
                                  {Math.round(finding.significance * 100)}%
                                </div>
                                <div className="text-xs text-green-600 mt-1">
                                  Supported by: {finding.supportingAlgorithms.join(", ")}
                                </div>
                              </div>
                            ))}
                          </div>
                        </Card>

                        <Card className="p-4">
                          <h4 className="font-medium mb-3">Conflicting Results</h4>
                          <div className="space-y-3">
                            {analysis.crossValidation.conflictingResults.map((conflict, idx) => (
                              <div key={idx} className="p-3 bg-yellow-50 rounded-lg">
                                <div className="font-medium text-yellow-800">{conflict.description}</div>
                                <div className="text-sm text-yellow-600 mt-1">Type: {conflict.conflictType}</div>
                                <div className="text-xs text-yellow-600 mt-1">
                                  Resolution: {conflict.resolutionStrategy}
                                </div>
                              </div>
                            ))}
                          </div>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="algorithms" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Persistent Topological Knowledge Graph", accuracy: 0.94, speed: 2.1, scalability: 0.89 },
              { name: "Quantum-Inspired Clustering", accuracy: 0.91, speed: 1.8, scalability: 0.92 },
              { name: "Hypergraph Neural Network", accuracy: 0.89, speed: 3.2, scalability: 0.76 },
              { name: "Causal Discovery with Invariant Prediction", accuracy: 0.86, speed: 1.5, scalability: 0.94 },
              { name: "Multi-Scale Temporal Pattern Mining", accuracy: 0.88, speed: 2.7, scalability: 0.81 },
              { name: "Physics-Informed Neural Networks", accuracy: 0.92, speed: 2.9, scalability: 0.78 },
            ].map((algorithm, idx) => (
              <Card key={idx} className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  {getAlgorithmIcon(algorithm.name)}
                  <h4 className="font-medium text-sm">{algorithm.name}</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Accuracy</span>
                      <span>{Math.round(algorithm.accuracy * 100)}%</span>
                    </div>
                    <Progress value={algorithm.accuracy * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Speed</span>
                      <span>{algorithm.speed}s</span>
                    </div>
                    <Progress value={(5 - algorithm.speed) * 20} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Scalability</span>
                      <span>{Math.round(algorithm.scalability * 100)}%</span>
                    </div>
                    <Progress value={algorithm.scalability * 100} className="h-2" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
