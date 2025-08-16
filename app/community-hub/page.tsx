"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { useLiveData } from "@/hooks/use-live-data"
import { dataGenerator } from "@/lib/data-generator"

export default function CommunityHubPage() {
  const { sources, loading, error, lastUpdated, refreshData } = useLiveData()
  const [searchQuery, setSearchQuery] = useState("")
  const [communityClaims, setCommunityClaims] = useState<any[]>([])
  const [claimsLoading, setClaimsLoading] = useState(true)
  const [claimsError, setClaimsError] = useState<string | null>(null)

  // Fetch community claims data
  useEffect(() => {
    const fetchCommunityClaims = async () => {
      try {
        setClaimsLoading(true)
        console.log('Fetching community claims...')
        
        const response = await fetch('/api/public-data/community-claims')
        console.log('Response status:', response.status)
        
        if (response.ok) {
          const data = await response.json()
          console.log('Response data:', data)
          setCommunityClaims(data.data || [])
        } else {
          const errorText = await response.text()
          console.error('Response not ok:', response.status, errorText)
          throw new Error(`Failed to fetch community claims: ${response.status}`)
        }
        
      } catch (error) {
        console.error('Error fetching community claims:', error)
        setClaimsError('Failed to load community claims')
      } finally {
        setClaimsLoading(false)
      }
    }

    fetchCommunityClaims()
  }, [])

  // Fallback data if live data is unavailable
  const fallbackCommunityPosts = [
    {
      id: 1,
      author: "Sarah M.",
      avatar: "/diverse-woman-portrait.png",
      location: "Toronto, Canada",
      timestamp: "2 hours ago",
      content: "Just discovered that my CGM readings are 15% more accurate when I keep it away from my phone. Anyone else notice this pattern?",
      tags: ["CGM", "Technology", "Accuracy"],
      likes: 47,
      comments: 12,
      shares: 8,
      verified: true,
      engagement: "High",
    },
    {
      id: 2,
      author: "Marcus K.",
      avatar: "/thoughtful-man.png",
      location: "Berlin, Germany",
      timestamp: "4 hours ago",
      content: "Cold weather hack: I wrap my insulin pen in a small heating pad during winter walks. Keeps it from crystallizing and maintains effectiveness.",
      tags: ["Insulin", "Winter", "DIY Solution"],
      likes: 89,
      comments: 23,
      shares: 34,
      verified: true,
      engagement: "Very High",
    },
    {
      id: 3,
      author: "Dr. Lisa Chen",
      avatar: "/caring-doctor.png",
      location: "Singapore",
      timestamp: "6 hours ago",
      content: "New research from our lab shows magnesium supplementation may improve insulin sensitivity by 12-18%. Full study link in comments.",
      tags: ["Research", "Supplements", "Insulin Sensitivity"],
      likes: 156,
      comments: 45,
      shares: 67,
      verified: true,
      engagement: "Viral",
      isExpert: true,
    },
  ]

  // Use real community claims data or fallback
  const communityPosts = claimsLoading ? [] : 
    communityClaims.length > 0 ? 
      communityClaims.slice(0, 10).map((claim, index) => ({
        id: claim.id,
        author: claim.reportedBy,
        avatar: `/avatars/avatar-${(index % 5) + 1}.jpg`,
        location: claim.platform,
        content: claim.claim,
        timestamp: new Date(claim.timestamp).toLocaleDateString(),
        likes: claim.upvotes,
        comments: claim.comments,
        shares: Math.floor(Math.random() * 10) + 2,
        verified: claim.verificationStatus === 'verified',
        engagement: claim.upvotes > 50 ? 'High' : claim.upvotes > 20 ? 'Medium' : 'Low',
        tags: [claim.evidenceLevel, claim.platform.split(' ')[0]],
        biologicalPlausibility: claim.biologicalPlausibility,
        platform: claim.platform,
        isExpert: claim.verificationStatus === 'verified' && claim.biologicalPlausibility > 0.8
      })) :
      fallbackCommunityPosts

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            T1D Community Hub
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with the global Type 1 diabetes community, share experiences, and discover real-world solutions
          </p>
        </div>
        
        {/* Simple Test Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Community Posts</h2>
          {claimsLoading ? (
            <p>Loading community posts...</p>
          ) : claimsError ? (
            <p className="text-red-600">Error: {claimsError}</p>
          ) : (
            <div className="space-y-4">
              {communityPosts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar>
                      <AvatarImage src={post.avatar} />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{post.author}</div>
                      <div className="text-sm text-gray-500">{post.location} • {post.timestamp}</div>
                    </div>
                  </div>
                  <p className="mb-3">{post.content}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>👍 {post.likes}</span>
                    <span>💬 {post.comments}</span>
                    <span>📤 {post.shares}</span>
                    {post.verified && <Badge variant="secondary">Verified</Badge>}
                    {post.isExpert && <Badge variant="default">Expert</Badge>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
