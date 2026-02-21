import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/empty-state'
import { projects, kpiMetrics, activityFeed, decisions, phaseLabels } from '@/data/mock-data'
import { formatDate } from '@/lib/utils'
import {
  Building2, ClipboardCheck, CheckCircle, Clock, TrendingUp, TrendingDown,
  ArrowRight, Plus, FolderKanban, FileText, MessageSquare, Calendar,
  ListTodo, Zap, Inbox,
} from 'lucide-react'

const iconMap: Record<string, typeof Building2> = {
  'building': Building2,
  'clipboard-check': ClipboardCheck,
  'check-circle': CheckCircle,
  'clock': Clock,
}

const activityIcons: Record<string, typeof Zap> = {
  decision: ClipboardCheck,
  file: FileText,
  message: MessageSquare,
  meeting: Calendar,
  task: ListTodo,
  approval: CheckCircle,
}

function KpiSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="mt-4 space-y-2">
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  )
}

function ProjectCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0 space-y-2">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex -space-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
        <div className="mt-4">
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}

function PendingDecisionSkeleton() {
  return (
    <div className="rounded-lg border border-border p-3 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-14 rounded-full" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  )
}

function ActivityItemSkeleton() {
  return (
    <div className="flex gap-3">
      <Skeleton className="mt-0.5 h-7 w-7 rounded-full shrink-0" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  )
}

export function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const activeProjects = projects.filter((p) => p.status === 'active').slice(0, 4)
  const pendingDecisions = decisions.filter((d) => d.status === 'pending')

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, Sarah. Here's what's happening.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/dashboard/projects">
            <Button variant="outline" size="sm" className="gap-2">
              <FolderKanban className="h-4 w-4" /> View All Projects
            </Button>
          </Link>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> New Project
          </Button>
        </div>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-stagger">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <KpiSkeleton key={i} />)
          : kpiMetrics.map((metric) => {
              const Icon = iconMap[metric.icon] || Building2
              return (
                <Card key={metric.label} className="group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="rounded-lg bg-primary/10 p-2.5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className={`flex items-center gap-1 text-xs font-medium ${
                        metric.trend === 'up' ? 'text-emerald-600' : metric.trend === 'down' ? 'text-emerald-600' : 'text-muted-foreground'
                      }`}>
                        {metric.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {Math.abs(metric.change)}%
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Projects List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Active Projects</h2>
            <Link to="/dashboard/projects" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          ) : activeProjects.length === 0 ? (
            <Card>
              <CardContent className="p-0">
                <EmptyState
                  icon={<FolderKanban className="h-8 w-8" />}
                  title="No active projects"
                  description="Get started by creating your first project or applying a template from the library."
                  action={{
                    label: 'Create Project',
                    onClick: () => {},
                  }}
                  className="py-12"
                />
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3 animate-stagger">
              {activeProjects.map((project) => (
                <Link key={project.id} to={`/dashboard/projects/${project.id}`}>
                  <Card className="group cursor-pointer hover:border-primary/20 transition-all duration-200">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="info" className="text-[10px]">
                              {phaseLabels[project.phase]}
                            </Badge>
                          </div>
                          <h3 className="font-semibold truncate group-hover:text-primary transition-colors">{project.name}</h3>
                          <p className="text-sm text-muted-foreground">{project.client}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="flex -space-x-2">
                            {project.team.slice(0, 3).map((member) => (
                              <Avatar key={member.id} name={member.name} size="sm" className="ring-2 ring-card" />
                            ))}
                            {project.team.length > 3 && (
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium ring-2 ring-card">
                                +{project.team.length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Progress value={project.progress} showLabel />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Pending Decisions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <ClipboardCheck className="h-4 w-4 text-amber-500" />
                Pending Decisions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <PendingDecisionSkeleton key={i} />
                ))
              ) : pendingDecisions.length === 0 ? (
                <EmptyState
                  icon={<Inbox className="h-6 w-6" />}
                  title="All caught up"
                  description="No decisions are waiting for review. New decisions will appear here when published."
                  className="py-8"
                />
              ) : (
                <>
                  {pendingDecisions.slice(0, 3).map((decision) => (
                    <Link
                      key={decision.id}
                      to={`/dashboard/projects/${decision.projectId}/decisions/${decision.id}`}
                      className="block rounded-lg border border-border p-3 hover:bg-accent/50 transition-colors"
                    >
                      <p className="text-sm font-medium">{decision.title}</p>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="warning" className="text-[10px]">Pending</Badge>
                        {decision.dueDate && <span>Due {formatDate(decision.dueDate)}</span>}
                      </div>
                    </Link>
                  ))}
                  <Link to="/dashboard/decisions">
                    <Button variant="ghost" size="sm" className="w-full gap-1">
                      View all decisions <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </>
              )}
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <ActivityItemSkeleton key={i} />
                  ))}
                </div>
              ) : activityFeed.length === 0 ? (
                <EmptyState
                  icon={<Zap className="h-6 w-6" />}
                  title="No recent activity"
                  description="Activity from your projects will show up here as your team makes progress."
                  className="py-8"
                />
              ) : (
                <div className="space-y-4">
                  {activityFeed.slice(0, 6).map((activity) => {
                    const Icon = activityIcons[activity.type] || Zap
                    return (
                      <div key={activity.id} className="flex gap-3">
                        <div className="mt-0.5 rounded-full bg-muted p-1.5">
                          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">
                            <span className="font-medium">{activity.title}</span>
                          </p>
                          <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{formatDate(activity.timestamp)}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
