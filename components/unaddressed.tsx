"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Lightbulb, Target, TrendingUp, Zap, Users } from "lucide-react"
import { dataGenerator } from "@/lib/data-generator"

interface UnaddressedTopic {
  id: string
  title: string
  description: string
  urgency: "high" | "medium" | "low"
  impact: string
  researchGap: string
  potentialSolutions: string[]
  affectedPopulation: number
  category: string
}

interface ResearchOpportunity {
  id: string
  title: string
  description: string
  feasibility: number
  expectedImpact: string
  requiredResources: string[]
  timeline: string
  collaborators: string[]
}

export function Unaddressed() {
  const [topics, setTopics] = useState<UnaddressedTopic[]>([])
  const [opportunities, setOpportunities] = useState<ResearchOpportunity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateData = () => {
      const topicData: UnaddressedTopic[] = [
        {
          id: "topic-1",
          title: "Tingling Sensation During Hypoglycemia",
          description: "Investigation of neurological symptoms and nerve responses during low blood sugar episodes",
          urgency: "high",
          impact: "High - Affects quality of life and safety",
          researchGap: "Limited understanding of peripheral neuropathy mechanisms during glucose fluctuations",
          potentialSolutions: ["Neurological assessment protocols", "Preventive measures", "Treatment strategies"],
          affectedPopulation: 2500000,
          category: "Neurological Symptoms"
        },
        {
          id: "topic-2",
          title: "Stretching and Nerve Sensations",
          description: "Study of unusual nerve sensations during stretching exercises in T1D patients",
          urgency: "medium",
          impact: "Medium - Affects exercise routines and physical therapy",
          researchGap: "No established protocols for exercise-induced nerve sensitivity",
          potentialSolutions: ["Exercise modification guidelines", "Sensory assessment tools", "Adaptive exercise programs"],
          affectedPopulation: 1800000,
          category: "Exercise & Physical Activity"
        },
        {
          id: "topic-3",
          title: "Hiccups During Blood Sugar Changes",
          description: "Investigation of hiccup patterns and their correlation with glucose fluctuations",
          urgency: "medium",
          impact: "Medium - May indicate autonomic nervous system dysfunction",
          researchGap: "Limited research on autonomic responses to glucose changes",
          potentialSolutions: ["Autonomic function testing", "Pattern recognition algorithms", "Intervention strategies"],
          affectedPopulation: 1200000,
          category: "Autonomic Function"
        },
        {
          id: "topic-4",
          title: "Lemon Wedge Effects on Low Blood Sugar",
          description: "Scientific validation of community claims about citrus effects on hypoglycemia recovery",
          urgency: "low",
          impact: "Low - Potential for natural intervention strategies",
          researchGap: "No clinical studies on citrus effects during hypoglycemia",
          potentialSolutions: ["Clinical trials", "Mechanism studies", "Dosage optimization"],
          affectedPopulation: 800000,
          category: "Natural Interventions"
        }
      ]
      setTopics(topicData)

      const oppData = dataGenerator.generateAIPatterns().slice(0, 6).map((pattern, i) => ({
        id: `opp-${i}`,
        title: pattern.title,
        description: pattern.description,
        feasibility: Math.floor(Math.random() * 40) + 60,
        expectedImpact: pattern.impact,
        requiredResources: pattern.recommendations.slice(0, 3),
        timeline: ["6 months", "1 year", "18 months", "2 years"][i % 4],
        collaborators: ["Neurologists", "Endocrinologists", "Exercise Physiologists", "AI Researchers"][i % 4]
      }))
      setOpportunities(oppData)
      setLoading(false)
    }

    generateData()
  }, [])

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-red-100 text-red-800"
      case "medium": return "bg-orange-100 text-orange-800"
      case "low": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-64 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">🆕 New Findings & Unaddressed Topics</h2>
        <p className="text-muted-foreground">Identifying research gaps and opportunities in T1D management</p>
      </div>

      <Tabs defaultValue="topics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="topics">🔍 Unaddressed Topics</TabsTrigger>
          <TabsTrigger value="opportunities">💡 Research Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="topics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic) => (
              <Card key={topic.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className={getUrgencyColor(topic.urgency)}>
                      {topic.urgency.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{topic.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{topic.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{topic.description}</p>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium">Impact: </span>
                      <span className="text-sm text-muted-foreground">{topic.impact}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Research Gap: </span>
                      <span className="text-sm text-muted-foreground">{topic.researchGap}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Affected Population: </span>
                      <span className="text-sm text-muted-foreground">
                        {topic.affectedPopulation.toLocaleString()}+ people
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Potential Solutions: </span>
                      <div className="mt-1 space-y-1">
                        {topic.potentialSolutions.map((solution, i) => (
                          <div key={i} className="text-sm flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            {solution}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {opportunities.map((opp) => (
              <Card key={opp.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{opp.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{opp.description}</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Feasibility</span>
                      <span className="text-sm font-semibold">{opp.feasibility}%</span>
                    </div>
                    <Progress value={opp.feasibility} className="h-2" />
                    <div>
                      <span className="text-sm font-medium">Expected Impact: </span>
                      <span className="text-sm text-muted-foreground">{opp.expectedImpact}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Timeline: </span>
                      <span className="text-sm text-muted-foreground">{opp.timeline}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Required Resources: </span>
                      <div className="mt-1 space-y-1">
                        {opp.requiredResources.map((resource, i) => (
                          <div key={i} className="text-sm flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            {resource}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Collaborators: </span>
                      <span className="text-sm text-muted-foreground">{opp.collaborators.join(", ")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">🚀 Ready to Address These Gaps?</h3>
            <p className="text-muted-foreground mb-4">
              Join our research community and help advance T1D understanding
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="default">Start Research Project</Button>
              <Button variant="outline">Join Research Team</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
