// Adaptive Learning AI System - Continuously Improving Diabetes Analysis
export class AdaptiveLearningAI {
  
  // Learning parameters
  private learningRate: number = 0.01;
  private adaptationThreshold: number = 0.1;
  private maxMemorySize: number = 10000;
  
  // Memory systems for different data types
  private glucoseMemory: GlucoseMemoryEntry[] = [];
  private insulinMemory: InsulinMemoryEntry[] = [];
  private environmentalMemory: EnvironmentalMemoryEntry[] = [];
  private lifestyleMemory: LifestyleMemoryEntry[] = [];
  
  // Performance tracking
  private performanceHistory: PerformanceMetric[] = [];
  private modelAccuracy: { [key: string]: number } = {};
  
  // Adaptive weights for ensemble methods
  private adaptiveWeights: { [key: string]: number } = {
    neural: 0.4,
    statistical: 0.3,
    temporal: 0.2,
    environmental: 0.1
  };

  constructor() {
    this.initializeMemory();
  }

  // Initialize memory systems
  private initializeMemory(): void {
    this.glucoseMemory = [];
    this.insulinMemory = [];
    this.environmentalMemory = [];
    this.lifestyleMemory = [];
    this.performanceHistory = [];
    this.modelAccuracy = {
      glucose_prediction: 0.8,
      insulin_optimization: 0.75,
      risk_assessment: 0.85,
      pattern_detection: 0.8
    };
  }

  // Learn from new data and adapt models
  public async learnFromNewData(
    newData: {
      glucose?: { timestamp: Date; value: number; actual?: number }[];
      insulin?: { timestamp: Date; value: number; effectiveness?: number }[];
      environmental?: { timestamp: Date; temperature: number; humidity: number; airQuality: number }[];
      lifestyle?: { timestamp: Date; exercise: boolean; stress: number; sleep: number; glucoseImpact?: number }[];
    }
  ): Promise<{
    learningOutcome: string;
    accuracyImprovements: { [key: string]: number };
    newInsights: string[];
    adaptationLevel: 'low' | 'medium' | 'high';
  }> {
    const accuracyImprovements: { [key: string]: number } = {};
    const newInsights: string[] = [];
    let totalImprovement = 0;

    try {
      // 1. Learn from glucose data
      if (newData.glucose) {
        const glucoseLearning = await this.learnFromGlucoseData(newData.glucose);
        accuracyImprovements.glucose_prediction = glucoseLearning.improvement;
        newInsights.push(...glucoseLearning.insights);
        totalImprovement += glucoseLearning.improvement;
      }

      // 2. Learn from insulin data
      if (newData.insulin) {
        const insulinLearning = await this.learnFromInsulinData(newData.insulin);
        accuracyImprovements.insulin_optimization = insulinLearning.improvement;
        newInsights.push(...insulinLearning.insights);
        totalImprovement += insulinLearning.improvement;
      }

      // 3. Learn from environmental data
      if (newData.environmental) {
        const environmentalLearning = await this.learnFromEnvironmentalData(newData.environmental);
        accuracyImprovements.environmental_correlation = environmentalLearning.improvement;
        newInsights.push(...environmentalLearning.insights);
        totalImprovement += environmentalLearning.improvement;
      }

      // 4. Learn from lifestyle data
      if (newData.lifestyle) {
        const lifestyleLearning = await this.learnFromLifestyleData(newData.lifestyle);
        accuracyImprovements.lifestyle_correlation = lifestyleLearning.improvement;
        newInsights.push(...lifestyleLearning.insights);
        totalImprovement += lifestyleLearning.improvement;
      }

      // 5. Update adaptive weights based on performance
      this.updateAdaptiveWeights(accuracyImprovements);

      // 6. Adapt ensemble methods
      this.adaptEnsembleMethods();

      // 7. Update performance history
      this.updatePerformanceHistory(accuracyImprovements);

      // Determine adaptation level
      const adaptationLevel = this.determineAdaptationLevel(totalImprovement);

      return {
        learningOutcome: `Successfully learned from ${Object.keys(newData).length} data types`,
        accuracyImprovements,
        newInsights,
        adaptationLevel
      };

    } catch (error) {
      console.error('Error in adaptive learning:', error);
      return {
        learningOutcome: 'Learning failed due to error',
        accuracyImprovements: {},
        newInsights: ['Error occurred during learning process'],
        adaptationLevel: 'low'
      };
    }
  }

