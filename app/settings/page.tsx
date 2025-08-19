"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Settings, 
  Bell, 
  Shield, 
  Eye, 
  EyeOff, 
  Save, 
  User, 
  Mail, 
  Lock,
  Trash2,
  AlertTriangle
} from "lucide-react"
import Link from "next/link"
import ModernNavigation from "@/components/modern-navigation"

export default function SettingsPage() {
  const router = useRouter()
  
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    dataSharing: true,
    privacyLevel: "friends",
    language: "en",
    timezone: "UTC",
    autoBackup: true
  })

  useEffect(() => {
    // Load settings from localStorage if available
    const savedSettings = localStorage.getItem("userSettings")
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)
        setSettings(prev => ({ ...prev, ...parsedSettings }))
      } catch (error) {
        console.error("Failed to parse saved settings:", error)
      }
    }
  }, [])

  const handleSaveSettings = async () => {
    setIsSaving(true)
    setError("")
    setSuccess("")

    try {
      // Simulate API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Save to localStorage
      localStorage.setItem("userSettings", JSON.stringify(settings))
      
      setSuccess("Settings saved successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (error) {
      setError("Failed to save settings. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <ModernNavigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Account Settings</h1>
              <p className="text-xl text-gray-600 mt-2">
                Manage your account preferences and security
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/dashboard">
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/profile">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </Button>
            </div>
          </div>

          {/* Alerts */}
          {error && (
            <Alert className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="mb-6">
              <Save className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Settings */}
            <div className="lg:col-span-2 space-y-6">
              {/* Notification Settings */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Control how you receive updates and notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications" className="text-base font-medium">
                          Email Notifications
                        </Label>
                        <p className="text-sm text-gray-500">
                          Receive important updates via email
                        </p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushNotifications" className="text-base font-medium">
                          Push Notifications
                        </Label>
                        <p className="text-sm text-gray-500">
                          Receive real-time notifications in your browser
                        </p>
                      </div>
                      <Switch
                        id="pushNotifications"
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, pushNotifications: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="marketingEmails" className="text-base font-medium">
                          Marketing Emails
                        </Label>
                        <p className="text-sm text-gray-500">
                          Receive updates about new features and research
                        </p>
                      </div>
                      <Switch
                        id="marketingEmails"
                        checked={settings.marketingEmails}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, marketingEmails: checked }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Settings */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy & Data
                  </CardTitle>
                  <CardDescription>
                    Control your data sharing and privacy settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dataSharing" className="text-base font-medium">
                          Data Sharing for Research
                        </Label>
                        <p className="text-sm text-gray-500">
                          Allow your anonymized data to contribute to diabetes research
                        </p>
                      </div>
                      <Switch
                        id="dataSharing"
                        checked={settings.dataSharing}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, dataSharing: checked }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="privacyLevel">Privacy Level</Label>
                      <Select
                        value={settings.privacyLevel}
                        onValueChange={(value) => setSettings(prev => ({ ...prev, privacyLevel: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public - Share insights with the community</SelectItem>
                          <SelectItem value="friends">Friends - Share with trusted connections</SelectItem>
                          <SelectItem value="private">Private - Keep insights to yourself</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Preferences
                  </CardTitle>
                  <CardDescription>
                    Customize your platform experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={settings.language}
                        onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="it">Italiano</SelectItem>
                          <SelectItem value="pt">Português</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={settings.timezone}
                        onValueChange={(value) => setSettings(prev => ({ ...prev, timezone: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="EST">Eastern Time</SelectItem>
                          <SelectItem value="CST">Central Time</SelectItem>
                          <SelectItem value="MST">Mountain Time</SelectItem>
                          <SelectItem value="PST">Pacific Time</SelectItem>
                          <SelectItem value="GMT">GMT</SelectItem>
                          <SelectItem value="CET">Central European Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoBackup" className="text-base font-medium">
                        Auto Backup
                      </Label>
                      <p className="text-sm text-gray-500">
                        Automatically backup your data and preferences
                      </p>
                    </div>
                    <Switch
                      id="autoBackup"
                      checked={settings.autoBackup}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoBackup: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-end space-x-3">
                    <Button onClick={handleSaveSettings} disabled={isSaving}>
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? "Saving..." : "Save Settings"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Info */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">user@example.com</p>
                      <p className="text-xs text-gray-500">Email address</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50">
                    <User className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">T1D User</p>
                      <p className="text-xs text-gray-500">Display name</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link href="/dashboard">
                      <User className="h-4 w-4 mr-2" />
                      Go to Dashboard
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link href="/profile">
                      <User className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link href="/privacy">
                      <Shield className="h-4 w-4 mr-2" />
                      Privacy Policy
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-red-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-red-600 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start text-red-600 border-red-300 hover:bg-red-50">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                  <p className="text-xs text-gray-500">
                    These actions cannot be undone. Please be careful.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
