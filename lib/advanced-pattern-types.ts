export interface CrossDatasetPattern {
  id: string
  name: string
  description: string
  dataTypes: string[]
  algorithm: string
  confidence: number
  significance: number
  relationships: DataRelationship[]
  insights: GeneratedInsight[]
  validationStatus: "pending" | "validated" | "rejected"
  clinicalRelevance: "low" | "medium" | "high" | "critical"
}

export interface DataRelationship {
  id: string
  sourceType: "social_post" | "research_paper" | "clinical_study" | "user_experience" | "device_data"
  targetType: "social_post" | "research_paper" | "clinical_study" | "user_experience" | "device_data"
  relationshipType: "causal" | "correlational" | "temporal" | "semantic" | "contradictory"
  strength: number
  direction: "bidirectional" | "unidirectional"
  evidence: RelationshipEvidence[]
  temporalPattern?: TemporalPattern
}

export interface RelationshipEvidence {
  sourceId: string
  content: string
  confidence: number
  timestamp: string
  metadata: Record<string, any>
}

export interface TemporalPattern {
  pattern: "seasonal" | "daily" | "weekly" | "monthly" | "event_driven"
  frequency: number
  amplitude: number
  phase: number
  trend: "increasing" | "decreasing" | "stable" | "cyclical"
}

export interface GeneratedInsight {
  id: string
  title: string
  description: string
  type: "discovery" | "correlation" | "prediction" | "recommendation" | "warning"
  confidence: number
  supportingEvidence: string[]
  contradictingEvidence: string[]
  actionable: boolean
  urgency: "low" | "medium" | "high" | "critical"
  potentialImpact: string
}

export interface MultiModalAnalysis {
  id: string
  inputSources: DataSource[]
  algorithms: AnalysisAlgorithm[]
  results: AnalysisResult[]
  crossValidation: CrossValidationResult
  emergentPatterns: EmergentPattern[]
}

export interface DataSource {
  id: string
  type: string
  format: "text" | "numerical" | "temporal" | "categorical" | "multimedia"
  quality: number
  volume: number
  velocity: number
  variety: number
}

export interface AnalysisAlgorithm {
  name: string
  type: "statistical" | "machine_learning" | "deep_learning" | "graph_based" | "topological"
  parameters: Record<string, any>
  performance: AlgorithmPerformance
}

export interface AlgorithmPerformance {
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  processingTime: number
  scalability: number
}

export interface DetectedPattern {
  id: string
  description: string
  type: string
  confidence: number
}

export interface AnalysisResult {
  algorithmName: string
  patterns: DetectedPattern[]
  relationships: DataRelationship[]
  anomalies: DetectedAnomaly[]
  predictions: Prediction[]
}

export interface DetectedAnomaly {
  id: string
  type: "statistical" | "temporal" | "behavioral" | "contextual"
  description: string
  severity: number
  affectedDataPoints: string[]
  potentialCauses: string[]
}

export interface Prediction {
  id: string
  target: string
  value: any
  confidence: number
  timeHorizon: string
  methodology: string
  assumptions: string[]
}

export interface CrossValidationResult {
  overallConfidence: number
  agreementScore: number
  conflictingResults: ConflictingResult[]
  consensusFindings: ConsensusFinding[]
}

export interface ConflictingResult {
  algorithms: string[]
  conflictType: "value" | "interpretation" | "significance"
  description: string
  resolutionStrategy: string
}

export interface ConsensusFinding {
  finding: string
  supportingAlgorithms: string[]
  confidence: number
  significance: number
}

export interface EmergentPattern {
  id: string
  description: string
  emergenceLevel: number
  complexity: number
  novelty: number
  stability: number
  predictability: number
}
