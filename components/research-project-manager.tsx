"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Users, Calendar, FileText, TrendingUp } from "lucide-react"

interface ResearchProject {
  id: string
  title: string
  description: string
  created_by: string
  collaborators: string[]
  status: "active" | "completed" | "paused"
  created_at: string
  tags: string[]
  findings: any[]
}

export default function ResearchProjectManager() {
  const [projects, setProjects] = useState<ResearchProject[]>([])
  const [loading, setLoading] = useState(true)
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    tags: "",
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/research/projects")
      const data = await response.json()
      setProjects(data.projects || [])
    } catch (error) {
      console.error("Failed to fetch projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const createProject = async () => {
    try {
      const response = await fetch("/api/research/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newProject,
          tags: newProject.tags.split(",").map((tag) => tag.trim()),
          created_by: "Current User", // In real app, get from auth
          collaborators: [],
          status: "active",
        }),
      })

      const data = await response.json()
      if (data.success) {
        setProjects((prev) => [data.project, ...prev])
        setNewProject({ title: "", description: "", tags: "" })
      }
    } catch (error) {
      console.error("Failed to create project:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "completed":
        return "secondary"
      case "paused":
        return "outline"
      default:
        return "default"
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading research projects...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Research Projects</h2>
          <p className="text-gray-600">Manage and collaborate on T1D research initiatives</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Research Project</DialogTitle>
              <DialogDescription>Start a new research project to organize your T1D investigations</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Project Title</Label>
                <Input
                  value={newProject.title}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., CGM Accuracy in Exercise Conditions"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the research objectives and methodology..."
                />
              </div>
              <div className="space-y-2">
                <Label>Tags (comma-separated)</Label>
                <Input
                  value={newProject.tags}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, tags: e.target.value }))}
                  placeholder="cgm, exercise, accuracy, correlation"
                />
              </div>
              <Button onClick={createProject} className="w-full">
                Create Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <Badge variant={getStatusColor(project.status)}>{project.status}</Badge>
                </div>
                <Button variant="outline" size="sm">
                  Open
                </Button>
              </div>
              <CardDescription className="line-clamp-2">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Project Stats */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{project.collaborators.length + 1} members</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>{project.findings.length} findings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{new Date(project.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Collaborators */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Team</div>
                <div className="text-sm text-gray-600">
                  <div>Lead: {project.created_by}</div>
                  {project.collaborators.length > 0 && <div>Collaborators: {project.collaborators.join(", ")}</div>}
                </div>
              </div>

              {/* Recent Activity */}
              {project.findings.length > 0 && (
                <div className="border-t pt-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">Latest finding: {project.findings[0].title}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Research Projects</h3>
            <p className="text-gray-600 mb-4">
              Create your first research project to start organizing your T1D investigations
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Project
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Research Project</DialogTitle>
                  <DialogDescription>
                    Start a new research project to organize your T1D investigations
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Project Title</Label>
                    <Input
                      value={newProject.title}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., CGM Accuracy in Exercise Conditions"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={newProject.description}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the research objectives and methodology..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tags (comma-separated)</Label>
                    <Input
                      value={newProject.tags}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, tags: e.target.value }))}
                      placeholder="cgm, exercise, accuracy, correlation"
                    />
                  </div>
                  <Button onClick={createProject} className="w-full">
                    Create Project
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
