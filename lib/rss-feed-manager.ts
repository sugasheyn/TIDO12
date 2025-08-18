// RSS Feed Manager for Diabetes Information Discovery
// Manages comprehensive Reddit RSS feeds and other public RSS sources

export interface RSSFeed {
  name: string;
  rss: string;
  json: string;
  category: 'diabetes' | 'medical' | 'research' | 'lifestyle' | 'technology' | 'regional' | 'general';
  priority: 'high' | 'medium' | 'low';
  lastFetched?: Date;
  status: 'active' | 'inactive' | 'error';
}

export interface RSSFeedContent {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: Date;
  source: string;
  category: string;
  url: string;
  engagement?: {
    upvotes: number;
    comments: number;
    score: number;
  };
  keywords: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface AutoRefreshStatus {
  isActive: boolean;
  intervalMinutes: number;
  lastAutoRefresh: Date | null;
  nextScheduledRefresh: Date | null;
  totalAutoRefreshes: number;
  lastError: string | null;
}

export class RSSFeedManager {
  private feeds: RSSFeed[] = [];
  private contentCache: Map<string, RSSFeedContent[]> = new Map();
  private fetchQueue: string[] = [];
  private isProcessing = false;
  
  // Auto-refresh functionality
  private autoRefreshInterval: NodeJS.Timeout | null = null;
  private autoRefreshStatus: AutoRefreshStatus = {
    isActive: false,
    intervalMinutes: 60, // Default: 1 hour
    lastAutoRefresh: null,
    nextScheduledRefresh: null,
    totalAutoRefreshes: 0,
    lastError: null
  };

  constructor() {
    this.initializeFeeds();
  }

  /**
   * Clean up invalid or problematic RSS feeds
   */
  private cleanupInvalidFeeds(): void {
    this.feeds = this.feeds.filter(feed => {
      // Remove feeds with empty URLs
      if (!feed.rss || feed.rss.trim() === '') {
        console.warn(`Removing feed "${feed.name}" - empty RSS URL`);
        return false;
      }
      
      // Remove feeds with malformed URLs
      try {
        new URL(feed.rss);
      } catch {
        console.warn(`Removing feed "${feed.name}" - invalid RSS URL: ${feed.rss}`);
        return false;
      }
      
      // Remove feeds with empty JSON URLs (for Reddit feeds)
      if (feed.json && feed.json.trim() !== '') {
        try {
          new URL(feed.json);
        } catch {
          console.warn(`Removing feed "${feed.name}" - invalid JSON URL: ${feed.json}`);
          return false;
        }
      }
      
      return true;
    });
  }

