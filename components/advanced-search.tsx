"use client"

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Search, 
  Filter, 
  X, 
  Brain, 
  Database, 
  Users, 
  BarChart3, 
  Globe, 
  TrendingUp, 
  Shield, 
  Activity, 
  Zap, 
  Heart, 
  Microscope, 
  BookOpen, 
  MessageSquare, 
  Settings, 
  User,
  Clock,
  Star,
  Tag,
  Calendar,
  MapPin,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sliders,
  Save,
  History,
  Bookmark
} from 'lucide-react'
import { realAPIs } from '@/lib/real-apis'
import { safeNumberFormat, safeDateFormat } from '@/lib/utils'

interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  type: 'page' | 'data' | 'research' | 'community' | 'discovery' | 'pattern'
  icon: React.ReactNode
  source: string
  relevance: number
  timestamp: string
  tags: string[]
  metadata: any
}

interface SearchFilter {
  type: string[]
  source: string[]
  dateRange: string
  relevance: number
  tags: string[]
}

interface SearchHistory {
  query: string
  timestamp: Date
  resultCount: number
}

export default function AdvancedSearch() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<SearchFilter>({
    type: [],
    source: [],
    dateRange: 'all',
    relevance: 0,
    tags: []
  })
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([])
  const [savedSearches, setSavedSearches] = useState<string[]>([])
  const [allData, setAllData] = useState<any>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])

  // Load all data for comprehensive search
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await realAPIs.getAllRealData()
        setAllData(data)
      } catch (error) {
        console.error('Error loading data for search:', error)
      }
    }
    loadData()
  }, [])

  // Generate search suggestions based on data
  useEffect(() => {
    if (allData) {
      const suggestions = generateSuggestions(allData)
      setSuggestions(suggestions)
    }
  }, [allData])

  const generateSuggestions = (data: any): string[] => {
    const suggestions: string[] = []
    
    // Add common diabetes terms
    suggestions.push('glucose', 'insulin', 'CGM', 'diabetes', 'type 1', 'hypoglycemia', 'hyperglycemia')
    
    // Add research terms
    suggestions.push('clinical trial', 'research', 'study', 'analysis', 'correlation', 'pattern')
    
    // Add technology terms
    suggestions.push('AI', 'machine learning', 'algorithm', 'prediction', 'monitoring')
    
    // Add community terms
    suggestions.push('community', 'discussion', 'experience', 'support', 'advocacy')
    
    return suggestions.slice(0, 20)
  }

  // Enhanced search function with comprehensive data analysis
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim() || !allData) return

    setIsSearching(true)
    
    try {
      const results: SearchResult[] = []
      
      // Search across all data sources
      if (allData.hackerNews) {
        results.push(...searchInSource(allData.hackerNews, query, 'research', 'Hacker News'))
      }
      
      if (allData.github) {
        results.push(...searchInSource(allData.github, query, 'data', 'GitHub'))
      }
      
      if (allData.pubmed) {
        results.push(...searchInSource(allData.pubmed, query, 'research', 'PubMed'))
      }
      
      if (allData.clinicalTrials) {
        results.push(...searchInSource(allData.clinicalTrials, query, 'research', 'ClinicalTrials.gov'))
      }
      
      if (allData.reddit) {
        results.push(...searchInSource(allData.reddit, query, 'community', 'Reddit'))
      }
      
      if (allData.fda) {
        results.push(...searchInSource(allData.fda, query, 'data', 'FDA MAUDE'))
      }
      
      if (allData.rss) {
        results.push(...searchInSource(allData.rss.all, query, 'data', 'RSS Feeds'))
      }

      // Apply filters
      let filteredResults = applyFilters(results, filters)
      
      // Sort by relevance
      filteredResults.sort((a, b) => b.relevance - a.relevance)
      
      setSearchResults(filteredResults)
      
      // Save to search history
      addToSearchHistory(query, filteredResults.length)
      
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }, [allData, filters])

  const searchInSource = (sourceData: any[], query: string, type: string, sourceName: string): SearchResult[] => {
    const results: SearchResult[] = []
    const queryLower = query.toLowerCase()
    
    sourceData.forEach((item, index) => {
      let relevance = 0
      let matchedFields: string[] = []
      
      // Check title
      if (item.title && item.title.toLowerCase().includes(queryLower)) {
        relevance += 10
        matchedFields.push('title')
      }
      
      // Check description
      if (item.description && item.description.toLowerCase().includes(queryLower)) {
        relevance += 5
        matchedFields.push('description')
      }
      
      // Check tags
      if (item.tags) {
        const tagMatches = item.tags.filter((tag: string) => 
          tag.toLowerCase().includes(queryLower)
        )
        if (tagMatches.length > 0) {
          relevance += tagMatches.length * 3
          matchedFields.push('tags')
        }
      }
      
      // Check content
      if (item.content && item.content.toLowerCase().includes(queryLower)) {
        relevance += 2
        matchedFields.push('content')
      }
      
      // Check abstract
      if (item.abstract && item.abstract.toLowerCase().includes(queryLower)) {
        relevance += 3
        matchedFields.push('abstract')
      }
      
      // If we found matches, create a result
      if (relevance > 0) {
        results.push({
          id: `${sourceName}_${index}`,
          title: item.title || item.name || 'Untitled',
          description: item.description || item.content || item.abstract || 'No description available',
          url: item.url || item.sourceUrl || `/${type}/${index}`,
          type: type as any,
          icon: getTypeIcon(type),
          source: sourceName,
          relevance,
          timestamp: item.timestamp || item.createdAt || new Date().toISOString(),
          tags: item.tags || [],
          metadata: {
            matchedFields,
            sourceData: item
          }
        })
      }
    })
    
    return results
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page': return <Settings className="h-4 w-4" />
      case 'data': return <Database className="h-4 w-4" />
      case 'research': return <BookOpen className="h-4 w-4" />
      case 'community': return <Users className="h-4 w-4" />
      case 'discovery': return <Brain className="h-4 w-4" />
      case 'pattern': return <TrendingUp className="h-4 w-4" />
      default: return <Globe className="h-4 w-4" />
    }
  }

  const applyFilters = (results: SearchResult[], filters: SearchFilter): SearchResult[] => {
    let filtered = results

    // Filter by type
    if (filters.type.length > 0) {
      filtered = filtered.filter(result => filters.type.includes(result.type))
    }

    // Filter by source
    if (filters.source.length > 0) {
      filtered = filtered.filter(result => filters.source.includes(result.source))
    }

    // Filter by relevance
    if (filters.relevance > 0) {
      filtered = filtered.filter(result => result.relevance >= filters.relevance)
    }

    // Filter by tags
    if (filters.tags.length > 0) {
      filtered = filtered.filter(result => 
        filters.tags.some(tag => 
          result.tags.some(resultTag => 
            resultTag.toLowerCase().includes(tag.toLowerCase())
          )
        )
      )
    }

    return filtered
  }

  const addToSearchHistory = (query: string, resultCount: number) => {
    const newHistory: SearchHistory = {
      query,
      timestamp: new Date(),
      resultCount
    }
    
    setSearchHistory(prev => {
      const filtered = prev.filter(h => h.query !== query)
      return [newHistory, ...filtered].slice(0, 10)
    })
  }

  const saveSearch = (query: string) => {
    if (!savedSearches.includes(query)) {
      setSavedSearches(prev => [...prev, query])
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      performSearch(searchQuery)
    }
  }

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url)
  }

  const clearFilters = () => {
    setFilters({
      type: [],
      source: [],
      dateRange: 'all',
      relevance: 0,
      tags: []
    })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'page': return 'bg-blue-100 text-blue-800'
      case 'data': return 'bg-green-100 text-green-800'
      case 'research': return 'bg-purple-100 text-purple-800'
      case 'community': return 'bg-orange-100 text-orange-800'
      case 'discovery': return 'bg-indigo-100 text-indigo-800'
      case 'pattern': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'page': return 'Page'
      case 'data': return 'Data'
      case 'research': return 'Research'
      case 'community': return 'Community'
      case 'discovery': return 'Discovery'
      case 'pattern': return 'Pattern'
      default: return 'Other'
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Search Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Advanced Search
        </h1>
        <p className="text-xl text-gray-600">
          Search across all data sources, research papers, community insights, and AI discoveries
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
            <input
              type="text"
              placeholder="Search for research, data, insights, patterns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-20 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Search Suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {suggestions.slice(0, 8).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchQuery(suggestion)
                  performSearch(suggestion)
                }}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filters and Results Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="card-modern p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-gray-500 hover:text-gray-700"
              >
                {showFilters ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>

            {showFilters && (
              <div className="space-y-4">
                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <div className="space-y-2">
                    {['page', 'data', 'research', 'community', 'discovery', 'pattern'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.type.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters(prev => ({ ...prev, type: [...prev.type, type] }))
                            } else {
                              setFilters(prev => ({ ...prev, type: prev.type.filter(t => t !== type) }))
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Source Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                  <div className="space-y-2">
                    {['Hacker News', 'GitHub', 'PubMed', 'ClinicalTrials.gov', 'Reddit', 'FDA MAUDE', 'RSS Feeds'].map((source) => (
                      <label key={source} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.source.includes(source)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters(prev => ({ ...prev, source: [...prev.source, source] }))
                            } else {
                              setFilters(prev => ({ ...prev, source: prev.source.filter(s => s !== source) }))
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm">{source}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Relevance Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Relevance: {filters.relevance}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={filters.relevance}
                    onChange={(e) => setFilters(prev => ({ ...prev, relevance: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Search History */}
          <div className="card-modern p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Recent Searches</h3>
            <div className="space-y-2">
              {searchHistory.slice(0, 5).map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(item.query)
                    performSearch(item.query)
                  }}
                  className="w-full text-left p-2 rounded hover:bg-gray-50 transition-colors"
                >
                  <div className="text-sm font-medium text-gray-900 truncate">{item.query}</div>
                  <div className="text-xs text-gray-500">
                    {safeDateFormat(item.timestamp)} • {item.resultCount} results
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="lg:col-span-3">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Search Results
              </h3>
              {searchResults.length > 0 && (
                <p className="text-sm text-gray-600">
                  {searchResults.length} results found
                </p>
              )}
            </div>
            
            {searchQuery && (
              <button
                onClick={() => saveSearch(searchQuery)}
                className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
              >
                <Bookmark className="h-4 w-4 mr-1" />
                Save Search
              </button>
            )}
          </div>

          {/* Loading State */}
          {isSearching && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Searching across all data sources...</p>
            </div>
          )}

          {/* No Results */}
          {!isSearching && searchQuery && searchResults.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )}

          {/* Search Results */}
          {!isSearching && searchResults.length > 0 && (
            <div className="space-y-4">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="card-modern p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {result.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                          {result.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(result.type)}`}>
                            {getTypeLabel(result.type)}
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {result.source}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {result.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {safeDateFormat(result.timestamp)}
                          </span>
                          <span className="flex items-center">
                            <Star className="h-3 w-3 mr-1" />
                            Relevance: {result.relevance}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {result.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                          {result.tags.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{result.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
