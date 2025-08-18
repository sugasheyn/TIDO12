import { NextResponse } from "next/server"
import { realAPIs } from "@/lib/real-apis"

export async function GET(request: Request) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const verificationStatus = searchParams.get('verificationStatus')
    const biologicalPlausibility = searchParams.get('biologicalPlausibility')
    const trending = searchParams.get('trending') === 'true'
    const platform = searchParams.get('platform')
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Get real community data from multiple sources
    const allClaims = await realAPIs.getCombinedCommunityData()
    
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
        claim.platform?.toLowerCase().includes(platform.toLowerCase())
      )
    }

    if (category) {
      filteredClaims = filteredClaims.filter(claim => 
        claim.category?.toLowerCase().includes(category.toLowerCase())
      )
    }

    // Apply pagination
    const paginatedClaims = filteredClaims.slice(offset, offset + limit)

    // Generate insights
    const insights = {
      totalClaims: filteredClaims.length,
      verificationBreakdown: {
        verified: filteredClaims.filter(c => c.verificationStatus === 'verified').length,
        unverified: filteredClaims.filter(c => c.verificationStatus === 'unverified').length,
        community: filteredClaims.filter(c => c.verificationStatus === 'community').length
      },
      platformBreakdown: filteredClaims.reduce((acc, claim) => {
        acc[claim.platform] = (acc[claim.platform] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      categoryBreakdown: filteredClaims.reduce((acc, claim) => {
        acc[claim.category] = (acc[claim.category] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      averageEngagement: filteredClaims.length > 0 
        ? Math.round(filteredClaims.reduce((sum, c) => sum + (c.engagementMetrics?.views || 0), 0) / filteredClaims.length)
        : 0
    }

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
    console.error('Error retrieving community claims:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to retrieve community claims',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
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
      platform: body.platform || 'User Submitted',
      verificationStatus: 'pending',
      biologicalPlausibility: 'unknown',
      sourceUrl: body.sourceUrl || null,
      author: {
        id: body.authorId || 'user',
        username: body.authorName || 'Anonymous',
        reputation: body.authorReputation || 0
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
      message: "Community claim created successfully",
      timestamp: new Date().toISOString()
    }, { status: 201 })

  } catch (error) {
    console.error("Failed to create community claim:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to create community claim",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

