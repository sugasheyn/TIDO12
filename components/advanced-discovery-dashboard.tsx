"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Brain, 
  TrendingUp, 
  Users, 
  Globe, 
  MessageSquare, 
  Activity,
  Play,
  Pause,
  RefreshCw,
  BarChart3,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings
} from "lucide-react"

interface DiscoveryModel {
  id: string
  name: string
  description: string
  category: string
  priority: 'high' | 'medium' | 'low'
  example: string
  status?: 'active' | 'paused' | 'error'
  lastRun?: Date
  discoveryCount?: number
  confidence?: number
}

interface DiscoveryResults {
  entityCoEvolution: any[]
  interventionLags: any[]
  conceptDrifts: any[]
  emergingFeatures: any[]
  earlyWarnings: any[]
  personas: any[]
  behaviorSequences: any[]
  enviroHealthCorrelations: any[]
  policyImpacts: any[]
  claimMatches: any[]
  consensusMaps: any[]
  overallDiscoveryScore: number
  confidence: number
  processingTime: number
}

export function AdvancedDiscoveryDashboard() {
  const [models, setModels] = useState<DiscoveryModel[]>([])
  const [activeModels, setActiveModels] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<DiscoveryResults | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadModels()
  }, [])

  const loadModels = async () => {
    try {
      const response = await fetch('/api/ai/discovery')
      const data = await response.json()
      if (data.success) {
        const modelsWithStatus = data.data.models.map((model: DiscoveryModel) => ({
          ...model,
          status: 'active' as const,
          lastRun: new Date(),
          discoveryCount: Math.floor(Math.random() * 50) + 5,
          confidence: Math.random() * 0.3 + 0.7
        }))
        setModels(modelsWithStatus)
        setActiveModels(modelsWithStatus.map(m => m.id))
      }
    } catch (error) {
      console.error('Failed to load models:', error)
    }
  }

  const runDiscoveryPipeline = async () => {
    setIsLoading(true)
    setIsRunning(true)
    
    try {
      // Mock data for demonstration
      const mockInput = {
        textContent: [
          "Libre 3 sensor showing compression lows during sleep",
          "New algorithm update seems to reduce false alarms",
          "Lemon helps with low blood sugar confusion",
          "High humidity causing adhesive issues with CGM",
          "School policy change allows glucose monitoring in classrooms"
        ],
        timestamps: [
          new Date(Date.now() - 86400000),
          new Date(Date.now() - 172800000),
          new Date(Date.now() - 259200000),
          new Date(Date.now() - 345600000),
          new Date(Date.now() - 432000000)
        ],
        sources: ["reddit", "twitter", "community_forum"],
        userInteractions: [],
        environmentalData: [
          { temperature: 85, humidity: 70, timestamp: new Date() },
          { temperature: 90, humidity: 75, timestamp: new Date() }
        ],
        policyData: [
          { name: "School glucose monitoring policy", date: new Date() }
        ]
      }

      const response = await fetch('/api/ai/discovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockInput)
      })

      const data = await response.json()
      if (data.success) {
        setResults(data.results)
      }
    } catch (error) {
      console.error('Discovery pipeline failed:', error)
    } finally {
      setIsLoading(false)
      setIsRunning(false)
    }
  }

  const toggleModel = (modelId: string) => {
    setActiveModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Discovery & Relationship': return <Target className="h-4 w-4" />
      case 'Predictive & Forecasting': return <TrendingUp className="h-4 w-4" />
      case 'Behaviour & Culture': return <Users className="h-4 w-4" />
      case 'External Signal Fusion': return <Globe className="h-4 w-4" />
      case 'Discourse & Misinformation': return <MessageSquare className="h-4 w-4" />
      default: return <Brain className="h-4 w-4" />
    }
  }

  const filteredModels = selectedCategory === "all" 
    ? models 
    : models.filter(model => model.category === selectedCategory)

  const categories = ["all", ...Array.from(new Set(models.map(m => m.category)))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Advanced Discovery AI Dashboard</h1>
          <p className="text-gray-600 mt-2">
            11 AI models working together to discover new correlations and insights in T1D data
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={runDiscoveryPipeline}
            disabled={isLoading || isRunning}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : isRunning ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {isLoading ? 'Running...' : isRunning ? 'Pause' : 'Run Discovery Pipeline'}
          </Button>
          <Button variant="outline" onClick={loadModels}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Active Models</p>
                <p className="text-2xl font-bold">{activeModels.length}/11</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Discovery Score</p>
                <p className="text-2xl font-bold">
                  {results ? Math.round(results.overallDiscoveryScore * 100) : 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Confidence</p>
                <p className="text-2xl font-bold">
                  {results ? Math.round(results.confidence * 100) : 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Processing Time</p>
                <p className="text-2xl font-bold">
                  {results ? results.processingTime : 0}ms
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="models" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="results">Discovery Results</TabsTrigger>
          <TabsTrigger value="insights">Live Insights</TabsTrigger>
        </TabsList>

        {/* AI Models Tab */}
        <TabsContent value="models" className="space-y-6">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Filter by category:</span>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All Categories" : category}
              </Button>
            ))}
          </div>

          {/* Models Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModels.map((model) => (
              <Card 
                key={model.id} 
                className={`hover:shadow-lg transition-all ${
                  activeModels.includes(model.id) ? 'ring-2 ring-blue-200' : ''
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(model.category)}
                      <Badge variant="secondary" className={getPriorityColor(model.priority)}>
                        {model.priority}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleModel(model.id)}
                      className="h-8 w-8 p-0"
                    >
                      {activeModels.includes(model.id) ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Settings className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  <CardTitle className="text-lg">{model.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {model.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="font-medium">Example:</span>
                      <p className="text-gray-600 mt-1">{model.example}</p>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Discoveries:</span>
                      <span className="font-medium">{model.discoveryCount}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Confidence:</span>
                        <span className="font-medium">
                          {Math.round((model.confidence || 0) * 100)}%
                        </span>
                      </div>
                      <Progress value={(model.confidence || 0) * 100} className="h-2" />
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Last run: {model.lastRun?.toLocaleDateString() || 'Never'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Discovery Results Tab */}
        <TabsContent value="results" className="space-y-6">
          {!results ? (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                No discovery results yet. Run the discovery pipeline to see results from all 11 AI models.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-6">
              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Discovery Pipeline Summary</CardTitle>
                  <CardDescription>
                    Results from running all 11 AI discovery models
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {results.overallDiscoveryScore.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">Discovery Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {Math.round(results.confidence * 100)}%
                      </div>
                      <div className="text-sm text-gray-600">Confidence</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {results.processingTime}ms
                      </div>
                      <div className="text-sm text-gray-600">Processing Time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Model Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Entity Co-evolution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{results.entityCoEvolution.length}</div>
                    <div className="text-sm text-gray-600">Relationships tracked</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Emerging Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{results.emergingFeatures.length}</div>
                    <div className="text-sm text-gray-600">Features forecasted</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Early Warnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{results.earlyWarnings.length}</div>
                    <div className="text-sm text-gray-600">Risk alerts</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Personas Identified
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{results.personas.length}</div>
                    <div className="text-sm text-gray-600">Community archetypes</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Live Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Real-time Discovery Insights
              </CardTitle>
              <CardDescription>
                Live monitoring of AI model discoveries and correlations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Entity Co-evolution Detected</p>
                      <p className="text-xs text-gray-600">Libre 3 + compression lows relationship strengthening</p>
                    </div>
                  </div>
                  <Badge variant="secondary">High Confidence</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Early Warning Signal</p>
                      <p className="text-xs text-gray-600">Adhesive detachment reports increasing in humid regions</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Medium Risk</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Concept Drift Alert</p>
                      <p className="text-xs text-gray-600">"Loop" discussion shifting from DIY to commercial</p>
                    </div>
                  </div>
                  <Badge variant="secondary">New Pattern</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Policy Impact Detected</p>
                      <p className="text-xs text-gray-600">School glucose monitoring policy affecting caregiver discussions</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Policy Change</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
