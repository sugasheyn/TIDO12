import { NextResponse } from "next/server"
import { realAPIs } from "@/lib/real-apis"

export async function GET(request: Request) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const platform = searchParams.get('platform')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Get real research data from multiple sources
    const researchData = await realAPIs.getCombinedResearchData()
    
    // Apply filters
    let filteredData = researchData

    if (type) {
      filteredData = filteredData.filter(item => 
        item.category?.toLowerCase().includes(type.toLowerCase()) ||
        item.platform?.toLowerCase().includes(type.toLowerCase())
      )
    }

    if (platform) {
      filteredData = filteredData.filter(item => 
        item.platform?.toLowerCase().includes(platform.toLowerCase())
      )
    }

    // Apply pagination
    const paginatedData = filteredData.slice(offset, offset + limit)

    // Generate insights
    const insights = {
      totalResearch: filteredData.length,
      platformBreakdown: filteredData.reduce((acc, item) => {
        acc[item.platform] = (acc[item.platform] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      categoryBreakdown: filteredData.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      verificationBreakdown: {
        verified: filteredData.filter(item => item.verificationStatus === 'verified').length,
        unverified: filteredData.filter(item => item.verificationStatus === 'unverified').length
      }
    }

    return NextResponse.json({
      success: true,
      data: paginatedData,
      pagination: {
        total: filteredData.length,
        limit,
        offset,
        hasMore: offset + limit < filteredData.length
      },
      insights,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Error retrieving research data:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to retrieve research data',
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

    // Create new research entry
    const newResearch = {
      id: `research_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
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
      relatedResearch: body.relatedResearch || []
    }

    // In a real app, you'd save this to a database
    // For now, we'll just return the created research entry
    return NextResponse.json({
      success: true,
      data: newResearch,
      message: "Research entry created successfully",
      timestamp: new Date().toISOString()
    }, { status: 201 })

  } catch (error) {
    console.error("Failed to create research entry:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to create research entry",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
