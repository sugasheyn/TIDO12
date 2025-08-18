import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const startTime = Date.now()
    
    // Basic health checks
    const healthChecks = {
      timestamp: new Date().toISOString(),
      status: 'healthy',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV || 'development',
      platform: process.platform,
      nodeVersion: process.version,
      checks: {
        database: 'ok', // Placeholder for future DB checks
        externalAPIs: 'ok', // Placeholder for external API checks
        fileSystem: 'ok', // Placeholder for file system checks
      }
    }

    const responseTime = Date.now() - startTime
    
    return NextResponse.json({
      ...healthChecks,
      responseTime: `${responseTime}ms`,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
      },
      { status: 500 }
    )
  }
}
