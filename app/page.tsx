"use client"

import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Brain, Heart, Users, Sparkles, RefreshCw } from "lucide-react"
import { AIInsights } from "@/components/ai-insights"
import { ResearchTools } from "@/components/research-tools"
import { CGMInsights } from "@/components/cgm-insights"
import { PersonalizedHealth } from "@/components/personalized-health"
import { MegaDiscoveries } from "@/components/mega-discoveries"
import { Unaddressed } from "@/components/unaddressed"
import { JaebIntegration } from "@/components/jaeb-integration"
import { ComprehensiveIntegration } from "@/components/comprehensive-integration"
import { UnifiedInsights } from "@/components/unified-insights"
import { IntegratedDashboard } from "@/components/integrated-dashboard"
import { AdvancedPatterns } from "@/components/advanced-patterns"
import { CommunityHub } from "@/components/community-hub"
import { LiveFeed } from "@/components/live-feed"
import { ExpandedSources } from "@/components/expanded-sources"
import { Algorithms } from "@/components/algorithms"
import { useLiveData } from "@/hooks/use-live-data"
import { Button } from "@/components/ui/button"
import { UserProfile } from "@/components/auth/user-profile"
import Link from "next/link"
import { safeNumberFormat, safeDateFormat, safeTimeFormat, safeDateOnlyFormat } from "@/lib/utils";

