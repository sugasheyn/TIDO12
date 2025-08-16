export interface AnalyticsMetrics {
  totalSources: number
  activeSources: number
  totalContent: number
  dailyContent: number
  processingRate: number
  avgProcessingTime: number
  successRate: number
  languagesCovered: number
  countriesCovered: number
  topCategories: CategoryMetric[]
  topSources: SourceMetric[]
  sentimentDistribution: SentimentMetric
  deviceMentions: DeviceMetric[]
  trendingTopics: TrendingTopic[]
}

export interface CategoryMetric {
  category: string
  count: number
  percentage: number
  growth: number
}

export interface SourceMetric {
  sourceId: string
  sourceName: string
  count: number
  healthScore: number
  type: string
}

export interface SentimentMetric {
  positive: number
  negative: number
  neutral: number
  totalAnalyzed: number
}

export interface DeviceMetric {
  device: string
  mentions: number
  sentiment: "positive" | "negative" | "neutral"
  issues: number
  growth: number
}

export interface TrendingTopic {
  topic: string
  mentions: number
  growth: number
  timeframe: string
  category: string
}

export interface GeographicData {
  country: string
  countryCode: string
  mentions: number
  sentiment: number
  topTopics: string[]
  coordinates: [number, number]
}

export interface TimeSeriesData {
  timestamp: Date
  value: number
  category?: string
  metadata?: Record<string, any>
}

export interface ChartData {
  labels: string[]
  datasets: ChartDataset[]
}

export interface ChartDataset {
  label: string
  data: number[]
  backgroundColor?: string | string[]
  borderColor?: string
  borderWidth?: number
  fill?: boolean
}

export interface CustomReport {
  id: string
  name: string
  description: string
  filters: ReportFilter[]
  visualizations: ReportVisualization[]
  schedule?: ReportSchedule
  createdAt: Date
  updatedAt: Date
}

export interface ReportFilter {
  field: string
  operator: "equals" | "contains" | "greater_than" | "less_than" | "between"
  value: any
}

export interface ReportVisualization {
  type: "chart" | "table" | "metric" | "map"
  title: string
  config: Record<string, any>
}

export interface ReportSchedule {
  frequency: "daily" | "weekly" | "monthly"
  time: string
  recipients: string[]
}
