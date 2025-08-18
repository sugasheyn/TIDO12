// Advanced Discovery AI Models - Types for 11 New AI Models
// These models complement the existing extraction/sentiment/stance suite

// === DISCOVERY & RELATIONSHIP MODELS ===

export interface EntityCoEvolutionTracker {
  id: string;
  entities: string[]; // e.g., ["Libre 3", "compression lows"]
  relationshipStrength: number; // 0-1 scale
  changePoints: ChangePoint[];
  timeline: CoEvolutionTimelinePoint[];
  confidence: number;
  evidence: string[];
}

export interface CoEvolutionTimelinePoint {
  timestamp: Date;
  strength: number;
  mentions: number;
  context: string;
  changeType: 'increase' | 'decrease' | 'stable' | 'volatile';
}

export interface ChangePoint {
  timestamp: Date;
  magnitude: number;
  confidence: number;
  description: string;
  affectedEntities: string[];
}

export interface InterventionOutcomeLagFinder {
  id: string;
  intervention: string; // e.g., "algorithm update"
  outcome: string; // e.g., "hypo reports"
  device: string; // e.g., "Libre 3"
  lagDistribution: LagDistribution;
  averageLag: number; // in hours
  confidence: number;
  evidence: string[];
}

export interface LagDistribution {
  min: number;
  max: number;
  mean: number;
  median: number;
  percentiles: {
    p25: number;
    p75: number;
    p90: number;
    p95: number;
  };
  samples: number;
}

export interface ConceptDriftDetector {
  id: string;
  term: string; // e.g., "loop"
  originalContext: string;
  newContext: string;
  driftScore: number; // 0-1, higher = more drift
  detectedAt: Date;
  confidence: number;
  evidence: string[];
  semanticShift: {
    oldEmbeddings: number[];
    newEmbeddings: number[];
    cosineDistance: number;
  };
}

// === PREDICTIVE & FORECASTING MODELS ===

export interface EmergingDeviceFeatureForecaster {
  id: string;
  feature: string; // e.g., "hydration tracking"
  trendProbability: number; // 0-1
  timeframe: {
    start: Date;
    end: Date;
  };
  confidence: number;
  signals: {
    patents: number;
    newsMentions: number;
    socialMediaTrends: number;
    clinicalTrials: number;
  };
  predictedAdoption: number; // percentage
  evidence: string[];
}

export interface AdverseEventEarlyWarning {
  id: string;
  device: string;
  issue: string;
  probability: number; // 0-1
  leadTime: number; // in days
  confidence: number;
  riskFactors: RiskFactor[];
  earlySignals: EarlySignal[];
  recommendedActions: string[];
}

export interface RiskFactor {
  factor: string;
  weight: number;
  description: string;
  currentLevel: 'low' | 'medium' | 'high';
}

export interface EarlySignal {
  signal: string;
  strength: number;
  timestamp: Date;
  source: string;
}

// === BEHAVIOUR & CULTURE MODELS ===

export interface PersonaArchetypeClassifier {
  id: string;
  archetype: string; // e.g., "Data-driven optimizer"
  confidence: number;
  definingBehaviors: string[];
  resourceNeeds: string[];
  postingPatterns: PostingPattern;
  topicDistribution: Record<string, number>;
  communityInfluence: number; // 0-1
}

export interface PostingPattern {
  frequency: 'low' | 'medium' | 'high';
  preferredTopics: string[];
  interactionStyle: 'helpful' | 'questioning' | 'sharing' | 'advocating';
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
}

export interface BehaviorChangeSequenceModel {
  id: string;
  triggerEvent: string; // e.g., "high alarm at night"
  behaviorSequences: BehaviorSequence[];
  confidence: number;
  evidence: string[];
}

export interface BehaviorSequence {
  sequence: string[];
  probability: number;
  averageTimeToNext: number; // in minutes
  outcomes: string[];
  frequency: number;
}

// === EXTERNAL SIGNAL FUSION MODELS ===

