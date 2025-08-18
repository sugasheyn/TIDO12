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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RefreshCw, Check, X, User, Heart, Shield, Bell, Mail } from "lucide-react"
import { T1DUsernameGenerator } from "@/lib/username-generator"
import { UserProfile } from "@/lib/types"

export default function ProfileSetupPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    diabetesType: "type1" as const,
    location: "",
    units: "mg/dL" as const,
    notifications: true,
    emailUpdates: true,
    privacyLevel: "friends" as const
  })
  
  const [suggestedUsernames, setSuggestedUsernames] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [usernameValidation, setUsernameValidation] = useState<{ isValid: boolean; errors: string[] }>({ isValid: true, errors: [] })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    if (status === "authenticated" && session?.user) {
      // Generate initial username suggestions
      generateUsernameSuggestions()
    }
  }, [status, session, router])

  const generateUsernameSuggestions = () => {
    const suggestions = T1DUsernameGenerator.generateMultipleUsernames(5)
    setSuggestedUsernames(suggestions)
    if (suggestions.length > 0) {
      setFormData(prev => ({ ...prev, username: suggestions[0] }))
      validateUsername(suggestions[0])
    }
  }

  const validateUsername = (username: string) => {
    const validation = T1DUsernameGenerator.validateUsername(username)
    setUsernameValidation(validation)
    return validation.isValid
  }

  const handleUsernameChange = (username: string) => {
    setFormData(prev => ({ ...prev, username }))
    validateUsername(username)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateUsername(formData.username)) {
      setError("Please fix username validation errors")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulate API call to save profile
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In production, this would save to your database
      const userProfile: UserProfile = {
        id: session?.user?.id || "temp-id",
        email: session?.user?.email || "",
        username: formData.username,
        displayName: formData.displayName,
        diabetesType: formData.diabetesType,
        location: formData.location,
        preferences: {
          notifications: formData.notifications,
          emailUpdates: formData.emailUpdates,
          privacyLevel: formData.privacyLevel,
          language: "en",
          units: formData.units
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }

      // Store in localStorage for demo (in production, use proper state management)
      localStorage.setItem("userProfile", JSON.stringify(userProfile))
      
      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      setError("Failed to save profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Setting up your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">Complete Your Profile</CardTitle>
            <CardDescription className="text-lg">
              Customize your username and set up your T1D AI Platform experience
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="username" className="text-base font-semibold">
                    Choose Your Username
                  </Label>
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {suggestedUsernames.map((username, index) => (
                    <Button
                      key={index}
                      type="button"
                      variant={formData.username === username ? "default" : "outline"}
                      className="justify-start h-auto p-3"
                      onClick={() => handleUsernameChange(username)}
                    >
                      <span className="font-mono text-sm">{username}</span>
                    </Button>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customUsername">Or enter a custom username</Label>
                  <Input
                    id="customUsername"
                    type="text"
                    placeholder="Enter custom username"
                    value={formData.username}
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
                  {usernameValidation.isValid && formData.username && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <Check className="h-4 w-4" />
                      Username is available
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Profile Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name (Optional)</Label>
                    <Input
                      id="displayName"
                      type="text"
                      placeholder="How should we call you?"
                      value={formData.displayName}
                      onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diabetesType">Diabetes Type</Label>
                    <Select
                      value={formData.diabetesType}
                      onValueChange={(value: any) => setFormData(prev => ({ ...prev, diabetesType: value }))}
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
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location (Optional)</Label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="units">Preferred Units</Label>
                    <Select
                      value={formData.units}
                      onValueChange={(value: any) => setFormData(prev => ({ ...prev, units: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mg/dL">mg/dL (US)</SelectItem>
                        <SelectItem value="mmol/L">mmol/L (International)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="notifications"
                      checked={formData.notifications}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, notifications: checked as boolean }))}
                    />
                    <Label htmlFor="notifications" className="text-sm">
                      Receive in-app notifications about new discoveries and insights
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="emailUpdates"
                      checked={formData.emailUpdates}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, emailUpdates: checked as boolean }))}
                    />
                    <Label htmlFor="emailUpdates" className="text-sm">
                      Receive email updates about important discoveries and research
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="privacyLevel">Privacy Level</Label>
                  <Select
                    value={formData.privacyLevel}
                    onValueChange={(value: any) => setFormData(prev => ({ ...prev, privacyLevel: value }))}
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

              <Separator />

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading || !usernameValidation.isValid}
                  className="px-8 py-3 text-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Setting up your profile...
                    </>
                  ) : (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Complete Setup
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              You can change these settings later in your profile
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
