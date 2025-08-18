'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Globe, Database, Newspaper, Users, Monitor, BookOpen, MapPin, Play, Square, Clock, AlertCircle } from 'lucide-react';
import { safeNumberFormat, safeDateFormat, safeTimeFormat, safeDateOnlyFormat } from "@/lib/utils";

interface RSSFeed {
  name: string;
  rss: string;
  json: string;
  category: 'diabetes' | 'medical' | 'research' | 'lifestyle' | 'technology' | 'regional' | 'general';
  priority: 'high' | 'medium' | 'low';
  lastFetched?: Date;
  status: 'active' | 'inactive' | 'error';
}

interface RSSFeedStatus {
  total: number;
  active: number;
  error: number;
  lastUpdated: Date | null;
}

interface AutoRefreshStatus {
  isActive: boolean;
  intervalMinutes: number;
  lastAutoRefresh: Date | null;
  nextScheduledRefresh: Date | null;
  totalAutoRefreshes: number;
  lastError: string | null;
}

interface ComprehensiveStatus {
  feeds: RSSFeedStatus;
  autoRefresh: AutoRefreshStatus;
  cache: { totalFeeds: number; totalItems: number };
}

export default function RSSFeedDashboard() {
  const [feedStatus, setFeedStatus] = useState<RSSFeedStatus>({ total: 0, active: 0, error: 0, lastUpdated: null });
  const [feedsByCategory, setFeedsByCategory] = useState<{ [key: string]: RSSFeed[] }>({});
  const [feedsByPriority, setFeedsByPriority] = useState<{ [key: string]: RSSFeed[] }>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [autoRefreshStatus, setAutoRefreshStatus] = useState<AutoRefreshStatus>({
    isActive: false,
    intervalMinutes: 60,
    lastAutoRefresh: null,
    nextScheduledRefresh: null,
    totalAutoRefreshes: 0,
    lastError: null
  });
  const [cacheStats, setCacheStats] = useState({ totalFeeds: 0, totalItems: 0 });

  useEffect(() => {
    // Simulate RSS feed status and data for demonstration
    setFeedStatus({
      total: 150, // Updated total count with new feeds
      active: 145,
      error: 5,
      lastUpdated: new Date()
    });

    // Mock auto-refresh status
    setAutoRefreshStatus({
      isActive: true,
      intervalMinutes: 60,
      lastAutoRefresh: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      nextScheduledRefresh: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
      totalAutoRefreshes: 24,
      lastError: null
    });

    setCacheStats({
      totalFeeds: 145,
      totalItems: 2847
    });

    // Mock feeds by category
    setFeedsByCategory({
      diabetes: [
        { name: 'r/Type1Diabetes', rss: 'https://www.reddit.com/r/Type1Diabetes/.rss', json: 'https://www.reddit.com/r/Type1Diabetes.json', category: 'diabetes', priority: 'high', status: 'active' },
        { name: 'r/diabetes', rss: 'https://www.reddit.com/r/diabetes/.rss', json: 'https://www.reddit.com/r/diabetes.json', category: 'diabetes', priority: 'high', status: 'active' },
        { name: 'r/diabetes_t1', rss: 'https://www.reddit.com/r/diabetes_t1/.rss', json: 'https://www.reddit.com/r/diabetes_t1.json', category: 'diabetes', priority: 'high', status: 'active' },
        { name: 'r/diabetes_t2', rss: 'https://www.reddit.com/r/diabetes_t2/.rss', json: 'https://www.reddit.com/r/diabetes_t2.json', category: 'diabetes', priority: 'high', status: 'active' },
        { name: 'ADA Blog', rss: 'https://www.diabetes.org/rss/blog', json: '', category: 'diabetes', priority: 'high', status: 'active' },
        { name: 'JDRF News', rss: 'https://www.jdrf.org/feed', json: '', category: 'diabetes', priority: 'high', status: 'active' }
      ],
      technology: [
        { name: 'Dexcom Newsroom', rss: 'https://www.dexcom.com/newsroom/rss', json: '', category: 'technology', priority: 'high', status: 'active' },
        { name: 'Omnipod RSS', rss: 'https://www.omnipod.com/rss', json: '', category: 'technology', priority: 'high', status: 'active' },
        { name: 'Medtronic Diabetes Blog', rss: 'https://www.medtronicdiabetes.com/blog/feed', json: '', category: 'technology', priority: 'high', status: 'active' },
        { name: 'Tandem Diabetes RSS', rss: 'https://www.tandemdiabetes.com/rss', json: '', category: 'technology', priority: 'high', status: 'active' },
        { name: 'r/dexcom', rss: 'https://www.reddit.com/r/dexcom/.rss', json: 'https://www.reddit.com/r/dexcom.json', category: 'technology', priority: 'high', status: 'active' },
        { name: 'r/Omnipod', rss: 'https://www.reddit.com/r/Omnipod/.rss', json: 'https://www.reddit.com/r/Omnipod.json', category: 'technology', priority: 'high', status: 'active' }
      ],
      research: [
        { name: 'ADA Diabetes Care', rss: 'https://diabetesjournals.org/rss/care.xml', json: '', category: 'research', priority: 'high', status: 'active' },
        { name: 'ADA Emerging Treatments', rss: 'https://diabetesjournals.org/rss/ettr.xml', json: '', category: 'research', priority: 'high', status: 'active' },
        { name: 'BMJ DRC Current Issue', rss: 'https://drc.bmj.com/rss/current.xml', json: '', category: 'research', priority: 'high', status: 'active' },
        { name: 'Lancet Diabetes Endocrinology', rss: 'https://www.thelancet.com/rssfeed/lancet/diabetes-endocrinology', json: '', category: 'research', priority: 'high', status: 'active' },
        { name: 'Endocrine Society RSS', rss: 'https://www.endocrine.org/rss', json: '', category: 'research', priority: 'high', status: 'active' }
      ],
      lifestyle: [
        { name: 'r/LowCarbDiabetic', rss: 'https://www.reddit.com/r/LowCarbDiabetic/.rss', json: 'https://www.reddit.com/r/LowCarbDiabetic.json', category: 'lifestyle', priority: 'high', status: 'active' },
        { name: 'r/KetoDiabetes', rss: 'https://www.reddit.com/r/KetoDiabetes/.rss', json: 'https://www.reddit.com/r/KetoDiabetes.json', category: 'lifestyle', priority: 'high', status: 'active' },
        { name: 'r/PlantBasedDiabetes', rss: 'https://www.reddit.com/r/PlantBasedDiabetes/.rss', json: 'https://www.reddit.com/r/PlantBasedDiabetes.json', category: 'lifestyle', priority: 'high', status: 'active' },
        { name: 'r/diabetesrecipes', rss: 'https://www.reddit.com/r/diabetesrecipes/.rss', json: 'https://www.reddit.com/r/diabetesrecipes.json', category: 'lifestyle', priority: 'high', status: 'active' },
        { name: 'r/diabetesfitness', rss: 'https://www.reddit.com/r/diabetesfitness/.rss', json: 'https://www.reddit.com/r/diabetesfitness.json', category: 'lifestyle', priority: 'high', status: 'active' }
      ],
      medical: [
        { name: 'r/Endocrinology', rss: 'https://www.reddit.com/r/Endocrinology/.rss', json: 'https://www.reddit.com/r/Endocrinology.json', category: 'medical', priority: 'medium', status: 'active' },
        { name: 'r/medicine', rss: 'https://www.reddit.com/r/medicine/.rss', json: 'https://www.reddit.com/r/medicine.json', category: 'medical', priority: 'medium', status: 'active' },
        { name: 'r/AskDocs', rss: 'https://www.reddit.com/r/AskDocs/.rss', json: 'https://www.reddit.com/r/AskDocs.json', category: 'medical', priority: 'medium', status: 'active' },
        { name: 'r/ClinicalResearch', rss: 'https://www.reddit.com/r/ClinicalResearch/.rss', json: 'https://www.reddit.com/r/ClinicalResearch.json', category: 'medical', priority: 'medium', status: 'active' }
      ],
      regional: [
        { name: 'r/diabetesUK', rss: 'https://www.reddit.com/r/diabetesUK/.rss', json: 'https://www.reddit.com/r/diabetesUK.json', category: 'regional', priority: 'medium', status: 'active' },
        { name: 'r/diabetesCanada', rss: 'https://www.reddit.com/r/diabetesCanada/.rss', json: 'https://www.reddit.com/r/diabetesCanada.json', category: 'regional', priority: 'medium', status: 'active' },
        { name: 'r/diabetes_Australia', rss: 'https://www.reddit.com/r/diabetes_Australia/.rss', json: 'https://www.reddit.com/r/diabetes_Australia.json', category: 'regional', priority: 'medium', status: 'active' },
        { name: 'r/diabetesIndia', rss: 'https://www.reddit.com/r/diabetesIndia/.rss', json: 'https://www.reddit.com/r/diabetesIndia.json', category: 'regional', priority: 'medium', status: 'active' }
      ]
    });

    // Mock feeds by priority
    setFeedsByPriority({
      high: [
        { name: 'r/Type1Diabetes', rss: 'https://www.reddit.com/r/Type1Diabetes/.rss', json: 'https://www.reddit.com/r/Type1Diabetes.json', category: 'diabetes', priority: 'high', status: 'active' },
        { name: 'r/dexcom', rss: 'https://www.reddit.com/r/dexcom/.rss', json: 'https://www.reddit.com/r/dexcom.json', category: 'technology', priority: 'high', status: 'active' },
        { name: 'ADA Blog', rss: 'https://www.diabetes.org/rss/blog', json: '', category: 'diabetes', priority: 'high', status: 'active' }
      ],
      medium: [
        { name: 'r/Endocrinology', rss: 'https://www.reddit.com/r/Endocrinology/.rss', json: 'https://www.reddit.com/r/Endocrinology.json', category: 'medical', priority: 'medium', status: 'active' },
        { name: 'r/diabetesUK', rss: 'https://www.reddit.com/r/diabetesUK/.rss', json: 'https://www.reddit.com/r/diabetesUK.json', category: 'regional', priority: 'medium', status: 'active' }
      ],
      low: [
        { name: 'Google News T1D Spanish', rss: 'https://news.google.com/rss/search?q=%22diabetes%20tipo%201%22&hl=es&gl=ES&ceid=ES:es', json: '', category: 'regional', priority: 'low', status: 'active' },
        { name: 'Google News T1D French', rss: 'https://news.google.com/rss/search?q=%22diab%C3%A8te%20de%20type%201%22&hl=fr&gl=FR&ceid=FR:fr', json: '', category: 'regional', priority: 'low', status: 'active' }
      ]
    });
  }, []);

  const generateData = async () => {
    setIsRefreshing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastRefresh(new Date());
    setIsRefreshing(false);
  };

  const refreshData = async () => {
    await generateData();
  };

  const handleStartAutoRefresh = () => {
    setAutoRefreshStatus(prev => ({
      ...prev,
      isActive: true,
      lastAutoRefresh: new Date(),
      nextScheduledRefresh: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
      totalAutoRefreshes: prev.totalAutoRefreshes + 1
    }));
  };

  const handleStopAutoRefresh = () => {
    setAutoRefreshStatus(prev => ({
      ...prev,
      isActive: false,
      nextScheduledRefresh: null
    }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'diabetes': return <Users className="h-4 w-4" />;
      case 'technology': return <Monitor className="h-4 w-4" />;
      case 'research': return <BookOpen className="h-4 w-4" />;
      case 'lifestyle': return <Globe className="h-4 w-4" />;
      case 'regional': return <MapPin className="h-4 w-4" />;
      case 'medical': return <Database className="h-4 w-4" />;
      case 'general': return <Newspaper className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📡 RSS Feed Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor and manage 150+ RSS feeds for diabetes information discovery</p>
        </div>
        <Button onClick={refreshData} disabled={isRefreshing} className="flex items-center gap-2">
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh All'}
        </Button>
      </div>

      {/* Auto-Refresh Status Card */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Clock className="h-5 w-5" />
            Auto-Refresh Status
          </CardTitle>
          <CardDescription>
            Automatic RSS feed refreshing every hour
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">
                {autoRefreshStatus.isActive ? '🟢 Active' : '🔴 Inactive'}
              </div>
              <div className="text-sm text-blue-700">Status</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">
                {autoRefreshStatus.intervalMinutes} min
              </div>
              <div className="text-sm text-blue-700">Interval</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">
                {autoRefreshStatus.totalAutoRefreshes}
              </div>
              <div className="text-sm text-blue-700">Total Refreshes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">
                {autoRefreshStatus.lastAutoRefresh ? safeDateFormat(autoRefreshStatus.lastAutoRefresh, { hour: '2-digit', minute: '2-digit' }) : 'Never'}
              </div>
              <div className="text-sm text-blue-700">Last Refresh</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              {autoRefreshStatus.nextScheduledRefresh && (
                <div className="text-sm text-blue-700">
                  <strong>Next scheduled refresh:</strong> {safeDateFormat(autoRefreshStatus.nextScheduledRefresh, { hour: '2-digit', minute: '2-digit' })}
                </div>
              )}
              {autoRefreshStatus.lastError && (
                <div className="text-sm text-red-700 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  <strong>Last error:</strong> {autoRefreshStatus.lastError}
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              {!autoRefreshStatus.isActive ? (
                <Button onClick={handleStartAutoRefresh} className="bg-green-600 hover:bg-green-700">
                  <Play className="h-4 w-4 mr-2" />
                  Start Auto-Refresh
                </Button>
              ) : (
                <Button onClick={handleStopAutoRefresh} variant="destructive">
                  <Square className="h-4 w-4 mr-2" />
                  Stop Auto-Refresh
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Feeds</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safeNumberFormat(feedStatus.total)}</div>
            <p className="text-xs text-muted-foreground">
              RSS sources configured
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Feeds</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{safeNumberFormat(feedStatus.active)}</div>
            <p className="text-xs text-muted-foreground">
              Successfully fetching
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cached Items</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safeNumberFormat(cacheStats.totalItems)}</div>
            <p className="text-xs text-muted-foreground">
              From {safeNumberFormat(cacheStats.totalFeeds)} feeds
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
              {feedStatus.lastUpdated ? safeDateFormat(feedStatus.lastUpdated, { hour: '2-digit', minute: '2-digit' }) : 'Never'}
            </div>
            <p className="text-xs text-muted-foreground">
              {feedStatus.lastUpdated ? safeDateFormat(feedStatus.lastUpdated, { month: 'short', day: 'numeric' }) : 'No data'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="by-category">By Category</TabsTrigger>
          <TabsTrigger value="by-priority">By Priority</TabsTrigger>
          <TabsTrigger value="status">Status</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feed Distribution</CardTitle>
              <CardDescription>Overview of RSS feeds by category and priority</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(feedsByCategory).map(([category, feeds]) => (
                <div key={category} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    {getCategoryIcon(category)}
                    <h3 className="font-semibold capitalize">{category}</h3>
                    <Badge variant="secondary">{feeds.length} feeds</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {feeds.slice(0, 6).map((feed) => (
                      <div key={feed.name} className="text-sm p-2 bg-gray-50 rounded border">
                        <div className="font-medium truncate">{feed.name}</div>
                        <div className="flex gap-1 mt-1">
                          <Badge className={`text-xs ${getPriorityColor(feed.priority)}`}>
                            {feed.priority}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(feed.status)}`}>
                            {feed.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    {feeds.length > 6 && (
                      <div className="text-sm text-gray-500 p-2">
                        +{feeds.length - 6} more feeds...
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* By Category Tab */}
        <TabsContent value="by-category" className="space-y-4">
          {Object.entries(feedsByCategory).map(([category, feeds]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getCategoryIcon(category)}
                  {category.charAt(0).toUpperCase() + category.slice(1)} Feeds
                  <Badge variant="secondary">{feeds.length}</Badge>
                </CardTitle>
                <CardDescription>
                  RSS feeds categorized as {category} with various priority levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {feeds.map((feed) => (
                    <div key={feed.name} className="border rounded-lg p-3 space-y-2">
                      <div className="font-medium text-sm">{feed.name}</div>
                      <div className="text-xs text-gray-500 break-all">{feed.rss}</div>
                      <div className="flex gap-1">
                        <Badge className={`text-xs ${getPriorityColor(feed.priority)}`}>
                          {feed.priority}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(feed.status)}`}>
                          {feed.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* By Priority Tab */}
        <TabsContent value="by-priority" className="space-y-4">
          {Object.entries(feedsByPriority).map(([priority, feeds]) => (
            <Card key={priority}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority Feeds
                  <Badge variant="secondary">{feeds.length}</Badge>
                </CardTitle>
                <CardDescription>
                  RSS feeds with {priority} priority level - {priority === 'high' ? 'fetched first' : priority === 'medium' ? 'fetched second' : 'fetched last'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {feeds.map((feed) => (
                    <div key={feed.name} className="border rounded-lg p-3 space-y-2">
                      <div className="font-medium text-sm">{feed.name}</div>
                      <div className="text-xs text-gray-500 capitalize">{feed.category}</div>
                      <div className="flex gap-1">
                        <Badge className={`text-xs ${getStatusColor(feed.status)}`}>
                          {feed.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Status Tab */}
        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feed Health Status</CardTitle>
              <CardDescription>Detailed status of all RSS feeds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">{feedStatus.active}</div>
                    <div className="text-sm text-green-700">Active Feeds</div>
                    <div className="text-xs text-green-600">Working normally</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-2xl font-bold text-red-600">{feedStatus.error}</div>
                    <div className="text-sm text-red-700">Error Feeds</div>
                    <div className="text-xs text-red-600">Needs attention</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-gray-600">{feedStatus.total - feedStatus.active - feedStatus.error}</div>
                    <div className="text-sm text-gray-700">Inactive Feeds</div>
                    <div className="text-xs text-gray-600">Not currently fetching</div>
                  </div>
                </div>
                
                <div className="text-center text-sm text-gray-600">
                  Overall system health: {feedStatus.total > 0 ? Math.round((feedStatus.active / feedStatus.total) * 100) : 0}%
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
