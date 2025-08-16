import { type NextRequest, NextResponse } from "next/server"
import type { CollectionJob } from "@/lib/types"

export async function POST(request: NextRequest) {
  const { sourceIds, priority } = await request.json()

  // Mock collection job creation
  const jobs: CollectionJob[] = sourceIds.map((sourceId: string) => ({
    id: `job_${Date.now()}_${sourceId}`,
    sourceId,
    status: "pending",
    itemsCollected: 0,
  }))

  // Simulate job processing
  setTimeout(() => {
    jobs.forEach((job) => {
      job.status = "running"
      job.startedAt = new Date()

      // Simulate completion after random time
      setTimeout(
        () => {
          job.status = Math.random() > 0.1 ? "completed" : "failed"
          job.completedAt = new Date()
          job.itemsCollected = Math.floor(Math.random() * 100)
          if (job.status === "failed") {
            job.errorMessage = "Rate limit exceeded"
          }
        },
        Math.random() * 5000 + 1000,
      )
    })
  }, 100)

  return NextResponse.json({
    message: "Collection jobs created",
    jobs,
  })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")

  // Mock active jobs
  const mockJobs: CollectionJob[] = [
    {
      id: "job_1",
      sourceId: "1",
      status: "running",
      startedAt: new Date(Date.now() - 2 * 60 * 1000),
      itemsCollected: 23,
    },
    {
      id: "job_2",
      sourceId: "2",
      status: "completed",
      startedAt: new Date(Date.now() - 10 * 60 * 1000),
      completedAt: new Date(Date.now() - 5 * 60 * 1000),
      itemsCollected: 67,
    },
    {
      id: "job_3",
      sourceId: "3",
      status: "failed",
      startedAt: new Date(Date.now() - 15 * 60 * 1000),
      completedAt: new Date(Date.now() - 12 * 60 * 1000),
      itemsCollected: 0,
      errorMessage: "Connection timeout",
    },
  ]

  let filteredJobs = mockJobs
  if (status) {
    filteredJobs = mockJobs.filter((job) => job.status === status)
  }

  return NextResponse.json({
    jobs: filteredJobs,
    summary: {
      pending: mockJobs.filter((j) => j.status === "pending").length,
      running: mockJobs.filter((j) => j.status === "running").length,
      completed: mockJobs.filter((j) => j.status === "completed").length,
      failed: mockJobs.filter((j) => j.status === "failed").length,
    },
  })
}