  /**
   * Initialize feeds with validation
   */
  private initializeFeeds(): void {
    // ===== HIGH PRIORITY - CORE DIABETES COMMUNITIES =====
    this.feeds.push(
      { name: 'r/Type1Diabetes', rss: 'https://www.reddit.com/r/Type1Diabetes/.rss', json: 'https://www.reddit.com/r/Type1Diabetes.json', category: 'diabetes', priority: 'high', status: 'active' },
      { name: 'r/diabetes', rss: 'https://www.reddit.com/r/diabetes/.rss', json: 'https://www.reddit.com/r/diabetes.json', category: 'diabetes', priority: 'high', status: 'active' },
      { name: 'r/diabetes_t1', rss: 'https://www.reddit.com/r/diabetes_t1/.rss', json: 'https://www.reddit.com/r/diabetes_t1.json', category: 'diabetes', priority: 'high', status: 'active' },
      { name: 'r/diabetes_t2', rss: 'https://www.reddit.com/r/diabetes_t2/.rss', json: 'https://www.reddit.com/r/diabetes_t2.json', category: 'diabetes', priority: 'high', status: 'active' },
      { name: 'r/diabetes_t1_tech', rss: 'https://www.reddit.com/r/diabetes_t1_tech/.rss', json: 'https://www.reddit.com/r/diabetes_t1_tech.json', category: 'technology', priority: 'high', status: 'active' },
      { name: 'r/diabetes_t2_tech', rss: 'https://www.reddit.com/r/diabetes_t2_tech/.rss', json: 'https://www.reddit.com/r/diabetes_t2_tech.json', category: 'technology', priority: 'high', status: 'active' }
    );

    // ===== HIGH PRIORITY - DEVICE COMMUNITIES =====
    this.feeds.push(
      { name: 'r/dexcom', rss: 'https://www.reddit.com/r/dexcom/.rss', json: 'https://www.reddit.com/r/dexcom.json', category: 'technology', priority: 'high', status: 'active' },
      { name: 'r/Freestylelibre', rss: 'https://www.reddit.com/r/Freestylelibre/.rss', json: 'https://www.reddit.com/r/Freestylelibre.json', category: 'technology', priority: 'high', status: 'active' },
      { name: 'r/Omnipod', rss: 'https://www.reddit.com/r/Omnipod/.rss', json: 'https://www.reddit.com/r/Omnipod.json', category: 'technology', priority: 'high', status: 'active' },
      { name: 'r/insulinpumps', rss: 'https://www.reddit.com/r/insulinpumps/.rss', json: 'https://www.reddit.com/r/insulinpumps.json', category: 'technology', priority: 'high', status: 'active' },
      { name: 'r/CGM', rss: 'https://www.reddit.com/r/CGM/.rss', json: 'https://www.reddit.com/r/CGM.json', category: 'technology', priority: 'high', status: 'active' },
      { name: 'r/Looped', rss: 'https://www.reddit.com/r/Looped/.rss', json: 'https://www.reddit.com/r/Looped.json', category: 'technology', priority: 'high', status: 'active' },
      { name: 'r/OpenAPS', rss: 'https://www.reddit.com/r/OpenAPS/.rss', json: 'https://www.reddit.com/r/OpenAPS.json', category: 'technology', priority: 'high', status: 'active' },
      { name: 'r/Nightscout', rss: 'https://www.reddit.com/r/Nightscout/.rss', json: 'https://www.reddit.com/r/Nightscout.json', category: 'technology', priority: 'high', status: 'active' }
    );

    // ===== HIGH PRIORITY - LIFESTYLE & DIET =====
    this.feeds.push(
      { name: 'r/LowCarbDiabetic', rss: 'https://www.reddit.com/r/LowCarbDiabetic/.rss', json: 'https://www.reddit.com/r/LowCarbDiabetic.json', category: 'lifestyle', priority: 'high', status: 'active' },
      { name: 'r/KetoDiabetes', rss: 'https://www.reddit.com/r/KetoDiabetes/.rss', json: 'https://www.reddit.com/r/KetoDiabetes.json', category: 'lifestyle', priority: 'high', status: 'active' },
      { name: 'r/PlantBasedDiabetes', rss: 'https://www.reddit.com/r/PlantBasedDiabetes/.rss', json: 'https://www.reddit.com/r/PlantBasedDiabetes.json', category: 'lifestyle', priority: 'high', status: 'active' },
      { name: 'r/diabetesrecipes', rss: 'https://www.reddit.com/r/diabetesrecipes/.rss', json: 'https://www.reddit.com/r/diabetesrecipes.json', category: 'lifestyle', priority: 'high', status: 'active' },
      { name: 'r/diabetesfitness', rss: 'https://www.reddit.com/r/diabetesfitness/.rss', json: 'https://www.reddit.com/r/diabetesfitness.json', category: 'lifestyle', priority: 'high', status: 'active' }
    );

    // ===== HIGH PRIORITY - MANUFACTURER NEWS =====
    this.feeds.push(
      { name: 'Dexcom Newsroom', rss: 'https://www.dexcom.com/newsroom/rss', json: '', category: 'technology', priority: 'high', status: 'active' },
      { name: 'Omnipod RSS', rss: 'https://www.omnipod.com/rss', json: '', category: 'technology', priority: 'high', status: 'active' },
      { name: 'Medtronic Diabetes Blog', rss: 'https://www.medtronicdiabetes.com/blog/feed', json: '', category: 'technology', priority: 'high', status: 'active' },
      { name: 'Tandem Diabetes RSS', rss: 'https://www.tandemdiabetes.com/rss', json: '', category: 'technology', priority: 'high', status: 'active' },
      { name: 'Abbott News RSS', rss: 'https://www.abbott.com/rss/news.xml', json: '', category: 'technology', priority: 'high', status: 'active' }
    );

    // Clean up any invalid feeds
    this.cleanupInvalidFeeds();
    
    console.log(`Initialized ${this.feeds.length} RSS feeds`);
  }

