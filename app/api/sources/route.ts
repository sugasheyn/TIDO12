import { type NextRequest, NextResponse } from "next/server"
import type { DataSource } from "@/lib/types"
import { dataGenerator } from "@/lib/data-generator"

// Generate dynamic sources based on real T1D research platforms
const generateSources = (): DataSource[] => {
  return dataGenerator.generateSources(50)
}




export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const status = searchParams.get("status")
  const platform = searchParams.get("platform")

  // Generate fresh sources data
  const realT1DSources = generateSources()
  let filteredSources = realT1DSources

  if (type) {
    filteredSources = filteredSources.filter((source) => source.type === type)
  }
  if (status) {
    filteredSources = filteredSources.filter((source) => source.status === status)
  }
  if (platform) {
    filteredSources = filteredSources.filter((source) => source.platform === platform)
  }

  return NextResponse.json({
    success: true,
    data: filteredSources,
    total: filteredSources.length,
    summary: {
      active: filteredSources.filter((s) => s.status === "active").length,
      inactive: filteredSources.filter((s) => s.status === "inactive").length,
      error: filteredSources.filter((s) => s.status === "error").length,
      avgHealthScore: filteredSources.length > 0 ? Math.round(filteredSources.reduce((acc, s) => acc + s.healthScore, 0) / filteredSources.length) : 0,
      totalFollowers: filteredSources.reduce((acc, s) => acc + (s.metadata.followers || 0), 0),
      languagesCovered: [...new Set(filteredSources.map((s) => s.metadata.language))].length,
    },
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const newSource: DataSource = {
    id: Date.now().toString(),
    name: body.name,
    type: body.type,
    platform: body.platform,
    url: body.url,
    status: "inactive",
    lastChecked: new Date(),
    lastUpdate: new Date(),
    healthScore: 0,
    pollInterval: body.pollInterval || 60,
    priority: body.priority || "medium",
    metadata: body.metadata || {},
    rateLimits: {
      requestsPerHour: body.rateLimits?.requestsPerHour || 60,
      requestsRemaining: body.rateLimits?.requestsPerHour || 60,
      resetTime: new Date(Date.now() + 60 * 60 * 1000),
    },
    errorCount: 0,
    successCount: 0,
  }

  if (!body.name || !body.url || !body.type) {
    return NextResponse.json({ error: "Missing required fields: name, url, type" }, { status: 400 })
  }

  // Generate fresh sources and add new one
  const currentSources = generateSources()
  currentSources.push(newSource)

  return NextResponse.json({
    source: newSource,
    message: "T1D data source added successfully",
    totalSources: currentSources.length,
  })
}
