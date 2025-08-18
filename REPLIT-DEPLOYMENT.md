# 🚀 T1D AI Platform - Replit Deployment Guide

## 📋 **Prerequisites**
- Replit account
- Basic understanding of Next.js
- Patience for the first build (can take 5-10 minutes)

## 🚀 **Quick Start (Recommended)**

### **1. Fork/Import to Replit**
1. Click "Fork" on this project
2. Or use Replit's "Import from GitHub" feature
3. Wait for the initial setup to complete

### **2. Automatic Setup**
- Replit will automatically detect the `.replit` configuration
- Dependencies will be installed automatically
- The platform will start on `npm run dev`

### **3. First Run**
- **First build**: 5-10 minutes (be patient!)
- **Subsequent builds**: 1-3 minutes
- **Development server**: Available on Replit's provided URL

## ⚙️ **Manual Setup (If Needed)**

### **1. Install Dependencies**
```bash
npm install
```

### **2. Set Environment Variables**
In Replit's "Secrets" tab, add:
```env
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_SECRET=optional
GITHUB_SECRET=optional
NEXT_PUBLIC_API_BASE_URL=/api
```

### **3. Start Development Server**
```bash
npm run dev
```

## 🔧 **Troubleshooting Common Issues**

### **Issue: Build Fails with Webpack Errors**
**Solution:**
```bash
# Clean build directory
rm -rf .next
# Clear npm cache
npm cache clean --force
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### **Issue: Port Already in Use**
**Solution:**
- Replit automatically handles port conflicts
- Check the console for the actual port being used
- The platform will run on Replit's provided URL

### **Issue: Memory Issues**
**Solution:**
- The platform includes automatic memory management
- RSS feeds are limited to 100 items per feed
- API timeouts prevent hanging requests

### **Issue: External API Failures**
**Solution:**
- Built-in retry logic with exponential backoff
- Automatic fallbacks for failed requests
- Health check endpoint at `/api/health`

## 📊 **Performance Optimizations**

### **Built-in Features:**
- ✅ **Error Boundaries**: Graceful error handling
- ✅ **Timeout Management**: 30-second request timeouts
- ✅ **Memory Management**: Content size limits
- ✅ **Retry Logic**: 3 attempts with exponential backoff
- ✅ **Health Monitoring**: `/api/health` endpoint
- ✅ **Batch Processing**: Controlled API concurrency

### **RSS Feed Management:**
- Auto-refresh every hour (configurable)
- Automatic error recovery
- Memory-efficient content storage
- Duplicate content removal

## 🌐 **Accessing Your Platform**

### **Development Mode:**
- URL: Provided by Replit
- Auto-reload on code changes
- Hot module replacement

### **Production Build:**
```bash
npm run build
npm start
```

## 🔒 **Security Considerations**

### **Environment Variables:**
- `NEXTAUTH_SECRET`: Change in production
- `GOOGLE_CLIENT_SECRET`: Optional for OAuth
- `GITHUB_SECRET`: Optional for OAuth

### **API Security:**
- Rate limiting on external API calls
- Request timeouts prevent abuse
- Input validation on all endpoints

## 📈 **Monitoring & Maintenance**

### **Health Checks:**
```bash
# Check platform status
curl /api/health

# Monitor RSS feeds
curl /api/rss-feeds?action=status
```

### **Performance Metrics:**
- Response time monitoring
- Memory usage tracking
- Error rate analysis
- Feed health status

## 🚨 **Emergency Procedures**

### **If Platform Becomes Unresponsive:**
1. Check `/api/health` endpoint
2. Restart the development server
3. Clear build cache: `rm -rf .next`
4. Check Replit's resource usage

### **If External APIs Fail:**
- Platform continues with cached data
- Automatic retry every 5 minutes
- Graceful degradation of features

## 📞 **Support**

### **Common Solutions:**
1. **Restart the repl**: Often fixes most issues
2. **Check console logs**: Detailed error information
3. **Verify environment variables**: In Replit's Secrets tab
4. **Monitor resource usage**: Replit's built-in tools

### **Getting Help:**
- Check the console for error messages
- Review the health check endpoint
- Monitor RSS feed status
- Check external API availability

## 🎯 **Success Indicators**

### **Platform is Working When:**
- ✅ Health check returns `"status": "healthy"`
- ✅ RSS feeds are updating automatically
- ✅ API endpoints respond within 5 seconds
- ✅ Memory usage stays stable
- ✅ No webpack errors in console

### **Performance Benchmarks:**
- **Build time**: < 10 minutes (first), < 3 minutes (subsequent)
- **API response**: < 5 seconds
- **Memory usage**: < 512MB
- **Uptime**: > 95%

---

## 🎉 **Congratulations!**

Your T1D AI Platform is now running on Replit with:
- 🛡️ **Robust error handling**
- ⚡ **Performance optimizations**
- 🔄 **Automatic recovery**
- 📊 **Health monitoring**
- 🚀 **Production-ready features**

The platform will automatically handle most issues and provide detailed feedback through the health check endpoints.
