import type { DataSource } from "./data-source" // Assuming DataSource is declared in another file

export interface ExpandedDataSource extends DataSource {
  subType?: string
  geolocation?: {
    country: string
    region: string
    coordinates?: { lat: number; lng: number }
  }
  contentFilters: {
    keywords: string[]
    excludeKeywords: string[]
    minEngagement?: number
    contentTypes: string[]
  }
  aiProcessing: {
    enableTranslation: boolean
    enableSentiment: boolean
    enableEntityExtraction: boolean
    enablePatternDetection: boolean
  }
  collectionStrategy: {
    method: "api" | "scraping" | "rss" | "webhook" | "manual"
    authentication?: {
      type: "oauth" | "api_key" | "basic" | "bearer"
      credentials?: Record<string, string>
    }
    pagination?: {
      method: "cursor" | "offset" | "page"
      maxPages?: number
    }
  }
}

export interface ExtendedSourceCategories {
  socialMedia: {
    platforms: string[]
    communityTypes: ("support_groups" | "advocacy" | "medical_professionals" | "parents" | "teens" | "adults")[]
    contentTypes: ("posts" | "comments" | "stories" | "videos" | "live_streams" | "polls")[]
  }
  academic: {
    databases: string[]
    journalTypes: ("peer_reviewed" | "preprint" | "conference" | "thesis" | "review")[]
    researchAreas: string[]
  }
  clinical: {
    trialPhases: ("preclinical" | "phase_1" | "phase_2" | "phase_3" | "phase_4" | "post_market")[]
    studyTypes: ("rct" | "observational" | "case_study" | "meta_analysis" | "systematic_review")[]
    endpoints: ("primary" | "secondary" | "exploratory")[]
  }
  industry: {
    companyTypes: ("device_manufacturer" | "pharma" | "biotech" | "digital_health" | "research_org")[]
    contentTypes: ("press_releases" | "product_updates" | "clinical_data" | "regulatory_filings")[]
  }
  regulatory: {
    agencies: string[]
    documentTypes: ("approvals" | "warnings" | "guidelines" | "recalls" | "advisories")[]
  }
  community: {
    forumTypes: ("patient_forums" | "professional_forums" | "caregiver_groups" | "advocacy_orgs")[]
    languages: string[]
  }
  news: {
    outlets: string[]
    categories: ("breaking_news" | "research_updates" | "policy_changes" | "human_interest")[]
  }
  patents: {
    offices: string[]
    categories: ("devices" | "drugs" | "diagnostics" | "digital_health")[]
  }
  government: {
    agencies: string[]
    dataTypes: ("health_statistics" | "funding_announcements" | "policy_documents")[]
  }
}
