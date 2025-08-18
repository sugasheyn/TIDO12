# 📡 RSS Auto-Refresh System

## 🎯 Overview

The T1D AI Platform now includes **automatic RSS feed refreshing** that runs every hour to ensure your platform always has the latest content from 150+ diabetes information sources.

## ✨ Features

### **🔄 Automatic Hourly Refresh**
- **Interval**: Configurable refresh intervals (default: 60 minutes)
- **Smart Scheduling**: Automatically calculates next refresh time
- **Background Processing**: Runs independently of user interactions
- **Error Handling**: Graceful error recovery and logging

### **📊 Real-Time Monitoring**
- **Live Status**: Active/Inactive status with visual indicators
- **Performance Metrics**: Response times and success rates
- **Error Tracking**: Detailed error logging and reporting
- **Cache Statistics**: Real-time feed and content counts

### **🎛️ User Controls**
- **Start/Stop**: Manual control over auto-refresh service
- **Interval Configuration**: Adjustable refresh frequency
- **Manual Override**: Force refresh individual feeds or all feeds
- **Status Dashboard**: Comprehensive monitoring interface

## 🚀 Getting Started

### **1. Start Auto-Refresh Service**

#### **Option A: Using npm script (Recommended)**
```bash
npm run rss:auto-refresh
```

#### **Option B: Direct script execution**
```bash
node scripts/start-rss-auto-refresh.js
```

#### **Option C: Programmatic usage**
```typescript
import { RSSFeedManager } from '@/lib/rss-feed-manager';

const manager = new RSSFeedManager();

// Start auto-refresh every hour
manager.startAutoRefresh(60);

// Check status
const status = manager.getAutoRefreshStatus();
console.log('Auto-refresh active:', status.isActive);
```

### **2. Access the Dashboard**

Navigate to your RSS Feed Dashboard:
- **URL**: `/rss-feed-dashboard`
- **Main Platform**: Click "📡 RSS Feeds" tab

## 📱 Dashboard Interface

### **Auto-Refresh Status Card**
- **🟢 Active/🔴 Inactive** status indicator
- **Interval** display (currently 60 minutes)
- **Total Refreshes** counter
- **Last Refresh** timestamp
- **Next Scheduled** refresh time
- **Start/Stop** control buttons

### **Overview Cards**
- **Total Feeds**: 150+ configured RSS sources
- **Active Feeds**: Successfully fetching sources
- **Cached Items**: Total content items stored
- **Last Updated**: Most recent refresh timestamp

### **Feed Management Tabs**
- **By Category**: Diabetes, Technology, Research, Lifestyle, Medical, Regional
- **By Priority**: High, Medium, Low priority feeds
- **Individual Controls**: Refresh, test, and manage specific feeds

## 🔌 API Endpoints

### **GET `/api/rss-feeds`**

#### **Get Comprehensive Status**
```bash
GET /api/rss-feeds?action=status
```
Returns: feeds, auto-refresh status, and cache statistics

#### **Get Auto-Refresh Status**
```bash
GET /api/rss-feeds?action=auto-refresh-status
```
Returns: current auto-refresh configuration and status

#### **Start Auto-Refresh**
```bash
GET /api/rss-feeds?action=start-auto-refresh&interval=60
```
Returns: confirmation and updated status

#### **Stop Auto-Refresh**
```bash
GET /api/rss-feeds?action=stop-auto-refresh
```
Returns: confirmation and updated status

#### **Refresh All Feeds**
```bash
GET /api/rss-feeds?action=refresh-all
```
Returns: refresh results and updated timestamps

#### **Refresh Specific Feed**
```bash
GET /api/rss-feeds?action=refresh-feed&feed=r/Type1Diabetes
```
Returns: individual feed refresh results

### **POST `/api/rss-feeds`**

#### **Add New Feed**
```json
POST /api/rss-feeds
{
  "action": "add-feed",
  "feedName": "New Diabetes Blog",
  "category": "diabetes",
  "priority": "medium",
  "rss": "https://example.com/feed.xml",
  "json": "https://example.com/api/posts"
}
```

#### **Update Feed**
```json
POST /api/rss-feeds
{
  "action": "update-feed",
  "feedName": "r/Type1Diabetes",
  "priority": "high",
  "status": "active"
}
```

#### **Delete Feed**
```json
POST /api/rss-feeds
{
  "action": "delete-feed",
  "feedName": "Old Feed Name"
}
```

## ⚙️ Configuration

### **Default Settings**
- **Refresh Interval**: 60 minutes (1 hour)
- **Priority Order**: High → Medium → Low
- **Error Handling**: Automatic retry with exponential backoff
- **Logging**: Console output with timestamps

