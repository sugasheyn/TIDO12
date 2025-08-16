import { NextResponse } from "next/server"
import { publicDataRetriever } from "@/lib/public-data-retriever"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const topic = searchParams.get('topic')
    const studyType = searchParams.get('studyType')
    const dateRange = searchParams.get('dateRange')
    const institution = searchParams.get('institution')
    
    const studies = await publicDataRetriever.retrieveResearchStudies()
    await new Promise(resolve => setTimeout(resolve, 400)) // Simulate API delay

    // Filter studies based on query parameters
    let filteredStudies = studies
    
    if (topic) {
      const topicLower = topic.toLowerCase()
      filteredStudies = filteredStudies.filter(study => 
        study.title.toLowerCase().includes(topicLower) ||
        study.abstract.toLowerCase().includes(topicLower) ||
        study.keywords.some(keyword => keyword.toLowerCase().includes(topicLower))
      )
    }
    
    if (studyType) {
      filteredStudies = filteredStudies.filter(study => study.studyType === studyType)
    }
    
    if (institution) {
      const institutionLower = institution.toLowerCase()
      filteredStudies = filteredStudies.filter(study => 
        study.institution.toLowerCase().includes(institutionLower)
      )
    }
    
    if (dateRange) {
      const now = new Date()
      const daysAgo = parseInt(dateRange)
      const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
      filteredStudies = filteredStudies.filter(study => study.publicationDate >= cutoffDate)
    }

    // Generate AI insights from research data
    const aiInsights = generateAIInsights(filteredStudies)

    return NextResponse.json({
      success: true,
      data: filteredStudies,
      summary: {
        totalStudies: filteredStudies.length,
        studyTypes: filteredStudies.reduce((acc, study) => {
          acc[study.studyType] = (acc[study.studyType] || 0) + 1
          return acc
        }, {} as Record<string, number>),
        institutions: [...new Set(filteredStudies.map(s => s.institution))],
        totalParticipants: filteredStudies.reduce((sum, study) => sum + study.participants, 0),
        averageCitations: filteredStudies.length > 0 
          ? Math.round(filteredStudies.reduce((sum, study) => sum + study.citations, 0) / filteredStudies.length)
          : 0,
        fundingSources: [...new Set(filteredStudies.map(s => s.funding).filter(Boolean))],
        recentStudies: filteredStudies
          .filter(s => {
            const daysSincePublication = Math.ceil((Date.now() - s.publicationDate.getTime()) / (1000 * 60 * 60 * 24))
            return daysSincePublication <= 30
          }).length,
      },
      insights: {
        topInstitutions: filteredStudies
          .reduce((acc, study) => {
            acc[study.institution] = (acc[study.institution] || 0) + 1
            return acc
          }, {} as Record<string, number>),
        studyQuality: filteredStudies.reduce((acc, study) => {
          const quality = study.citations > 100 ? 'high' : study.citations > 50 ? 'medium' : 'low'
          acc[quality] = (acc[quality] || 0) + 1
          return acc
        }, {} as Record<string, number>),
        researchTrends: analyzeResearchTrends(filteredStudies),
        fundingAnalysis: filteredStudies.reduce((acc, study) => {
          if (study.funding) {
            acc[study.funding] = (acc[study.funding] || 0) + 1
          }
          return acc
        }, {} as Record<string, number>),
      },
      aiInsights,
      filters: {
        topic,
        studyType,
        dateRange,
        institution,
        applied: filteredStudies.length !== studies.length
      },
      lastUpdated: publicDataRetriever.getLastRetrieved(),
      nextUpdate: new Date(Date.now() + 60 * 60 * 1000)
    })
  } catch (error) {
    console.error("Failed to fetch research studies data:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Failed to fetch research studies data",
      data: [],
      summary: {
        totalStudies: 0,
        studyTypes: {},
        institutions: [],
        totalParticipants: 0,
        averageCitations: 0,
        fundingSources: [],
        recentStudies: 0,
      },
      insights: {
        topInstitutions: {},
        studyQuality: {},
        researchTrends: [],
        fundingAnalysis: {},
      },
      aiInsights: [],
      filters: {},
    }, { status: 500 })
  }
}

