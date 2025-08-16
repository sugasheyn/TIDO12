import { DataSource, SourceContent, SourceHealth, CollectionJob, ProcessingJob, AIModel } from './types'

// Real T1D research data sources and patterns
const REAL_T1D_SOURCES = [
  'PubMed Central',
  'ClinicalTrials.gov',
  'FDA MAUDE Database',
  'JDRF Research Database',
  'Diabetes Care Journal',
  'Lancet Diabetes & Endocrinology',
  'Nature Reviews Endocrinology',
  'Cell Metabolism',
  'Science Translational Medicine',
  'New England Journal of Medicine',
  'JAMA',
  'BMJ Open Diabetes Research & Care',
  'Diabetologia',
  'Diabetes',
  'Diabetes Technology & Therapeutics',
  'Journal of Diabetes Science and Technology',
  'Diabetes Research and Clinical Practice',
  'Endocrine Reviews',
  'Trends in Endocrinology and Metabolism',
  'Current Diabetes Reports'
]

const REAL_REDDIT_COMMUNITIES = [
  'r/Type1Diabetes',
  'r/diabetes_t1',
  'r/diabetes',
  'r/CGM',
  'r/InsulinPump',
  'r/DiabetesManagement',
  'r/DiabetesResearch',
  'r/Endocrinology',
  'r/MedicalResearch',
  'r/HealthTechnology'
]

const REAL_WEIBO_COMMUNITIES = [
  '糖尿病管理',
  '1型糖尿病',
  '血糖监测',
  '胰岛素治疗',
  '糖尿病研究',
  '内分泌科',
  '医学研究',
  '健康科技',
  '糖尿病社区',
  '血糖控制'
]

const REAL_RESEARCH_TOPICS = [
  'Continuous Glucose Monitoring (CGM)',
  'Artificial Pancreas Systems',
  'Insulin Pump Technology',
  'Beta Cell Transplantation',
  'Immunotherapy for T1D',
  'Stem Cell Therapy',
  'Gene Therapy',
  'Microbiome Research',
  'Exercise and Glucose Control',
  'Nutrition and T1D Management',
  'Mental Health and T1D',
  'Pediatric T1D Care',
  'T1D in Pregnancy',
  'Complications Prevention',
  'Quality of Life Research'
]

const REAL_CLINICAL_TRIALS = [
  'NCT04548778 - Teplizumab for Prevention of Type 1 Diabetes',
  'NCT04233034 - Stem Cell Educator Therapy for T1D',
  'NCT03929666 - Verapamil and T1D',
  'NCT03182426 - BCG Vaccine for T1D',
  'NCT02915198 - Abatacept for New Onset T1D',
  'NCT02514940 - Anti-CD3 Antibody for T1D',
  'NCT02215200 - GAD65 Vaccine for T1D',
  'NCT01897207 - Rituximab for T1D',
  'NCT01556511 - Thymoglobulin for T1D',
  'NCT01161546 - Diamyd for T1D'
]

export class DataGenerator {
  private static instance: DataGenerator
  private lastGenerated: Date = new Date()

  static getInstance(): DataGenerator {
    if (!DataGenerator.instance) {
      DataGenerator.instance = new DataGenerator()
    }
    return DataGenerator.instance
  }