  // Learn from glucose data with actual vs predicted comparison
  private async learnFromGlucoseData(
    glucoseData: { timestamp: Date; value: number; actual?: number }[]
  ): Promise<{ improvement: number; insights: string[] }> {
    const insights: string[] = [];
    let totalImprovement = 0;
    let learningCount = 0;

    for (const reading of glucoseData) {
      if (reading.actual !== undefined) {
        // Compare prediction with actual
        const prediction = this.predictGlucoseValue(reading);
        const error = Math.abs(prediction - reading.actual);
        const improvement = this.calculateImprovement(error);

        // Store in memory
        this.storeGlucoseMemory({
          timestamp: reading.timestamp,
          predicted: prediction,
          actual: reading.actual,
          error,
          context: this.extractGlucoseContext(reading)
        });

        totalImprovement += improvement;
        learningCount++;

        // Generate insights from errors
        if (error > 30) { // Large error threshold
          insights.push(`Large prediction error detected: predicted ${prediction.toFixed(0)}, actual ${reading.actual.toFixed(0)}`);
        }
      }
    }

    const averageImprovement = learningCount > 0 ? totalImprovement / learningCount : 0;
    
    // Update model accuracy
    this.modelAccuracy.glucose_prediction = Math.min(1.0, this.modelAccuracy.glucose_prediction + averageImprovement * 0.1);

    return {
      improvement: averageImprovement,
      insights: insights.slice(0, 5) // Limit insights
    };
  }

  // Learn from insulin data with effectiveness feedback
  private async learnFromInsulinData(
    insulinData: { timestamp: Date; value: number; effectiveness?: number }[]
  ): Promise<{ improvement: number; insights: string[] }> {
    const insights: string[] = [];
    let totalImprovement = 0;
    let learningCount = 0;

    for (const dose of insulinData) {
      if (dose.effectiveness !== undefined) {
        // Analyze insulin effectiveness patterns
        const expectedEffectiveness = this.predictInsulinEffectiveness(dose);
        const effectivenessError = Math.abs(expectedEffectiveness - dose.effectiveness);
        const improvement = this.calculateImprovement(effectivenessError);

        // Store in memory
        this.storeInsulinMemory({
          timestamp: dose.timestamp,
          dose: dose.value,
          expectedEffectiveness,
          actualEffectiveness: dose.effectiveness,
          error: effectivenessError,
          context: this.extractInsulinContext(dose)
        });

        totalImprovement += improvement;
        learningCount++;

        // Generate insights from effectiveness patterns
        if (dose.effectiveness < 0.5) {
          insights.push(`Low insulin effectiveness detected: ${(dose.effectiveness * 100).toFixed(0)}%`);
        }
      }
    }

    const averageImprovement = learningCount > 0 ? totalImprovement / learningCount : 0;
    
    // Update model accuracy
    this.modelAccuracy.insulin_optimization = Math.min(1.0, this.modelAccuracy.insulin_optimization + averageImprovement * 0.1);

    return {
      improvement: averageImprovement,
      insights: insights.slice(0, 5)
    };
  }

  // Learn from environmental data
  private async learnFromEnvironmentalData(
    environmentalData: { timestamp: Date; temperature: number; humidity: number; airQuality: number }[]
  ): Promise<{ improvement: number; insights: string[] }> {
    const insights: string[] = [];
    let totalImprovement = 0;
    let learningCount = 0;

    for (const reading of environmentalData) {
      // Analyze environmental impact patterns
      const impactPrediction = this.predictEnvironmentalImpact(reading);
      const actualImpact = this.calculateActualEnvironmentalImpact(reading);
      const error = Math.abs(impactPrediction - actualImpact);
      const improvement = this.calculateImprovement(error);

      // Store in memory
      this.storeEnvironmentalMemory({
        timestamp: reading.timestamp,
        temperature: reading.temperature,
        humidity: reading.humidity,
        airQuality: reading.airQuality,
        predictedImpact: impactPrediction,
        actualImpact,
        error
      });

      totalImprovement += improvement;
      learningCount++;

      // Generate insights from environmental patterns
      if (reading.temperature > 30 || reading.temperature < 10) {
        insights.push(`Extreme temperature detected: ${reading.temperature}°C`);
      }
    }

    const averageImprovement = learningCount > 0 ? totalImprovement / learningCount : 0;
    
    return {
      improvement: averageImprovement,
      insights: insights.slice(0, 5)
    };
  }

