// User Data Upload System - Personal Diabetes Data Analysis
export class UserDataUploadSystem {
  
  // Supported file formats
  private readonly SUPPORTED_FORMATS = [
    'csv', 'json', 'xml', 'txt', 'xlsx', 'xls'
  ]
  
  // Maximum file size (10MB)
  private readonly MAX_FILE_SIZE = 10 * 1024 * 1024
  
  // Process uploaded user data
  async processUserData(file: File, userId: string): Promise<UserDataAnalysis> {
    try {
      // Validate file
      this.validateFile(file)
      
      // Parse file content
      const data = await this.parseFile(file)
      
      // Analyze user data
      const analysis = await this.analyzeUserData(data, userId)
      
      // Store analysis results
      await this.storeUserAnalysis(userId, analysis)
      
      return analysis
    } catch (error) {
      throw new Error(`Failed to process user data: ${error}`)
    }
  }
  
  // Validate uploaded file
  private validateFile(file: File): void {
    if (file.size > this.MAX_FILE_SIZE) {
      throw new Error('File size exceeds 10MB limit')
    }
    
    const extension = file.name.split('.').pop()?.toLowerCase()
    if (!extension || !this.SUPPORTED_FORMATS.includes(extension)) {
      throw new Error(`Unsupported file format. Supported: ${this.SUPPORTED_FORMATS.join(', ')}`)
    }
  }
  
  // Parse different file formats
  private async parseFile(file: File): Promise<UserDiabetesData> {
    const extension = file.name.split('.').pop()?.toLowerCase()
    
    switch (extension) {
      case 'csv':
        return await this.parseCSV(file)
      case 'json':
        return await this.parseJSON(file)
      case 'xml':
        return await this.parseXML(file)
      case 'xlsx':
      case 'xls':
        return await this.parseExcel(file)
      default:
        return await this.parseText(file)
    }
  }
  
  // Parse CSV files
  private async parseCSV(file: File): Promise<UserDiabetesData> {
    const text = await file.text()
    const lines = text.split('\n')
    const headers = lines[0].split(',').map(h => h.trim())
    
    const glucoseData: GlucoseReading[] = []
    const insulinData: InsulinDose[] = []
    const mealData: MealEntry[] = []
    const exerciseData: ExerciseEntry[] = []
    
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',').map(v => v.trim())
        const row: any = {}
        
        headers.forEach((header, index) => {
          row[header.toLowerCase()] = values[index]
        })
        
        // Parse glucose data
        if (row.glucose || row.blood_glucose || row.bg) {
          glucoseData.push({
            timestamp: new Date(row.timestamp || row.date || row.time || Date.now()),
            value: parseFloat(row.glucose || row.blood_glucose || row.bg),
            unit: row.unit || 'mg/dL',
            mealContext: row.meal || row.meal_context || 'unknown',
            notes: row.notes || ''
          })
        }
        
        // Parse insulin data
        if (row.insulin || row.dose) {
          insulinData.push({
            timestamp: new Date(row.timestamp || row.date || row.time || Date.now()),
            type: row.insulin_type || row.type || 'unknown',
            dose: parseFloat(row.insulin || row.dose),
            unit: row.unit || 'units',
            mealContext: row.meal || row.meal_context || 'unknown',
            notes: row.notes || ''
          })
        }
        
        // Parse meal data
        if (row.carbs || row.carbohydrates) {
          mealData.push({
            timestamp: new Date(row.timestamp || row.date || row.time || Date.now()),
            carbs: parseFloat(row.carbs || row.carbohydrates),
            protein: parseFloat(row.protein || 0),
            fat: parseFloat(row.fat || 0),
            fiber: parseFloat(row.fiber || 0),
            mealType: row.meal_type || row.meal || 'unknown',
            notes: row.notes || ''
          })
        }
        
