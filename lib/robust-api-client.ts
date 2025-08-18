// Robust API Client for Replit deployment
export class RobustAPIClient {
  private baseUrl: string
  private defaultTimeout: number = 10000 // 10 seconds
  private maxRetries: number = 3
  private retryDelay: number = 1000 // 1 second

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl
  }

  // Enhanced fetch with timeout and retry logic
  private async robustFetch(
    url: string, 
    options: RequestInit = {}, 
    timeout: number = this.defaultTimeout
  ): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      return response
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Request timeout after ${timeout}ms`)
      }
      throw error
    }
  }

  // Retry logic with exponential backoff
  private async retryWithBackoff<T>(
    operation: () => Promise<T>,
    maxRetries: number = this.maxRetries
  ): Promise<T> {
    let lastError: Error

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation()
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))
        
        if (attempt === maxRetries) {
          throw lastError
        }

        // Exponential backoff
        const delay = this.retryDelay * Math.pow(2, attempt - 1)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }

    throw lastError!
  }

  // GET request with retry logic
  async get<T = any>(
    endpoint: string, 
    options: { 
      timeout?: number; 
      retries?: number; 
      params?: Record<string, string> 
    } = {}
  ): Promise<T> {
    const { timeout, retries, params } = options
    
    return this.retryWithBackoff(async () => {
      let url = `${this.baseUrl}${endpoint}`
      
      if (params) {
        const searchParams = new URLSearchParams(params)
        url += `?${searchParams.toString()}`
      }

      const response = await this.robustFetch(url, { method: 'GET' }, timeout)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return response.json()
    }, retries)
  }

  // POST request with retry logic
  async post<T = any>(
    endpoint: string, 
    data: any, 
    options: { 
      timeout?: number; 
      retries?: number 
    } = {}
  ): Promise<T> {
    const { timeout, retries } = options
    
    return this.retryWithBackoff(async () => {
      const response = await this.robustFetch(
        `${this.baseUrl}${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
        timeout
      )
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return response.json()
    }, retries)
  }

  // Health check endpoint
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await this.robustFetch(`${this.baseUrl}/health`, { 
        method: 'GET' 
      }, 5000)
      
      if (response.ok) {
        return response.json()
      }
      
      throw new Error(`Health check failed: ${response.status}`)
    } catch (error) {
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString()
      }
    }
  }

  // Batch requests with concurrency control
  async batchGet<T = any>(
    endpoints: string[], 
    options: { 
      concurrency?: number; 
      timeout?: number 
    } = {}
  ): Promise<T[]> {
    const { concurrency = 3, timeout } = options
    const results: T[] = []
    const errors: Error[] = []

    // Process in batches
    for (let i = 0; i < endpoints.length; i += concurrency) {
      const batch = endpoints.slice(i, i + concurrency)
      
      const batchPromises = batch.map(async (endpoint, index) => {
        try {
          const result = await this.get<T>(endpoint, { timeout })
          return { index: i + index, result }
        } catch (error) {
          const err = error instanceof Error ? error : new Error(String(error))
          return { index: i + index, error: err }
        }
      })

      const batchResults = await Promise.allSettled(batchPromises)
      
      batchResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          const { index: resultIndex, result: data, error } = result.value
          if (error) {
            errors[resultIndex] = error
          } else {
            results[resultIndex] = data
          }
        } else {
          errors[i + index] = result.reason
        }
      })
    }

    if (errors.length > 0) {
      console.warn(`${errors.length} requests failed:`, errors)
    }

    return results
  }
}

// Export singleton instance
export const robustAPIClient = new RobustAPIClient()

// Export for use in components
export default robustAPIClient
