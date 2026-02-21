import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { statusColors, phaseLabels } from '@/data/mock-data'
import { formatDate } from '@/lib/utils'
import type { Decision, Project } from '@/types'
import {
  ArrowLeft, Clock, Calendar, Tag, GitBranch,
} from 'lucide-react'

interface DecisionHeaderProps {
  decision: Decision
  project?: Project
}

export function DecisionHeader({ decision, project }: DecisionHeaderProps) {
  const backPath = project
    ? `/dashboard/projects/${project.id}`
    : '/dashboard/decisions'

  return (
    <div className="space-y-4 animate-fade-in">
      <Link
        to={backPath}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        {project ? `Back to ${project.name}` : 'Back to Decisions'}
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={statusColors[decision.status]} variant="secondary">
              {decision.status.charAt(0).toUpperCase() + decision.status.slice(1)}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Tag className="h-3 w-3" />
              {decision.category}
            </Badge>
            <Badge variant="info" className="gap-1">
              <GitBranch className="h-3 w-3" />
              v{decision.version}
            </Badge>
            {decision.phase && (
              <Badge variant="outline" className="text-muted-foreground">
                {phaseLabels[decision.phase] || decision.phase}
              </Badge>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
              {decision.title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
              {decision.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar name={decision.createdBy.name} size="sm" className="h-6 w-6 text-[10px]" />
              <span>Created by <span className="font-medium text-foreground">{decision.createdBy.name}</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>Updated {formatDate(decision.updatedAt)}</span>
            </div>
            {decision.dueDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-amber-600 font-medium">Due {formatDate(decision.dueDate)}</span>
              </div>
            )}
            {project && (
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-muted-foreground">Project:</span>
                <Link
                  to={`/dashboard/projects/${project.id}`}
                  className="font-medium text-primary hover:underline"
                >
                  {project.name}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
