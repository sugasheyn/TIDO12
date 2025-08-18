"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Shield, Lock, Eye, Database, Users, Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="text-gray-600 mt-1">
              How we protect and handle your data
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Our Commitment to Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                At T1D Discovery Hub, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This privacy policy explains how we collect, use, and safeguard your data when you use our platform.
              </p>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Email address and basic profile information</li>
                  <li>Diabetes type and diagnosis information (optional)</li>
                  <li>Location and timezone preferences</li>
                  <li>Platform usage and interaction data</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Health Data</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Glucose readings and diabetes management data (if uploaded)</li>
                  <li>Device information and settings</li>
                  <li>Research participation preferences</li>
                  <li>Community interaction data</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Data Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-600" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Platform Functionality</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Provide personalized diabetes insights and recommendations</li>
                    <li>Connect you with relevant research and community content</li>
                    <li>Improve our AI models and discovery algorithms</li>
                    <li>Send important updates and notifications</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Research & Development</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Contribute to diabetes research (with your consent)</li>
                    <li>Improve platform features and user experience</li>
                    <li>Develop new AI capabilities for diabetes management</li>
                    <li>Identify trends and patterns in diabetes care</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-red-600" />
                How We Protect Your Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Security Measures</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>End-to-end encryption for sensitive data</li>
                    <li>Regular security audits and updates</li>
                    <li>Secure cloud infrastructure with industry standards</li>
                    <li>Access controls and authentication protocols</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Data Anonymization</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Personal identifiers are removed for research purposes</li>
                    <li>Aggregated data is used for trend analysis</li>
                    <li>Individual privacy is maintained in all research</li>
                    <li>You control what data is shared for research</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-600" />
                Data Sharing & Third Parties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">We Do Not Sell Your Data</h3>
                  <p className="text-gray-700">
                    We will never sell, rent, or trade your personal information to third parties for marketing purposes.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Limited Sharing</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Research partners (with your explicit consent)</li>
                    <li>Service providers who help operate our platform</li>
                    <li>Legal requirements or safety concerns</li>
                    <li>Community features you choose to participate in</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-pink-600" />
                Your Rights & Choices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Control Your Data</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Access and review your personal information</li>
                    <li>Update or correct inaccurate data</li>
                    <li>Delete your account and associated data</li>
                    <li>Control notification preferences</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Privacy Settings</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Choose your privacy level (public, friends, private)</li>
                    <li>Opt in or out of research participation</li>
                    <li>Control data sharing preferences</li>
                    <li>Manage community visibility</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                Questions about our privacy policy or data practices?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  If you have any questions about this privacy policy or how we handle your data, 
                  please contact our privacy team:
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Email:</strong> privacy@t1ddiscoveryhub.com<br />
                    <strong>Address:</strong> Privacy Team, T1D Discovery Hub<br />
                    <strong>Response Time:</strong> Within 48 hours
                  </p>
                </div>
                
                <p className="text-gray-700 text-sm">
                  We regularly review and update this privacy policy to ensure it reflects our current practices 
                  and complies with applicable laws and regulations.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Last Updated */}
          <div className="text-center text-sm text-gray-500">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>Version: 1.0</p>
          </div>
        </div>
      </div>
    </div>
  )
}
