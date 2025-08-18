"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Shield, 
  Bell, 
  Save, 
  Edit3, 
  X, 
  Check,
  RefreshCw,
  Eye,
  EyeOff,
  Settings,
  Heart,
  Activity
} from "lucide-react"
import { T1DUsernameGenerator } from "@/lib/username-generator"
import { UserProfile } from "@/lib/types"
import Link from "next/link"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  
  const [editForm, setEditForm] = useState({
    username: "",
    displayName: "",
    dateOfBirth: "",
    diagnosisDate: "",
    diabetesType: "type1" as UserProfile['diabetesType'],
    location: "",
    timezone: "",
    notifications: true,
    emailUpdates: true,
    privacyLevel: "friends" as UserProfile['preferences']['privacyLevel'],
    language: "en",
    units: "mg/dL" as UserProfile['preferences']['units']
  })

  const [usernameValidation, setUsernameValidation] = useState<{ isValid: boolean; errors: string[] }>({ isValid: true, errors: [] })
  const [suggestedUsernames, setSuggestedUsernames] = useState<string[]>([])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    if (status === "authenticated" && session?.user) {
      loadUserProfile()
    }
  }, [status, session, router])

  const loadUserProfile = async () => {
    setIsLoading(true)
    
    try {
      // Load user profile from localStorage (in production, this would be from your API)
      const storedProfile = localStorage.getItem("userProfile")
      if (storedProfile) {
        const profile = JSON.parse(storedProfile)
        setUserProfile(profile)
        setEditForm({
          username: profile.username,
          displayName: profile.displayName || "",
          dateOfBirth: profile.dateOfBirth || "",
          diagnosisDate: profile.diagnosisDate || "",
          diabetesType: profile.diabetesType,
          location: profile.location || "",
          timezone: profile.timezone || "",
          notifications: profile.preferences.notifications,
          emailUpdates: profile.preferences.emailUpdates,
          privacyLevel: profile.preferences.privacyLevel,
          language: profile.preferences.language,
          units: profile.preferences.units
        })
      } else {
        router.push("/auth/profile-setup")
        return
      }
    } catch (error) {
      console.error("Failed to load user profile:", error)
      setError("Failed to load profile data")
    } finally {
      setIsLoading(false)
    }
  }

  const generateUsernameSuggestions = () => {
    const suggestions = T1DUsernameGenerator.generateMultipleUsernames(5)
    setSuggestedUsernames(suggestions)
  }

  const validateUsername = (username: string) => {
    const validation = T1DUsernameGenerator.validateUsername(username)
    setUsernameValidation(validation)
    return validation.isValid
  }

  const handleUsernameChange = (username: string) => {
    setEditForm(prev => ({ ...prev, username }))
    validateUsername(username)
  }

  const handleSaveProfile = async () => {
    if (!validateUsername(editForm.username)) {
      setError("Please fix username validation errors")
      return
    }

    setIsSaving(true)
    setError("")
    setSuccess("")

    try {
      // Simulate API call to save profile
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Update profile
      const updatedProfile: UserProfile = {
        ...userProfile!,
        username: editForm.username,
        displayName: editForm.displayName,
        dateOfBirth: editForm.dateOfBirth,
        diagnosisDate: editForm.diagnosisDate,
        diabetesType: editForm.diabetesType,
        location: editForm.location,
        timezone: editForm.timezone,
        preferences: {
          notifications: editForm.notifications,
          emailUpdates: editForm.emailUpdates,
          privacyLevel: editForm.privacyLevel,
          language: editForm.language,
          units: editForm.units
        },
        updatedAt: new Date()
      }

      // Store in localStorage for demo (in production, use proper state management)
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile))
      setUserProfile(updatedProfile)
      
      setSuccess("Profile updated successfully!")
      setIsEditing(false)
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000)
    } catch (error) {
      setError("Failed to save profile. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancelEdit = () => {
    // Reset form to current profile values
    setEditForm({
      username: userProfile?.username || "",
      displayName: userProfile?.displayName || "",
      dateOfBirth: userProfile?.dateOfBirth || "",
      diagnosisDate: userProfile?.diagnosisDate || "",
      diabetesType: userProfile?.diabetesType || "type1",
      location: userProfile?.location || "",
      timezone: userProfile?.timezone || "",
      notifications: userProfile?.preferences.notifications || true,
      emailUpdates: userProfile?.preferences.emailUpdates || true,
      privacyLevel: userProfile?.preferences.privacyLevel || "friends",
      language: userProfile?.preferences.language || "en",
      units: userProfile?.preferences.units || "mg/dL"
    })
    setUsernameValidation({ isValid: true, errors: [] })
    setIsEditing(false)
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!userProfile) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
            <p className="text-gray-600 mt-1">
              Manage your account and preferences
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/dashboard">
                <Activity className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)}>
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert>
            <Check className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Your personal information and diabetes details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Username Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="username" className="text-base font-semibold">
                      Username
                    </Label>
                    {isEditing && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={generateUsernameSuggestions}
                        className="flex items-center gap-2"
                      >
                        <RefreshCw className="h-4 w-4" />
                        New Suggestions
                      </Button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      {/* Username Suggestions */}
                      {suggestedUsernames.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {suggestedUsernames.map((username, index) => (
                            <Button
                              key={index}
                              type="button"
                              variant={editForm.username === username ? "default" : "outline"}
                              className="justify-start h-auto p-3"
                              onClick={() => handleUsernameChange(username)}
                            >
                              <span className="font-mono text-sm">{username}</span>
                            </Button>
                          ))}
                        </div>
                      )}

                      {/* Custom Username Input */}
                      <div className="space-y-2">
                        <Label htmlFor="customUsername">Or enter a custom username</Label>
                        <Input
                          id="customUsername"
                          type="text"
                          placeholder="Enter custom username"
                          value={editForm.username}
                          onChange={(e) => handleUsernameChange(e.target.value)}
                          className="font-mono"
                        />
                        {!usernameValidation.isValid && (
                          <div className="space-y-1">
                            {usernameValidation.errors.map((error, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-red-600">
                                <X className="h-4 w-4" />
                                {error}
                              </div>
                            ))}
                          </div>
                        )}
                        {usernameValidation.isValid && editForm.username && (
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <Check className="h-4 w-4" />
                            Username is available
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-mono text-lg font-semibold">{userProfile.username}</p>
                        <p className="text-sm text-gray-500">Your unique identifier</p>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    {isEditing ? (
                      <Input
                        id="displayName"
                        type="text"
                        placeholder="How should we call you?"
                        value={editForm.displayName}
                        onChange={(e) => setEditForm(prev => ({ ...prev, displayName: e.target.value }))}
                      />
                    ) : (
                      <div className="p-3 rounded-lg bg-gray-50">
                        <p className="text-gray-900">
                          {userProfile.displayName || "Not set"}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diabetesType">Diabetes Type</Label>
                    {isEditing ? (
                      <Select
                        value={editForm.diabetesType}
                        onValueChange={(value: any) => setEditForm(prev => ({ ...prev, diabetesType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="type1">Type 1 Diabetes</SelectItem>
                          <SelectItem value="type2">Type 2 Diabetes</SelectItem>
                          <SelectItem value="gestational">Gestational Diabetes</SelectItem>
                          <SelectItem value="prediabetes">Prediabetes</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-3 rounded-lg bg-gray-50">
                        <p className="text-gray-900 capitalize">
                          {userProfile.diabetesType.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    {isEditing ? (
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={editForm.dateOfBirth}
                        onChange={(e) => setEditForm(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                      />
                    ) : (
                      <div className="p-3 rounded-lg bg-gray-50">
                        <p className="text-gray-900">
                          {userProfile.dateOfBirth || "Not set"}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diagnosisDate">Diagnosis Date</Label>
                    {isEditing ? (
                      <Input
                        id="diagnosisDate"
                        type="date"
                        value={editForm.diagnosisDate}
                        onChange={(e) => setEditForm(prev => ({ ...prev, diagnosisDate: e.target.value }))}
                      />
                    ) : (
                      <div className="p-3 rounded-lg bg-gray-50">
                        <p className="text-gray-900">
                          {userProfile.diagnosisDate || "Not set"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        type="text"
                        placeholder="City, Country"
                        value={editForm.location}
                        onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                      />
                    ) : (
                      <div className="p-3 rounded-lg bg-gray-50">
                        <p className="text-gray-900">
                          {userProfile.location || "Not set"}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="units">Preferred Units</Label>
                    {isEditing ? (
                      <Select
                        value={editForm.units}
                        onValueChange={(value: any) => setEditForm(prev => ({ ...prev, units: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mg/dL">mg/dL (US)</SelectItem>
                          <SelectItem value="mmol/L">mmol/L (International)</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-3 rounded-lg bg-gray-50">
                        <p className="text-gray-900">
                          {userProfile.preferences.units}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
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
                      <Label htmlFor="notifications" className="text-base font-medium">
                        In-app Notifications
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive notifications about new discoveries and insights
                      </p>
                    </div>
                    {isEditing ? (
                      <Checkbox
                        id="notifications"
                        checked={editForm.notifications}
                        onCheckedChange={(checked) => setEditForm(prev => ({ ...prev, notifications: checked as boolean }))}
                      />
                    ) : (
                      <Badge variant={userProfile.preferences.notifications ? "default" : "secondary"}>
                        {userProfile.preferences.notifications ? "Enabled" : "Disabled"}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailUpdates" className="text-base font-medium">
                        Email Updates
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive email updates about important discoveries and research
                      </p>
                    </div>
                    {isEditing ? (
                      <Checkbox
                        id="emailUpdates"
                        checked={editForm.emailUpdates}
                        onCheckedChange={(checked) => setEditForm(prev => ({ ...prev, emailUpdates: checked as boolean }))}
                      />
                    ) : (
                      <Badge variant={userProfile.preferences.emailUpdates ? "default" : "secondary"}>
                        {userProfile.preferences.emailUpdates ? "Enabled" : "Disabled"}
                      </Badge>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="privacyLevel">Privacy Level</Label>
                  {isEditing ? (
                    <Select
                      value={editForm.privacyLevel}
                      onValueChange={(value: any) => setEditForm(prev => ({ ...prev, privacyLevel: value }))}
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
                  ) : (
                    <div className="p-3 rounded-lg bg-gray-50">
                      <p className="text-gray-900 capitalize">
                        {userProfile.preferences.privacyLevel}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Edit Actions */}
            {isEditing && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-end space-x-3">
                    <Button variant="outline" onClick={handleCancelEdit}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Account Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{userProfile.email}</p>
                    <p className="text-xs text-gray-500">Email address</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {safeDateOnlyFormat(userProfile.createdAt)}
                    </p>
                    <p className="text-xs text-gray-500">Member since</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50">
                  <Activity className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {safeDateOnlyFormat(userProfile.updatedAt)}
                    </p>
                    <p className="text-xs text-gray-500">Last updated</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" asChild className="w-full justify-start">
                  <Link href="/dashboard">
                    <Activity className="h-4 w-4 mr-2" />
                    Go to Dashboard
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full justify-start">
                  <Link href="/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
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
          </div>
        </div>
      </div>
    </div>
  )
}
