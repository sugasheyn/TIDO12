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
      name: 'r/science',
      category: 'research',
      priority: 'low',
      status: 'active',
      lastFetched: new Date(),
      rss: 'https://www.reddit.com/r/science/.rss',
      json: 'https://www.reddit.com/r/science.json'
    }
  ]
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const category = searchParams.get('category');
    const priority = searchParams.get('priority');

    switch (action) {
      case 'status':
        return NextResponse.json({
          success: true,
          data: {
            total: mockRSSFeeds.total,
            active: mockRSSFeeds.active,
            error: mockRSSFeeds.error,
            lastUpdated: mockRSSFeeds.lastUpdated
          }
        });

      case 'feeds':
        let filteredFeeds = mockRSSFeeds.feeds;
        
        if (category) {
          filteredFeeds = filteredFeeds.filter(feed => feed.category === category);
        }
        
        if (priority) {
          filteredFeeds = filteredFeeds.filter(feed => feed.priority === priority);
        }

        return NextResponse.json({
          success: true,
          data: filteredFeeds
        });

      case 'refresh':
        // Simulate refreshing feeds
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return NextResponse.json({
          success: true,
          message: 'RSS feeds refreshed successfully',
          data: {
            lastUpdated: new Date(),
            refreshedFeeds: mockRSSFeeds.feeds.length
          }
        });

      default:
        return NextResponse.json({
          success: true,
          data: {
            status: {
              total: mockRSSFeeds.total,
              active: mockRSSFeeds.active,
              error: mockRSSFeeds.error,
              lastUpdated: mockRSSFeeds.lastUpdated
            },
            feeds: mockRSSFeeds.feeds.slice(0, 10) // Return first 10 feeds for overview
          }
        });
    }
  } catch (error) {
    console.error('Error in RSS feeds API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, feedName } = body;

    switch (action) {
      case 'refresh_feed':
        if (!feedName) {
          return NextResponse.json(
            { success: false, error: 'Feed name is required' },
            { status: 400 }
          );
        }

        // Simulate refreshing a specific feed
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return NextResponse.json({
          success: true,
          message: `Feed ${feedName} refreshed successfully`,
          data: {
            feedName,
            lastFetched: new Date(),
            status: 'active'
          }
        });

      case 'test_connection':
        if (!feedName) {
          return NextResponse.json(
            { success: false, error: 'Feed name is required' },
            { status: 400 }
          );
        }

        // Simulate testing connection
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return NextResponse.json({
          success: true,
          message: `Connection test completed for ${feedName}`,
          data: {
            feedName,
            connectionStatus: 'success',
            responseTime: Math.random() * 1000 + 100, // Random response time between 100-1100ms
            lastTested: new Date()
          }
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in RSS feeds POST API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
