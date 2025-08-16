import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const sourceId = params.id

  // Mock source details
  const sourceDetails = {
    id: sourceId,
    name: "r/Type1Diabetes",
    type: "social_media",
    platform: "Reddit",
    url: "https://reddit.com/r/Type1Diabetes",
    status: "active",
    healthScore: 95,
    recentActivity: [
      { timestamp: new Date(Date.now() - 5 * 60 * 1000), status: "success", itemsCollected: 23 },
      { timestamp: new Date(Date.now() - 20 * 60 * 1000), status: "success", itemsCollected: 18 },
      { timestamp: new Date(Date.now() - 35 * 60 * 1000), status: "success", itemsCollected: 31 },
    ],
    metrics: {
      totalItemsCollected: 1247,
      avgItemsPerHour: 15.2,
      uptime: 99.2,
      avgResponseTime: 245,
    },
  }

  return NextResponse.json(sourceDetails)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const sourceId = params.id
  const updates = await request.json()

  // In a real implementation, this would update the database
  return NextResponse.json({
    message: "Source updated successfully",
    sourceId,
    updates,
  })
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const sourceId = params.id

  // In a real implementation, this would delete from database
  return NextResponse.json({
    message: "Source deleted successfully",
    sourceId,
  })
}
