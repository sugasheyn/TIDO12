import { NextRequest, NextResponse } from 'next/server';

// Mock RSS feed data for demonstration
const mockRSSFeeds = {
  total: 85,
  active: 78,
  error: 7,
  lastUpdated: new Date(Date.now() - 30 * 60 * 1000),
  feeds: [
    {
      name: 'r/Type1Diabetes',
      category: 'diabetes',
      priority: 'high',
      status: 'active',
      lastFetched: new Date(),
      rss: 'https://www.reddit.com/r/Type1Diabetes/.rss',
      json: 'https://www.reddit.com/r/Type1Diabetes.json'
    },
    {
      name: 'r/diabetes',
      category: 'diabetes',
      priority: 'high',
      status: 'active',
      lastFetched: new Date(),
      rss: 'https://www.reddit.com/r/diabetes/.rss',
      json: 'https://www.reddit.com/r/diabetes.json'
    },
    {
      name: 'r/dexcom',
      category: 'technology',
      priority: 'high',
      status: 'active',
      lastFetched: new Date(),
      rss: 'https://www.reddit.com/r/dexcom/.rss',
      json: 'https://www.reddit.com/r/dexcom.json'
    },
    {
      name: 'r/Freestylelibre',
      category: 'technology',
      priority: 'high',
      status: 'active',
      lastFetched: new Date(),
      rss: 'https://www.reddit.com/r/Freestylelibre/.rss',
      json: 'https://www.reddit.com/r/Freestylelibre.json'
    },
    {
      name: 'r/LowCarbDiabetic',
      category: 'lifestyle',
      priority: 'high',
      status: 'active',
      lastFetched: new Date(),
      rss: 'https://www.reddit.com/r/LowCarbDiabetic/.rss',
      json: 'https://www.reddit.com/r/LowCarbDiabetic.json'
    },
    {
      name: 'r/Endocrinology',
      category: 'medical',
      priority: 'medium',
      status: 'active',
      lastFetched: new Date(),
      rss: 'https://www.reddit.com/r/Endocrinology/.rss',
      json: 'https://www.reddit.com/r/Endocrinology.json'
    },
    {
      name: 'r/diabetesUK',
      category: 'regional',
      priority: 'medium',
      status: 'active',
      lastFetched: new Date(),
      rss: 'https://www.reddit.com/r/diabetesUK/.rss',
      json: 'https://www.reddit.com/r/diabetesUK.json'
    },
    {
      name: 'Google News T1D Spanish',
      category: 'regional',
      priority: 'low',
      status: 'active',
      lastFetched: new Date(),
      rss: 'https://news.google.com/rss/search?q=%22diabetes%20tipo%201%22&hl=es&gl=ES&ceid=ES:es',
      json: ''
    }
  ]
};

// Mock auto-refresh status
let mockAutoRefreshStatus = {
  isActive: false,
  intervalMinutes: 60,
  lastAutoRefresh: null as Date | null,
  nextScheduledRefresh: null as Date | null,
  totalAutoRefreshes: 0,
  lastError: null as string | null
};

// Mock cache stats
let mockCacheStats = {
  totalFeeds: 78,
  totalItems: 2847
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const category = searchParams.get('category');
  const priority = searchParams.get('priority');

  try {
    switch (action) {
      case 'status':
        return NextResponse.json({
          feeds: mockRSSFeeds,
          autoRefresh: mockAutoRefreshStatus,
          cache: mockCacheStats
        });

      case 'auto-refresh-status':
        return NextResponse.json(mockAutoRefreshStatus);

      case 'start-auto-refresh':
        const interval = parseInt(searchParams.get('interval') || '60');
        mockAutoRefreshStatus = {
          isActive: true,
          intervalMinutes: interval,
          lastAutoRefresh: new Date(),
          nextScheduledRefresh: new Date(Date.now() + interval * 60 * 1000),
          totalAutoRefreshes: mockAutoRefreshStatus.totalAutoRefreshes + 1,
          lastError: null
        };
        return NextResponse.json({ 
          success: true, 
          message: `Auto-refresh started with ${interval} minute interval`,
          status: mockAutoRefreshStatus
        });

      case 'stop-auto-refresh':
        mockAutoRefreshStatus = {
          ...mockAutoRefreshStatus,
          isActive: false,
          nextScheduledRefresh: null
        };
        return NextResponse.json({ 
          success: true, 
          message: 'Auto-refresh stopped',
          status: mockAutoRefreshStatus
        });

      case 'refresh-all':
        // Simulate refreshing all feeds
        mockRSSFeeds.lastUpdated = new Date();
        mockCacheStats.totalItems += Math.floor(Math.random() * 100) + 50; // Simulate new content
        return NextResponse.json({ 
          success: true, 
          message: 'All feeds refreshed successfully',
          lastUpdated: mockRSSFeeds.lastUpdated,
          newItems: mockCacheStats.totalItems
        });

      case 'refresh-feed':
        const feedName = searchParams.get('feed');
        if (!feedName) {
          return NextResponse.json({ error: 'Feed name is required' }, { status: 400 });
        }
        
        const feed = mockRSSFeeds.feeds.find(f => f.name === feedName);
        if (!feed) {
          return NextResponse.json({ error: 'Feed not found' }, { status: 404 });
        }
        
        feed.lastFetched = new Date();
        return NextResponse.json({ 
          success: true, 
          message: `Feed ${feedName} refreshed successfully`,
          feed
        });

      default:
        // Return filtered feeds based on category/priority
        let filteredFeeds = mockRSSFeeds.feeds;
        
        if (category) {
          filteredFeeds = filteredFeeds.filter(feed => feed.category === category);
        }
        
        if (priority) {
          filteredFeeds = filteredFeeds.filter(feed => feed.priority === priority);
        }

        return NextResponse.json({
          ...mockRSSFeeds,
          feeds: filteredFeeds
        });
    }
  } catch (error) {
    console.error('RSS Feeds API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, feedName, category, priority, status } = body;

    switch (action) {
      case 'add-feed':
        const newFeed = {
          name: feedName,
          category: category || 'general',
          priority: priority || 'medium',
          status: status || 'active',
          lastFetched: new Date(),
          rss: body.rss || '',
          json: body.json || ''
        };
        
        mockRSSFeeds.feeds.push(newFeed);
        mockRSSFeeds.total += 1;
        mockRSSFeeds.active += 1;
        
        return NextResponse.json({ 
          success: true, 
          message: 'Feed added successfully',
          feed: newFeed
        });

      case 'update-feed':
        const feedIndex = mockRSSFeeds.feeds.findIndex(f => f.name === feedName);
        if (feedIndex === -1) {
          return NextResponse.json({ error: 'Feed not found' }, { status: 404 });
        }
        
        mockRSSFeeds.feeds[feedIndex] = { ...mockRSSFeeds.feeds[feedIndex], ...body };
        return NextResponse.json({ 
          success: true, 
          message: 'Feed updated successfully',
          feed: mockRSSFeeds.feeds[feedIndex]
        });

      case 'delete-feed':
        const deleteIndex = mockRSSFeeds.feeds.findIndex(f => f.name === feedName);
        if (deleteIndex === -1) {
          return NextResponse.json({ error: 'Feed not found' }, { status: 404 });
        }
        
        const deletedFeed = mockRSSFeeds.feeds.splice(deleteIndex, 1)[0];
        mockRSSFeeds.total -= 1;
        if (deletedFeed.status === 'active') {
          mockRSSFeeds.active -= 1;
        }
        
        return NextResponse.json({ 
          success: true, 
          message: 'Feed deleted successfully',
          deletedFeed
        });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('RSS Feeds API POST Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
