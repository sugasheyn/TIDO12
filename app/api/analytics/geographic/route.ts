import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))

    const geographicData = {
      regions: [
        {
          name: "North America",
          sources: 18456,
          content: 1245678,
          users: 67890,
          languages: ["en", "es", "fr"],
          topTopics: ["CGM Technology", "Insulin Pumps", "Mental Health"],
          growth: "+23%",
        },
        {
          name: "Europe",
          sources: 15678,
          content: 987654,
          users: 54321,
          languages: ["en", "de", "fr", "es", "it"],
          topTopics: ["DIY Solutions", "Clinical Research", "Lifestyle Management"],
          growth: "+18%",
        },
        {
          name: "Asia Pacific",
          sources: 12345,
          content: 765432,
          users: 43210,
          languages: ["en", "zh", "ja", "ko", "hi"],
          topTopics: ["Traditional Medicine", "Technology Adoption", "Community Support"],
          growth: "+34%",
        },
        {
          name: "Latin America",
          sources: 8765,
          content: 543210,
          users: 32109,
          languages: ["es", "pt", "en"],
          topTopics: ["Access to Care", "Community Building", "Education"],
          growth: "+28%",
        },
        {
          name: "Africa",
          sources: 5432,
          content: 234567,
          users: 12345,
          languages: ["en", "ar", "fr", "sw"],
          topTopics: ["Healthcare Access", "Community Support", "Education"],
          growth: "+45%",
        },
      ],
      countries: [
        {
          name: "United States",
          sources: 12345,
          content: 876543,
          users: 45678,
          topDevices: ["Dexcom G7", "Omnipod 5", "Tandem t:slim X2"],
          sentiment: "positive",
          growth: "+21%",
        },
        {
          name: "United Kingdom",
          sources: 5678,
          content: 345678,
          users: 23456,
          topDevices: ["FreeStyle Libre", "Medtronic", "DIY Loop"],
          sentiment: "positive",
          growth: "+19%",
        },
        {
          name: "Germany",
          sources: 4567,
          content: 234567,
          users: 12345,
          topDevices: ["Medtronic", "Roche", "DIY Solutions"],
          sentiment: "positive",
          growth: "+16%",
        },
        {
          name: "Canada",
          sources: 3456,
          content: 123456,
          users: 8765,
          topDevices: ["Dexcom", "Omnipod", "Tandem"],
          sentiment: "positive",
          growth: "+24%",
        },
        {
          name: "Australia",
          sources: 2345,
          content: 98765,
          users: 5432,
          topDevices: ["Dexcom", "Medtronic", "DIY Loop"],
          sentiment: "positive",
          growth: "+22%",
        },
      ],
      hotspots: [
        {
          location: "San Francisco Bay Area",
          intensity: "high",
          topics: ["DIY Loop", "CGM Technology", "AI Solutions"],
          sources: 234,
          growth: "+67%",
        },
        {
          location: "London",
          intensity: "high",
          topics: ["Clinical Research", "Community Support", "Technology"],
          sources: 189,
          growth: "+45%",
        },
        {
          location: "Tokyo",
          intensity: "medium",
          topics: ["Technology", "Traditional Medicine", "Community"],
          sources: 156,
          growth: "+38%",
        },
        {
          location: "São Paulo",
          intensity: "medium",
          topics: ["Community Building", "Education", "Access to Care"],
          sources: 123,
          growth: "+52%",
        },
        {
          location: "Cape Town",
          intensity: "medium",
          topics: ["Healthcare Access", "Community Support", "Education"],
          sources: 98,
          growth: "+78%",
        },
      ],
      languageDistribution: [
        { language: "English", percentage: 45.2, sources: 22711, growth: "+18%" },
        { language: "Spanish", percentage: 18.7, sources: 9396, growth: "+25%" },
        { language: "Chinese", percentage: 12.3, sources: 6180, growth: "+34%" },
        { language: "German", percentage: 8.9, sources: 4472, growth: "+16%" },
        { language: "French", percentage: 6.7, sources: 3367, growth: "+22%" },
        { language: "Portuguese", percentage: 4.2, sources: 2110, growth: "+28%" },
        { language: "Other", percentage: 4.0, sources: 2011, growth: "+31%" },
      ],
      timezoneActivity: [
        { timezone: "UTC-8 (PST)", activity: "high", peakHours: "18:00-22:00", sources: 5678 },
        { timezone: "UTC-5 (EST)", activity: "very high", peakHours: "19:00-23:00", sources: 8901 },
        { timezone: "UTC+0 (GMT)", activity: "high", peakHours: "20:00-00:00", sources: 4567 },
        { timezone: "UTC+1 (CET)", activity: "medium", peakHours: "21:00-01:00", sources: 3456 },
        { timezone: "UTC+8 (CST)", activity: "medium", peakHours: "22:00-02:00", sources: 2345 },
        { timezone: "UTC+9 (JST)", activity: "low", peakHours: "23:00-03:00", sources: 1234 },
      ],
      lastUpdated: new Date(),
    }

    return NextResponse.json(geographicData)
  } catch (error) {
    console.error('Error in geographic analytics API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch geographic analytics' },
      { status: 500 }
    )
  }
}
