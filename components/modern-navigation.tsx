"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Search, 
  Menu, 
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
  Home,
  FileText,
  AlertTriangle
} from 'lucide-react'

interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  type: 'page' | 'data' | 'research' | 'community'
  icon: React.ReactNode
}

const searchData: SearchResult[] = [
  { id: '1', title: 'Home', description: 'Main dashboard and overview', url: '/', type: 'page', icon: <Home className="h-4 w-4" /> },
  { id: '2', title: 'Discoveries', description: 'Latest research findings and discoveries', url: '/discoveries', type: 'research', icon: <Search className="h-4 w-4" /> },
  { id: '3', title: 'Insights', description: 'AI-powered insights and analysis', url: '/insights', type: 'research', icon: <Brain className="h-4 w-4" /> },
  { id: '4', title: 'Sources', description: 'Data sources and research repositories', url: '/sources', type: 'data', icon: <Database className="h-4 w-4" /> },
  { id: '5', title: 'Community', description: 'User community and discussions', url: '/community', type: 'community', icon: <Users className="h-4 w-4" /> },
  { id: '6', title: 'Comprehensive Discoveries', description: 'Detailed discoveries with live links', url: '/discoveries/comprehensive', type: 'research', icon: <FileText className="h-4 w-4" /> },
  { id: '7', title: 'Comprehensive Insights', description: 'Detailed insights with live links', url: '/insights/comprehensive', type: 'research', icon: <Brain className="h-4 w-4" /> },
  { id: '8', title: 'Comprehensive Sources', description: 'Detailed data sources with live links', url: '/sources/comprehensive', type: 'data', icon: <Database className="h-4 w-4" /> },
  { id: '9', title: 'Device Issues', description: 'Diabetes device problems and solutions', url: '/device-issues', type: 'research', icon: <AlertTriangle className="h-4 w-4" /> },
]

export default function ModernNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([])
      return
    }

    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setSearchResults(filtered.slice(0, 8))
  }, [searchQuery])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchResults.length > 0) {
      router.push(searchResults[0].url)
      setSearchQuery('')
      setSearchResults([])
    }
  }

  const handleResultClick = (url: string) => {
    router.push(url)
    setSearchQuery('')
    setSearchResults([])
    setIsSearchFocused(false)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'page': return 'bg-blue-100 text-blue-800'
      case 'data': return 'bg-green-100 text-green-800'
      case 'research': return 'bg-purple-100 text-purple-800'
      case 'community': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'page': return 'Page'
      case 'data': return 'Data'
      case 'research': return 'Research'
      case 'community': return 'Community'
      default: return 'Other'
    }
  }

  return (
    <nav className="nav-modern sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">T1D AI Platform</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/real-data" className="nav-link">
              <Database className="h-4 w-4 mr-2" />
              Data
            </Link>
            <Link href="/sources/comprehensive" className="nav-link">
              <Database className="h-4 w-4 mr-2" />
              Sources
            </Link>
            <Link href="/discoveries" className="nav-link">
              <Brain className="h-4 w-4 mr-2" />
              Discoveries
            </Link>
            <Link href="/insights/comprehensive" className="nav-link">
              <BookOpen className="h-4 w-4 mr-2" />
              Insights
            </Link>
            <Link href="/patterns" className="nav-link">
              <TrendingUp className="h-4 w-4 mr-2" />
              Patterns
            </Link>
            <Link href="/community" className="nav-link">
              <Users className="h-4 w-4 mr-2" />
              Community
            </Link>
            <Link href="/analytics-dashboard" className="nav-link">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Link>
            <Link href="/device-issues" className="nav-link">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Device Issues
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="search-container">
              <Search className="search-icon" />
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search research, data, insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className="search-input"
                />
              </form>
              
              {/* Search Results Dropdown */}
              {isSearchFocused && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result.url)}
                      className="w-full p-4 hover:bg-gray-50 flex items-start space-x-3 text-left transition-colors"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {result.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900 truncate">
                            {result.title}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(result.type)}`}>
                            {getTypeLabel(result.type)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {result.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/profile" className="nav-link">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Link>
            <Link href="/dashboard" className="btn-primary">
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            {/* Mobile Search */}
            <div className="px-3 py-2">
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <Link href="/real-data" className="block px-3 py-2 nav-link">
              <Database className="h-4 w-4 mr-2 inline" />
              Data
            </Link>
            <Link href="/sources/comprehensive" className="block px-3 py-2 nav-link">
              <Database className="h-4 w-4 mr-2 inline" />
              Sources
            </Link>
            <Link href="/discoveries" className="block px-3 py-2 nav-link">
              <Brain className="h-4 w-4 mr-2 inline" />
              Discoveries
            </Link>
            <Link href="/insights/comprehensive" className="block px-3 py-2 nav-link">
              <BookOpen className="h-4 w-4 mr-2 inline" />
              Insights
            </Link>
            <Link href="/patterns" className="block px-3 py-2 nav-link">
              <TrendingUp className="h-4 w-4 mr-2 inline" />
              Patterns
            </Link>
            <Link href="/community" className="block px-3 py-2 nav-link">
              <Users className="h-4 w-4 mr-2 inline" />
              Community
            </Link>
            <Link href="/analytics-dashboard" className="block px-3 py-2 nav-link">
              <BarChart3 className="h-4 w-4 mr-2 inline" />
              Analytics
            </Link>
            <Link href="/profile" className="block px-3 py-2 nav-link">
              <User className="h-4 w-4 mr-2 inline" />
              Profile
            </Link>
            <Link href="/dashboard" className="block px-3 py-2">
              <div className="btn-primary text-center">Dashboard</div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
