'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Zap, 
  Activity, 
  Clock, 
  Globe, 
  Shield,
  Lightbulb,
  BarChart3,
  Network,
  Cpu,
  Database,
  Eye,
  AlertTriangle,
  CheckCircle,
  Info,
  Settings
} from 'lucide-react';

export default function AIInsightsDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [aiStatus, setAiStatus] = useState<any>(null);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [learningStatus, setLearningStatus] = useState<any>(null);

  useEffect(() => {
    // Simulate AI system status
    setAiStatus({
      neuralNetwork: { status: 'active', accuracy: 0.87, lastTraining: '2 hours ago' },
      ensembleModels: { status: 'active', accuracy: 0.91, activeModels: 4 },
      adaptiveLearning: { status: 'active', improvement: 0.15, adaptationLevel: 'high' },
      crossAnalysis: { status: 'active', correlations: 127, insights: 89 }
    });

    // Simulate predictions
    setPredictions([
      { metric: 'Glucose Level', value: 142, timeframe: 'Next hour', confidence: 0.89, trend: 'stable' },
      { metric: 'Hypoglycemia Risk', value: 0.12, timeframe: 'Next 24h', confidence: 0.85, trend: 'decreasing' },
      { metric: 'Insulin Sensitivity', value: 0.78, timeframe: 'Next week', confidence: 0.82, trend: 'improving' },
      { metric: 'Environmental Impact', value: 0.23, timeframe: 'Next 6h', confidence: 0.76, trend: 'stable' }
    ]);

    // Simulate learning status
    setLearningStatus({
      memoryUsage: { glucose: 2847, insulin: 1956, environmental: 1243, lifestyle: 892 },
      modelAccuracy: { glucose_prediction: 0.87, insulin_optimization: 0.82, risk_assessment: 0.89, pattern_detection: 0.85 },
      performanceTrend: 'improving',
      recentInsights: [
        'Neural network accuracy improved by 3.2% this week',
        'Environmental correlation patterns detected in 12 new regions',
        'Lifestyle factor analysis identified 5 new risk patterns',
        'Cross-modal analysis revealed 3 new device-medication interactions'
      ]
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">AI Insights Dashboard</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced artificial intelligence systems analyzing diabetes data with neural networks, 
            predictive analytics, and adaptive learning capabilities
          </p>
        </div>

        {/* AI System Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Neural Network</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-blue-600">87%</div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Active
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">Accuracy</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Ensemble Models</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-green-600">91%</div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  4 Active
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">Combined Accuracy</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Adaptive Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-purple-600">+15%</div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  High
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">Improvement Rate</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Cross Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-orange-600">127</div>
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  Active
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">Correlations Found</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="learning">Adaptive Learning</TabsTrigger>
            <TabsTrigger value="patterns">Pattern Detection</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="research">Research Models</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Capabilities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Cpu className="h-5 w-5 mr-2 text-blue-600" />
                    AI Capabilities
                  </CardTitle>
                  <CardDescription>
                    Advanced machine learning systems analyzing diabetes data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Neural Networks</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Predictive Analytics</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Time Series Analysis</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Cross-Modal Learning</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Adaptive Weights</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* System Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
                    System Performance
                  </CardTitle>
                  <CardDescription>
                    Real-time performance metrics and accuracy scores
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Accuracy</span>
                      <span>89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Learning Rate</span>
                      <span>0.015</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Data Processing</span>
                      <span>2.4K/s</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Model Convergence</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Real-time AI Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-purple-600" />
                  Real-time AI Activity
                </CardTitle>
                <CardDescription>
                  Live monitoring of AI systems and data processing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">2847</div>
                    <div className="text-sm text-gray-600">Glucose Readings</div>
                    <div className="text-xs text-green-600 mt-1">+127 today</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">1956</div>
                    <div className="text-sm text-gray-600">Insulin Doses</div>
                    <div className="text-xs text-green-600 mt-1">+89 today</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">89</div>
                    <div className="text-sm text-gray-600">New Insights</div>
                    <div className="text-xs text-green-600 mt-1">+12 today</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Predictions Tab */}
          <TabsContent value="predictions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Predictions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-blue-600" />
                    Current Predictions
                  </CardTitle>
                  <CardDescription>
                    AI-generated forecasts and predictions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {predictions.map((prediction, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{prediction.metric}</span>
                        <Badge variant={prediction.trend === 'improving' ? 'default' : 'secondary'}>
                          {prediction.trend}
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {prediction.value}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {prediction.timeframe}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Confidence</span>
                        <span className="text-sm font-medium">
                          {(prediction.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Prediction Methods */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Network className="h-5 w-5 mr-2 text-green-600" />
                    Prediction Methods
                  </CardTitle>
                  <CardDescription>
                    Ensemble of AI models used for predictions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Neural Network</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={87} className="w-20 h-2" />
                        <span className="text-sm text-gray-600">87%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Exponential Smoothing</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={82} className="w-20 h-2" />
                        <span className="text-sm text-gray-600">82%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">ARIMA-like</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={79} className="w-20 h-2" />
                        <span className="text-sm text-gray-600">79%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Seasonal Decomposition</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={85} className="w-20 h-2" />
                        <span className="text-sm text-gray-600">85%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Prediction Accuracy Over Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                  Prediction Accuracy Over Time
                </CardTitle>
                <CardDescription>
                  Historical performance of AI prediction models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center text-gray-500">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                    <p>Prediction accuracy charts</p>
                    <p className="text-sm">Real-time visualization of model performance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Adaptive Learning Tab */}
          <TabsContent value="learning" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Learning Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-purple-600" />
                    Learning Status
                  </CardTitle>
                  <CardDescription>
                    Current state of adaptive learning systems
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Learning Rate</span>
                    <span className="text-sm font-bold text-purple-600">0.015</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Adaptation Level</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      High
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Memory Usage</span>
                    <span className="text-sm font-bold text-blue-600">6.9K entries</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Performance Trend</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      Improving
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Memory Systems */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="h-5 w-5 mr-2 text-blue-600" />
                    Memory Systems
                  </CardTitle>
                  <CardDescription>
                    Data storage and learning memory usage
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {learningStatus && Object.entries(learningStatus.memoryUsage).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{key}</span>
                        <span className="font-medium">{value as number}</span>
                      </div>
                      <Progress value={(value as number) / 3000 * 100} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Learning Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                  Recent Learning Insights
                </CardTitle>
                <CardDescription>
                  Key discoveries and improvements from adaptive learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {learningStatus?.recentInsights.map((insight: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pattern Detection Tab */}
          <TabsContent value="patterns" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Detected Patterns */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="h-5 w-5 mr-2 text-green-600" />
                    Detected Patterns
                  </CardTitle>
                  <CardDescription>
                    AI-identified patterns in diabetes data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium text-sm mb-1">Circadian Glucose Pattern</div>
                      <div className="text-xs text-gray-600 mb-2">Detected in 89% of users</div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        High Confidence
                      </Badge>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium text-sm mb-1">Exercise-Insulin Correlation</div>
                      <div className="text-xs text-gray-600 mb-2">Detected in 76% of users</div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        Medium Confidence
                      </Badge>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium text-sm mb-1">Environmental Impact</div>
                      <div className="text-xs text-gray-600 mb-2">Detected in 64% of users</div>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        Medium Confidence
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pattern Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                    Pattern Analysis
                  </CardTitle>
                  <CardDescription>
                    Statistical analysis of detected patterns
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Temporal Patterns</span>
                      <span className="text-sm font-bold text-green-600">94%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Spatial Patterns</span>
                      <span className="text-sm font-bold text-blue-600">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Behavioral Patterns</span>
                      <span className="text-sm font-bold text-purple-600">82%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Environmental Patterns</span>
                      <span className="text-sm font-bold text-orange-600">76%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pattern Visualization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                  Pattern Visualization
                </CardTitle>
                <CardDescription>
                  Visual representation of detected patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center text-gray-500">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                    <p>Pattern visualization charts</p>
                    <p className="text-sm">Interactive charts showing temporal and spatial patterns</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Key Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                    Key AI Insights
                  </CardTitle>
                  <CardDescription>
                    Most significant discoveries from AI analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>High Confidence:</strong> Morning glucose spikes correlate strongly with 
                      overnight insulin absorption patterns in 87% of users.
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Medium Confidence:</strong> Exercise timing significantly affects 
                      insulin sensitivity, with optimal windows identified.
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>New Pattern:</strong> Environmental temperature changes show 
                      correlation with glucose variability in 64% of cases.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Insight Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-blue-600" />
                    Insight Categories
                  </CardTitle>
                  <CardDescription>
                    Distribution of insights by type and confidence
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">High Confidence (90%+)</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        23 insights
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Medium Confidence (70-89%)</span>
                      <Badge variant="default" className="bg-blue-100 text-blue-800">
                        41 insights
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Low Confidence (50-69%)</span>
                      <Badge variant="default" className="bg-yellow-100 text-yellow-800">
                        25 insights
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">New Patterns</span>
                      <Badge variant="default" className="bg-purple-100 text-purple-800">
                        12 patterns
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Methodology Explanation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2 text-gray-600" />
                  AI Methodology & Confidence
                </CardTitle>
                <CardDescription>
                  How AI determines insights and calculates confidence levels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Data Quality Factors</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Sample size and statistical power</li>
                      <li>• Data consistency and completeness</li>
                      <li>• Temporal and spatial coverage</li>
                      <li>• Cross-validation results</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Model Performance</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Prediction accuracy metrics</li>
                      <li>• Ensemble model agreement</li>
                      <li>• Learning rate and convergence</li>
                      <li>• Historical performance trends</li>
                    </ul>
                  </div>
                </div>
                <Separator />
                <div className="text-sm text-gray-600">
                  <strong>Confidence Calculation:</strong> AI combines data quality scores, 
                  model performance metrics, and cross-validation results to determine 
                  confidence levels. High confidence (90%+) indicates strong statistical 
                  evidence, while lower confidence suggests areas needing more data or 
                  different analysis approaches.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Research Models Tab */}
          <TabsContent value="research" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Advanced AI Research Models</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Cutting-edge AI research models implementing sophisticated algorithms for diabetes information discovery,
                including knowledge graphs, multimodal alignment, causal inference, and advanced pattern recognition.
              </p>
            </div>

            {/* Model Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Knowledge Graph Model */}
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-sm">
                    <Network className="h-5 w-5 mr-2 text-blue-600" />
                    Knowledge Graph
                  </CardTitle>
                  <CardDescription>Heterogeneous entity resolution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Status</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Entities</span>
                      <span className="text-sm font-medium">2,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Relations</span>
                      <span className="text-sm font-medium">15,392</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">New Insights</span>
                      <span className="text-sm font-medium">23</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Multimodal Alignment */}
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-sm">
                    <Eye className="h-5 w-5 mr-2 text-green-600" />
                    Multimodal Alignment
                  </CardTitle>
                  <CardDescription>Text ↔ Timeseries correlation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Status</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Alignments</span>
                      <span className="text-sm font-medium">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Confidence</span>
                      <span className="text-sm font-medium">87%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">New Patterns</span>
                      <span className="text-sm font-medium">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Temporal Hypergraphs */}
              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-sm">
                    <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                    Temporal Hypergraphs
                  </CardTitle>
                  <CardDescription>Event bundle discovery</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Status</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Hyperedges</span>
                      <span className="text-sm font-medium">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Time Windows</span>
                      <span className="text-sm font-medium">24h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Event Bundles</span>
                      <span className="text-sm font-medium">34</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Causal Effects */}
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-sm">
                    <Target className="h-5 w-5 mr-2 text-orange-600" />
                    Causal Effects
                  </CardTitle>
                  <CardDescription>Intervention outcome analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Status</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Effects</span>
                      <span className="text-sm font-medium">67</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Confidence</span>
                      <span className="text-sm font-medium">82%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Cohorts</span>
                      <span className="text-sm font-medium">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Change Point Detection */}
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-sm">
                    <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                    Change Detection
                  </CardTitle>
                  <CardDescription>Anomaly & uncertainty</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Status</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Change Points</span>
                      <span className="text-sm font-medium">45</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Uncertainty</span>
                      <span className="text-sm font-medium">Low</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Algorithms</span>
                      <span className="text-sm font-medium">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Safety Signals */}
              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-sm">
                    <Shield className="h-5 w-5 mr-2 text-yellow-600" />
                    Safety Signals
                  </CardTitle>
                  <CardDescription>Community text mining</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Status</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Signals</span>
                      <span className="text-sm font-medium">23</span>
                      </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Devices</span>
                      <span className="text-sm font-medium">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Confidence</span>
                      <span className="text-sm font-medium">79%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Model Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Model Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                    Model Performance Metrics
                  </CardTitle>
                  <CardDescription>
                    Real-time performance of advanced AI research models
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Knowledge Graph Accuracy</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={89} className="w-20" />
                        <span className="text-sm font-medium">89%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Multimodal Alignment</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={87} className="w-20" />
                        <span className="text-sm font-medium">87%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Causal Inference</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={82} className="w-20" />
                        <span className="text-sm font-medium">82%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Anomaly Detection</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={91} className="w-20" />
                        <span className="text-sm font-medium">91%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Research Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-purple-600" />
                    Latest Research Insights
                  </CardTitle>
                  <CardDescription>
                    Discoveries from advanced AI research models
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>High Confidence:</strong> New causal relationship discovered between 
                        device firmware updates and sensor accuracy improvements.
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Multimodal Discovery:</strong> Text sentiment analysis aligned with 
                        glucose variability patterns reveals emotional stress impact.
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Safety Signal:</strong> Temporal hypergraph analysis identified 
                        correlation between adhesive batch changes and skin irritation reports.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Model Capabilities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Cpu className="h-5 w-5 mr-2 text-gray-600" />
                  Advanced AI Research Model Capabilities
                </CardTitle>
                <CardDescription>
                  Comprehensive overview of the 12 sophisticated AI models implemented
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-gray-900">Core Research Models</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span><strong>Heterogeneous Knowledge Graph:</strong> Entity resolution and link prediction using Relational GAT</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span><strong>Multimodal Contrastive Alignment:</strong> Text-timeseries alignment with InfoNCE loss</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span><strong>Temporal Hypergraph Discovery:</strong> Many-to-many event bundle analysis</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span><strong>Causal Effect Estimation:</strong> Uplift forests, synthetic controls, temporal causality</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span><strong>Change Point Detection:</strong> BOCPD, RuLSIF, matrix profile with uncertainty</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span><strong>Weak Supervision:</strong> Programmatic labeling with Snorkel-style aggregation</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-gray-900">Advanced Analytics</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Topic-Event Dynamics:</strong> Dynamic topic models and Hawkes processes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Safety Signal Mining:</strong> PRR/ROR disproportionality analysis</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Trial-Real World Alignment:</strong> Semantic mapping and hypergraph co-support</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Optimal Transport:</strong> Event matching with minimal assumptions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Tensor Factorization:</strong> CP/Tucker decomposition with sparsity</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Label Propagation:</strong> Graph-based semi-supervised learning</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <Separator />
                <div className="text-sm text-gray-600">
                  <strong>Research Focus:</strong> These models integrate signals from news, forums, device makers, 
                  research, trials, and regulatory updates into one reasoning space. They surface patterns between 
                  device updates, lived-experience issues, and outcomes, generating testable hypotheses with 
                  uncertainty quantification for validation against established datasets.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Zap className="h-4 w-4 mr-2" />
            Run AI Analysis
          </Button>
          <Button variant="outline">
            <Activity className="h-4 w-4 mr-2" />
            View System Logs
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configure AI
          </Button>
        </div>
      </div>
    </div>
  );
}
