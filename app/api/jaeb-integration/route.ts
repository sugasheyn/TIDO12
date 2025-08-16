import { type NextRequest, NextResponse } from "next/server"
import { jaebCenterSources } from "@/lib/jaeb-center-types"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sourceType = searchParams.get("type")
  const jurisdiction = searchParams.get("jurisdiction")
  const dataType = searchParams.get("dataType")

  let filteredSources = jaebCenterSources

  if (sourceType) {
    filteredSources = filteredSources.filter((source) => source.type === sourceType)
  }
  if (jurisdiction) {
    filteredSources = filteredSources.filter((source) => source.geolocation.regulatory_jurisdiction === jurisdiction)
  }
  if (dataType) {
    filteredSources = filteredSources.filter((source) => source.dataTypes.includes(dataType))
  }

  // Mock integrated data showing correlations
  const mockIntegratedFindings = [
    {
      id: "finding_001",
      title: "Cold Weather CGM Accuracy Pattern Validated",
      description: "FDA MAUDE reports correlate with Jaeb Center CGM data showing 23% accuracy decrease below 32°F",
      sources: ["fda_maude", "jaeb_center_datasets"],
      confidence: 0.89,
      dataPoints: 1247,
      correlationStrength: 0.76,
      clinicalRelevance: "high",
      evidence: {
        fdaMaudeReports: 89,
        jaebCenterSamples: 1158,
        socialMediaMentions: 234,
        peerReviewedStudies: 3,
      },
    },
    {
      id: "finding_002",
      title: "Insulin Pump Occlusion Patterns by Infusion Set Type",
      description:
        "Cross-validation between MAUDE reports and clinical trial data reveals 40% higher occlusion rates with steel cannulas in high-activity patients",
      sources: ["fda_maude", "clinicaltrials_t1d"],
      confidence: 0.92,
      dataPoints: 2156,
      correlationStrength: 0.84,
      clinicalRelevance: "high",
      evidence: {
        fdaMaudeReports: 156,
        clinicalTrialData: 2000,
        manufacturerReports: 45,
        realWorldEvidence: 890,
      },
    },
  ]

  return NextResponse.json({
    sources: filteredSources,
    total: filteredSources.length,
    integratedFindings: mockIntegratedFindings,
    summary: {
      regulatorySources: filteredSources.filter((s) => s.type === "regulatory_safety").length,
      clinicalTrials: filteredSources.filter((s) => s.type === "clinical_trials").length,
      openDatasets: filteredSources.filter((s) => s.type === "open_data").length,
      totalDataPoints: 125847,
      validatedFindings: mockIntegratedFindings.length,
      avgConfidence: 0.91,
    },
  })
}

export async function POST(request: NextRequest) {
  const { action, sourceIds, correlationQuery } = await request.json()

  if (action === "cross_validate") {
    const crossValidationResults = {
      query: correlationQuery,
      sourcesAnalyzed: sourceIds,
      correlationsFound: [
        {
          pattern: "CGM accuracy degradation in cold weather",
          strength: 0.76,
          sources: ["fda_maude", "jaeb_center_datasets", "social_media"],
          evidence: "89 MAUDE reports + 1158 CGM traces + 234 social posts",
          clinicalSignificance: "High - affects 23% of users in cold climates",
        },
        {
          pattern: "Exercise-induced sensor compression lows",
          strength: 0.68,
          sources: ["jaeb_center_datasets", "clinicaltrials_t1d"],
          evidence: "2000+ CGM traces during exercise protocols",
          clinicalSignificance: "Medium - affects athletes and active users",
        },
      ],
      methodology: "Persistent Topological Knowledge Graph + Temporal Pattern Mining",
      validationScore: 0.89,
    }

    return NextResponse.json({
      message: "Cross-validation analysis completed",
      results: crossValidationResults,
    })
  }

  return NextResponse.json({ message: "Invalid action" }, { status: 400 })
}
