export interface UnifiedContent {
  id: string
  type:
    | "social_post"
    | "research_paper"
    | "clinical_study"
    | "news_article"
    | "forum_discussion"
    | "user_experience"
    | "device_review"
    | "medical_guideline"
  title: string
  content: string
  originalLanguage: string
  translatedContent?: string

  // Source information
  source: {
    id: string
    name: string
    platform: string
    url: string
    credibility: number
    type: "social_media" | "academic" | "clinical" | "industry" | "community" | "regulatory"
  }

  // Temporal data
  publishedAt: Date
  collectedAt: Date
  lastAnalyzed: Date

  // Content analysis
  sentiment: SentimentAnalysis
  entities: ExtractedEntities
  topics: TopicClassification[]
  urgency: "low" | "medium" | "high" | "critical"

  // Engagement metrics
  engagement: {
    views?: number
    likes?: number
    shares?: number
    comments?: number
    citations?: number
    downloads?: number
  }

  // Geographic and demographic
  geographic: {
    country?: string
    region?: string
    coordinates?: [number, number]
  }

  // Relationships to other content
  relationships: ContentRelationship[]

  // Quality and validation
  qualityScore: number
  isValidated: boolean
  validatedBy?: string[]

  // Processing metadata
  processingStatus: "pending" | "processing" | "completed" | "failed"
  confidence: number

  // Raw metadata for specific content types
  metadata: Record<string, any>
}

export interface ContentRelationship {
  id: string
  targetContentId: string
  relationshipType:
    | "supports"
    | "contradicts"
    | "references"
    | "similar_to"
    | "caused_by"
    | "leads_to"
    | "correlates_with"
    | "mentions"
    | "discusses_same_topic"
  strength: number // 0-1
  confidence: number // 0-1
  evidence: string[]
  discoveredBy: "ai_algorithm" | "manual_curation" | "user_report"
  discoveredAt: Date
  algorithm?: string
  validated: boolean
}

export interface SentimentAnalysis {
  overall: "positive" | "negative" | "neutral"
  confidence: number
  scores: {
    positive: number
    negative: number
    neutral: number
  }
  emotions: {
    joy: number
    sadness: number
    anger: number
    fear: number
    surprise: number
    trust: number
    anticipation: number
    disgust: number
  }
  aspects: AspectSentiment[]
}

export interface AspectSentiment {
  aspect: string // e.g., "insulin pump", "cgm accuracy", "doctor visit"
  sentiment: "positive" | "negative" | "neutral"
  confidence: number
}

export interface ExtractedEntities {
  symptoms: Entity[]
  devices: Entity[]
  medications: Entity[]
  treatments: Entity[]
  people: Entity[]
  organizations: Entity[]
  locations: Entity[]
  conditions: Entity[]
  activities: Entity[]
  foods: Entity[]
  emotions: Entity[]
  timeReferences: Entity[]
}

export interface Entity {
  text: string
  normalizedText: string // standardized form
  confidence: number
  startIndex: number
  endIndex: number
  category: string
  subcategory?: string
  attributes: Record<string, any>
  linkedEntities: string[] // IDs of related entities across all content
}

export interface TopicClassification {
  topic: string
  confidence: number
  keywords: string[]
  parentTopic?: string
  relatedTopics: string[]
}

// Unified knowledge graph structure
export interface KnowledgeGraph {
  nodes: KnowledgeNode[]
  edges: KnowledgeEdge[]
  clusters: KnowledgeCluster[]
  lastUpdated: Date
}

export interface KnowledgeNode {
  id: string
  type: "content" | "entity" | "concept" | "person" | "organization" | "location" | "event"
  label: string
  properties: Record<string, any>
  contentIds: string[] // Links to unified content
  importance: number
  centrality: number
}

export interface KnowledgeEdge {
  id: string
  sourceNodeId: string
  targetNodeId: string
  relationshipType: string
  weight: number
  confidence: number
  evidence: string[]
  temporal: {
    startDate?: Date
    endDate?: Date
    frequency?: number
  }
}

export interface KnowledgeCluster {
  id: string
  name: string
  description: string
  nodeIds: string[]
  coherence: number
  topics: string[]
}

// Discovery and pattern recognition
export interface Discovery {
  id: string
  type:
    | "correlation"
    | "trend"
    | "anomaly"
    | "causal_relationship"
    | "new_symptom"
    | "treatment_effectiveness"
    | "device_issue"
    | "breakthrough"
  title: string
  description: string

  // Evidence and support
  supportingContent: string[] // Content IDs
  contradictingContent: string[]
  totalEvidence: number

  // Statistical measures
  confidence: number
  significance: number
  effect_size?: number
  p_value?: number

  // Temporal aspects
  discoveredAt: Date
  timeframe: {
    start: Date
    end: Date
  }

  // Geographic spread
  countries: string[]
  regions: string[]

  // Discovery method
  discoveryMethod: {
    algorithm: string
    parameters: Record<string, any>
    version: string
  }

  // Validation
  validationStatus: "pending" | "validated" | "disputed" | "rejected"
  validatedBy: string[]
  peerReviewed: boolean

  // Impact and importance
  clinicalRelevance: "low" | "medium" | "high" | "critical"
  novelty: number // 0-1, how new/unexpected this discovery is
  actionability: "none" | "monitor" | "investigate" | "immediate_action"

  // Related discoveries
  relatedDiscoveries: string[]

  // Metadata
  tags: string[]
  categories: string[]
}

// Cross-content analysis results
export interface CrossContentAnalysis {
  id: string
  analysisType:
    | "correlation_matrix"
    | "topic_evolution"
    | "sentiment_trends"
    | "entity_relationships"
    | "geographic_patterns"
  contentIds: string[]
  results: {
    correlations?: CorrelationResult[]
    trends?: TrendResult[]
    patterns?: PatternResult[]
    clusters?: ClusterResult[]
  }
  confidence: number
  generatedAt: Date
  parameters: Record<string, any>
}

export interface CorrelationResult {
  entityA: string
  entityB: string
  correlation: number
  pValue: number
  sampleSize: number
  timeframe: string
  supportingContent: string[]
}

export interface TrendResult {
  entity: string
  trend: "increasing" | "decreasing" | "stable" | "cyclical"
  velocity: number
  confidence: number
  forecast: number[]
  timeframe: string
}

export interface PatternResult {
  pattern: string
  frequency: number
  contexts: string[]
  geographic_distribution: Record<string, number>
  temporal_distribution: Record<string, number>
}

export interface ClusterResult {
  clusterId: string
  contentIds: string[]
  commonTopics: string[]
  commonEntities: string[]
  coherence: number
  summary: string
}
