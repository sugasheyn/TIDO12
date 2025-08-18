"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  User, 
  Bookmark, 
  Bell, 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  Heart, 
  Eye, 
  Share2, 
  Edit3,
  Trash2,
  Star,
  TrendingUp,
  Activity,
  Target,
  Zap
} from "lucide-react"
import { UserProfile, PinnedContent, DiscoverySubscription } from "@/lib/types"
import Link from "next/link"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [pinnedContent, setPinnedContent] = useState<PinnedContent[]>([])
  const [discoverySubscriptions, setDiscoverySubscriptions] = useState<DiscoverySubscription[]>([])
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    if (status === "authenticated" && session?.user) {
      loadUserData()
    }
  }, [status, session, router])

  const loadUserData = async () => {
    setIsLoading(true)
    
    try {
      // Load user profile from localStorage (in production, this would be from your API)
      const storedProfile = localStorage.getItem("userProfile")
      if (storedProfile) {
        setUserProfile(JSON.parse(storedProfile))
      }

      // Load mock pinned content
      const mockPinnedContent: PinnedContent[] = [
        {
          id: "1",
          userId: session?.user?.id || "",
          type: "discovery",
          contentId: "discovery-1",
          title: "Lemon for Confusion Relief",
          description: "Community members report improved mental clarity when consuming lemon during hypoglycemic episodes",
          url: "/discoveries/1",
          tags: ["hypoglycemia", "lemon", "mental-clarity", "community-insight"],
          pinnedAt: new Date(Date.now() - 86400000) // 1 day ago
        },
        {
          id: "2",
          userId: session?.user?.id || "",
          type: "ai_insight",
          contentId: "ai-1",
          title: "Glucose Pattern Analysis",
          description: "AI detected unusual glucose patterns during evening hours, suggesting potential dawn phenomenon",
          url: "/ai-insights-dashboard",
          tags: ["glucose-patterns", "dawn-phenomenon", "ai-analysis"],
          pinnedAt: new Date(Date.now() - 172800000) // 2 days ago
        },
        {
          id: "3",
          userId: session?.user?.id || "",
          type: "research",
          contentId: "research-1",
          title: "New CGM Technology Study",
          description: "Clinical trial results for next-generation continuous glucose monitoring with improved accuracy",
          url: "/research/1",
          tags: ["cgm", "clinical-trial", "technology", "accuracy"],
          pinnedAt: new Date(Date.now() - 259200000) // 3 days ago
        }
      ]
      setPinnedContent(mockPinnedContent)

      // Load mock discovery subscriptions
      const mockSubscriptions: DiscoverySubscription[] = [
        {
          id: "1",
          userId: session?.user?.id || "",
          type: "glucose_patterns",
          frequency: "daily",
          active: true,
          lastSent: new Date(Date.now() - 86400000),
          preferences: {
            email: true,
            push: true,
            inApp: true,
            severity: "important"
          },
          createdAt: new Date(Date.now() - 604800000) // 1 week ago
        },
        {
          id: "2",
          userId: session?.user?.id || "",
          type: "ai_discoveries",
          frequency: "weekly",
          active: true,
          lastSent: new Date(Date.now() - 604800000),
          preferences: {
            email: false,
            push: true,
            inApp: true,
            severity: "all"
          },
          createdAt: new Date(Date.now() - 1209600000) // 2 weeks ago
        },
        {
          id: "3",
          userId: session?.user?.id || "",
          type: "research_breakthroughs",
          frequency: "monthly",
          active: false,
          lastSent: new Date(Date.now() - 2592000000),
          preferences: {
            email: true,
            push: false,
            inApp: true,
            severity: "critical"
          },
          createdAt: new Date(Date.now() - 2592000000) // 1 month ago
        }
      ]
      setDiscoverySubscriptions(mockSubscriptions)
    } catch (error) {
      console.error("Failed to load user data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePinContent = (content: Omit<PinnedContent, 'id' | 'userId' | 'pinnedAt'>) => {
    const newPinnedContent: PinnedContent = {
      ...content,
      id: Date.now().toString(),
      userId: session?.user?.id || "",
      pinnedAt: new Date()
    }
    setPinnedContent(prev => [newPinnedContent, ...prev])
  }

  const handleUnpinContent = (contentId: string) => {
    setPinnedContent(prev => prev.filter(content => content.id !== contentId))
  }

  const handleToggleSubscription = (subscriptionId: string) => {
    setDiscoverySubscriptions(prev => 
      prev.map(sub => 
        sub.id === subscriptionId 
          ? { ...sub, active: !sub.active }
          : sub
      )
    )
  }

  const handleDeleteSubscription = (subscriptionId: string) => {
    setDiscoverySubscriptions(prev => prev.filter(sub => sub.id !== subscriptionId))
  }

  const filteredPinnedContent = pinnedContent.filter(content =>
    content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    content.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    content.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!userProfile) {
    router.push("/auth/profile-setup")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {userProfile.displayName || userProfile.username}!
            </h1>
            <p className="text-gray-600 mt-1">
              Your personalized T1D AI Platform dashboard
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/profile">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Bookmark className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Pinned Items</p>
                  <p className="text-2xl font-bold">{pinnedContent.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                  <p className="text-2xl font-bold">
                    {discoverySubscriptions.filter(sub => sub.active).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">New Discoveries</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Platform Activity</p>
                  <p className="text-2xl font-bold">89%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pinned">Pinned Content</TabsTrigger>
            <TabsTrigger value="subscriptions">Discovery Subscriptions</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Pinned Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bookmark className="h-5 w-5" />
                    Recently Pinned
                  </CardTitle>
                  <CardDescription>
                    Your latest saved discoveries and insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pinnedContent.slice(0, 3).map((content) => (
                    <div key={content.id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Star className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {content.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {content.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          {content.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  {pinnedContent.length === 0 && (
                    <p className="text-center text-gray-500 py-4">
                      No pinned content yet. Start exploring to save interesting discoveries!
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Active Subscriptions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Active Subscriptions
                  </CardTitle>
                  <CardDescription>
                    Your discovery notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {discoverySubscriptions.filter(sub => sub.active).map((subscription) => (
                    <div key={subscription.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {subscription.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </p>
                          <p className="text-xs text-gray-500">
                            {subscription.frequency} updates
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleSubscription(subscription.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {discoverySubscriptions.filter(sub => sub.active).length === 0 && (
                    <p className="text-center text-gray-500 py-4">
                      No active subscriptions. Set up notifications to stay informed!
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Access your most used features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" asChild className="h-20 flex-col">
                    <Link href="/discoveries">
                      <Zap className="h-6 w-6 mb-2" />
                      <span className="text-sm">New Discoveries</span>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-20 flex-col">
                    <Link href="/ai-insights-dashboard">
                      <Target className="h-6 w-6 mb-2" />
                      <span className="text-sm">AI Insights</span>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-20 flex-col">
                    <Link href="/community">
                      <Heart className="h-6 w-6 mb-2" />
                      <span className="text-sm">Community</span>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-20 flex-col">
                    <Link href="/research">
                      <TrendingUp className="h-6 w-6 mb-2" />
                      <span className="text-sm">Research</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pinned Content Tab */}
          <TabsContent value="pinned" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Pinned Content</h2>
                <p className="text-gray-600">Your saved discoveries, insights, and research</p>
              </div>
              <Button asChild>
                <Link href="/discoveries">
                  <Plus className="h-4 w-4 mr-2" />
                  Explore More
                </Link>
              </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search pinned content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="discovery">Discoveries</SelectItem>
                  <SelectItem value="ai_insight">AI Insights</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="community_post">Community Posts</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Pinned Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPinnedContent.map((content) => (
                <Card key={content.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary" className="capitalize">
                        {content.type.replace(/_/g, ' ')}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUnpinContent(content.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{content.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {content.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {content.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Pinned {content.pinnedAt.toLocaleDateString()}</span>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPinnedContent.length === 0 && (
              <div className="text-center py-12">
                <Bookmark className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pinned content found</h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery ? 'Try adjusting your search terms' : 'Start exploring to find content worth saving'}
                </p>
                <Button asChild>
                  <Link href="/discoveries">
                    <Plus className="h-4 w-4 mr-2" />
                    Explore Discoveries
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Discovery Subscriptions Tab */}
          <TabsContent value="subscriptions" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Discovery Subscriptions</h2>
                <p className="text-gray-600">Manage your notification preferences for new discoveries</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Subscription
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {discoverySubscriptions.map((subscription) => (
                <Card key={subscription.id} className={subscription.active ? 'ring-2 ring-green-200' : ''}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant={subscription.active ? "default" : "secondary"}>
                        {subscription.active ? "Active" : "Inactive"}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleSubscription(subscription.id)}
                          className="h-8 w-8 p-0"
                        >
                          {subscription.active ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteSubscription(subscription.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg capitalize">
                      {subscription.type.replace(/_/g, ' ')}
                    </CardTitle>
                    <CardDescription>
                      {subscription.frequency} updates • {subscription.preferences.severity} priority
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Email notifications</span>
                        <Checkbox checked={subscription.preferences.email} disabled />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Push notifications</span>
                        <Checkbox checked={subscription.preferences.push} disabled />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>In-app notifications</span>
                        <Checkbox checked={subscription.preferences.inApp} disabled />
                      </div>
                    </div>
                    {subscription.lastSent && (
                      <div className="mt-4 pt-3 border-t text-xs text-gray-500">
                        Last sent: {subscription.lastSent.toLocaleDateString()}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recent Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Recent Activity</h2>
              <p className="text-gray-600">Your platform interactions and discoveries</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 rounded-lg bg-blue-50">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bookmark className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Pinned "Lemon for Confusion Relief" discovery</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-3 rounded-lg bg-green-50">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Bell className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Received daily glucose pattern update</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-3 rounded-lg bg-purple-50">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Target className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">AI analysis completed for your glucose data</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-3 rounded-lg bg-orange-50">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <Heart className="h-4 w-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Joined "Type 1 Diabetes Support" community</p>
                      <p className="text-xs text-gray-500">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