export default function HomePage() {
  const { sources, loading, error, lastUpdated, refreshData } = useLiveData()

  // Safe access to sources array
  const sourcesCount = Array.isArray(sources) ? sources.length : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          {/* User Profile */}
          <div className="flex justify-end mb-4">
            <UserProfile />
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-space-grotesk">
                T1D Discovery Hub
              </h1>
              <p className="text-lg text-muted-foreground font-medium">Your Personal Diabetes Research Platform</p>
            </div>
          </div>

          <p className="text-xl text-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            Discover breakthrough insights, connect with the global T1D community, and optimize your diabetes management
            with AI-powered research from <span className="font-semibold text-primary">50,000+ sources worldwide</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <Badge variant="secondary" className="px-6 py-3 text-base bg-card border-2 border-primary/20">
              <Globe className="h-5 w-5 mr-3 text-primary" />
              <span className="font-semibold">127 Languages</span>
            </Badge>
            <Badge variant="secondary" className="px-6 py-3 text-base bg-card border-2 border-primary/20">
              <Users className="h-5 w-5 mr-3 text-primary" />
              <span className="font-semibold">{sourcesCount > 0 ? `${safeNumberFormat(sourcesCount)}+ Sources` : '50K+ Sources'}</span>
            </Badge>
            <Badge variant="secondary" className="px-6 py-3 text-base bg-card border-2 border-primary/20">
              <Brain className="h-5 w-5 mr-3 text-primary" />
              <span className="font-semibold">6K+ AI Models</span>
            </Badge>
            <Badge variant="secondary" className="px-6 py-3 text-base bg-card border-2 border-primary/20">
              <Sparkles className="h-5 w-5 mr-3 text-primary" />
              <span className="font-semibold">Real-time Insights</span>
            </Badge>
          </div>
          
          {/* Live Data Status */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshData} 
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Updating...' : 'Refresh Data'}
            </Button>
            {lastUpdated && (
              <span className="text-sm text-muted-foreground">
                Last updated: {safeTimeFormat(lastUpdated)}
              </span>
            )}
            {error && (
              <span className="text-sm text-red-500">
                Some data may be unavailable
              </span>
            )}
          </div>
        </div>

        <Tabs defaultValue="cgm-insights" className="space-y-8">
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-border/50">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-1 bg-transparent">
              <TabsTrigger value="cgm-insights" className="text-xs font-medium">
                🩸 CGM Hub
              </TabsTrigger>
              <TabsTrigger value="personalized-health" className="text-xs font-medium">
                💊 My Health
              </TabsTrigger>
              <TabsTrigger value="mega-discoveries" className="text-xs font-medium">
                🔬 Discoveries
              </TabsTrigger>
              <TabsTrigger value="unaddressed" className="text-xs font-medium">
                🆕 New Findings
              </TabsTrigger>
              <TabsTrigger value="jaeb" className="text-xs font-medium">
                📊 Clinical Data
              </TabsTrigger>
              <TabsTrigger value="comprehensive" className="text-xs font-medium">
                🌐 All Sources
              </TabsTrigger>
              <TabsTrigger value="unified" className="text-xs font-medium">
                🔗 Unified View
              </TabsTrigger>
              <TabsTrigger value="integrated" className="text-xs font-medium">
                📈 Dashboard
              </TabsTrigger>
              <TabsTrigger value="advanced" className="text-xs font-medium">
                🤖 AI Patterns
              </TabsTrigger>
              <TabsTrigger value="discoveries" className="text-xs font-medium">
                👥 Community
              </TabsTrigger>
              <TabsTrigger value="sources" className="text-xs font-medium">
                📡 Live Feed
              </TabsTrigger>
              <TabsTrigger value="expanded" className="text-xs font-medium">
                🌍 Global Data
              </TabsTrigger>
              <TabsTrigger value="insights" className="text-xs font-medium">
                💡 AI Insights
              </TabsTrigger>
              <TabsTrigger value="tools" className="text-xs font-medium">
                🔧 Research
              </TabsTrigger>
              <TabsTrigger value="algorithms" className="text-xs font-medium">
                ⚡ Methods
              </TabsTrigger>
                              <TabsTrigger value="ai-dashboard" className="text-xs font-medium">
                  🧠 AI Dashboard
                </TabsTrigger>
                            <TabsTrigger value="correlation-dashboard" className="text-xs font-medium">
              🔍 Correlation Dashboard
            </TabsTrigger>
                        <TabsTrigger value="rss-feed-dashboard" className="text-xs font-medium">
              📡 RSS Feeds
            </TabsTrigger>
            <TabsTrigger value="ai-discovery" className="text-xs font-medium">
              🧠 AI Discovery
            </TabsTrigger>
            <TabsTrigger value="public-data" className="text-xs font-medium">
              🌍 Public Data
            </TabsTrigger>
            <TabsTrigger value="real-data" className="text-xs font-medium">
              🔗 Real Data
            </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="cgm-insights" className="mt-8">
            <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/50">
              <CGMInsights />
            </div>
          </TabsContent>

          <TabsContent value="personalized-health" className="mt-8">
            <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/50">
              <PersonalizedHealth />
            </div>
          </TabsContent>

          <TabsContent value="mega-discoveries" className="mt-8">
            <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/50">
              <MegaDiscoveries />
            </div>
          </TabsContent>

          <TabsContent value="unaddressed" className="mt-8">
            <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/50">
              <Unaddressed />
            </div>
          </TabsContent>

          <TabsContent value="jaeb" className="mt-8">
            <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/50">
              <JaebIntegration />
            </div>
          </TabsContent>

          <TabsContent value="comprehensive" className="mt-8">
            <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/50">
              <ComprehensiveIntegration />
            </div>
          </TabsContent>

          <TabsContent value="unified" className="mt-8">
            <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/50">
              <UnifiedInsights />
            </div>
          </TabsContent>

          <TabsContent value="integrated" className="mt-8">
            <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/50">
              <IntegratedDashboard />
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="mt-8">
            <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/50">
              <AdvancedPatterns />
            </div>
          </TabsContent>

          <TabsContent value="discoveries" className="mt-8">
            <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/50">
              <CommunityHub />
            </div>
          </TabsContent>

          <TabsContent value="sources" className="mt-8">
            <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/50">
              <LiveFeed />
            </div>
          </TabsContent>

          <TabsContent value="expanded" className="mt-8">
            <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/50">
              <ExpandedSources />
            </div>
          </TabsContent>

          <TabsContent value="insights" className="mt-8">
            <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/50">
              <AIInsights />
            </div>
          </TabsContent>

          <TabsContent value="tools" className="mt-8">
            <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/50">
              <ResearchTools />
            </div>
          </TabsContent>

          <TabsContent value="algorithms" className="mt-8">
            <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/50">
              <Algorithms />
            </div>
          </TabsContent>

          <TabsContent value="ai-dashboard" className="mt-8">
            <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/50">
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-4">🧠 Advanced AI Dashboard</h3>
                <p className="text-gray-600 mb-6">
                  Explore neural networks, predictive analytics, and adaptive learning systems analyzing diabetes data.
                </p>
                <Button asChild>
                  <Link href="/ai-insights-dashboard">
                    Launch AI Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </TabsContent>

                      <TabsContent value="correlation-dashboard" className="mt-8">
              <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/50">
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold mb-4">🔍 Advanced Correlation Detection</h3>
                  <p className="text-gray-600 mb-6">
                    Discover emerging symptoms, social media correlations, and scientific insights using advanced AI research concepts.
                  </p>
                  <Button asChild>
                    <Link href="/advanced-correlation-dashboard">
                      Launch Correlation Dashboard
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rss-feed-dashboard" className="mt-8">
              <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/50">
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold mb-4">📡 RSS Feed Discovery</h3>
                  <p className="text-gray-600 mb-6">
                    Monitor and manage comprehensive Reddit RSS feeds for real-time diabetes information discovery from global communities.
                  </p>
                  <Button asChild>
                    <Link href="/rss-feed-dashboard">
                      Launch RSS Dashboard
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ai-discovery" className="mt-8">
              <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/50">
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold mb-4">🧠 Advanced AI Discovery Engine</h3>
                  <p className="text-gray-600 mb-6">
                    Cutting-edge AI modules for extracting insights, discovering patterns, assessing reliability, 
                    and generating hypotheses from diabetes community data and research.
                  </p>
                  <Button asChild>
                    <Link href="/advanced-ai-discovery-dashboard">
                      Launch AI Discovery Dashboard
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>

          <TabsContent value="public-data" className="mt-8">
            <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/50">
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-4">🌍 Public T1D Data Hub</h3>
                <p className="text-gray-600 mb-6">
                  Access real-time blood glucose and insulin data from public sources worldwide with AI-powered pattern analysis.
                </p>
                <Button asChild>
                  <Link href="/public-data">
                    Explore Public Data Hub
                  </Link>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="real-data" className="mt-8">
            <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/50">
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-4">🔗 Real Data Dashboard</h3>
                <p className="text-gray-600 mb-6">
                  Live data from verified sources including PubMed, ClinicalTrials.gov, GitHub, Reddit, and FDA MAUDE database.
                </p>
                <Button asChild>
                  <Link href="/real-data">
                    View Real Data Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
