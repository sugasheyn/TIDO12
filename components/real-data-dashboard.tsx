"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Globe, Database, Newspaper, Users, Monitor, BookOpen, MapPin, Rss } from 'lucide-react';
import { safeNumberFormat, safeDateFormat, safeTimeFormat, safeDateOnlyFormat } from "@/lib/utils";

interface RealDataSource {
  id: string
  title: string
  description: string
  category: string
  platform: string
  verificationStatus: string
  biologicalPlausibility: string
  sourceUrl: string
  author: {
    id: string
    username: string
    reputation: number
  }
  timestamp: string
  engagementMetrics: {
    views: number
    likes: number
    shares: number
    comments: number
  }
  tags: string[]
  evidence: any[]
  relatedResearch: any[]
  [key: string]: any // For additional platform-specific fields
}

interface RealDataSummary {
  totalSources: number
  totalItems: number
  sourceBreakdown: Record<string, number>
  categoryBreakdown: Record<string, number>
  lastUpdated: string
  dataQuality: {
    verified: number
    community: number
    technology: number
  }
}

export default function RealDataDashboard() {
  const [data, setData] = useState<any>(null);
  const [summary, setSummary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [dataResponse, summaryResponse] = await Promise.all([
        fetch('/api/real-data'),
        fetch('/api/real-data?summary=true')
      ]);
      
      if (dataResponse.ok) {
        const dataResult = await dataResponse.json();
        setData(dataResult);
      }
      
      if (summaryResponse.ok) {
        const summaryResult = await summaryResponse.json();
        setSummary(summaryResult);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    setLastRefresh(new Date());
    await fetchData();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading real-time data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🔗 Real Data Dashboard</h1>
          <p className="text-gray-600 mt-2">Live data from multiple sources including RSS feeds</p>
        </div>
        <Button onClick={refreshData} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sources</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safeNumberFormat(summary?.overview?.totalSources || 0)}</div>
            <p className="text-xs text-muted-foreground">
              Data sources active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{safeNumberFormat(summary?.overview?.totalItems || 0)}</div>
            <p className="text-xs text-muted-foreground">
              Data items collected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RSS Feeds</CardTitle>
            <Rss className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{safeNumberFormat(summary?.rssInsights?.totalFeeds || 0)}</div>
            <p className="text-xs text-muted-foreground">
              Active RSS sources
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary?.lastUpdated ? safeDateFormat(summary.lastUpdated, { hour: '2-digit', minute: '2-digit' }) : 'Never'}
            </div>
            <p className="text-xs text-muted-foreground">
              {summary?.lastUpdated ? safeDateFormat(summary.lastUpdated, { month: 'short', day: 'numeric' }) : 'No data'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* RSS Insights Card */}
      {summary?.rssInsights && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Rss className="h-5 w-5" />
              RSS Feed Insights
            </CardTitle>
            <CardDescription>
              Real-time content from 150+ RSS sources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
              {Object.entries(summary.rssInsights.byCategory).map(([category, count]) => (
                <div key={category} className="text-center">
                  <div className="text-xl font-bold text-blue-900">
                    {safeNumberFormat(count as number)}
                  </div>
                  <div className="text-sm text-blue-700">{category}</div>
                </div>
              ))}
            </div>
            
            {summary.rssInsights.latestContent && summary.rssInsights.latestContent.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-blue-900 mb-2">Latest RSS Content:</h4>
                <div className="space-y-2">
                  {summary.rssInsights.latestContent.slice(0, 5).map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="text-xs text-gray-600">{item.source} • {safeDateFormat(item.timestamp)}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">📊 Overview</TabsTrigger>
          <TabsTrigger value="technology">🔧 Technology</TabsTrigger>
          <TabsTrigger value="research">🔬 Research</TabsTrigger>
          <TabsTrigger value="community">👥 Community</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Source Breakdown</CardTitle>
              <CardDescription>Items collected from each source</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {summary?.sourceBreakdown && Object.entries(summary.sourceBreakdown).map(([source, count]) => (
                  <div key={source} className="flex items-center justify-between">
                    <span className="font-medium">{source}</span>
                    <Badge variant="secondary">{safeNumberFormat(count as number)}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>Data organized by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {summary?.categoryBreakdown && Object.entries(summary.categoryBreakdown).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="font-medium">{category}</span>
                    <Badge variant="outline">{safeNumberFormat(count as number)}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technology" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Technology Data</CardTitle>
              <CardDescription>Latest technology and development updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data?.technology?.slice(0, 10).map((item: any, index: number) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="font-medium">{item.title || item.name}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {item.source || item.author} • {safeDateFormat(item.timestamp || item.created_at)}
                    </div>
                    {item.url && (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                        View Source →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="research" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Research Data</CardTitle>
              <CardDescription>Latest research and clinical trial information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data?.research?.slice(0, 10).map((item: any, index: number) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="font-medium">{item.title || item.name}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {item.source || item.author} • {safeDateFormat(item.timestamp || item.created_at)}
                    </div>
                    {item.url && (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                        View Source →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Community Data</CardTitle>
              <CardDescription>Community discussions and social media content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data?.community?.slice(0, 10).map((item: any, index: number) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="font-medium">{item.title || item.name}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {item.source || item.author} • {safeDateFormat(item.timestamp || item.created_at)}
                    </div>
                    {item.url && (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                        View Source →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {lastRefresh && (
        <div className="text-center text-sm text-gray-500">
          Last refreshed: {safeDateFormat(lastRefresh)}
        </div>
      )}
    </div>
  );
}
