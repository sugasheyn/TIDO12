"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, Database, Users, FileText, Newspaper, Building, MapPin, Languages } from "lucide-react"

export default function ExpandedSourcesPage() {
  const [sources, setSources] = useState([])
  const [filters, setFilters] = useState({
    category: "all",
    country: "all",
    language: "all",
    search: "",
  })

  const sourceCategories = {
    social_media: {
      icon: Users,
      label: "Social Media",
      description: "Global social platforms and communities",
      count: 1247,
      platforms: ["Reddit", "Twitter/X", "Facebook", "Instagram", "TikTok", "YouTube", "Weibo", "VKontakte", "LINE"],
    },
    academic: {
      icon: FileText,
      label: "Academic Research",
      description: "Peer-reviewed journals and research databases",
      count: 892,
      platforms: ["PubMed", "Google Scholar", "ResearchGate", "arXiv", "Cochrane", "Embase"],
    },
    clinical_trial: {
      icon: Database,
      label: "Clinical Trials",
      description: "Global clinical trial registries",
      count: 247,
      platforms: ["ClinicalTrials.gov", "EudraCT", "ICTRP", "ANZCTR", "CTRI"],
    },
    news: {
      icon: Newspaper,
      label: "News & Media",
      description: "Medical news and health journalism",
      count: 156,
      platforms: ["Reuters Health", "MedPage Today", "STAT News", "Fierce Biotech", "BioPharma Dive"],
    },
    industry: {
      icon: Building,
      label: "Industry Sources",
      description: "Device manufacturers and pharmaceutical companies",
      count: 89,
      platforms: ["Dexcom", "Abbott", "Medtronic", "Tandem", "Insulet", "Novo Nordisk"],
    },
    government: {
      icon: Globe,
      label: "Government & Regulatory",
      description: "Health agencies and regulatory bodies",
      count: 67,
      platforms: ["FDA", "EMA", "Health Canada", "TGA", "PMDA", "WHO"],
    },
  }

  const globalCoverage = {
    countries: [
      { code: "US", name: "United States", sources: 1247 },
      { code: "GB", name: "United Kingdom", sources: 234 },
      { code: "CA", name: "Canada", sources: 189 },
      { code: "AU", name: "Australia", sources: 156 },
      { code: "DE", name: "Germany", sources: 134 },
      { code: "FR", name: "France", sources: 123 },
      { code: "CN", name: "China", sources: 89 },
      { code: "JP", name: "Japan", sources: 78 },
      { code: "BR", name: "Brazil", sources: 67 },
      { code: "IN", name: "India", sources: 56 },
    ],
    languages: [
      { code: "en", name: "English", sources: 2847 },
      { code: "es", name: "Spanish", sources: 234 },
      { code: "zh", name: "Chinese", sources: 189 },
      { code: "fr", name: "French", sources: 156 },
      { code: "de", name: "German", sources: 134 },
      { code: "pt", name: "Portuguese", sources: 89 },
      { code: "ja", name: "Japanese", sources: 78 },
      { code: "ru", name: "Russian", sources: 67 },
    ],
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Expanded Data Sources</h1>
          <p className="text-muted-foreground">
            Comprehensive global coverage across 6,247+ sources in 89 countries and 34 languages
          </p>
        </div>
        <Button>Add New Source</Button>
      </div>

      {/* Global Coverage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sources</p>
                <p className="text-2xl font-bold">6,247</p>
              </div>
              <Globe className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Countries</p>
                <p className="text-2xl font-bold">89</p>
              </div>
              <MapPin className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Languages</p>
                <p className="text-2xl font-bold">34</p>
              </div>
              <Languages className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Now</p>
                <p className="text-2xl font-bold text-green-600">5,983</p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Source Filters</CardTitle>
          <CardDescription>Filter sources by category, location, and language</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {Object.entries(sourceCategories).map(([key, category]) => (
                  <SelectItem key={key} value={key}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.country} onValueChange={(value) => setFilters({ ...filters, country: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {globalCoverage.countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.name} ({country.sources})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.language} onValueChange={(value) => setFilters({ ...filters, language: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {globalCoverage.languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name} ({lang.sources})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Search sources..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Source Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(sourceCategories).map(([key, category]) => {
          const IconComponent = category.icon
          return (
            <Card key={key} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-6 w-6 text-blue-500" />
                    <div>
                      <CardTitle className="text-lg">{category.label}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">{category.count}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Key Platforms:</p>
                  <div className="flex flex-wrap gap-1">
                    {category.platforms.slice(0, 4).map((platform) => (
                      <Badge key={platform} variant="outline" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                    {category.platforms.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{category.platforms.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
