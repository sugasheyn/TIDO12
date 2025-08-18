"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FileText, Shield, Users, Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
            <p className="text-gray-600 mt-1">
              Our terms and conditions for using the platform
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
                <FileText className="h-5 w-5 text-blue-600" />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using T1D Discovery Hub, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-600" />
                Description of Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  T1D Discovery Hub is a comprehensive platform designed to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Provide AI-powered insights and discoveries related to Type 1 Diabetes</li>
                  <li>Connect users with global diabetes research and community resources</li>
                  <li>Offer personalized health recommendations and pattern analysis</li>
                  <li>Facilitate community engagement and knowledge sharing</li>
                  <li>Support research participation and data contribution</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                User Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Account Management</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Maintain accurate and up-to-date account information</li>
                    <li>Protect your login credentials and account security</li>
                    <li>Notify us immediately of any unauthorized access</li>
                    <li>Use the platform in compliance with applicable laws</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Content & Behavior</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Provide accurate and truthful information</li>
                    <li>Respect other users and community guidelines</li>
                    <li>Not share harmful, misleading, or inappropriate content</li>
                    <li>Respect intellectual property rights</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                Privacy & Data Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Your privacy is important to us. Our data collection and usage practices are outlined in our Privacy Policy, 
                  which is incorporated into these Terms of Service.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-700 text-sm">
                    <strong>Key Points:</strong><br />
                    • We collect only necessary information to provide our services<br />
                    • Your health data is protected and anonymized for research<br />
                    • You control what information is shared and with whom<br />
                    • We never sell your personal information to third parties
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Platform Content</h3>
                  <p className="text-gray-700">
                    The platform, including its original content, features, and functionality, is owned by T1D Discovery Hub 
                    and is protected by international copyright, trademark, and other intellectual property laws.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">User Content</h3>
                  <p className="text-gray-700">
                    You retain ownership of content you submit to the platform. By submitting content, you grant us a 
                    non-exclusive, worldwide license to use, display, and distribute your content in connection with our services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card>
            <CardHeader>
              <CardTitle>Disclaimers & Limitations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Medical Information</h3>
                  <p className="text-gray-700">
                    The information provided on this platform is for educational and informational purposes only. 
                    It is not intended as medical advice and should not replace consultation with qualified healthcare professionals.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Service Availability</h3>
                  <p className="text-gray-700">
                    We strive to maintain high service availability but cannot guarantee uninterrupted access. 
                    The platform may be temporarily unavailable due to maintenance, updates, or technical issues.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Limitation of Liability</h3>
                  <p className="text-gray-700">
                    T1D Discovery Hub shall not be liable for any indirect, incidental, special, consequential, 
                    or punitive damages resulting from your use of the platform.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle>Account Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Termination by User</h3>
                  <p className="text-gray-700">
                    You may terminate your account at any time by contacting our support team or using the account deletion 
                    feature in your settings.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Termination by Platform</h3>
                  <p className="text-gray-700">
                    We may terminate or suspend your account if you violate these terms, engage in fraudulent activity, 
                    or for other legitimate business reasons.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Data Retention</h3>
                  <p className="text-gray-700">
                    Upon account termination, we will delete or anonymize your personal data within 30 days, 
                    except where retention is required by law or for legitimate business purposes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We reserve the right to modify these terms at any time. We will notify users of significant changes 
                through email notifications or platform announcements. Your continued use of the platform after changes 
                constitutes acceptance of the updated terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Questions about these terms of service?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Email:</strong> legal@t1ddiscoveryhub.com<br />
                    <strong>Address:</strong> Legal Team, T1D Discovery Hub<br />
                    <strong>Response Time:</strong> Within 5 business days
                  </p>
                </div>
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
