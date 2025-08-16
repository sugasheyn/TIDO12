import { NextResponse } from "next/server"
import { publicDataRetriever } from "@/lib/public-data-retriever"

export async function GET() {
  try {
    // Retrieve both glucose and insulin data
    const glucoseData = await publicDataRetriever.retrieveGlucoseData()
    const insulinData = await publicDataRetriever.retrieveInsulinData()
    
    // Analyze patterns in the data
    const patterns = await publicDataRetriever.analyzePatterns(glucoseData, insulinData)
    
    // Simulate API delay for realistic behavior
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return NextResponse.json({
      success: true,
      data: patterns,
      summary: {
        totalPatterns: patterns.length,
        patternTypes: [...new Set(patterns.map(p => p.type))],
        highConfidencePatterns: patterns.filter(p => p.confidence > 0.8).length,
        newPatternsToday: patterns.filter(p => {
          const today = new Date()
          const patternDate = new Date(p.discoveredAt)
          return patternDate.toDateString() === today.toDateString()
        }).length,
        averageConfidence: patterns.length > 0 
          ? Math.round(patterns.reduce((sum, p) => sum + p.confidence, 0) / patterns.length * 100) / 100
          : 0,
        totalDataPoints: patterns.reduce((sum, p) => sum + p.dataPoints, 0)
      },
      insights: {
        glucosePatterns: patterns.filter(p => p.type === 'glucose_pattern'),
        insulinPatterns: patterns.filter(p => p.type === 'insulin_pattern'),
        correlations: patterns.filter(p => p.type === 'correlation'),
        anomalies: patterns.filter(p => p.type === 'anomaly')
      },
      lastUpdated: publicDataRetriever.getLastRetrieved(),
      nextUpdate: new Date(Date.now() + 60 * 60 * 1000) // Next hour
    })
    
  } catch (error) {
    console.error('Error analyzing patterns:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to analyze patterns',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
