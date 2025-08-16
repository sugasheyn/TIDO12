import { type NextRequest, NextResponse } from "next/server"
import type { UnifiedContent, ContentRelationship } from "@/lib/unified-types"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")
  const contentTypes = searchParams.get("types")?.split(",")
  const limit = Number.parseInt(searchParams.get("limit") || "50")
  const includeRelationships = searchParams.get("relationships") === "true"

  // Mock unified content with real-world examples
  const mockContent: UnifiedContent[] = [
    {
      id: "content_001",
      type: "social_post",
      title: "CGM readings way off during cold weather",
      content:
        "Anyone else notice their Dexcom G7 readings are completely wrong when it's below freezing? Mine showed 180 when I was actually 95. Happened three times this week during my morning runs.",
      originalLanguage: "en",
      source: {
        id: "reddit_t1d",
        name: "r/Type1Diabetes",
        platform: "Reddit",
        url: "https://reddit.com/r/Type1Diabetes/comments/abc123",
        credibility: 85,
        type: "social_media",
      },
      publishedAt: new Date("2024-12-10T08:30:00Z"),
      collectedAt: new Date("2024-12-10T08:35:00Z"),
      lastAnalyzed: new Date("2024-12-10T09:00:00Z"),
      sentiment: {
        overall: "negative",
        confidence: 0.87,
        scores: { positive: 0.1, negative: 0.8, neutral: 0.1 },
        emotions: {
          joy: 0.05,
          sadness: 0.3,
          anger: 0.4,
          fear: 0.2,
          surprise: 0.05,
          trust: 0.1,
          anticipation: 0.1,
          disgust: 0.15,
        },
        aspects: [
          { aspect: "Dexcom G7", sentiment: "negative", confidence: 0.9 },
          { aspect: "cold weather", sentiment: "negative", confidence: 0.85 },
        ],
      },
      entities: {
        symptoms: [
          {
            text: "readings wrong",
            normalizedText: "inaccurate_readings",
            confidence: 0.92,
            startIndex: 45,
            endIndex: 58,
            category: "device_issue",
            attributes: {},
            linkedEntities: ["symptom_001"],
          },
        ],
        devices: [
          {
            text: "Dexcom G7",
            normalizedText: "dexcom_g7",
            confidence: 0.98,
            startIndex: 67,
            endIndex: 76,
            category: "cgm",
            attributes: { brand: "Dexcom", model: "G7" },
            linkedEntities: ["device_001"],
          },
        ],
        medications: [],
        treatments: [],
        people: [],
        organizations: [
          {
            text: "Dexcom",
            normalizedText: "dexcom",
            confidence: 0.95,
            startIndex: 67,
            endIndex: 73,
            category: "medical_device_company",
            attributes: {},
            linkedEntities: ["org_001"],
          },
        ],
        locations: [],
        conditions: [],
        activities: [
          {
            text: "morning runs",
            normalizedText: "running",
            confidence: 0.88,
            startIndex: 180,
            endIndex: 192,
            category: "exercise",
            attributes: { time: "morning" },
            linkedEntities: ["activity_001"],
          },
        ],
        foods: [],
        emotions: [],
        timeReferences: [
          {
            text: "this week",
            normalizedText: "current_week",
            confidence: 0.9,
            startIndex: 150,
            endIndex: 159,
            category: "temporal",
            attributes: {},
            linkedEntities: [],
          },
        ],
      },
      topics: [
        {
          topic: "CGM Accuracy Issues",
          confidence: 0.95,
          keywords: ["cgm", "readings", "wrong", "accuracy"],
          relatedTopics: ["device_reliability", "environmental_factors"],
        },
        {
          topic: "Cold Weather Effects",
          confidence: 0.88,
          keywords: ["cold", "freezing", "weather"],
          relatedTopics: ["environmental_conditions", "sensor_performance"],
        },
      ],
      urgency: "medium",
      engagement: { views: 1247, likes: 89, comments: 23, shares: 12 },
      geographic: { country: "US", region: "Northeast" },
      relationships: [
        {
          id: "rel_001",
          targetContentId: "content_002",
          relationshipType: "similar_to",
          strength: 0.85,
          confidence: 0.92,
          evidence: [
            "Both discuss CGM accuracy in cold weather",
            "Similar device mentioned",
            "Similar symptoms reported",
          ],
          discoveredBy: "ai_algorithm",
          discoveredAt: new Date("2024-12-10T09:15:00Z"),
          algorithm: "semantic_similarity_v2",
          validated: true,
        },
      ],
      qualityScore: 0.78,
      isValidated: true,
      validatedBy: ["community_moderator"],
      processingStatus: "completed",
      confidence: 0.89,
      metadata: {
        reddit_score: 89,
        reddit_comments: 23,
        subreddit: "Type1Diabetes",
        author_karma: 2847,
      },
    },
    {
      id: "content_002",
      type: "research_paper",
      title: "Environmental Temperature Effects on Continuous Glucose Monitor Accuracy: A Systematic Review",
      content:
        "Background: Continuous glucose monitors (CGMs) are increasingly used for diabetes management, but environmental factors may affect their accuracy. This systematic review examines the impact of temperature variations on CGM performance across multiple device types and environmental conditions...",
      originalLanguage: "en",
      source: {
        id: "diabetes_care_journal",
        name: "Diabetes Care",
        platform: "PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/12345678",
        credibility: 98,
        type: "academic",
      },
      publishedAt: new Date("2024-11-15T00:00:00Z"),
      collectedAt: new Date("2024-11-16T10:00:00Z"),
      lastAnalyzed: new Date("2024-11-16T11:30:00Z"),
      sentiment: {
        overall: "neutral",
        confidence: 0.95,
        scores: { positive: 0.3, negative: 0.2, neutral: 0.5 },
        emotions: {
          joy: 0.1,
          sadness: 0.05,
          anger: 0.02,
          fear: 0.08,
          surprise: 0.15,
          trust: 0.4,
          anticipation: 0.2,
          disgust: 0.02,
        },
        aspects: [
          { aspect: "CGM accuracy", sentiment: "neutral", confidence: 0.92 },
          { aspect: "temperature effects", sentiment: "negative", confidence: 0.78 },
        ],
      },
      entities: {
        symptoms: [],
        devices: [
          {
            text: "continuous glucose monitors",
            normalizedText: "cgm",
            confidence: 0.99,
            startIndex: 45,
            endIndex: 72,
            category: "medical_device",
            attributes: { type: "glucose_monitoring" },
            linkedEntities: ["device_001"],
          },
          {
            text: "CGMs",
            normalizedText: "cgm",
            confidence: 0.99,
            startIndex: 74,
            endIndex: 78,
            category: "medical_device",
            attributes: { type: "glucose_monitoring" },
            linkedEntities: ["device_001"],
          },
        ],
        medications: [],
        treatments: [],
        people: [],
        organizations: [],
        locations: [],
        conditions: [
          {
            text: "diabetes",
            normalizedText: "diabetes",
            confidence: 0.99,
            startIndex: 95,
            endIndex: 103,
            category: "medical_condition",
            attributes: { type: "chronic_disease" },
            linkedEntities: ["condition_001"],
          },
        ],
        activities: [],
        foods: [],
        emotions: [],
        timeReferences: [],
      },
      topics: [
        {
          topic: "CGM Accuracy Research",
          confidence: 0.98,
          keywords: ["cgm", "accuracy", "systematic review", "performance"],
          relatedTopics: ["medical_device_validation", "diabetes_technology"],
        },
        {
          topic: "Environmental Factors",
          confidence: 0.92,
          keywords: ["temperature", "environmental", "conditions"],
          relatedTopics: ["device_performance", "external_influences"],
        },
      ],
      urgency: "low",
      engagement: { views: 2847, citations: 12, downloads: 156 },
      geographic: { country: "US", region: "National" },
      relationships: [
        {
          id: "rel_002",
          targetContentId: "content_001",
          relationshipType: "supports",
          strength: 0.92,
          confidence: 0.88,
          evidence: [
            "Research confirms temperature effects on CGM accuracy",
            "Validates user-reported issues",
            "Provides scientific backing",
          ],
          discoveredBy: "ai_algorithm",
          discoveredAt: new Date("2024-12-10T09:15:00Z"),
          algorithm: "causal_inference_v1",
          validated: true,
        },
      ],
      qualityScore: 0.96,
      isValidated: true,
      validatedBy: ["peer_review", "editorial_board"],
      processingStatus: "completed",
      confidence: 0.97,
      metadata: {
        doi: "10.2337/dc24-1234",
        journal_impact_factor: 8.92,
        peer_reviewed: true,
        study_type: "systematic_review",
        sample_size: 2847,
        authors: ["Dr. Sarah Johnson", "Dr. Michael Chen", "Dr. Lisa Rodriguez"],
      },
    },
  ]

  let filteredContent = mockContent

  if (contentTypes) {
    filteredContent = filteredContent.filter((content) => contentTypes.includes(content.type))
  }

  if (query) {
    filteredContent = filteredContent.filter(
      (content) =>
        content.title.toLowerCase().includes(query.toLowerCase()) ||
        content.content.toLowerCase().includes(query.toLowerCase()),
    )
  }

  return NextResponse.json({
    content: filteredContent.slice(0, limit),
    total: filteredContent.length,
    relationships: includeRelationships ? await getContentRelationships(filteredContent.map((c) => c.id)) : [],
    summary: {
      byType: getContentSummaryByType(filteredContent),
      totalRelationships: filteredContent.reduce((acc, c) => acc + c.relationships.length, 0),
      avgQualityScore: filteredContent.reduce((acc, c) => acc + c.qualityScore, 0) / filteredContent.length,
      validatedContent: filteredContent.filter((c) => c.isValidated).length,
    },
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  // Create new unified content entry
  const newContent: UnifiedContent = {
    id: `content_${Date.now()}`,
    ...body,
    collectedAt: new Date(),
    lastAnalyzed: new Date(),
    relationships: [],
    processingStatus: "pending",
    confidence: 0,
    qualityScore: 0,
    isValidated: false,
  }

  // Trigger relationship discovery
  setTimeout(() => discoverRelationships(newContent.id), 1000)

  return NextResponse.json({
    success: true,
    content: newContent,
    message: "Content added to unified database. Relationship discovery initiated.",
  })
}

async function getContentRelationships(contentIds: string[]): Promise<ContentRelationship[]> {
  // Mock relationship data
  return [
    {
      id: "rel_001",
      targetContentId: "content_002",
      relationshipType: "supports",
      strength: 0.92,
      confidence: 0.88,
      evidence: [
        "Research confirms user-reported temperature effects",
        "Scientific validation of community observations",
      ],
      discoveredBy: "ai_algorithm",
      discoveredAt: new Date("2024-12-10T09:15:00Z"),
      algorithm: "causal_inference_v1",
      validated: true,
    },
  ]
}

function getContentSummaryByType(content: UnifiedContent[]) {
  const summary: Record<string, number> = {}
  content.forEach((c) => {
    summary[c.type] = (summary[c.type] || 0) + 1
  })
  return summary
}

async function discoverRelationships(contentId: string) {
  // Mock relationship discovery process
  console.log(`Discovering relationships for content ${contentId}`)
}
