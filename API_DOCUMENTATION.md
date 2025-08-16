# T1D AI Platform API Documentation

## Overview
The T1D AI Platform provides comprehensive APIs for Type 1 diabetes research, community insights, and data analysis. All endpoints support caching, rate limiting, and authentication where applicable.

## Base URL
```
http://localhost:3001/api
```

## Authentication
Most endpoints support Bearer token authentication:
```
Authorization: Bearer <token>
```

### Available Tokens
- `user1-token` - Regular user (read:claims, create:claims)
- `admin1-token` - Admin user (all permissions)
- `mod1-token` - Moderator (read:claims, moderate:claims)

## Rate Limiting
- **Limit**: 100 requests per minute per IP
- **Headers**: Rate limit info included in responses
- **Status**: 429 when limit exceeded

## Caching
- **TTL**: 5 minutes for most endpoints
- **Cache Keys**: Based on query parameters
- **Headers**: Cache status included in responses

---

## Community Claims API

### GET /api/public-data/community-claims
Retrieve community claims with comprehensive analysis and insights.

#### Query Parameters
- `type` (optional): Filter by claim type (e.g., "symptom", "treatment")
- `platform` (optional): Filter by platform (e.g., "Reddit r/Type1Diabetes")
- `verificationStatus` (optional): Filter by status ("unverified", "verified", "debunked")
- `biologicalPlausibility` (optional): Filter by minimum plausibility score (0.0-1.0)

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "claim-1",
      "claim": "Eating a lemon wedge before meals helps lower blood sugar spikes",
      "description": "Sample community claim about Type 1 diabetes management",
      "reportedBy": "user-123",
      "timestamp": "2025-08-16T19:56:20.492Z",
      "platform": "Reddit r/Type1Diabetes",
      "upvotes": 47,
      "downvotes": 5,
      "comments": 12,
      "verificationStatus": "unverified",
      "biologicalPlausibility": 0.65,
      "evidenceLevel": "anecdotal"
    }
  ],
  "summary": {
    "totalClaims": 25,
    "platforms": ["Reddit r/Type1Diabetes", "Facebook T1D Groups"],
    "averagePlausibility": 0.58,
    "verificationBreakdown": {
      "unverified": 15,
      "verified": 8,
      "debunked": 2
    },
    "highPlausibilityClaims": 12,
    "mediumPlausibilityClaims": 7,
    "lowPlausibilityClaims": 6
  },
  "insights": {
    "biologicalAnalysis": {
      "highPlausibility": {
        "count": 12,
        "percentage": 48,
        "recommendation": "These claims have strong biological mechanisms..."
      }
    },
    "trendingAnalysis": {
      "trendingCount": 5,
      "topTrending": [...],
      "recommendation": "Monitor these trending claims..."
    },
    "platformInsights": {
      "platforms": ["Reddit", "Facebook"],
      "insights": [...]
    },
    "claimCategories": {
      "totalCategories": 6,
      "categories": [...]
    },
    "crossPlatformInsights": {
      "multiPlatformCount": 3,
      "topMultiPlatform": [...]
    }
  },
  "filters": {
    "claimType": "symptom",
    "platform": "Reddit r/Type1Diabetes",
    "verificationStatus": null,
    "biologicalPlausibility": null,
    "applied": true
  },
  "lastUpdated": "2025-08-16T19:56:20.492Z",
  "nextUpdate": "2025-08-16T20:56:20.492Z"
}
```

### POST /api/public-data/community-claims
Create a new community claim (requires authentication).

#### Headers
```
Authorization: Bearer <token>
Content-Type: application/json
```

#### Request Body
```json
{
  "claim": "New diabetes management technique",
  "description": "Description of the claim",
  "platform": "Reddit r/Type1Diabetes",
  "evidenceLevel": "anecdotal"
}
```

#### Response
```json
{
  "success": true,
  "message": "Community claim created successfully",
  "data": {
    "id": "claim-1234567890",
    "claim": "New diabetes management technique",
    "verificationStatus": "unverified",
    "biologicalPlausibility": 0.45,
    "metadata": {
      "createdBy": "user1",
      "userRole": "user",
      "createdAt": "2025-08-16T19:56:20.492Z"
    }
  }
}
```

---

## Sources API

### GET /api/sources
Retrieve data sources with health metrics and status information.

#### Query Parameters
- `type` (optional): Filter by source type ("social_media", "academic", "research")
- `status` (optional): Filter by status ("active", "inactive", "error")
- `platform` (optional): Filter by platform

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "source-1",
      "name": "PubMed Central",
      "url": "https://pubmed.ncbi.nlm.nih.gov/?term=type+1+diabetes",
      "type": "research",
      "platform": "PubMed",
      "status": "active",
      "lastChecked": "2025-08-16T19:56:20.492Z",
      "lastUpdate": "2025-08-16T19:56:20.492Z",
      "healthScore": 85,
      "pollInterval": 45,
      "priority": "high",
      "metadata": {
        "language": "English",
        "region": "Global",
        "followers": 50000,
        "credibilityScore": 0.9,
        "tags": ["Type 1 Diabetes", "Research", "Clinical Trials"]
      },
      "rateLimits": {
        "requestsPerHour": 1000,
        "requestsRemaining": 850,
        "resetTime": "2025-08-16T20:56:20.492Z"
      },
      "errorCount": 2,
      "successCount": 1500
    }
  ],
  "total": 50,
  "summary": {
    "active": 45,
    "inactive": 3,
    "error": 2,
    "avgHealthScore": 82,
    "totalFollowers": 2500000,
    "languagesCovered": 15
  }
}
```

