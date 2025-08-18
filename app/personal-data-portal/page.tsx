'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { 
  Upload, 
  FileText, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Download,
  Eye,
  Share2,
  Activity,
  Heart,
  Clock,
  Target,
  Zap,
  Lightbulb,
  Users,
  Globe
} from 'lucide-react'

export default function PersonalDataPortal() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mock analysis results
  const mockAnalysisResults = {
    dataSummary: {
      totalReadings: 1247,
      dateRange: { start: '2024-01-01', end: '2024-01-31' },
      averageGlucose: 142,
      glucoseVariability: 45,
      timeInRange: 68,
      hypoglycemiaEpisodes: 12
    },
    patterns: [
      {
        type: 'hypoglycemia_analysis',
        data: {
          episodes: 12,
          frequency: 0.4,
          severity: 'mild',
          riskFactors: ['Overnight episodes', 'Exercise-related'],
          prevention: ['Check glucose before exercise', 'Reduce overnight basal']
        },
        confidence: 0.9,
        source: 'AI Pattern Detection'
      },
      {
        type: 'insulin_analysis',
        data: {
          totalDose: 156.5,
          averageDose: 5.2,
          doseVariability: 1.8,
          frequency: 2.1,
          types: ['NovoRapid', 'Lantus']
        },
        confidence: 0.8,
        source: 'User Data Analysis'
      }
    ],
    insights: [
      'High glucose variability detected - consider more frequent monitoring',
      'Overnight hypoglycemia risk - review basal insulin settings',
      'Exercise timing correlates with glucose control improvements'
    ],
    recommendations: [
      'Monitor glucose more frequently during exercise',
      'Consider reducing overnight basal insulin by 10%',
      'Check glucose before and after meals for better control',
      'Review insulin-to-carb ratios with healthcare provider'
    ],
    riskAssessment: {
      hypoglycemiaRisk: 'medium',
      hyperglycemiaRisk: 'low',
      variabilityRisk: 'high',
      overallRisk: 'medium'
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      simulateUpload(file)
    }
  }

  const simulateUpload = (file: File) => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const analyzeData = async () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResults(mockAnalysisResults)
      setAnalysisComplete(true)
      setIsAnalyzing(false)
    }, 3000)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <CheckCircle className="w-4 h-4" />
      case 'medium': return <AlertTriangle className="w-4 h-4" />
      case 'high': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                📊 Personal Data Portal
              </h1>
              <p className="text-gray-600 mt-2">
                Upload your diabetes data and discover personalized insights with AI analysis
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </Button>
              <Button size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share Results
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload & Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-blue-600" />
                  Upload Your Diabetes Data
                </CardTitle>
                <CardDescription>
                  Upload CSV, JSON, or text files with your glucose readings, insulin doses, meals, and exercise data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!uploadedFile ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Drag and drop your diabetes data file here, or click to browse
                    </p>
                    <Button onClick={() => fileInputRef.current?.click()}>
                      Choose File
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv,.json,.xml,.txt,.xlsx,.xls"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Supported formats: CSV, JSON, XML, TXT, Excel (max 10MB)
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-blue-600" />
                        <div>
                          <p className="font-medium">{uploadedFile.name}</p>
                          <p className="text-sm text-gray-600">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Upload Progress</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="w-full" />
                    </div>

                    {uploadProgress === 100 && (
                      <Button 
                        onClick={analyzeData} 
                        disabled={isAnalyzing}
                        className="w-full"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Analyzing Data...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 mr-2" />
                            Analyze with AI
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Analysis Results */}
            {analysisComplete && analysisResults && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                    AI Analysis Results
                  </CardTitle>
                  <CardDescription>
                    Your personalized diabetes insights and recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Data Summary */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">
                        {analysisResults.dataSummary.totalReadings}
                      </div>
                      <div className="text-xs text-gray-600">Readings</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">
                        {analysisResults.dataSummary.averageGlucose}
                      </div>
                      <div className="text-xs text-gray-600">Avg Glucose</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <div className="text-lg font-bold text-yellow-600">
                        {analysisResults.dataSummary.timeInRange}%
                      </div>
                      <div className="text-xs text-gray-600">Time in Range</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-lg font-bold text-red-600">
                        {analysisResults.dataSummary.hypoglycemiaEpisodes}
                      </div>
                      <div className="text-xs text-gray-600">Hypo Episodes</div>
                    </div>
                  </div>

                  {/* Risk Assessment */}
                  <div>
                    <h3 className="font-semibold mb-3">Risk Assessment</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Object.entries(analysisResults.riskAssessment).map(([key, value]) => (
                        <div key={key} className={`p-3 rounded-lg flex items-center space-x-2 ${getRiskColor(value as string)}`}>
                          {getRiskIcon(value as string)}
                          <div>
                            <div className="text-xs font-medium capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div className="text-sm font-bold capitalize">{value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Insights */}
                  <div>
                    <h3 className="font-semibold mb-3">Key Insights</h3>
                    <div className="space-y-2">
                      {analysisResults.insights.map((insight: string, index: number) => (
                        <div key={index} className="p-3 bg-blue-50 rounded-lg text-sm">
                          {insight}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h3 className="font-semibold mb-3">AI Recommendations</h3>
                    <div className="space-y-2">
                      {analysisResults.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="p-3 bg-green-50 rounded-lg text-sm">
                          {rec}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share with Doctor
                    </Button>
                    <Button className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      View Detailed Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Data Template */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Template</CardTitle>
                <CardDescription>
                  Download our CSV template to format your data correctly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download CSV Template
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download JSON Template
                </Button>
                <p className="text-xs text-gray-500">
                  Templates include sample data and column headers for glucose, insulin, meals, and exercise
                </p>
              </CardContent>
            </Card>

            {/* Supported Formats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Supported Formats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">CSV</span>
                  <Badge variant="secondary">Recommended</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">JSON</span>
                  <Badge variant="outline">Supported</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">XML</span>
                  <Badge variant="outline">Supported</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Excel</span>
                  <Badge variant="outline">Supported</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Text</span>
                  <Badge variant="outline">Basic</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Data Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Your data is encrypted and secure</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Data is never shared without permission</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-sm">You can delete your data anytime</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-sm">HIPAA compliant data handling</span>
                </div>
              </CardContent>
            </Card>

            {/* AI Capabilities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Analysis Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Zap className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span className="text-sm">Pattern recognition in glucose data</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Zap className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span className="text-sm">Hypoglycemia risk assessment</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Zap className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span className="text-sm">Insulin effectiveness analysis</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Zap className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span className="text-sm">Lifestyle correlation insights</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Zap className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span className="text-sm">Personalized recommendations</span>
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">15,420+</div>
                  <div className="text-sm text-gray-600">Users contributing data</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">2.8M+</div>
                  <div className="text-sm text-gray-600">Data points analyzed</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">47</div>
                  <div className="text-sm text-gray-600">Countries represented</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
