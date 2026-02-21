import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar } from '@/components/ui/avatar'
import { projects, phaseLabels } from '@/data/mock-data'
import { formatDate } from '@/lib/utils'
import { Plus, Search, Filter, LayoutGrid, List } from 'lucide-react'

export function ProjectsListPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.client.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-muted-foreground">{projects.length} total projects</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> New Project
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <div className="flex rounded-lg border border-input">
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded-l-lg p-2 transition-colors ${viewMode === 'grid' ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`rounded-r-lg p-2 transition-colors ${viewMode === 'list' ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 animate-stagger">
          {filteredProjects.map((project) => (
            <Link key={project.id} to={`/dashboard/projects/${project.id}`}>
              <Card className="group cursor-pointer h-full hover:border-primary/20 transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="info" className="text-[10px]">{phaseLabels[project.phase]}</Badge>
                    <Badge variant={project.status === 'active' ? 'success' : 'secondary'} className="text-[10px] capitalize">
                      {project.status}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{project.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{project.client}</p>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                  <div className="mt-4">
                    <Progress value={project.progress} showLabel />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 4).map((m) => (
                        <Avatar key={m.id} name={m.name} size="sm" className="ring-2 ring-card" />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{formatDate(project.endDate)}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-2 animate-stagger">
          {filteredProjects.map((project) => (
            <Link key={project.id} to={`/dashboard/projects/${project.id}`}>
              <Card className="group cursor-pointer hover:border-primary/20 transition-all duration-200">
                <CardContent className="flex items-center gap-6 p-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.client}</p>
                  </div>
                  <Badge variant="info" className="hidden sm:inline-flex text-[10px]">{phaseLabels[project.phase]}</Badge>
                  <div className="hidden w-32 md:block">
                    <Progress value={project.progress} showLabel />
                  </div>
                  <div className="hidden lg:flex -space-x-2">
                    {project.team.slice(0, 3).map((m) => (
                      <Avatar key={m.id} name={m.name} size="sm" className="ring-2 ring-card" />
                    ))}
                  </div>
                  <span className="hidden text-xs text-muted-foreground sm:block whitespace-nowrap">{formatDate(project.endDate)}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
