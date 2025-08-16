import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const severity = searchParams.get("severity")
    const timeframe = searchParams.get("timeframe") || "7d"

    const anomalies = await detectAnomalies(severity, timeframe)

    return NextResponse.json({
      success: true,
      anomalies,
      detection_algorithms: [
        "statistical_outlier_detection",
        "isolation_forest",
        "temporal_anomaly_detection",
        "geographic_clustering",
      ],
    })
  } catch (error) {
    return NextResponse.json({ error: "Anomaly detection failed" }, { status: 500 })
  }
}

async function detectAnomalies(severity: string | null, timeframe: string) {
  const mockAnomalies = [
    {
      id: "anom_insulin_spike",
      type: "spike",
      entity: "insulin_pricing_discussions",
      severity: "high",
      description: "Unusual 340% increase in insulin pricing complaints from US sources",
      detected_at: new Date().toISOString(),
      expected_value: 127,
      actual_value: 432,
      deviation_score: 4.2,
      potential_causes: [
        "New insurance policy changes",
        "Pharmacy benefit manager updates",
        "Manufacturing supply issues",
      ],
    },
    {
      id: "anom_tech_malfunction",
      type: "spike",
      entity: "pump_malfunction_reports",
      severity: "critical",
      description: "Significant increase in specific pump model malfunction reports",
      detected_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      expected_value: 23,
      actual_value: 89,
      deviation_score: 5.7,
      potential_causes: [
        "Recent firmware update issues",
        "Battery manufacturing defect",
        "Environmental temperature sensitivity",
      ],
    },
    {
      id: "anom_geographic",
      type: "geographic_anomaly",
      entity: "new_diagnosis_discussions",
      severity: "medium",
      description: "Unexpected cluster of new T1D diagnosis discussions in rural areas",
      detected_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      expected_value: 45,
      actual_value: 78,
      deviation_score: 2.8,
      potential_causes: [
        "Seasonal viral outbreak correlation",
        "Environmental factor investigation needed",
        "Improved rural healthcare access",
      ],
    },
  ]

  return severity ? mockAnomalies.filter((a) => a.severity === severity) : mockAnomalies
}
