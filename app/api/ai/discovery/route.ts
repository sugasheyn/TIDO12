import { type NextRequest, NextResponse } from "next/server"
import { AdvancedDiscoveryAIModels } from "@/lib/advanced-discovery-ai-models"
import { DiscoveryPipelineInput } from "@/lib/advanced-discovery-ai-types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { textContent, timestamps, sources, userInteractions, environmentalData, policyData } = body

    // Validate input
    if (!textContent || !Array.isArray(textContent) || textContent.length === 0) {
      return NextResponse.json(
        { error: "textContent is required and must be a non-empty array" },
        { status: 400 }
      )
    }

    if (!timestamps || !Array.isArray(timestamps) || timestamps.length !== textContent.length) {
      return NextResponse.json(
        { error: "timestamps must be an array with the same length as textContent" },
        { status: 400 }
      )
    }

    // Initialize the advanced discovery AI models
    const discoveryModels = new AdvancedDiscoveryAIModels()

    // Prepare input for the discovery pipeline
    const pipelineInput: DiscoveryPipelineInput = {
      textContent: textContent.map(text => String(text)),
      timestamps: timestamps.map(ts => new Date(ts)),
      sources: sources || [],
      userInteractions: userInteractions || [],
      environmentalData: environmentalData || [],
      policyData: policyData || []
    }

    // Run the complete discovery pipeline with all 11 models
    const results = await discoveryModels.runDiscoveryPipeline(pipelineInput)

    return NextResponse.json({
      success: true,
      message: "Discovery pipeline completed successfully",
      results,
      metadata: {
        modelsExecuted: 11,
        totalProcessingTime: results.processingTime,
        overallDiscoveryScore: results.overallDiscoveryScore,
        confidence: results.confidence,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error("Discovery pipeline error:", error)
    return NextResponse.json(
      { 
        error: "Failed to run discovery pipeline",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const modelType = searchParams.get("model") || "all"

    // Initialize the discovery models
    const discoveryModels = new AdvancedDiscoveryAIModels()

    // Return model information and capabilities
    const modelInfo = {
      totalModels: 11,
      models: [
        {
          id: "entity_co_evolution",
          name: "Entity Co-evolution Tracker",
          description: "Tracks how two or more entities change in discussion over time",
          category: "Discovery & Relationship",
          priority: "high",
          example: "Libre 3 + compression lows relationship strength over time"
        },
        {
          id: "intervention_lag_finder",
          name: "Intervention-Outcome Lag Finder",
          description: "Finds time lags between interventions and reported effects",
          category: "Discovery & Relationship",
          priority: "high",
          example: "Algorithm update → hypo reports lag distribution per device"
        },
        {
          id: "concept_drift_detector",
          name: "Concept Drift Detector",
          description: "Detects when meaning/context of key terms changes",
          category: "Discovery & Relationship",
          priority: "medium",
          example: "Loop discussion shifts from DIY systems to commercial products"
        },
        {
          id: "emerging_feature_forecaster",
          name: "Emerging Device Feature Forecaster",
          description: "Predicts which device features will trend in next 3-6 months",
          category: "Predictive & Forecasting",
          priority: "medium",
          example: "Hydration tracking feature adoption prediction"
        },
        {
          id: "adverse_event_warning",
          name: "Adverse Event Early Warning",
          description: "Aggregates weak signals to forecast safety issues",
          category: "Predictive & Forecasting",
          priority: "high",
          example: "Probability of adhesive detachment cluster forming"
        },
        {
          id: "persona_classifier",
          name: "Persona Archetype Classifier",
          description: "Identifies archetypes in the community",
          category: "Behaviour & Culture",
          priority: "medium",
          example: "Data-driven optimizer vs Low-carb advocate identification"
        },
        {
          id: "behavior_sequence_model",
          name: "Behavior Change Sequence Model",
          description: "Models likely behavioral steps after specific trigger events",
          category: "Behaviour & Culture",
          priority: "medium",
          example: "High alarm at night → basal adjustment → monitoring sequence"
        },
        {
          id: "enviro_health_correlator",
          name: "EnviroHealth Correlator",
          description: "Links environmental conditions to health outcomes",
          category: "External Signal Fusion",
          priority: "low",
          example: "Heat index above 90°F → adhesive detachment reports ↑ 15%"
        },
        {
          id: "policy_impact_miner",
          name: "Policy Impact Signal Miner",
          description: "Detects shifts in conversation after new policies/regulations",
          category: "External Signal Fusion",
          priority: "low",
          example: "School glucose-monitor policy impact on caregiver discussions"
        },
        {
          id: "claim_matcher",
          name: "Debunk-Assist Claim Matcher",
          description: "Matches emerging claims to existing fact-checks or literature",
          category: "Discourse & Misinformation",
          priority: "high",
          example: "Lemon confusion relief claim matching to scientific evidence"
        },
        {
          id: "consensus_mapper",
          name: "Polarisation & Consensus Mapper",
          description: "Measures divergence/convergence of opinion on contentious topics",
          category: "Discourse & Misinformation",
          priority: "medium",
          example: "Ultra-low carb in T1D children consensus mapping"
        }
      ],
      categories: [
        "Discovery & Relationship",
        "Predictive & Forecasting", 
        "Behaviour & Culture",
        "External Signal Fusion",
        "Discourse & Misinformation"
      ],
      capabilities: [
        "Real-time entity relationship tracking",
        "Intervention-outcome lag analysis",
        "Concept drift detection",
        "Feature trend forecasting",
        "Early warning systems",
        "Community persona classification",
        "Behavioral sequence modeling",
        "Environmental health correlation",
        "Policy impact analysis",
        "Claim verification assistance",
        "Consensus and polarization mapping"
      ],
      integration: {
        compatibleWith: [
          "Existing extraction/sentiment/stance pipeline",
          "RSS feed system",
          "Social media correlation analyzer",
          "Advanced AI research models"
        ],
        processingModes: [
          "Batch processing",
          "Real-time streaming",
          "Scheduled analysis",
          "On-demand discovery"
        ]
      }
    }

    return NextResponse.json({
      success: true,
      message: "Discovery AI Models Information",
      data: modelInfo
    })

  } catch (error) {
    console.error("Error getting discovery models info:", error)
    return NextResponse.json(
      { 
        error: "Failed to get discovery models information",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}
