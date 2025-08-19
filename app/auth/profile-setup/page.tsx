"use client"

import { useState, useEffect } from "react"
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
import ModernNavigation from "@/components/modern-navigation"

export default function ProfileSetupPage() {
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
    // Generate initial username suggestions
    generateUsernameSuggestions()
  }, [])

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
        id: "temp-id",
        email: "user@example.com",
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
      
      // Save to localStorage for demo purposes
      localStorage.setItem("userProfile", JSON.stringify(userProfile))
      
      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      setError("Failed to save profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkip = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <ModernNavigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Your Profile
            </h1>
            <p className="text-xl text-gray-600">
              Set up your profile to personalize your T1D AI Platform experience
            </p>
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Tell us about yourself to customize your experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username Section */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => handleUsernameChange(e.target.value)}
                        placeholder="Choose a unique username"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={generateUsernameSuggestions}
                        className="whitespace-nowrap"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Generate
                      </Button>
                    </div>
                    
                    {/* Username Suggestions */}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {suggestedUsernames.map((username) => (
                        <Badge
                          key={username}
                          variant="outline"
                          className={`cursor-pointer hover:bg-blue-50 ${
                            formData.username === username ? 'bg-blue-100 border-blue-300' : ''
                          }`}
                          onClick={() => handleUsernameChange(username)}
                        >
                          {username}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Username Validation */}
                    {!usernameValidation.isValid && (
                      <Alert className="mt-2">
                        <X className="h-4 w-4" />
                        <AlertDescription>
                          <ul className="list-disc list-inside">
                            {usernameValidation.errors.map((error, index) => (
                              <li key={index}>{error}</li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={formData.displayName}
                      onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                      placeholder="How should we call you?"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="diabetesType">Diabetes Type</Label>
                      <Select
                        value={formData.diabetesType}
                        onValueChange={(value: "type1" | "type2" | "gestational" | "other") =>
                          setFormData(prev => ({ ...prev, diabetesType: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="type1">Type 1 Diabetes</SelectItem>
                          <SelectItem value="type2">Type 2 Diabetes</SelectItem>
                          <SelectItem value="gestational">Gestational Diabetes</SelectItem>
                          <SelectItem value="other">Other/Pre-diabetes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="units">Preferred Units</Label>
                    <Select
                      value={formData.units}
                      onValueChange={(value: "mg/dL" | "mmol/L") =>
                        setFormData(prev => ({ ...prev, units: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mg/dL">mg/dL</SelectItem>
                        <SelectItem value="mmol/L">mmol/L</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                {/* Preferences Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Preferences</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="notifications"
                        checked={formData.notifications}
                        onCheckedChange={(checked) =>
                          setFormData(prev => ({ ...prev, notifications: checked as boolean }))
                        }
                      />
                      <Label htmlFor="notifications" className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        Enable push notifications
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="emailUpdates"
                        checked={formData.emailUpdates}
                        onCheckedChange={(checked) =>
                          setFormData(prev => ({ ...prev, emailUpdates: checked as boolean }))
                        }
                      />
                      <Label htmlFor="emailUpdates" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Receive email updates
                      </Label>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="privacyLevel">Privacy Level</Label>
                    <Select
                      value={formData.privacyLevel}
                      onValueChange={(value: "public" | "friends" | "private") =>
                        setFormData(prev => ({ ...prev, privacyLevel: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Share with everyone</SelectItem>
                        <SelectItem value="friends">Friends - Share with connections</SelectItem>
                        <SelectItem value="private">Private - Only visible to me</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Error Display */}
                {error && (
                  <Alert>
                    <X className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading || !usernameValidation.isValid}
                    className="flex-1"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Complete Setup
                      </>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSkip}
                    className="flex-1"
                  >
                    Skip for Now
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
