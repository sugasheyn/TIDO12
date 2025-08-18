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

// User Authentication & Profile Types
export interface UserProfile {
  id: string
  email: string
  username: string
  displayName?: string
  avatar?: string
  dateOfBirth?: string
  diagnosisDate?: string
  diabetesType: 'type1' | 'type2' | 'gestational' | 'prediabetes' | 'other'
  location?: string
  timezone?: string
  preferences: {
    notifications: boolean
    emailUpdates: boolean
    privacyLevel: 'public' | 'friends' | 'private'
    language: string
    units: 'mg/dL' | 'mmol/L'
  }
  createdAt: Date
  updatedAt: Date
}

export interface PinnedContent {
  id: string
  userId: string
  type: 'discovery' | 'correlation' | 'research' | 'community_post' | 'ai_insight'
  contentId: string
  title: string
  description: string
  url?: string
  tags: string[]
  pinnedAt: Date
}

export interface DiscoverySubscription {
  id: string
  userId: string
  type: 'glucose_patterns' | 'medication_insights' | 'device_updates' | 'research_breakthroughs' | 'community_trends' | 'ai_discoveries'
  frequency: 'daily' | 'weekly' | 'monthly' | 'on_demand'
  active: boolean
  lastSent?: Date
  preferences: {
    email: boolean
    push: boolean
    inApp: boolean
    severity: 'all' | 'important' | 'critical'
  }
  createdAt: Date
}

export interface UserSession {
  user: UserProfile
  isAuthenticated: boolean
  accessToken?: string
}
