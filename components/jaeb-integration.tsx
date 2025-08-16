"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, Users, TrendingUp, Activity, Shield, Globe } from "lucide-react"
import { dataGenerator } from "@/lib/data-generator"

interface ClinicalStudy {
  id: string
  title: string
  status: "active" | "completed" | "recruiting" | "analysis"
  participants: number
  targetEnrollment: number
  startDate: Date
  endDate: Date
  principalInvestigator: string
  institution: string
  focus: string
}

interface DataInsight {
  id: string
  category: string
  title: string
  description: string
  confidence: number
  impact: string
  dataSource: string
  lastUpdated: Date
}

export function JaebIntegration() {
  const [studies, setStudies] = useState<ClinicalStudy[]>([])
  const [insights, setInsights] = useState<DataInsight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateData = () => {
      const studyData: ClinicalStudy[] = [
        {
          id: "study-1",
          title: "T1D Exchange Registry Analysis",
          status: "active",
          participants: 25000,
          targetEnrollment: 30000,
          startDate: new Date("2023-01-01"),
          endDate: new Date("2025-12-31"),
          principalInvestigator: "Dr. Sarah Johnson",
          institution: "University of Florida",
          focus: "Long-term outcomes and complications"
        },
        {
          id: "study-2",
          title: "Pediatric T1D Management Patterns",
          status: "recruiting",
          participants: 1500,
          targetEnrollment: 2000,
          startDate: new Date("2024-03-01"),
          endDate: new Date("2026-02-28"),
          principalInvestigator: "Dr. Michael Chen",
          institution: "Children's Hospital Boston",
          focus: "Treatment adherence and outcomes"
        },
        {
          id: "study-3",
          title: "CGM Data Integration Study",
          status: "analysis",
          participants: 800,
          targetEnrollment: 800,
          startDate: new Date("2023-06-01"),
          endDate: new Date("2024-05-31"),
          principalInvestigator: "Dr. Emily Rodriguez",
          institution: "Stanford University",
          focus: "Technology integration and outcomes"
        },
        {
          id: "study-4",
          title: "T1D Comorbidity Patterns",
          status: "completed",
          participants: 12000,
          targetEnrollment: 12000,
          startDate: new Date("2022-01-01"),
          endDate: new Date("2023-12-31"),
          principalInvestigator: "Dr. David Kim",
          institution: "Mayo Clinic",
          focus: "Risk factors and prevention"
        }
      ]
      setStudies(studyData)

      const insightData = dataGenerator.generateAIPatterns().slice(0, 6).map((pattern, i) => ({
        id: `insight-${i}`,
        category: ["Treatment Patterns", "Outcomes", "Risk Factors", "Technology", "Quality of Life", "Complications"][i % 6],
        title: pattern.title,
        description: pattern.description,
        confidence: pattern.confidence,
        impact: pattern.impact,
        dataSource: "JAEB T1D Exchange",
        lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      }))
      setInsights(insightData)
      setLoading(false)
    }

    generateData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "completed": return "bg-blue-100 text-blue-800"
      case "recruiting": return "bg-orange-100 text-orange-800"
      case "analysis": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getEnrollmentProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-64 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">📊 Clinical Data Integration</h2>
        <p className="text-muted-foreground">JAEB T1D Exchange and clinical research data insights</p>
      </div>

      <Tabs defaultValue="studies" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="studies">🔬 Clinical Studies</TabsTrigger>
          <TabsTrigger value="insights">💡 Data Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="studies" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studies.map((study) => (
              <Card key={study.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(study.status)}>
                      {study.status.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{study.focus}</Badge>
                  </div>
                  <CardTitle className="text-lg">{study.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Enrollment Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {study.participants.toLocaleString()}/{study.targetEnrollment.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={getEnrollmentProgress(study.participants, study.targetEnrollment)} className="h-2" />
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium">Start Date: </span>
                        <span className="text-muted-foreground">{study.startDate.toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="font-medium">End Date: </span>
                        <span className="text-muted-foreground">{study.endDate.toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Principal Investigator: </span>
                      <span className="text-sm text-muted-foreground">{study.principalInvestigator}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Institution: </span>
                      <span className="text-sm text-muted-foreground">{study.institution}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight) => (
              <Card key={insight.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{insight.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                  <CardTitle className="text-lg">{insight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{insight.description}</p>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Impact: </span>
                      <span className="text-sm text-muted-foreground">{insight.impact}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Data Source: </span>
                      <span className="text-sm text-muted-foreground">{insight.dataSource}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Last Updated: </span>
                      <span className="text-sm text-muted-foreground">
                        {insight.lastUpdated.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Registry Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            T1D Exchange Registry Overview
          </CardTitle>
          <CardDescription>Comprehensive clinical data collection and analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">25,000+</div>
              <div className="text-sm text-muted-foreground">Active Participants</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">180+</div>
              <div className="text-sm text-muted-foreground">Clinical Centers</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">15+</div>
              <div className="text-sm text-muted-foreground">Years of Data</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">100+</div>
              <div className="text-sm text-muted-foreground">Research Studies</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">🔬 Access Clinical Data</h3>
            <p className="text-muted-foreground mb-4">
              Explore real-world evidence and clinical insights from the T1D Exchange
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="default">Request Data Access</Button>
              <Button variant="outline">View Publications</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
