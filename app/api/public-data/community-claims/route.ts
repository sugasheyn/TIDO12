import { NextResponse } from "next/server"
import { dataGenerator } from "@/lib/data-generator"
import { cache } from "@/lib/cache"
import { withRateLimit } from "@/lib/rate-limit"
import { requireAuth, hasPermission } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown'
    if (!withRateLimit(clientIP)) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Rate limit exceeded. Please try again later.",
          retryAfter: 60
        }, 
        { status: 429 }
      )
    }

    // Check cache first
    const cacheKey = 'community-claims'
    const cachedData = cache.get(cacheKey)
    if (cachedData) {
      return NextResponse.json({
        success: true,
        data: cachedData,
        cached: true,
        timestamp: new Date().toISOString()
      })
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const verificationStatus = searchParams.get('verificationStatus')
    const biologicalPlausibility = searchParams.get('biologicalPlausibility')
    const trending = searchParams.get('trending') === 'true'
    const platform = searchParams.get('platform')
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Generate sample data
    const allClaims = dataGenerator.generateSampleCommunityClaims()
    
    // Apply filters
    let filteredClaims = allClaims

    if (verificationStatus) {
      filteredClaims = filteredClaims.filter(claim => 
        claim.verificationStatus === verificationStatus
      )
    }

    if (biologicalPlausibility) {
      filteredClaims = filteredClaims.filter(claim => 
        claim.biologicalPlausibility === biologicalPlausibility
      )
    }

    if (platform) {
      filteredClaims = filteredClaims.filter(claim => 
        claim.platform.toLowerCase().includes(platform.toLowerCase())
      )
    }

    if (category) {
      filteredClaims = filteredClaims.filter(claim => 
        claim.category.toLowerCase().includes(category.toLowerCase())
      )
    }

    // Apply trending analysis if requested
    if (trending) {
      filteredClaims = filteredClaims
        .sort((a, b) => (b.engagementMetrics.views + b.engagementMetrics.shares) - 
                        (a.engagementMetrics.views + a.engagementMetrics.shares))
        .slice(0, 20)
    }

    // Apply pagination
    const paginatedClaims = filteredClaims.slice(offset, offset + limit)

    // Generate insights
    const insights = {
      totalClaims: filteredClaims.length,
      verificationBreakdown: filteredClaims.reduce((acc: any, claim) => {
        acc[claim.verificationStatus] = (acc[claim.verificationStatus] || 0) + 1
        return acc
      }, {}),
      platformBreakdown: filteredClaims.reduce((acc: any, claim) => {
        acc[claim.platform] = (acc[claim.platform] || 0) + 1
        return acc
      }, {}),
      categoryBreakdown: filteredClaims.reduce((acc: any, claim) => {
        acc[claim.category] = (acc[claim.category] || 0) + 1
        return acc
      }, {}),
      averageEngagement: filteredClaims.reduce((sum, claim) => 
        sum + claim.engagementMetrics.views + claim.engagementMetrics.shares, 0
      ) / filteredClaims.length
    }

    // Cache the results for 5 minutes
    cache.set(cacheKey, paginatedClaims, 300)

    return NextResponse.json({
      success: true,
      data: paginatedClaims,
      pagination: {
        total: filteredClaims.length,
        limit,
        offset,
        hasMore: offset + limit < filteredClaims.length
      },
      insights,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error("Failed to fetch community claims data:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch community claims data"
      }, 
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown'
    if (!withRateLimit(clientIP)) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Rate limit exceeded. Please try again later.",
          retryAfter: 60
        }, 
        { status: 429 }
      )
    }

    // Authentication required for POST
    const authHeader = request.headers.get('authorization')
    const authResult = requireAuth(authHeader || undefined)
    
    if (!authResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Authentication required" 
        }, 
        { status: 401 }
      )
    }

    // Check permission to create claims
    if (!hasPermission(authResult.user, 'create', 'community-claims')) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Insufficient permissions to create claims" 
        }, 
        { status: 403 }
      )
    }

    // Parse request body
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.description || !body.category) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing required fields: title, description, category" 
        }, 
        { status: 400 }
      )
    }

    // Create new claim
    const newClaim = {
      id: `claim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: body.title,
      description: body.description,
      category: body.category,
      platform: body.platform || 'web',
      verificationStatus: 'pending',
      biologicalPlausibility: 'unknown',
      sourceUrl: body.sourceUrl || null,
      author: {
        id: authResult.user.id,
        username: authResult.user.username,
        reputation: authResult.user.reputation || 0
      },
      timestamp: new Date().toISOString(),
      engagementMetrics: {
        views: 0,
        likes: 0,
        shares: 0,
        comments: 0
      },
      tags: body.tags || [],
      evidence: body.evidence || [],
      relatedClaims: body.relatedClaims || []
    }

    // In a real app, you'd save this to a database
    // For now, we'll just return the created claim
    return NextResponse.json({
      success: true,
      data: newClaim,
      message: "Claim created successfully",
      timestamp: new Date().toISOString()
    }, { status: 201 })

  } catch (error) {
    console.error("Failed to create community claim:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to create community claim"
      }, 
      { status: 500 }
    )
  }
}

// Helper function to generate sample community claims
function generateSampleCommunityClaims() {
  return [
    {
      id: "claim_001",
      title: "Cinnamon supplementation shows promise in glucose regulation",
      description: "Several community members report improved glucose control with daily cinnamon supplementation. Anecdotal evidence suggests 1-2g daily may help with post-meal spikes.",
      category: "supplementation",
      platform: "Reddit",
      verificationStatus: "verified",
      biologicalPlausibility: "plausible",
      sourceUrl: "https://reddit.com/r/diabetes/comments/example",
      author: {
        id: "user_001",
        username: "GlucoseGuru",
        reputation: 85
      },
      timestamp: "2024-01-15T10:30:00Z",
      engagementMetrics: {
        views: 1250,
        likes: 89,
        shares: 23,
        comments: 45
      },
      tags: ["cinnamon", "glucose-control", "supplements"],
      evidence: [
        {
          type: "anecdotal",
          description: "Personal experience from 15+ community members",
          strength: "moderate"
        }
      ],
      relatedClaims: ["claim_002", "claim_003"]
    },
    {
      id: "claim_002",
      title: "Intermittent fasting improves insulin sensitivity",
      description: "Community members following 16:8 fasting protocols report better insulin sensitivity and more stable glucose readings throughout the day.",
      category: "lifestyle",
      platform: "Facebook",
      verificationStatus: "verified",
      biologicalPlausibility: "plausible",
      sourceUrl: "https://facebook.com/groups/diabetes/example",
      author: {
        id: "user_002",
        username: "FastingFanatic",
        reputation: 92
      },
      timestamp: "2024-01-14T14:20:00Z",
      engagementMetrics: {
        views: 2100,
        likes: 156,
        shares: 67,
        comments: 89
      },
      tags: ["intermittent-fasting", "insulin-sensitivity", "lifestyle"],
      evidence: [
        {
          type: "anecdotal",
          description: "Reports from 25+ community members",
          strength: "strong"
        }
      ],
      relatedClaims: ["claim_001", "claim_004"]
    },
    {
      id: "claim_003",
      title: "Apple cider vinegar before meals reduces glucose spikes",
      description: "Taking 1-2 tablespoons of apple cider vinegar 15 minutes before meals appears to reduce post-meal glucose spikes by 20-30% according to community reports.",
      category: "supplementation",
      platform: "Instagram",
      verificationStatus: "pending",
      biologicalPlausibility: "plausible",
      sourceUrl: "https://instagram.com/p/example",
      author: {
        id: "user_003",
        username: "VinegarVicky",
        reputation: 78
      },
      timestamp: "2024-01-13T09:15:00Z",
      engagementMetrics: {
        views: 890,
        likes: 67,
        shares: 34,
        comments: 28
      },
      tags: ["apple-cider-vinegar", "glucose-spikes", "meal-timing"],
      evidence: [
        {
          type: "anecdotal",
          description: "Personal tracking data from 12 community members",
          strength: "moderate"
        }
      ],
      relatedClaims: ["claim_001", "claim_005"]
    }
  ]
}

// Helper function to generate basic biological analysis
function generateBasicBiologicalAnalysis(claims: any[]) {
  return {
    totalClaims: claims.length,
    verificationStatus: {
      verified: claims.filter(c => c.verificationStatus === 'verified').length,
      pending: claims.filter(c => c.verificationStatus === 'pending').length,
      disputed: claims.filter(c => c.verificationStatus === 'disputed').length
    },
    biologicalPlausibility: {
      plausible: claims.filter(c => c.biologicalPlausibility === 'plausible').length,
      unlikely: claims.filter(c => c.biologicalPlausibility === 'unlikely').length,
      unknown: claims.filter(c => c.biologicalPlausibility === 'unknown').length
    },
    topCategories: claims.reduce((acc: any, claim) => {
      acc[claim.category] = (acc[claim.category] || 0) + 1
      return acc
    }, {}),
    averageEngagement: claims.reduce((sum, claim) => 
      sum + claim.engagementMetrics.views + claim.engagementMetrics.shares, 0
    ) / claims.length
  }
}

