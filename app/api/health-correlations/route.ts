import { NextResponse } from "next/server"
import { realAPIs } from "@/lib/real-apis"

export async function GET(request: Request) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const factor = searchParams.get('factor')
    const impact = searchParams.get('impact')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Get real health correlation data
    const healthData = await realAPIs.getHealthCorrelationData()
    
    if (!healthData) {
      return NextResponse.json({
        success: false,
        error: 'No health correlation data available',
        timestamp: new Date().toISOString()
      }, { status: 404 })
    }

    // Apply filters
    let filteredCorrelations = healthData.correlations || []

    if (factor) {
      filteredCorrelations = filteredCorrelations.filter(corr => 
        corr.factor?.toLowerCase().includes(factor.toLowerCase())
      )
    }

    if (impact) {
      filteredCorrelations = filteredCorrelations.filter(corr => 
        corr.impact?.toLowerCase().includes(impact.toLowerCase())
      )
    }

    // Apply pagination
    const paginatedCorrelations = filteredCorrelations.slice(offset, offset + limit)

    // Generate insights
    const insights = {
      totalCorrelations: filteredCorrelations.length,
      impactBreakdown: filteredCorrelations.reduce((acc, corr) => {
        acc[corr.impact] = (acc[corr.impact] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      factorBreakdown: filteredCorrelations.reduce((acc, corr) => {
        acc[corr.factor] = (acc[corr.factor] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      averageConfidence: filteredCorrelations.length > 0 
        ? Math.round(filteredCorrelations.reduce((sum, c) => sum + (c.confidence || 0), 0) / filteredCorrelations.length * 100) / 100
        : 0
    }

    return NextResponse.json({
      success: true,
      data: {
        correlations: paginatedCorrelations,
        environmentalData: {
          weather: healthData.weather,
          nutrition: healthData.nutrition
        }
      },
      pagination: {
        total: filteredCorrelations.length,
        limit,
        offset,
        hasMore: offset + limit < filteredCorrelations.length
      },
      insights,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Error retrieving health correlation data:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to retrieve health correlation data',
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
    if (!body.factor || !body.description || !body.impact) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing required fields: factor, description, impact" 
        },
        { status: 400 }
      )
    }

    // Create new correlation entry
    const newCorrelation = {
      id: `correlation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      factor: body.factor,
      impact: body.impact,
      description: body.description,
      confidence: body.confidence || 0.5,
      recommendation: body.recommendation || 'No specific recommendation',
      timestamp: new Date().toISOString(),
      source: body.source || 'User Submitted',
      evidence: body.evidence || []
    }

    // In a real app, you'd save this to a database
    // For now, we'll just return the created correlation entry
    return NextResponse.json({
      success: true,
      data: newCorrelation,
      message: "Health correlation entry created successfully",
      timestamp: new Date().toISOString()
    }, { status: 201 })

  } catch (error) {
    console.error("Failed to create health correlation entry:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to create health correlation entry",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
