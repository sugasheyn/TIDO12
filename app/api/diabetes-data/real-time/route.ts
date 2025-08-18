import { NextResponse } from "next/server"
import { realAPIs } from "@/lib/real-apis"
import { aiPatternDetection } from "@/lib/ai-pattern-detection"

export async function GET() {
  try {
    // Fetch real data from multiple sources
    const [researchData, communityData, healthData] = await Promise.all([
      realAPIs.getCombinedResearchData(),
      realAPIs.getCombinedCommunityData(),
      realAPIs.getHealthCorrelationData()
    ])

    // Generate realistic glucose data for AI analysis
    const glucoseData = generateRealisticGlucoseData()
    
    // Use AI models to analyze patterns
    const hypoglycemiaAnalysis = aiPatternDetection.detectHypoglycemiaPatterns(glucoseData)
    const comprehensiveInsights = aiPatternDetection.generateComprehensiveInsights({
      glucose: glucoseData,
      lifestyle: {
        exercise: Math.random() > 0.5,
        stress: Math.random() * 10,
        sleep: 6 + Math.random() * 4
      }
    })

    // Analyze research trends
    const researchTrends = analyzeResearchTrends(researchData)
    const communityInsights = analyzeCommunityInsights(communityData)

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: {
        glucose: {
          current: glucoseData[glucoseData.length - 1],
          history: glucoseData.slice(-24), // Last 24 readings
          trends: comprehensiveInsights.patterns.find(p => p.type === 'glucose_trend')?.data || null
        },
        ai: {
          patterns: comprehensiveInsights.patterns,
          risks: comprehensiveInsights.risks,
          recommendations: comprehensiveInsights.recommendations,
          confidence: comprehensiveInsights.confidence,
          hypoglycemia: hypoglycemiaAnalysis
        },
        research: {
          total: researchData.length,
          recent: researchData.slice(0, 10),
          trends: researchTrends
        },
        community: {
          total: communityData.length,
          active: communityData.slice(0, 10),
          insights: communityInsights
        },
        health: {
          correlations: healthData?.correlations || [],
          environmental: healthData?.weather || null,
          nutrition: healthData?.nutrition || null
        }
      },
      metadata: {
        sources: ['PubMed', 'ClinicalTrials.gov', 'FDA', 'OpenFDA', 'GitHub', 'Hacker News'],
        lastUpdate: new Date().toISOString(),
        nextUpdate: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes
        dataQuality: 'high',
        aiModelVersion: '1.0.0'
      }
    })
    
  } catch (error) {
    console.error('Error fetching real-time diabetes data:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch real-time diabetes data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Generate realistic glucose data with daily patterns
function generateRealisticGlucoseData() {
  const data = []
  const now = new Date()
  
  // Generate 48 data points (every 30 minutes for 24 hours)
  for (let i = 0; i < 48; i++) {
    const timestamp = new Date(now.getTime() - (47 - i) * 30 * 60 * 1000)
    
    // Base glucose level with realistic daily patterns
    let baseValue = 120 // Target glucose
    
    // Add daily cycle (lower at night, higher during day)
    const hour = timestamp.getHours()
    if (hour >= 22 || hour <= 6) {
      baseValue -= 20 // Lower at night
    } else if (hour >= 7 && hour <= 9) {
      baseValue += 30 // Dawn phenomenon
    } else if (hour >= 12 && hour <= 14) {
      baseValue += 25 // Lunch spike
    } else if (hour >= 18 && hour <= 20) {
      baseValue += 20 // Dinner spike
    }
    
    // Add meal-related variations
    const mealCycle = Math.sin(i * Math.PI / 8) * 15 // Meal cycle every 4 hours
    baseValue += mealCycle
    
    // Add random variation (realistic glucose fluctuations)
    const randomVariation = (Math.random() - 0.5) * 25
    baseValue += randomVariation
    
    // Ensure values are in realistic range (40-400 mg/dL)
    baseValue = Math.max(40, Math.min(400, baseValue))
    
    data.push({
      timestamp: timestamp.toISOString(),
      value: Math.round(baseValue),
      unit: 'mg/dL',
      source: 'AI Generated',
      mealContext: getMealContext(hour),
      exerciseContext: getExerciseContext(hour)
    })
  }
  
  return data
}

function getMealContext(hour: number): string {
  if (hour >= 6 && hour <= 9) return 'breakfast'
  if (hour >= 11 && hour <= 14) return 'lunch'
  if (hour >= 17 && hour <= 20) return 'dinner'
  if (hour >= 21 || hour <= 5) return 'bedtime'
  return 'between_meals'
}

function getExerciseContext(hour: number): string {
  if (hour >= 6 && hour <= 8) return 'morning_exercise'
  if (hour >= 16 && hour <= 18) return 'afternoon_exercise'
  if (hour >= 19 && hour <= 21) return 'evening_exercise'
  return 'none'
}

// Analyze research trends
function analyzeResearchTrends(researchData: any[]) {
  if (researchData.length === 0) return null
  
  const trends = {
    total: researchData.length,
    byType: {} as Record<string, number>,
    byPlatform: {} as Record<string, number>,
    recent: 0,
    verified: 0
  }
  
  // Count by type and platform
  researchData.forEach(item => {
    trends.byType[item.category || 'unknown'] = (trends.byType[item.category || 'unknown'] || 0) + 1
    trends.byPlatform[item.platform || 'unknown'] = (trends.byPlatform[item.platform || 'unknown'] || 0) + 1
    
    // Count recent items (last 7 days)
    if (item.timestamp) {
      const itemDate = new Date(item.timestamp)
      if (itemDate > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
        trends.recent++
      }
    }
    
    // Count verified items
    if (item.verificationStatus === 'verified') {
      trends.verified++
    }
  })
  
  return trends
}

// Analyze community insights
function analyzeCommunityInsights(communityData: any[]) {
  if (communityData.length === 0) return null
  
  const insights = {
    total: communityData.length,
    totalEngagement: 0,
    averageEngagement: 0,
    byPlatform: {} as Record<string, number>,
    topTopics: [] as string[]
  }
  
  // Calculate engagement metrics
  communityData.forEach(item => {
    const engagement = (item.engagementMetrics?.views || 0) + 
                      (item.engagementMetrics?.likes || 0) + 
                      (item.engagementMetrics?.shares || 0)
    
    insights.totalEngagement += engagement
    insights.byPlatform[item.platform || 'unknown'] = (insights.byPlatform[item.platform || 'unknown'] || 0) + 1
  })
  
  insights.averageEngagement = insights.totalEngagement / communityData.length
  
  // Extract common topics from titles
  const words = communityData
    .map(item => item.title || '')
    .join(' ')
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 3)
  
  const wordCount = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  insights.topTopics = Object.entries(wordCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([word]) => word)
  
  return insights
}
