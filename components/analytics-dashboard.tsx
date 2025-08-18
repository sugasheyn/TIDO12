"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  TrendingUp,
  Globe,
  Activity,
  Download,
  Filter,
  Users,
  MessageSquare,
  Heart,
  AlertTriangle,
} from "lucide-react"
import type { AnalyticsMetrics } from "@/lib/analytics-types"
import { safeNumberFormat } from "@/lib/utils"
import { InteractiveCharts } from "./interactive-charts"
import { GeographicVisualization } from "./geographic-visualization"
import { RealTimeMetrics } from "./real-time-metrics"

export function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null)
  const [timeframe, setTimeframe] = useState("7d")
  const [loading, setLoading] = useState(true)

  const memoizedMetrics = useMemo(() => metrics, [metrics])

  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/analytics/metrics?timeframe=${timeframe}`)
      const data = await response.json()
      setMetrics(data)
    } catch (error) {
      console.error("Failed to fetch analytics metrics:", error)
    } finally {
      setLoading(false)
    }
  }, [timeframe])

  useEffect(() => {
    fetchMetrics()
  }, [fetchMetrics])

  if (loading || !memoizedMetrics) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-96 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Global T1D Intelligence Hub
          </h2>
          <p className="text-muted-foreground">
            Real-time insights from {safeNumberFormat(memoizedMetrics.totalSources)} sources across{" "}
            {memoizedMetrics.countriesCovered} countries
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safeNumberFormat(memoizedMetrics.totalContent)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-600">+{memoizedMetrics.dailyContent}</span> today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sources</CardTitle>
            <Activity className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safeNumberFormat(memoizedMetrics.activeSources)}</div>
            <p className="text-xs text-muted-foreground">
              of {safeNumberFormat(memoizedMetrics.totalSources)} total sources
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{memoizedMetrics.processingRate}/min</div>
            <p className="text-xs text-muted-foreground">{memoizedMetrics.successRate}% success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Global Coverage</CardTitle>
            <Globe className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{memoizedMetrics.countriesCovered}</div>
            <p className="text-xs text-muted-foreground">{memoizedMetrics.languagesCovered} languages</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content Analysis</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Top Content Categories
                </CardTitle>
                <CardDescription>Most discussed topics in T1D community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {memoizedMetrics.topCategories.map((category, index) => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{category.category}</span>
                        <Badge variant="outline">{safeNumberFormat(category.count)}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                        <Badge
                          variant={category.growth > 0 ? "default" : "secondary"}
                          className={category.growth > 0 ? "bg-emerald-100 text-emerald-700" : ""}
                        >
                          {category.growth > 0 ? "+" : ""}
                          {category.growth}%
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Top Performing Sources
                </CardTitle>
                <CardDescription>Highest volume and quality sources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {memoizedMetrics.topSources.map((source, index) => (
                  <div key={source.sourceId} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-bold text-muted-foreground">#{index + 1}</div>
                      <div>
                        <h4 className="font-medium">{source.sourceName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {safeNumberFormat(source.count)} items • {source.type.replace("_", " ")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-emerald-600">{source.healthScore}%</div>
                      <div className="text-xs text-muted-foreground">health score</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trending Topics
              </CardTitle>
              <CardDescription>Fastest growing discussion topics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {memoizedMetrics.trendingTopics.map((topic, index) => (
                  <Card key={topic.topic} className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{topic.category}</Badge>
                        <Badge variant="default" className="bg-emerald-100 text-emerald-700">
                          +{topic.growth}%
                        </Badge>
                      </div>
                      <h4 className="font-medium">{topic.topic}</h4>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{safeNumberFormat(topic.mentions)} mentions</span>
                        <span>Past {topic.timeframe}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <InteractiveCharts />
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sentiment Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Sentiment Distribution
                </CardTitle>
                <CardDescription>Overall community sentiment analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Positive</span>
                    <span className="text-sm text-emerald-600">{memoizedMetrics.sentimentDistribution.positive}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-emerald-500 h-3 rounded-full"
                      style={{ width: `${memoizedMetrics.sentimentDistribution.positive}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Neutral</span>
                    <span className="text-sm text-gray-600">{memoizedMetrics.sentimentDistribution.neutral}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gray-500 h-3 rounded-full"
                      style={{ width: `${memoizedMetrics.sentimentDistribution.neutral}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Negative</span>
                    <span className="text-sm text-red-600">{memoizedMetrics.sentimentDistribution.negative}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-red-500 h-3 rounded-full"
                      style={{ width: `${memoizedMetrics.sentimentDistribution.negative}%` }}
                    />
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {safeNumberFormat(memoizedMetrics.sentimentDistribution.totalAnalyzed)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total items analyzed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sentiment Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Trends</CardTitle>
                <CardDescription>Sentiment changes over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
                  <div className="text-center space-y-2">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto" />
                    <p className="text-gray-500 font-medium">Sentiment Timeline</p>
                    <p className="text-sm text-gray-400">Interactive sentiment analysis over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Device Mentions & Sentiment
              </CardTitle>
              <CardDescription>Analysis of T1D device discussions and feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {memoizedMetrics.deviceMentions.map((device, index) => (
                  <Card key={device.device} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-bold text-muted-foreground">#{index + 1}</div>
                        <div>
                          <h4 className="font-medium">{device.device}</h4>
                          <p className="text-sm text-muted-foreground">
                            {safeNumberFormat(device.mentions)} mentions • {device.issues} issues reported
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            device.sentiment === "positive"
                              ? "default"
                              : device.sentiment === "negative"
                                ? "destructive"
                                : "secondary"
                          }
                          className={
                            device.sentiment === "positive"
                              ? "bg-emerald-100 text-emerald-700"
                              : device.sentiment === "negative"
                                ? ""
                                : ""
                          }
                        >
                          {device.sentiment}
                        </Badge>
                        <Badge
                          variant={device.growth > 0 ? "default" : "secondary"}
                          className={device.growth > 0 ? "bg-blue-100 text-blue-700" : ""}
                        >
                          {device.growth > 0 ? "+" : ""}
                          {device.growth}%
                        </Badge>
                      </div>
                    </div>
                    {device.issues > 0 && (
                      <div className="flex items-center gap-2 text-sm text-orange-600">
                        <AlertTriangle className="h-4 w-4" />
                        <span>{device.issues} issues reported this week</span>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-6">
          <GeographicVisualization />
        </TabsContent>

        <TabsContent value="realtime" className="space-y-6">
          <RealTimeMetrics />
        </TabsContent>
      </Tabs>
    </div>
  )
}
