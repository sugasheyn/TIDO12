// Real AI Models for Pattern Detection in Diabetes Data
export class AIPatternDetection {
  
  // Simple linear regression for glucose-insulin correlation
  private linearRegression(x: number[], y: number[]): { slope: number; intercept: number; correlation: number } {
    const n = x.length;
    if (n !== y.length || n < 2) {
      return { slope: 0, intercept: 0, correlation: 0 };
    }

    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
    const sumXX = x.reduce((a, b) => a + b * b, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // Calculate correlation coefficient
    const meanX = sumX / n;
    const meanY = sumY / n;
    const numerator = x.reduce((a, b, i) => a + (b - meanX) * (y[i] - meanY), 0);
    const denominatorX = Math.sqrt(x.reduce((a, b) => a + Math.pow(b - meanX, 2), 0));
    const denominatorY = Math.sqrt(y.reduce((a, b) => a + Math.pow(b - meanY, 2), 0));
    const correlation = denominatorX * denominatorY !== 0 ? numerator / (denominatorX * denominatorY) : 0;

    return { slope, intercept, correlation };
  }

  // K-means clustering for glucose pattern classification
  private kMeansClustering(data: number[], k: number, maxIterations: number = 100): {
    clusters: number[];
    centroids: number[];
    inertia: number;
  } {
    if (data.length < k) {
      return { clusters: data.map(() => 0), centroids: data, inertia: 0 };
    }

    // Initialize centroids randomly
    let centroids = Array.from({ length: k }, () => data[Math.floor(Math.random() * data.length)]);
    let clusters = new Array(data.length).fill(0);
    let inertia = Infinity;

    for (let iteration = 0; iteration < maxIterations; iteration++) {
      const newClusters = new Array(data.length).fill(0);
      const newCentroids = new Array(k).fill(0);
      const counts = new Array(k).fill(0);

      // Assign points to nearest centroid
      for (let i = 0; i < data.length; i++) {
        let minDistance = Infinity;
        let bestCluster = 0;

        for (let j = 0; j < k; j++) {
          const distance = Math.abs(data[i] - centroids[j]);
          if (distance < minDistance) {
            minDistance = distance;
            bestCluster = j;
          }
        }
        newClusters[i] = bestCluster;
        newCentroids[bestCluster] += data[i];
        counts[bestCluster]++;
      }

      // Update centroids
      for (let j = 0; j < k; j++) {
        newCentroids[j] = counts[j] > 0 ? newCentroids[j] / counts[j] : centroids[j];
      }

      // Calculate new inertia
      const newInertia = data.reduce((sum, point, i) => {
        return sum + Math.pow(point - newCentroids[newClusters[i]], 2);
      }, 0);

      // Check convergence
      if (Math.abs(newInertia - inertia) < 0.001) {
        break;
      }

      centroids = newCentroids;
      clusters = newClusters;
      inertia = newInertia;
    }

    return { clusters, centroids, inertia };
  }

  // Anomaly detection using statistical methods
  private detectAnomalies(data: number[], threshold: number = 2): {
    anomalies: number[];
    mean: number;
    std: number;
    zScores: number[];
  } {
    const n = data.length;
    if (n < 2) {
      return { anomalies: [], mean: data[0] || 0, std: 0, zScores: [] };
    }

    const mean = data.reduce((a, b) => a + b, 0) / n;
    const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (n - 1);
    const std = Math.sqrt(variance);

    const zScores = data.map(value => (value - mean) / std);
    const anomalies = data.filter((_, i) => Math.abs(zScores[i]) > threshold);

    return { anomalies, mean, std, zScores };
  }

  // Time series analysis for glucose trends
  private analyzeTimeSeries(data: { timestamp: Date; value: number }[]): {
    trend: 'increasing' | 'decreasing' | 'stable';
    seasonality: boolean;
    volatility: number;
    prediction: number;
  } {
    if (data.length < 3) {
      return { trend: 'stable', seasonality: false, volatility: 0, prediction: 0 };
    }

    // Sort by timestamp
    const sortedData = data.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    const values = sortedData.map(d => d.value);
    const timestamps = sortedData.map(d => d.timestamp.getTime());

    // Calculate trend using linear regression
    const timeIndices = timestamps.map((t, i) => i);
    const { slope, correlation } = this.linearRegression(timeIndices, values);

    // Determine trend
    let trend: 'increasing' | 'decreasing' | 'stable';
    if (Math.abs(slope) < 0.1) {
      trend = 'stable';
    } else if (slope > 0) {
      trend = 'increasing';
    } else {
      trend = 'decreasing';
    }

    // Calculate volatility (standard deviation)
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (values.length - 1);
    const volatility = Math.sqrt(variance);

    // Simple seasonality detection (check for repeating patterns)
    const seasonality = this.detectSeasonality(values);

    // Simple prediction (linear extrapolation)
    const prediction = values[values.length - 1] + slope;

    return { trend, seasonality, volatility, prediction };
  }

  // Detect seasonality in time series data
  private detectSeasonality(data: number[]): boolean {
    if (data.length < 6) return false;

    // Simple autocorrelation check
    const lag = Math.floor(data.length / 4);
    let correlation = 0;

    for (let i = 0; i < data.length - lag; i++) {
      correlation += data[i] * data[i + lag];
    }

    correlation /= (data.length - lag);
    
    // Normalize correlation
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
    
    if (variance === 0) return false;
    
    const normalizedCorrelation = correlation / variance;
    return Math.abs(normalizedCorrelation) > 0.3;
  }

  // Pattern recognition in glucose-insulin data
  public analyzeGlucoseInsulinPatterns(glucoseData: number[], insulinData: number[]): {
    correlation: number;
    lag: number;
    pattern: string;
    confidence: number;
    recommendations: string[];
  } {
    if (glucoseData.length !== insulinData.length || glucoseData.length < 10) {
      return {
        correlation: 0,
        lag: 0,
        pattern: 'insufficient_data',
        confidence: 0,
        recommendations: ['Collect more data points for accurate analysis']
      };
    }

    // Find optimal lag using cross-correlation
    let bestLag = 0;
    let bestCorrelation = 0;

    for (let lag = -5; lag <= 5; lag++) {
      let correlation = 0;
      let count = 0;

      for (let i = 0; i < glucoseData.length; i++) {
        const insulinIndex = i + lag;
        if (insulinIndex >= 0 && insulinIndex < insulinData.length) {
          correlation += glucoseData[i] * insulinData[insulinIndex];
          count++;
        }
      }

      if (count > 0) {
        correlation /= count;
        if (Math.abs(correlation) > Math.abs(bestCorrelation)) {
          bestCorrelation = correlation;
          bestLag = lag;
        }
      }
    }

    // Analyze patterns
    let pattern = 'unknown';
    let confidence = Math.abs(bestCorrelation);
    let recommendations: string[] = [];

    if (bestLag < 0) {
      pattern = 'insulin_leads_glucose';
      recommendations.push('Insulin changes precede glucose changes by ' + Math.abs(bestLag) + ' time units');
      recommendations.push('Consider adjusting insulin timing for better glucose control');
    } else if (bestLag > 0) {
      pattern = 'glucose_leads_insulin';
      recommendations.push('Glucose changes precede insulin changes by ' + bestLag + ' time units');
      recommendations.push('Monitor glucose trends to predict insulin needs');
    } else {
      pattern = 'synchronous_changes';
      recommendations.push('Glucose and insulin changes occur simultaneously');
      recommendations.push('Consider real-time glucose monitoring for immediate insulin adjustments');
    }

    if (confidence > 0.7) {
      recommendations.push('Strong correlation detected - patterns are reliable');
    } else if (confidence > 0.4) {
      recommendations.push('Moderate correlation - consider additional factors');
    } else {
      recommendations.push('Weak correlation - patterns may not be reliable');
    }

    return {
      correlation: bestCorrelation,
      lag: bestLag,
      pattern,
      confidence,
      recommendations
    };
  }

  // Detect hypoglycemia patterns
  public detectHypoglycemiaPatterns(glucoseData: { timestamp: Date; value: number }[]): {
    episodes: number;
    frequency: number;
    severity: 'mild' | 'moderate' | 'severe';
    riskFactors: string[];
    prevention: string[];
  } {
    const hypoglycemiaThreshold = 70; // mg/dL
    const episodes = glucoseData.filter(d => d.value < hypoglycemiaThreshold);
    
    if (episodes.length === 0) {
      return {
        episodes: 0,
        frequency: 0,
        severity: 'mild',
        riskFactors: ['No hypoglycemia detected'],
        prevention: ['Continue current management strategy']
      };
    }

    const frequency = episodes.length / glucoseData.length;
    const severity = this.calculateHypoglycemiaSeverity(episodes.map(e => e.value));
    
    const riskFactors = this.identifyHypoglycemiaRiskFactors(glucoseData, episodes);
    const prevention = this.generateHypoglycemiaPrevention(riskFactors, severity);

    return {
      episodes: episodes.length,
      frequency,
      severity,
      riskFactors,
      prevention
    };
  }

  // Calculate hypoglycemia severity
  private calculateHypoglycemiaSeverity(values: number[]): 'mild' | 'moderate' | 'severe' {
    const minValue = Math.min(...values);
    
    if (minValue >= 54) return 'mild';
    if (minValue >= 40) return 'moderate';
    return 'severe';
  }

  // Identify risk factors for hypoglycemia
  private identifyHypoglycemiaRiskFactors(
    allData: { timestamp: Date; value: number }[],
    episodes: { timestamp: Date; value: number }[]
  ): string[] {
    const riskFactors: string[] = [];
    
    // Check for rapid glucose decline
    for (let i = 1; i < allData.length; i++) {
      const decline = allData[i - 1].value - allData[i].value;
      if (decline > 30) {
        riskFactors.push('Rapid glucose decline detected');
        break;
      }
    }

    // Check for overnight episodes
    const overnightEpisodes = episodes.filter(e => {
      const hour = e.timestamp.getHours();
      return hour >= 22 || hour <= 6;
    });
    
    if (overnightEpisodes.length > 0) {
      riskFactors.push('Overnight hypoglycemia episodes detected');
    }

    // Check for exercise-related episodes
    const exerciseEpisodes = episodes.filter(e => {
      const hour = e.timestamp.getHours();
      return hour >= 16 && hour <= 20; // Common exercise time
    });
    
    if (exerciseEpisodes.length > 0) {
      riskFactors.push('Exercise-related hypoglycemia detected');
    }

    if (riskFactors.length === 0) {
      riskFactors.push('No specific risk factors identified');
    }

    return riskFactors;
  }

  // Generate prevention strategies
  private generateHypoglycemiaPrevention(
    riskFactors: string[],
    severity: 'mild' | 'moderate' | 'severe'
  ): string[] {
    const prevention: string[] = [];

    if (riskFactors.some(r => r.includes('Rapid glucose decline'))) {
      prevention.push('Monitor glucose more frequently during periods of rapid change');
      prevention.push('Consider adjusting insulin sensitivity factor');
    }

    if (riskFactors.some(r => r.includes('Overnight'))) {
      prevention.push('Check glucose before bedtime and set overnight alerts');
      prevention.push('Consider reducing basal insulin overnight');
    }

    if (riskFactors.some(r => r.includes('Exercise'))) {
      prevention.push('Reduce insulin before exercise or consume additional carbohydrates');
      prevention.push('Monitor glucose during and after exercise');
    }

    if (severity === 'severe') {
      prevention.push('Consult healthcare provider immediately');
      prevention.push('Consider continuous glucose monitoring');
    }

    if (prevention.length === 0) {
      prevention.push('Maintain current management strategy');
    }

    return prevention;
  }

  // Analyze medication effectiveness
  public analyzeMedicationEffectiveness(
    beforeData: number[],
    afterData: number[]
  ): {
    effectiveness: number;
    improvement: boolean;
    statisticalSignificance: boolean;
    recommendations: string[];
  } {
    if (beforeData.length < 5 || afterData.length < 5) {
      return {
        effectiveness: 0,
        improvement: false,
        statisticalSignificance: false,
        recommendations: ['Insufficient data for analysis']
      };
    }

    const beforeMean = beforeData.reduce((a, b) => a + b, 0) / beforeData.length;
    const afterMean = afterData.reduce((a, b) => a + b, 0) / afterData.length;
    
    const improvement = afterMean < beforeMean; // Lower glucose is better
    const effectiveness = Math.abs((beforeMean - afterMean) / beforeMean) * 100;

    // Simple statistical test (t-test approximation)
    const beforeVariance = beforeData.reduce((a, b) => a + Math.pow(b - beforeMean, 2), 0) / (beforeData.length - 1);
    const afterVariance = afterData.reduce((a, b) => a + Math.pow(b - afterMean, 2), 0) / (afterData.length - 1);
    
    const pooledVariance = ((beforeData.length - 1) * beforeVariance + (afterData.length - 1) * afterVariance) / (beforeData.length + afterData.length - 2);
    const standardError = Math.sqrt(pooledVariance * (1 / beforeData.length + 1 / afterData.length));
    const tStatistic = Math.abs(beforeMean - afterMean) / standardError;
    
    const statisticalSignificance = tStatistic > 2; // Rough threshold for significance

    const recommendations: string[] = [];
    
    if (improvement && statisticalSignificance) {
      recommendations.push('Medication shows significant improvement in glucose control');
      recommendations.push('Continue current medication regimen');
    } else if (improvement && !statisticalSignificance) {
      recommendations.push('Medication shows improvement but not statistically significant');
      recommendations.push('Monitor for longer period to confirm effectiveness');
    } else if (!improvement && statisticalSignificance) {
      recommendations.push('Medication shows significant worsening of glucose control');
      recommendations.push('Consult healthcare provider about medication adjustment');
    } else {
      recommendations.push('No significant change in glucose control');
      recommendations.push('Consider alternative treatment options');
    }

    return {
      effectiveness,
      improvement,
      statisticalSignificance,
      recommendations
    };
  }

  // Generate comprehensive diabetes insights
  public generateComprehensiveInsights(data: {
    glucose: { timestamp: Date; value: number }[];
    insulin?: { timestamp: Date; value: number }[];
    medications?: string[];
    lifestyle?: { exercise: boolean; stress: number; sleep: number };
  }): {
    patterns: any[];
    risks: string[];
    recommendations: string[];
    confidence: number;
  } {
    const insights: any[] = [];
    const risks: string[] = [];
    const recommendations: string[] = [];
    let confidence = 0;

    // Analyze glucose patterns
    if (data.glucose.length > 0) {
      const timeSeries = this.analyzeTimeSeries(data.glucose);
      const anomalies = this.detectAnomalies(data.glucose.map(d => d.value));
      const hypoglycemia = this.detectHypoglycemiaPatterns(data.glucose);

      insights.push({
        type: 'glucose_trend',
        data: timeSeries,
        confidence: 0.8
      });

      insights.push({
        type: 'glucose_anomalies',
        data: anomalies,
        confidence: 0.7
      });

      insights.push({
        type: 'hypoglycemia_risk',
        data: hypoglycemia,
        confidence: 0.9
      });

      // Add risks based on analysis
      if (hypoglycemia.severity === 'severe') {
        risks.push('High risk of severe hypoglycemia');
      }
      if (timeSeries.trend === 'increasing') {
        risks.push('Glucose levels trending upward');
      }
      if (anomalies.anomalies.length > data.glucose.length * 0.1) {
        risks.push('High glucose variability detected');
      }

      confidence += 0.3;
    }

    // Analyze insulin-glucose correlation
    if (data.insulin && data.insulin.length > 0 && data.glucose.length > 0) {
      const glucoseValues = data.glucose.map(d => d.value);
      const insulinValues = data.insulin.map(d => d.value);
      
      const correlation = this.analyzeGlucoseInsulinPatterns(glucoseValues, insulinValues);
      
      insights.push({
        type: 'insulin_correlation',
        data: correlation,
        confidence: 0.8
      });

      if (correlation.confidence > 0.7) {
        recommendations.push(...correlation.recommendations);
      }

      confidence += 0.2;
    }

    // Lifestyle recommendations
    if (data.lifestyle) {
      if (data.lifestyle.exercise) {
        recommendations.push('Exercise detected - monitor glucose during and after physical activity');
      }
      if (data.lifestyle.stress > 7) {
        risks.push('High stress levels may affect glucose control');
        recommendations.push('Consider stress management techniques');
      }
      if (data.lifestyle.sleep < 7) {
        risks.push('Insufficient sleep may affect glucose metabolism');
        recommendations.push('Aim for 7-9 hours of sleep per night');
      }
      confidence += 0.1;
    }

    // Overall confidence calculation
    confidence = Math.min(confidence, 1.0);

    return {
      patterns: insights,
      risks,
      recommendations,
      confidence
    };
  }
}

export const aiPatternDetection = new AIPatternDetection();
