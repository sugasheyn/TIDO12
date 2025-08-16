"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, TrendingUp, Users, Globe, Zap, Clock, RefreshCw } from "lucide-react"
import { dataGenerator } from "@/lib/data-generator"

interface LivePost {
  id: string
  author: string
  content: string
  platform: string
  timestamp: Date
  engagement: number
  category: string
  verified: boolean
  language: string
}

interface TrendingTopic {
  id: string
  title: string
  description: string
  mentions: number
  growth: number
  category: string
  sentiment: "positive" | "negative" | "neutral"
  lastUpdated: Date
}

export function LiveFeed() {
  const [posts, setPosts] = useState<LivePost[]>([])
  const [topics, setTopics] = useState<TrendingTopic[]>([])
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  useEffect(() => {
    const generateData = () => {
      const postData: LivePost[] = [
        {
          id: "post-1",
          author: "Maria S.",
          content: "Just discovered that my blood sugar is more stable when I exercise in the morning! #T1D #Exercise #Discovery",
          platform: "Twitter",
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          engagement: 156,
          category: "Personal Discovery",
          verified: false,
          language: "English"
        },
        {
          id: "post-2",
          author: "Dr. James Wilson",
          content: "New research shows promising results for AI-powered insulin dosing algorithms. Study published in Diabetes Care.",
          platform: "LinkedIn",
          timestamp: new Date(Date.now() - 12 * 60 * 1000),
          engagement: 342,
          category: "Research",
          verified: true,
          language: "English"
        },
        {
          id: "post-3",
          author: "Carlos M.",
          content: "Mi experiencia con el nuevo sensor Dexcom G7 ha sido increíble. Mucho más preciso que el anterior.",
          platform: "Instagram",
          timestamp: new Date(Date.now() - 18 * 60 * 1000),
          engagement: 89,
          category: "Technology",
          verified: false,
          language: "Spanish"
        },
        {
          id: "post-4",
          author: "Emma R.",
          content: "Community support has been amazing during my first year with T1D. Thank you everyone! 💙",
          platform: "Reddit",
          timestamp: new Date(Date.now() - 25 * 60 * 1000),
          engagement: 234,
          category: "Support",
          verified: false,
          language: "English"
        },
        {
          id: "post-5",
          author: "Dr. Sarah Kim",
          content: "Important reminder: Regular eye exams are crucial for T1D patients. Early detection saves vision.",
          platform: "Facebook",
          timestamp: new Date(Date.now() - 35 * 60 * 1000),
          engagement: 567,
          category: "Health Tips",
          verified: true,
          language: "English"
        },
        {
          id: "post-6",
          author: "Pierre L.",
          content: "Nouvelle étude sur la gestion du diabète de type 1 et l'exercice physique. Résultats très prometteurs.",
          platform: "Twitter",
          timestamp: new Date(Date.now() - 45 * 60 * 1000),
          engagement: 123,
          category: "Research",
          verified: false,
          language: "French"
        }
      ]
      setPosts(postData)

      const topicData = dataGenerator.generateAIPatterns().slice(0, 6).map((pattern, i) => ({
        id: `topic-${i}`,
        title: pattern.title,
        description: pattern.description,
        mentions: Math.floor(Math.random() * 1000) + 500,
        growth: Math.floor(Math.random() * 50) + 20,
        category: ["Technology", "Research", "Lifestyle", "Support", "Management", "Innovation"][i % 6],
        sentiment: ["positive", "negative", "neutral"][Math.floor(Math.random() * 3)] as "positive" | "negative" | "neutral",
        lastUpdated: new Date(Date.now() - Math.random() * 60 * 60 * 1000)
      }))
      setTopics(topicData)
      setLoading(false)
    }

    generateData()
  }, [])

  const refreshData = () => {
    setLoading(true)
    setLastRefresh(new Date())
    setTimeout(() => {
      generateData()
    }, 1000)
  }

  const generateData = () => {
    // This would normally fetch new data from APIs
    setLoading(false)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Research": return "bg-purple-100 text-purple-800"
      case "Technology": return "bg-blue-100 text-blue-800"
      case "Lifestyle": return "bg-green-100 text-green-800"
      case "Support": return "bg-pink-100 text-pink-800"
      case "Health Tips": return "bg-orange-100 text-orange-800"
      case "Personal Discovery": return "bg-indigo-100 text-indigo-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "Twitter": return "bg-blue-100 text-blue-800"
      case "LinkedIn": return "bg-blue-100 text-blue-800"
      case "Instagram": return "bg-pink-100 text-pink-800"
      case "Reddit": return "bg-orange-100 text-orange-800"
      case "Facebook": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "bg-green-100 text-green-800"
      case "negative": return "bg-red-100 text-red-800"
      case "neutral": return "bg-gray-100 text-gray-800"
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">📡 Live T1D Feed</h2>
          <p className="text-muted-foreground">Real-time conversations and trending topics from the global T1D community</p>
        </div>
        <Button onClick={refreshData} disabled={loading} variant="outline" size="sm">
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">💬 Live Posts</TabsTrigger>
          <TabsTrigger value="topics">🔥 Trending Topics</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className={getCategoryColor(post.category)}>
                      {post.category}
                    </Badge>
                    <Badge className={getPlatformColor(post.platform)}>
                      {post.platform}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{post.author}</span>
                    {post.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                        ✓ Verified
                      </Badge>
                    )}
                    <span>•</span>
                    <span>{post.timestamp.toLocaleTimeString()}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{post.content}</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {post.language} • {post.engagement} engagements
                      </span>
                      <span className="text-muted-foreground">
                        {Math.floor((Date.now() - post.timestamp.getTime()) / (1000 * 60))}m ago
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic) => (
              <Card key={topic.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className={getSentimentColor(topic.sentiment)}>
                      {topic.sentiment.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      +{topic.growth}% growth
                    </span>
                  </div>
                  <CardTitle className="text-lg">{topic.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{topic.description}</p>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Mentions: </span>
                        <span className="text-muted-foreground">
                          {topic.mentions.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Category: </span>
                        <span className="text-muted-foreground">{topic.category}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Last Updated: </span>
                      <span className="text-sm text-muted-foreground">
                        {topic.lastUpdated.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Live Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Live Feed Statistics
          </CardTitle>
          <CardDescription>Real-time engagement and activity metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">Live</div>
              <div className="text-sm text-muted-foreground">Status</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {posts.length}
              </div>
              <div className="text-sm text-muted-foreground">Recent Posts</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {topics.length}
              </div>
              <div className="text-sm text-muted-foreground">Trending Topics</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {lastRefresh.toLocaleTimeString()}
              </div>
              <div className="text-sm text-muted-foreground">Last Refresh</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">📱 Join the Conversation</h3>
            <p className="text-muted-foreground mb-4">
              Share your T1D journey and connect with the global community in real-time
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="default">Share Your Story</Button>
              <Button variant="outline">Follow Topics</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