  // Learn from lifestyle data
  private async learnFromLifestyleData(
    lifestyleData: { timestamp: Date; exercise: boolean; stress: number; sleep: number; glucoseImpact?: number }[]
  ): Promise<{ improvement: number; insights: string[] }> {
    const insights: string[] = [];
    let totalImprovement = 0;
    let learningCount = 0;

    for (const entry of lifestyleData) {
      // Analyze lifestyle impact patterns
      const impactPrediction = this.predictLifestyleImpact(entry);
      const actualImpact = entry.glucoseImpact || this.calculateActualLifestyleImpact(entry);
      const error = Math.abs(impactPrediction - actualImpact);
      const improvement = this.calculateImprovement(error);

      // Store in memory
      this.storeLifestyleMemory({
        timestamp: entry.timestamp,
        exercise: entry.exercise,
        stress: entry.stress,
        sleep: entry.sleep,
        predictedImpact: impactPrediction,
        actualImpact,
        error
      });

      totalImprovement += improvement;
      learningCount++;

      // Generate insights from lifestyle patterns
      if (entry.stress > 8) {
        insights.push(`High stress level detected: ${entry.stress}/10`);
      }
      if (entry.sleep < 6) {
        insights.push(`Insufficient sleep detected: ${entry.sleep} hours`);
      }
    }

    const averageImprovement = learningCount > 0 ? totalImprovement / learningCount : 0;
    
    return {
      improvement: averageImprovement,
      insights: insights.slice(0, 5)
    };
  }

  // Update adaptive weights based on performance
  private updateAdaptiveWeights(accuracyImprovements: { [key: string]: number }): void {
    const totalImprovement = Object.values(accuracyImprovements).reduce((sum, val) => sum + val, 0);
    
    if (totalImprovement > this.adaptationThreshold) {
      // Adjust weights based on which methods improved most
      Object.entries(accuracyImprovements).forEach(([method, improvement]) => {
        if (improvement > 0) {
          // Increase weight for methods that improved
          const currentWeight = this.adaptiveWeights[method] || 0.25;
          const newWeight = Math.min(0.5, currentWeight + improvement * 0.1);
          this.adaptiveWeights[method] = newWeight;
        }
      });

      // Normalize weights to sum to 1
      this.normalizeWeights();
    }
  }

  // Normalize weights to sum to 1
  private normalizeWeights(): void {
    const totalWeight = Object.values(this.adaptiveWeights).reduce((sum, weight) => sum + weight, 0);
    
    if (totalWeight > 0) {
      Object.keys(this.adaptiveWeights).forEach(key => {
        this.adaptiveWeights[key] = this.adaptiveWeights[key] / totalWeight;
      });
    }
  }

  // Adapt ensemble methods based on learning
  private adaptEnsembleMethods(): void {
    // Adjust ensemble parameters based on performance
    const overallAccuracy = Object.values(this.modelAccuracy).reduce((sum, acc) => sum + acc, 0) / Object.keys(this.modelAccuracy).length;
    
    if (overallAccuracy > 0.9) {
      // High accuracy - increase complexity
      this.learningRate = Math.min(0.02, this.learningRate * 1.1);
    } else if (overallAccuracy < 0.7) {
      // Low accuracy - decrease complexity
      this.learningRate = Math.max(0.005, this.learningRate * 0.9);
    }
  }

  // Update performance history
  private updatePerformanceHistory(accuracyImprovements: { [key: string]: number }): void {
    const timestamp = new Date();
    const overallImprovement = Object.values(accuracyImprovements).reduce((sum, val) => sum + val, 0) / Object.keys(accuracyImprovements).length;
    
    this.performanceHistory.push({
      timestamp,
      overallImprovement,
      individualImprovements: accuracyImprovements,
      modelAccuracies: { ...this.modelAccuracy },
      adaptiveWeights: { ...this.adaptiveWeights }
    });

    // Limit history size
    if (this.performanceHistory.length > 100) {
      this.performanceHistory = this.performanceHistory.slice(-100);
    }
  }

