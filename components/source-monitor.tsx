"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, Users, FileText, Clock, TrendingUp, MessageSquare, ExternalLink } from "lucide-react"
import Link from "next/link"

export function SourceMonitor() {
  const [realTimeData, setRealTimeData] = useState({
    totalSources: 6247,
    activeSources: 5983,
    postsToday: 12847,
    newDiscoveries: 7,
  })

  const [recentPosts, setRecentPosts] = useState([
    {
      id: "1",
      platform: "reddit",
      author: "NewT1D_2024",
      content:
        "Just diagnosed last week. Overwhelmed but this community gives me hope. Thank you all for sharing your experiences.",
      timestamp: "3 minutes ago",
      engagement: { likes: 23, comments: 8 },
      url: "https://reddit.com/r/Type1Diabetes/comments/new123",
      category: "experience",
    },
    {
      id: "2",
      platform: "twitter",
      author: "@DiabetesTech",
      content:
        "Breaking: FDA approves new hybrid closed-loop system. This could change everything for T1D management! 🎉",
      timestamp: "7 minutes ago",
      engagement: { likes: 156, comments: 34 },
      url: "https://twitter.com/DiabetesTech/status/latest",
      category: "breakthrough",
    },
    {
      id: "3",
      platform: "facebook",
      author: "T1D Parent Support",
      content:
        "PSA: School nurses - please don't tell our kids they 'look fine' when they feel low. Trust the CGM and the child.",
      timestamp: "12 minutes ago",
      engagement: { likes: 89, comments: 45 },
      url: "https://facebook.com/groups/t1dparents/posts/advocacy",
      category: "advocacy",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData((prev) => ({
        ...prev,
        postsToday: prev.postsToday + Math.floor(Math.random() * 3),
        activeSources: 5983 + Math.floor(Math.random() * 10) - 5,
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getPlatformIcon = (platform: string) => {
    const icons = {
      reddit: "🔴",
      twitter: "🐦",
      facebook: "📘",
      instagram: "📷",
    }
    return icons[platform as keyof typeof icons] || "🌐"
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      experience: "bg-blue-100 text-blue-800",
      breakthrough: "bg-emerald-100 text-emerald-800",
      advocacy: "bg-purple-100 text-purple-800",
      solution: "bg-green-100 text-green-800",
      symptom: "bg-red-100 text-red-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-8">
      {/* Real-time Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sources</p>
                <p className="text-2xl font-bold">{realTimeData.totalSources.toLocaleString()}</p>
              </div>
              <Database className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Sources</p>
                <p className="text-2xl font-bold text-emerald-600">{realTimeData.activeSources.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Posts Today</p>
                <p className="text-2xl font-bold text-purple-600">{realTimeData.postsToday.toLocaleString()}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Discoveries</p>
                <p className="text-2xl font-bold text-orange-600">{realTimeData.newDiscoveries}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Feed */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live Community Feed
              </CardTitle>
              <CardDescription>Real-time posts from the global T1D community</CardDescription>
            </div>
            <Link href="/discoveries">
              <Button variant="outline">
                View All Discoveries
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getPlatformIcon(post.platform)}</span>
                    <span className="font-medium">{post.author}</span>
                    <Badge className={getCategoryColor(post.category)} variant="secondary">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{post.content}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {post.engagement.likes} likes
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    {post.engagement.comments} comments
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Source Categories */}
      <Tabs defaultValue="social" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="industry">Industry</TabsTrigger>
          <TabsTrigger value="clinical">Clinical</TabsTrigger>
        </TabsList>

        <TabsContent value="social" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { platform: "Reddit", communities: 127, active: 124, posts: 3247 },
              { platform: "Twitter/X", accounts: 89, active: 87, posts: 5632 },
              { platform: "Facebook", groups: 156, active: 151, posts: 2891 },
              { platform: "Instagram", accounts: 67, active: 65, posts: 1456 },
              { platform: "YouTube", channels: 45, active: 44, posts: 234 },
              { platform: "TikTok", accounts: 34, active: 32, posts: 567 },
            ].map((source) => (
              <Card key={source.platform}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span>{getPlatformIcon(source.platform.toLowerCase())}</span>
                    {source.platform}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Active Sources:</span>
                      <span className="font-medium">
                        {source.active}/{source.communities || source.accounts}
                      </span>
                    </div>
                    <Progress value={(source.active / (source.communities || source.accounts)) * 100} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Posts Today:</span>
                      <span>{source.posts.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="academic" className="space-y-4">
          <div className="grid gap-4">
            {[
              { name: "PubMed", articles: 1247, newToday: 23, impact: "High" },
              { name: "Diabetes Care", articles: 89, newToday: 3, impact: "High" },
              { name: "Diabetologia", articles: 67, newToday: 2, impact: "High" },
              { name: "NEJM", articles: 34, newToday: 1, impact: "Very High" },
              { name: "Lancet", articles: 28, newToday: 0, impact: "Very High" },
            ].map((source) => (
              <Card key={source.name}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium">{source.name}</h4>
                        <p className="text-sm text-muted-foreground">{source.articles} articles tracked</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={source.newToday > 0 ? "default" : "secondary"}>+{source.newToday} today</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{source.impact} Impact</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="industry" className="space-y-4">
          <div className="grid gap-4">
            {[
              { company: "Dexcom", updates: 12, category: "CGM" },
              { company: "Abbott", updates: 8, category: "CGM" },
              { company: "Medtronic", updates: 6, category: "Pump" },
              { company: "Tandem", updates: 4, category: "Pump" },
              { company: "Insulet", updates: 7, category: "Pump" },
            ].map((source) => (
              <Card key={source.company}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Database className="h-5 w-5 text-purple-500" />
                      <div>
                        <h4 className="font-medium">{source.company}</h4>
                        <p className="text-sm text-muted-foreground">{source.category} Technology</p>
                      </div>
                    </div>
                    <Badge variant="outline">{source.updates} updates this week</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="clinical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Active Clinical Trials
              </CardTitle>
              <CardDescription>Monitoring 247 active T1D clinical trials worldwide</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">89</div>
                  <div className="text-sm text-muted-foreground">Phase I/II</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">124</div>
                  <div className="text-sm text-muted-foreground">Phase III</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">34</div>
                  <div className="text-sm text-muted-foreground">Post-Market</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
