"use client"

import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, Clock, Bookmark, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"

interface SearchResult {
  id: string
  title: string
  content: string
  type: "post" | "study" | "discovery" | "community"
  source: string
  timestamp: Date
  relevance: number
}

export function EnhancedSearch() {
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState({
    types: [] as string[],
    sources: [] as string[],
    dateRange: "all" as string,
  })
  const [searchHistory, setSearchHistory] = useState<string[]>([
    "CGM accuracy cold weather",
    "insulin sensitivity magnesium",
    "exercise glucose patterns",
  ])
  const [savedSearches, setSavedSearches] = useState<string[]>([
    "metallic taste hypoglycemia",
    "dawn phenomenon solutions",
  ])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const suggestions = useMemo(() => {
    if (!query) return []
    const allSuggestions = [
      "CGM accuracy in cold weather",
      "insulin sensitivity and magnesium",
      "exercise-induced glucose patterns",
      "metallic taste before hypoglycemia",
      "dawn phenomenon management",
      "pump occlusion detection",
      "stress impact on blood sugar",
      "sleep quality and glucose control",
    ]
    return allSuggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
  }, [query])

  const handleSearch = useCallback(
    (searchQuery: string) => {
      console.log("[v0] Enhanced search executed:", searchQuery, filters)
      if (searchQuery && !searchHistory.includes(searchQuery)) {
        setSearchHistory((prev) => [searchQuery, ...prev.slice(0, 9)])
      }
      setShowSuggestions(false)
    },
    [filters, searchHistory],
  )

  const handleSaveSearch = useCallback(() => {
    if (query && !savedSearches.includes(query)) {
      setSavedSearches((prev) => [query, ...prev])
    }
  }, [query, savedSearches])

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search discoveries, patterns, community posts..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setShowSuggestions(true)
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(query)
                }
              }}
              className="pl-10 pr-4"
            />

            {/* Search Suggestions */}
            {showSuggestions && (query || searchHistory.length > 0) && (
              <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-80 overflow-y-auto">
                <CardContent className="p-2">
                  {query && suggestions.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground px-2 py-1">Suggestions</p>
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setQuery(suggestion)
                            handleSearch(suggestion)
                          }}
                          className="w-full text-left px-2 py-1 text-sm hover:bg-muted rounded flex items-center gap-2"
                        >
                          <Search className="h-3 w-3 text-muted-foreground" />
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}

                  {searchHistory.length > 0 && (
                    <div className="space-y-1 mt-2">
                      <p className="text-xs font-medium text-muted-foreground px-2 py-1">Recent Searches</p>
                      {searchHistory.slice(0, 5).map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setQuery(item)
                            handleSearch(item)
                          }}
                          className="w-full text-left px-2 py-1 text-sm hover:bg-muted rounded flex items-center gap-2"
                        >
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Content Type</h4>
                  <div className="space-y-2">
                    {["Social Posts", "Research Studies", "Discoveries", "Community"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={filters.types.includes(type)}
                          onCheckedChange={(checked) => {
                            setFilters((prev) => ({
                              ...prev,
                              types: checked ? [...prev.types, type] : prev.types.filter((t) => t !== type),
                            }))
                          }}
                        />
                        <label htmlFor={type} className="text-sm">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button onClick={() => handleSearch(query)}>Search</Button>

          {query && (
            <Button variant="outline" size="icon" onClick={handleSaveSearch}>
              <Bookmark className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {(filters.types.length > 0 || filters.sources.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {filters.types.map((type) => (
            <Badge key={type} variant="secondary" className="flex items-center gap-1">
              {type}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    types: prev.types.filter((t) => t !== type),
                  }))
                }
              />
            </Badge>
          ))}
        </div>
      )}

      {/* Saved Searches */}
      {savedSearches.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Saved Searches</p>
          <div className="flex flex-wrap gap-2">
            {savedSearches.map((search, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-muted"
                onClick={() => {
                  setQuery(search)
                  handleSearch(search)
                }}
              >
                <Bookmark className="h-3 w-3 mr-1" />
                {search}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
