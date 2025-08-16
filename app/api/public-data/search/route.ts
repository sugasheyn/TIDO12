import { NextResponse } from "next/server"
import { publicDataRetriever } from "@/lib/public-data-retriever"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const dataType = searchParams.get('type')
    const platform = searchParams.get('platform')
    const dateRange = searchParams.get('dateRange')
    const plausibility = searchParams.get('plausibility')
    const severity = searchParams.get('severity')
    const institution = searchParams.get('institution')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    
    if (!query) {
      return NextResponse.json({ 
        success: false, 
        error: "Search query is required",
        data: [],
        summary: {},
        insights: [],
        suggestions: []
      }, { status: 400 })
    }

    // Perform comprehensive search across all data sources
    const searchResults = await publicDataRetriever.searchData(query, {
      dataType,
      platform,
      dateRange,
      plausibility,
      severity,
      institution
    })

    // Apply pagination
    const paginatedResults = searchResults.slice(offset, offset + limit)
    
    // Generate AI-powered insights from search results
    const aiInsights = await generateSearchInsights(searchResults, query)
    
    // Generate search suggestions
    const suggestions = generateSearchSuggestions(query, searchResults)
    
    // Analyze search patterns and generate recommendations
    const searchAnalysis = analyzeSearchPatterns(searchResults, query)

    return NextResponse.json({
      success: true,
      data: paginatedResults,
      summary: {
        totalResults: searchResults.length,
        returnedResults: paginatedResults.length,
        pagination: {
          limit,
          offset,
          totalPages: Math.ceil(searchResults.length / limit),
          currentPage: Math.floor(offset / limit) + 1
        },
        dataTypes: searchResults.reduce((acc, result) => {
          const type = result.type || 'unknown'
          acc[type] = (acc[type] || 0) + 1
          return acc
        }, {} as Record<string, number>),
        platforms: [...new Set(searchResults.map(r => r.platform || r.source).filter(Boolean))],
        dateRange: searchResults.length > 0 ? {
          earliest: new Date(Math.min(...searchResults.map(r => new Date(r.timestamp || r.publicationDate || Date.now()).getTime()))),
          latest: new Date(Math.max(...searchResults.map(r => new Date(r.timestamp || r.publicationDate || Date.now()).getTime())))
        } : null,
        averageRelevance: searchResults.length > 0 
          ? Math.round(searchResults.reduce((sum, r) => sum + (r.relevance || 0), 0) / searchResults.length)
          : 0,
      },
      insights: {
        searchEffectiveness: {
          queryComplexity: analyzeQueryComplexity(query),
          resultRelevance: analyzeResultRelevance(searchResults),
          coverageAnalysis: analyzeCoverage(searchResults),
          dataQuality: analyzeDataQuality(searchResults)
        },
        trendingTopics: extractTrendingTopics(searchResults),
        emergingPatterns: extractEmergingPatterns(searchResults),
        researchGaps: identifyResearchGaps(searchResults, query),
        crossReferences: findCrossReferences(searchResults)
      },
      aiInsights,
      suggestions,
      searchAnalysis,
      filters: {
        dataType,
        platform,
        dateRange,
        plausibility,
        severity,
        institution,
        applied: Object.values({ dataType, platform, dateRange, plausibility, severity, institution }).some(Boolean)
      },
      lastUpdated: publicDataRetriever.getLastRetrieved(),
      nextUpdate: new Date(Date.now() + 60 * 60 * 1000)
    })
  } catch (error) {
    console.error("Failed to perform search:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Failed to perform search",
      data: [],
      summary: {
        totalResults: 0,
        returnedResults: 0,
        pagination: { limit: 0, offset: 0, totalPages: 0, currentPage: 0 },
        dataTypes: {},
        platforms: [],
        dateRange: null,
        averageRelevance: 0,
      },
      insights: {
        searchEffectiveness: {},
        trendingTopics: [],
        emergingPatterns: [],
        researchGaps: [],
        crossReferences: []
      },
      aiInsights: [],
      suggestions: [],
      searchAnalysis: {},
      filters: {},
    }, { status: 500 })
  }
}