  // Determine adaptation level based on improvement
  private determineAdaptationLevel(totalImprovement: number): 'low' | 'medium' | 'high' {
    if (totalImprovement > 0.3) return 'high';
    if (totalImprovement > 0.1) return 'medium';
    return 'low';
  }

  // Calculate improvement metric
  private calculateImprovement(error: number): number {
    // Convert error to improvement (lower error = higher improvement)
    return Math.max(0, 1 - (error / 100));
  }

  // Prediction methods (simplified for learning purposes)
  private predictGlucoseValue(reading: any): number {
    // Simple prediction based on recent memory
    const recentReadings = this.glucoseMemory.slice(-5);
    if (recentReadings.length === 0) return reading.value;
    
    const avgValue = recentReadings.reduce((sum, entry) => sum + entry.actual, 0) / recentReadings.length;
    return avgValue;
  }

  private predictInsulinEffectiveness(dose: any): number {
    // Simple effectiveness prediction
    return 0.8; // Default 80% effectiveness
  }

  private predictEnvironmentalImpact(reading: any): number {
    // Simple environmental impact prediction
    const tempImpact = Math.abs(reading.temperature - 20) / 30;
    const humidityImpact = Math.abs(reading.humidity - 50) / 50;
    return (tempImpact + humidityImpact) / 2;
  }

  private predictLifestyleImpact(entry: any): number {
    // Simple lifestyle impact prediction
    let impact = 0;
    if (entry.exercise) impact += 0.2;
    if (entry.stress > 7) impact += 0.3;
    if (entry.sleep < 7) impact += 0.2;
    return impact;
  }

  // Context extraction methods
  private extractGlucoseContext(reading: any): any {
    return {
      timeOfDay: reading.timestamp.getHours(),
      dayOfWeek: reading.timestamp.getDay(),
      season: this.getSeason(reading.timestamp)
    };
  }

  private extractInsulinContext(dose: any): any {
    return {
      timeOfDay: dose.timestamp.getHours(),
      dayOfWeek: dose.timestamp.getDay(),
      doseSize: dose.value
    };
  }

  // Calculate actual environmental impact
  private calculateActualEnvironmentalImpact(reading: any): number {
    // Simplified calculation
    return Math.random() * 0.5; // Placeholder
  }

  // Calculate actual lifestyle impact
  private calculateActualLifestyleImpact(entry: any): number {
    // Simplified calculation
    return Math.random() * 0.5; // Placeholder
  }

  // Get season from date
  private getSeason(date: Date): string {
    const month = date.getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  }

  // Memory storage methods
  private storeGlucoseMemory(entry: GlucoseMemoryEntry): void {
    this.glucoseMemory.push(entry);
    if (this.glucoseMemory.length > this.maxMemorySize) {
      this.glucoseMemory = this.glucoseMemory.slice(-this.maxMemorySize);
    }
  }

  private storeInsulinMemory(entry: InsulinMemoryEntry): void {
    this.insulinMemory.push(entry);
    if (this.insulinMemory.length > this.maxMemorySize) {
      this.insulinMemory = this.insulinMemory.slice(-this.maxMemorySize);
    }
  }

  private storeEnvironmentalMemory(entry: EnvironmentalMemoryEntry): void {
    this.environmentalMemory.push(entry);
    if (this.environmentalMemory.length > this.maxMemorySize) {
      this.environmentalMemory = this.environmentalMemory.slice(-this.maxMemorySize);
    }
  }

  private storeLifestyleMemory(entry: LifestyleMemoryEntry): void {
    this.lifestyleMemory.push(entry);
    if (this.lifestyleMemory.length > this.maxMemorySize) {
      this.lifestyleMemory = this.lifestyleMemory.slice(-this.maxMemorySize);
    }
  }

  // Get current system status
  public getSystemStatus(): {
    memoryUsage: { [key: string]: number };
    modelAccuracy: { [key: string]: number };
    adaptiveWeights: { [key: string]: number };
    recentPerformance: PerformanceMetric[];
    learningRate: number;
  } {
    return {
      memoryUsage: {
        glucose: this.glucoseMemory.length,
        insulin: this.insulinMemory.length,
        environmental: this.environmentalMemory.length,
        lifestyle: this.lifestyleMemory.length
      },
      modelAccuracy: { ...this.modelAccuracy },
      adaptiveWeights: { ...this.adaptiveWeights },
      recentPerformance: this.performanceHistory.slice(-10),
      learningRate: this.learningRate
    };
  }

