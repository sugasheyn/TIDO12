"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ExternalLink, 
  Database, 
  Microscope, 
  Users, 
  Globe, 
  FileText, 
  TrendingUp,
  Search,
  Filter,
  Calendar,
  MapPin,
  Tag,
  Activity,
  BookOpen,
  MessageSquare,
  Code,
  Shield,
  Heart,
  Star,
  Zap
} from "lucide-react"
import ModernNavigation from "@/components/modern-navigation"

interface DataSource {
  id: string
  name: string
  type: 'research' | 'clinical' | 'social' | 'news' | 'database' | 'community'
  category: string
  description: string
  url: string
  lastUpdated: string
  dataType: string[]
  region: string
  language: string
  reliability: number
  access: 'free' | 'subscription' | 'limited'
  features: string[]
  contact?: string
  api?: string
  documentation?: string
}

const comprehensiveSources: DataSource[] = [
  // Research Databases
  {
    id: "pubmed",
    name: "PubMed",
    type: "research",
    category: "Medical Research",
    description: "Comprehensive database of biomedical literature from MEDLINE, life science journals, and online books",
    url: "https://pubmed.ncbi.nlm.nih.gov/",
    lastUpdated: "2024-01-20",
    dataType: ["Research Papers", "Clinical Studies", "Systematic Reviews", "Meta-analyses"],
    region: "Global",
    language: "English",
    reliability: 95,
    access: "free",
    features: ["Advanced Search", "MeSH Terms", "Citation Export", "Full-text Links"],
    api: "https://ncbiinsights.ncbi.nlm.nih.gov/2017/11/02/new-online-course-for-using-ncbi-apis/",
    documentation: "https://pubmed.ncbi.nlm.nih.gov/help/"
  },
  {
    id: "clinicaltrials",
    name: "ClinicalTrials.gov",
    type: "clinical",
    category: "Clinical Research",
    description: "Database of privately and publicly funded clinical studies conducted around the world",
    url: "https://clinicaltrials.gov/",
    lastUpdated: "2024-01-20",
    dataType: ["Clinical Trials", "Study Protocols", "Results", "Recruitment Status"],
    region: "Global",
    language: "English",
    reliability: 98,
    access: "free",
    features: ["Trial Search", "Study Details", "Results Database", "Statistical Analysis"],
    api: "https://clinicaltrials.gov/api/",
    documentation: "https://clinicaltrials.gov/ct2/about-site/terms-conditions"
  },
  {
    id: "who",
    name: "World Health Organization (WHO)",
    type: "research",
    category: "Global Health",
    description: "International health organization providing global health data, research, and guidelines",
    url: "https://www.who.int/",
    lastUpdated: "2024-01-20",
    dataType: ["Health Statistics", "Research Reports", "Guidelines", "Global Data"],
    region: "Global",
    language: "Multiple",
    reliability: 99,
    access: "free",
    features: ["Global Health Data", "Research Publications", "Guidelines", "Statistics"],
    documentation: "https://www.who.int/data"
  },
  {
    id: "cdc",
    name: "Centers for Disease Control (CDC)",
    type: "research",
    category: "Public Health",
    description: "National public health institute providing health data, research, and guidelines",
    url: "https://www.cdc.gov/",
    lastUpdated: "2024-01-20",
    dataType: ["Health Statistics", "Research Reports", "Guidelines", "Surveillance Data"],
    region: "United States",
    language: "English",
    reliability: 98,
    access: "free",
    features: ["Health Statistics", "Research Publications", "Guidelines", "Data Tools"],
    documentation: "https://www.cdc.gov/data"
  },
  {
    id: "diabetes-uk",
    name: "Diabetes UK",
    type: "research",
    category: "Diabetes Research",
    description: "Leading UK diabetes charity providing research, support, and information",
    url: "https://www.diabetes.org.uk/",
    lastUpdated: "2024-01-20",
    dataType: ["Research Reports", "Support Information", "Guidelines", "Statistics"],
    region: "United Kingdom",
    language: "English",
    reliability: 90,
    access: "free",
    features: ["Research Publications", "Support Resources", "Guidelines", "Community"],
    documentation: "https://www.diabetes.org.uk/research"
  },
  {
    id: "ada",
    name: "American Diabetes Association (ADA)",
    type: "research",
    category: "Diabetes Research",
    description: "Leading US diabetes organization providing research, guidelines, and support",
    url: "https://www.diabetes.org/",
    lastUpdated: "2024-01-20",
    dataType: ["Research Reports", "Clinical Guidelines", "Support Information", "Statistics"],
    region: "United States",
    language: "English",
    reliability: 95,
    access: "free",
    features: ["Research Publications", "Clinical Guidelines", "Support Resources", "Education"],
    documentation: "https://www.diabetes.org/research"
  },
  {
    id: "jdrf",
    name: "JDRF (Juvenile Diabetes Research Foundation)",
    type: "research",
    category: "Type 1 Diabetes Research",
    description: "Global organization funding type 1 diabetes research and advocacy",
    url: "https://www.jdrf.org/",
    lastUpdated: "2024-01-20",
    dataType: ["Research Reports", "Clinical Trials", "Advocacy", "Support Information"],
    region: "Global",
    language: "English",
    reliability: 92,
    access: "free",
    features: ["Research Funding", "Clinical Trials", "Advocacy", "Support Resources"],
    documentation: "https://www.jdrf.org/research/"
  },
  {
    id: "european-association",
    name: "European Association for the Study of Diabetes (EASD)",
    type: "research",
    category: "Diabetes Research",
    description: "European organization promoting diabetes research and education",
    url: "https://www.easd.org/",
    lastUpdated: "2024-01-20",
    dataType: ["Research Publications", "Clinical Guidelines", "Conference Proceedings", "Education"],
    region: "Europe",
    language: "English",
    reliability: 94,
    access: "free",
    features: ["Research Publications", "Clinical Guidelines", "Conferences", "Education"],
    documentation: "https://www.easd.org/research"
  },
  {
    id: "international-diabetes",
    name: "International Diabetes Federation (IDF)",
    type: "research",
    category: "Global Diabetes",
    description: "Global diabetes organization providing research, guidelines, and advocacy",
    url: "https://www.idf.org/",
    lastUpdated: "2024-01-20",
    dataType: ["Global Statistics", "Research Reports", "Guidelines", "Advocacy"],
    region: "Global",
    language: "Multiple",
    reliability: 93,
    access: "free",
    features: ["Global Statistics", "Research Publications", "Guidelines", "Advocacy"],
    documentation: "https://www.idf.org/research"
  },
  {
    id: "nih",
    name: "National Institutes of Health (NIH)",
    type: "research",
    category: "Medical Research",
    description: "US medical research agency funding and conducting biomedical research",
    url: "https://www.nih.gov/",
    lastUpdated: "2024-01-20",
    dataType: ["Research Reports", "Clinical Trials", "Funding Information", "Publications"],
    region: "United States",
    language: "English",
    reliability: 99,
    access: "free",
    features: ["Research Funding", "Clinical Trials", "Publications", "Data Resources"],
    documentation: "https://www.nih.gov/research-training"
  },
  // Social Media & Community Sources
  {
    id: "reddit-diabetes",
    name: "r/diabetes (Reddit)",
    type: "social",
    category: "Community Discussion",
    description: "Active Reddit community for diabetes discussion, support, and information sharing",
    url: "https://www.reddit.com/r/diabetes/",
    lastUpdated: "2024-01-20",
    dataType: ["Community Discussion", "Personal Experiences", "Support", "Information Sharing"],
    region: "Global",
    language: "English",
    reliability: 70,
    access: "free",
    features: ["Community Discussion", "Support Groups", "Information Sharing", "Moderation"],
    contact: "https://www.reddit.com/r/diabetes/about/moderators/"
  },
  {
    id: "reddit-type1",
    name: "r/Type1Diabetes (Reddit)",
    type: "social",
    category: "Type 1 Community",
    description: "Reddit community specifically for type 1 diabetes discussion and support",
    url: "https://www.reddit.com/r/Type1Diabetes/",
    lastUpdated: "2024-01-20",
    dataType: ["Type 1 Discussion", "Personal Experiences", "Support", "Information Sharing"],
    region: "Global",
    language: "English",
    reliability: 75,
    access: "free",
    features: ["Type 1 Focus", "Community Support", "Information Sharing", "Moderation"],
    contact: "https://www.reddit.com/r/Type1Diabetes/about/moderators/"
  },
  {
    id: "facebook-diabetes",
    name: "Diabetes Support Groups (Facebook)",
    type: "social",
    category: "Social Media Support",
    description: "Various Facebook groups providing diabetes support and information sharing",
    url: "https://www.facebook.com/groups/",
    lastUpdated: "2024-01-20",
    dataType: ["Community Support", "Information Sharing", "Personal Experiences", "Resources"],
    region: "Global",
    language: "Multiple",
    reliability: 65,
    access: "free",
    features: ["Community Support", "Information Sharing", "Resource Links", "Moderation"],
    contact: "https://www.facebook.com/help/contact/209046679279097"
  },
  {
    id: "twitter-diabetes",
    name: "Diabetes Community (Twitter/X)",
    type: "social",
    category: "Social Media",
    description: "Active Twitter community of healthcare professionals, researchers, and patients",
    url: "https://twitter.com/",
    lastUpdated: "2024-01-20",
    dataType: ["News Updates", "Research Sharing", "Community Discussion", "Expert Insights"],
    region: "Global",
    language: "Multiple",
    reliability: 75,
    access: "free",
    features: ["Real-time Updates", "Expert Follows", "Hashtag Communities", "Direct Messaging"],
    contact: "https://help.twitter.com/en/forms"
  },
  // News & Media Sources
  {
    id: "hacker-news",
    name: "Hacker News",
    type: "news",
    category: "Technology News",
    description: "Social news website focusing on computer science and entrepreneurship",
    url: "https://news.ycombinator.com/",
    lastUpdated: "2024-01-20",
    dataType: ["Technology News", "Research Discussion", "Startup Information", "Community Discussion"],
    region: "Global",
    language: "English",
    reliability: 80,
    access: "free",
    features: ["Community Voting", "Discussion Threads", "Link Sharing", "Moderation"],
    api: "https://github.com/HackerNews/API",
    documentation: "https://github.com/HackerNews/API"
  },
  {
    id: "github",
    name: "GitHub",
    type: "database",
    category: "Open Source",
    description: "Platform for version control and collaboration on software projects",
    url: "https://github.com/",
    lastUpdated: "2024-01-20",
    dataType: ["Open Source Projects", "Code Repositories", "Documentation", "Collaboration"],
    region: "Global",
    language: "Multiple",
    reliability: 90,
    access: "free",
    features: ["Version Control", "Issue Tracking", "Pull Requests", "Documentation"],
    api: "https://docs.github.com/en/rest",
    documentation: "https://docs.github.com/"
  },
  {
    id: "fda-maude",
    name: "FDA MAUDE Database",
    type: "database",
    category: "Medical Device Safety",
    description: "FDA database of medical device adverse events and safety information",
    url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfMAUDE/search.CFM",
    lastUpdated: "2024-01-20",
    dataType: ["Adverse Events", "Device Safety", "Recalls", "Safety Alerts"],
    region: "United States",
    language: "English",
    reliability: 98,
    access: "free",
    features: ["Adverse Event Search", "Device Information", "Safety Alerts", "Data Export"],
    documentation: "https://www.fda.gov/medical-devices/device-advice-comprehensive-regulatory-assistance/maude-fda-adverse-event-reporting-system"
  },
  // Academic Sources
  {
    id: "ieee",
    name: "IEEE Xplore",
    type: "research",
    category: "Engineering Research",
    description: "Digital library providing access to scientific and technical content",
    url: "https://ieeexplore.ieee.org/",
    lastUpdated: "2024-01-20",
    dataType: ["Research Papers", "Conference Proceedings", "Standards", "Technical Articles"],
    region: "Global",
    language: "English",
    reliability: 92,
    access: "subscription",
    features: ["Advanced Search", "Citation Export", "Full-text Access", "Standards"],
    api: "https://developer.ieee.org/",
    documentation: "https://developer.ieee.org/"
  },
  {
    id: "acm",
    name: "ACM Digital Library",
    type: "research",
    category: "Computer Science",
    description: "Digital library of computing and information technology research",
    url: "https://dl.acm.org/",
    lastUpdated: "2024-01-20",
    dataType: ["Research Papers", "Conference Proceedings", "Journals", "Technical Articles"],
    region: "Global",
    language: "English",
    reliability: 94,
    access: "subscription",
    features: ["Advanced Search", "Citation Export", "Full-text Access", "Conference Proceedings"],
    api: "https://libraries.acm.org/digital-library/api",
    documentation: "https://libraries.acm.org/digital-library/api"
  },
  {
    id: "springer",
    name: "Springer Link",
    type: "research",
    category: "Academic Publishing",
    description: "Platform providing access to scientific, technical, and medical research",
    url: "https://link.springer.com/",
    lastUpdated: "2024-01-20",
    dataType: ["Research Papers", "Books", "Journals", "Conference Proceedings"],
    region: "Global",
    language: "Multiple",
    reliability: 93,
    access: "subscription",
    features: ["Advanced Search", "Citation Export", "Full-text Access", "Book Chapters"],
    api: "https://dev.springernature.com/",
    documentation: "https://dev.springernature.com/"
  },
  {
    id: "wiley",
    name: "Wiley Online Library",
    type: "research",
    category: "Academic Publishing",
    description: "Platform providing access to scientific, technical, and medical research",
    url: "https://onlinelibrary.wiley.com/",
    lastUpdated: "2024-01-20",
    dataType: ["Research Papers", "Books", "Journals", "Reference Works"],
    region: "Global",
    language: "English",
    reliability: 92,
    access: "subscription",
    features: ["Advanced Search", "Citation Export", "Full-text Access", "Reference Works"],
    api: "https://developer.wiley.com/",
    documentation: "https://developer.wiley.com/"
  }
]