  // ===== AUTO-REFRESH FUNCTIONALITY =====
  
  /**
   * Start automatic RSS feed refreshing at the specified interval
   * @param intervalMinutes - Interval between refreshes (default: 60 minutes)
   */
  public startAutoRefresh(intervalMinutes: number = 60): void {
    if (this.autoRefreshStatus.isActive) {
      console.log('Auto-refresh is already active');
      return;
    }

    // Stop any existing interval
    this.stopAutoRefresh();

    // Set the interval
    this.autoRefreshStatus.intervalMinutes = intervalMinutes;
    this.autoRefreshStatus.isActive = true;
    this.autoRefreshStatus.nextScheduledRefresh = new Date(Date.now() + intervalMinutes * 60 * 1000);

    // Start the interval
    this.autoRefreshInterval = setInterval(async () => {
      await this.autoRefreshFeeds();
    }, intervalMinutes * 60 * 1000);

    // Perform initial refresh immediately
    this.autoRefreshFeeds();

    console.log(`Auto-refresh started: RSS feeds will refresh every ${intervalMinutes} minutes`);
  }

  /**
   * Stop automatic RSS feed refreshing
   */
  public stopAutoRefresh(): void {
    if (this.autoRefreshInterval) {
      clearInterval(this.autoRefreshInterval);
      this.autoRefreshInterval = null;
    }
    
    this.autoRefreshStatus.isActive = false;
    this.autoRefreshStatus.nextScheduledRefresh = null;
    
    console.log('Auto-refresh stopped');
  }

  /**
   * Get the current auto-refresh status
   */
  public getAutoRefreshStatus(): AutoRefreshStatus {
    return { ...this.autoRefreshStatus };
  }

  /**
   * Private method to handle automatic feed refreshing
   */
  private async autoRefreshFeeds(): Promise<void> {
    try {
      console.log(`🔄 Auto-refreshing RSS feeds at ${new Date().toLocaleString()}`);
      
      const startTime = Date.now();
      const content = await this.fetchAllFeeds();
      const endTime = Date.now();
      
      // Update status
      this.autoRefreshStatus.lastAutoRefresh = new Date();
      this.autoRefreshStatus.totalAutoRefreshes++;
      this.autoRefreshStatus.lastError = null;
      this.autoRefreshStatus.nextScheduledRefresh = new Date(Date.now() + this.autoRefreshStatus.intervalMinutes * 60 * 1000);
      
      console.log(`✅ Auto-refresh completed: ${content.length} items fetched in ${endTime - startTime}ms`);
      console.log(`📅 Next auto-refresh scheduled for: ${this.autoRefreshStatus.nextScheduledRefresh.toLocaleString()}`);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.autoRefreshStatus.lastError = errorMessage;
      console.error(`❌ Auto-refresh failed: ${errorMessage}`);
    }
  }

