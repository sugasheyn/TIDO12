export interface Pattern {
  id: string
  type: "trend" | "correlation" | "anomaly" | "discovery"
  title: string
  description: string
  confidence: number
  significance: number
  timeframe: {
    start: string
    end: string
  }
  sources: string[]
  entities: string[]
  metrics: {
    frequency: number
    growth_rate: number
    geographic_spread: number
  }
  created_at: string
  status: "active" | "validated" | "dismissed"
}

export interface Correlation {
  id: string
  entity_a: string
  entity_b: string
  correlation_type: "positive" | "negative" | "causal"
  strength: number
  p_value: number
  sample_size: number
  timeframe: string
  geographic_regions: string[]
  supporting_evidence: string[]
}

export interface TrendAnalysis {
  entity: string
  trend_direction: "increasing" | "decreasing" | "stable" | "volatile"
  velocity: number
  acceleration: number
  forecast: {
    next_week: number
    next_month: number
    next_quarter: number
  }
  confidence_intervals: {
    lower: number
    upper: number
  }
}

export interface AnomalyDetection {
  id: string
  type: "spike" | "drop" | "unusual_pattern" | "geographic_anomaly"
  entity: string
  severity: "low" | "medium" | "high" | "critical"
  description: string
  detected_at: string
  expected_value: number
  actual_value: number
  deviation_score: number
  potential_causes: string[]
}
