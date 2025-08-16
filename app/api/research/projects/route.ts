import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))

    const researchProjects = {
      projects: [
        {
          id: "project_001",
          title: "CGM Accuracy in Extreme Weather Conditions",
          description: "Investigating the impact of temperature and humidity on CGM sensor accuracy across different devices and body locations",
          status: "active",
          startDate: new Date("2024-01-15"),
          estimatedCompletion: new Date("2024-06-30"),
          participants: 234,
          maxParticipants: 500,
          category: "device_research",
          tags: ["CGM", "weather", "accuracy", "sensor_performance"],
          leadResearcher: "Dr. Sarah Chen",
          institution: "Stanford University",
          funding: "$150,000",
          progress: 65,
          updates: [
            {
              date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              message: "Data collection phase completed. Starting analysis phase.",
              type: "milestone",
            },
            {
              date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
              message: "Recruited 200 participants. On track for timeline.",
              type: "update",
            },
          ],
        },
        {
          id: "project_002",
          title: "Mental Health Impact of Diabetes Technology",
          description: "Longitudinal study examining how CGM and pump technology affects anxiety, depression, and quality of life in T1D patients",
          status: "active",
          startDate: new Date("2023-09-01"),
          estimatedCompletion: new Date("2025-03-01"),
          participants: 456,
          maxParticipants: 600,
          category: "mental_health",
          tags: ["mental_health", "technology", "quality_of_life", "longitudinal"],
          leadResearcher: "Dr. Michael Rodriguez",
          institution: "UCLA Medical Center",
          funding: "$300,000",
          progress: 45,
          updates: [
            {
              date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
              message: "6-month follow-up assessments completed. Data analysis in progress.",
              type: "milestone",
            },
            {
              date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
              message: "Published preliminary findings in Diabetes Care journal.",
              type: "publication",
            },
          ],
        },
        {
          id: "project_003",
          title: "DIY Loop System Safety and Efficacy",
          description: "Community-driven research project evaluating the safety and effectiveness of open-source artificial pancreas systems",
          status: "active",
          startDate: new Date("2023-12-01"),
          estimatedCompletion: new Date("2024-12-01"),
          participants: 789,
          maxParticipants: 1000,
          category: "community_research",
          tags: ["DIY_loop", "artificial_pancreas", "open_source", "safety"],
          leadResearcher: "Community Team",
          institution: "OpenAPS Foundation",
          funding: "Community Funded",
          progress: 78,
          updates: [
            {
              date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
              message: "Safety analysis completed. Results show comparable safety to commercial systems.",
              type: "milestone",
            },
            {
              date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
              message: "Presented findings at ADA Scientific Sessions.",
              type: "presentation",
            },
          ],
        },
        {
          id: "project_004",
          title: "Exercise-Induced Glucose Variability",
          description: "Study examining glucose patterns during different types of exercise and developing personalized management strategies",
          status: "recruiting",
          startDate: new Date("2024-03-01"),
          estimatedCompletion: new Date("2025-02-28"),
          participants: 89,
          maxParticipants: 200,
          category: "lifestyle_research",
          tags: ["exercise", "glucose_variability", "personalization", "management"],
          leadResearcher: "Dr. Emily Thompson",
          institution: "University of Colorado",
          funding: "$120,000",
          progress: 25,
          updates: [
            {
              date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
              message: "Protocol approved by IRB. Starting participant recruitment.",
              type: "milestone",
            },
            {
              date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
              message: "Study protocol finalized and submitted for approval.",
              type: "update",
            },
          ],
        },
        {
          id: "project_005",
          title: "International T1D Care Access Study",
          description: "Multi-country study examining barriers to diabetes technology access and developing solutions for underserved populations",
          status: "active",
          startDate: new Date("2023-06-01"),
          estimatedCompletion: new Date("2026-05-31"),
          participants: 1234,
          maxParticipants: 2000,
          category: "healthcare_access",
          tags: ["access", "international", "healthcare_disparities", "technology"],
          leadResearcher: "Dr. James Wilson",
          institution: "World Health Organization",
          funding: "$500,000",
          progress: 35,
          updates: [
            {
              date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
              message: "Data collection completed in 5 countries. Expanding to 3 more countries.",
              type: "milestone",
            },
            {
              date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
              message: "Published interim report on healthcare access barriers.",
              type: "publication",
            },
          ],
        },
      ],
      summary: {
        totalProjects: 5,
        activeProjects: 4,
        recruitingProjects: 1,
        totalParticipants: 2802,
        totalFunding: "$1,070,000",
        categories: {
          device_research: 1,
          mental_health: 1,
          community_research: 1,
          lifestyle_research: 1,
          healthcare_access: 1,
        },
        lastUpdated: new Date(),
      },
      communityStats: {
        totalMembers: 15678,
        activeMembers: 3456,
        newMembersThisMonth: 234,
        totalDiscussions: 45678,
        totalResources: 1234,
        averageResponseTime: "2.3 hours",
      },
    }

    return NextResponse.json(researchProjects)
  } catch (error) {
    console.error('Error in research projects API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch research projects' },
      { status: 500 }
    )
  }
}
