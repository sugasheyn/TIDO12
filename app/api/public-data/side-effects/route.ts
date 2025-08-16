import { NextResponse } from "next/server"
import { publicDataRetriever } from "@/lib/public-data-retriever"

export async function GET() {
  try {
    const sideEffects = await publicDataRetriever.retrieveSideEffects()
    await new Promise(resolve => setTimeout(resolve, 300)) // Simulate API delay

    return NextResponse.json({
      success: true,
      data: sideEffects,
      summary: {
        totalReports: sideEffects.length,
        highSeverity: sideEffects.filter(s => s.severity === 'severe' || s.severity === 'life-threatening').length,
        verifiedReports: sideEffects.filter(s => sideEffects.length > 0).length,
        topSideEffects: sideEffects
          .reduce((acc, report) => {
            acc[report.sideEffect] = (acc[report.sideEffect] || 0) + 1
            return acc
          }, {} as Record<string, number>),
        insulinBrands: [...new Set(sideEffects.map(s => s.insulinBrand))],
        affectedBodyParts: [...new Set(sideEffects.flatMap(s => s.affectedBodyParts))],
        riskFactors: [...new Set(sideEffects.flatMap(s => s.riskFactors))],
      },
      insights: {
        mostCommonSideEffects: sideEffects
          .reduce((acc, report) => {
            acc[report.sideEffect] = (acc[report.sideEffect] || 0) + 1
            return acc
          }, {} as Record<string, number>),
        severityDistribution: sideEffects.reduce((acc, report) => {
          acc[report.severity] = (acc[report.severity] || 0) + 1
          return acc
        }, {} as Record<string, number>),
        bodyPartAffected: sideEffects.reduce((acc, report) => {
          report.affectedBodyParts.forEach(part => {
            acc[part] = (acc[part] || 0) + 1
          })
          return acc
        }, {} as Record<string, number>),
      },
      lastUpdated: publicDataRetriever.getLastRetrieved(),
      nextUpdate: new Date(Date.now() + 60 * 60 * 1000)
    })
  } catch (error) {
    console.error("Failed to fetch side effects data:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Failed to fetch side effects data",
      data: [],
      summary: {
        totalReports: 0,
        highSeverity: 0,
        verifiedReports: 0,
        topSideEffects: {},
        insulinBrands: [],
        affectedBodyParts: [],
        riskFactors: [],
      },
      insights: {
        mostCommonSideEffects: {},
        severityDistribution: {},
        bodyPartAffected: {},
      }
    }, { status: 500 })
  }
}