  // Generate realistic source data based on real research platforms
  generateSources(count: number = 50): DataSource[] {
    const sources: DataSource[] = []
    const platforms = [...REAL_T1D_SOURCES, ...REAL_REDDIT_COMMUNITIES, ...REAL_WEIBO_COMMUNITIES]
    
    for (let i = 0; i < count; i++) {
      const platform = platforms[i % platforms.length]
      const isActive = Math.random() > 0.1 // 90% active
      const lastUpdate = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Within last week
      const lastChecked = new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000) // Within last day
      
      sources.push({
        id: `source-${i + 1}`,
        name: platform,
        url: this.generateRealisticURL(platform),
        type: this.determineSourceType(platform),
        platform: this.determinePlatform(platform),
        status: isActive ? 'active' : 'inactive',
        lastChecked,
        lastUpdate,
        healthScore: isActive ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 40) + 30,
        pollInterval: Math.floor(Math.random() * 60) + 30, // 30-90 minutes
        priority: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
        metadata: {
          language: this.determineLanguage(platform),
          region: this.determineRegion(platform),
          followers: Math.floor(Math.random() * 100000) + 1000,
          credibilityScore: Math.random() * 0.4 + 0.6,
          tags: this.generateTags(platform)
        },
        rateLimits: {
          requestsPerHour: Math.floor(Math.random() * 1000) + 100,
          requestsRemaining: Math.floor(Math.random() * 1000) + 100,
          resetTime: new Date(Date.now() + 60 * 60 * 1000)
        },
        errorCount: isActive ? Math.floor(Math.random() * 5) : Math.floor(Math.random() * 20) + 10,
        successCount: isActive ? Math.floor(Math.random() * 1000) + 100 : Math.floor(Math.random() * 100) + 10
      })
    }
    
    return sources
  }

  // Generate realistic AI patterns based on real T1D research
  generateAIPatterns(): any[] {
    const patterns = []
    const patternTypes = ['glucose_pattern', 'insulin_response', 'exercise_impact', 'diet_correlation', 'stress_effect']
    
    for (let i = 0; i < 15; i++) {
      const type = patternTypes[i % patternTypes.length]
      patterns.push({
        id: `pattern-${i + 1}`,
        type,
        title: this.generatePatternTitle(type),
        description: this.generatePatternDescription(type),
        confidence: Math.random() * 0.4 + 0.6, // 60-100%
        impact: Math.random() > 0.3 ? 'High' : 'Medium',
        sources: Math.floor(Math.random() * 20) + 5,
        discoveredAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        status: 'validated',
        evidence: this.generateEvidence(type),
        applications: this.generateApplications(type)
      })
    }
    
    return patterns
  }

  // Generate realistic community data
  generateCommunityData(): any {
    return {
      totalMembers: Math.floor(Math.random() * 10000) + 15000,
      activeToday: Math.floor(Math.random() * 2000) + 1000,
      countries: Math.floor(Math.random() * 30) + 50,
      languages: Math.floor(Math.random() * 10) + 20,
      researchProjects: Math.floor(Math.random() * 50) + 50,
      discussions: Math.floor(Math.random() * 1000) + 1000,
      insights: Math.floor(Math.random() * 3000) + 2000,
      collaborations: Math.floor(Math.random() * 200) + 100
    }
  }

  // Generate realistic research projects
  generateResearchProjects(): any[] {
    const projects = []
    const institutions = [
      'JDRF',
      'NIH',
      'Harvard Medical School',
      'Stanford University',
      'University of California, San Francisco',
      'Joslin Diabetes Center',
      'Mayo Clinic',
      'Cleveland Clinic',
      'University of Michigan',
      'Yale University'
    ]
    
    for (let i = 0; i < 20; i++) {
      const topic = REAL_RESEARCH_TOPICS[i % REAL_RESEARCH_TOPICS.length]
      projects.push({
        id: `project-${i + 1}`,
        title: `${topic} Research Initiative`,
        description: `Comprehensive study on ${topic.toLowerCase()} in Type 1 diabetes management`,
        institution: institutions[i % institutions.length],
        status: Math.random() > 0.3 ? 'active' : 'completed',
        participants: Math.floor(Math.random() * 1000) + 100,
        startDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000),
        funding: Math.floor(Math.random() * 1000000) + 100000,
        category: this.categorizeResearch(topic)
      })
    }
    
    return projects
  }

  // Generate realistic CGM insights
  generateCGMInsights(): any[] {
    const insights = []
    const insightTypes = [
      'glucose_variability',
      'nocturnal_hypoglycemia',
      'postprandial_hyperglycemia',
      'exercise_impact',
      'stress_effect',
      'medication_timing',
      'diet_correlation',
      'sleep_quality'
    ]
    
    for (let i = 0; i < 12; i++) {
      const type = insightTypes[i % insightTypes.length]
      insights.push({
        id: `insight-${i + 1}`,
        type,
        title: this.generateCGMInsightTitle(type),
        description: this.generateCGMInsightDescription(type),
        confidence: Math.random() * 0.3 + 0.7,
        impact: Math.random() > 0.4 ? 'High' : 'Medium',
        dataPoints: Math.floor(Math.random() * 10000) + 1000,
        timeRange: `${Math.floor(Math.random() * 12) + 1} months`,
        recommendations: this.generateCGMRecommendations(type)
      })
    }
    
    return insights
  }

  // Helper methods for generating realistic data
  private generateRealisticURL(platform: string): string {
    if (platform.startsWith('r/')) {
      return `https://reddit.com/${platform}`
    } else if (platform.includes('Weibo') || platform.includes('微博')) {
      return `https://weibo.com/t1d-community`
    } else if (platform.includes('PubMed')) {
      return `https://pubmed.ncbi.nlm.nih.gov/?term=type+1+diabetes`
    } else if (platform.includes('ClinicalTrials')) {
      return `https://clinicaltrials.gov/ct2/results?cond=Type+1+Diabetes`
    } else {
      return `https://${platform.toLowerCase().replace(/\s+/g, '')}.com`
    }
  }

  private determineSourceType(platform: string): string {
    if (platform.startsWith('r/')) return 'community'
    if (platform.includes('Journal') || platform.includes('Journal')) return 'academic'
    if (platform.includes('Database') || platform.includes('Trials')) return 'government'
    if (platform.includes('Weibo') || platform.includes('微博')) return 'social_media'
    return 'research'
  }

  private determinePlatform(platform: string): string {
    if (platform.startsWith('r/')) return 'Reddit'
    if (platform.includes('Weibo') || platform.includes('微博')) return 'Weibo'
    if (platform.includes('PubMed')) return 'PubMed'
    if (platform.includes('ClinicalTrials')) return 'ClinicalTrials.gov'
    return 'Web'
  }

  private determineLanguage(platform: string): string {
    if (platform.includes('Weibo') || platform.includes('微博')) return 'Chinese'
    if (platform.includes('Reddit')) return 'English'
    return 'English'
  }

  private determineRegion(platform: string): string {
    if (platform.includes('Weibo') || platform.includes('微博')) return 'Asia'
    if (platform.includes('Reddit')) return 'Global'
    return 'Global'
  }

  private generateTags(platform: string): string[] {
    const baseTags = ['Type 1 Diabetes', 'Research', 'Community']
    if (platform.includes('CGM')) baseTags.push('CGM', 'Technology')
    if (platform.includes('Insulin')) baseTags.push('Insulin', 'Treatment')
    if (platform.includes('Research')) baseTags.push('Clinical Trials', 'Studies')
    return baseTags
  }

  private generateDescription(platform: string): string {
    if (platform.startsWith('r/')) {
      return `Reddit community for ${platform.substring(2)} discussion and support`
    }
    return `Research platform focused on Type 1 diabetes ${platform.toLowerCase()}`
  }

  private generatePatternTitle(type: string): string {
    const titles = {
      glucose_pattern: 'Circadian Glucose Rhythm Analysis',
      insulin_response: 'Insulin Sensitivity Patterns',
      exercise_impact: 'Exercise-Induced Glucose Dynamics',
      diet_correlation: 'Macronutrient Impact on Glycemia',
      stress_effect: 'Stress Response in Glucose Control'
    }
    return titles[type as keyof typeof titles] || 'T1D Pattern Analysis'
  }

  private generatePatternDescription(type: string): string {
    const descriptions = {
      glucose_pattern: 'Analysis of daily glucose patterns and circadian rhythms in T1D patients',
      insulin_response: 'Patterns of insulin response and sensitivity across different patient populations',
      exercise_impact: 'Impact of physical activity on glucose levels and insulin requirements',
      diet_correlation: 'Correlation between dietary choices and postprandial glucose responses',
      stress_effect: 'Effect of psychological stress on glucose control and insulin resistance'
    }
    return descriptions[type as keyof typeof descriptions] || 'Pattern analysis in Type 1 diabetes'
  }

  private generateEvidence(type: string): string[] {
    const evidenceTypes = [
      'Clinical trial data',
      'Real-world evidence',
      'Patient-reported outcomes',
      'Biomarker analysis',
      'Longitudinal studies'
    ]
    return evidenceTypes.slice(0, Math.floor(Math.random() * 3) + 2)
  }

  private generateApplications(type: string): string[] {
    const applications = [
      'Personalized treatment plans',
      'Predictive modeling',
      'Clinical decision support',
      'Patient education',
      'Research insights'
    ]
    return applications.slice(0, Math.floor(Math.random() * 3) + 2)
  }

  private categorizeResearch(topic: string): string {
    if (topic.includes('CGM') || topic.includes('Technology')) return 'Technology'
    if (topic.includes('Insulin') || topic.includes('Treatment')) return 'Treatment'
    if (topic.includes('Exercise') || topic.includes('Nutrition')) return 'Lifestyle'
    if (topic.includes('Mental') || topic.includes('Quality')) return 'Psychosocial'
    return 'Research'
  }

  private generateCGMInsightTitle(type: string): string {
    const titles = {
      glucose_variability: 'Glucose Variability Patterns',
      nocturnal_hypoglycemia: 'Nocturnal Hypoglycemia Risk',
      postprandial_hyperglycemia: 'Postprandial Glucose Control',
      exercise_impact: 'Exercise Glucose Response',
      stress_effect: 'Stress-Induced Hyperglycemia',
      medication_timing: 'Optimal Medication Timing',
      diet_correlation: 'Diet-Glucose Correlation',
      sleep_quality: 'Sleep Quality Impact'
    }
    return titles[type as keyof typeof titles] || 'CGM Insight Analysis'
  }

  private generateCGMInsightDescription(type: string): string {
    const descriptions = {
      glucose_variability: 'Analysis of glucose variability patterns and their clinical significance',
      nocturnal_hypoglycemia: 'Risk assessment and prevention strategies for nocturnal hypoglycemia',
      postprandial_hyperglycemia: 'Postprandial glucose control optimization strategies',
      exercise_impact: 'Glucose response patterns during and after physical activity',
      stress_effect: 'Impact of psychological stress on glucose levels',
      medication_timing: 'Optimal timing for insulin administration based on CGM data',
      diet_correlation: 'Correlation between dietary choices and glucose responses',
      sleep_quality: 'Relationship between sleep quality and glucose control'
    }
    return descriptions[type as keyof typeof descriptions] || 'CGM-based insight analysis'
  }

  private generateCGMRecommendations(type: string): string[] {
    const recommendations = [
      'Adjust insulin timing',
      'Modify meal composition',
      'Optimize exercise timing',
      'Improve stress management',
      'Enhance sleep hygiene'
    ]
    return recommendations.slice(0, Math.floor(Math.random() * 3) + 2)
  }

  // Generate timestamp for last update
  getLastGenerated(): Date {
    return this.lastGenerated
  }

  // Update timestamp
  updateTimestamp(): void {
    this.lastGenerated = new Date()
  }
}

export const dataGenerator = DataGenerator.getInstance()
