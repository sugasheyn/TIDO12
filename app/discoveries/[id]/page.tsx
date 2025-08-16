"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ExternalLink, MessageSquare, Heart, Share2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function DiscoveryDetailPage() {
  const params = useParams()
  const [discovery, setDiscovery] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock detailed discovery data
    const mockDiscovery = {
      id: params.id,
      title: "CGM Accuracy Correlation with Temperature",
      description:
        "Multiple users report improved Dexcom G6/G7 accuracy in temperatures below 60°F. Potential sensor chemistry temperature dependency discovered through community observations.",
      confidence: 87,
      category: "correlation",
      supportingPosts: 23,
      firstDetected: "2024-01-10T00:00:00Z",
      timeline: [
        { date: "2024-01-10", event: "First report detected", posts: 1 },
        { date: "2024-01-12", event: "Pattern recognition triggered", posts: 5 },
        { date: "2024-01-14", event: "Correlation confirmed", posts: 12 },
        { date: "2024-01-15", event: "Community validation", posts: 23 },
      ],
      relatedPosts: [
        {
          id: "1",
          platform: "reddit",
          author: "T1D_warrior_23",
          content:
            "Has anyone else noticed their Dexcom readings are more accurate during cold weather? I've been tracking this for 3 months and there's definitely a pattern.",
          engagement: { likes: 47, comments: 23, shares: 8 },
          url: "https://reddit.com/r/Type1Diabetes/comments/abc123",
        },
        {
          id: "2",
          platform: "twitter",
          author: "@ColdWeatherT1D",
          content:
            "Interesting observation: My G7 has been spot-on accurate during this cold snap. Usually it runs 10-15mg/dL high. Temperature correlation? 🤔",
          engagement: { likes: 34, comments: 12, shares: 6 },
          url: "https://twitter.com/ColdWeatherT1D/status/987654321",
        },
      ],
      insights: {
        geographicDistribution: [
          { region: "Northern US", reports: 12 },
          { region: "Canada", reports: 8 },
          { region: "Northern Europe", reports: 3 },
        ],
        deviceTypes: [
          { device: "Dexcom G6", reports: 15 },
          { device: "Dexcom G7", reports: 8 },
        ],
        temperatureRanges: [
          { range: "Below 32°F", accuracy: "95%" },
          { range: "32-60°F", accuracy: "92%" },
          { range: "Above 60°F", accuracy: "87%" },
        ],
      },
    }

    setDiscovery(mockDiscovery)
    setLoading(false)
  }, [params.id])

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading discovery details...</div>
  }

  if (!discovery) {
    return <div className="text-center">Discovery not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/discoveries">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Discoveries
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          {/* Header */}
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">{discovery.title}</CardTitle>
                  <CardDescription className="text-lg">{discovery.description}</CardDescription>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-orange-100 text-orange-800">{discovery.category}</Badge>
                    <Badge variant="outline">{discovery.supportingPosts} supporting posts</Badge>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{discovery.confidence}%</div>
                  <div className="text-sm text-muted-foreground">Confidence Score</div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Discovery Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {discovery.timeline.map((event: any, index: number) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium">{event.event}</div>
                      <div className="text-sm text-muted-foreground">
                        {event.date} • {event.posts} posts
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Geographic Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {discovery.insights.geographicDistribution.map((item: any) => (
                    <div key={item.region} className="flex justify-between">
                      <span>{item.region}</span>
                      <Badge variant="outline">{item.reports}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Device Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {discovery.insights.deviceTypes.map((item: any) => (
                    <div key={item.device} className="flex justify-between">
                      <span>{item.device}</span>
                      <Badge variant="outline">{item.reports}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Temperature Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {discovery.insights.temperatureRanges.map((item: any) => (
                    <div key={item.range} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.range}</span>
                        <span>{item.accuracy}</span>
                      </div>
                      <Progress value={Number.parseInt(item.accuracy)} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Supporting Posts */}
          <Card>
            <CardHeader>
              <CardTitle>Supporting Posts</CardTitle>
              <CardDescription>Community posts that contributed to this discovery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {discovery.relatedPosts.map((post: any) => (
                  <div key={post.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{post.platform === "reddit" ? "🔴" : "🐦"}</span>
                        <span className="font-medium">{post.author}</span>
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
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
        </div>
      </div>
    </div>
  )
}
