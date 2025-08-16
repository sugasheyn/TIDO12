export interface JaebCenterDataSource {
  id: string
  name: string
  type:
    | "regulatory_safety"
    | "clinical_trials"
    | "peer_review"
    | "manufacturer_tech"
    | "adverse_events"
    | "coverage_policy"
    | "price_signals"
    | "compliance"
    | "recalls"
    | "open_data"
    | "app_ecosystem"
    | "support_portal"
    | "government_health"
    | "legal_dockets"
    | "environmental"
  subType: string
  url: string
  status: "active" | "inactive" | "error" | "rate_limited"
  lastChecked: Date
  lastUpdate: Date
  healthScore: number
  pollInterval: number
  priority: "high" | "medium" | "low"
  updateCadence: "hourly" | "daily" | "weekly" | "monthly" | "quarterly" | "ad_hoc"
  accessMethod: "api" | "xml" | "rss" | "html_parsing" | "pdf_scraping" | "bulk_files" | "csv_json"
  dataTypes: string[]
  geolocation: {
    country: string
    region: string
    regulatory_jurisdiction?: string
  }
  metadata: {
    language: string
    credibilityScore: number
    tags: string[]
    dataFormat: string
    requiresAuth: boolean
    changeTracking: boolean
  }
  contentFilters: {
    deviceTypes: string[]
    problemCodes: string[]
    keywords: string[]
    excludeKeywords: string[]
  }
  rateLimits: {
    requestsPerHour: number
    requestsRemaining: number
    resetTime: Date
  }
}

export interface JaebCenterContent {
  id: string
  sourceId: string
  title: string
  content: string
  originalLanguage: string
  translatedContent?: string
  url: string
  publishedAt: Date
  collectedAt: Date
  dataType:
    | "cgm_trace"
    | "insulin_log"
    | "event_annotation"
    | "device_event"
    | "clinical_trial"
    | "adverse_event"
    | "recall_notice"
    | "policy_document"
    | "price_data"
    | "compliance_filing"
  structuredData: {
    deviceInfo?: {
      manufacturer: string
      model: string
      firmwareVersion?: string
      udiDi?: string
      lotNumber?: string
    }
    clinicalData?: {
      timeInRange?: number
      glucoseVariability?: number
      hypoglycemiaEvents?: number
      dkaEvents?: number
      patientDemographics?: Record<string, any>
    }
    eventData?: {
      eventType: string
      severity: "low" | "medium" | "high" | "critical"
      outcome: string
      problemCode?: string
    }
    temporalData?: {
      startDate: Date
      endDate?: Date
      duration?: number
      frequency?: string
    }
  }
  entities: {
    devices: string[]
    medications: string[]
    symptoms: string[]
    outcomes: string[]
    organizations: string[]
    regulatoryTerms: string[]
  }
  correlationTags: string[]
  validationStatus: "pending" | "validated" | "cross_referenced" | "flagged"
  confidenceScore: number
}

export const jaebCenterSources: JaebCenterDataSource[] = [
  // Regulatory Safety and Quality
  {
    id: "fda_maude",
    name: "FDA MAUDE Device Events",
    type: "regulatory_safety",
    subType: "device_events",
    url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfmaude/search.cfm",
    status: "active",
    lastChecked: new Date(),
    lastUpdate: new Date(),
    healthScore: 95,
    pollInterval: 60,
    priority: "high",
    updateCadence: "daily",
    accessMethod: "api",
    dataTypes: ["device_events", "problem_codes", "manufacturer_data", "lot_numbers"],
    geolocation: { country: "USA", region: "North America", regulatory_jurisdiction: "FDA" },
    metadata: {
      language: "en",
      credibilityScore: 98,
      tags: ["regulatory", "safety", "devices", "adverse_events"],
      dataFormat: "xml",
      requiresAuth: false,
      changeTracking: true,
    },
    contentFilters: {
      deviceTypes: ["insulin_pump", "cgm", "glucose_meter", "insulin_pen"],
      problemCodes: ["1395", "1396", "1398", "2993", "3191"],
      keywords: ["diabetes", "insulin", "glucose", "hypoglycemia", "DKA"],
      excludeKeywords: ["type 2 only", "gestational"],
    },
    rateLimits: { requestsPerHour: 100, requestsRemaining: 95, resetTime: new Date() },
  },
  {
    id: "clinicaltrials_t1d",
    name: "ClinicalTrials.gov T1D Studies",
    type: "clinical_trials",
    subType: "trial_protocols",
    url: "https://clinicaltrials.gov/api/query/study_fields",
    status: "active",
    lastChecked: new Date(),
    lastUpdate: new Date(),
    healthScore: 97,
    pollInterval: 120,
    priority: "high",
    updateCadence: "daily",
    accessMethod: "api",
    dataTypes: ["protocols", "results", "adverse_events", "endpoints"],
    geolocation: { country: "Global", region: "Worldwide" },
    metadata: {
      language: "en",
      credibilityScore: 96,
      tags: ["clinical_trials", "research", "endpoints", "adverse_events"],
      dataFormat: "json",
      requiresAuth: false,
      changeTracking: true,
    },
    contentFilters: {
      deviceTypes: ["artificial_pancreas", "cgm", "insulin_pump", "glucose_meter"],
      problemCodes: [],
      keywords: ["Type 1 Diabetes", "T1DM", "Juvenile Diabetes", "insulin therapy"],
      excludeKeywords: ["Type 2", "Gestational", "MODY"],
    },
    rateLimits: { requestsPerHour: 200, requestsRemaining: 180, resetTime: new Date() },
  },
  {
    id: "jaeb_center_datasets",
    name: "Jaeb Center Public T1D Datasets",
    type: "open_data",
    subType: "clinical_datasets",
    url: "https://public.jaeb.org/datasets",
    status: "active",
    lastChecked: new Date(),
    lastUpdate: new Date(),
    healthScore: 99,
    pollInterval: 1440, // Daily
    priority: "high",
    updateCadence: "monthly",
    accessMethod: "api",
    dataTypes: ["cgm_traces", "insulin_logs", "event_annotations", "demographics"],
    geolocation: { country: "USA", region: "North America" },
    metadata: {
      language: "en",
      credibilityScore: 99,
      tags: ["clinical_data", "cgm", "insulin", "real_world_evidence"],
      dataFormat: "csv",
      requiresAuth: true,
      changeTracking: true,
    },
    contentFilters: {
      deviceTypes: ["dexcom_g6", "dexcom_g7", "freestyle_libre", "medtronic_670g", "tandem_x2"],
      problemCodes: [],
      keywords: ["continuous glucose monitoring", "insulin delivery", "time in range", "glycemic variability"],
      excludeKeywords: ["non-diabetes", "healthy controls"],
    },
    rateLimits: { requestsPerHour: 50, requestsRemaining: 45, resetTime: new Date() },
  },
]
