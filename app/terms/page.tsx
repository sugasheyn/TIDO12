"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Users, Heart, FileText } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Platform
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Introduction */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-600" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Welcome to the T1D AI Platform ("Platform"), a comprehensive research and monitoring system designed to serve the Type 1 diabetes community. These Terms of Service ("Terms") govern your use of our platform and services.
              </p>
              <p className="text-gray-700">
                By accessing or using the Platform, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access the Platform.
              </p>
            </CardContent>
          </Card>

          {/* Platform Description */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-600" />
                Platform Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                The T1D AI Platform provides:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Real-time monitoring of 50,000+ global T1D research sources</li>
                <li>AI-powered pattern detection and insights</li>
                <li>Community engagement and knowledge sharing</li>
                <li>Personalized health recommendations</li>
                <li>Research project collaboration tools</li>
                <li>Comprehensive analytics and reporting</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                User Accounts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                To access certain features of the Platform, you must create an account. You are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Providing accurate and complete information</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>
            </CardContent>
          </Card>

          {/* Acceptable Use */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                Acceptable Use
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                You agree to use the Platform only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Use the Platform for any illegal or unauthorized purpose</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the rights of others</li>
                <li>Attempt to gain unauthorized access to the Platform</li>
                <li>Interfere with or disrupt the Platform's operation</li>
                <li>Share false or misleading information</li>
              </ul>
            </CardContent>
          </Card>

          {/* Content and Data */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                Content and Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                The Platform aggregates and analyzes data from multiple sources including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Peer-reviewed research publications</li>
                <li>Clinical trial data and results</li>
                <li>Community discussions and experiences</li>
                <li>Device and technology reports</li>
                <li>Healthcare provider insights</li>
              </ul>
              <p className="text-gray-700">
                While we strive for accuracy, we cannot guarantee the completeness or reliability of all information. Users should always consult healthcare professionals for medical decisions.
              </p>
            </CardContent>
          </Card>

          {/* Privacy and Data Protection */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-indigo-600" />
                Privacy and Data Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
              <p className="text-gray-700">
                We implement appropriate security measures to protect your data and comply with applicable data protection laws.
              </p>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-600" />
                Intellectual Property
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                The Platform and its original content, features, and functionality are owned by the T1D AI Platform and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-gray-700">
                Users retain ownership of content they submit, but grant us a license to use, display, and distribute such content on the Platform.
              </p>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                Disclaimers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Warranties of merchantability or fitness for a particular purpose</li>
                <li>Warranties that the Platform will be uninterrupted or error-free</li>
                <li>Warranties regarding the accuracy or reliability of information</li>
                <li>Warranties that defects will be corrected</li>
              </ul>
              <p className="text-gray-700">
                The Platform is not a substitute for professional medical advice, diagnosis, or treatment.
              </p>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-600" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                IN NO EVENT SHALL THE T1D AI PLATFORM BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO YOUR USE OF THE PLATFORM.
              </p>
              <p className="text-gray-700">
                Our total liability to you for any claims arising from these Terms or your use of the Platform shall not exceed the amount you paid us, if any, in the twelve months preceding the claim.
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-red-600" />
                Termination
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We may terminate or suspend your account and access to the Platform immediately, without prior notice, for any reason, including breach of these Terms.
              </p>
              <p className="text-gray-700">
                Upon termination, your right to use the Platform will cease immediately, and we may delete your account and data.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Changes to Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on the Platform.
              </p>
              <p className="text-gray-700">
                Your continued use of the Platform after such modifications constitutes acceptance of the updated Terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-600" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@t1daiplatform.com<br />
                  <strong>Address:</strong> T1D AI Platform Legal Team<br />
                  <strong>Response Time:</strong> Within 48 hours
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Back to Platform */}
          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/">
                Return to Platform
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