  public async fetchAllFeeds(): Promise<RSSFeedContent[]> {
    const allContent: RSSFeedContent[] = [];
    
    // Process feeds by priority
    const highPriority = this.feeds.filter(f => f.priority === 'high');
    const mediumPriority = this.feeds.filter(f => f.priority === 'medium');
    const lowPriority = this.feeds.filter(f => f.priority === 'low');

    // Fetch high priority feeds first
    for (const feed of highPriority) {
      try {
        const content = await this.fetchFeedWithRetry(feed);
        if (content.length > 0) {
          allContent.push(...content);
          this.contentCache.set(feed.name, content);
          feed.lastFetched = new Date();
          feed.status = 'active';
        }
      } catch (error) {
        console.error(`Error fetching ${feed.name}:`, error);
        feed.status = 'error';
      }
    }

    // Fetch medium priority feeds
    for (const feed of mediumPriority) {
      try {
        const content = await this.fetchFeedWithRetry(feed);
        if (content.length > 0) {
          allContent.push(...content);
          this.contentCache.set(feed.name, content);
          feed.lastFetched = new Date();
          feed.status = 'active';
        }
      } catch (error) {
        console.error(`Error fetching ${feed.name}:`, error);
        feed.status = 'error';
      }
    }

    // Fetch low priority feeds (if time permits)
    for (const feed of lowPriority) {
      try {
        const content = await this.fetchFeedWithRetry(feed);
        if (content.length > 0) {
          allContent.push(...content);
          this.contentCache.set(feed.name, content);
          feed.lastFetched = new Date();
          feed.status = 'active';
        }
      } catch (error) {
        console.error(`Error fetching ${feed.name}:`, error);
        feed.status = 'error';
      }
    }

    return allContent;
  }

  /**
   * Fetch content from a specific RSS feed
   */
  private async fetchFeed(feed: RSSFeed): Promise<RSSFeedContent[]> {
    try {
      // Validate RSS URL before attempting to fetch
      if (!feed.rss || feed.rss.trim() === '') {
        console.warn(`Skipping feed "${feed.name}" - empty or invalid RSS URL`);
        return [];
      }

      // Try JSON first (for Reddit feeds)
      if (feed.json && feed.json.trim() !== '') {
        try {
          const response = await fetch(feed.json);
          if (response.ok) {
            const data = await response.json();
            return this.parseRedditJSON(data, feed);
          }
        } catch (error) {
          console.log(`JSON fetch failed for ${feed.name}, trying RSS:`, error);
        }
      }

      // Try RSS/XML
      try {
        const response = await fetch(feed.rss);
        if (response.ok) {
          const text = await response.text();
          return this.parseRSSFeed(text, feed);
        }
      } catch (error) {
        console.error(`RSS fetch failed for ${feed.name}:`, error);
      }

      return [];
    } catch (error) {
      console.error(`Error fetching feed ${feed.name}:`, error);
      return [];
    }
  }

  /**
   * Parse Reddit JSON API response
   */
  private parseRedditJSON(data: any, feed: RSSFeed): RSSFeedContent[] {
    const posts: RSSFeedContent[] = [];
    
    if (data.data && data.data.children) {
      for (const child of data.data.children) {
        const post = child.data;
        if (post && post.title && post.selftext) {
          posts.push({
            id: post.id,
            title: post.title,
            content: post.selftext || post.title,
            author: post.author || 'anonymous',
            timestamp: new Date(post.created_utc * 1000),
            source: feed.name,
            category: feed.category,
            url: `https://reddit.com${post.permalink}`,
            engagement: {
              upvotes: post.ups || 0,
              comments: post.num_comments || 0,
              score: post.score || 0
            },
            keywords: this.extractKeywords(post.title + ' ' + post.selftext),
            sentiment: this.analyzeSentiment(post.title + ' ' + post.selftext)
          });
        }
      }
    }

    return posts;
  }

