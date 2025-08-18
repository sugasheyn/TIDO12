"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, MapPin, AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { GeographicData } from "@/lib/analytics-types"
import { safeNumberFormat, safeDateFormat, safeTimeFormat, safeDateOnlyFormat } from "@/lib/utils";

export function GeographicVisualization() {
  const [geographicData, setGeographicData] = useState<GeographicData[]>([])
  const [selectedMetric, setSelectedMetric] = useState("mentions")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "reconnecting">("connected")

  const fetchGeographicData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setConnectionStatus("connected")
      const response = await fetch(`/api/analytics/geographic?metric=${selectedMetric}`)
      if (!response.ok) throw new Error("Failed to fetch data")
      const data = await response.json()
      setGeographicData(data.data)
    } catch (error) {
      console.error("Failed to fetch geographic data:", error)
      setError(error instanceof Error ? error.message : "Unknown error")
      setConnectionStatus("disconnected")
    } finally {
      setLoading(false)
    }
  }, [selectedMetric])

  useEffect(() => {
    fetchGeographicData()
  }, [fetchGeographicData])

  const getSentimentColor = useCallback((sentiment: number) => {
    if (sentiment >= 0.7) return "text-emerald-600"
    if (sentiment >= 0.5) return "text-yellow-600"
    return "text-red-600"
  }, [])

  const getSentimentBadge = useCallback((sentiment: number) => {
    if (sentiment >= 0.7) return "default"
    if (sentiment >= 0.5) return "secondary"
    return "destructive"
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <AlertTriangle className="h-12 w-12 text-red-500" />
        <div className="text-center">
          <h3 className="text-lg font-semibold text-red-700">Failed to load geographic data</h3>
          <p className="text-red-600">{error}</p>
        </div>
        <Button onClick={fetchGeographicData} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Geographic Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            Global T1D Activity
            <div
              className={`w-2 h-2 rounded-full ${
                connectionStatus === "connected"
                  ? "bg-green-500 animate-pulse"
                  : connectionStatus === "reconnecting"
                    ? "bg-yellow-500 animate-pulse"
                    : "bg-red-500"
              }`}
            />
          </h3>
          <p className="text-sm text-muted-foreground">Geographic distribution of discussions and sentiment</p>
        </div>
        <Select value={selectedMetric} onValueChange={setSelectedMetric}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mentions">Total Mentions</SelectItem>
            <SelectItem value="sentiment">Average Sentiment</SelectItem>
            <SelectItem value="growth">Growth Rate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* World Map */}
        <Card className="lg:col-span-2 transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Interactive Global Activity Map
            </CardTitle>
            <CardDescription>Real-time T1D discussion activity worldwide • Click regions for details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gradient-to-br from-blue-50 via-emerald-50 to-purple-50 rounded-lg relative overflow-hidden border-2 border-dashed border-gray-200 group cursor-pointer transition-all duration-300 hover:border-solid hover:border-blue-300">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
              <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-75 animation-delay-1000"></div>
              <div className="absolute bottom-1/3 left-1/2 w-5 h-5 bg-purple-500 rounded-full animate-ping opacity-75 animation-delay-2000"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4 p-6">
                  <Globe className="h-20 w-20 text-blue-500 mx-auto animate-spin-slow" />
                  <div>
                    <p className="text-lg font-semibold text-gray-700">Live Global T1D Activity</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Monitoring {geographicData.length} countries •{" "}
                      {safeNumberFormat(geographicData.reduce((sum, country) => sum + country.mentions, 0))} total
                      mentions
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-6">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-emerald-700 font-medium">High Activity</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse animation-delay-500" />
                      <span className="text-blue-700 font-medium">Medium Activity</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse animation-delay-1000" />
                      <span className="text-purple-700 font-medium">Emerging Trends</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Country Rankings */}
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Country Rankings
            </CardTitle>
            <CardDescription>Top countries by activity • Live updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {geographicData
              .sort((a, b) => b.mentions - a.mentions)
              .slice(0, 8)
              .map((country, index) => (
                <div
                  key={country.countryCode}
                  className="flex items-center justify-between p-3 border rounded-lg transition-all duration-300 hover:bg-muted/50 hover:shadow-sm cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`text-lg font-bold transition-colors duration-300 ${
                        index === 0
                          ? "text-yellow-600"
                          : index === 1
                            ? "text-gray-500"
                            : index === 2
                              ? "text-orange-600"
                              : "text-muted-foreground"
                      }`}
                    >
                      #{index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium group-hover:text-blue-600 transition-colors">{country.country}</h4>
                      <p className="text-sm text-muted-foreground">{safeNumberFormat(country.mentions)} mentions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={getSentimentBadge(country.sentiment)}
                      className="transition-all duration-300 group-hover:scale-105"
                    >
                      {Math.round(country.sentiment * 100)}%
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">sentiment</div>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>

      {/* Regional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {geographicData.slice(0, 6).map((country) => (
          <Card
            key={country.countryCode}
            className="transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group"
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="group-hover:text-blue-600 transition-colors">{country.country}</span>
                <Badge variant="outline" className="group-hover:border-blue-300 transition-colors">
                  {country.countryCode}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Mentions</div>
                  <div className="font-medium text-lg">{safeNumberFormat(country.mentions)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Sentiment</div>
                  <div className={`font-medium text-lg ${getSentimentColor(country.sentiment)}`}>
                    {Math.round(country.sentiment * 100)}%
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">Top Topics</div>
                <div className="flex flex-wrap gap-1">
                  {country.topTopics.map((topic, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs transition-all duration-300 hover:bg-blue-50 hover:border-blue-300"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
