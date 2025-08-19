/**
 * Replit Environment Utilities
 * Safely handles environment checks and Replit-specific logic
 */

export const isReplit = (): boolean => {
  try {
    return (
      typeof process !== 'undefined' &&
      (process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'replit' ||
        process.env.REPL_ID !== undefined ||
        typeof window !== 'undefined' && window.location.hostname.includes('replit'))
    )
  } catch {
    return false
  }
}

export const isProduction = (): boolean => {
  try {
    return (
      typeof process !== 'undefined' &&
      (process.env.NODE_ENV === 'production' ||
        process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'replit')
    )
  } catch {
    return false
  }
}

export const isServer = (): boolean => {
  try {
    return typeof window === 'undefined'
  } catch {
    return false
  }
}

export const isClient = (): boolean => {
  try {
    return typeof window !== 'undefined'
  } catch {
    return false
  }
}

export const getEnvironmentConfig = () => ({
  isReplit: isReplit(),
  isProduction: isProduction(),
  isServer: isServer(),
  isClient: isClient(),
  platformMode: typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_PLATFORM_MODE : 'production',
  enableRealData: typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_ENABLE_REAL_DATA === 'true' : true,
  enableRSSFeeds: typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_ENABLE_RSS_FEEDS === 'true' : true,
  enableAIInsights: typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_ENABLE_AI_INSIGHTS === 'true' : true,
})

export const shouldUseRealData = (): boolean => {
  const config = getEnvironmentConfig()
  return config.isProduction || config.isReplit || config.enableRealData
}

export const shouldUseRSSFeeds = (): boolean => {
  const config = getEnvironmentConfig()
  return config.enableRSSFeeds && (config.isProduction || config.isReplit)
}

export const shouldUseAIInsights = (): boolean => {
  const config = getEnvironmentConfig()
  return config.enableAIInsights && (config.isProduction || config.isReplit)
}
