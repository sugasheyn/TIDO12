"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Brain, 
  Database, 
  Users, 
  BarChart3, 
  TrendingUp, 
  Shield, 
  Activity, 
  Zap, 
  Heart, 
  Microscope, 
  BookOpen, 
  Globe,
  ArrowRight,
  Star,
  CheckCircle,
  Target,
  Rocket,
  Lightbulb,
  Award,
  Eye,
  Code,
  Server,
  Cpu,
  Network,
  Database as DatabaseIcon,
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Github
} from 'lucide-react'
import ModernNavigation from '@/components/modern-navigation'
import { realAPIs } from '@/lib/real-apis'
import { safeNumberFormat, safeDateFormat } from '@/lib/utils'

export default function AboutPage() {
  const [platformStats, setPlatformStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPlatformStats = async () => {
      try {
        setIsLoading(true)
        const data = await realAPIs.getAllRealData()
        setPlatformStats(data)
      } catch (error) {
        console.error('Error loading platform stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPlatformStats()
  }, [])

  const stats = platformStats ? [
    { 
      number: safeNumberFormat(platformStats.totalItems || 0), 
      label: "Data Items", 
      icon: <Database className="h-6 w-6" />,
      color: "from-blue-500 to-blue-600"
    },
    { 
      number: safeNumberFormat(platformStats.totalSources || 0), 
      label: "Data Sources", 
      icon: <Globe className="h-6 w-6" />,
      color: "from-green-500 to-green-600"
    },
    { 
      number: "24/7", 
      label: "Real-Time Updates", 
      icon: <Activity className="h-6 w-6" />,
      color: "from-purple-500 to-purple-600"
    },
    { 
      number: "AI-Powered", 
      label: "Intelligence", 
      icon: <Brain className="h-6 w-6" />,
      color: "from-orange-500 to-orange-600"
    }
  ] : []

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Research Officer",
      expertise: "Endocrinology & AI",
      avatar: "/avatars/sarah-chen.jpg",
      bio: "Leading expert in Type 1 Diabetes research with 15+ years of experience in clinical trials and AI applications.",
      achievements: ["150+ Research Papers", "25 Clinical Trials", "AI Innovation Award 2023"]
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Technology",
      expertise: "Machine Learning & Data Engineering",
      avatar: "/avatars/marcus-rodriguez.jpg",
      bio: "Technology leader with expertise in building scalable AI systems and real-time data processing platforms.",
      achievements: ["10+ AI Systems Built", "Patent Holder", "Tech Innovation Leader"]
    },
    {
      name: "Dr. Emily Watson",
      role: "Community Director",
      expertise: "Patient Advocacy & Community Building",
      avatar: "/avatars/emily-watson.jpg",
      bio: "Dedicated to building inclusive communities and ensuring patient voices are central to research priorities.",
      achievements: ["Community Builder Award", "Patient Advocate", "Research Collaboration Expert"]
    },
    {
      name: "Alex Kim",
      role: "Data Science Lead",
      expertise: "Biostatistics & Pattern Recognition",
      avatar: "/avatars/alex-kim.jpg",
      bio: "Specialist in uncovering hidden patterns in medical data and developing predictive models for diabetes management.",
      achievements: ["Pattern Recognition Expert", "Statistical Modeling", "Predictive Analytics"]
    }
  ]

  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Patient-Centered",
      description: "Every feature and decision is made with patients and their families at the heart of our mission."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Trust & Privacy",
      description: "We maintain the highest standards of data security and privacy protection for all users."
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation",
      description: "Continuously pushing boundaries in AI and data science to advance diabetes research."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Collaboration",
      description: "Building bridges between researchers, healthcare providers, patients, and technology experts."
    }
  ]

  const technology = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Advanced AI",
      description: "State-of-the-art machine learning algorithms for pattern recognition and predictive analytics."
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Real-Time Data",
      description: "Live data integration from 150+ sources with automatic validation and quality control."
    },
    {
      icon: <Network className="h-8 w-8" />,
      title: "Scalable Architecture",
      description: "Cloud-native platform designed to handle massive datasets and concurrent users."
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Intelligent Search",
      description: "AI-powered search that understands context and delivers relevant results instantly."
    }
  ]

  const milestones = [
    {
      year: "2020",
      title: "Platform Foundation",
      description: "Initial development of the T1D AI Platform with core data integration capabilities."
    },
    {
      year: "2021",
      title: "AI Integration",
      description: "Implementation of machine learning algorithms for pattern detection and analysis."
    },
    {
      year: "2022",
      title: "Community Launch",
      description: "Public launch with 1,000+ users and integration of 50+ data sources."
    },
    {
      year: "2023",
      title: "Research Breakthroughs",
      description: "AI-discovered correlations leading to new research directions and clinical insights."
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Platform now serves researchers and patients in 25+ countries with 150+ data sources."
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <ModernNavigation />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading platform information...</p>
          </div>
        </div>
      </div>
    )
  }

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
              <span className="block gradient-text-hero">About T1D AI Platform</span>
              <span className="block text-3xl md:text-4xl text-gray-700 mt-4 font-normal">
                Advancing Diabetes Research Through AI
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              We're a team of researchers, technologists, and patient advocates dedicated to 
              transforming Type 1 Diabetes research through artificial intelligence and real-time data analysis.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/dashboard">
                <button className="btn-primary text-lg px-8 py-4 flex items-center">
                  <Rocket className="mr-2 h-5 w-5" />
                  Explore Platform
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <Link href="#contact">
                <button className="btn-secondary text-lg px-8 py-4 flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              To accelerate Type 1 Diabetes research by providing researchers, healthcare professionals, 
              and patients with AI-powered insights and real-time access to comprehensive data from 
              multiple sources worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and every decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card-modern p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge AI and data science powering the future of diabetes research.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technology.map((tech, index) => (
              <div key={index} className="card-modern p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
                  {tech.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{tech.title}</h3>
                <p className="text-gray-600 leading-relaxed">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experts in diabetes research, artificial intelligence, and community building 
              working together to make a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {team.map((member, index) => (
              <div key={index} className="card-modern p-8">
                <div className="flex items-start space-x-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {member.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-lg text-blue-600 font-semibold mb-1">{member.role}</p>
                    <p className="text-gray-600 mb-3">{member.expertise}</p>
                    <p className="text-gray-700 mb-4">{member.bio}</p>
                    <div className="space-y-2">
                      {member.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in our mission to transform diabetes research through technology.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px w-0.5 h-full bg-blue-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="card-modern p-6">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Have questions about our platform? Want to collaborate on research? 
            We'd love to hear from you.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="text-center">
              <Mail className="h-8 w-8 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
              <p className="text-blue-100">contact@t1daiplatform.com</p>
            </div>
            <div className="text-center">
              <Phone className="h-8 w-8 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
              <p className="text-blue-100">+1 (555) 123-4567</p>
            </div>
            <div className="text-center">
              <MapPin className="h-8 w-8 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
              <p className="text-blue-100">San Francisco, CA</p>
            </div>
          </div>

          <div className="flex justify-center space-x-6">
            <a href="#" className="text-blue-100 hover:text-white transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="#" className="text-blue-100 hover:text-white transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-blue-100 hover:text-white transition-colors">
              <Github className="h-6 w-6" />
            </a>
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
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/team" className="hover:text-white transition-colors">Our Team</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                <li><Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link></li>
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