async function generateSearchInsights(searchResults: any[], query: string): Promise<any[]> {
  const insights = []
  
  // Analyze search result patterns
  const resultPatterns = analyzeResultPatterns(searchResults)
  insights.push(...resultPatterns)
  
  // Generate query-specific insights
  const queryInsights = generateQuerySpecificInsights(searchResults, query)
  insights.push(...queryInsights)
  
  // Identify emerging trends
  const emergingTrends = identifyEmergingTrends(searchResults)
  insights.push(...emergingTrends)
  
  // Analyze data source reliability
  const reliabilityAnalysis = analyzeSourceReliability(searchResults)
  insights.push(reliabilityAnalysis)
  
  return insights
}

function generateSearchSuggestions(query: string, results: any[]): any[] {
  const suggestions = []
  
  // Generate related search terms
  const relatedTerms = extractRelatedTerms(results, query)
  if (relatedTerms.length > 0) {
    suggestions.push({
      type: 'related-terms',
      title: 'Related Search Terms',
      terms: relatedTerms.slice(0, 8)
    })
  }
  
  // Generate broader search suggestions
  const broaderTerms = generateBroaderTerms(query)
  if (broaderTerms.length > 0) {
    suggestions.push({
      type: 'broader-terms',
      title: 'Broader Search Terms',
      terms: broaderTerms.slice(0, 5)
    })
  }
  
  // Generate specific search suggestions
  const specificTerms = generateSpecificTerms(query, results)
  if (specificTerms.length > 0) {
    suggestions.push({
      type: 'specific-terms',
      title: 'More Specific Search Terms',
      terms: specificTerms.slice(0, 5)
    })
  }
  
  // Generate filter suggestions
  const filterSuggestions = generateFilterSuggestions(results)
  if (filterSuggestions.length > 0) {
    suggestions.push({
      type: 'filter-suggestions',
      title: 'Refine Your Search',
      filters: filterSuggestions
    })
  }
  
  return suggestions
}

function analyzeSearchPatterns(results: any[], query: string): any {
  const analysis = {
    queryAnalysis: {
      complexity: analyzeQueryComplexity(query),
      specificity: analyzeQuerySpecificity(query),
      coverage: analyzeQueryCoverage(query, results)
    },
    resultAnalysis: {
      distribution: analyzeResultDistribution(results),
      quality: analyzeResultQuality(results),
      relevance: analyzeResultRelevance(results)
    },
    recommendation: generateSearchRecommendations(query, results)
  }
  
  return analysis
}

function analyzeQueryComplexity(query: string): any {
  const words = query.split(' ').filter(w => w.length > 0)
  const hasQuotes = query.includes('"')
  const hasOperators = /AND|OR|NOT|\(|\)/.test(query.toUpperCase())
  
  return {
    wordCount: words.length,
    hasQuotes: hasQuotes,
    hasOperators: hasOperators,
    complexity: words.length > 3 || hasQuotes || hasOperators ? 'high' : words.length > 1 ? 'medium' : 'low',
    suggestions: words.length === 1 ? 'Consider adding more specific terms' : 
                words.length > 5 ? 'Consider simplifying your query' : 'Query complexity is appropriate'
  }
}

function analyzeQuerySpecificity(query: string): any {
  const medicalTerms = /diabetes|insulin|glucose|blood sugar|T1D|type 1|CGM|pump/i
  const symptomTerms = /tingling|numbness|pain|fatigue|anxiety|depression|hiccups/i
  const treatmentTerms = /medication|supplement|exercise|diet|lifestyle|therapy/i
  
  const specificity = {
    medical: medicalTerms.test(query),
    symptoms: symptomTerms.test(query),
    treatment: treatmentTerms.test(query),
    overall: (medicalTerms.test(query) ? 1 : 0) + (symptomTerms.test(query) ? 1 : 0) + (treatmentTerms.test(query) ? 1 : 0)
  }
  
  return {
    ...specificity,
    level: specificity.overall === 0 ? 'low' : specificity.overall === 1 ? 'medium' : 'high',
    recommendation: specificity.overall === 0 ? 'Add medical terms for better results' :
                   specificity.overall === 3 ? 'Query is very specific' : 'Query has good specificity'
  }
}

