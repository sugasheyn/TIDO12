"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Brain, 
  Database, 
  Users, 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Zap, 
  Heart, 
  Microscope, 
  BookOpen, 
  Globe,
  ArrowRight,
  Play,
  Star,
  CheckCircle,
  Target,
  Rocket,
  Lightbulb,
  Search,
  Filter,
  Calendar,
  Clock
} from 'lucide-react'
import ModernNavigation from '@/components/modern-navigation'

interface DashboardStat {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
  color: string
}

interface RecentActivity {
  id: string
  title: string
  description: string
  type: 'discovery' | 'data' | 'research' | 'community'
  timestamp: string
  icon: React.ReactNode
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStat[]>([
    {
      title: "Total Data Sources",
      value: "150+",
      change: "+12 this week",
      changeType: "positive",
      icon: <Database className="h-6 w-6" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "AI Discoveries",
      value: "2,847",
      change: "+156 this week",
      changeType: "positive",
      icon: <Brain className="h-6 w-6" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Patterns Detected",
      value: "1,234",
      change: "+89 this week",
      changeType: "positive",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Community Members",
      value: "5,678",
      change: "+234 this week",
      changeType: "positive",
      icon: <Users className="h-6 w-6" />,
      color: "from-orange-500 to-orange-600"
    }
  ])

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      title: 'New AI Pattern Discovered',
      description: 'AI detected a correlation between glucose levels and sleep patterns',
      type: 'discovery',
      timestamp: '2 hours ago',
      icon: <Brain className="h-4 w-4" />
    },
    {
      id: '2',
      title: 'RSS Feed Updated',
      description: '150+ new articles added from medical journals',
      type: 'data',
      timestamp: '4 hours ago',
      icon: <Database className="h-4 w-4" />
    },
    {
      id: '3',
      title: 'Research Paper Published',
      description: 'New study on Type 1 diabetes management strategies',
      type: 'research',
      timestamp: '6 hours ago',
      icon: <BookOpen className="h-4 w-4" />
    },
    {
      id: '4',
      title: 'Community Discussion',
      description: 'Active discussion on CGM technology advances',
      type: 'community',
      timestamp: '8 hours ago',
      icon: <Users className="h-4 w-4" />
    }
  ])

  const quickActions = [
    {
      title: "Explore Real Data",
      description: "Access live data from multiple sources",
      icon: <Database className="h-6 w-6" />,
      href: "/real-data",
      color: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      title: "View Discoveries",
      description: "See AI-generated insights and patterns",
      icon: <Brain className="h-6 w-6" />,
      href: "/discoveries",
      color: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      title: "Pattern Analysis",
      description: "Analyze correlations and trends",
      icon: <TrendingUp className="h-6 w-6" />,
      href: "/patterns",
      color: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      title: "Community Hub",
      description: "Connect with the diabetes community",
      icon: <Users className="h-6 w-6" />,
      href: "/community",
      color: "bg-gradient-to-br from-orange-500 to-orange-600"
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'discovery': return 'bg-purple-100 text-purple-800'
      case 'data': return 'bg-blue-100 text-blue-800'
      case 'research': return 'bg-green-100 text-green-800'
      case 'community': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'discovery': return 'Discovery'
      case 'data': return 'Data'
      case 'research': return 'Research'
      case 'community': return 'Community'
      default: return 'Other'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <ModernNavigation />
      
      {/* Dashboard Header */}
      <section className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Your Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Your AI-powered command center for diabetes research and discovery
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search discoveries, data, research..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <Filter className="h-5 w-5" />
                Filters
              </button>
              <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <Calendar className="h-5 w-5" />
                Date Range
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="card-modern p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white`}>
                    {stat.icon}
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 
                    stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600">{stat.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <div className="card-modern p-6 text-center group cursor-pointer hover:scale-105 transition-transform duration-300">
                  <div className={`w-16 h-16 ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {action.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                  <div className="flex items-center justify-center text-blue-600 font-medium group-hover:text-blue-700">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity and Insights */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="card-modern p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <Link href="/activity" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">
                          {activity.title}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(activity.type)}`}>
                          {getTypeLabel(activity.type)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {activity.description}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className="card-modern p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">AI Insights</h2>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-900">Pattern Detected</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    AI has identified a new correlation between exercise timing and glucose stability in Type 1 diabetes patients.
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-gray-900">Trend Analysis</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Research interest in CGM technology has increased 45% over the last quarter.
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <Zap className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-gray-900">Discovery Alert</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    New research suggests potential benefits of personalized insulin dosing algorithms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-modern p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Dive Deeper?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Explore our comprehensive tools and discover new insights in diabetes research.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/real-data">
                <button className="btn-primary text-lg px-8 py-4 flex items-center">
                  <Play className="mr-2 h-5 w-5" />
                  Explore Data
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <Link href="/discoveries">
                <button className="btn-secondary text-lg px-8 py-4 flex items-center">
                  <Brain className="mr-2 h-5 w-5" />
                  View Discoveries
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
