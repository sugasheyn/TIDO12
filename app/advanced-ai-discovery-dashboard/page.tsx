'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

interface DiscoveryResult {
  extraction_results: any;
  pattern_discovery: any;
  reliability_assessment: any;
  crosslingual_insights: any;
  generated_hypotheses: any;
  overall_discovery_score: number;
}

export default function AdvancedAIDiscoveryDashboard() {
  const [discoveryResults, setDiscoveryResults] = useState<DiscoveryResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('extraction');

  // Mock data for demonstration
  const mockData = {
    posts: [
      {
        text: "My Dexcom G6 sensor keeps giving false lows during exercise. Anyone else experience this?",
        timestamp: "2024-01-15T10:30:00Z",
        author: "user123",
        language: "en",
        type: "question",
        outcome: "problem"
      },
      {
        text: "Libre 3 working great for me! Much better accuracy than previous versions.",
        timestamp: "2024-01-15T11:15:00Z",
        author: "user456",
        language: "en",
        type: "review",
        outcome: "positive"
      },
      {
        text: "Insulin pump disconnected during workout, caused high blood sugar",
        timestamp: "2024-01-15T12:00:00Z",
        author: "user789",
        language: "en",
        type: "experience",
        outcome: "problem"
      }
    ],
    userInteractions: [
      { user: "user123", interaction: "comment", timestamp: "2024-01-15T10:35:00Z" },
      { user: "user456", interaction: "like", timestamp: "2024-01-15T11:20:00Z" },
      { user: "user789", interaction: "share", timestamp: "2024-01-15T12:05:00Z" }
    ],
    claims: [
      { claim_id: "claim_1", text: "Dexcom sensors give false readings during exercise", confidence: 0.8 },
      { claim_id: "claim_2", text: "Libre 3 has improved accuracy", confidence: 0.9 },
      { claim_id: "claim_3", text: "Insulin pumps disconnect during physical activity", confidence: 0.7 }
    ],
    evidence: [
      { id: "ev_1", type: "device_symptom_correlation", claim_id: "claim_1" },
      { id: "ev_2", type: "medication_effectiveness", claim_id: "claim_2" },
      { id: "ev_3", type: "environmental_factors", claim_id: "claim_3" }
    ]
  };

  const runDiscoveryAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis processing
    setTimeout(() => {
      const mockResults: DiscoveryResult = {
        extraction_results: {
          entities: [
            { entity_type: "device", value: "Dexcom G6" },
            { entity_type: "symptom", value: "false lows" },
            { entity_type: "context", value: "exercise" }
          ],
          sentiment: [
            { aspect: "device", sentiment: "negative", severity: "moderate", confidence: 0.8 },
            { aspect: "accuracy", sentiment: "positive", severity: "high", confidence: 0.9 }
          ],
          stance: { stance: "support", rationale_spans: [[10, 25]], claim_id: "claim_exercise_issue" },
          mechanisms: [
            { cause: "exercise", relation: "causes", effect: "false readings", uncertainty: false }
          ],
          context: [
            { symptom: "false lows", device: "dexcom", context: "exercise", prevalence: 0.75 }
          ]
        },
        pattern_discovery: {
          topic_diffusion: [
            { topic: "sensor accuracy", burst_score: 0.8, propagation_rate: 0.6, peak_time: "2024-01-15T12:00:00Z" },
            { topic: "exercise issues", burst_score: 0.6, propagation_rate: 0.4, peak_time: "2024-01-15T11:30:00Z" }
          ],
          community_influence: [
            { cluster_id: "cluster_1", members: ["user123", "user456", "user789"], influence_score: 0.8, key_influencers: ["user123"] }
          ],
          sequence_motifs: [
            { motif: ["question", "problem"], frequency: 0.7, outcome_correlation: 0.8, confidence: 0.75 }
          ]
        },
        reliability_assessment: {
          credibility: { bot_likelihood: 0.1, astroturf_score: 0.1, credibility_score: 0.9, red_flags: [] },
          claim_resolution: [
            { claim_id: "resolved_1", merged_claims: ["claim_1", "claim_3"], novelty_score: 0.5, final_verdict: "widely reported" }
          ],
          evidence_aggregation: [
            { claim_id: "agg_1", evidence_strength: 0.8, time_weighted_score: 0.75, consensus_level: 0.8 }
          ]
        },
        crosslingual_insights: [
          { topic_cluster: "diabetes", aligned_texts: ["English posts"], language_coverage: ["en"], alignment_confidence: 0.9 }
        ],
        generated_hypotheses: [
          { hypothesis_id: "hyp_1", statement: "Device Dexcom shows increased false readings during exercise", evidence_support: ["ev_1"], testability_score: 0.8, confidence: 0.8 }
        ],
        overall_discovery_score: 0.85
      };
      
      setDiscoveryResults(mockResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  useEffect(() => {
    // Auto-run analysis on component mount
    runDiscoveryAnalysis();
  }, []);

  const getConfidenceColor = (score: number) => {
    if (score >= 0.8) return 'bg-green-500';
    if (score >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-600';
      case 'severe': return 'bg-orange-600';
      case 'moderate': return 'bg-yellow-600';
      case 'mild': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">🧠 Advanced AI Discovery Dashboard</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Cutting-edge AI modules for extracting insights, discovering patterns, assessing reliability, 
          and generating hypotheses from diabetes community data and research.
        </p>
      </div>

      {/* Discovery Score Overview */}
      {discoveryResults && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎯 Overall Discovery Score
              <Badge variant="secondary" className="ml-2">
                {Math.round(discoveryResults.overall_discovery_score * 100)}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress 
              value={discoveryResults.overall_discovery_score * 100} 
              className="h-3"
            />
            <p className="text-sm text-gray-600 mt-2">
              AI-powered discovery system has analyzed data and identified {discoveryResults.generated_hypotheses.length} testable hypotheses
            </p>
          </CardContent>
        </Card>
      )}

      {/* Main Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="extraction">Extraction & Understanding</TabsTrigger>
          <TabsTrigger value="patterns">Pattern Discovery</TabsTrigger>
          <TabsTrigger value="reliability">Reliability & Quality</TabsTrigger>
          <TabsTrigger value="crosslingual">Crosslingual Analysis</TabsTrigger>
          <TabsTrigger value="hypotheses">Generated Hypotheses</TabsTrigger>
        </TabsList>

        {/* Extraction & Understanding Tab */}
        <TabsContent value="extraction" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Entity Extraction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🔍 Entity Extraction
                  <Badge variant="outline">Multilingual</Badge>
                </CardTitle>
                <CardDescription>
                  Extracted devices, symptoms, and context from community posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                {discoveryResults?.extraction_results.entities.map((entity: any, index: number) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{entity.entity_type}</Badge>
                    <span className="text-sm">{entity.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Sentiment Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  😊 Aspect-Based Sentiment
                  <Badge variant="outline">Contextual</Badge>
                </CardTitle>
                <CardDescription>
                  Sentiment analysis for specific aspects with severity assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                {discoveryResults?.extraction_results.sentiment.map((sentiment: any, index: number) => (
                  <div key={index} className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{sentiment.aspect}</span>
                      <Badge variant={sentiment.sentiment === 'positive' ? 'default' : 'destructive'}>
                        {sentiment.sentiment}
                      </Badge>
                      <Badge className={getSeverityColor(sentiment.severity)}>
                        {sentiment.severity}
                      </Badge>
                    </div>
                    <Progress value={sentiment.confidence * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Causal Mechanisms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🔗 Causal Mechanisms
                  <Badge variant="outline">Pattern-Based</Badge>
                </CardTitle>
                <CardDescription>
                  Extracted cause-effect relationships from text
                </CardDescription>
              </CardHeader>
              <CardContent>
                {discoveryResults?.extraction_results.mechanisms.map((mechanism: any, index: number) => (
                  <div key={index} className="mb-2 p-2 bg-gray-50 rounded">
                    <div className="text-sm">
                      <span className="font-medium">{mechanism.cause}</span>
                      <span className="mx-2 text-gray-500">→</span>
                      <span className="font-medium">{mechanism.relation}</span>
                      <span className="mx-2 text-gray-500">→</span>
                      <span className="font-medium">{mechanism.effect}</span>
                    </div>
                    {mechanism.uncertainty && (
                      <Badge variant="outline" className="mt-1">Uncertain</Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Context Mining */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎯 Context-Aware Mining
                  <Badge variant="outline">Symptom-Device</Badge>
                </CardTitle>
                <CardDescription>
                  Context-specific symptom-device correlations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {discoveryResults?.extraction_results.context.map((context: any, index: number) => (
                  <div key={index} className="mb-2 p-2 bg-blue-50 rounded">
                    <div className="text-sm space-y-1">
                      <div><strong>Device:</strong> {context.device}</div>
                      <div><strong>Symptom:</strong> {context.symptom}</div>
                      <div><strong>Context:</strong> {context.context}</div>
                      <div><strong>Prevalence:</strong> {Math.round(context.prevalence * 100)}%</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Pattern Discovery Tab */}
        <TabsContent value="patterns" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Topic Diffusion */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📈 Topic Diffusion
                  <Badge variant="outline">Burst Detection</Badge>
                </CardTitle>
                <CardDescription>
                  Emerging topics and propagation patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                {discoveryResults?.pattern_discovery.topic_diffusion.map((topic: any, index: number) => (
                  <div key={index} className="mb-3 p-3 bg-green-50 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">#{topic.topic}</span>
                      <Badge className={getConfidenceColor(topic.burst_score)}>
                        {Math.round(topic.burst_score * 100)}%
                      </Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <div><strong>Burst Score:</strong> {topic.burst_score.toFixed(2)}</div>
                      <div><strong>Propagation Rate:</strong> {topic.propagation_rate.toFixed(2)}</div>
                      <div><strong>Peak Time:</strong> {new Date(topic.peak_time).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Influence */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  👥 Community Influence
                  <Badge variant="outline">Clustering</Badge>
                </CardTitle>
                <CardDescription>
                  User clusters and influence patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                {discoveryResults?.pattern_discovery.community_influence.map((cluster: any, index: number) => (
                  <div key={index} className="mb-3 p-3 bg-purple-50 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{cluster.cluster_id}</span>
                      <Badge className={getConfidenceColor(cluster.influence_score)}>
                        {Math.round(cluster.influence_score * 100)}%
                      </Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <div><strong>Members:</strong> {cluster.members.join(', ')}</div>
                      <div><strong>Key Influencers:</strong> {cluster.key_influencers.join(', ')}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Sequence Motifs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🔄 Sequence Motifs
                  <Badge variant="outline">Behavior Patterns</Badge>
                </CardTitle>
                <CardDescription>
                  Recurring behavior sequences and outcomes
                </CardDescription>
              </CardHeader>
              <CardContent>
                {discoveryResults?.pattern_discovery.sequence_motifs.map((motif: any, index: number) => (
                  <div key={index} className="mb-3 p-3 bg-orange-50 rounded">
                    <div className="text-sm space-y-2">
                      <div><strong>Motif:</strong> {motif.motif.join(' → ')}</div>
                      <div className="flex items-center gap-2">
                        <span><strong>Frequency:</strong> {Math.round(motif.frequency * 100)}%</span>
                        <Badge className={getConfidenceColor(motif.confidence)}>
                          {Math.round(motif.confidence * 100)}%
                        </Badge>
                      </div>
                      <div><strong>Outcome Correlation:</strong> {motif.outcome_correlation.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reliability & Quality Tab */}
        <TabsContent value="reliability" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Credibility Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ✅ Credibility Detection
                  <Badge variant="outline">Bot/Astroturf</Badge>
                </CardTitle>
                <CardDescription>
                  Automated credibility scoring and red flag detection
                </CardDescription>
              </CardHeader>
              <CardContent>
                {discoveryResults?.reliability_assessment.credibility && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Bot Likelihood</span>
                      <Badge variant="outline">
                        {Math.round(discoveryResults.reliability_assessment.credibility.bot_likelihood * 100)}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Astroturf Score</span>
                      <Badge variant="outline">
                        {Math.round(discoveryResults.reliability_assessment.credibility.astroturf_score * 100)}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Credibility Score</span>
                      <Badge className={getConfidenceColor(discoveryResults.reliability_assessment.credibility.credibility_score)}>
                        {Math.round(discoveryResults.reliability_assessment.credibility.credibility_score * 100)}%
                      </Badge>
                    </div>
                    {discoveryResults.reliability_assessment.credibility.red_flags.length > 0 && (
                      <div className="mt-3">
                        <strong>Red Flags:</strong>
                        <ul className="list-disc list-inside text-sm text-red-600">
                          {discoveryResults.reliability_assessment.credibility.red_flags.map((flag: string, index: number) => (
                            <li key={index}>{flag}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Claim Resolution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🔍 Claim Resolution
                  <Badge variant="outline">Deduplication</Badge>
                </CardTitle>
                <CardDescription>
                  Merged claims and novelty scoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                {discoveryResults?.reliability_assessment.claim_resolution.map((claim: any, index: number) => (
                  <div key={index} className="mb-3 p-3 bg-blue-50 rounded">
                    <div className="text-sm space-y-2">
                      <div><strong>Claim ID:</strong> {claim.claim_id}</div>
                      <div><strong>Merged Claims:</strong> {claim.merged_claims.length}</div>
                      <div><strong>Novelty Score:</strong> {claim.novelty_score.toFixed(2)}</div>
                      <div><strong>Verdict:</strong> 
                        <Badge variant="outline" className="ml-2">{claim.final_verdict}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Evidence Aggregation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📊 Evidence Aggregation
                  <Badge variant="outline">Time-Weighted</Badge>
                </CardTitle>
                <CardDescription>
                  Evidence strength and consensus levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                {discoveryResults?.reliability_assessment.evidence_aggregation.map((evidence: any, index: number) => (
                  <div key={index} className="mb-3 p-3 bg-green-50 rounded">
                    <div className="text-sm space-y-2">
                      <div><strong>Claim ID:</strong> {evidence.claim_id}</div>
                      <div className="flex items-center gap-2">
                        <span><strong>Evidence Strength:</strong></span>
                        <Badge className={getConfidenceColor(evidence.evidence_strength)}>
                          {Math.round(evidence.evidence_strength * 100)}%
                        </Badge>
                      </div>
                      <div><strong>Time-Weighted Score:</strong> {evidence.time_weighted_score.toFixed(2)}</div>
                      <div><strong>Consensus Level:</strong> {evidence.consensus_level.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Crosslingual Analysis Tab */}
        <TabsContent value="crosslingual" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Topic Alignment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🌍 Crosslingual Topic Alignment
                  <Badge variant="outline">Multilingual</Badge>
                </CardTitle>
                <CardDescription>
                  Topic clusters across different languages and regions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {discoveryResults?.crosslingual_insights.map((insight: any, index: number) => (
                  <div key={index} className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <strong>Topic Cluster:</strong>
                        <div className="text-lg font-semibold text-blue-800">{insight.topic_cluster}</div>
                      </div>
                      <div>
                        <strong>Language Coverage:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {insight.language_coverage.map((lang: string, langIndex: number) => (
                            <Badge key={langIndex} variant="secondary">{lang}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <strong>Alignment Confidence:</strong>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={insight.alignment_confidence * 100} className="flex-1" />
                          <Badge className={getConfidenceColor(insight.alignment_confidence)}>
                            {Math.round(insight.alignment_confidence * 100)}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <strong>Aligned Texts:</strong>
                      <div className="text-sm text-gray-600 mt-1">
                        {insight.aligned_texts.length} texts aligned across {insight.language_coverage.length} languages
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Generated Hypotheses Tab */}
        <TabsContent value="hypotheses" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Hypothesis Generation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🧪 Generated Hypotheses
                  <Badge variant="outline">Evidence-Backed</Badge>
                </CardTitle>
                <CardDescription>
                  AI-generated testable hypotheses with confidence scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                {discoveryResults?.generated_hypotheses.map((hypothesis: any, index: number) => (
                  <div key={index} className="mb-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <strong>Hypothesis ID:</strong>
                        <div className="font-mono text-sm bg-gray-100 p-2 rounded mt-1">
                          {hypothesis.hypothesis_id}
                        </div>
                      </div>
                      <div>
                        <strong>Testability Score:</strong>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={hypothesis.testability_score * 100} className="flex-1" />
                          <Badge variant="outline">
                            {Math.round(hypothesis.testability_score * 100)}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <strong>Statement:</strong>
                      <div className="text-lg font-medium text-gray-800 mt-1 p-3 bg-white rounded border">
                        {hypothesis.statement}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <strong>Evidence Support:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {hypothesis.evidence_support.map((evidence: string, evIndex: number) => (
                            <Badge key={evIndex} variant="secondary">{evidence}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <strong>Confidence:</strong>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={hypothesis.confidence * 100} className="flex-1" />
                          <Badge className={getConfidenceColor(hypothesis.confidence)}>
                            {Math.round(hypothesis.confidence * 100)}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Analysis Controls */}
      <div className="flex justify-center space-x-4">
        <Button 
          onClick={runDiscoveryAnalysis} 
          disabled={isAnalyzing}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isAnalyzing ? '🔄 Analyzing...' : '🔍 Run Discovery Analysis'}
        </Button>
        
        {discoveryResults && (
          <Button variant="outline" onClick={() => window.print()}>
            📄 Export Report
          </Button>
        )}
      </div>

      {/* Status Alerts */}
      {isAnalyzing && (
        <Alert>
          <AlertDescription>
            🧠 AI models are actively analyzing data and discovering patterns. This may take a few moments...
          </AlertDescription>
        </Alert>
      )}

      {discoveryResults && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription>
            ✅ Analysis complete! Discovered {discoveryResults.generated_hypotheses.length} testable hypotheses 
            with an overall discovery score of {Math.round(discoveryResults.overall_discovery_score * 100)}%.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
