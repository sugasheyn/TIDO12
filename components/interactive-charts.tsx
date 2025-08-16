"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { BarChart3, LineChart, PieChart, Download, TrendingUp } from "lucide-react"
import type { TimeSeriesData } from "@/lib/analytics-types"

export function InteractiveCharts() {
  const [selectedMetric, setSelectedMetric] = useState("content_volume")
  const [timeframe, setTimeframe] = useState("7d")
  const [loading, setLoading] = useState(false)

  const chartData = useMemo(() => {
    return []
  }, [timeframe])

  const timeSeriesData = useMemo<TimeSeriesData[]>(() => {
    const baseData = []
    const now = new Date()
    for (let i = 30; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      baseData.push({
        timestamp: date,
        value: Math.floor(Math.random() * 5000) + 15000 + i * 100, // Trending upward
        category: ["social_media", "research", "clinical", "community"][Math.floor(Math.random() * 4)],
      })
    }
    return baseData
  }, [timeframe])

  const handleExport = useCallback(() => {
    console.log("[v0] Exporting comprehensive chart data for", selectedMetric, timeframe)
    const exportData = {
      metric: selectedMetric,
      timeframe,
      data: chartData,
      exportedAt: new Date().toISOString(),
      totalDataPoints: chartData.length,
    }

    // Simulate CSV export
    const csvContent = [
      ["Date", "Value", "Category"],
      ...timeSeriesData.map((item) => [item.timestamp.toLocaleDateString(), item.value, item.category]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    console.log("[v0] Export completed:", csvContent.slice(0, 200) + "...")
  }, [selectedMetric, timeframe, chartData])

  const handleMetricChange = useCallback((value: string) => {
    setSelectedMetric(value)
    console.log("[v0] Metric changed to:", value)
  }, [])

  const handleTimeframeChange = useCallback((value: string) => {
    setTimeframe(value)
    console.log("[v0] Timeframe changed to:", value)
  }, [])

  chartData.current = useMemo(() => {
    return timeSeriesData.map((item) => ({
      date: item.timestamp.toLocaleDateString(),
      value: item.value,
      category: item.category,
    }))
  }, [timeSeriesData])

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <Select value={selectedMetric} onValueChange={handleMetricChange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="content_volume">Content Volume</SelectItem>
              <SelectItem value="processing_rate">Processing Rate</SelectItem>
              <SelectItem value="sentiment_score">Sentiment Score</SelectItem>
              <SelectItem value="error_rate">Error Rate</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeframe} onValueChange={handleTimeframeChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export Chart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5" />
              {selectedMetric.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())} Trends
            </CardTitle>
            <CardDescription>
              Advanced analytics with {timeSeriesData.length} data points • Updated every 5 minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-gradient-to-br from-blue-50 via-emerald-50 to-purple-50 rounded-lg p-6 border-2 border-dashed border-gray-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              <div className="h-full flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-start">
                  <div className="text-sm text-gray-700 space-y-1">
                    <div className="font-bold text-lg text-emerald-600">
                      {chartData.current[chartData.current.length - 1]?.value.toLocaleString() || 0}
                    </div>
                    <div className="text-xs">Current Value</div>
                    <div className="text-xs text-blue-600">
                      Peak: {Math.max(...chartData.current.map((d) => d.value)).toLocaleString()}
                    </div>
                    <div className="text-xs text-purple-600">
                      Growth: +
                      {Math.round(
                        ((chartData.current[chartData.current.length - 1]?.value || 0) /
                          (chartData.current[0]?.value || 1) -
                          1) *
                          100,
                      )}
                      %
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-emerald-500 animate-bounce" />
                    <div className="text-xs text-emerald-600 font-medium">Live Data</div>
                  </div>
                </div>
                <div className="flex items-end justify-between h-48 gap-1">
                  {chartData.current.slice(-14).map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-1 group cursor-pointer">
                      <div
                        className="bg-gradient-to-t from-blue-500 to-emerald-500 rounded-t transition-all duration-500 hover:from-blue-600 hover:to-emerald-600 hover:scale-110 shadow-lg"
                        style={{
                          height: `${Math.max((item.value / Math.max(...chartData.current.map((d) => d.value))) * 180, 8)}px`,
                          width: "16px",
                        }}
                      />
                      <div className="text-xs text-gray-500 rotate-45 origin-bottom-left opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.date.split("/")[1]}/{item.date.split("/")[2]}
                      </div>
                      <div className="text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                        {item.value.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Category Distribution
            </CardTitle>
            <CardDescription>Content breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border-2 border-dashed border-gray-200">
              <div className="space-y-3">
                {[
                  { name: "Social Media", value: 45, color: "bg-blue-500" },
                  { name: "Research Papers", value: 25, color: "bg-emerald-500" },
                  { name: "Clinical Studies", value: 20, color: "bg-purple-500" },
                  { name: "News Articles", value: 10, color: "bg-orange-500" },
                ].map((category, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${category.color}`} />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm">
                        <span>{category.name}</span>
                        <span className="font-semibold">{category.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${category.color}`}
                          style={{ width: `${category.value}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Source Performance
            </CardTitle>
            <CardDescription>Top performing data sources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 border-2 border-dashed border-gray-200">
              <div className="space-y-4">
                {[
                  { source: "Reddit r/diabetes_t1", score: 94, posts: 1247 },
                  { source: "Diabetes Community", score: 89, posts: 892 },
                  { source: "PubMed Research", score: 96, posts: 234 },
                  { source: "Clinical Trials", score: 91, posts: 156 },
                ].map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{source.source}</span>
                      <span className="text-emerald-600 font-semibold">{source.score}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full transition-all duration-700"
                          style={{ width: `${source.score}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{source.posts} posts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Peak Activity Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Morning (6-12)</span>
                <span className="font-medium">23%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Afternoon (12-18)</span>
                <span className="font-medium">34%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Evening (18-24)</span>
                <span className="font-medium">28%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Night (0-6)</span>
                <span className="font-medium">15%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Language Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>English</span>
                <span className="font-medium">67%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Spanish</span>
                <span className="font-medium">12%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>French</span>
                <span className="font-medium">8%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>German</span>
                <span className="font-medium">6%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Other</span>
                <span className="font-medium">7%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Content Quality Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-emerald-600">8.7</div>
              <div className="text-sm text-muted-foreground">out of 10</div>
              <div className="text-xs text-muted-foreground">Based on relevance, accuracy, and engagement</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
