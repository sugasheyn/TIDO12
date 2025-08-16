"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, MessageSquare, ExternalLink, Heart, Share2, Lightbulb } from "lucide-react"
import Link from "next/link"

interface SocialPost {
  id: string
  platform: "reddit" | "twitter" | "facebook" | "instagram"
  author: string
  content: string
  timestamp: string
  engagement: { likes: number; comments: number; shares: number }
  url: string
  tags: string[]
  sentiment: "positive" | "negative" | "neutral"
  category: "symptom" | "solution" | "device" | "medication" | "experience" | "breakthrough"
}

interface Discovery {
  id: string
  title: string
  description: string
  confidence: number
  category: "symptom" | "correlation" | "breakthrough" | "pattern"
  supportingPosts: number
  firstDetected: string
  relatedPosts: SocialPost[]
}

export default function DiscoveriesPage() {
  const [discoveries, setDiscoveries] = useState<Discovery[]>([])
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock real social media data
    const mockPosts: SocialPost[] = [
      {
        id: "1",
        platform: "reddit",
        author: "T1D_warrior_23",
        content:
          "Has anyone else noticed their Dexcom readings are more accurate during cold weather? I've been tracking this for 3 months and there's definitely a pattern. My endo was surprised when I showed her the data.",
        timestamp: "2024-01-15T10:30:00Z",
        engagement: { likes: 47, comments: 23, shares: 8 },
        url: "https://reddit.com/r/Type1Diabetes/comments/abc123",
        tags: ["dexcom", "accuracy", "weather", "pattern"],
        sentiment: "positive",
        category: "device",
      },
      {
        id: "2",
        platform: "twitter",
        author: "@DiabetesHacks",
        content:
          "DIY solution: Using a small piece of medical tape over my Libre sensor during workouts has eliminated 90% of compression lows. Game changer! 🏃‍♂️ #T1D #CGM",
        timestamp: "2024-01-15T14:22:00Z",
        engagement: { likes: 156, comments: 34, shares: 67 },
        url: "https://twitter.com/DiabetesHacks/status/123456789",
        tags: ["libre", "diy", "workout", "compression"],
        sentiment: "positive",
        category: "solution",
      },
      {
        id: "3",
        platform: "facebook",
        author: "Sarah M.",
        content:
          "Strange symptom I've never heard discussed: metallic taste in mouth 2-3 hours before severe lows. Started tracking this after my 4th unexplained severe hypo this month. Anyone else experience this?",
        timestamp: "2024-01-15T09:15:00Z",
        engagement: { likes: 89, comments: 156, shares: 23 },
        url: "https://facebook.com/groups/t1dsupport/posts/456789",
        tags: ["symptoms", "hypoglycemia", "warning-signs"],
        sentiment: "neutral",
        category: "symptom",
      },
      {
        id: "4",
        platform: "reddit",
        author: "ResearchNerd_T1D",
        content:
          "Breakthrough: New study from Stanford shows promising results for beta cell regeneration using modified stem cells. Phase 2 trials starting next year. This could be it, folks! Link to preprint in comments.",
        timestamp: "2024-01-15T16:45:00Z",
        engagement: { likes: 234, comments: 78, shares: 145 },
        url: "https://reddit.com/r/diabetes_t1/comments/def456",
        tags: ["research", "beta-cells", "stem-cells", "cure"],
        sentiment: "positive",
        category: "breakthrough",
      },
      {
        id: "5",
        platform: "instagram",
        author: "@t1d_mom_life",
        content:
          "Discovered that my 8yo's BG spikes correlate with growth spurts. Tracked height vs insulin needs for 6 months - clear pattern! Sharing data with pediatric endo next week. #T1DParent #DataDriven",
        timestamp: "2024-01-15T12:30:00Z",
        engagement: { likes: 67, comments: 29, shares: 12 },
        url: "https://instagram.com/p/ABC123DEF",
        tags: ["pediatric", "growth", "insulin-needs", "correlation"],
        sentiment: "positive",
        category: "experience",
      },
    ]

    const mockDiscoveries: Discovery[] = [
      {
        id: "1",
        title: "CGM Accuracy Correlation with Temperature",
        description:
          "Multiple users report improved Dexcom G6/G7 accuracy in temperatures below 60°F. Potential sensor chemistry temperature dependency discovered.",
        confidence: 87,
        category: "correlation",
        supportingPosts: 23,
        firstDetected: "2024-01-10T00:00:00Z",
        relatedPosts: [mockPosts[0]],
      },
      {
        id: "2",
        title: "Metallic Taste as Hypoglycemia Predictor",
        description:
          "Emerging pattern: metallic taste 2-3 hours before severe hypoglycemic episodes. Reported by 15+ users across platforms. Potential early warning system.",
        confidence: 73,
        category: "symptom",
        supportingPosts: 18,
        firstDetected: "2024-01-12T00:00:00Z",
        relatedPosts: [mockPosts[2]],
      },
      {
        id: "3",
        title: "DIY Compression Low Prevention",
        description:
          "User-generated solution using medical tape to prevent CGM compression lows during exercise shows 90%+ success rate across multiple reports.",
        confidence: 91,
        category: "pattern",
        supportingPosts: 34,
        firstDetected: "2024-01-08T00:00:00Z",
        relatedPosts: [mockPosts[1]],
      },
      {
        id: "4",
        title: "Growth Spurt Insulin Resistance Pattern",
        description:
          "Pediatric T1D insulin needs increase 20-40% during growth spurts, with pattern recognition possible 1-2 weeks before height increase.",
        confidence: 82,
        category: "correlation",
        supportingPosts: 27,
        firstDetected: "2024-01-05T00:00:00Z",
        relatedPosts: [mockPosts[4]],
      },
    ]

    setPosts(mockPosts)
    setDiscoveries(mockDiscoveries)
    setLoading(false)
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
      symptom: "bg-red-100 text-red-800",
      solution: "bg-green-100 text-green-800",
      device: "bg-blue-100 text-blue-800",
      medication: "bg-purple-100 text-purple-800",
      experience: "bg-yellow-100 text-yellow-800",
      breakthrough: "bg-emerald-100 text-emerald-800",
      correlation: "bg-orange-100 text-orange-800",
      pattern: "bg-indigo-100 text-indigo-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading discoveries...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">T1D Discovery Platform</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time analysis of 6000+ sources discovering new patterns, symptoms, and solutions from the global T1D
            community
          </p>
        </div>

        <Tabs defaultValue="discoveries" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="discoveries">Discoveries</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="solutions">Solutions</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
          </TabsList>

          <TabsContent value="discoveries" className="space-y-6">
            <div className="grid gap-6">
              {discoveries.map((discovery) => (
                <Card key={discovery.id} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-yellow-500" />
                          <CardTitle className="text-xl">{discovery.title}</CardTitle>
                          <Badge className={getCategoryColor(discovery.category)}>{discovery.category}</Badge>
                        </div>
                        <CardDescription className="text-base">{discovery.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{discovery.confidence}%</div>
                        <div className="text-sm text-muted-foreground">Confidence</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{discovery.supportingPosts} supporting posts</span>
                        <span>First detected: {new Date(discovery.firstDetected).toLocaleDateString()}</span>
                      </div>
                      <Link href={`/discoveries/${discovery.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </Button>
                      </Link>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Related Posts:</h4>
                      {discovery.relatedPosts.slice(0, 2).map((post) => (
                        <div key={post.id} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{getPlatformIcon(post.platform)}</span>
                              <span className="font-medium">{post.author}</span>
                              <Badge variant="outline" className={getCategoryColor(post.category)}>
                                {post.category}
                              </Badge>
                            </div>
                            <a
                              href={post.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{post.content}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {post.engagement.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              {post.engagement.comments}
                            </span>
                            <span className="flex items-center gap-1">
                              <Share2 className="h-3 w-3" />
                              {post.engagement.shares}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <div className="grid gap-4">
              {posts
                .filter((p) => p.engagement.likes > 50)
                .map((post) => (
                  <Card key={post.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getPlatformIcon(post.platform)}</span>
                          <span className="font-medium">{post.author}</span>
                          <Badge className={getCategoryColor(post.category)}>{post.category}</Badge>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                      <p className="text-gray-700 mb-3">{post.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {post.engagement.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {post.engagement.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Share2 className="h-4 w-4" />
                            {post.engagement.shares}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(post.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="solutions" className="space-y-6">
            <div className="grid gap-4">
              {posts
                .filter((p) => p.category === "solution")
                .map((post) => (
                  <Card key={post.id} className="border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getPlatformIcon(post.platform)}</span>
                          <span className="font-medium">{post.author}</span>
                          <Badge className="bg-green-100 text-green-800">User Solution</Badge>
                        </div>
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                      <p className="text-gray-700 mb-3">{post.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {post.engagement.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {post.engagement.comments}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="research" className="space-y-6">
            <div className="grid gap-4">
              {posts
                .filter((p) => p.category === "breakthrough")
                .map((post) => (
                  <Card key={post.id} className="border-l-4 border-l-emerald-500">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getPlatformIcon(post.platform)}</span>
                          <span className="font-medium">{post.author}</span>
                          <Badge className="bg-emerald-100 text-emerald-800">Research Breakthrough</Badge>
                        </div>
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                      <p className="text-gray-700 mb-3">{post.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {post.engagement.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {post.engagement.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Share2 className="h-4 w-4" />
                            {post.engagement.shares}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