        // Parse exercise data
        if (row.exercise || row.activity) {
          exerciseData.push({
            timestamp: new Date(row.timestamp || row.date || row.time || Date.now()),
            type: row.exercise || row.activity,
            duration: parseFloat(row.duration || 0),
            intensity: row.intensity || 'moderate',
            notes: row.notes || ''
          })
        }
      }
    }
    
    return {
      glucose: glucoseData,
      insulin: insulinData,
      meals: mealData,
      exercise: exerciseData,
      metadata: {
        uploadDate: new Date(),
        dataPoints: glucoseData.length + insulinData.length + mealData.length + exerciseData.length,
        dateRange: this.calculateDateRange([...glucoseData, ...insulinData, ...mealData, ...exerciseData])
      }
    }
  }
  
  // Parse JSON files
  private async parseJSON(file: File): Promise<UserDiabetesData> {
    const text = await file.text()
    const data = JSON.parse(text)
    
    // Handle different JSON structures
    if (data.glucose || data.insulin || data.meals || data.exercise) {
      return this.normalizeJSONData(data)
    } else if (Array.isArray(data)) {
      return this.normalizeArrayData(data)
    } else {
      throw new Error('Unsupported JSON structure')
    }
  }
  
  // Parse XML files
  private async parseXML(file: File): Promise<UserDiabetesData> {
    const text = await file.text()
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(text, 'text/xml')
    
    const glucoseData: GlucoseReading[] = []
    const insulinData: InsulinDose[] = []
    const mealData: MealEntry[] = []
    const exerciseData: ExerciseEntry[] = []
    
    // Parse glucose readings
    const glucoseNodes = xmlDoc.getElementsByTagName('glucose') || xmlDoc.getElementsByTagName('reading')
    for (let i = 0; i < glucoseNodes.length; i++) {
      const node = glucoseNodes[i]
      glucoseData.push({
        timestamp: new Date(node.getAttribute('timestamp') || node.getAttribute('date') || Date.now()),
        value: parseFloat(node.getAttribute('value') || node.textContent || '0'),
        unit: node.getAttribute('unit') || 'mg/dL',
        mealContext: node.getAttribute('meal') || 'unknown',
        notes: node.getAttribute('notes') || ''
      })
    }
    
    // Parse insulin doses
    const insulinNodes = xmlDoc.getElementsByTagName('insulin') || xmlDoc.getElementsByTagName('dose')
    for (let i = 0; i < insulinNodes.length; i++) {
      const node = insulinNodes[i]
      insulinData.push({
        timestamp: new Date(node.getAttribute('timestamp') || node.getAttribute('date') || Date.now()),
        type: node.getAttribute('type') || 'unknown',
        dose: parseFloat(node.getAttribute('dose') || node.textContent || '0'),
        unit: node.getAttribute('unit') || 'units',
        mealContext: node.getAttribute('meal') || 'unknown',
        notes: node.getAttribute('notes') || ''
      })
    }
    
    return {
      glucose: glucoseData,
      insulin: insulinData,
      meals: mealData,
      exercise: exerciseData,
      metadata: {
        uploadDate: new Date(),
        dataPoints: glucoseData.length + insulinData.length + mealData.length + exerciseData.length,
        dateRange: this.calculateDateRange([...glucoseData, ...insulinData, ...mealData, ...exerciseData])
      }
    }
  }
  
  // Parse Excel files
  private async parseExcel(file: File): Promise<UserDiabetesData> {
    // For Excel files, we'll need a library like SheetJS
    // This is a simplified implementation
    throw new Error('Excel parsing requires additional libraries. Please convert to CSV first.')
  }
  
  // Parse text files
  private async parseText(file: File): Promise<UserDiabetesData> {
    const text = await file.text()
    const lines = text.split('\n')
    
    const glucoseData: GlucoseReading[] = []
    const insulinData: InsulinDose[] = []
    const mealData: MealEntry[] = []
    const exerciseData: ExerciseEntry[] = []
    
    // Simple text parsing - look for patterns
    for (const line of lines) {
      // Look for glucose patterns
      const glucoseMatch = line.match(/(\d+(?:\.\d+)?)\s*(mg\/dL|mmol\/L|mg\/dl)/i)
      if (glucoseMatch) {
        glucoseData.push({
          timestamp: new Date(),
          value: parseFloat(glucoseMatch[1]),
          unit: glucoseMatch[2],
          mealContext: 'unknown',
          notes: line.trim()
        })
      }
      
      // Look for insulin patterns
      const insulinMatch = line.match(/(\d+(?:\.\d+)?)\s*(units|u|iu)/i)
      if (insulinMatch) {
        insulinData.push({
          timestamp: new Date(),
          type: 'unknown',
          dose: parseFloat(insulinMatch[1]),
          unit: 'units',
          mealContext: 'unknown',
          notes: line.trim()
        })
      }
    }
    
    return {
      glucose: glucoseData,
      insulin: insulinData,
      meals: mealData,
      exercise: exerciseData,
      metadata: {
        uploadDate: new Date(),
        dataPoints: glucoseData.length + insulinData.length + mealData.length + exerciseData.length,
        dateRange: this.calculateDateRange([...glucoseData, ...insulinData, ...mealData, ...exerciseData])
      }
    }
  }
  
  // Analyze user data using AI models
  private async analyzeUserData(data: UserDiabetesData, userId: string): Promise<UserDataAnalysis> {
    try {
      // Use AI pattern detection
      const { aiPatternDetection } = await import('./ai-pattern-detection')
      
      const analysis: UserDataAnalysis = {
        userId,
        timestamp: new Date(),
        dataSummary: {
          totalReadings: data.glucose.length,
          dateRange: data.metadata.dateRange,
          averageGlucose: this.calculateAverageGlucose(data.glucose),
          glucoseVariability: this.calculateGlucoseVariability(data.glucose),
          timeInRange: this.calculateTimeInRange(data.glucose),
          hypoglycemiaEpisodes: this.countHypoglycemiaEpisodes(data.glucose)
        },
        patterns: [],
        insights: [],
        recommendations: [],
        riskAssessment: {
          hypoglycemiaRisk: 'low',
          hyperglycemiaRisk: 'low',
          variabilityRisk: 'low',
          overallRisk: 'low'
        }
      }
      
      // Analyze glucose patterns if data exists
      if (data.glucose.length > 0) {
        const glucoseValues = data.glucose.map(g => g.value)
        const glucoseTimestamps = data.glucose.map(g => g.timestamp)
        
        // Use AI models for pattern detection
        const hypoglycemiaPatterns = aiPatternDetection.detectHypoglycemiaPatterns(
          data.glucose.map(g => ({ timestamp: g.timestamp, value: g.value }))
        )
        
        const comprehensiveInsights = aiPatternDetection.generateComprehensiveInsights({
          glucose: data.glucose.map(g => ({ timestamp: g.timestamp, value: g.value })),
          insulin: data.insulin.map(i => ({ timestamp: i.timestamp, value: i.dose })),
          lifestyle: {
            exercise: data.exercise.length > 0,
            stress: 5, // Default value
            sleep: 7 // Default value
          }
        })
        
        // Add patterns and insights
        analysis.patterns.push({
          type: 'hypoglycemia_analysis',
          data: hypoglycemiaPatterns,
          confidence: 0.9,
          source: 'AI Pattern Detection'
        })
        
        analysis.insights.push(...comprehensiveInsights.risks)
        analysis.recommendations.push(...comprehensiveInsights.recommendations)
        
        // Update risk assessment
        analysis.riskAssessment = this.calculateRiskAssessment(data.glucose, hypoglycemiaPatterns)
      }
      
      // Analyze insulin patterns
      if (data.insulin.length > 0) {
        const insulinAnalysis = this.analyzeInsulinPatterns(data.insulin, data.glucose)
        analysis.patterns.push(insulinAnalysis)
      }
      
      // Analyze meal patterns
      if (data.meals.length > 0) {
        const mealAnalysis = this.analyzeMealPatterns(data.meals, data.glucose)
        analysis.patterns.push(mealAnalysis)
      }
      
      // Analyze exercise patterns
      if (data.exercise.length > 0) {
        const exerciseAnalysis = this.analyzeExercisePatterns(data.exercise, data.glucose)
        analysis.patterns.push(exerciseAnalysis)
      }
      
      return analysis
    } catch (error) {
      console.error('Error analyzing user data:', error)
      throw new Error('Failed to analyze user data')
    }
  }
  
  // Calculate risk assessment
  private calculateRiskAssessment(glucoseData: GlucoseReading[], hypoglycemiaPatterns: any): RiskAssessment {
    const values = glucoseData.map(g => g.value)
    const mean = values.reduce((a, b) => a + b, 0) / values.length
    const std = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (values.length - 1))
    
    const hypoglycemiaRisk = hypoglycemiaPatterns.severity === 'severe' ? 'high' : 
                             hypoglycemiaPatterns.severity === 'moderate' ? 'medium' : 'low'
    
    const hyperglycemiaRisk = mean > 200 ? 'high' : mean > 180 ? 'medium' : 'low'
    
    const variabilityRisk = std > 50 ? 'high' : std > 30 ? 'medium' : 'low'
    
    const overallRisk = [hypoglycemiaRisk, hyperglycemiaRisk, variabilityRisk].some(r => r === 'high') ? 'high' :
                       [hypoglycemiaRisk, hyperglycemiaRisk, variabilityRisk].some(r => r === 'medium') ? 'medium' : 'low'
    
    return { hypoglycemiaRisk, hyperglycemiaRisk, variabilityRisk, overallRisk }
  }
  
  // Analyze insulin patterns
  private analyzeInsulinPatterns(insulinData: InsulinDose[], glucoseData: GlucoseReading[]): PatternAnalysis {
    const totalDose = insulinData.reduce((sum, dose) => sum + dose.dose, 0)
    const averageDose = totalDose / insulinData.length
    const doseVariability = Math.sqrt(insulinData.reduce((sum, dose) => sum + Math.pow(dose.dose - averageDose, 2), 0) / insulinData.length)
    
    return {
      type: 'insulin_analysis',
      data: {
        totalDose,
        averageDose,
        doseVariability,
        frequency: insulinData.length / this.calculateDays(insulinData),
        types: [...new Set(insulinData.map(d => d.type))]
      },
      confidence: 0.8,
      source: 'User Data Analysis'
    }
  }
  
  // Analyze meal patterns
  private analyzeMealPatterns(mealData: MealEntry[], glucoseData: GlucoseReading[]): PatternAnalysis {
    const totalCarbs = mealData.reduce((sum, meal) => sum + meal.carbs, 0)
    const averageCarbs = totalCarbs / mealData.length
    const mealTypes = [...new Set(mealData.map(m => m.mealType))]
    
    return {
      type: 'meal_analysis',
      data: {
        totalCarbs,
        averageCarbs,
        mealFrequency: mealData.length / this.calculateDays(mealData),
        mealTypes,
        averageProtein: mealData.reduce((sum, meal) => sum + meal.protein, 0) / mealData.length,
        averageFat: mealData.reduce((sum, meal) => sum + meal.fat, 0) / mealData.length
      },
      confidence: 0.7,
      source: 'User Data Analysis'
    }
  }
  
  // Analyze exercise patterns
  private analyzeExercisePatterns(exerciseData: ExerciseEntry[], glucoseData: GlucoseReading[]): PatternAnalysis {
    const totalDuration = exerciseData.reduce((sum, exercise) => sum + exercise.duration, 0)
    const averageDuration = totalDuration / exerciseData.length
    const exerciseTypes = [...new Set(exerciseData.map(e => e.type))]
    
    return {
      type: 'exercise_analysis',
      data: {
        totalDuration,
        averageDuration,
        exerciseFrequency: exerciseData.length / this.calculateDays(exerciseData),
        exerciseTypes,
        intensityDistribution: this.calculateIntensityDistribution(exerciseData)
      },
      confidence: 0.7,
      source: 'User Data Analysis'
    }
  }
  
  // Helper methods
  private calculateDateRange(data: Array<{ timestamp: Date }>): { start: Date; end: Date } {
    if (data.length === 0) {
      return { start: new Date(), end: new Date() }
    }
    
    const timestamps = data.map(d => d.timestamp.getTime())
    return {
      start: new Date(Math.min(...timestamps)),
      end: new Date(Math.max(...timestamps))
    }
  }
  
  private calculateAverageGlucose(glucoseData: GlucoseReading[]): number {
    if (glucoseData.length === 0) return 0
    return glucoseData.reduce((sum, reading) => sum + reading.value, 0) / glucoseData.length
  }
  
  private calculateGlucoseVariability(glucoseData: GlucoseReading[]): number {
    if (glucoseData.length < 2) return 0
    const values = glucoseData.map(g => g.value)
    const mean = this.calculateAverageGlucose(glucoseData)
    return Math.sqrt(values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (values.length - 1))
  }
  
  private calculateTimeInRange(glucoseData: GlucoseReading[]): number {
    if (glucoseData.length === 0) return 0
    const inRange = glucoseData.filter(g => g.value >= 70 && g.value <= 180).length
    return (inRange / glucoseData.length) * 100
  }
  
  private countHypoglycemiaEpisodes(glucoseData: GlucoseReading[]): number {
    return glucoseData.filter(g => g.value < 70).length
  }
  
  private calculateDays(data: Array<{ timestamp: Date }>): number {
    if (data.length === 0) return 1
    const range = this.calculateDateRange(data)
    return Math.max(1, (range.end.getTime() - range.start.getTime()) / (1000 * 60 * 60 * 24))
  }
  
  private calculateIntensityDistribution(exerciseData: ExerciseEntry[]): Record<string, number> {
    const distribution: Record<string, number> = {}
    exerciseData.forEach(exercise => {
      distribution[exercise.intensity] = (distribution[exercise.intensity] || 0) + 1
    })
    return distribution
  }
  
  // Store user analysis
  private async storeUserAnalysis(userId: string, analysis: UserDataAnalysis): Promise<void> {
    // In a real implementation, this would store to a database
    console.log(`Storing analysis for user ${userId}:`, analysis)
  }
  
  // Normalize JSON data
  private normalizeJSONData(data: any): UserDiabetesData {
    return {
      glucose: data.glucose || [],
      insulin: data.insulin || [],
      meals: data.meals || [],
      exercise: data.exercise || [],
      metadata: {
        uploadDate: new Date(),
        dataPoints: (data.glucose?.length || 0) + (data.insulin?.length || 0) + (data.meals?.length || 0) + (data.exercise?.length || 0),
        dateRange: this.calculateDateRange([...(data.glucose || []), ...(data.insulin || []), ...(data.meals || []), ...(data.exercise || [])])
      }
    }
  }
  
  // Normalize array data
  private normalizeArrayData(data: any[]): UserDiabetesData {
    const glucose: GlucoseReading[] = []
    const insulin: InsulinDose[] = []
    const meals: MealEntry[] = []
    const exercise: ExerciseEntry[] = []
    
    data.forEach(item => {
      if (item.glucose || item.blood_glucose || item.bg) {
        glucose.push({
          timestamp: new Date(item.timestamp || item.date || Date.now()),
          value: parseFloat(item.glucose || item.blood_glucose || item.bg),
          unit: item.unit || 'mg/dL',
          mealContext: item.meal || 'unknown',
          notes: item.notes || ''
        })
      }
      
      if (item.insulin || item.dose) {
        insulin.push({
          timestamp: new Date(item.timestamp || item.date || Date.now()),
          type: item.insulin_type || item.type || 'unknown',
          dose: parseFloat(item.insulin || item.dose),
          unit: item.unit || 'units',
          mealContext: item.meal || 'unknown',
          notes: item.notes || ''
        })
      }
    })
    
    return {
      glucose,
      insulin,
      meals,
      exercise,
      metadata: {
        uploadDate: new Date(),
        dataPoints: glucose.length + insulin.length + meals.length + exercise.length,
        dateRange: this.calculateDateRange([...glucose, ...insulin, ...meals, ...exercise])
      }
    }
  }
}

