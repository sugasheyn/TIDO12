import { useState, useEffect, useCallback } from 'react'
import { GlucoseDataPoint, InsulinDataPoint, DataPattern, PublicDataSummary } from '@/lib/public-data-retriever'

interface UsePublicDataOptions {
  autoUpdate?: boolean
  updateInterval?: number // in milliseconds
  enableGlucose?: boolean
  enableInsulin?: boolean
  enablePatterns?: boolean
  enableSummary?: boolean
}

interface UsePublicDataReturn {
  // Data
  glucoseData: GlucoseDataPoint[]
  insulinData: InsulinDataPoint[]
  patterns: DataPattern[]
  summary: PublicDataSummary | null
  
  // Loading states
  isLoading: boolean
  isLoadingGlucose: boolean
  isLoadingInsulin: boolean
  isLoadingPatterns: boolean
  isLoadingSummary: boolean
  
  // Error states
  error: string | null
  glucoseError: string | null
  insulinError: string | null
  patternsError: string | null
  summaryError: string | null
  
  // Status
  lastUpdated: Date | null
  nextUpdate: Date | null
  isAutoUpdating: boolean
  
  // Actions
  refreshGlucose: () => Promise<void>
  refreshInsulin: () => Promise<void>
  refreshPatterns: () => Promise<void>
  refreshSummary: () => Promise<void>
  refreshAll: () => Promise<void>
  toggleAutoUpdate: () => void
  setUpdateInterval: (interval: number) => void
}

