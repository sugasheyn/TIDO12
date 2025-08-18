'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { 
  Activity, 
  Globe, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Users, 
  FileText, 
  Upload,
  Search,
  Filter,
  Download,
  Share2,
  Eye,
  BarChart3,
  PieChart,
  LineChart,
  MapPin,
  Clock,
  Heart,
  Zap
} from 'lucide-react'

// Mock data for demonstration
const mockGlobalData = {
  totalUsers: 15420,
  totalDataPoints: 2847500,
  countries: 47,
  researchPapers: 1250,
  deviceComplaints: 3420,
  activeStudies: 89,
  latestInsights: [
    'Morning exercise shows 23% better glucose control',
    'Humidity affects CGM accuracy by 15%',
    'New insulin type reduces hypoglycemia by 30%',
    'Geographic patterns reveal climate impact on diabetes'
  ]
}

export default function GlobalDiabetesHub() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedCountry, setSelectedCountry] = useState('Global')
  const [timeRange, setTimeRange] = useState('7d')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🌍 Global Diabetes Data Hub
              </h1>
              <p className="text-gray-600 mt-2">
                Discover connections, insights, and patterns across global Type 1 Diabetes data
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload Data
              </Button>
              <Button size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share Insights
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="research">Research Hub</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Global Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockGlobalData.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Data Points</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockGlobalData.totalDataPoints.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +8% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Countries</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockGlobalData.countries}</div>
                  <p className="text-xs text-muted-foreground">
                    +3 new this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Studies</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockGlobalData.activeStudies}</div>
                  <p className="text-xs text-muted-foreground">
                    +5 new studies
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 8 Organized Modules */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Module 1: Global Glucose Patterns */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-600" />
                    Global Glucose Patterns
                  </CardTitle>
                  <CardDescription>
                    Real-time glucose data analysis from around the world
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average Global Glucose</span>
                    <span className="font-semibold">142 mg/dL</span>
                  </div>
                  <Progress value={68} className="w-full" />
                  <div className="text-xs text-gray-500">68% of readings in target range</div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">23%</div>
                      <div className="text-xs text-gray-600">Morning spike</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">15%</div>
                      <div className="text-xs text-gray-600">Exercise benefit</div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              {/* Module 2: Device Performance Analysis */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-purple-600" />
                    Device Performance Analysis
                  </CardTitle>
                  <CardDescription>
                    Real user complaints and device effectiveness data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Dexcom G6</span>
                      <Badge variant="secondary">92%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Medtronic 670G</span>
                      <Badge variant="secondary">87%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tandem t:slim</span>
                      <Badge variant="secondary">89%</Badge>
                    </div>
                  </div>
                  
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Top complaint: Battery life issues (23% of reports)
                    </AlertDescription>
                  </Alert>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Full Report
                  </Button>
                </CardContent>
              </Card>

              {/* Module 3: Medication Effectiveness */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-red-600" />
                    Medication Effectiveness
                  </CardTitle>
                  <CardDescription>
                    Real-world insulin and medication performance data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">NovoRapid</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={88} className="w-20" />
                        <span className="text-sm font-medium">88%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Humalog</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={85} className="w-20" />
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Lantus</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={91} className="w-20" />
                        <span className="text-sm font-medium">91%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-2">
                    Based on {mockGlobalData.totalUsers.toLocaleString()} user reports
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Compare Medications
                  </Button>
                </CardContent>
              </Card>

              {/* Module 4: Environmental Impact */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-green-600" />
                    Environmental Impact
                  </CardTitle>
                  <CardDescription>
                    How climate and environment affect diabetes management
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <div className="text-lg font-bold text-yellow-600">+18%</div>
                      <div className="text-xs text-gray-600">High humidity impact</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">-12%</div>
                      <div className="text-xs text-gray-600">Cold weather effect</div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <strong>Key Finding:</strong> Temperature variations of ±10°C can affect glucose control by up to 15%
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <MapPin className="w-4 h-4 mr-2" />
                    View Climate Map
                  </Button>
                </CardContent>
              </Card>

              {/* Module 5: Research Trends */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-indigo-600" />
                    Research Trends
                  </CardTitle>
                  <CardDescription>
                    Latest diabetes research and clinical trial updates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-indigo-50 rounded">
                      <span className="text-sm font-medium">Beta Cell Regeneration</span>
                      <Badge variant="default">Phase 2</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm font-medium">AI Glucose Prediction</span>
                      <Badge variant="secondary">Published</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                      <span className="text-sm font-medium">Stem Cell Therapy</span>
                      <Badge variant="outline">Phase 1</Badge>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    {mockGlobalData.researchPapers} papers analyzed this month
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <Search className="w-4 h-4 mr-2" />
                    Search Research
                  </Button>
                </CardContent>
              </Card>

              {/* Module 6: Geographic Patterns */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-orange-600" />
                    Geographic Patterns
                  </CardTitle>
                  <CardDescription>
                    Regional diabetes management differences and insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">North America</span>
                      <span className="text-sm font-medium">78% control</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Europe</span>
                      <span className="text-sm font-medium">82% control</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Asia Pacific</span>
                      <span className="text-sm font-medium">75% control</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <strong>Insight:</strong> Healthcare access correlates strongly with glucose control outcomes
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <Globe className="w-4 h-4 mr-2" />
                    Explore Regions
                  </Button>
                </CardContent>
              </Card>

              {/* Module 7: Community Insights */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-teal-600" />
                    Community Insights
                  </CardTitle>
                  <CardDescription>
                    Real user experiences and community-driven discoveries
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {mockGlobalData.latestInsights.slice(0, 3).map((insight, index) => (
                      <div key={index} className="p-2 bg-teal-50 rounded text-sm">
                        {insight}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Based on {mockGlobalData.totalUsers.toLocaleString()} community members
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <Users className="w-4 h-4 mr-2" />
                    Join Discussion
                  </Button>
                </CardContent>
              </Card>

              {/* Module 8: AI Discoveries */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                    AI Discoveries
                  </CardTitle>
                  <CardDescription>
                    Machine learning insights and pattern recognition
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-2 bg-yellow-50 rounded text-sm">
                      <strong>New Pattern:</strong> Exercise timing affects glucose control by 23%
                    </div>
                    <div className="p-2 bg-blue-50 rounded text-sm">
                      <strong>Correlation:</strong> Sleep quality and morning glucose spikes
                    </div>
                    <div className="p-2 bg-green-50 rounded text-sm">
                      <strong>Prediction:</strong> 89% accuracy in hypoglycemia prediction
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    AI confidence: 94%
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    View AI Report
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Latest Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Latest Global Updates</CardTitle>
                <CardDescription>
                  Real-time updates from the diabetes community worldwide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">New research correlation discovered</div>
                      <div className="text-sm text-gray-600">AI identified link between air quality and glucose variability</div>
                    </div>
                    <Badge variant="secondary">2 min ago</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium">Global glucose control improving</div>
                      <div className="text-sm text-gray-600">Average time-in-range increased by 5% this month</div>
                    </div>
                    <Badge variant="secondary">15 min ago</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium">Community milestone reached</div>
                      <div className="text-sm text-gray-600">15,000+ users now contributing data globally</div>
                    </div>
                    <Badge variant="secondary">1 hour ago</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Cross-Analysis</CardTitle>
                <CardDescription>
                  Discover hidden connections and patterns across different data types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Lightbulb className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">AI Analysis Coming Soon</h3>
                  <p className="text-gray-600">
                    Our AI models are analyzing global diabetes data to find new insights and correlations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Research Hub Tab */}
          <TabsContent value="research" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Research Hub</CardTitle>
                <CardDescription>
                  Access the latest diabetes research and clinical trial information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Research Database</h3>
                  <p className="text-gray-600">
                    Browse through thousands of research papers and clinical trials.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Hub</CardTitle>
                <CardDescription>
                  Connect with other diabetes patients and share experiences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-teal-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Community Features</h3>
                  <p className="text-gray-600">
                    Join discussions, share insights, and learn from others.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
