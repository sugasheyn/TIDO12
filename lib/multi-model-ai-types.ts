export interface AIModelEnsemble {
  id: string
  name: string
  models: AIModelConfig[]
  votingStrategy: "majority" | "weighted" | "stacking" | "bayesian"
  confidence: number
  performance: EnsemblePerformance
}

export interface AIModelConfig {
  id: string
  name: string
  type:
    | "transformer"
    | "lstm"
    | "cnn"
    | "svm"
    | "random_forest"
    | "xgboost"
    | "bayesian"
    | "neural_ode"
    | "graph_nn"
    | "quantum_inspired"
  version: string
  parameters: Record<string, any>
  specialization: string[]
  weight: number
  accuracy: number
  processingTime: number
}

export interface EnsemblePerformance {
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  auc: number
  calibration: number
  diversity: number
}

export interface BiologicalExplanation {
  id: string
  phenomenon: string
  explanation: string
  mechanism: string
  confidence: number
  supportingEvidence: string[]
  relatedPathways: string[]
  clinicalRelevance: "low" | "medium" | "high" | "critical"
}

export interface UnaddressedDiscovery {
  id: string
  title: string
  description: string
  suggestedSymptoms: string[]
  dataSupport: DataSupport[]
  biologicalRationale: string
  prevalenceEstimate: number
  confidenceScore: number
  researchGaps: string[]
  potentialImpact: string
}

export interface DataSupport {
  sourceType: "social_media" | "clinical_study" | "device_data" | "user_report"
  evidenceCount: number
  strength: number
  examples: string[]
}

export interface CrossExaminationResult {
  id: string
  dataTypes: string[]
  correlationStrength: number
  causalityScore: number
  temporalPattern: string
  geographicPattern: string
  demographicPattern: string
  validationStatus: "pending" | "validated" | "conflicting" | "rejected"
}
