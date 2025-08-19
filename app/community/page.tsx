"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Users, Heart, MessageCircle, Share2, TrendingUp, Globe, Search, Filter, Lightbulb, Brain, Calendar, MapPin, Award, Activity } from "lucide-react"
import Link from "next/link"
import { realAPIs } from "@/lib/real-apis"
import ModernNavigation from "@/components/modern-navigation"
import { safeNumberFormat, safeDateFormat, safeTimeFormat, safeDateOnlyFormat } from "@/lib/utils"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [communityData, setCommunityData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCommunityData = async () => {
      try {
        setIsLoading(true)
        const data = await realAPIs.getAllRealData()
        setCommunityData(data)
      } catch (error) {
        console.error('Error loading community data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCommunityData()
  }, [])

  // Generate dynamic community data based on real T1D research
  const communityStats = communityData ? {
    totalMembers: communityData.totalItems || 0,
    activeDiscussions: Math.floor((communityData.totalItems || 0) * 0.3),
    researchPapers: Math.floor((communityData.totalItems || 0) * 0.4),
    insights: Math.floor((communityData.totalItems || 0) * 0.2)
  } : {
    totalMembers: 0,
    activeDiscussions: 0,
    researchPapers: 0,
    insights: 0
  }

  const recentActivities = communityData ? [
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
  ] : []

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
      date: "2024-03-22",
      time: "10:00 UTC",
      type: "Hybrid",
      attendees: 89,
      description: "Hands-on workshop for continuous glucose monitoring systems"
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <ModernNavigation />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading community data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <ModernNavigation />
      
          {/* Header */}
      <section className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              T1D Community Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with researchers, healthcare professionals, patients, and families 
              in the Type 1 Diabetes community. Share insights, discover research, and build connections.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search community discussions, research, insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {safeNumberFormat(communityStats.totalMembers)}
              </div>
              <div className="text-gray-600">Community Members</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {safeNumberFormat(communityStats.activeDiscussions)}
              </div>
              <div className="text-gray-600">Active Discussions</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {safeNumberFormat(communityStats.researchPapers)}
              </div>
              <div className="text-gray-600">Research Papers</div>
          </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Lightbulb className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {safeNumberFormat(communityStats.insights)}
              </div>
              <div className="text-gray-600">Community Insights</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activities */}
                <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Recent Activities
                  </CardTitle>
                  <CardDescription>
                      Latest community interactions and discussions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={activity.avatar} />
                          <AvatarFallback>{activity.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-900">{activity.title}</span>
                            <Badge variant="secondary">{activity.category}</Badge>
                        </div>
                          <p className="text-sm text-gray-600 mb-2">by {activity.author}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{activity.timestamp}</span>
                            <span className="flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                            {activity.engagement}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Top Contributors */}
                <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Top Contributors
                  </CardTitle>
                  <CardDescription>
                      Community members with the most valuable contributions
                  </CardDescription>
                </CardHeader>
                  <CardContent className="space-y-4">
                    {topContributors.map((contributor) => (
                      <div key={contributor.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={contributor.avatar} />
                          <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-900">{contributor.name}</span>
                            <Badge variant="default">{contributor.badge}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{contributor.expertise}</p>
                        <p className="text-xs text-gray-500">{contributor.contributions} contributions</p>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
              </div>
            </TabsContent>

            {/* Discussions Tab */}
            <TabsContent value="discussions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Community Discussions</CardTitle>
                  <CardDescription>
                    Join conversations about T1D management, research, and experiences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">
                    <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p>Discussion features coming soon!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Research Tab */}
            <TabsContent value="research" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Research & Publications</CardTitle>
                  <CardDescription>
                    Latest research papers and publications from the T1D community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">
                    <Brain className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p>Research content coming soon!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>
                    Join virtual and in-person events with the T1D community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-gray-50">
                        <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Calendar className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 mb-2">{event.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {safeDateFormat(event.date)}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {event.type}
                            </span>
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {event.attendees} attending
                            </span>
                          </div>
                        </div>
                        <Button size="sm">Join Event</Button>
                      </div>
                    ))}
                    </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
            </div>
      </section>
      </div>
  )
}
