'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';import { safeNumberFormat, safeDateFormat, safeTimeFormat, safeDateOnlyFormat } from "@/lib/utils";

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
  Settings,
  Search,
  Filter,
  MapPin,
  Users,
  MessageSquare,
  TrendingDown,
  Activity as ActivityIcon,
  Thermometer,
  Leaf,
  Droplets,
  Sun,
  Moon,
  Star,
  Heart,
  Brain as BrainIcon,
  Zap as ZapIcon,
  Target as TargetIcon,
  Globe as GlobeIcon
} from 'lucide-react';

export default function AdvancedCorrelationDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  // Mock data for demonstration - in real app, this would come from the correlation detection systems
  const correlationInsights = [
    {
      id: 'lemon_confusion_relief',
      pattern: 'Lemon for Hypoglycemic Confusion Relief',
      description: 'Sucking on a lemon during low blood sugar episodes appears to help reduce confusion by improving electrolyte balance and oxygen delivery to the brain.',
      confidence: 0.82,
      evidence: {
        socialMediaPosts: 156,
        platforms: ['reddit', 'twitter', 'facebook', 'instagram'],
        geographicDistribution: [
          { region: 'Mediterranean', count: 67 },
          { region: 'North America', count: 45 },
          { region: 'Europe', count: 34 }
        ],
        temporalTrend: [
          { period: 'recent_6_months', trend: 'increasing' },
          { period: 'last_year', trend: 'stable' }
        ],
        userDemographics: [
          { ageGroup: '25-45', gender: 'mixed', diabetesType: 'type1' }
        ]
      },
      scientificCorrelation: {
        researchPapers: 3,
        clinicalTrials: 1,
        patientStudies: 2,
        mechanism: 'Citric acid stimulates saliva production and may improve electrolyte balance, while the sour taste triggers alertness responses.',
        evidenceLevel: 'emerging'
      },
      actionableInsights: [
        'Lemon consumption shows promise for hypoglycemic confusion relief',
        'Multiple platforms and geographic regions report similar experiences',
        'Citric acid and electrolyte balance may be key mechanisms'
      ],
      riskFactors: ['Citrus allergies', 'Acid reflux', 'Dental sensitivity'],
      benefits: ['Rapid confusion relief', 'Natural remedy', 'No additional glucose intake'],
      recommendations: [
        'Keep fresh lemons available during activities',
        'Monitor individual effectiveness',
        'Consider lemon-flavored alternatives if needed'
      ],
      timestamp: new Date(),
      correlationStrength: 0.78,
      type: 'lifestyle'
    },
    {
      id: 'cinnamon_glucose_stabilization',
      pattern: 'Cinnamon for Blood Sugar Stabilization',
      description: 'Regular cinnamon consumption shows correlation with improved glucose stability and reduced post-meal spikes.',
      confidence: 0.74,
      evidence: {
        socialMediaPosts: 234,
        platforms: ['facebook', 'instagram', 'reddit', 'twitter'],
        geographicDistribution: [
          { region: 'South Asia', count: 89 },
          { region: 'Middle East', count: 67 },
          { region: 'North America', count: 45 }
        ],
        temporalTrend: [
          { period: 'recent_3_months', trend: 'increasing' }
        ],
        userDemographics: [
          { ageGroup: '30-50', gender: 'mixed', diabetesType: 'type1' }
        ]
      },
      scientificCorrelation: {
        researchPapers: 5,
        clinicalTrials: 2,
        patientStudies: 3,
        mechanism: 'Cinnamon contains compounds that may improve insulin sensitivity and slow glucose absorption.',
        evidenceLevel: 'emerging'
      },
      actionableInsights: [
        'Cinnamon shows potential for blood sugar stabilization',
        'Multiple research studies support the correlation',
        'May improve insulin sensitivity'
      ],
      riskFactors: ['Liver conditions', 'Blood thinning medications'],
      benefits: ['Improved glucose stability', 'Natural supplement', 'Potential cardiovascular benefits'],
      recommendations: [
        'Consider 1-2g daily cinnamon supplementation',
        'Monitor glucose response patterns',
        'Consult healthcare provider before starting'
      ],
      timestamp: new Date(),
      correlationStrength: 0.71,
      type: 'lifestyle'
    },
    {
      id: 'cold_exposure_insulin_sensitivity',
      pattern: 'Cold Exposure Therapy for Insulin Sensitivity',
      description: 'Regular cold exposure (cold showers, ice baths) correlates with improved insulin sensitivity and glucose control.',
      confidence: 0.68,
      evidence: {
        socialMediaPosts: 145,
        platforms: ['instagram', 'tiktok', 'reddit', 'youtube'],
        geographicDistribution: [
          { region: 'Northern Europe', count: 56 },
          { region: 'Canada', count: 34 },
          { region: 'North America', count: 23 }
        ],
        temporalTrend: [
          { period: 'recent_year', trend: 'increasing' }
        ],
        userDemographics: [
          { ageGroup: '20-40', gender: 'mixed', diabetesType: 'type1' }
        ]
      },
      scientificCorrelation: {
        researchPapers: 4,
        clinicalTrials: 1,
        patientStudies: 2,
        mechanism: 'Cold exposure activates brown fat tissue, which burns glucose and may improve insulin sensitivity.',
        evidenceLevel: 'emerging'
      },
      actionableInsights: [
        'Cold exposure therapy shows promise for insulin sensitivity',
        'May activate brown fat tissue for glucose metabolism',
        'Requires gradual adaptation and monitoring'
      ],
      riskFactors: ['Heart conditions', 'Cold intolerance', 'Raynaud\'s phenomenon'],
      benefits: ['Improved insulin sensitivity', 'Enhanced metabolism', 'Potential weight management'],
      recommendations: [
        'Start with cold showers (30-60 seconds)',
        'Gradually increase exposure time',
        'Monitor glucose response and consult healthcare provider'
      ],
      timestamp: new Date(),
      correlationStrength: 0.65,
      type: 'lifestyle'
    }
  ];

  const emergingTrends = [
    {
      keyword: 'intermittent fasting',
      frequency: 89,
      growthRate: 2.3,
      platforms: ['reddit', 'instagram', 'youtube'],
      geographicHotspots: ['North America', 'Europe', 'Australia'],
      associatedSymptoms: ['glucose control issues', 'insulin resistance'],
      associatedTreatments: ['timing', 'meal planning'],
      sentimentTrend: 'improving' as const,
      scientificBacking: 'emerging' as const,
      patientReports: 89,
      firstMentioned: new Date('2024-01-01'),
      lastMentioned: new Date()
    },
    {
      keyword: 'keto diet',
      frequency: 156,
      growthRate: 1.8,
      platforms: ['facebook', 'reddit', 'instagram'],
      geographicHotspots: ['North America', 'Europe'],
      associatedSymptoms: ['glucose spikes', 'weight management'],
      associatedTreatments: ['diet modification', 'carb counting'],
      sentimentTrend: 'stable' as const,
      scientificBacking: 'established' as const,
      patientReports: 156,
      firstMentioned: new Date('2023-06-01'),
      lastMentioned: new Date()
    }
  ];

  const platformStats = [
    { platform: 'reddit', postCount: 234, engagement: 15600 },
    { platform: 'instagram', postCount: 189, engagement: 23400 },
    { platform: 'facebook', postCount: 156, engagement: 18900 },
    { platform: 'twitter', postCount: 98, engagement: 12300 },
    { platform: 'tiktok', postCount: 67, engagement: 8900 },
    { platform: 'youtube', postCount: 45, engagement: 6700 }
  ];

  const filteredInsights = correlationInsights.filter(insight =>
    insight.pattern.toLowerCase().includes(searchQuery.toLowerCase()) ||
    insight.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-500';
    if (confidence >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getEvidenceLevelColor = (level: string) => {
    switch (level) {
      case 'established': return 'bg-green-100 text-green-800';
      case 'validated': return 'bg-blue-100 text-blue-800';
      case 'emerging': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <ActivityIcon className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🧠 Advanced Correlation Detection Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover emerging patterns, social media correlations, and scientific insights 
            using advanced AI models and research concepts
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search correlations, symptoms, treatments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <MapPin className="w-4 h-4 mr-2" />
                {selectedRegion === 'all' ? 'All Regions' : selectedRegion}
              </Button>
              <Button variant="outline" size="sm">
                <Clock className="w-4 h-4 mr-2" />
                {selectedTimeframe === '7d' ? '7 Days' : selectedTimeframe}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-lg">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="correlations" className="flex items-center gap-2">
              <Network className="w-4 h-4" />
              Correlations
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Social Media
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              AI Models
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Correlations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{correlationInsights.length}</div>
                  <p className="text-blue-100 text-sm">Active patterns detected</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Social Media Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">535</div>
                  <p className="text-green-100 text-sm">Analyzed posts</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Emerging Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{emergingTrends.length}</div>
                  <p className="text-purple-100 text-sm">New patterns</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">AI Confidence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">78%</div>
                  <p className="text-orange-100 text-sm">Average confidence</p>
                </CardContent>
              </Card>
            </div>

            {/* Featured Correlation - Lemon Example */}
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <Leaf className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-orange-800">
                      🍋 Featured Discovery: Lemon for Hypoglycemic Confusion Relief
                    </CardTitle>
                    <CardDescription className="text-orange-700">
                      Advanced AI correlation detection found this pattern across multiple platforms and regions
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-orange-800">
                  {correlationInsights[0].description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Evidence Strength</h4>
                    <div className="flex items-center gap-2">
                      <Progress value={correlationInsights[0].confidence * 100} className="flex-1" />
                      <span className="text-sm font-medium">
                        {Math.round(correlationInsights[0].confidence * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Geographic Reach</h4>
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-500" />
                      <span className="text-sm">
                        {correlationInsights[0].evidence.geographicDistribution.length} regions
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Platform Coverage</h4>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-green-500" />
                      <span className="text-sm">
                        {correlationInsights[0].evidence.platforms.length} platforms
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">Scientific Mechanism</h4>
                  <p className="text-gray-700 mb-3">
                    {correlationInsights[0].scientificCorrelation.mechanism}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <Badge variant="secondary">
                      {correlationInsights[0].scientificCorrelation.researchPapers} Research Papers
                    </Badge>
                    <Badge variant="secondary">
                      {correlationInsights[0].scientificCorrelation.clinicalTrials} Clinical Trials
                    </Badge>
                    <Badge variant="secondary">
                      {correlationInsights[0].scientificCorrelation.patientStudies} Patient Studies
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Benefits</h4>
                    <ul className="space-y-1">
                      {correlationInsights[0].benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Recommendations</h4>
                    <ul className="space-y-1">
                      {correlationInsights[0].recommendations.map((rec, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <Lightbulb className="w-4 h-4 text-yellow-500" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Correlations Tab */}
          <TabsContent value="correlations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredInsights.map((insight) => (
                <Card key={insight.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{insight.pattern}</CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getConfidenceColor(insight.confidence)}>
                            {Math.round(insight.confidence * 100)}% Confidence
                          </Badge>
                          <Badge variant="outline">{insight.type}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{insight.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Social Posts:</span> {insight.evidence.socialMediaPosts}
                      </div>
                      <div>
                        <span className="font-medium">Platforms:</span> {insight.evidence.platforms.length}
                      </div>
                      <div>
                        <span className="font-medium">Regions:</span> {insight.evidence.geographicDistribution.length}
                      </div>
                      <div>
                        <span className="font-medium">Research Papers:</span> {insight.scientificCorrelation.researchPapers}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Key Benefits:</h5>
                      <div className="flex flex-wrap gap-1">
                        {insight.benefits.slice(0, 3).map((benefit, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      View Full Analysis
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {emergingTrends.map((trend, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{trend.keyword}</CardTitle>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(trend.sentimentTrend)}
                        <Badge className={getEvidenceLevelColor(trend.scientificBacking)}>
                          {trend.scientificBacking}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Frequency:</span> {trend.frequency}
                      </div>
                      <div>
                        <span className="font-medium">Growth Rate:</span> {trend.growthRate}x
                      </div>
                      <div>
                        <span className="font-medium">Platforms:</span> {trend.platforms.length}
                      </div>
                      <div>
                        <span className="font-medium">Patient Reports:</span> {trend.patientReports}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-sm mb-2">Associated Symptoms:</h5>
                      <div className="flex flex-wrap gap-1">
                        {trend.associatedSymptoms.map((symptom, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-sm mb-2">Geographic Hotspots:</h5>
                      <div className="flex flex-wrap gap-1">
                        {trend.geographicHotspots.map((region, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            <MapPin className="w-3 h-3 mr-1" />
                            {region}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      Track Trend
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Social Media Tab */}
          <TabsContent value="social" className="space-y-6">
            {/* Platform Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Social Media Platform Analysis
                </CardTitle>
                <CardDescription>
                  Engagement and post distribution across different platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {platformStats.map((platform, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-lg capitalize mb-2">{platform.platform}</h4>
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {platform.postCount}
                      </div>
                      <p className="text-sm text-gray-600">Posts</p>
                      <div className="text-lg font-semibold text-green-600 mt-2">
                        {safeNumberFormat(platform.engagement)}
                      </div>
                      <p className="text-sm text-gray-600">Total Engagement</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Geographic Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Geographic Pattern Analysis
                </CardTitle>
                <CardDescription>
                  Where correlations are being discovered and discussed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Top Regions by Activity</h4>
                    <div className="space-y-3">
                      {['North America', 'Europe', 'Asia', 'Australia'].map((region, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{region}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={80 - index * 15} className="w-20" />
                            <span className="text-sm font-medium">{80 - index * 15}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Emerging Markets</h4>
                    <div className="space-y-2">
                      {['South America', 'Africa', 'Middle East'].map((region, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span>{region}</span>
                          <Badge variant="outline" className="ml-auto">
                            +{(index + 1) * 15}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Models Tab */}
          <TabsContent value="ai" className="space-y-6">
            {/* AI Model Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Neural Network Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Glucose Prediction Accuracy</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} className="w-full" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Pattern Recognition</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="w-full" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Correlation Detection</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="w-full" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Adaptive Learning Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Learning Rate</span>
                      <span>0.15</span>
                    </div>
                    <Progress value={15} className="w-full" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Memory Usage</span>
                      <span>67%</span>
                    </div>
                    <Progress value={67} className="w-full" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Adaptation Speed</span>
                      <span>84%</span>
                    </div>
                    <Progress value={84} className="w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Research AI Concepts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  Advanced AI Research Concepts
                </CardTitle>
                <CardDescription>
                  Implementation of cutting-edge research AI methodologies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Persistent Topological Knowledge Graphs</h4>
                      <p className="text-sm text-blue-700">
                        Stable connections between diabetes factors maintained across time and data updates
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Multi-Modal Hypergraph Discovery</h4>
                      <p className="text-sm text-green-700">
                        Complex multi-dimensional relationships between symptoms, treatments, and environmental factors
                      </p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Physics-Informed Neural Models</h4>
                      <p className="text-sm text-purple-700">
                        Biological constraints applied to neural networks for physiologically accurate predictions
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">Quantum-Inspired Pattern Discovery</h4>
                      <p className="text-sm text-orange-700">
                        Superposition and entanglement concepts applied to symptom correlation analysis
                      </p>
                    </div>
                    
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">Continual Contrastive Learning</h4>
                      <p className="text-sm text-red-700">
                        Continuous improvement through positive/negative example comparison
                      </p>
                    </div>
                    
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <h4 className="font-semibold text-indigo-800 mb-2">Information-Theoretic Mining</h4>
                      <p className="text-sm text-indigo-700">
                        Entropy and mutual information analysis for optimal pattern compression
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
