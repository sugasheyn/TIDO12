export interface DataSource {
  id: string
  name: string
  type: "social_media" | "academic" | "industry" | "clinical_trial" | "regulatory" | "community"
  platform?: string
  url: string
  status: "active" | "inactive" | "error" | "rate_limited"
  lastChecked: Date
  lastUpdate: Date
  healthScore: number
  pollInterval: number // minutes
  priority: "high" | "medium" | "low"
  metadata: {
    language?: string
    region?: string
    followers?: number
    credibilityScore?: number
    tags?: string[]
  }
  rateLimits: {
    requestsPerHour: number
    requestsRemaining: number
    resetTime: Date
  }
  errorCount: number
  successCount: number
}

export interface SourceContent {
  id: string
  sourceId: string
  title: string
  content: string
  originalLanguage: string
  translatedContent?: string
  url: string
  publishedAt: Date
  collectedAt: Date
  sentiment: "positive" | "negative" | "neutral"
  confidence: number
  entities: {
    symptoms: string[]
    devices: string[]
    medications: string[]
    people: string[]
    organizations: string[]
  }
  categories: string[]
  isDuplicate: boolean
  duplicateOf?: string
}

export interface SourceHealth {
  sourceId: string
  timestamp: Date
  responseTime: number
  statusCode: number
  contentCount: number
  errorMessage?: string
  uptime: number
}

export interface CollectionJob {
  id: string
  sourceId: string
  status: "pending" | "running" | "completed" | "failed"
  startedAt?: Date
  completedAt?: Date
  itemsCollected: number
  errorMessage?: string
}
