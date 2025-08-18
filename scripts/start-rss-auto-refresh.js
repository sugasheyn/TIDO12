#!/usr/bin/env node

/**
 * RSS Auto-Refresh Starter Script
 * 
 * This script demonstrates how to start the RSS feed auto-refresh functionality.
 * In a production environment, this would typically be run as a background service.
 */

const { RSSFeedManager } = require('../lib/rss-feed-manager.ts');

async function main() {
  console.log('🚀 Starting RSS Feed Auto-Refresh Service...\n');
  
  try {
    // Create RSS feed manager instance
    const manager = new RSSFeedManager();
    
    // Start auto-refresh every hour (60 minutes)
    manager.startAutoRefresh(60);
    
    console.log('✅ RSS Auto-Refresh Service Started Successfully!');
    console.log('📡 Feeds will automatically refresh every 60 minutes');
    console.log('🔄 Initial refresh completed');
    console.log('\n📊 Current Status:');
    
    // Get and display status
    const status = manager.getComprehensiveStatus();
    console.log(`   • Total Feeds: ${status.feeds.total}`);
    console.log(`   • Active Feeds: ${status.feeds.active}`);
    console.log(`   • Error Feeds: ${status.feeds.error}`);
    console.log(`   • Cached Items: ${status.cache.totalItems}`);
    console.log(`   • Auto-Refresh: ${status.autoRefresh.isActive ? '🟢 Active' : '🔴 Inactive'}`);
    console.log(`   • Interval: ${status.autoRefresh.intervalMinutes} minutes`);
    
    console.log('\n💡 To stop the service, press Ctrl+C');
    console.log('📝 Check the console for refresh logs every hour');
    
    // Keep the process running
    process.on('SIGINT', () => {
      console.log('\n🛑 Stopping RSS Auto-Refresh Service...');
      manager.stopAutoRefresh();
      console.log('✅ Service stopped successfully');
      process.exit(0);
    });
    
    // Log status every 10 minutes for monitoring
    setInterval(() => {
      const currentStatus = manager.getAutoRefreshStatus();
      console.log(`\n📊 Status Update - ${new Date().toLocaleString()}`);
      console.log(`   • Auto-Refresh: ${currentStatus.isActive ? '🟢 Active' : '🔴 Inactive'}`);
      console.log(`   • Total Refreshes: ${currentStatus.totalAutoRefreshes}`);
      console.log(`   • Last Refresh: ${currentStatus.lastAutoRefresh ? currentStatus.lastAutoRefresh.toLocaleString() : 'Never'}`);
      if (currentStatus.nextScheduledRefresh) {
        console.log(`   • Next Refresh: ${currentStatus.nextScheduledRefresh.toLocaleString()}`);
      }
      if (currentStatus.lastError) {
        console.log(`   • Last Error: ${currentStatus.lastError}`);
      }
    }, 10 * 60 * 1000); // Every 10 minutes
    
  } catch (error) {
    console.error('❌ Failed to start RSS Auto-Refresh Service:', error);
    process.exit(1);
  }
}

// Run the main function
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main };
