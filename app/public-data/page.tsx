"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  RefreshCw, 
  Database, 
  Globe, 
  Users, 
  AlertTriangle, 
  Lightbulb, 
  Zap, 
  BarChart3, 
  LineChart, 
  PieChart,
  Settings,
  Play,
  Pause,
  Timer
} from "lucide-react"
import { usePublicData } from "@/hooks/use-public-data"
import { GlucoseDataPoint, InsulinDataPoint, DataPattern } from "@/lib/public-data-retriever"
import { formatDistanceToNow, format } from "date-fns"

export default function PublicDataPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h")
  const [selectedDataSource, setSelectedDataSource] = useState("all")
  
  const {
    glucoseData,
    insulinData,
    patterns,
    summary,
    isLoading,
    isLoadingGlucose,
    isLoadingInsulin,
    isLoadingPatterns,
    error,
    lastUpdated,
    nextUpdate,
    isAutoUpdating,
    refreshAll,
    refreshGlucose,
    refreshInsulin,
    refreshPatterns,
    toggleAutoUpdate,
    setUpdateInterval
  } = usePublicData({
    autoUpdate: true,
    updateInterval: 60 * 60 * 1000, // 1 hour
    enableGlucose: true,
    enableInsulin: true,
    enablePatterns: true,
    enableSummary: true
  })

  // Filter data based on selected time range
  const getFilteredData = (data: any[], timeRange: string) => {
    if (!data.length) return []
    
    const now = new Date()
    let cutoffTime: Date
    
    switch (timeRange) {
      case "1h":
        cutoffTime = new Date(now.getTime() - 60 * 60 * 1000)
        break
      case "6h":
        cutoffTime = new Date(now.getTime() - 6 * 60 * 60 * 1000)
        break
      case "24h":
        cutoffTime = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        break
      case "7d":
        cutoffTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      default:
        cutoffTime = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    }
    
    return data.filter(item => new Date(item.timestamp) >= cutoffTime)
  }

  // Filter data based on selected source
  const getFilteredBySource = (data: any[], source: string) => {
    if (source === "all") return data
    return data.filter(item => item.source === source)
  }

  const filteredGlucoseData = getFilteredBySource(
    getFilteredData(glucoseData, selectedTimeRange),
    selectedDataSource
  )
  
  const filteredInsulinData = getFilteredBySource(
    getFilteredData(insulinData, selectedTimeRange),
    selectedDataSource
  )

  // Calculate statistics
  const glucoseStats = {
    count: filteredGlucoseData.length,
    average: filteredGlucoseData.length > 0 
      ? Math.round(filteredGlucoseData.reduce((sum, d) => sum + d.glucose, 0) / filteredGlucoseData.length)
      : 0,
    min: filteredGlucoseData.length > 0 ? Math.min(...filteredGlucoseData.map(d => d.glucose)) : 0,
    max: filteredGlucoseData.length > 0 ? Math.max(...filteredGlucoseData.map(d => d.glucose)) : 0,
    inRange: filteredGlucoseData.filter(d => d.glucose >= 80 && d.glucose <= 180).length,
    high: filteredGlucoseData.filter(d => d.glucose > 180).length,
    low: filteredGlucoseData.filter(d => d.glucose < 80).length
  }

  const insulinStats = {
    count: filteredInsulinData.length,
    total: Math.round(filteredInsulinData.reduce((sum, d) => sum + d.insulin, 0) * 100) / 100,
    average: filteredInsulinData.length > 0 
      ? Math.round(filteredInsulinData.reduce((sum, d) => sum + d.insulin, 0) / filteredInsulinData.length * 100) / 100
      : 0,
    bolus: filteredInsulinData.filter(d => d.type === 'bolus').length,
    basal: filteredInsulinData.filter(d => d.type === 'basal').length,
    correction: filteredInsulinData.filter(d => d.type === 'correction').length
  }

  // Get unique sources
  const allSources = [...new Set([...glucoseData.map(d => d.source), ...insulinData.map(d => d.source)])]

  // Format time remaining until next update
  const getTimeUntilNextUpdate = () => {
    if (!nextUpdate) return "Unknown"
    const now = new Date()
    const diff = nextUpdate.getTime() - now.getTime()
    
    if (diff <= 0) return "Due now"
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl shadow-lg">
              <Database className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Public T1D Data Hub</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real-time blood glucose and insulin data from public sources worldwide. 
            Automatically updated every hour with AI-powered pattern analysis and discoveries.
          </p>
        </div>

        {/* Status Bar */}
        <Card className="mb-6 shadow-lg border-0">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isAutoUpdating ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className="text-sm font-medium">
                    {isAutoUpdating ? 'Auto-updating' : 'Manual mode'}
                  </span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Last update: {lastUpdated ? formatDistanceToNow(lastUpdated, { addSuffix: true }) : 'Never'}</span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Timer className="h-4 w-4" />
                  <span>Next update: {getTimeUntilNextUpdate()}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleAutoUpdate}
                  className="flex items-center gap-2"
                >
                  {isAutoUpdating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isAutoUpdating ? 'Pause' : 'Resume'}
                </Button>
                <Button
                  size="sm"
                  onClick={refreshAll}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Data Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="shadow-lg border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Data Points</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {summary ? summary.totalDataPoints.toLocaleString() : '...'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-green-600">
                    {summary ? summary.activeUsers.toLocaleString() : '...'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Data Sources</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {summary ? summary.dataSources : '...'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Data Quality</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {summary ? `${Math.round(summary.dataQuality * 100)}%` : '...'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6 shadow-lg border-0">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Time Range:</span>
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                >
                  <option value="1h">Last Hour</option>
                  <option value="6h">Last 6 Hours</option>
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Data Source:</span>
                <select
                  value={selectedDataSource}
                  onChange={(e) => setSelectedDataSource(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                >
                  <option value="all">All Sources</option>
                  {allSources.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="glucose">Glucose Data</TabsTrigger>
            <TabsTrigger value="insulin">Insulin Data</TabsTrigger>
            <TabsTrigger value="patterns">AI Patterns</TabsTrigger>
            <TabsTrigger value="sources">Data Sources</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Glucose Overview */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Glucose Overview
                  </CardTitle>
                  <CardDescription>
                    Real-time glucose data statistics and trends
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isLoadingGlucose ? (
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{glucoseStats.average}</p>
                          <p className="text-sm text-gray-600">Average (mg/dL)</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{glucoseStats.count}</p>
                          <p className="text-sm text-gray-600">Data Points</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>In Range (80-180 mg/dL)</span>
                          <span className="font-medium">{glucoseStats.inRange}</span>
                        </div>
                        <Progress value={(glucoseStats.inRange / glucoseStats.count) * 100} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span>High (&gt;180 mg/dL)</span>
                          <span className="font-medium text-red-600">{glucoseStats.high}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Low (&lt;80 mg/dL)</span>
                          <span className="font-medium text-orange-600">{glucoseStats.low}</span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Insulin Overview */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-purple-600" />
                    Insulin Overview
                  </CardTitle>
                  <CardDescription>
                    Real-time insulin administration data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isLoadingInsulin ? (
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <p className="text-2xl font-bold text-purple-600">{insulinStats.total}</p>
                          <p className="text-sm text-gray-600">Total Units</p>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{insulinStats.average}</p>
                          <p className="text-sm text-gray-600">Average Dose</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Bolus Insulin</span>
                          <span className="font-medium">{insulinStats.bolus}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Basal Insulin</span>
                          <span className="font-medium">{insulinStats.basal}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Correction</span>
                          <span className="font-medium">{insulinStats.correction}</span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent Patterns */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  Recent AI Discoveries
                </CardTitle>
                <CardDescription>
                  Latest patterns and insights discovered by AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingPatterns ? (
                  <div className="space-y-3">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                ) : patterns.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {patterns.slice(0, 6).map((pattern) => (
                      <div key={pattern.id} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {pattern.type.replace('_', ' ')}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {Math.round(pattern.confidence * 100)}%
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">{pattern.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{pattern.description}</p>
                        <div className="text-xs text-gray-500">
                          {pattern.dataPoints} data points • {formatDistanceToNow(pattern.discoveredAt, { addSuffix: true })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Lightbulb className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No patterns discovered yet</p>
                    <p className="text-sm">AI analysis will begin once sufficient data is available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Glucose Data Tab */}
          <TabsContent value="glucose" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-600" />
                      Real-Time Glucose Data
                    </CardTitle>
                    <CardDescription>
                      Live glucose readings from public CGM sources worldwide
                    </CardDescription>
                  </div>
                  <Button
                    size="sm"
                    onClick={refreshGlucose}
                    disabled={isLoadingGlucose}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className={`h-4 w-4 ${isLoadingGlucose ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingGlucose ? (
                  <div className="space-y-3">
                    {[...Array(10)].map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : filteredGlucoseData.length > 0 ? (
                  <div className="space-y-3">
                    {filteredGlucoseData.slice(0, 50).map((dataPoint, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${
                            dataPoint.glucose < 80 ? 'bg-orange-500' :
                            dataPoint.glucose > 180 ? 'bg-red-500' : 'bg-green-500'
                          }`} />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-semibold">{dataPoint.glucose}</span>
                              <span className="text-sm text-gray-500">{dataPoint.units}</span>
                              <Badge variant="outline" className="text-xs">
                                {dataPoint.trend}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-600">
                              {dataPoint.source} • {dataPoint.device}
                            </div>
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <div>{format(new Date(dataPoint.timestamp), 'HH:mm')}</div>
                          <div>{format(new Date(dataPoint.timestamp), 'MMM d')}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No glucose data available</p>
                    <p className="text-sm">Try adjusting filters or refreshing the data</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insulin Data Tab */}
          <TabsContent value="insulin" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-purple-600" />
                      Real-Time Insulin Data
                    </CardTitle>
                    <CardDescription>
                      Live insulin administration data from public sources
                    </CardDescription>
                  </div>
                  <Button
                    size="sm"
                    onClick={refreshInsulin}
                    disabled={isLoadingInsulin}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className={`h-4 w-4 ${isLoadingInsulin ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingInsulin ? (
                  <div className="space-y-3">
                    {[...Array(10)].map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : filteredInsulinData.length > 0 ? (
                  <div className="space-y-3">
                    {filteredInsulinData.slice(0, 50).map((dataPoint, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                        <div className="flex items-center gap-4">
                          <div className="w-3 h-3 rounded-full bg-purple-500" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-semibold">{dataPoint.insulin}</span>
                              <span className="text-sm text-gray-500">{dataPoint.units}</span>
                              <Badge variant="outline" className="text-xs">
                                {dataPoint.type}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-600">
                              {dataPoint.source} • {dataPoint.device}
                            </div>
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <div>{format(new Date(dataPoint.timestamp), 'HH:mm')}</div>
                          <div>{format(new Date(dataPoint.timestamp), 'MMM d')}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Zap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No insulin data available</p>
                    <p className="text-sm">Try adjusting filters or refreshing the data</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Patterns Tab */}
          <TabsContent value="patterns" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-600" />
                      AI Pattern Analysis
                    </CardTitle>
                    <CardDescription>
                      Discovered patterns, correlations, and anomalies in the data
                    </CardDescription>
                  </div>
                  <Button
                    size="sm"
                    onClick={refreshPatterns}
                    disabled={isLoadingPatterns}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className={`h-4 w-4 ${isLoadingPatterns ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingPatterns ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-32 w-full" />
                    ))}
                  </div>
                ) : patterns.length > 0 ? (
                  <div className="space-y-6">
                    {patterns.map((pattern) => (
                      <div key={pattern.id} className="border rounded-lg p-6 bg-gray-50">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-sm">
                                {pattern.type.replace('_', ' ')}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                Confidence: {Math.round(pattern.confidence * 100)}%
                              </span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{pattern.title}</h3>
                            <p className="text-gray-600 mb-4">{pattern.description}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Key Insights</h4>
                            <ul className="space-y-2">
                              {pattern.insights.map((insight, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                  {insight}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
                            <ul className="space-y-2">
                              {pattern.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Data Points: {pattern.dataPoints.toLocaleString()}</span>
                            <span>Discovered: {formatDistanceToNow(pattern.discoveredAt, { addSuffix: true })}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Lightbulb className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No patterns discovered yet</p>
                    <p className="text-sm">AI analysis will begin once sufficient data is available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Sources Tab */}
          <TabsContent value="sources" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-600" />
                  Data Sources & Coverage
                </CardTitle>
                <CardDescription>
                  Information about public data sources and geographic coverage
                </CardDescription>
              </CardHeader>
              <CardContent>
                {summary ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Globe className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <p className="text-lg font-semibold text-blue-600">{summary.coverage.geographic.length}</p>
                        <p className="text-sm text-gray-600">Countries</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Database className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <p className="text-lg font-semibold text-green-600">{summary.dataSources}</p>
                        <p className="text-sm text-gray-600">Data Sources</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <p className="text-lg font-semibold text-purple-600">{summary.activeUsers.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Active Users</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Data Quality Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Overall Data Quality</span>
                          <span className="font-medium">{Math.round(summary.dataQuality * 100)}%</span>
                        </div>
                        <Progress value={summary.dataQuality * 100} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Geographic Coverage</h4>
                      <div className="flex flex-wrap gap-2">
                        {summary.coverage.geographic.map((location, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {location}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Globe className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Loading source information...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Data is automatically retrieved from public sources every hour</p>
          <p className="mt-1">
            Sources include: Nightscout, OpenAPS, Tidepool, GitHub repositories, Kaggle datasets, PhysioNet, and UCI datasets
          </p>
        </div>
      </div>
    </div>
  )
}
