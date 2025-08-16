import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))

    const expandedSources = {
      sources: [
        {
          id: "1",
          name: "r/Type1Diabetes",
          type: "social_media",
          platform: "Reddit",
          url: "https://reddit.com/r/Type1Diabetes",
          status: "active",
          lastChecked: new Date(Date.now() - 2 * 60 * 1000),
          lastUpdate: new Date(Date.now() - 5 * 60 * 1000),
          healthScore: 95,
          pollInterval: 15,
          priority: "high",
          metadata: {
            language: "en",
            region: "global",
            followers: 127000,
            credibilityScore: 85,
            tags: ["community", "support", "experiences", "cgm", "insulin-pumps"],
          },
          rateLimits: {
            requestsPerHour: 100,
            requestsRemaining: 87,
            resetTime: new Date(Date.now() + 45 * 60 * 1000),
          },
          errorCount: 2,
          successCount: 1247,
          recentContent: [
            {
              id: "post_1",
              title: "CGM accuracy in cold weather",
              content: "My Dexcom G7 has been reading 20-30 points higher than finger sticks in cold weather. Anyone else experiencing this?",
              author: "u/glucosewarrior",
              timestamp: new Date(Date.now() - 2 * 60 * 1000),
              engagement: { upvotes: 47, comments: 12 },
              sentiment: "concerned",
              relevance: 94,
            },
            {
              id: "post_2",
              title: "New Omnipod 5 setup",
              content: "Just got my Omnipod 5 today! Any tips for first-time users?",
              author: "u/t1dnewbie",
              timestamp: new Date(Date.now() - 15 * 60 * 1000),
              engagement: { upvotes: 23, comments: 8 },
              sentiment: "excited",
              relevance: 87,
            },
          ],
        },
        {
          id: "2",
          name: "r/diabetes_t1",
          type: "social_media",
          platform: "Reddit",
          url: "https://reddit.com/r/diabetes_t1",
          status: "active",
          lastChecked: new Date(Date.now() - 3 * 60 * 1000),
          lastUpdate: new Date(Date.now() - 8 * 60 * 1000),
          healthScore: 93,
          pollInterval: 15,
          priority: "high",
          metadata: {
            language: "en",
            region: "global",
            followers: 89000,
            credibilityScore: 87,
            tags: ["diy-loop", "technology", "troubleshooting", "lifestyle"],
          },
          rateLimits: {
            requestsPerHour: 100,
            requestsRemaining: 92,
            resetTime: new Date(Date.now() + 42 * 60 * 1000),
          },
          errorCount: 1,
          successCount: 2156,
          recentContent: [
            {
              id: "post_3",
              title: "DIY Loop success story",
              content: "After 6 months with DIY Loop, my A1C dropped from 8.2 to 6.8. The control is incredible!",
              author: "u/loopmaster",
              timestamp: new Date(Date.now() - 25 * 60 * 1000),
              engagement: { upvotes: 156, comments: 34 },
              sentiment: "positive",
              relevance: 96,
            },
          ],
        },
        {
          id: "3",
          name: "Diabetes Care Journal",
          type: "academic",
          url: "https://diabetesjournals.org/care",
          status: "active",
          lastChecked: new Date(Date.now() - 30 * 60 * 1000),
          lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000),
          healthScore: 98,
          pollInterval: 60,
          priority: "high",
          metadata: {
            language: "en",
            credibilityScore: 98,
            tags: ["peer-reviewed", "clinical", "research", "hba1c", "complications"],
          },
          rateLimits: {
            requestsPerHour: 50,
            requestsRemaining: 45,
            resetTime: new Date(Date.now() + 30 * 60 * 1000),
          },
          errorCount: 0,
          successCount: 892,
          recentContent: [
            {
              id: "article_1",
              title: "Impact of CGM on Quality of Life in T1D",
              content: "New study shows significant improvement in quality of life scores with continuous CGM usage...",
              author: "Dr. Sarah Johnson et al.",
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
              engagement: { citations: 12, downloads: 89 },
              sentiment: "neutral",
              relevance: 98,
            },
          ],
        },
      ],
      summary: {
        totalSources: 3,
        activeSources: 3,
        totalContent: 4567,
        newContentToday: 23,
        averageHealthScore: 95.3,
        topPlatforms: ["Reddit", "Academic Journals"],
        topLanguages: ["English"],
        topRegions: ["Global"],
      },
      lastUpdated: new Date(),
    }

    return NextResponse.json(expandedSources)
  } catch (error) {
    console.error('Error in expanded sources API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch expanded sources' },
      { status: 500 }
    )
  }
}
