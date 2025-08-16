import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Lightbulb, TrendingUp, AlertTriangle, Brain, Zap, Eye } from "lucide-react"

export default function UnaddressedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Unaddressed T1D Phenomena</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Data-driven discoveries of potential symptoms and patterns that lack official recognition but show strong
            statistical support across multiple data sources
          </p>
        </div>

        <Alert className="mb-8 border-amber-200 bg-amber-50">
          <Lightbulb className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">Research Opportunity</AlertTitle>
          <AlertDescription className="text-amber-700">
            These phenomena represent gaps in current T1D research where community data suggests patterns that haven't
            been formally studied or established in medical literature.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Barometric Pressure Discovery */}
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">Barometric Pressure-Glucose Link</CardTitle>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  High Confidence
                </Badge>
              </div>
              <CardDescription>
                Strong correlation between weather pressure changes and glucose variability patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Data Support Strength</span>
                  <span className="font-medium">76%</span>
                </div>
                <Progress value={76} className="h-2" />
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Evidence Sources:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="font-medium">Social Media</div>
                    <div className="text-gray-600">1,247 reports</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="font-medium">Device Data</div>
                    <div className="text-gray-600">89,234 correlations</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Suggested Symptoms:</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    Storm-related spikes
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Weather sensitivity
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Seasonal patterns
                  </Badge>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-sm text-blue-800 mb-1">Biological Rationale:</h4>
                <p className="text-xs text-blue-700">
                  Pressure changes may affect tissue fluid dynamics and autonomic nervous system activity, influencing
                  glucose homeostasis
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-semibold text-sm">Research Gaps:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Controlled weather chamber studies</li>
                  <li>• Mechanistic pathway research</li>
                  <li>• Longitudinal pressure tracking</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* EMF Sensitivity Discovery */}
          <Card className="border-l-4 border-l-orange-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-orange-600" />
                  <CardTitle className="text-lg">EMF-Glucose Sensitivity</CardTitle>
                </div>
                <Badge variant="outline" className="bg-orange-50 text-orange-700">
                  Medium Confidence
                </Badge>
              </div>
              <CardDescription>Glucose instability patterns near electromagnetic field sources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Data Support Strength</span>
                  <span className="font-medium">62%</span>
                </div>
                <Progress value={62} className="h-2" />
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Evidence Sources:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="font-medium">Social Reports</div>
                    <div className="text-gray-600">892 cases</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="font-medium">Location Data</div>
                    <div className="text-gray-600">23,456 patterns</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Suggested Symptoms:</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    Location-based spikes
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    CGM interference
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Indoor variability
                  </Badge>
                </div>
              </div>

              <div className="bg-orange-50 p-3 rounded-lg">
                <h4 className="font-semibold text-sm text-orange-800 mb-1">Biological Rationale:</h4>
                <p className="text-xs text-orange-700">
                  EMF may affect cellular calcium channels and oxidative stress pathways, potentially influencing
                  glucose metabolism
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-semibold text-sm">Research Gaps:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• EMF exposure measurement protocols</li>
                  <li>• Controlled EMF exposure studies</li>
                  <li>• Cellular mechanism research</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Lunar Cycle Discovery */}
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-lg">Lunar Cycle Patterns</CardTitle>
                </div>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  Emerging
                </Badge>
              </div>
              <CardDescription>Subtle glucose variability correlating with lunar phases</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Data Support Strength</span>
                  <span className="font-medium">58%</span>
                </div>
                <Progress value={58} className="h-2" />
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Evidence Sources:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="font-medium">Device Analysis</div>
                    <div className="text-gray-600">156,789 cycles</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="font-medium">Pilot Studies</div>
                    <div className="text-gray-600">3 studies</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Suggested Symptoms:</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    28-day cycles
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Sleep disruption
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Hormonal-like patterns
                  </Badge>
                </div>
              </div>

              <div className="bg-purple-50 p-3 rounded-lg">
                <h4 className="font-semibold text-sm text-purple-800 mb-1">Biological Rationale:</h4>
                <p className="text-xs text-purple-700">
                  Lunar gravitational effects may influence circadian rhythms and hormonal cycles, indirectly affecting
                  glucose homeostasis
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-semibold text-sm">Research Gaps:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Large-scale lunar correlation studies</li>
                  <li>• Gravitational biology research</li>
                  <li>• Circadian-lunar interactions</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Microbiome-Glucose Discovery */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg">Gut Microbiome Shifts</CardTitle>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  High Impact
                </Badge>
              </div>
              <CardDescription>Rapid glucose pattern changes correlating with digestive symptoms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Data Support Strength</span>
                  <span className="font-medium">71%</span>
                </div>
                <Progress value={71} className="h-2" />
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Evidence Sources:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="font-medium">User Reports</div>
                    <div className="text-gray-600">2,134 cases</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="font-medium">Pattern Analysis</div>
                    <div className="text-gray-600">45,678 correlations</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Suggested Symptoms:</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    Digestive changes
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Sudden pattern shifts
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Antibiotic effects
                  </Badge>
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-semibold text-sm text-green-800 mb-1">Biological Rationale:</h4>
                <p className="text-xs text-green-700">
                  Gut microbiome changes affect incretin hormone production, inflammation, and glucose metabolism
                  through the gut-brain axis
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-semibold text-sm">Research Gaps:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Microbiome-glucose longitudinal studies</li>
                  <li>• Probiotic intervention trials</li>
                  <li>• Gut-brain axis mechanisms</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Social Stress Discovery */}
          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <CardTitle className="text-lg">Social Media Stress Spikes</CardTitle>
                </div>
                <Badge variant="outline" className="bg-red-50 text-red-700">
                  Critical
                </Badge>
              </div>
              <CardDescription>Glucose spikes correlating with social media usage and online stress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Data Support Strength</span>
                  <span className="font-medium">83%</span>
                </div>
                <Progress value={83} className="h-2" />
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Evidence Sources:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="font-medium">App Usage Data</div>
                    <div className="text-gray-600">12,456 correlations</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="font-medium">CGM Patterns</div>
                    <div className="text-gray-600">78,923 spikes</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Suggested Symptoms:</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    Screen time spikes
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    News-related stress
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Social comparison
                  </Badge>
                </div>
              </div>

              <div className="bg-red-50 p-3 rounded-lg">
                <h4 className="font-semibold text-sm text-red-800 mb-1">Biological Rationale:</h4>
                <p className="text-xs text-red-700">
                  Digital stress triggers cortisol release and sympathetic activation, directly impacting glucose
                  regulation through counter-regulatory hormones
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-semibold text-sm">Research Gaps:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Digital wellness intervention studies</li>
                  <li>• Screen time-glucose tracking</li>
                  <li>• Social media stress biomarkers</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Sleep Position Discovery */}
          <Card className="border-l-4 border-l-indigo-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-indigo-600" />
                  <CardTitle className="text-lg">Sleep Position Effects</CardTitle>
                </div>
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700">
                  Novel
                </Badge>
              </div>
              <CardDescription>Overnight glucose patterns varying by sleep position and movement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Data Support Strength</span>
                  <span className="font-medium">64%</span>
                </div>
                <Progress value={64} className="h-2" />
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Evidence Sources:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="font-medium">Sleep Trackers</div>
                    <div className="text-gray-600">34,567 nights</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="font-medium">CGM Overnight</div>
                    <div className="text-gray-600">89,234 patterns</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Suggested Symptoms:</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    Position-dependent dawn
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Movement-glucose link
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Compression effects
                  </Badge>
                </div>
              </div>

              <div className="bg-indigo-50 p-3 rounded-lg">
                <h4 className="font-semibold text-sm text-indigo-800 mb-1">Biological Rationale:</h4>
                <p className="text-xs text-indigo-700">
                  Sleep position affects lymphatic drainage, interstitial fluid flow, and sensor-tissue interface,
                  potentially influencing glucose readings and metabolism
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-semibold text-sm">Research Gaps:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Controlled sleep position studies</li>
                  <li>• Lymphatic system-glucose research</li>
                  <li>• Sensor positioning optimization</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Alert className="max-w-2xl mx-auto border-blue-200 bg-blue-50">
            <Brain className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">Research Collaboration Opportunity</AlertTitle>
            <AlertDescription className="text-blue-700">
              These unaddressed phenomena represent prime opportunities for academic research partnerships and clinical
              studies. Each discovery includes detailed research gap analysis and potential study designs.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
