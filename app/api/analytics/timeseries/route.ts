import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))

    const now = new Date()
    const generateTimeSeriesData = (days: number, baseValue: number, variance: number) => {
      return Array.from({ length: days }, (_, i) => {
        const date = new Date(now.getTime() - (days - 1 - i) * 24 * 60 * 60 * 1000)
        const randomVariance = (Math.random() - 0.5) * variance
        return {
          date: date.toISOString().split('T')[0],
          value: Math.max(0, Math.round(baseValue + randomVariance)),
        }
      })
    }

    const timeseriesData = {
      contentVolume: {
        daily: generateTimeSeriesData(30, 1800, 200),
        weekly: generateTimeSeriesData(12, 12600, 1400),
        monthly: generateTimeSeriesData(12, 54000, 6000),
      },
      userActivity: {
        daily: generateTimeSeriesData(30, 1200, 150),
        weekly: generateTimeSeriesData(12, 8400, 1000),
        monthly: generateTimeSeriesData(12, 36000, 4000),
      },
      sourceHealth: {
        daily: generateTimeSeriesData(30, 95, 3),
        weekly: generateTimeSeriesData(12, 95, 2),
        monthly: generateTimeSeriesData(12, 95, 1),
      },
      aiProcessing: {
        daily: generateTimeSeriesData(30, 1800, 200),
        weekly: generateTimeSeriesData(12, 12600, 1400),
        monthly: generateTimeSeriesData(12, 54000, 6000),
      },
      sentimentTrends: {
        daily: generateTimeSeriesData(30, 75, 5),
        weekly: generateTimeSeriesData(12, 75, 3),
        monthly: generateTimeSeriesData(12, 75, 2),
      },
      deviceMentions: {
        daily: [
          { device: "Dexcom G7", mentions: generateTimeSeriesData(30, 120, 20) },
          { device: "Omnipod 5", mentions: generateTimeSeriesData(30, 95, 15) },
          { device: "Tandem t:slim X2", mentions: generateTimeSeriesData(30, 78, 12) },
          { device: "FreeStyle Libre 3", mentions: generateTimeSeriesData(30, 65, 10) },
          { device: "Medtronic 780G", mentions: generateTimeSeriesData(30, 45, 8) },
        ],
        weekly: [
          { device: "Dexcom G7", mentions: generateTimeSeriesData(12, 840, 140) },
          { device: "Omnipod 5", mentions: generateTimeSeriesData(12, 665, 105) },
          { device: "Tandem t:slim X2", mentions: generateTimeSeriesData(12, 546, 84) },
          { device: "FreeStyle Libre 3", mentions: generateTimeSeriesData(12, 455, 70) },
          { device: "Medtronic 780G", mentions: generateTimeSeriesData(12, 315, 56) },
        ],
      },
      topicTrends: {
        daily: [
          { topic: "CGM Technology", mentions: generateTimeSeriesData(30, 150, 25) },
          { topic: "Insulin Pumps", mentions: generateTimeSeriesData(30, 120, 20) },
          { topic: "Mental Health", mentions: generateTimeSeriesData(30, 90, 15) },
          { topic: "Exercise & Lifestyle", mentions: generateTimeSeriesData(30, 75, 12) },
          { topic: "DIY Solutions", mentions: generateTimeSeriesData(30, 60, 10) },
        ],
        weekly: [
          { topic: "CGM Technology", mentions: generateTimeSeriesData(12, 1050, 175) },
          { topic: "Insulin Pumps", mentions: generateTimeSeriesData(12, 840, 140) },
          { topic: "Mental Health", mentions: generateTimeSeriesData(12, 630, 105) },
          { topic: "Exercise & Lifestyle", mentions: generateTimeSeriesData(12, 525, 84) },
          { topic: "DIY Solutions", mentions: generateTimeSeriesData(12, 420, 70) },
        ],
      },
      geographicActivity: {
        daily: [
          { region: "North America", activity: generateTimeSeriesData(30, 800, 100) },
          { region: "Europe", activity: generateTimeSeriesData(30, 600, 80) },
          { region: "Asia Pacific", activity: generateTimeSeriesData(30, 400, 60) },
          { region: "Latin America", activity: generateTimeSeriesData(30, 300, 40) },
          { region: "Africa", activity: generateTimeSeriesData(30, 200, 30) },
        ],
        weekly: [
          { region: "North America", activity: generateTimeSeriesData(12, 5600, 700) },
          { region: "Europe", activity: generateTimeSeriesData(12, 4200, 560) },
          { region: "Asia Pacific", activity: generateTimeSeriesData(12, 2800, 420) },
          { region: "Latin America", activity: generateTimeSeriesData(12, 2100, 280) },
          { region: "Africa", activity: generateTimeSeriesData(12, 1400, 210) },
        ],
      },
      languageUsage: {
        daily: [
          { language: "English", usage: generateTimeSeriesData(30, 900, 100) },
          { language: "Spanish", usage: generateTimeSeriesData(30, 350, 40) },
          { language: "Chinese", usage: generateTimeSeriesData(30, 250, 30) },
          { language: "German", usage: generateTimeSeriesData(30, 180, 20) },
          { language: "French", usage: generateTimeSeriesData(30, 120, 15) },
        ],
        weekly: [
          { language: "English", usage: generateTimeSeriesData(12, 6300, 700) },
          { language: "Spanish", usage: generateTimeSeriesData(12, 2450, 280) },
          { language: "Chinese", usage: generateTimeSeriesData(12, 1750, 210) },
          { language: "German", usage: generateTimeSeriesData(12, 1260, 140) },
          { language: "French", usage: generateTimeSeriesData(12, 840, 105) },
        ],
      },
      lastUpdated: now,
    }

    return NextResponse.json(timeseriesData)
  } catch (error) {
    console.error('Error in timeseries analytics API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch timeseries analytics' },
      { status: 500 }
    )
  }
}