// Type definitions
export interface UserDiabetesData {
  glucose: GlucoseReading[]
  insulin: InsulinDose[]
  meals: MealEntry[]
  exercise: ExerciseEntry[]
  metadata: DataMetadata
}

export interface GlucoseReading {
  timestamp: Date
  value: number
  unit: string
  mealContext: string
  notes: string
}

export interface InsulinDose {
  timestamp: Date
  type: string
  dose: number
  unit: string
  mealContext: string
  notes: string
}

export interface MealEntry {
  timestamp: Date
  carbs: number
  protein: number
  fat: number
  fiber: number
  mealType: string
  notes: string
}

export interface ExerciseEntry {
  timestamp: Date
  type: string
  duration: number
  intensity: string
  notes: string
}

export interface DataMetadata {
  uploadDate: Date
  dataPoints: number
  dateRange: { start: Date; end: Date }
}

export interface UserDataAnalysis {
  userId: string
  timestamp: Date
  dataSummary: DataSummary
  patterns: PatternAnalysis[]
  insights: string[]
  recommendations: string[]
  riskAssessment: RiskAssessment
}

export interface DataSummary {
  totalReadings: number
  dateRange: { start: Date; end: Date }
  averageGlucose: number
  glucoseVariability: number
  timeInRange: number
  hypoglycemiaEpisodes: number
}

export interface PatternAnalysis {
  type: string
  data: any
  confidence: number
  source: string
}

export interface RiskAssessment {
  hypoglycemiaRisk: 'low' | 'medium' | 'high'
  hyperglycemiaRisk: 'low' | 'medium' | 'high'
  variabilityRisk: 'low' | 'medium' | 'high'
  overallRisk: 'low' | 'medium' | 'high'
}

export const userDataUploadSystem = new UserDataUploadSystem()
