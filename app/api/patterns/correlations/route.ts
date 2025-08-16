import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const entity = searchParams.get("entity")
    const timeframe = searchParams.get("timeframe") || "30d"

    const correlations = await findCorrelations(entity, timeframe)

    return NextResponse.json({
      success: true,
      correlations,
      analysis_date: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Correlation analysis failed" }, { status: 500 })
  }
}

async function findCorrelations(entity: string | null, timeframe: string) {
  // Simulate advanced correlation analysis
  const mockCorrelations = [
    {
      id: "corr_cgm_exercise",
      entity_a: "cgm_readings",
      entity_b: "exercise_intensity",
      correlation_type: "negative",
      strength: -0.67,
      p_value: 0.001,
      sample_size: 2847,
      timeframe: "30d",
      geographic_regions: ["north_america", "europe", "australia"],
      supporting_evidence: [
        "High-intensity exercise correlates with CGM lag",
        "Compression lows during exercise reported",
        "Sensor accuracy decreases with perspiration",
      ],
    },
    {
      id: "corr_sleep_control",
      entity_a: "sleep_quality",
      entity_b: "glucose_control",
      correlation_type: "positive",
      strength: 0.74,
      p_value: 0.0001,
      sample_size: 3921,
      timeframe: "30d",
      geographic_regions: ["global"],
      supporting_evidence: [
        "Better sleep linked to improved time in range",
        "Sleep deprivation increases insulin resistance",
        "Consistent sleep schedules improve dawn phenomenon",
      ],
    },
    {
      id: "corr_stress_bg",
      entity_a: "stress_levels",
      entity_b: "blood_glucose_variability",
      correlation_type: "positive",
      strength: 0.58,
      p_value: 0.01,
      sample_size: 1654,
      timeframe: "30d",
      geographic_regions: ["north_america", "europe"],
      supporting_evidence: [
        "Stress hormones affect glucose metabolism",
        "Work stress correlates with BG spikes",
        "Meditation practices show improved control",
      ],
    },
  ]

  return entity
    ? mockCorrelations.filter((c) => c.entity_a.includes(entity) || c.entity_b.includes(entity))
    : mockCorrelations
}