export function usePublicData(options: UsePublicDataOptions = {}): UsePublicDataReturn {
  const {
    autoUpdate = true,
    updateInterval = 60 * 60 * 1000, // 1 hour default
    enableGlucose = true,
    enableInsulin = true,
    enablePatterns = true,
    enableSummary = true
  } = options

  // State
  const [glucoseData, setGlucoseData] = useState<GlucoseDataPoint[]>([])
  const [insulinData, setInsulinData] = useState<InsulinDataPoint[]>([])
  const [patterns, setPatterns] = useState<DataPattern[]>([])
  const [summary, setSummary] = useState<PublicDataSummary | null>(null)
  
  // Loading states
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingGlucose, setIsLoadingGlucose] = useState(false)
  const [isLoadingInsulin, setIsLoadingInsulin] = useState(false)
  const [isLoadingPatterns, setIsLoadingPatterns] = useState(false)
  const [isLoadingSummary, setIsLoadingSummary] = useState(false)
  
  // Error states
  const [error, setError] = useState<string | null>(null)
  const [glucoseError, setGlucoseError] = useState<string | null>(null)
  const [insulinError, setInsulinError] = useState<string | null>(null)
  const [patternsError, setPatternsError] = useState<string | null>(null)
  const [summaryError, setSummaryError] = useState<string | null>(null)
  
  // Status
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [nextUpdate, setNextUpdate] = useState<Date | null>(null)
  const [isAutoUpdating, setIsAutoUpdating] = useState(autoUpdate)
  const [currentInterval, setCurrentInterval] = useState(updateInterval)

  // Fetch glucose data
  const fetchGlucoseData = useCallback(async () => {
    if (!enableGlucose) return
    
    setIsLoadingGlucose(true)
    setGlucoseError(null)
    
    try {
      const response = await fetch('/api/public-data/glucose')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      if (result.success) {
        setGlucoseData(result.data)
        setLastUpdated(new Date(result.lastUpdated))
        setNextUpdate(new Date(result.nextUpdate))
        setError(null)
      } else {
        throw new Error(result.error || 'Failed to fetch glucose data')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setGlucoseError(errorMessage)
      setError(errorMessage)
    } finally {
      setIsLoadingGlucose(false)
    }
  }, [enableGlucose])

  // Fetch insulin data
  const fetchInsulinData = useCallback(async () => {
    if (!enableInsulin) return
    
    setIsLoadingInsulin(true)
    setInsulinError(null)
    
    try {
      const response = await fetch('/api/public-data/insulin')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      if (result.success) {
        setInsulinData(result.data)
        setLastUpdated(new Date(result.lastUpdated))
        setNextUpdate(new Date(result.nextUpdate))
        setError(null)
      } else {
        throw new Error(result.error || 'Failed to fetch insulin data')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setInsulinError(errorMessage)
      setError(errorMessage)
    } finally {
      setIsLoadingInsulin(false)
    }
  }, [enableInsulin])

  // Fetch patterns
  const fetchPatterns = useCallback(async () => {
    if (!enablePatterns) return
    
    setIsLoadingPatterns(true)
    setPatternsError(null)
    
    try {
      const response = await fetch('/api/public-data/patterns')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      if (result.success) {
        setPatterns(result.data)
        setLastUpdated(new Date(result.lastUpdated))
        setNextUpdate(new Date(result.nextUpdate))
        setError(null)
      } else {
        throw new Error(result.error || 'Failed to fetch patterns')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setPatternsError(errorMessage)
      setError(errorMessage)
    } finally {
      setIsLoadingPatterns(false)
    }
  }, [enablePatterns])

  // Fetch summary
  const fetchSummary = useCallback(async () => {
    if (!enableSummary) return
    
    setIsLoadingSummary(true)
    setSummaryError(null)
    
    try {
      const response = await fetch('/api/public-data/summary')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      if (result.success) {
        setSummary(result.data)
        setError(null)
      } else {
        throw new Error(result.error || 'Failed to fetch summary')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setSummaryError(errorMessage)
      setError(errorMessage)
    } finally {
      setIsLoadingSummary(false)
    }
  }, [enableSummary])

  // Refresh all data
  const refreshAll = useCallback(async () => {
    setIsLoading(true)
    
    try {
      await Promise.all([
        fetchGlucoseData(),
        fetchInsulinData(),
        fetchPatterns(),
        fetchSummary()
      ])
    } finally {
      setIsLoading(false)
    }
  }, [fetchGlucoseData, fetchInsulinData, fetchPatterns, fetchSummary])

  // Individual refresh functions
  const refreshGlucose = useCallback(async () => {
    await fetchGlucoseData()
  }, [fetchGlucoseData])

  const refreshInsulin = useCallback(async () => {
    await fetchInsulinData()
  }, [fetchInsulinData])

  const refreshPatterns = useCallback(async () => {
    await fetchPatterns()
  }, [fetchPatterns])

  const refreshSummary = useCallback(async () => {
    await fetchSummary()
  }, [fetchSummary])

  // Toggle auto-update
  const toggleAutoUpdate = useCallback(() => {
    setIsAutoUpdating(prev => !prev)
  }, [])

  // Set update interval
  const setUpdateInterval = useCallback((interval: number) => {
    setCurrentInterval(interval)
  }, [])

  // Auto-update effect
  useEffect(() => {
    if (!isAutoUpdating) return

    // Initial fetch
    refreshAll()

    // Set up interval
    const intervalId = setInterval(() => {
      refreshAll()
    }, currentInterval)

    return () => clearInterval(intervalId)
  }, [isAutoUpdating, currentInterval, refreshAll])

  // Update loading state
  useEffect(() => {
    setIsLoading(isLoadingGlucose || isLoadingInsulin || isLoadingPatterns || isLoadingSummary)
  }, [isLoadingGlucose, isLoadingInsulin, isLoadingPatterns, isLoadingSummary])

  return {
    // Data
    glucoseData,
    insulinData,
    patterns,
    summary,
    
    // Loading states
    isLoading,
    isLoadingGlucose,
    isLoadingInsulin,
    isLoadingPatterns,
    isLoadingSummary,
    
    // Error states
    error,
    glucoseError,
    insulinError,
    patternsError,
    summaryError,
    
    // Status
    lastUpdated,
    nextUpdate,
    isAutoUpdating,
    
    // Actions
    refreshGlucose,
    refreshInsulin,
    refreshPatterns,
    refreshSummary,
    refreshAll,
    toggleAutoUpdate,
    setUpdateInterval
  }
}
