"use client"

import { useState } from 'react'
import Link from 'next/link'
import { 
  Brain, 
  Database, 
  Users, 
  BarChart3, 
  Globe, 
  TrendingUp, 
  Shield, 
  Activity, 
  Zap, 
  Heart, 
  Microscope, 
  BookOpen, 
  MessageSquare, 
  ArrowRight,
  Play,
  Star,
  CheckCircle,
  Lightbulb,
  Target,
  Rocket
} from 'lucide-react'
import ModernNavigation from '@/components/modern-navigation'

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Discovery",
      description: "Advanced machine learning algorithms uncover hidden patterns and insights in diabetes research data",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Real-Time Data",
      description: "Live data from 150+ sources including research papers, clinical trials, and community insights",
      color: "from-green-500 to-blue-600"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Pattern Recognition",
      description: "Identify correlations, trends, and anomalies across multiple data sources and time periods",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Insights",
      description: "Connect with researchers, patients, and healthcare professionals worldwide",
      color: "from-purple-500 to-pink-600"
    }
  ]

  const stats = [
    { number: "150+", label: "Data Sources", icon: <Globe className="h-6 w-6" /> },
    { number: "10K+", label: "Research Papers", icon: <BookOpen className="h-6 w-6" /> },
    { number: "5K+", label: "Clinical Trials", icon: <Shield className="h-6 w-6" /> },
    { number: "24/7", label: "Real-Time Updates", icon: <Activity className="h-6 w-6" /> }
  ]

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <ModernNavigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              <span className="block gradient-text-hero">T1D AI Platform</span>
              <span className="block text-3xl md:text-4xl text-gray-700 mt-4 font-normal">
                Intelligent Diabetes Discovery
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Advanced AI-powered platform for discovering, analyzing, and connecting diabetes research, 
              community insights, and real-time data from 150+ sources worldwide.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Link href="/real-data">
                <button className="btn-primary text-lg px-8 py-4 flex items-center">
                  <Play className="mr-2 h-5 w-5" />
                  Start Exploring
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

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-3 text-blue-600">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Powerful Features for Diabetes Research
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI technology with comprehensive data sources 
              to deliver actionable insights for diabetes research and management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="card-modern p-8 text-center hover:scale-105 transition-transform duration-300"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Get Started Today
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your path to discovery and start exploring the wealth of diabetes research data available.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <div className="card-modern p-8 text-center group cursor-pointer">
                  <div className={`w-16 h-16 ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {action.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{action.description}</p>
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

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose T1D AI Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another research platform. We're your AI-powered partner in diabetes discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
                <Target className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Precision Focused</h3>
              <p className="text-gray-600 leading-relaxed">
                Every feature is designed specifically for diabetes research, ensuring relevance and accuracy.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
                <Rocket className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                AI-powered search and analysis deliver insights in seconds, not hours or days.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
                <Lightbulb className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Enhanced</h3>
              <p className="text-gray-600 leading-relaxed">
                Machine learning algorithms continuously improve and discover new patterns automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Research?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join thousands of researchers, healthcare professionals, and patients who are already 
            discovering new insights with our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/dashboard">
              <button className="bg-white text-blue-600 text-lg px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center">
                <Star className="mr-2 h-5 w-5" />
                Start Free Trial
              </button>
            </Link>
            <Link href="/real-data">
              <button className="border-2 border-white text-white text-lg px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                Explore Data
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">T1D AI Platform</span>
              </div>
              <p className="text-gray-400">
                Advancing diabetes research through AI-powered discovery and data analysis.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/real-data" className="hover:text-white transition-colors">Data Dashboard</Link></li>
                <li><Link href="/discoveries" className="hover:text-white transition-colors">Discoveries</Link></li>
                <li><Link href="/patterns" className="hover:text-white transition-colors">Patterns</Link></li>
                <li><Link href="/analytics-dashboard" className="hover:text-white transition-colors">Analytics</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/research" className="hover:text-white transition-colors">Research</Link></li>
                <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/api" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 T1D AI Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
