import { DataSource, SourceContent, SourceHealth, CollectionJob } from './types'

class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api'
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  // Sources API
  async getSources(params?: {
    type?: string
    status?: string
    platform?: string
  }): Promise<{ sources: DataSource[]; total: number; summary: any }> {
    const queryParams = new URLSearchParams()
    if (params?.type) queryParams.append('type', params.type)
    if (params?.status) queryParams.append('status', params.status)
    if (params?.platform) queryParams.append('platform', params.platform)

    return this.request(`/sources?${queryParams.toString()}`)
  }

  async addSource(sourceData: Partial<DataSource>): Promise<{ source: DataSource; message: string; totalSources: number }> {
    return this.request('/sources', {
      method: 'POST',
      body: JSON.stringify(sourceData),
    })
  }

  async getSourceHealth(sourceId: string): Promise<SourceHealth[]> {
    return this.request(`/sources/${sourceId}/health`)
  }

  // AI Processing API
  async getAIProcessingStatus(): Promise<any> {
    return this.request('/ai/process')
  }

  async getPatternInsights(): Promise<any> {
    return this.request('/ai/patterns')
  }

  async getEmergingTrends(): Promise<any> {
    return this.request('/ai/patterns')
  }

  // Analytics API
  async getGeographicData(): Promise<any> {
    return this.request('/analytics/geographic')
  }

  async getMetricsData(): Promise<any> {
    return this.request('/analytics/metrics')
  }

  async getTimeseriesData(): Promise<any> {
    return this.request('/analytics/timeseries')
  }

  // Research API
  async getResearchProjects(): Promise<any> {
    return this.request('/research/projects')
  }

  async searchResearch(query: string): Promise<any> {
    return this.request(`/research/search?q=${encodeURIComponent(query)}`)
  }

  // Live Feed API
  async getLiveFeedData(): Promise<any> {
    return this.request('/sources/expanded')
  }

  // CGM Insights API
  async getCGMInsights(): Promise<any> {
    return this.request('/ai/models')
  }

  // Community Hub API
  async getCommunityData(): Promise<any> {
    return this.request('/research/projects')
  }

  // Real-time data with WebSocket fallback
  async subscribeToLiveData(callback: (data: any) => void): Promise<() => void> {
    // For now, use polling as fallback
    // In production, this would use WebSockets or Server-Sent Events
    const interval = setInterval(async () => {
      try {
        const [sources, aiStatus, analytics] = await Promise.all([
          this.getSources(),
          this.getAIProcessingStatus(),
          this.getMetricsData(),
        ])

        callback({
          sources,
          aiStatus,
          analytics,
          timestamp: new Date(),
        })
      } catch (error) {
        console.error('Live data update failed:', error)
      }
    }, 5000) // Poll every 5 seconds

    return () => clearInterval(interval)
  }
}

export const apiClient = new ApiClient()
export default apiClient
