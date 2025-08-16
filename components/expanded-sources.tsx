"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Database, Users, TrendingUp, Activity, Shield, Zap, Search } from "lucide-react"
import { dataGenerator } from "@/lib/data-generator"

interface ExpandedDataSource {
  id: string
  name: string
  category: string
  description: string
  status: "active" | "inactive" | "maintenance" | "error"
  lastSync: Date
  recordCount: number
  quality: number
  coverage: string[]
  updateFrequency: string
  apiEndpoint: string
}

interface SourceCategory {
  id: string
  name: string
  description: string
  sourceCount: number
  totalRecords: number
  averageQuality: number
  lastUpdated: Date
}

export function ExpandedSources() {
  const [sources, setSources] = useState<ExpandedDataSource[]>([])
  const [categories, setCategories] = useState<SourceCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateData = () => {
      const sourceData: ExpandedDataSource[] = [
        {
          id: "source-1",
          name: "PubMed Central",
          category: "Medical Research",
          description: "Comprehensive biomedical and life sciences journal literature",
          status: "active",
          lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000),
          recordCount: 35000000,
          quality: 95,
          coverage: ["Global"],
          updateFrequency: "Daily",
          apiEndpoint: "https://api.ncbi.nlm.nih.gov/pmc"
        },
        {
          id: "source-2",
          name: "ClinicalTrials.gov",
          category: "Clinical Trials",
          description: "Database of privately and publicly funded clinical studies",
          status: "active",
          lastSync: new Date(Date.now() - 6 * 60 * 60 * 1000),
          recordCount: 450000,
          quality: 92,
          coverage: ["Global"],
          updateFrequency: "Weekly",
          apiEndpoint: "https://clinicaltrials.gov/api"
        },
        {
          id: "source-3",
          name: "FDA MAUDE Database",
          category: "Medical Devices",
          description: "Medical device adverse event reports and safety information",
          status: "active",
          lastSync: new Date(Date.now() - 12 * 60 * 60 * 1000),
          recordCount: 2800000,
          quality: 88,
          coverage: ["US"],
          updateFrequency: "Monthly",
          apiEndpoint: "https://api.fda.gov/device"
        },
        {
          id: "source-4",
          name: "WHO Global Health Observatory",
          category: "Public Health",
          description: "Global health statistics and epidemiological data",
          status: "active",
          lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000),
          recordCount: 1200000,
          quality: 90,
          coverage: ["Global"],
          updateFrequency: "Monthly",
          apiEndpoint: "https://api.who.int/gho"
        },
        {
          id: "source-5",
          name: "Reddit T1D Communities",
          category: "Social Media",
          description: "User-generated content and discussions from T1D communities",
          status: "active",
          lastSync: new Date(Date.now() - 30 * 60 * 1000),
          recordCount: 2500000,
          quality: 75,
          coverage: ["Global"],
          updateFrequency: "Real-time",
          apiEndpoint: "https://api.reddit.com/r/diabetes"
        },
        {
          id: "source-6",
          name: "Dexcom Developer API",
          category: "Medical Technology",
          description: "Continuous glucose monitoring data and device information",
          status: "active",
          lastSync: new Date(Date.now() - 15 * 60 * 1000),
          recordCount: 15000000,
          quality: 94,
          coverage: ["Global"],
          updateFrequency: "Real-time",
          apiEndpoint: "https://api.dexcom.com/v2"
        },
        {
          id: "source-7",
          name: "EPA Toxics Release Inventory",
          category: "Environmental Health",
          description: "Chemical release data and environmental health information",
          status: "active",
          lastSync: new Date(Date.now() - 48 * 60 * 60 * 1000),
          recordCount: 800000,
          quality: 87,
          coverage: ["US"],
          updateFrequency: "Annually",
          apiEndpoint: "https://api.epa.gov/tri"
        },
        {
          id: "source-8",
          name: "Kaggle Diabetes Datasets",
          category: "Data Science",
          description: "Machine learning datasets related to diabetes research",
          status: "active",
          lastSync: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          recordCount: 500000,
          quality: 89,
          coverage: ["Global"],
          updateFrequency: "Weekly",
          apiEndpoint: "https://api.kaggle.com/datasets"
        }
      ]
      setSources(sourceData)

      const categoryData: SourceCategory[] = [
        {
          id: "cat-1",
          name: "Medical Research",
          description: "Peer-reviewed scientific literature and clinical studies",
          sourceCount: 15,
          totalRecords: 45000000,
          averageQuality: 93,
          lastUpdated: new Date()
        },
        {
          id: "cat-2",
          name: "Clinical Trials",
          description: "Clinical research data and trial results",
          sourceCount: 8,
          totalRecords: 800000,
          averageQuality: 91,
          lastUpdated: new Date()
        },
        {
          id: "cat-3",
          name: "Medical Devices",
          description: "Device safety data and adverse event reports",
          sourceCount: 12,
          totalRecords: 3500000,
          averageQuality: 89,
          lastUpdated: new Date()
        },
        {
          id: "cat-4",
          name: "Public Health",
          description: "Population health statistics and epidemiological data",
          sourceCount: 10,
          totalRecords: 2000000,
          averageQuality: 88,
          lastUpdated: new Date()
        },
        {
          id: "cat-5",
          name: "Social Media",
          description: "Community discussions and user-generated content",
          sourceCount: 6,
          totalRecords: 5000000,
          averageQuality: 76,
          lastUpdated: new Date()
        },
        {
          id: "cat-6",
          name: "Medical Technology",
          description: "Device data and technology information",
          sourceCount: 9,
          totalRecords: 20000000,
          averageQuality: 92,
          lastUpdated: new Date()
        }
      ]
      setCategories(categoryData)
      setLoading(false)
    }

    generateData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "inactive": return "bg-red-100 text-red-800"
      case "maintenance": return "bg-yellow-100 text-yellow-800"
      case "error": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Medical Research": return "bg-blue-100 text-blue-800"
      case "Clinical Trials": return "bg-purple-100 text-purple-800"
      case "Medical Devices": return "bg-green-100 text-green-800"
      case "Public Health": return "bg-orange-100 text-orange-800"
      case "Social Media": return "bg-pink-100 text-pink-800"
      case "Medical Technology": return "bg-indigo-100 text-indigo-800"
      case "Environmental Health": return "bg-teal-100 text-teal-800"
      case "Data Science": return "bg-cyan-100 text-cyan-800"
      default: return "bg-gray-100 text-gray-800"
    }
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
        <h2 className="text-2xl font-bold text-foreground">🌍 Global Data Sources</h2>
        <p className="text-muted-foreground">Comprehensive integration with 100+ global T1D data sources</p>
      </div>

      <Tabs defaultValue="sources" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sources">📡 Data Sources</TabsTrigger>
          <TabsTrigger value="categories">📊 Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="sources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sources.map((source) => (
              <Card key={source.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(source.status)}>
                      {source.status.toUpperCase()}
                    </Badge>
                    <Badge className={getCategoryColor(source.category)}>
                      {source.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{source.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{source.description}</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Record Count</span>
                      <span className="text-sm font-semibold">
                        {source.recordCount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Data Quality</span>
                      <span className="text-sm font-semibold">{source.quality}%</span>
                    </div>
                    <Progress value={source.quality} className="h-2" />
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium">Coverage: </span>
                        <span className="text-muted-foreground">
                          {source.coverage.join(", ")}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Update: </span>
                        <span className="text-muted-foreground">{source.updateFrequency}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Last Sync: </span>
                      <span className="text-sm text-muted-foreground">
                        {source.lastSync.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">API: </span>
                      <span className="text-sm text-muted-foreground font-mono text-xs">
                        {source.apiEndpoint}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <Card key={category.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{category.description}</p>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Sources: </span>
                        <span className="text-muted-foreground">
                          {category.sourceCount}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Records: </span>
                        <span className="text-muted-foreground">
                          {category.totalRecords.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Average Quality</span>
                      <span className="text-sm font-semibold">{category.averageQuality}%</span>
                    </div>
                    <Progress value={category.averageQuality} className="h-2" />
                    <div>
                      <span className="text-sm font-medium">Last Updated: </span>
                      <span className="text-sm text-muted-foreground">
                        {category.lastUpdated.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Source Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Data Source Overview
          </CardTitle>
          <CardDescription>Comprehensive coverage across all data categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {sources.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Sources</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {categories.length}
              </div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {sources.reduce((sum, s) => sum + s.recordCount, 0).toLocaleString().slice(0, -6)}M
              </div>
              <div className="text-sm text-muted-foreground">Total Records</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(sources.reduce((sum, s) => sum + s.quality, 0) / sources.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Quality</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">🔗 Connect Your Data Source</h3>
            <p className="text-muted-foreground mb-4">
              Integrate your T1D research or clinical data with our comprehensive platform
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="default">Request Integration</Button>
              <Button variant="outline">View API Documentation</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
