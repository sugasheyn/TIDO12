import { useState, useEffect, useCallback } from 'react'
import { apiClient } from '@/lib/api-client'
import { DataSource } from '@/lib/types'

export interface LiveDataState {
  sources: DataSource[]
  aiStatus: any
  analytics: any
  loading: boolean
  error: string | null
  lastUpdated: Date | null
}

export function useLiveData() {
  const [data, setData] = useState<LiveDataState>({
    sources: [],
    aiStatus: null,
    analytics: null,
    loading: true,
    error: null,
    lastUpdated: null,
  })

  const fetchData = useCallback(async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }))
      
      const [sources, aiStatus, analytics] = await Promise.all([
        apiClient.getSources(),
        apiClient.getAIProcessingStatus().catch(() => null),
        apiClient.getMetricsData().catch(() => null),
      ])

      setData({
        sources: sources.sources || [],
        aiStatus,
        analytics,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      })
    } catch (error) {
      console.error('Failed to fetch live data:', error)
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch data',
      }))
    }
  }, [])

  const refreshData = useCallback(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    fetchData()
    
    // Set up real-time updates
    const unsubscribe = apiClient.subscribeToLiveData((newData) => {
      setData(prev => ({
        ...prev,
        ...newData,
        lastUpdated: new Date(),
      }))
    })

    return unsubscribe
  }, [fetchData])

  return {
    ...data,
    refreshData,
  }
}

export function useSources(params?: { type?: string; status?: string; platform?: string }) {
  const [sources, setSources] = useState<DataSource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSources = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiClient.getSources(params)
      setSources(result.sources)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch sources')
    } finally {
      setLoading(false)
    }
  }, [params])

  useEffect(() => {
    fetchSources()
  }, [fetchSources])

  return { sources, loading, error, refresh: fetchSources }
}

export function useAIPatterns() {
  const [patterns, setPatterns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPatterns = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiClient.getPatternInsights()
      setPatterns(result.patterns || [])
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch patterns')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPatterns()
  }, [fetchPatterns])

  return { patterns, loading, error, refresh: fetchPatterns }
}

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const [metrics, geographic, timeseries] = await Promise.all([
        apiClient.getMetricsData(),
        apiClient.getGeographicData(),
        apiClient.getTimeseriesData(),
      ])
      setAnalytics({ metrics, geographic, timeseries })
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch analytics')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAnalytics()
  }, [fetchAnalytics])

  return { analytics, loading, error, refresh: fetchAnalytics }
}