export interface EnviroHealthCorrelator {
  id: string;
  environmentalFactor: string; // e.g., "heat index above 90°F"
  healthOutcome: string; // e.g., "adhesive detachment reports"
  correlationStrength: number; // -1 to 1
  effectSize: number; // e.g., 15% increase
  confidence: number;
  spatiotemporalPattern: SpatiotemporalPattern;
  confounders: string[];
  evidence: string[];
}

export interface SpatiotemporalPattern {
  geographicScope: string;
  temporalScope: string;
  seasonalPattern: boolean;
  threshold: number;
  units: string;
}

export interface PolicyImpactSignalMiner {
  id: string;
  policy: string; // e.g., "school glucose-monitor policy"
  affectedPopulation: string; // e.g., "caregivers"
  effectSize: number;
  confidence: number;
  timeline: PolicyImpactTimeline;
  conversationShifts: ConversationShift[];
  evidence: string[];
}

export interface PolicyImpactTimeline {
  policyAnnouncement: Date;
  implementationDate: Date;
  firstSignals: Date;
  peakImpact: Date;
  duration: number; // in days
}

export interface ConversationShift {
  topic: string;
  beforeSentiment: number;
  afterSentiment: number;
  volumeChange: number;
  newKeywords: string[];
}

// === DISCOURSE & MISINFORMATION MODELS ===

export interface DebunkAssistClaimMatcher {
  id: string;
  emergingClaim: string;
  matchedEvidence: MatchedEvidence[];
  matchConfidence: number;
  reviewRequired: boolean;
  factCheckStatus: 'verified' | 'debunked' | 'unverified' | 'partially_true';
}

export interface MatchedEvidence {
  source: string;
  type: 'fact_check' | 'scientific_literature' | 'expert_opinion' | 'clinical_guideline';
  relevance: number; // 0-1
  verdict: string;
  confidence: number;
  url?: string;
}

export interface PolarisationConsensusMapper {
  id: string;
  topic: string; // e.g., "ultra-low carb in T1D children"
  consensusIndex: number; // 0-1, higher = more consensus
  polarizationScore: number; // 0-1, higher = more polarized
  stanceDistribution: StanceDistribution;
  timeline: ConsensusTimelinePoint[];
  keyDivergencePoints: DivergencePoint[];
}

export interface StanceDistribution {
  supportive: number;
  opposed: number;
  neutral: number;
  uncertain: number;
}

export interface ConsensusTimelinePoint {
  timestamp: Date;
  consensusIndex: number;
  polarizationScore: number;
  activeParticipants: number;
  keyEvents: string[];
}

export interface DivergencePoint {
  timestamp: Date;
  description: string;
  impact: number; // 0-1
  affectedStances: string[];
}

// === PIPELINE INTEGRATION TYPES ===

export interface DiscoveryPipelineInput {
  textContent: string[];
  timestamps: Date[];
  sources: string[];
  userInteractions: any[];
  environmentalData?: any[];
  policyData?: any[];
}

export interface DiscoveryPipelineOutput {
  entityCoEvolution: EntityCoEvolutionTracker[];
  interventionLags: InterventionOutcomeLagFinder[];
  conceptDrifts: ConceptDriftDetector[];
  emergingFeatures: EmergingDeviceFeatureForecaster[];
  earlyWarnings: AdverseEventEarlyWarning[];
  personas: PersonaArchetypeClassifier[];
  behaviorSequences: BehaviorChangeSequenceModel[];
  enviroHealthCorrelations: EnviroHealthCorrelator[];
  policyImpacts: PolicyImpactSignalMiner[];
  claimMatches: DebunkAssistClaimMatcher[];
  consensusMaps: PolarisationConsensusMapper[];
  overallDiscoveryScore: number;
  confidence: number;
  processingTime: number;
}

export interface DiscoveryModelConfig {
  modelId: string;
  enabled: boolean;
  priority: 'high' | 'medium' | 'low';
  batchSize: number;
  processingInterval: number; // in minutes
  confidenceThreshold: number;
  maxResults: number;
}
