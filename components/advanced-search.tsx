"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Download, BookOpen, Calendar, ExternalLink, TrendingUp } from "lucide-react"

interface SearchResult {
  id: string
  title: string
  content: string
  source: string
  url: string
  published_at: string
  sentiment: string
  entities: string[]
  relevance_score: number
  category: string
  engagement?: {
    likes: number
    comments: number
    shares: number
  }
  study_type?: string
  sample_size?: number
  p_value?: number
}

export default function AdvancedSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [filters, setFilters] = useState({
    dateRange: { start: "", end: "" },
    sources: [] as string[],
    sentiment: "any",
    contentTypes: [] as string[],
  })

  const handleSearch = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/research/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keywords: searchQuery.split(" "),
          filters,
          category: activeCategory,
          min_results_per_category: 10,
          include_engagement_metrics: true,
          include_study_metadata: true,
        }),
      })

      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleExport = async (format: string) => {
    try {
      const response = await fetch("/api/research/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          format,
          query: { keywords: searchQuery.split(" "), filters, category: activeCategory },
        }),
      })

      const data = await response.json()
      if (data.success) {
        alert(`Export job created: ${data.export_job.id}`)
      }
    } catch (error) {
      console.error("Export failed:", error)
    }
  }

  const filteredResults =
    activeCategory === "all" ? results : results.filter((result) => result.category === activeCategory)

  const categoryStats = {
    all: results.length,
    social_media: results.filter((r) => r.category === "social_media").length,
    clinical_studies: results.filter((r) => r.category === "clinical_studies").length,
    user_experiences: results.filter((r) => r.category === "user_experiences").length,
    device_reports: results.filter((r) => r.category === "device_reports").length,
    breakthrough_discoveries: results.filter((r) => r.category === "breakthrough_discoveries").length,
  }

  return (
    <div className="space-y-6">
      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Advanced Research Search</span>
          </CardTitle>
          <CardDescription>
            Search across 50,000+ sources with 6,000+ AI algorithms for comprehensive T1D discovery
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter search terms (e.g., metallic taste hypoglycemia, cold weather CGM)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(categoryStats).map(([category, count]) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="flex items-center gap-2"
              >
                {category.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                <Badge variant="secondary" className="text-xs">
                  {count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Advanced Filters */}
          <Tabs defaultValue="basic" className="w-full">
            <TabsList>
              <TabsTrigger value="basic">Basic Filters</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <div className="flex space-x-2">
                    <Input
                      type="date"
                      value={filters.dateRange.start}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          dateRange: { ...prev.dateRange, start: e.target.value },
                        }))
                      }
                    />
                    <Input
                      type="date"
                      value={filters.dateRange.end}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          dateRange: { ...prev.dateRange, end: e.target.value },
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Sentiment</Label>
                  <Select
                    value={filters.sentiment}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, sentiment: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any sentiment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any sentiment</SelectItem>
                      <SelectItem value="positive">Positive</SelectItem>
                      <SelectItem value="negative">Negative</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                      <SelectItem value="scientific">Scientific</SelectItem>
                      <SelectItem value="groundbreaking">Groundbreaking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Source Types</Label>
                  <div className="space-y-2">
                    {[
                      "Social Media",
                      "Clinical Studies",
                      "User Experiences",
                      "Device Reports",
                      "Breakthrough Discoveries",
                    ].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={type} />
                        <Label htmlFor={type} className="text-sm">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Must Include Terms</Label>
                  <Textarea placeholder="Enter terms that must be present..." />
                </div>
                <div className="space-y-2">
                  <Label>Must Exclude Terms</Label>
                  <Textarea placeholder="Enter terms to exclude..." />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Search Results */}
      {filteredResults.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                Search Results ({filteredResults.length})
                {activeCategory !== "all" && (
                  <Badge variant="outline" className="ml-2">
                    {activeCategory.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </Badge>
                )}
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleExport("csv")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExport("json")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export JSON
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredResults.map((result) => (
                <div key={result.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        {result.title}
                        <a
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </h3>
                      <Badge
                        variant="outline"
                        className={`mt-1 ${
                          result.category === "breakthrough_discoveries"
                            ? "bg-yellow-100 text-yellow-800"
                            : result.category === "clinical_studies"
                              ? "bg-blue-100 text-blue-800"
                              : result.category === "social_media"
                                ? "bg-green-100 text-green-800"
                                : result.category === "device_reports"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {result.category.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {(result.relevance_score * 100).toFixed(0)}% match
                      </Badge>
                    </div>
                  </div>

                  <p className="text-gray-600 line-clamp-3">{result.content}</p>

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {result.source.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(result.published_at).toLocaleDateString()}
                    </span>
                    <Badge
                      variant={
                        result.sentiment === "positive" || result.sentiment === "groundbreaking"
                          ? "default"
                          : result.sentiment === "negative" || result.sentiment === "concerning"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {result.sentiment}
                    </Badge>
                  </div>

                  {result.engagement && (
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>👍 {result.engagement.likes}</span>
                      <span>💬 {result.engagement.comments}</span>
                      <span>🔄 {result.engagement.shares}</span>
                    </div>
                  )}

                  {result.study_type && (
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <Badge variant="outline">{result.study_type.replace("_", " ")}</Badge>
                      {result.sample_size && <span>n={result.sample_size}</span>}
                      {result.p_value && <span>p={result.p_value}</span>}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {result.entities.map((entity) => (
                      <Badge key={entity} variant="outline" className="text-xs">
                        {entity.replace("_", " ")}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
