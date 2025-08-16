import { NextResponse } from "next/server"
import { dataGenerator } from '@/lib/data-generator'

// Generate dynamic AI patterns based on real T1D research
const generatePatterns = () => {
  return dataGenerator.generateAIPatterns()
}

const mockTrends = [
  { trend: "DIY Closed Loop Adoption", growth: "+34%", timeframe: "6 months", mentions: 2340 },
  { trend: "Continuous Ketone Monitoring", growth: "+127%", timeframe: "3 months", mentions: 1890 },
  { trend: "AI-Powered Insulin Dosing", growth: "+89%", timeframe: "4 months", mentions: 1567 },
  { trend: "Telehealth Consultations", growth: "+56%", timeframe: "6 months", mentions: 3421 },
  { trend: "Wearable Integration", growth: "+78%", timeframe: "5 months", mentions: 2134 },
]

const mockAlerts = [
  {
    alert: "Insulin Pump Occlusion Detection",
    severity: "High",
    description: "Multiple reports of delayed occlusion alerts in specific pump models",
    affectedDevices: "Tandem t:slim X2",
    reportCount: 23,
    affectedUsers: 156,
    geographicSpread: ["North America", "Europe"],
    detectionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    alert: "CGM Adhesive Reactions",
    severity: "Medium",
    description: "Increased reports of skin reactions to new adhesive formulation",
    affectedDevices: "Dexcom G7",
    reportCount: 67,
    affectedUsers: 423,
    geographicSpread: ["North America", "Europe", "Australia"],
    detectionDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    alert: "Sensor Accuracy in Extreme Temperatures",
    severity: "Medium",
    description: "CGM accuracy decreases significantly in temperatures below 0°C or above 40°C",
    affectedDevices: "All CGM systems",
    reportCount: 89,
    affectedUsers: 567,
    geographicSpread: ["Global"],
    detectionDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
]

export async function GET() {
  try {
    // Generate fresh patterns data
    const patterns = generatePatterns()
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))

    return NextResponse.json({
      patterns: patterns,
      trends: mockTrends,
      alerts: mockAlerts,
      summary: {
        totalPatterns: patterns.length,
        highImpactPatterns: patterns.filter(p => p.impact === "High").length,
        newPatternsThisWeek: patterns.filter(p => 
          Date.now() - new Date(p.discoveredAt).getTime() < 7 * 24 * 60 * 60 * 1000
        ).length,
        averageConfidence: Math.round(
          patterns.reduce((acc, p) => acc + (p.confidence * 100), 0) / patterns.length
        ),
        totalSources: patterns.reduce((acc, p) => acc + p.sources, 0),
      },
      lastUpdated: new Date(),
    })
  } catch (error) {
    console.error('Error in AI patterns API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch AI patterns' },
      { status: 500 }
    )
  }
}
