# 🌍 **V0 Environment Configuration - Zero Signup Required**

## **📋 Environment Variables for v0**

Copy and paste these into your v0 environment configuration:

```bash
# App Configuration (Required by v0)
NEXT_PUBLIC_APP_NAME=T1D AI Platform
NEXT_PUBLIC_APP_VERSION=2.0.0
ENABLE_REAL_APIS=true

# Reddit Alternatives (Zero Signup - Public Access)
REDDIT_CLIENT_ID=public_access
REDDIT_CLIENT_SECRET=public_access

# API Base URL
NEXT_PUBLIC_API_BASE_URL=/api

# NextAuth Configuration (Optional - can be disabled)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-here

# OAuth Providers (Optional - can be disabled)
GOOGLE_CLIENT_ID=optional
GOOGLE_CLIENT_SECRET=optional
GITHUB_ID=optional
GITHUB_SECRET=optional
```

## **🚀 Zero-Signup Public APIs Now Integrated**

Your platform now uses these **completely public APIs** that require **no registration, no signup, no API keys**:

### **Community Data Sources:**
- **Hacker News API** - `https://hacker-news.firebaseio.com/v0/`
- **Stack Exchange Health API** - `https://api.stackexchange.com/2.3/`
- **GitHub Public Repositories** - `https://api.github.com/`

### **Research Data Sources:**
- **PubMed API** - `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/`
- **ClinicalTrials.gov API** - `https://clinicaltrials.gov/api/query/`
- **CDC Open Data** - `https://data.cdc.gov/resource/`
- **WHO Global Health API** - `https://ghoapi.azureedge.net/api/`

### **Environmental Data Sources:**
- **Open-Meteo Weather API** - `https://api.open-meteo.com/v1/`
- **OpenAQ Air Quality API** - `https://api.openaq.org/v2/`
- **Open Food Facts API** - `https://world.openfoodfacts.org/api/v0/`

## **✅ What This Means for v0**

1. **No External Dependencies** - All APIs are completely public
2. **No API Key Management** - Zero configuration required
3. **Real Data** - Live data from authoritative sources
4. **Automatic Fallbacks** - Graceful error handling if any API is down
5. **Caching** - 5-minute cache to prevent excessive API calls

## **🔧 How to Use in v0**

1. **Copy the environment variables above**
2. **Paste them into v0's environment configuration**
3. **The platform will automatically use zero-signup public APIs**
4. **No additional setup required**

## **📊 Data You'll Get**

- **Community Discussions** from Hacker News, Stack Exchange, GitHub
- **Medical Research** from PubMed, ClinicalTrials.gov
- **Public Health Data** from CDC, WHO
- **Environmental Factors** from weather, air quality, nutrition APIs
- **Real-time Updates** every 5 minutes with caching

## **🚫 What You DON'T Need**

- ❌ Reddit API registration
- ❌ Google OAuth setup
- ❌ GitHub OAuth setup
- ❌ Any external API keys
- ❌ Manual API configuration

Your platform is now **100% self-contained** with **zero external dependencies**!
