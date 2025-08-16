"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Share, Users, Lightbulb, Target, BarChart3, Zap } from "lucide-react"
import AdvancedSearch from "./advanced-search"
import ResearchProjectManager from "./research-project-manager"

export function ResearchTools() {
  const savedSearches = [
    { name: "CGM Accuracy Studies", results: 247, lastRun: "2 hours ago" },
    { name: "Mental Health & T1D", results: 189, lastRun: "1 day ago" },
    { name: "DIY Loop Systems", results: 156, lastRun: "3 hours ago" },
    { name: "Exercise Management", results: 203, lastRun: "5 hours ago" },
  ]

  const recentReports = [
    {
      title: "Quarterly T1D Technology Trends",
      type: "Trend Analysis",
      date: "2024-01-15",
      pages: 47,
      downloads: 234,
    },
    {
      title: "CGM Sensor Performance Meta-Analysis",
      type: "Meta-Analysis",
      date: "2024-01-12",
      pages: 23,
      downloads: 156,
    },
    {
      title: "Community Sentiment on New Devices",
      type: "Sentiment Report",
      date: "2024-01-10",
      pages: 31,
      downloads: 89,
    },
  ]

  const collaborationOpportunities = [
    {
      researcher: "Dr. Sarah Chen",
      institution: "Stanford Medicine",
      focus: "CGM Algorithm Development",
      compatibility: 94,
    },
    {
      researcher: "Prof. Michael Rodriguez",
      institution: "Johns Hopkins",
      focus: "Pediatric T1D Management",
      compatibility: 87,
    },
    {
      researcher: "Dr. Emily Watson",
      institution: "Mayo Clinic",
      focus: "Mental Health & Diabetes",
      compatibility: 91,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Research Tools Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Research Tools</h2>
          <p className="text-muted-foreground">Advanced tools for T1D research and analysis</p>
        </div>
        <Button>
          <Lightbulb className="h-4 w-4 mr-2" />
          New Analysis
        </Button>
      </div>

      <Tabs defaultValue="search" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="search">Smart Search</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
          <TabsTrigger value="export">Export Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          {/* Advanced Search */}
          <AdvancedSearch />
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          {/* Research Project Management Interface */}
          <ResearchProjectManager />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Report Generator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Generate New Report
                </CardTitle>
                <CardDescription>Create comprehensive research reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    <span className="text-sm">Trend Analysis</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <Target className="h-6 w-6 mb-2" />
                    <span className="text-sm">Meta-Analysis</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <Users className="h-6 w-6 mb-2" />
                    <span className="text-sm">Community Report</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <Zap className="h-6 w-6 mb-2" />
                    <span className="text-sm">Safety Analysis</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Previously generated research reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentReports.map((report, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm leading-tight">{report.title}</h4>
                        <Badge variant="outline">{report.type}</Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Share className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{report.date}</span>
                      <span>
                        {report.pages} pages • {report.downloads} downloads
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Research Collaboration Network
              </CardTitle>
              <CardDescription>Connect with researchers working on similar topics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {collaborationOpportunities.map((collab, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{collab.researcher}</h4>
                      <p className="text-sm text-muted-foreground">{collab.institution}</p>
                      <Badge variant="outline">{collab.focus}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">{collab.compatibility}%</div>
                      <div className="text-xs text-muted-foreground">compatibility</div>
                    </div>
                  </div>
                  <Button size="sm" className="w-full">
                    Connect
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Data Export Tools
              </CardTitle>
              <CardDescription>Export research data in various formats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
                <div className="text-center space-y-2">
                  <Download className="h-12 w-12 text-gray-400 mx-auto" />
                  <p className="text-gray-500 font-medium">Export Tools</p>
                  <p className="text-sm text-gray-400">CSV, JSON, Excel, and API access</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