  /**
   * Parse RSS/XML feed content
   */
  private parseRSSFeed(xmlText: string, feed: RSSFeed): RSSFeedContent[] {
    try {
      // Use a simple regex-based parser for Node.js compatibility
      const items: RSSFeedContent[] = [];
      
      // Extract items using regex patterns
      const itemMatches = xmlText.match(/<item[^>]*>([\s\S]*?)<\/item>/gi);
      
      if (!itemMatches) {
        // Try alternative RSS format
        const entryMatches = xmlText.match(/<entry[^>]*>([\s\S]*?)<\/entry>/gi);
        if (entryMatches) {
          return this.parseAtomFeed(xmlText, feed);
        }
        return [];
      }

      for (const itemMatch of itemMatches.slice(0, 10)) { // Limit to 10 items
        try {
          const titleMatch = itemMatch.match(/<title[^>]*>([^<]*)<\/title>/i);
          const linkMatch = itemMatch.match(/<link[^>]*>([^<]*)<\/link>/i);
          const descriptionMatch = itemMatch.match(/<description[^>]*>([^<]*)<\/description>/i);
          const pubDateMatch = itemMatch.match(/<pubDate[^>]*>([^<]*)<\/pubDate>/i);
          const guidMatch = itemMatch.match(/<guid[^>]*>([^<]*)<\/guid>/i);

          if (titleMatch && titleMatch[1]) {
            const title = titleMatch[1].trim();
            const link = linkMatch ? linkMatch[1].trim() : '';
            const description = descriptionMatch ? descriptionMatch[1].trim() : '';
            
            // Safe date parsing
            let timestamp: Date;
            try {
              if (pubDateMatch && pubDateMatch[1]) {
                timestamp = new Date(pubDateMatch[1]);
                if (isNaN(timestamp.getTime())) {
                  timestamp = new Date();
                }
              } else {
                timestamp = new Date();
              }
            } catch (dateError) {
              timestamp = new Date();
            }

            items.push({
              id: guidMatch ? guidMatch[1].trim() : `rss_${Date.now()}_${Math.random()}`,
              title: title,
              content: description,
              author: 'RSS Feed',
              timestamp: timestamp,
              source: feed.name,
              category: feed.category,
              url: link,
              engagement: {
                upvotes: 0,
                comments: 0,
                score: 0
              },
              keywords: this.extractKeywords(title + ' ' + description),
              sentiment: this.analyzeSentiment(title + ' ' + description)
            });
          }
        } catch (itemError) {
          console.warn(`Error parsing RSS item in ${feed.name}:`, itemError);
          continue;
        }
      }

      return items;
    } catch (error) {
      console.error(`Error parsing RSS for ${feed.name}:`, error);
      return [];
    }
  }

  /**
   * Parse Atom feed format
   */
  private parseAtomFeed(xmlText: string, feed: RSSFeed): RSSFeedContent[] {
    try {
      const items: RSSFeedContent[] = [];
      
      // Extract entries using regex patterns
      const entryMatches = xmlText.match(/<entry[^>]*>([\s\S]*?)<\/entry>/gi);
      
      if (!entryMatches) return [];

      for (const entryMatch of entryMatches.slice(0, 10)) {
        try {
          const titleMatch = entryMatch.match(/<title[^>]*>([^<]*)<\/title>/i);
          const linkMatch = entryMatch.match(/<link[^>]*href="([^"]*)"/i);
          const summaryMatch = entryMatch.match(/<summary[^>]*>([^<]*)<\/summary>/i);
          const updatedMatch = entryMatch.match(/<updated[^>]*>([^<]*)<\/updated>/i);
          const idMatch = entryMatch.match(/<id[^>]*>([^<]*)<\/id>/i);

          if (titleMatch && titleMatch[1]) {
            const title = titleMatch[1].trim();
            const link = linkMatch ? linkMatch[1].trim() : '';
            const summary = summaryMatch ? summaryMatch[1].trim() : '';
            
            // Safe date parsing
            let timestamp: Date;
            try {
              if (updatedMatch && updatedMatch[1]) {
                timestamp = new Date(updatedMatch[1]);
                if (isNaN(timestamp.getTime())) {
                  timestamp = new Date();
                }
              } else {
                timestamp = new Date();
              }
            } catch (dateError) {
              timestamp = new Date();
            }

            items.push({
              id: idMatch ? idMatch[1].trim() : `atom_${Date.now()}_${Math.random()}`,
              title: title,
              content: summary,
              author: 'Atom Feed',
              timestamp: timestamp,
              source: feed.name,
              category: feed.category,
              url: link,
              engagement: {
                upvotes: 0,
                comments: 0,
                score: 0
              },
              keywords: this.extractKeywords(title + ' ' + summary),
              sentiment: this.analyzeSentiment(title + ' ' + summary)
            });
          }
        } catch (itemError) {
          console.warn(`Error parsing Atom entry in ${feed.name}:`, itemError);
          continue;
        }
      }

      return items;
    } catch (error) {
      console.error(`Error parsing Atom feed for ${feed.name}:`, error);
      return [];
    }
  }

