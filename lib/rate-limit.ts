interface RateLimitEntry {
  count: number
  resetTime: number
}

class RateLimiter {
  private limits = new Map<string, RateLimitEntry>()
  private windowMs = 60 * 1000 // 1 minute window
  private maxRequests = 100 // Max requests per window

  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const entry = this.limits.get(identifier)
    
    if (!entry || now > entry.resetTime) {
      // Create new window
      this.limits.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs
      })
      return true
    }
    
    if (entry.count >= this.maxRequests) {
      return false
    }
    
    entry.count++
    return true
  }

  getRemaining(identifier: string): number {
    const entry = this.limits.get(identifier)
    if (!entry) return this.maxRequests
    
    const now = Date.now()
    if (now > entry.resetTime) return this.maxRequests
    
    return Math.max(0, this.maxRequests - entry.count)
  }

  getResetTime(identifier: string): number {
    const entry = this.limits.get(identifier)
    return entry ? entry.resetTime : Date.now() + this.windowMs
  }

  reset(identifier: string): void {
    this.limits.delete(identifier)
  }

  clear(): void {
    this.limits.clear()
  }
}

export const rateLimiter = new RateLimiter()

// Rate limiting middleware function
export function withRateLimit(identifier: string): boolean {
  return rateLimiter.isAllowed(identifier)
}
