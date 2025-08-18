import { NextRequest, NextResponse } from 'next/server';
import { realAPIs } from '@/lib/real-apis';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const summary = searchParams.get('summary');
    const source = searchParams.get('source');

    if (summary === 'true') {
      // Return summary data
      const summaryData = await realAPIs.getRealTimeSummary();
      return NextResponse.json(summaryData);
    }

    if (source) {
      // Return data from specific source
      switch (source) {
        case 'hacker-news':
          const hackerNews = await realAPIs.getHackerNewsData();
          return NextResponse.json({ data: hackerNews });
        
        case 'github':
          const github = await realAPIs.getGitHubDiabetesData();
          return NextResponse.json({ data: github });
        
        case 'pubmed':
          const pubmed = await realAPIs.getPubMedDiabetesData();
          return NextResponse.json({ data: pubmed });
        
        case 'clinical-trials':
          const clinicalTrials = await realAPIs.getClinicalTrialsData();
          return NextResponse.json({ data: clinicalTrials });
        
        case 'reddit':
          const reddit = await realAPIs.getRedditDiabetesData();
          return NextResponse.json({ data: reddit });
        
        case 'fda':
          const fda = await realAPIs.getFDAMAUDEdata();
          return NextResponse.json({ data: fda });
        
        case 'rss':
          // Import RSS manager here to avoid circular dependencies
          const { RSSFeedManager } = await import('@/lib/rss-feed-manager');
          const rssManager = new RSSFeedManager();
          const rssData = await rssManager.getAllCachedContent();
          return NextResponse.json({ data: rssData });
        
        case 'all':
          const allData = await realAPIs.getAllRealData();
          return NextResponse.json({ data: allData });
        
        default:
          return NextResponse.json({ error: 'Invalid source specified' }, { status: 400 });
      }
    }

    // Return all data by default
    const allData = await realAPIs.getAllRealData();
    return NextResponse.json(allData);

  } catch (error) {
    console.error('Error in real-data API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch real data' },
      { status: 500 }
    );
  }
}