### **Customization Options**
```typescript
// Custom interval (e.g., every 30 minutes)
manager.startAutoRefresh(30);

// Custom interval (e.g., every 2 hours)
manager.startAutoRefresh(120);

// Stop auto-refresh
manager.stopAutoRefresh();

// Get current configuration
const config = manager.getAutoRefreshStatus();
```

## 📊 Monitoring & Logging

### **Console Output**
```
🚀 Starting RSS Feed Auto-Refresh Service...

✅ RSS Auto-Refresh Service Started Successfully!
📡 Feeds will automatically refresh every 60 minutes
🔄 Initial refresh completed

📊 Current Status:
   • Total Feeds: 150
   • Active Feeds: 145
   • Error Feeds: 5
   • Cached Items: 2847
   • Auto-Refresh: 🟢 Active
   • Interval: 60 minutes

💡 To stop the service, press Ctrl+C
📝 Check the console for refresh logs every hour
```

### **Status Updates (Every 10 minutes)**
```
📊 Status Update - 12/19/2023, 2:30:00 PM
   • Auto-Refresh: 🟢 Active
   • Total Refreshes: 24
   • Last Refresh: 12/19/2023, 1:30:00 PM
   • Next Refresh: 12/19/2023, 2:30:00 PM
```

### **Refresh Logs (Every hour)**
```
🔄 Auto-refreshing RSS feeds at 12/19/2023, 2:30:00 PM
✅ Auto-refresh completed: 2847 items fetched in 2341ms
📅 Next auto-refresh scheduled for: 12/19/2023, 3:30:00 PM
```

## 🛠️ Troubleshooting

### **Common Issues**

#### **Auto-refresh not starting**
- Check if another instance is running
- Verify Node.js version compatibility
- Check console for error messages

#### **Feeds not updating**
- Verify internet connectivity
- Check individual feed status in dashboard
- Review error logs for specific feed issues

#### **High memory usage**
- Monitor cache size in dashboard
- Consider reducing refresh frequency
- Implement cache cleanup if needed

### **Error Recovery**
- **Automatic**: System attempts to recover from temporary errors
- **Manual**: Use dashboard controls to restart specific feeds
- **Logs**: Check console output for detailed error information

## 🔄 Production Deployment

### **Background Service**
```bash
# Using PM2
pm2 start scripts/start-rss-auto-refresh.js --name "rss-auto-refresh"

# Using systemd
sudo systemctl enable rss-auto-refresh
sudo systemctl start rss-auto-refresh
```

### **Environment Variables**
```bash
# RSS Feed Configuration
RSS_REFRESH_INTERVAL=60
RSS_MAX_RETRIES=3
RSS_TIMEOUT=30000

# Logging
RSS_LOG_LEVEL=info
RSS_LOG_FILE=/var/log/rss-auto-refresh.log
```

### **Health Checks**
```bash
# Check service status
curl http://localhost:3000/api/rss-feeds?action=auto-refresh-status

# Monitor service health
curl http://localhost:3000/api/rss-feeds?action=status
```

## 📈 Performance Considerations

### **Resource Usage**
- **Memory**: ~50-100MB for feed manager
- **CPU**: Minimal during idle, spikes during refresh
- **Network**: Varies based on feed count and content size
- **Storage**: Cache size depends on content retention policy

### **Optimization Tips**
- **Batch Processing**: Feeds are processed in priority order
- **Caching**: Content is cached to reduce API calls
- **Rate Limiting**: Built-in request throttling
- **Error Isolation**: Individual feed failures don't affect others

## 🔮 Future Enhancements

### **Planned Features**
- **Machine Learning**: Smart refresh scheduling based on content patterns
- **Content Analytics**: Advanced content analysis and categorization
- **Integration APIs**: Webhook support for external systems
- **Mobile Notifications**: Push notifications for important updates

### **Customization Options**
- **Feed Groups**: Custom feed collections and schedules
- **Content Filters**: Advanced content filtering and processing
- **Export Options**: Data export in various formats
- **API Rate Limits**: Configurable API call limits

## 📞 Support

### **Getting Help**
- **Documentation**: Check this README and inline code comments
- **Dashboard**: Use the built-in monitoring and control interface
- **Logs**: Review console output for detailed information
- **API**: Test endpoints using the provided examples

### **Reporting Issues**
- **Error Details**: Include error messages and timestamps
- **System Info**: Node.js version, platform, and configuration
- **Reproduction Steps**: Clear steps to reproduce the issue
- **Expected Behavior**: What you expected vs. what happened

---

**🎉 Your RSS feeds will now automatically refresh every hour, keeping your platform updated with the latest diabetes information from around the world!**
