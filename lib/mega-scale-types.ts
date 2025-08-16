export interface MegaScaleSystem {
  totalSources: 50000
  algorithmCount: 6000
  processingCapacity: {
    postsPerSecond: 2500
    translationsPerSecond: 1800
    patternsPerSecond: 450
    correlationsPerSecond: 180
  }
  globalCoverage: {
    countries: 195
    languages: 127
    platforms: 847
    communities: 12500
  }
}

export interface AdvancedAlgorithmLibrary {
  patternDetection: AlgorithmCategory
  correlationAnalysis: AlgorithmCategory
  predictiveModeling: AlgorithmCategory
  anomalyDetection: AlgorithmCategory
  nlpSentiment: AlgorithmCategory
  biologicalReasoning: AlgorithmCategory
  causalInference: AlgorithmCategory
  temporalAnalysis: AlgorithmCategory
  networkAnalysis: AlgorithmCategory
  quantumInspired: AlgorithmCategory
}

export interface AlgorithmCategory {
  algorithms: Algorithm[]
  totalCount: number
  averageAccuracy: number
  totalDiscoveries: number
}

export interface Algorithm {
  id: string
  name: string
  category: string
  accuracy: number
  discoveries: number
  processingTime: number
  specialization: string[]
  biologicalBasis?: string
  mathematicalFormula?: string
}

export interface MegaDiscovery {
  id: string
  title: string
  description: string
  confidence: number
  algorithmsUsed: string[]
  dataSourcesCount: number
  globalEvidence: GlobalEvidence[]
  biologicalExplanation: string
  clinicalImpact: string
  noveltyScore: number
  validationStatus: string
  socialProof: SocialProofLink[]
}

export interface GlobalEvidence {
  country: string
  language: string
  platform: string
  evidenceCount: number
  confidence: number
  culturalContext?: string
}

export interface SocialProofLink {
  platform: string
  url: string
  engagement: number
  language: string
  verified: boolean
  timestamp: Date
  content: string
}

export interface UnestablishedSymptom {
  id: string
  symptom: string
  description: string
  prevalence: number
  dataSupport: number
  biologicalPlausibility: string
  correlatedFactors: string[]
  geographicDistribution: string[]
  demographicPatterns: string[]
  potentialMechanism: string
  researchNeeded: string[]
}
