import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Generate realistic sample glucose data
    const glucoseData = generateSampleGlucoseData()
    
    // Simulate API delay for realistic behavior
    await new Promise(resolve => setTimeout(resolve, 200))
    
    return NextResponse.json({
      success: true,
      data: glucoseData,
      summary: {
        totalDataPoints: glucoseData.length,
        sources: [...new Set(glucoseData.map(d => d.source))],
        timeRange: {
          start: glucoseData.length > 0 ? Math.min(...glucoseData.map(d => d.timestamp.getTime())) : null,
          end: glucoseData.length > 0 ? Math.max(...glucoseData.map(d => d.timestamp.getTime())) : null
        },
        averageGlucose: glucoseData.length > 0 
          ? Math.round(glucoseData.reduce((sum, d) => sum + d.value, 0) / glucoseData.length)
          : 0,
        dataQuality: glucoseData.length > 0 
          ? glucoseData.filter(d => d.metadata.confidence > 0.7).length / glucoseData.length
          : 0
      },
      lastUpdated: new Date(),
      nextUpdate: new Date(Date.now() + 60 * 60 * 1000) // Next hour
    })
    
  } catch (error) {
    console.error('Error retrieving glucose data:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to retrieve glucose data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Generate realistic sample glucose data
function generateSampleGlucoseData() {
  const data = []
  const devices = ['Dexcom G6', 'FreeStyle Libre 3', 'Medtronic Guardian 4', 'Tandem t:slim X2']
  const mealContexts = ['fasting', 'pre-meal', 'post-meal', 'bedtime']
  const exerciseContexts = ['before', 'during', 'after', 'none']
  const stressLevels = ['low', 'medium', 'high']
  const sleepQualities = ['poor', 'fair', 'good', 'excellent']
  
  // Generate 24 hours of data (96 data points, every 15 minutes)
  for (let i = 0; i < 96; i++) {
    const timestamp = new Date(Date.now() - (96 - i) * 15 * 60 * 1000) // Every 15 minutes
    const hour = timestamp.getHours()
    
    // Simulate realistic glucose patterns
    let baseGlucose = 120 // Base glucose level
    if (hour >= 6 && hour <= 8) baseGlucose = 140 // Morning rise
    if (hour >= 12 && hour <= 14) baseGlucose = 160 // Lunch spike
    if (hour >= 18 && hour <= 20) baseGlucose = 150 // Dinner spike
    if (hour >= 22 || hour <= 4) baseGlucose = 100 // Night time lower
    
    // Add realistic variability
    const variability = (Math.random() - 0.5) * 60
    const glucose = Math.max(70, Math.min(300, Math.round(baseGlucose + variability)))
    
    data.push({
      timestamp,
      value: glucose,
      unit: 'mg/dL',
      source: devices[Math.floor(Math.random() * devices.length)],
      device: devices[Math.floor(Math.random() * devices.length)],
      location: 'Home',
      mealContext: mealContexts[Math.floor(Math.random() * mealContexts.length)],
      exerciseContext: exerciseContexts[Math.floor(Math.random() * exerciseContexts.length)],
      stressLevel: stressLevels[Math.floor(Math.random() * stressLevels.length)],
      sleepQuality: sleepQualities[Math.floor(Math.random() * sleepQualities.length)],
      weather: {
        temperature: Math.round(20 + (Math.random() - 0.5) * 20),
        humidity: Math.round(40 + Math.random() * 40),
        pressure: Math.round(1000 + (Math.random() - 0.5) * 50)
      },
      metadata: {
        confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
        calibration: Math.random() > 0.8, // 20% chance of recent calibration
        battery: Math.random() * 0.4 + 0.6, // 60-100% battery
        signal: Math.random() * 0.3 + 0.7 // 70-100% signal strength
      }
    })
  }
  
  return data
}
