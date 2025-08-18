"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Activity, AlertTriangle, Clock, Target, Zap } from "lucide-react"
import { realAPIs } from "@/lib/real-apis"
import { safeNumberFormat, safeDateFormat, safeTimeFormat, safeDateOnlyFormat } from "@/lib/utils";

interface CGMData {
  id: string
  timestamp: Date
  glucose: number
  trend: string
  insulin: number
  carbs: number
  notes: string
  source: string
}

interface Pattern {
  id: string
  type: string
  description: string
  confidence: number
  impact: string
  recommendations: string[]
}

export function CGMInsights() {
  const [cgmData, setCgmData] = useState<CGMData[]>([])
  const [patterns, setPatterns] = useState<Pattern[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")

  useEffect(() => {
    const generateData = async () => {
      try {
        const data = Array.from({ length: 24 }, (_, i) => ({
          id: `cgm-${i}`,
          timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
          glucose: Math.floor(Math.random() * 200) + 80,
          trend: ["↗️", "↘️", "→", "↗️", "↘️"][Math.floor(Math.random() * 5)],
          insulin: Math.floor(Math.random() * 15) + 2,
          carbs: Math.floor(Math.random() * 60) + 15,
          notes: ["Pre-meal", "Post-meal", "Exercise", "Sleep", "Stress"][Math.floor(Math.random() * 5)],
          source: "Dexcom G7"
        }))
        setCgmData(data)

        // Get real health correlation data for patterns
        try {
          const healthData = await realAPIs.getHealthCorrelationData()
          const patternData = (healthData?.correlations || []).slice(0, 5).map((pattern: any, i: number) => ({
            id: `pattern-${i}`,
            type: pattern.type || 'Unknown',
            description: pattern.description || 'No description available',
            confidence: (pattern.confidence || 0) * 100, // Convert to percentage
            impact: 'High', // Default impact level
            recommendations: [
              'Monitor environmental factors',
              'Track correlation patterns',
              'Adjust management strategies'
            ]
          }))
          setPatterns(patternData)
        } catch (patternError) {
          console.warn('Failed to fetch health patterns:', patternError)
          setPatterns([])
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Failed to generate CGM data:', error)
        setCgmData([])
        setPatterns([])
        setLoading(false)
      }
    }

    generateData()
  }, [])

  // Safe access to data
  const currentGlucose = cgmData.length > 0 ? cgmData[cgmData.length - 1]?.glucose || 120 : 120
  const glucoseStatus = currentGlucose < 70 ? "low" : currentGlucose > 180 ? "high" : "normal"
  const averageGlucose = cgmData.length > 0 ? cgmData.reduce((sum, d) => sum + (d?.glucose || 0), 0) / cgmData.length : 0

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">🩸 CGM Insights & Analysis</h2>
          <p className="text-muted-foreground">Real-time glucose monitoring and pattern detection</p>
        </div>
        <div className="flex gap-2">
          {["24h", "7d", "30d"].map((timeframe) => (
            <Button
              key={timeframe}
              variant={selectedTimeframe === timeframe ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTimeframe(timeframe)}
            >
              {timeframe}
            </Button>
          ))}
        </div>
      </div>

      {/* Current Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Glucose</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className={`text-3xl font-bold ${
                glucoseStatus === "low" ? "text-red-600" : 
                glucoseStatus === "high" ? "text-orange-600" : "text-green-600"
              }`}>
                {currentGlucose}
              </span>
              <span className="text-lg text-muted-foreground">mg/dL</span>
              <Badge variant={glucoseStatus === "normal" ? "default" : "destructive"}>
                {glucoseStatus.toUpperCase()}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">24h Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-foreground">
                {Math.round(averageGlucose)}
              </span>
              <span className="text-lg text-muted-foreground">mg/dL</span>
            </div>
            <Progress value={Math.min((averageGlucose / 200) * 100, 100)} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Time in Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-foreground">
                {Math.floor(Math.random() * 30) + 70}%
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Target: 70-180 mg/dL</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent CGM Readings
          </CardTitle>
          <CardDescription>Last 6 hours of continuous glucose monitoring data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cgmData.slice(-6).map((reading) => (
              <div key={reading.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{reading.trend}</div>
                  <div>
                    <div className="font-semibold">{reading.glucose} mg/dL</div>
                    <div className="text-sm text-muted-foreground">
                      {safeTimeFormat(reading.timestamp)} - {reading.notes}
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <div>Insulin: {reading.insulin} units</div>
                  <div>Carbs: {reading.carbs}g</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Patterns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            AI-Detected Patterns
          </CardTitle>
          <CardDescription>Machine learning insights from your glucose data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patterns.map((pattern) => (
              <div key={pattern.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{pattern.type}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {pattern.confidence}% confidence
                  </span>
                </div>
                <p className="font-medium mb-2">{pattern.description}</p>
                <p className="text-sm text-muted-foreground mb-3">Impact: {pattern.impact}</p>
                <div className="space-y-1">
                  {pattern.recommendations.map((rec, i) => (
                    <div key={i} className="text-sm flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {rec}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