export default function ComprehensiveSourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedAccess, setSelectedAccess] = useState<string>("all")

  const filteredSources = comprehensiveSources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         source.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         source.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || source.type === selectedType
    const matchesCategory = selectedCategory === "all" || source.category === selectedCategory
    const matchesAccess = selectedAccess === "all" || source.access === selectedAccess
    
    return matchesSearch && matchesType && matchesCategory && matchesAccess
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'research': return 'bg-blue-100 text-blue-800'
      case 'clinical': return 'bg-green-100 text-green-800'
      case 'social': return 'bg-purple-100 text-purple-800'
      case 'news': return 'bg-orange-100 text-orange-800'
      case 'database': return 'bg-red-100 text-red-800'
      case 'community': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAccessColor = (access: string) => {
    switch (access) {
      case 'free': return 'bg-green-100 text-green-800'
      case 'subscription': return 'bg-yellow-100 text-yellow-800'
      case 'limited': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <ModernNavigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Data Sources
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access to real research studies, clinical data, community insights, and live information from verified sources worldwide
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search sources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Source Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="clinical">Clinical</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Medical Research">Medical Research</SelectItem>
                  <SelectItem value="Clinical Research">Clinical Research</SelectItem>
                  <SelectItem value="Global Health">Global Health</SelectItem>
                  <SelectItem value="Public Health">Public Health</SelectItem>
                  <SelectItem value="Diabetes Research">Diabetes Research</SelectItem>
                  <SelectItem value="Type 1 Diabetes Research">Type 1 Diabetes Research</SelectItem>
                  <SelectItem value="Global Diabetes">Global Diabetes</SelectItem>
                  <SelectItem value="Community Discussion">Community Discussion</SelectItem>
                  <SelectItem value="Type 1 Community">Type 1 Community</SelectItem>
                  <SelectItem value="Social Media Support">Social Media Support</SelectItem>
                  <SelectItem value="Social Media">Social Media</SelectItem>
                  <SelectItem value="Technology News">Technology News</SelectItem>
                  <SelectItem value="Open Source">Open Source</SelectItem>
                  <SelectItem value="Medical Device Safety">Medical Device Safety</SelectItem>
                  <SelectItem value="Engineering Research">Engineering Research</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Academic Publishing">Academic Publishing</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedAccess} onValueChange={setSelectedAccess}>
                <SelectTrigger>
                  <SelectValue placeholder="Access Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Access</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="subscription">Subscription</SelectItem>
                  <SelectItem value="limited">Limited</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Total Sources</p>
                    <p className="text-3xl font-bold">{comprehensiveSources.length}</p>
                  </div>
                  <Database className="h-12 w-12 text-blue-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Free Access</p>
                    <p className="text-3xl font-bold">
                      {comprehensiveSources.filter(s => s.access === 'free').length}
                    </p>
                  </div>
                  <Shield className="h-12 w-12 text-green-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Research Sources</p>
                    <p className="text-3xl font-bold">
                      {comprehensiveSources.filter(s => s.type === 'research').length}
                    </p>
                  </div>
                  <Microscope className="h-12 w-12 text-purple-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100">Community Sources</p>
                    <p className="text-3xl font-bold">
                      {comprehensiveSources.filter(s => s.type === 'social').length}
                    </p>
                  </div>
                  <Users className="h-12 w-12 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sources Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSources.map((source) => (
              <Card key={source.id} className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{source.name}</CardTitle>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={getTypeColor(source.type)}>
                          {source.type.charAt(0).toUpperCase() + source.type.slice(1)}
                        </Badge>
                        <Badge variant="outline">{source.category}</Badge>
                        <Badge className={getAccessColor(source.access)}>
                          {source.access.charAt(0).toUpperCase() + source.access.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{source.reliability}%</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 mb-4">{source.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>Updated: {source.lastUpdated}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{source.region}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Tag className="h-4 w-4" />
                      <span>{source.language}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Data Types:</p>
                    <div className="flex flex-wrap gap-1">
                      {source.dataType.map((type, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {source.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button asChild className="flex-1">
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Source
                      </a>
                    </Button>
                    
                    {source.api && (
                      <Button variant="outline" asChild>
                        <a href={source.api} target="_blank" rel="noopener noreferrer">
                          <Code className="h-4 w-4 mr-2" />
                          API
                        </a>
                      </Button>
                    )}
                    
                    {source.documentation && (
                      <Button variant="outline" asChild>
                        <a href={source.documentation} target="_blank" rel="noopener noreferrer">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Docs
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredSources.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No sources found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
