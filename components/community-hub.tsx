"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageCircle, TrendingUp, Heart, Share2, Globe } from "lucide-react"
import { dataGenerator } from "@/lib/data-generator"

interface CommunityPost {
  id: string
  author: string
  title: string
  content: string
  category: string
  upvotes: number
  downvotes: number
  comments: number
  timestamp: Date
  verified: boolean
  tags: string[]
}

interface TrendingTopic {
  id: string
  title: string
  description: string
  engagement: number
  growth: number
  category: string
  participants: number
  lastActivity: Date
}

export function CommunityHub() {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [topics, setTopics] = useState<TrendingTopic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateData = () => {
      const postData: CommunityPost[] = [
        {
          id: "post-1",
          author: "Sarah M.",
          title: "New CGM insights from my data analysis",
          content: "I've been analyzing my Dexcom data and found some interesting patterns during exercise...",
          category: "CGM & Technology",
          upvotes: 127,
          downvotes: 3,
          comments: 23,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          verified: true,
          tags: ["CGM", "Exercise", "Data Analysis"]
        },
        {
          id: "post-2",
          author: "Mike R.",
          title: "Tips for managing blood sugar during travel",
          content: "Just got back from a 2-week trip and wanted to share what worked for me...",
          category: "Lifestyle",
          upvotes: 89,
          downvotes: 1,
          comments: 15,
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          verified: false,
          tags: ["Travel", "Management", "Tips"]
        },
        {
          id: "post-3",
          author: "Dr. Emily Chen",
          title: "Latest research on T1D and exercise",
          content: "New study published this week shows promising results for exercise timing...",
          category: "Research",
          upvotes: 234,
          downvotes: 2,
          comments: 45,
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          verified: true,
          tags: ["Research", "Exercise", "Clinical"]
        },
        {
          id: "post-4",
          author: "Alex K.",
          title: "Community support during diagnosis",
          content: "I was diagnosed 3 months ago and this community has been incredible...",
          category: "Support",
          upvotes: 156,
          downvotes: 0,
          comments: 32,
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
          verified: false,
          tags: ["Support", "New Diagnosis", "Community"]
        }
      ]
      setPosts(postData)

      const topicData = dataGenerator.generateAIPatterns().slice(0, 6).map((pattern, i) => ({
        id: `topic-${i}`,
        title: pattern.title,
        description: pattern.description,
        engagement: Math.floor(Math.random() * 1000) + 500,
        growth: Math.floor(Math.random() * 50) + 20,
        category: ["Technology", "Research", "Lifestyle", "Support", "Management", "Innovation"][i % 6],
        participants: Math.floor(Math.random() * 500) + 100,
        lastActivity: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000)
      }))
      setTopics(topicData)
      setLoading(false)
    }

    generateData()
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "CGM & Technology": return "bg-blue-100 text-blue-800"
      case "Research": return "bg-purple-100 text-purple-800"
      case "Lifestyle": return "bg-green-100 text-green-800"
      case "Support": return "bg-pink-100 text-pink-800"
      case "Management": return "bg-orange-100 text-orange-800"
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
        <h2 className="text-2xl font-bold text-foreground">👥 T1D Community Hub</h2>
        <p className="text-muted-foreground">Connect, share, and learn from the global T1D community</p>
      </div>

      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">💬 Community Posts</TabsTrigger>
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
                    {post.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        ✓ Verified
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>By {post.author}</span>
                    <span>•</span>
                    <span>{post.timestamp.toLocaleDateString()}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3 line-clamp-3">{post.content}</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span>{post.upvotes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4 text-blue-500" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="h-4 w-4 text-green-500" />
                        <span>Share</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
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
                    <Badge variant="secondary">{topic.category}</Badge>
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
                        <span className="font-medium">Engagement: </span>
                        <span className="text-muted-foreground">
                          {topic.engagement.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Participants: </span>
                        <span className="text-muted-foreground">
                          {topic.participants.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Last Activity: </span>
                      <span className="text-sm text-muted-foreground">
                        {topic.lastActivity.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Community Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Community Statistics
          </CardTitle>
          <CardDescription>Real-time community engagement metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">12,500+</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">45,000+</div>
              <div className="text-sm text-muted-foreground">Total Posts</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">180+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">💬 Join the Conversation</h3>
            <p className="text-muted-foreground mb-4">
              Share your experiences and connect with the T1D community worldwide
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="default">Create Post</Button>
              <Button variant="outline">Browse Topics</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
