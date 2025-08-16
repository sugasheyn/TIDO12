"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Settings, Bell, Shield, Globe, Palette, Database, Users, Heart, Save, X } from "lucide-react"
import { AuthGuard } from "@/components/auth/auth-guard"
import Link from "next/link"

export default function SettingsPage() {
  const { data: session } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      research: true,
      community: true,
      insights: true,
      weekly: false,
    },
    privacy: {
      profileVisibility: "public",
      dataSharing: false,
      analytics: true,
      researchParticipation: true,
    },
    preferences: {
      theme: "system",
      language: "en",
      timezone: "UTC",
      dateFormat: "MM/DD/YYYY",
    },
    data: {
      autoSync: true,
      backupFrequency: "weekly",
      retentionPeriod: "2years",
      exportFormat: "json",
    }
  })

  const handleSave = () => {
    // In production, you'd save this to your database
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset to original settings
    setIsEditing(false)
  }

  const updateSettings = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }))
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-lg text-gray-600">Manage your account preferences and platform settings</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* Account Overview */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-600" />
                  Account Overview
                </CardTitle>
                <CardDescription>
                  Your account information and subscription details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">Email</Label>
                    <p className="text-gray-900">{session?.user?.email}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">Account Status</Label>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">Member Since</Label>
                    <p className="text-gray-900">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">Subscription</Label>
                    <Badge variant="outline">Free Plan</Badge>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <Button asChild variant="outline">
                    <Link href="/profile">Edit Profile</Link>
                  </Button>
                  <Button variant="outline">Upgrade Plan</Button>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-blue-600" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Control how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Communication Channels</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-notifications" className="text-sm">Email Notifications</Label>
                        <Switch
                          id="email-notifications"
                          checked={settings.notifications.email}
                          onCheckedChange={(checked) => updateSettings("notifications", "email", checked)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-notifications" className="text-sm">Push Notifications</Label>
                        <Switch
                          id="push-notifications"
                          checked={settings.notifications.push}
                          onCheckedChange={(checked) => updateSettings("notifications", "push", checked)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Content Types</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="research-updates" className="text-sm">Research Updates</Label>
                        <Switch
                          id="research-updates"
                          checked={settings.notifications.research}
                          onCheckedChange={(checked) => updateSettings("notifications", "research", checked)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="community-activity" className="text-sm">Community Activity</Label>
                        <Switch
                          id="community-activity"
                          checked={settings.notifications.community}
                          onCheckedChange={(checked) => updateSettings("notifications", "community", checked)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="insights-alerts" className="text-sm">AI Insights</Label>
                        <Switch
                          id="insights-alerts"
                          checked={settings.notifications.insights}
                          onCheckedChange={(checked) => updateSettings("notifications", "insights", checked)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Frequency</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="weekly-digest" className="text-sm">Weekly Digest</Label>
                    <Switch
                      id="weekly-digest"
                      checked={settings.notifications.weekly}
                      onCheckedChange={(checked) => updateSettings("notifications", "weekly", checked)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  Privacy & Data
                </CardTitle>
                <CardDescription>
                  Control your privacy and data sharing preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Profile Visibility</h3>
                    <Select
                      value={settings.privacy.profileVisibility}
                      onValueChange={(value) => updateSettings("privacy", "profileVisibility", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="community">Community Only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Data Sharing</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="data-sharing" className="text-sm">Share Data for Research</Label>
                        <Switch
                          id="data-sharing"
                          checked={settings.privacy.dataSharing}
                          onCheckedChange={(checked) => updateSettings("privacy", "dataSharing", checked)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="analytics" className="text-sm">Usage Analytics</Label>
                        <Switch
                          id="analytics"
                          checked={settings.privacy.analytics}
                          onCheckedChange={(checked) => updateSettings("privacy", "analytics", checked)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Research Participation</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="research-participation" className="text-sm">Participate in Research Studies</Label>
                    <Switch
                      id="research-participation"
                      checked={settings.privacy.researchParticipation}
                      onCheckedChange={(checked) => updateSettings("privacy", "researchParticipation", checked)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Display Preferences */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-orange-600" />
                  Display & Interface
                </CardTitle>
                <CardDescription>
                  Customize your platform appearance and experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Theme</h3>
                    <Select
                      value={settings.preferences.theme}
                      onValueChange={(value) => updateSettings("preferences", "theme", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Language</h3>
                    <Select
                      value={settings.preferences.language}
                      onValueChange={(value) => updateSettings("preferences", "language", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Timezone</h3>
                    <Select
                      value={settings.preferences.timezone}
                      onValueChange={(value) => updateSettings("preferences", "timezone", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">Eastern Time</SelectItem>
                        <SelectItem value="PST">Pacific Time</SelectItem>
                        <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Date Format</h3>
                    <Select
                      value={settings.preferences.dateFormat}
                      onValueChange={(value) => updateSettings("preferences", "dateFormat", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-teal-600" />
                  Data Management
                </CardTitle>
                <CardDescription>
                  Control your data synchronization and export preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Synchronization</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-sync" className="text-sm">Auto-sync Data</Label>
                        <Switch
                          id="auto-sync"
                          checked={settings.data.autoSync}
                          onCheckedChange={(checked) => updateSettings("data", "autoSync", checked)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Backup Frequency</h3>
                    <Select
                      value={settings.data.backupFrequency}
                      onValueChange={(value) => updateSettings("data", "backupFrequency", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Data Retention</h3>
                    <Select
                      value={settings.data.retentionPeriod}
                      onValueChange={(value) => updateSettings("data", "retentionPeriod", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1year">1 Year</SelectItem>
                        <SelectItem value="2years">2 Years</SelectItem>
                        <SelectItem value="5years">5 Years</SelectItem>
                        <SelectItem value="indefinite">Indefinite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Export Format</h3>
                    <Select
                      value={settings.data.exportFormat}
                      onValueChange={(value) => updateSettings("data", "exportFormat", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button variant="outline">Export My Data</Button>
                  <Button variant="outline">Download Backup</Button>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Settings
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