---

## Glucose Data API

### GET /api/public-data/glucose
Retrieve continuous glucose monitoring data with contextual information.

#### Response
```json
{
  "success": true,
  "data": [
    {
      "timestamp": "2025-08-16T19:56:20.492Z",
      "value": 126,
      "unit": "mg/dL",
      "source": "Dexcom G6",
      "device": "Dexcom G6",
      "location": "Home",
      "mealContext": "post-meal",
      "exerciseContext": "none",
      "stressLevel": "low",
      "sleepQuality": "good",
      "weather": {
        "temperature": 22,
        "humidity": 45,
        "pressure": 1013
      },
      "metadata": {
        "confidence": 0.85,
        "calibration": false,
        "battery": 0.75,
        "signal": 0.92
      }
    }
  ],
  "summary": {
    "totalDataPoints": 96,
    "sources": ["Dexcom G6", "FreeStyle Libre 3"],
    "timeRange": {
      "start": "2025-08-15T19:56:20.492Z",
      "end": "2025-08-16T19:56:20.492Z"
    },
    "averageGlucose": 126,
    "dataQuality": 1
  },
  "lastUpdated": "2025-08-16T19:56:20.492Z",
  "nextUpdate": "2025-08-16T20:56:20.492Z"
}
```

---

## AI Models API

### GET /api/ai/models
Retrieve available AI models for diabetes analysis.

#### Response
```json
{
  "models": [
    {
      "id": "cgm_accuracy_001",
      "name": "CGM Accuracy Prediction Model",
      "type": "regression",
      "purpose": "Predict CGM sensor accuracy based on environmental and physiological factors",
      "accuracy": 94.2,
      "version": "1.2.0",
      "lastUpdated": "2025-08-16T19:56:20.492Z"
    }
  ]
}
```

---

## Patterns API

### GET /api/patterns/anomalies
Retrieve detected anomalies in diabetes data.

#### Response
```json
{
  "success": true,
  "anomalies": [
    {
      "id": "anom_insulin_spike",
      "type": "spike",
      "entity": "insulin_pricing_discussions",
      "severity": "high",
      "description": "Unusual 340% increase in insulin pricing complaints from social media sources",
      "detectedAt": "2025-08-16T19:56:20.492Z",
      "confidence": 0.89
    }
  ]
}
```

---

## Analytics API

### GET /api/analytics/metrics
Retrieve comprehensive analytics metrics.

#### Response
```json
{
  "overview": {
    "totalSources": 50247,
    "activeSources": 45678,
    "totalContent": 2847563,
    "newContentToday": 1847,
    "languagesCovered": 127,
    "countriesCovered": 89
  },
  "engagement": {
    "totalUsers": 156789,
    "activeUsers": 2345,
    "avgSessionDuration": "12m 34s"
  }
}
```

---

## Error Responses

### Rate Limit Exceeded (429)
```json
{
  "success": false,
  "error": "Rate limit exceeded. Please try again later.",
  "retryAfter": 60
}
```

### Authentication Required (401)
```json
{
  "success": false,
  "error": "Authentication required"
}
```

### Insufficient Permissions (403)
```json
{
  "success": false,
  "error": "Insufficient permissions to create claims"
}
```

### Server Error (500)
```json
{
  "success": false,
  "error": "Failed to fetch community claims data"
}
```

---

## Performance Notes

- **Caching**: Responses cached for 5 minutes
- **Rate Limiting**: 100 requests per minute per IP
- **Response Time**: Typically 200-500ms
- **Data Size**: Optimized for mobile and web consumption

---

## Development Notes

- All endpoints support CORS
- Responses include `lastUpdated` and `nextUpdate` timestamps
- Sample data is generated dynamically for development
- Production deployment should use real data sources and databases