  /**
   * Extract keywords from text content
   */
  private extractKeywords(text: string): string[] {
    if (!text) return [];
    
    // Simple keyword extraction - in production, you'd use NLP libraries
    const commonKeywords = [
      'diabetes', 'glucose', 'insulin', 'cgm', 'pump', 'monitoring',
      'type 1', 'type 2', 'blood sugar', 'a1c', 'keto', 'low carb',
      'exercise', 'diet', 'medication', 'technology', 'research'
    ];
    
    const textLower = text.toLowerCase();
    return commonKeywords.filter(keyword => textLower.includes(keyword));
  }

  /**
   * Analyze sentiment of text content
   */
  private analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
    if (!text) return 'neutral';
    
    // Simple sentiment analysis - in production, you'd use NLP libraries
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'helpful', 'improved', 'better', 'success', 'happy'];
    const negativeWords = ['bad', 'terrible', 'awful', 'problem', 'issue', 'difficult', 'pain', 'sad', 'angry'];
    
    const textLower = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => textLower.includes(word)).length;
    const negativeCount = negativeWords.filter(word => textLower.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  /**
   * Generate a unique ID for content
   */
  private generateId(text: string): string {
    return `rss_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  public getFeedsByCategory(category: string): RSSFeed[] {
    return this.feeds.filter(feed => feed.category === category);
  }

  public getFeedsByPriority(priority: string): RSSFeed[] {
    return this.feeds.filter(feed => feed.priority === priority);
  }

  public getFeedStatus(): { total: number; active: number; error: number; lastUpdated: Date | null } {
    const total = this.feeds.length;
    const active = this.feeds.filter(f => f.status === 'active').length;
    const error = this.feeds.filter(f => f.status === 'error').length;
    const lastUpdated = this.feeds.reduce((latest, feed) => {
      if (feed.lastFetched && (!latest || feed.lastFetched > latest)) {
        return feed.lastFetched;
      }
      return latest;
    }, null as Date | null);

    return { total, active, error, lastUpdated };
  }

  public getCachedContent(feedName: string): RSSFeedContent[] {
    return this.contentCache.get(feedName) || [];
  }

  /**
   * Get all cached content from all feeds
   */
  public getAllCachedContent(): RSSFeedContent[] {
    const allContent: RSSFeedContent[] = [];
    
    for (const [feedName, content] of this.contentCache.entries()) {
      if (content && Array.isArray(content)) {
        allContent.push(...content);
      }
    }
    
    // Sort by timestamp (newest first)
    return allContent.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * Get cached content for a specific feed
   */
  public getFeedContent(feedName: string): RSSFeedContent[] {
    return this.contentCache.get(feedName) || [];
  }

  public clearCache(): void {
    this.contentCache.clear();
  }

  public async refreshFeed(feedName: string): Promise<RSSFeedContent[]> {
    const feed = this.feeds.find(f => f.name === feedName);
    if (!feed) {
      throw new Error(`Feed ${feedName} not found`);
    }

    const content = await this.fetchFeed(feed);
    if (content.length > 0) {
      this.contentCache.set(feedName, content);
      feed.lastFetched = new Date();
      feed.status = 'active';
    }

    return content;
  }

  /**
   * Get comprehensive status including auto-refresh information
   */
  public getComprehensiveStatus(): {
    feeds: { total: number; active: number; error: number; lastUpdated: Date | null };
    autoRefresh: AutoRefreshStatus;
    cache: { totalFeeds: number; totalItems: number };
  } {
    const feedStatus = this.getFeedStatus();
    const autoRefreshStatus = this.getAutoRefreshStatus();
    
    // Calculate cache statistics
    let totalItems = 0;
    for (const content of this.contentCache.values()) {
      totalItems += content.length;
    }

    return {
      feeds: feedStatus,
      autoRefresh: autoRefreshStatus,
      cache: {
        totalFeeds: this.contentCache.size,
        totalItems
      }
    };
  }

  /**
   * Search cached content by keywords
   */
  public searchContent(query: string, category?: string): RSSFeedContent[] {
    const allContent = this.getAllCachedContent();
    const queryLower = query.toLowerCase();
    
    return allContent.filter(item => {
      // Filter by category if specified
      if (category && item.category !== category) {
        return false;
      }
      
      // Search in title, content, and keywords
      const searchableText = [
        item.title,
        item.content,
        ...item.keywords
      ].join(' ').toLowerCase();
      
      return searchableText.includes(queryLower);
    });
  }

  /**
   * Get content by category with optional limit
   */
  public getContentByCategory(category: string, limit?: number): RSSFeedContent[] {
    const allContent = this.getAllCachedContent();
    const filtered = allContent.filter(item => item.category === category);
    
    if (limit) {
      return filtered.slice(0, limit);
    }
    
    return filtered;
  }

  /**
   * Get trending topics from cached content
   */
  public getTrendingTopics(limit: number = 10): { topic: string; count: number; sentiment: 'positive' | 'negative' | 'neutral' }[] {
    const allContent = this.getAllCachedContent();
    const topicCounts = new Map<string, { count: number; positive: number; negative: number; neutral: number }>();
    
    allContent.forEach(item => {
      item.keywords.forEach(keyword => {
        const topic = keyword.toLowerCase();
        const current = topicCounts.get(topic) || { count: 0, positive: 0, negative: 0, neutral: 0 };
        
        current.count++;
        if (item.sentiment === 'positive') current.positive++;
        else if (item.sentiment === 'negative') current.negative++;
        else current.neutral++;
        
        topicCounts.set(topic, current);
      });
    });
    
    // Convert to array and sort by count
    const topics = Array.from(topicCounts.entries()).map(([topic, stats]) => {
      let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
      if (stats.positive > stats.negative && stats.positive > stats.neutral) sentiment = 'positive';
      else if (stats.negative > stats.positive && stats.negative > stats.neutral) sentiment = 'negative';
      
      return {
        topic,
        count: stats.count,
        sentiment
      };
    });
    
    return topics
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  /**
   * Get content statistics for analytics
   */
  public getContentStats(): {
    totalItems: number;
    byCategory: Record<string, number>;
    bySource: Record<string, number>;
    bySentiment: Record<string, number>;
    recentActivity: { date: string; count: number }[];
  } {
    const allContent = this.getAllCachedContent();
    
    // Category breakdown
    const byCategory: Record<string, number> = {};
    const bySource: Record<string, number> = {};
    const bySentiment: Record<string, number> = {};
    
    allContent.forEach(item => {
      byCategory[item.category] = (byCategory[item.category] || 0) + 1;
      bySource[item.source] = (bySource[item.source] || 0) + 1;
      bySentiment[item.sentiment] = (bySentiment[item.sentiment] || 0) + 1;
    });
    
    // Recent activity (last 7 days)
    const recentActivity: { date: string; count: number }[] = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      const count = allContent.filter(item => 
        item.timestamp.toISOString().split('T')[0] === dateStr
      ).length;
      
      recentActivity.push({ date: dateStr, count });
    }
    
    return {
      totalItems: allContent.length,
      byCategory,
      bySource,
      bySentiment,
      recentActivity
    };
  }

  /**
   * Validate and test RSS feed URLs
   */
  public async validateFeed(feed: RSSFeed): Promise<{ isValid: boolean; error?: string; testContent?: RSSFeedContent[] }> {
    try {
      if (!feed.rss || feed.rss.trim() === '') {
        return { isValid: false, error: 'Empty RSS URL' };
      }
      
      // Test URL format
      try {
        new URL(feed.rss);
      } catch {
        return { isValid: false, error: 'Invalid URL format' };
      }
      
      // Test fetch
      const response = await fetch(feed.rss);
      if (!response.ok) {
        return { isValid: false, error: `HTTP ${response.status}: ${response.statusText}` };
      }
      
      // Test parsing
      const text = await response.text();
      const testContent = this.parseRSSFeed(text, feed);
      
      if (testContent.length === 0) {
        return { isValid: false, error: 'No content could be parsed from feed' };
      }
      
      return { isValid: true, testContent };
    } catch (error) {
      return { isValid: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Get comprehensive feed health status
   */
  public getFeedHealthStatus(): {
    totalFeeds: number;
    healthyFeeds: number;
    problematicFeeds: number;
    lastRefresh: Date | null;
    errorRate: number;
    recommendations: string[];
  } {
    const totalFeeds = this.feeds.length;
    const healthyFeeds = this.feeds.filter(feed => feed.status === 'active').length;
    const problematicFeeds = this.feeds.filter(feed => feed.status === 'error').length;
    
    // Calculate error rate
    const errorRate = totalFeeds > 0 ? (problematicFeeds / totalFeeds) * 100 : 0;
    
    // Generate recommendations
    const recommendations: string[] = [];
    if (errorRate > 20) {
      recommendations.push('High error rate detected. Consider reviewing problematic RSS feeds.');
    }
    if (problematicFeeds > 0) {
      recommendations.push(`${problematicFeeds} feeds have errors. Check feed URLs and accessibility.`);
    }
    if (this.autoRefreshStatus.lastError) {
      recommendations.push('Auto-refresh encountered errors. Check network connectivity and feed availability.');
    }
    
    return {
      totalFeeds,
      healthyFeeds,
      problematicFeeds,
      lastRefresh: this.autoRefreshStatus.lastAutoRefresh,
      errorRate: Math.round(errorRate * 100) / 100,
      recommendations
    };
  }

  /**
   * Remove duplicate content based on title similarity
   */
  private removeDuplicateContent(content: RSSFeedContent[]): RSSFeedContent[] {
    const seen = new Set<string>();
    const uniqueContent: RSSFeedContent[] = [];
    
    for (const item of content) {
      // Create a normalized key for deduplication
      const normalizedTitle = this.normalizeText(item.title);
      const normalizedContent = this.normalizeText(item.content);
      const key = `${normalizedTitle}_${normalizedContent.substring(0, 100)}`;
      
      if (!seen.has(key)) {
        seen.add(key);
        uniqueContent.push(item);
      }
    }
    
    return uniqueContent;
  }

  /**
   * Normalize text for better deduplication
   */
  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove punctuation
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  }

  /**
   * Enhanced content fetching with better error handling
   */
  private async fetchFeedWithRetry(feed: RSSFeed, maxRetries: number = 3): Promise<RSSFeedContent[]> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const content = await this.fetchFeed(feed);
        
        // Update feed status on success
        if (content.length > 0) {
          feed.status = 'active';
          feed.lastFetched = new Date();
        }
        
        return content;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        console.warn(`Attempt ${attempt} failed for feed "${feed.name}":`, lastError.message);
        
        if (attempt < maxRetries) {
          // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)));
        }
      }
    }
    
    // Mark feed as problematic after all retries fail
    feed.status = 'error';
    console.error(`All attempts failed for feed "${feed.name}":`, lastError);
    
    return [];
  }
}