function generateAIInsights(studies: any[]): any[] {
  const insights = []
  
  // Analyze research gaps and opportunities
  const topics = studies.flatMap(study => study.keywords)
  const topicFrequency = topics.reduce((acc, topic) => {
    acc[topic] = (acc[topic] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const understudiedTopics = Object.entries(topicFrequency)
    .filter(([_, count]) => count < 3)
    .sort(([_, a], [__, b]) => a - b)
    .slice(0, 5)
    .map(([topic, count]) => ({ topic, count }))
  
  if (understudiedTopics.length > 0) {
    insights.push({
      type: 'research-gap',
      title: 'Understudied Research Areas',
      description: 'These topics have limited research coverage and may represent opportunities for new studies.',
      topics: understudiedTopics,
      recommendation: 'Consider focusing research efforts on these areas to fill knowledge gaps.',
      priority: 'medium'
    })
  }
  
  // Analyze study quality trends
  const qualityByYear = studies.reduce((acc, study) => {
    const year = study.publicationDate.getFullYear()
    if (!acc[year]) acc[year] = { total: 0, highQuality: 0 }
    acc[year].total++
    if (study.citations > 100) acc[year].highQuality++
    return acc
  }, {} as Record<string, { total: number, highQuality: number }>)
  
  const qualityTrend = Object.entries(qualityByYear)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .map(([year, data]) => ({
      year: parseInt(year),
      qualityRatio: data.total > 0 ? data.highQuality / data.total : 0
    }))
  
  if (qualityTrend.length > 1) {
    const recentQuality = qualityTrend.slice(-3)
    const qualityImprovement = recentQuality.every((item, index) => 
      index === 0 || item.qualityRatio >= recentQuality[index - 1].qualityRatio
    )
    
    insights.push({
      type: 'quality-trend',
      title: 'Research Quality Trends',
      description: qualityImprovement 
        ? 'Research quality has been improving over recent years.'
        : 'Research quality has been variable over recent years.',
      trend: qualityTrend,
      recommendation: qualityImprovement 
        ? 'Continue maintaining high research standards.'
        : 'Focus on improving study design and methodology.',
      priority: 'high'
    })
  }
  
  // Analyze funding patterns
  const fundingByInstitution = studies.reduce((acc, study) => {
    if (study.funding) {
      if (!acc[study.institution]) acc[study.institution] = []
      acc[study.institution].push(study.funding)
    }
    return acc
  }, {} as Record<string, string[]>)
  
  const wellFundedInstitutions = Object.entries(fundingByInstitution)
    .filter(([_, fundings]) => fundings.length > 2)
    .map(([institution, fundings]) => ({
      institution,
      fundingCount: fundings.length,
      uniqueFunders: [...new Set(fundings)]
    }))
  
  if (wellFundedInstitutions.length > 0) {
    insights.push({
      type: 'funding-pattern',
      title: 'Well-Funded Research Institutions',
      description: 'These institutions have received multiple funding sources for T1D research.',
      institutions: wellFundedInstitutions,
      recommendation: 'Collaborate with these institutions for better funding opportunities.',
      priority: 'medium'
    })
  }
  
  // Analyze participant trends
  const participantsByYear = studies.reduce((acc, study) => {
    const year = study.publicationDate.getFullYear()
    if (!acc[year]) acc[year] = []
    acc[year].push(study.participants)
    return acc
  }, {} as Record<string, number[]>)
  
  const averageParticipantsByYear = Object.entries(participantsByYear)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .map(([year, participants]) => ({
      year: parseInt(year),
      averageParticipants: Math.round(participants.reduce((a, b) => a + b, 0) / participants.length)
    }))
  
  if (averageParticipantsByYear.length > 1) {
    insights.push({
      type: 'participant-trend',
      title: 'Study Size Trends',
      description: 'Analysis of participant numbers in T1D research studies over time.',
      trend: averageParticipantsByYear,
      recommendation: 'Larger studies generally provide more reliable results. Consider study size in research planning.',
      priority: 'low'
    })
  }
  
  return insights
}

function analyzeResearchTrends(studies: any[]): any[] {
  const trends = []
  
  // Analyze keyword trends over time
  const keywordsByYear = studies.reduce((acc, study) => {
    const year = study.publicationDate.getFullYear()
    if (!acc[year]) acc[year] = new Set()
    study.keywords.forEach(keyword => acc[year].add(keyword))
    return acc
  }, {} as Record<string, Set<string>>)
  
  const keywordTrends = Object.entries(keywordsByYear)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .map(([year, keywords]) => ({
      year: parseInt(year),
      keywordCount: keywords.size,
      keywords: Array.from(keywords)
    }))
  
  if (keywordTrends.length > 1) {
    trends.push({
      type: 'keyword-expansion',
      title: 'Research Topic Expansion',
      description: 'The number of research topics has been increasing over time.',
      data: keywordTrends,
      insight: 'Research scope is broadening, indicating growing interest in diverse T1D aspects.'
    })
  }
  
  // Analyze study type distribution
  const studyTypeDistribution = studies.reduce((acc, study) => {
    acc[study.studyType] = (acc[study.studyType] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  if (Object.keys(studyTypeDistribution).length > 0) {
    trends.push({
      type: 'study-methodology',
      title: 'Study Methodology Distribution',
      description: 'Distribution of different study types in T1D research.',
      data: studyTypeDistribution,
      insight: 'Understanding methodology distribution helps identify research gaps and opportunities.'
    })
  }
  
  return trends
}
