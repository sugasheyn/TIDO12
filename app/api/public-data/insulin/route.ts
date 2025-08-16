import { NextResponse } from "next/server"
import { publicDataRetriever } from "@/lib/public-data-retriever"

export async function GET() {
  try {
    // Retrieve real-time insulin data from public sources
    const insulinData = await publicDataRetriever.retrieveInsulinData()
    
    // Simulate API delay for realistic behavior
    await new Promise(resolve => setTimeout(resolve, 200))
    
    return NextResponse.json({
      success: true,
      data: insulinData,
      summary: {
        totalDataPoints: insulinData.length,
        sources: [...new Set(insulinData.map(d => d.source))],
        types: [...new Set(insulinData.map(d => d.type))],
        timeRange: {
          start: insulinData.length > 0 ? Math.min(...insulinData.map(d => d.timestamp.getTime())) : null,
          end: insulinData.length > 0 ? Math.max(...insulinData.map(d => d.timestamp.getTime())) : null
        },
        totalInsulin: insulinData.length > 0 
          ? Math.round(insulinData.reduce((sum, d) => sum + d.insulin, 0) * 100) / 100
          : 0,
        averageDose: insulinData.length > 0 
          ? Math.round(insulinData.reduce((sum, d) => sum + d.insulin, 0) / insulinData.length * 100) / 100
          : 0,
        dataQuality: insulinData.length > 0 
          ? insulinData.filter(d => d.confidence > 0.7).length / insulinData.length
          : 0
      },
      lastUpdated: publicDataRetriever.getLastRetrieved(),
      nextUpdate: new Date(Date.now() + 60 * 60 * 1000) // Next hour
    })
    
  } catch (error) {
    console.error('Error retrieving insulin data:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to retrieve insulin data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
