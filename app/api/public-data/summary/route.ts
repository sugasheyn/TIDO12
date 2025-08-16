import { NextResponse } from "next/server"
import { publicDataRetriever } from "@/lib/public-data-retriever"

export async function GET() {
  try {
    // Get comprehensive data summary
    const summary = await publicDataRetriever.getDataSummary()
    
    // Simulate API delay for realistic behavior
    await new Promise(resolve => setTimeout(resolve, 150))
    
    return NextResponse.json({
      success: true,
      data: summary,
      metadata: {
        dataSources: [
          'Nightscout Public Instances',
          'OpenAPS Data Repository',
          'Tidepool Public Data',
          'GitHub Diabetes Repositories',
          'Kaggle Diabetes Datasets',
          'PhysioNet CGM Data',
          'UCI Diabetes Dataset'
        ],
        updateFrequency: 'Every hour',
        dataTypes: ['Glucose', 'Insulin', 'Patterns', 'Anomalies'],
        access: 'Public',
        lastRetrieval: publicDataRetriever.getLastRetrieved(),
        nextScheduledUpdate: new Date(Date.now() + 60 * 60 * 1000)
      }
    })
    
  } catch (error) {
    console.error('Error getting data summary:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get data summary',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