function analyzeQueryCoverage(query: string, results: any[]): any {
  const queryWords = query.toLowerCase().split(' ').filter(w => w.length > 2)
  const resultTexts = results.map(r => 
    `${r.title || ''} ${r.description || ''} ${r.content || ''} ${r.abstract || ''}`.toLowerCase()
  )
  
  const coverage = queryWords.map(word => {
    const matches = resultTexts.filter(text => text.includes(word)).length
    return {
      word,
      coverage: results.length > 0 ? (matches / results.length) * 100 : 0
    }
  })
  
  const averageCoverage = coverage.reduce((sum, c) => sum + c.coverage, 0) / coverage.length
  
  return {
    coverage,
    averageCoverage: Math.round(averageCoverage * 100) / 100,
    assessment: averageCoverage > 70 ? 'excellent' : averageCoverage > 50 ? 'good' : averageCoverage > 30 ? 'fair' : 'poor',
    recommendation: averageCoverage < 50 ? 'Consider broadening your search terms' : 'Query coverage is good'
  }
}

function analyzeResultDistribution(results: any[]): any {
  const distribution = {
    byType: results.reduce((acc, r) => {
      const type = r.type || 'unknown'
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {} as Record<string, number>),
    byPlatform: results.reduce((acc, r) => {
      const platform = r.platform || r.source || 'unknown'
      acc[platform] = (acc[platform] || 0) + 1
      return acc
    }, {} as Record<string, number>),
    byDate: results.reduce((acc, r) => {
      const date = r.timestamp || r.publicationDate
      if (date) {
        const year = new Date(date).getFullYear()
        acc[year] = (acc[year] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)
  }
  
  return {
    ...distribution,
    balance: {
      typeBalance: Object.keys(distribution.byType).length,
      platformBalance: Object.keys(distribution.byPlatform).length,
      temporalBalance: Object.keys(distribution.byDate).length
    }
  }
}

function analyzeResultQuality(results: any[]): any {
  const qualityMetrics = results.map(r => {
    const hasTitle = Boolean(r.title)
    const hasDescription = Boolean(r.description || r.content || r.abstract)
    const hasMetadata = Boolean(r.timestamp || r.publicationDate || r.author || r.source)
    const hasLinks = Boolean(r.url || r.link)
    
    return {
      score: (hasTitle ? 25 : 0) + (hasDescription ? 25 : 0) + (hasMetadata ? 25 : 0) + (hasLinks ? 25 : 0),
      hasTitle,
      hasDescription,
      hasMetadata,
      hasLinks
    }
  })
  
  const averageQuality = qualityMetrics.reduce((sum, m) => sum + m.score, 0) / qualityMetrics.length
  
  return {
    metrics: qualityMetrics,
    averageQuality: Math.round(averageQuality * 100) / 100,
    qualityDistribution: {
      excellent: qualityMetrics.filter(m => m.score >= 90).length,
      good: qualityMetrics.filter(m => m.score >= 70 && m.score < 90).length,
      fair: qualityMetrics.filter(m => m.score >= 50 && m.score < 70).length,
      poor: qualityMetrics.filter(m => m.score < 50).length
    }
  }
}

function analyzeResultRelevance(results: any[]): any {
  const relevanceScores = results.map(r => r.relevance || 0)
  const averageRelevance = relevanceScores.reduce((sum, score) => sum + score, 0) / relevanceScores.length
  
  return {
    scores: relevanceScores,
    average: Math.round(averageRelevance * 100) / 100,
    distribution: {
      high: relevanceScores.filter(s => s >= 80).length,
      medium: relevanceScores.filter(s => s >= 50 && s < 80).length,
      low: relevanceScores.filter(s => s < 50).length
    },
    assessment: averageRelevance >= 80 ? 'excellent' : averageRelevance >= 60 ? 'good' : averageRelevance >= 40 ? 'fair' : 'poor'
  }
}

function generateSearchRecommendations(query: string, results: any[]): any[] {
  const recommendations = []
  
  if (results.length === 0) {
    recommendations.push({
      type: 'no-results',
      message: 'No results found for your query',
      suggestions: [
        'Check spelling and try again',
        'Use broader search terms',
        'Remove specific filters',
        'Try related terms'
      ]
    })
  } else if (results.length < 10) {
    recommendations.push({
      type: 'few-results',
      message: 'Limited results found',
      suggestions: [
        'Try broader search terms',
        'Remove date restrictions',
        'Check different data types',
        'Use related keywords'
      ]
    })
  } else if (results.length > 100) {
    recommendations.push({
      type: 'many-results',
      message: 'Many results found - consider refining your search',
      suggestions: [
        'Add more specific terms',
        'Use date filters',
        'Filter by data type',
        'Add platform restrictions'
      ]
    })
  }
  
  // Add quality-based recommendations
  const qualityAnalysis = analyzeResultQuality(results)
  if (qualityAnalysis.averageQuality < 70) {
    recommendations.push({
      type: 'quality-improvement',
      message: 'Result quality could be improved',
      suggestions: [
        'Use more specific search terms',
        'Filter by verified sources',
        'Add date restrictions for recent data',
        'Check source credibility'
      ]
    })
  }
  
  return recommendations
}

function extractRelatedTerms(results: any[], query: string): string[] {
  const allText = results.map(r => 
    `${r.title || ''} ${r.description || ''} ${r.content || ''} ${r.abstract || ''} ${r.keywords?.join(' ') || ''}`
  ).join(' ').toLowerCase()
  
  const queryWords = query.toLowerCase().split(' ').filter(w => w.length > 2)
  const words = allText.split(/\s+/).filter(w => w.length > 3)
  
  const wordFreq = words.reduce((acc, word) => {
    if (!queryWords.includes(word) && /^[a-zA-Z]+$/.test(word)) {
      acc[word] = (acc[word] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)
  
  return Object.entries(wordFreq)
    .sort(([_, a], [__, b]) => b - a)
    .slice(0, 10)
    .map(([word, _]) => word)
}

function generateBroaderTerms(query: string): string[] {
  const broaderTerms = []
  const words = query.toLowerCase().split(' ')
  
  // Remove specific terms to get broader concepts
  const specificTerms = ['insulin', 'dexcom', 'pump', 'cgm', 'glucose', 'blood sugar']
  const broaderWords = words.filter(w => !specificTerms.includes(w))
  
  if (broaderWords.length > 0) {
    broaderTerms.push(broaderWords.join(' '))
  }
  
  // Add general diabetes terms
  broaderTerms.push('diabetes', 'T1D', 'type 1 diabetes', 'diabetes management')
  
  return broaderTerms
}

function generateSpecificTerms(query: string, results: any[]): string[] {
  const specificTerms = []
  
  // Extract specific terms from results
  results.forEach(r => {
    if (r.keywords) {
      r.keywords.forEach((keyword: string) => {
        if (keyword.toLowerCase().includes(query.toLowerCase()) && !specificTerms.includes(keyword)) {
          specificTerms.push(keyword)
        }
      })
    }
  })
  
  return specificTerms.slice(0, 8)
}

function generateFilterSuggestions(results: any[]): any[] {
  const suggestions = []
  
  // Suggest filters based on result distribution
  const typeDistribution = results.reduce((acc, r) => {
    const type = r.type || 'unknown'
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  Object.entries(typeDistribution).forEach(([type, count]) => {
    if (count > results.length * 0.1) { // If type represents >10% of results
      suggestions.push({
        filter: 'type',
        value: type,
        count,
        description: `Filter to ${type} results (${count} items)`
      })
    }
  })
  
  // Suggest date filters
  const dates = results
    .map(r => r.timestamp || r.publicationDate)
    .filter(Boolean)
    .map(d => new Date(d).getFullYear())
  
  if (dates.length > 0) {
    const recentYears = [...new Set(dates)].sort((a, b) => b - a).slice(0, 3)
    recentYears.forEach(year => {
      const yearCount = dates.filter(d => d === year).length
      suggestions.push({
        filter: 'dateRange',
        value: year.toString(),
        count: yearCount,
        description: `Filter to ${year} (${yearCount} items)`
      })
    })
  }
  
  return suggestions
}

function analyzeResultPatterns(results: any[]): any[] {
  const patterns = []
  
  // Analyze temporal patterns
  const temporalPattern = analyzeTemporalPattern(results)
  if (temporalPattern) patterns.push(temporalPattern)
  
  // Analyze source patterns
  const sourcePattern = analyzeSourcePattern(results)
  if (sourcePattern) patterns.push(sourcePattern)
  
  // Analyze content patterns
  const contentPattern = analyzeContentPattern(results)
  if (contentPattern) patterns.push(contentPattern)
  
  return patterns
}

function analyzeTemporalPattern(results: any[]): any | null {
  const dates = results
    .map(r => r.timestamp || r.publicationDate)
    .filter(Boolean)
    .map(d => new Date(d))
    .sort((a, b) => a.getTime() - b.getTime())
  
  if (dates.length < 2) return null
  
  const timeSpan = dates[dates.length - 1].getTime() - dates[0].getTime()
  const daysSpan = timeSpan / (1000 * 60 * 60 * 24)
  
  return {
    type: 'temporal-pattern',
    title: 'Temporal Distribution',
    description: `Results span ${Math.round(daysSpan)} days`,
    earliest: dates[0],
    latest: dates[dates.length - 1],
    distribution: 'Results are distributed across a significant time period'
  }
}

function analyzeSourcePattern(results: any[]): any | null {
  const sources = results.reduce((acc, r) => {
    const source = r.source || r.platform || 'unknown'
    acc[source] = (acc[source] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const sourceCount = Object.keys(sources).length
  if (sourceCount < 2) return null
  
  return {
    type: 'source-pattern',
    title: 'Source Distribution',
    description: `Results from ${sourceCount} different sources`,
    sources,
    diversity: sourceCount > 5 ? 'high' : sourceCount > 2 ? 'medium' : 'low'
  }
}

function analyzeContentPattern(results: any[]): any | null {
  const hasContent = results.filter(r => r.description || r.content || r.abstract).length
  const hasMetadata = results.filter(r => r.author || r.institution || r.keywords).length
  
  if (hasContent === 0 && hasMetadata === 0) return null
  
  return {
    type: 'content-pattern',
    title: 'Content Richness',
    description: 'Analysis of result content quality',
    metrics: {
      withContent: hasContent,
      withMetadata: hasMetadata,
      totalResults: results.length
    },
    assessment: hasContent > results.length * 0.7 ? 'rich' : hasContent > results.length * 0.3 ? 'moderate' : 'limited'
  }
}

function generateQuerySpecificInsights(results: any[], query: string): any[] {
  const insights = []
  
  // Generate insights based on query content
  if (query.toLowerCase().includes('side effect') || query.toLowerCase().includes('toxicity')) {
    insights.push({
      type: 'query-specific',
      title: 'Side Effect & Toxicity Analysis',
      description: 'Your query focuses on safety and adverse effects',
      recommendation: 'Consider checking FDA databases and clinical studies for verified information',
      priority: 'high'
    })
  }
  
  if (query.toLowerCase().includes('discount') || query.toLowerCase().includes('cost')) {
    insights.push({
      type: 'query-specific',
      title: 'Cost & Discount Analysis',
      description: 'Your query focuses on financial aspects of T1D management',
      recommendation: 'Check multiple pharmacy discount programs and manufacturer assistance programs',
      priority: 'medium'
    })
  }
  
  if (query.toLowerCase().includes('community') || query.toLowerCase().includes('experience')) {
    insights.push({
      type: 'query-specific',
      title: 'Community Experience Analysis',
      description: 'Your query focuses on patient experiences and community insights',
      recommendation: 'Verify community claims through medical literature and consult healthcare providers',
      priority: 'medium'
    })
  }
  
  return insights
}

function identifyEmergingTrends(results: any[]): any[] {
  const trends = []
  
  // Identify recent patterns
  const recentResults = results.filter(r => {
    const date = r.timestamp || r.publicationDate
    if (!date) return false
    const daysSince = (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
    return daysSince <= 30
  })
  
  if (recentResults.length > 0) {
    trends.push({
      type: 'emerging-trend',
      title: 'Recent Activity',
      description: `High activity in the last 30 days (${recentResults.length} results)`,
      results: recentResults.length,
      recommendation: 'Monitor these recent developments for emerging patterns'
    })
  }
  
  return trends
}

function analyzeSourceReliability(results: any[]): any {
  const reliability = results.reduce((acc, r) => {
    const source = r.source || r.platform || 'unknown'
    if (!acc[source]) {
      acc[source] = { total: 0, verified: 0, highQuality: 0 }
    }
    acc[source].total++
    
    if (r.verificationStatus === 'verified') acc[source].verified++
    if (r.relevance > 80) acc[source].highQuality++
    
    return acc
  }, {} as Record<string, { total: number, verified: number, highQuality: number }>)
  
  const reliabilityScores = Object.entries(reliability).map(([source, data]) => ({
    source,
    verificationRate: data.total > 0 ? (data.verified / data.total) * 100 : 0,
    qualityRate: data.total > 0 ? (data.highQuality / data.total) * 100 : 0,
    overallScore: data.total > 0 ? ((data.verified + data.highQuality) / (data.total * 2)) * 100 : 0
  }))
  
  return {
    type: 'source-reliability',
    title: 'Source Reliability Analysis',
    description: 'Analysis of data source credibility and quality',
    sources: reliabilityScores.sort((a, b) => b.overallScore - a.overallScore),
    recommendation: 'Prioritize sources with higher reliability scores for critical decisions'
  }
}

function extractTrendingTopics(results: any[]): any[] {
  const topics = []
  
  // Extract common keywords and topics
  const allKeywords = results.flatMap(r => r.keywords || [])
  const keywordFreq = allKeywords.reduce((acc, keyword) => {
    acc[keyword] = (acc[keyword] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const trendingKeywords = Object.entries(keywordFreq)
    .sort(([_, a], [__, b]) => b - a)
    .slice(0, 5)
    .map(([keyword, count]) => ({ keyword, count }))
  
  if (trendingKeywords.length > 0) {
    topics.push({
      type: 'trending-topics',
      title: 'Trending Topics',
      description: 'Most frequently mentioned topics in search results',
      topics: trendingKeywords
    })
  }
  
  return topics
}

function extractEmergingPatterns(results: any[]): any[] {
  const patterns = []
  
  // Look for patterns in result types
  const typePatterns = results.reduce((acc, r) => {
    const type = r.type || 'unknown'
    if (!acc[type]) acc[type] = []
    acc[type].push(r)
    return acc
  }, {} as Record<string, any[]>)
  
  Object.entries(typePatterns).forEach(([type, typeResults]) => {
    if (typeResults.length > 2) {
      patterns.push({
        type: 'type-pattern',
        title: `${type} Pattern`,
        description: `Multiple ${type} results found`,
        count: typeResults.length,
        sample: typeResults.slice(0, 3)
      })
    }
  })
  
  return patterns
}

function identifyResearchGaps(results: any[], query: string): any[] {
  const gaps = []
  
  // Identify areas with limited research
  const resultTypes = results.map(r => r.type || 'unknown')
  const typeFreq = resultTypes.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const underrepresentedTypes = Object.entries(typeFreq)
    .filter(([_, count]) => count < results.length * 0.1)
    .map(([type, count]) => ({ type, count }))
  
  if (underrepresentedTypes.length > 0) {
    gaps.push({
      type: 'research-gap',
      title: 'Research Gaps Identified',
      description: 'Areas with limited research coverage',
      gaps: underrepresentedTypes,
      recommendation: 'Consider focusing research efforts on these underrepresented areas'
    })
  }
  
  return gaps
}

function findCrossReferences(results: any[]): any[] {
  const crossRefs = []
  
  // Look for results that reference each other
  const references = results.filter(r => r.relatedStudies || r.citations || r.references)
  
  if (references.length > 0) {
    crossRefs.push({
      type: 'cross-references',
      title: 'Cross-References Found',
      description: 'Results with multiple references and connections',
      count: references.length,
      sample: references.slice(0, 3)
    })
  }
  
  return crossRefs
}
