import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))

    const aiModels = {
      models: [
        {
          id: "cgm_accuracy_001",
          name: "CGM Accuracy Prediction Model",
          type: "regression",
          purpose: "Predict CGM sensor accuracy based on environmental and physiological factors",
          accuracy: 94.2,
          lastTrained: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          trainingData: {
            samples: 45678,
            sources: 234,
            timeRange: "2 years",
          },
          performance: {
            mae: 12.3,
            rmse: 18.7,
            r2: 0.89,
          },
          features: [
            "temperature",
            "humidity",
            "sensor_age",
            "body_location",
            "activity_level",
            "hydration_status",
          ],
          status: "active",
        },
        {
          id: "hypoglycemia_prediction_002",
          name: "Hypoglycemia Risk Prediction",
          type: "classification",
          purpose: "Predict likelihood of hypoglycemia within next 2-4 hours",
          accuracy: 91.8,
          lastTrained: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          trainingData: {
            samples: 34567,
            sources: 189,
            timeRange: "3 years",
          },
          performance: {
            precision: 0.89,
            recall: 0.93,
            f1: 0.91,
          },
          features: [
            "glucose_trend",
            "insulin_on_board",
            "carbohydrate_intake",
            "exercise_history",
            "sleep_quality",
            "stress_levels",
          ],
          status: "active",
        },
        {
          id: "insulin_dosing_003",
          name: "AI Insulin Dosing Assistant",
          type: "regression",
          purpose: "Recommend optimal insulin doses based on multiple factors",
          accuracy: 88.5,
          lastTrained: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
          trainingData: {
            samples: 23456,
            sources: 156,
            timeRange: "2.5 years",
          },
          performance: {
            mae: 0.8,
            rmse: 1.2,
            r2: 0.85,
          },
          features: [
            "current_glucose",
            "glucose_trend",
            "carbohydrate_content",
            "insulin_sensitivity",
            "insulin_on_board",
            "activity_planned",
            "time_of_day",
          ],
          status: "active",
        },
        {
          id: "pattern_detection_004",
          name: "Glucose Pattern Recognition",
          type: "clustering",
          purpose: "Identify recurring glucose patterns and their triggers",
          accuracy: 87.3,
          lastTrained: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          trainingData: {
            samples: 56789,
            sources: 298,
            timeRange: "4 years",
          },
          performance: {
            silhouette_score: 0.76,
            calinski_score: 234.5,
            davies_score: 0.34,
          },
          features: [
            "glucose_values",
            "time_series",
            "external_factors",
            "behavioral_patterns",
            "environmental_conditions",
          ],
          status: "active",
        },
        {
          id: "sentiment_analysis_005",
          name: "T1D Community Sentiment Analysis",
          type: "classification",
          purpose: "Analyze sentiment and emotions in T1D community discussions",
          accuracy: 92.1,
          lastTrained: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          trainingData: {
            samples: 123456,
            sources: 456,
            timeRange: "1 year",
          },
          performance: {
            precision: 0.91,
            recall: 0.93,
            f1: 0.92,
          },
          features: [
            "text_content",
            "user_context",
            "topic_category",
            "engagement_metrics",
            "temporal_factors",
          ],
          status: "active",
        },
        {
          id: "device_correlation_006",
          name: "Device Performance Correlation",
          type: "correlation",
          purpose: "Identify correlations between device performance and external factors",
          accuracy: 89.7,
          lastTrained: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          trainingData: {
            samples: 34567,
            sources: 234,
            timeRange: "2 years",
          },
          performance: {
            correlation_threshold: 0.75,
            significance_level: 0.05,
            confidence_interval: 0.95,
          },
          features: [
            "device_type",
            "environmental_conditions",
            "user_characteristics",
            "usage_patterns",
            "maintenance_history",
          ],
          status: "active",
        },
      ],
      summary: {
        totalModels: 6,
        activeModels: 6,
        averageAccuracy: 90.6,
        totalTrainingSamples: 318823,
        totalSources: 1571,
        lastUpdated: new Date(),
      },
      systemStatus: {
        gpuUtilization: 67,
        memoryUsage: 78,
        activeInferences: 234,
        queueLength: 12,
        uptime: "99.9%",
      },
    }

    return NextResponse.json(aiModels)
  } catch (error) {
    console.error('Error in AI models API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch AI models' },
      { status: 500 }
    )
  }
}
