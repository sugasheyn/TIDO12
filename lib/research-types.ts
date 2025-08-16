export interface ResearchProject {
  id: string
  title: string
  description: string
  created_by: string
  collaborators: string[]
  status: "active" | "completed" | "paused"
  created_at: string
  updated_at: string
  tags: string[]
  datasets: string[]
  findings: ResearchFinding[]
}

export interface ResearchFinding {
  id: string
  title: string
  description: string
  evidence: string[]
  confidence_level: number
  peer_reviewed: boolean
  citations: Citation[]
  created_at: string
}

export interface Citation {
  id: string
  title: string
  authors: string[]
  journal: string
  year: number
  doi?: string
  url?: string
  citation_format: string
}

export interface SearchQuery {
  keywords: string[]
  filters: {
    date_range?: { start: string; end: string }
    sources?: string[]
    languages?: string[]
    content_types?: string[]
    geographic_regions?: string[]
    sentiment?: "positive" | "negative" | "neutral"
  }
  advanced_operators?: {
    must_include?: string[]
    must_exclude?: string[]
    exact_phrases?: string[]
  }
}

export interface DataExport {
  id: string
  format: "csv" | "json" | "xlsx" | "pdf"
  query: SearchQuery
  status: "pending" | "processing" | "completed" | "failed"
  download_url?: string
  created_at: string
  expires_at: string
}
