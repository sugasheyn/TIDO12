"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Users, Heart, MessageCircle, Share2, TrendingUp, Globe, Search, Filter, Lightbulb, Brain, Calendar, MapPin, Award } from "lucide-react"
import { AuthGuard } from "@/components/auth/auth-guard"
import Link from "next/link"
import { dataGenerator } from "@/lib/data-generator"

export default function CommunityPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  // Generate dynamic community data based on real T1D research
  const communityStats = dataGenerator.generateCommunityData()

  const recentActivities = [
    {
      id: 1,
      type: "discussion",
      title: "New CGM sensor experiences",
      author: "Sarah M.",
      avatar: "/avatars/sarah.jpg",
      timestamp: "2 hours ago",
      engagement: 45,
      category: "Technology"
    },
    {
      id: 2,
      type: "research",
      title: "Exercise impact on glucose levels",
      author: "Dr. Michael Chen",
      avatar: "/avatars/michael.jpg",
      timestamp: "4 hours ago",
      engagement: 89,
      category: "Research"
    },
    {
      id: 3,
      type: "insight",
      title: "Weather effects on insulin absorption",
      author: "T1D_warrior_23",
      avatar: "/avatars/warrior.jpg",
      timestamp: "6 hours ago",
      engagement: 156,
      category: "Insights"
    }
  ]

  const topContributors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      avatar: "/avatars/sarah-j.jpg",
      contributions: 234,
      expertise: "Endocrinology",
      badge: "Expert"
    },
    {
      id: 2,
      name: "Marcus K.",
      avatar: "/avatars/marcus.jpg",
      contributions: 189,
      expertise: "CGM Technology",
      badge: "Innovator"
    },
    {
      id: 3,
      name: "T1D Parent Support",
      avatar: "/avatars/parent.jpg",
      contributions: 167,
      expertise: "Family Management",
      badge: "Mentor"
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "T1D Research Symposium 2024",
      date: "2024-03-15",
      time: "14:00 UTC",
      type: "Virtual",
      attendees: 234,
      description: "Annual gathering of T1D researchers and community members"
    },
    {
      id: 2,
      title: "CGM Technology Workshop",
      date: "2024-03-20",
      time: "16:00 UTC",
      type: "Hybrid",
      attendees: 89,
      description: "Hands-on workshop on latest CGM technologies"
    }
  ]

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">T1D Community Hub</h1>
            <p className="text-lg text-gray-600">Connect, collaborate, and contribute to the global T1D community</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Community Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="text-center">
                  <CardContent className="p-4">
                    <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-blue-600">{communityStats.totalMembers.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Members</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-4">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold text-green-600">{communityStats.activeToday.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Active Today</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-4">
                    <Globe className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold text-purple-600">{communityStats.countries}</div>
                    <div className="text-sm text-gray-600">Countries</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-4">
                    <Brain className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                    <div className="text-2xl font-bold text-orange-600">{communityStats.researchProjects}</div>
                    <div className="text-sm text-gray-600">Research Projects</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    Recent Community Activity
                  </CardTitle>
                  <CardDescription>
                    Latest discussions, research updates, and community insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={activity.avatar} alt={activity.author} />
                        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-blue-600 text-white text-sm font-medium">
                          {getUserInitials(activity.author)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {activity.category}
                          </Badge>
                          <span className="text-xs text-gray-500">{activity.timestamp}</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-1">{activity.title}</h4>
                        <p className="text-sm text-gray-600">by {activity.author}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {activity.engagement}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Top Contributors */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    Top Community Contributors
                  </CardTitle>
                  <CardDescription>
                    Recognizing our most active and valuable community members
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {topContributors.map((contributor) => (
                      <div key={contributor.id} className="text-center p-4 bg-gray-50 rounded-lg">
                        <Avatar className="h-16 w-16 mx-auto mb-3">
                          <AvatarImage src={contributor.avatar} alt={contributor.name} />
                          <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-blue-600 text-white text-lg font-medium">
                            {getUserInitials(contributor.name)}
                          </AvatarFallback>
                        </Avatar>
                        <h4 className="font-semibold text-gray-900 mb-1">{contributor.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{contributor.expertise}</p>
                        <Badge variant="secondary" className="mb-2">
                          {contributor.badge}
                        </Badge>
                        <p className="text-xs text-gray-500">{contributor.contributions} contributions</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Discussions Tab */}
            <TabsContent value="discussions" className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Community Discussions</CardTitle>
                  <CardDescription>
                    Join conversations about T1D management, research, and experiences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search discussions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Discussions feature coming soon!</p>
                    <p className="text-sm">You'll be able to create and participate in community discussions.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Research Tab */}
            <TabsContent value="research" className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Community Research Projects</CardTitle>
                  <CardDescription>
                    Collaborate on T1D research initiatives and studies
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-8 text-gray-500">
                    <Brain className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Research collaboration features coming soon!</p>
                    <p className="text-sm">You'll be able to join research projects and contribute to studies.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Upcoming Community Events</CardTitle>
                  <CardDescription>
                    Join virtual and in-person events to connect with the T1D community
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(event.date).toLocaleDateString()}
                            </span>
                            <span>{event.time}</span>
                            <Badge variant="outline">{event.type}</Badge>
                            <span>{event.attendees} attending</span>
                          </div>
                        </div>
                        <Button size="sm">Join Event</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <div className="mt-8 text-center">
            <div className="inline-flex gap-2">
              <Button asChild>
                <Link href="/community-hub">
                  Explore Full Community Hub
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/profile">
                  Update My Profile
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