  // Get learning insights
  public getLearningInsights(): {
    topInsights: string[];
    performanceTrend: 'improving' | 'stable' | 'declining';
    recommendation: string;
  } {
    const recentPerformance = this.performanceHistory.slice(-5);
    const performanceTrend = this.calculatePerformanceTrend(recentPerformance);
    
    const topInsights = this.extractTopInsights();
    const recommendation = this.generateLearningRecommendation(performanceTrend);

    return {
      topInsights,
      performanceTrend,
      recommendation
    };
  }

  // Calculate performance trend
  private calculatePerformanceTrend(recentPerformance: PerformanceMetric[]): 'improving' | 'stable' | 'declining' {
    if (recentPerformance.length < 2) return 'stable';
    
    const first = recentPerformance[0].overallImprovement;
    const last = recentPerformance[recentPerformance.length - 1].overallImprovement;
    const change = last - first;
    
    if (change > 0.05) return 'improving';
    if (change < -0.05) return 'declining';
    return 'stable';
  }

  // Extract top insights from memory
  private extractTopInsights(): string[] {
    const insights: string[] = [];
    
    // Analyze glucose memory for patterns
    if (this.glucoseMemory.length > 0) {
      const highErrorReadings = this.glucoseMemory.filter(entry => entry.error > 30);
      if (highErrorReadings.length > 0) {
        insights.push(`${highErrorReadings.length} high-error glucose predictions detected`);
      }
    }
    
    // Analyze insulin memory for patterns
    if (this.insulinMemory.length > 0) {
      const lowEffectiveness = this.insulinMemory.filter(entry => entry.actualEffectiveness < 0.5);
      if (lowEffectiveness.length > 0) {
        insights.push(`${lowEffectiveness.length} low-effectiveness insulin doses detected`);
      }
    }
    
    // Analyze environmental memory for patterns
    if (this.environmentalMemory.length > 0) {
      const extremeConditions = this.environmentalMemory.filter(entry => 
        entry.temperature > 30 || entry.temperature < 10
      );
      if (extremeConditions.length > 0) {
        insights.push(`${extremeConditions.length} extreme environmental conditions detected`);
      }
    }
    
    return insights.slice(0, 5);
  }

  // Generate learning recommendation
  private generateLearningRecommendation(trend: 'improving' | 'stable' | 'declining'): string {
    switch (trend) {
      case 'improving':
        return 'Continue current learning approach - system is improving well';
      case 'stable':
        return 'Consider increasing data diversity to improve learning';
      case 'declining':
        return 'Review recent data quality and consider adjusting learning parameters';
      default:
        return 'Monitor system performance and adjust as needed';
    }
  }

  // Reset learning system
  public resetLearningSystem(): void {
    this.initializeMemory();
    this.learningRate = 0.01;
    this.adaptationThreshold = 0.1;
  }
}

// Type definitions
export interface GlucoseMemoryEntry {
  timestamp: Date;
  predicted: number;
  actual: number;
  error: number;
  context: any;
}

export interface InsulinMemoryEntry {
  timestamp: Date;
  dose: number;
  expectedEffectiveness: number;
  actualEffectiveness: number;
  error: number;
  context: any;
}

export interface EnvironmentalMemoryEntry {
  timestamp: Date;
  temperature: number;
  humidity: number;
  airQuality: number;
  predictedImpact: number;
  actualImpact: number;
  error: number;
}

export interface LifestyleMemoryEntry {
  timestamp: Date;
  exercise: boolean;
  stress: number;
  sleep: number;
  predictedImpact: number;
  actualImpact: number;
  error: number;
}

export interface PerformanceMetric {
  timestamp: Date;
  overallImprovement: number;
  individualImprovements: { [key: string]: number };
  modelAccuracies: { [key: string]: number };
  adaptiveWeights: { [key: string]: number };
}

export const adaptiveLearningAI = new AdaptiveLearningAI();
