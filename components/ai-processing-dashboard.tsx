"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Cpu,
  Activity,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Settings,
  TrendingUp,
} from "lucide-react"
import type { ProcessingJob, AIModel } from "@/lib/ai-types"

export function AIProcessingDashboard() {
  const [jobs, setJobs] = useState<ProcessingJob[]>([])
  const [models, setModels] = useState<AIModel[]>([])
  const [loading, setLoading] = useState(true)
  const [processingStats, setProcessingStats] = useState({
    totalProcessed: 0,
    processingRate: 0,
    avgProcessingTime: 0,
    successRate: 0,
  })

  useEffect(() => {
    fetchJobs()
    fetchModels()
    fetchStats()

    const interval = setInterval(() => {
      fetchJobs()
      fetchStats()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const fetchJobs = async () => {
    try {
      const mockJobs: ProcessingJob[] = [
        {
          id: "job-001",
          contentId: "content-123",
          status: "processing",
          startedAt: new Date().toISOString(),
          pipeline: [
            { name: "language_detection", status: "completed", confidence: 0.95, duration: 120 },
            { name: "translation", status: "processing", confidence: 0.87 },
            { name: "sentiment_analysis", status: "pending" },
            { name: "entity_extraction", status: "pending" },
            { name: "classification", status: "pending" },
            { name: "pattern_detection", status: "pending" },
          ],
        },
        {
          id: "job-002",
          contentId: "content-124",
          status: "completed",
          startedAt: new Date(Date.now() - 300000).toISOString(),
          pipeline: [
            { name: "language_detection", status: "completed", confidence: 0.98, duration: 95 },
            { name: "translation", status: "completed", confidence: 0.92, duration: 340 },
            { name: "sentiment_analysis", status: "completed", confidence: 0.89, duration: 180 },
            { name: "entity_extraction", status: "completed", confidence: 0.94, duration: 220 },
            { name: "classification", status: "completed", confidence: 0.91, duration: 160 },
            { name: "pattern_detection", status: "completed", confidence: 0.85, duration: 280 },
          ],
        },
      ]
      setJobs(mockJobs)
    } catch (error) {
      console.error("Failed to fetch processing jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchModels = async () => {
    try {
      const mockModels: AIModel[] = [
        {
          name: "T1D Language Detector",
          version: "2.1.0",
          type: "classification",
          status: "active",
          accuracy: 96.8,
          lastTrained: new Date(Date.now() - 86400000 * 7).toISOString(),
          trainingData: {
            samples: 125000,
            languages: ["en", "es", "fr", "de", "it", "pt", "ru", "zh", "ja", "ko"],
          },
        },
        {
          name: "Medical Entity Extractor",
          version: "1.8.3",
          type: "ner",
          status: "active",
          accuracy: 94.2,
          lastTrained: new Date(Date.now() - 86400000 * 3).toISOString(),
          trainingData: {
            samples: 89000,
            categories: ["symptoms", "devices", "medications", "treatments", "activities"],
          },
        },
      ]
      setModels(mockModels)
    } catch (error) {
      console.error("Failed to fetch AI models:", error)
    }
  }

  const fetchStats = async () => {
    // Mock processing statistics
    setProcessingStats({
      totalProcessed: 1834567,
      processingRate: 127.3,
      avgProcessingTime: 2.4,
      successRate: 94.7,
    })
  }

  const formatDate = (date: string | Date | undefined) => {
    if (!date) return "Never"
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date
      if (isNaN(dateObj.getTime())) return "Invalid date"
      return dateObj.toLocaleDateString()
    } catch (error) {
      return "Invalid date"
    }
  }

  const getTimeAgo = (startTime: string | Date | undefined) => {
    if (!startTime) return "Unknown"
    try {
      const startDate = typeof startTime === "string" ? new Date(startTime) : startTime
      if (isNaN(startDate.getTime())) return "Unknown"
      const minutes = Math.round((Date.now() - startDate.getTime()) / 60000)
      return `${minutes}min ago`
    } catch (error) {
      return "Unknown"
    }
  }

  const formatTime = (time: string | Date | undefined) => {
    if (!time) return "Unknown"
    try {
      const timeObj = typeof time === "string" ? new Date(time) : time
      if (isNaN(timeObj.getTime())) return "Unknown"
      return timeObj.toLocaleTimeString()
    } catch (error) {
      return "Unknown"
    }
  }

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case "processing":
        return <Activity className="h-4 w-4 text-blue-500 animate-pulse" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getModelStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500"
      case "training":
        return "bg-blue-500 animate-pulse"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading AI processing dashboard...</div>
  }

  return (
    <div className="space-y-6">
      {/* Processing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Processed</CardTitle>
            <Brain className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processingStats.totalProcessed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.3% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Rate</CardTitle>
            <Zap className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processingStats.processingRate}/min</div>
            <p className="text-xs text-muted-foreground">Real-time processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Processing Time</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processingStats.avgProcessingTime}s</div>
            <p className="text-xs text-muted-foreground">-0.3s from last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processingStats.successRate}%</div>
            <p className="text-xs text-muted-foreground">+1.2% from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pipeline" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pipeline">Processing Pipeline</TabsTrigger>
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="jobs">Active Jobs</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                AI Processing Pipeline
              </CardTitle>
              <CardDescription>Real-time view of content processing through AI pipeline stages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Pipeline Stages */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { name: "Language Detection", active: 23, queue: 45 },
                    { name: "Translation", active: 18, queue: 67 },
                    { name: "Sentiment Analysis", active: 31, queue: 23 },
                    { name: "Entity Extraction", active: 27, queue: 34 },
                    { name: "Classification", active: 19, queue: 56 },
                    { name: "Pattern Detection", active: 12, queue: 78 },
                  ].map((stage, index) => (
                    <Card key={stage.name} className="text-center">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">{stage.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="text-lg font-bold text-blue-600">{stage.active}</div>
                        <div className="text-xs text-muted-foreground">Active</div>
                        <div className="text-sm text-gray-600">{stage.queue} queued</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Processing Jobs */}
                <div className="space-y-3">
                  <h4 className="font-medium">Recent Processing Jobs</h4>
                  {jobs.slice(0, 5).map((job) => (
                    <Card key={job.id} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Content {job.contentId}</Badge>
                          <Badge
                            variant={
                              job.status === "completed"
                                ? "default"
                                : job.status === "processing"
                                  ? "secondary"
                                  : job.status === "failed"
                                    ? "destructive"
                                    : "outline"
                            }
                          >
                            {job.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">Started {formatTime(job.startedAt)}</div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                        {job.pipeline.map((step, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs">
                            {getStepIcon(step.status)}
                            <span className="truncate">{step.name.replace("_", " ")}</span>
                            {step.confidence && (
                              <span className="text-muted-foreground">({Math.round(step.confidence * 100)}%)</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Models Management
                  </CardTitle>
                  <CardDescription>Monitor and manage AI models powering the processing pipeline</CardDescription>
                </div>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure Models
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {models.map((model) => (
                  <Card key={model.name} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getModelStatusColor(model.status)}`} />
                        <div>
                          <h4 className="font-medium">{model.name}</h4>
                          <p className="text-sm text-muted-foreground">v{model.version}</p>
                        </div>
                        <Badge variant="outline">{model.type}</Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-emerald-600">{model.accuracy}%</div>
                          <div className="text-xs text-muted-foreground">accuracy</div>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            {model.status === "active" ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Training Samples</div>
                        <div>{model.trainingData.samples.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Last Trained</div>
                        <div>{formatDate(model.lastTrained)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Languages</div>
                        <div>{model.trainingData.languages?.length || model.trainingData.categories?.length || 0}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Status</div>
                        <Badge
                          variant={
                            model.status === "active"
                              ? "default"
                              : model.status === "training"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {model.status}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Processing Jobs</CardTitle>
              <CardDescription>Monitor individual content processing jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobs
                  .filter((job) => job.status === "processing")
                  .map((job) => (
                    <Card key={job.id} className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-blue-500 animate-pulse" />
                          <span className="font-medium">Job {job.id}</span>
                          <Badge variant="secondary">Processing</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">{getTimeAgo(job.startedAt)}</div>
                      </div>
                      <div className="space-y-3">
                        {job.pipeline.map((step, index) => (
                          <div key={index} className="flex items-center gap-3">
                            {getStepIcon(step.status)}
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{step.name.replace("_", " ")}</span>
                                {step.confidence && (
                                  <span className="text-xs text-muted-foreground">
                                    {Math.round(step.confidence * 100)}% confidence
                                  </span>
                                )}
                              </div>
                              {step.status === "processing" && (
                                <Progress value={Math.random() * 100} className="h-1 mt-1" />
                              )}
                            </div>
                            {step.duration && <span className="text-xs text-muted-foreground">{step.duration}ms</span>}
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>AI processing performance and optimization insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
                <div className="text-center space-y-2">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto" />
                  <p className="text-gray-500 font-medium">Performance Analytics</p>
                  <p className="text-sm text-gray-400">Processing speed, accuracy, and resource utilization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
