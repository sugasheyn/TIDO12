export interface ProcessingJob {
  id: string
  contentId: string
  sourceId: string
  status: "pending" | "processing" | "completed" | "failed"
  pipeline: ProcessingStep[]
  startedAt?: Date
  completedAt?: Date
  errorMessage?: string
  results: ProcessingResults
}

export interface ProcessingStep {
  name: string
  status: "pending" | "processing" | "completed" | "failed"
  startedAt?: Date
  completedAt?: Date
  duration?: number
  confidence?: number
  errorMessage?: string
}

export interface ProcessingResults {
  translation?: TranslationResult
  sentiment?: SentimentResult
  entities?: EntityExtractionResult
  classification?: ClassificationResult
  patterns?: PatternDetectionResult
}

export interface TranslationResult {
  originalLanguage: string
  detectedLanguage: string
  translatedText: string
  confidence: number
  service: "google" | "deepl" | "azure"
}

export interface SentimentResult {
  sentiment: "positive" | "negative" | "neutral"
  confidence: number
  scores: {
    positive: number
    negative: number
    neutral: number
  }
  emotions?: {
    joy: number
    sadness: number
    anger: number
    fear: number
    surprise: number
  }
}

export interface EntityExtractionResult {
  symptoms: ExtractedEntity[]
  devices: ExtractedEntity[]
  medications: ExtractedEntity[]
  people: ExtractedEntity[]
  organizations: ExtractedEntity[]
  locations: ExtractedEntity[]
  conditions: ExtractedEntity[]
}

export interface ExtractedEntity {
  text: string
  confidence: number
  startIndex: number
  endIndex: number
  category: string
  subcategory?: string
  metadata?: Record<string, any>
}

export interface ClassificationResult {
  primaryCategory: string
  categories: CategoryScore[]
  topics: string[]
  urgency: "low" | "medium" | "high" | "critical"
  relevance: number
}

export interface CategoryScore {
  category: string
  confidence: number
  subcategories?: string[]
}

export interface PatternDetectionResult {
  patterns: DetectedPattern[]
  correlations: Correlation[]
  anomalies: Anomaly[]
  trends: Trend[]
}

export interface DetectedPattern {
  id: string
  type: "symptom" | "device" | "treatment" | "lifestyle" | "mental_health"
  description: string
  confidence: number
  frequency: number
  timeframe: string
  relatedEntities: string[]
}

export interface Correlation {
  id: string
  entities: string[]
  strength: number
  type: "positive" | "negative" | "neutral"
  description: string
  significance: number
}

export interface Anomaly {
  id: string
  type: "spike" | "drop" | "unusual_pattern"
  description: string
  severity: "low" | "medium" | "high"
  affectedMetrics: string[]
}

export interface Trend {
  id: string
  topic: string
  direction: "increasing" | "decreasing" | "stable"
  velocity: number
  timeframe: string
  confidence: number
}

export interface AIModel {
  name: string
  version: string
  type: "translation" | "sentiment" | "entity" | "classification" | "pattern"
  status: "active" | "inactive" | "training" | "error"
  accuracy: number
  lastTrained: Date
  trainingData: {
    samples: number
    languages?: string[]
    categories?: string[]
  }
}
