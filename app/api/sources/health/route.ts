import { type NextRequest, NextResponse } from "next/server"
import type { SourceHealth } from "@/lib/types"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sourceId = searchParams.get("sourceId")
  const hours = Number.parseInt(searchParams.get("hours") || "24")

  // Mock health data
  const healthData: SourceHealth[] = Array.from({ length: hours }, (_, i) => ({
    sourceId: sourceId || "1",
    timestamp: new Date(Date.now() - i * 60 * 60 * 1000),
    responseTime: Math.random() * 500 + 100,
    statusCode: Math.random() > 0.95 ? 500 : 200,
    contentCount: Math.floor(Math.random() * 50),
    uptime: Math.random() * 100,
  }))

  const summary = {
    avgResponseTime: Math.round(healthData.reduce((acc, h) => acc + h.responseTime, 0) / healthData.length),
    uptime: Math.round((healthData.filter((h) => h.statusCode === 200).length / healthData.length) * 100),
    totalContent: healthData.reduce((acc, h) => acc + h.contentCount, 0),
    errorRate: Math.round((healthData.filter((h) => h.statusCode !== 200).length / healthData.length) * 100),
  }

  return NextResponse.json({
    health: healthData,
    summary,
  })
}
