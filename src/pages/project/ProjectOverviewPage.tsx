import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Tabs, TabContent, useTabState } from '@/components/ui/tabs'
import { projects, decisions, tasks, projectFiles, meetings, phaseLabels, statusColors } from '@/data/mock-data'
import { formatDate } from '@/lib/utils'
import {
  ArrowLeft, ClipboardCheck, FileText, Calendar,
  ListTodo, Users, Settings, ChevronRight,
  Plus, Download,
} from 'lucide-react'

const phases = [
  { key: 'kickoff', label: 'Kickoff', progress: 100 },
  { key: 'schematic', label: 'SD', progress: 100 },
  { key: 'design-development', label: 'DD', progress: 45 },
  { key: 'construction-docs', label: 'CD', progress: 0 },
  { key: 'bidding', label: 'Bid', progress: 0 },
  { key: 'construction', label: 'CA', progress: 0 },
  { key: 'closeout', label: 'Close', progress: 0 },
]

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'decisions', label: 'Decisions', icon: <ClipboardCheck className="h-4 w-4" /> },
  { id: 'files', label: 'Files', icon: <FileText className="h-4 w-4" /> },
  { id: 'tasks', label: 'Tasks', icon: <ListTodo className="h-4 w-4" /> },
  { id: 'meetings', label: 'Meetings', icon: <Calendar className="h-4 w-4" /> },
  { id: 'team', label: 'Team', icon: <Users className="h-4 w-4" /> },
]

export function ProjectOverviewPage() {
  const { projectId } = useParams()
  const { activeTab, setActiveTab } = useTabState('overview')
  const project = projects.find((p) => p.id === projectId) || projects[0]!
  const projectDecisions = decisions.filter((d) => d.projectId === project.id)
  const projectTasks = tasks.filter((t) => t.projectId === project.id)
  const projectMeetings = meetings.filter((m) => m.projectId === project.id)

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <Link to="/dashboard/projects" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Link>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold">{project.name}</h1>
              <Badge variant="info">{phaseLabels[project.phase]}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{project.client} &middot; {formatDate(project.startDate)} – {formatDate(project.endDate)}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" /> Settings
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Add Decision
            </Button>
          </div>
        </div>
      </div>

      {/* Phase Timeline */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Project Timeline</h3>
            <span className="text-sm text-muted-foreground">{project.progress}% Complete</span>
          </div>
          <div className="flex gap-2">
            {phases.map((phase) => (
              <div key={phase.key} className="flex-1">
                <div className={`h-2 rounded-full transition-all ${
                  phase.progress === 100
                    ? 'bg-primary'
                    : phase.progress > 0
                    ? 'bg-gradient-to-r from-primary to-primary/30'
                    : 'bg-muted'
                }`} />
                <p className={`mt-2 text-center text-xs font-medium ${
                  phase.key === project.phase ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {phase.label}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <TabContent>
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader><CardTitle>Project Summary</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="rounded-lg bg-muted/50 p-3 text-center">
                      <p className="text-2xl font-bold">{projectDecisions.length}</p>
                      <p className="text-xs text-muted-foreground">Decisions</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3 text-center">
                      <p className="text-2xl font-bold">{projectTasks.length}</p>
                      <p className="text-xs text-muted-foreground">Tasks</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3 text-center">
                      <p className="text-2xl font-bold">{projectFiles.length}</p>
                      <p className="text-xs text-muted-foreground">Files</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3 text-center">
                      <p className="text-2xl font-bold">{projectMeetings.length}</p>
                      <p className="text-xs text-muted-foreground">Meetings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Decisions */}
              <Card>
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle>Recent Decisions</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('decisions')}>View all</Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {projectDecisions.slice(0, 3).map((d) => (
                    <Link key={d.id} to={`/dashboard/projects/${project.id}/decisions/${d.id}`} className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-accent/50 transition-colors">
                      <ClipboardCheck className="h-5 w-5 text-muted-foreground shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{d.title}</p>
                        <p className="text-xs text-muted-foreground">{d.category} &middot; v{d.version}</p>
                      </div>
                      <Badge className={statusColors[d.status]} variant="secondary">{d.status}</Badge>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-base">Team</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {project.team.map((member) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <Avatar name={member.name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{member.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{member.role.replace('-', ' ')}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Upcoming</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {projectMeetings.filter((m) => m.status === 'scheduled').map((m) => (
                    <div key={m.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
                      <Calendar className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium">{m.title}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(m.date)} &middot; {m.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'decisions' && (
          <div className="space-y-3">
            {projectDecisions.map((d) => (
              <Link key={d.id} to={`/dashboard/projects/${project.id}/decisions/${d.id}`}>
                <Card className="group cursor-pointer hover:border-primary/20 transition-all">
                  <CardContent className="flex items-center gap-4 p-4">
                    <ClipboardCheck className="h-5 w-5 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium group-hover:text-primary transition-colors">{d.title}</p>
                      <p className="text-sm text-muted-foreground">{d.category} &middot; {d.options.length} options &middot; v{d.version}</p>
                    </div>
                    <Badge className={statusColors[d.status]} variant="secondary">{d.status}</Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'files' && (
          <div className="space-y-3">
            {projectFiles.map((f) => (
              <Card key={f.id} className="group hover:border-primary/20 transition-all">
                <CardContent className="flex items-center gap-4 p-4">
                  <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{f.name}</p>
                    <p className="text-sm text-muted-foreground">{f.folder} &middot; v{f.version} &middot; {(f.size / 1000000).toFixed(1)} MB</p>
                  </div>
                  <span className="hidden text-xs text-muted-foreground sm:block">{formatDate(f.uploadedAt)}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-3">
            {projectTasks.map((t) => (
              <Card key={t.id} className="hover:border-primary/20 transition-all">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className={`h-2 w-2 rounded-full shrink-0 ${
                    t.status === 'done' ? 'bg-emerald-500' :
                    t.status === 'in-progress' ? 'bg-blue-500' :
                    t.status === 'review' ? 'bg-amber-500' : 'bg-gray-300'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{t.title}</p>
                      {t.isRfi && <Badge variant="warning" className="text-[10px]">RFI</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{t.assignee.name} &middot; Due {formatDate(t.dueDate)}</p>
                  </div>
                  <Badge variant="secondary" className="capitalize text-xs">{t.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'meetings' && (
          <div className="space-y-3">
            {projectMeetings.map((m) => (
              <Card key={m.id} className="hover:border-primary/20 transition-all">
                <CardContent className="flex items-center gap-4 p-4">
                  <Calendar className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{m.title}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(m.date)} &middot; {m.time} &middot; {m.duration} min</p>
                  </div>
                  <Badge variant={m.status === 'completed' ? 'success' : 'info'} className="capitalize text-xs">{m.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'team' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.team.map((member) => (
              <Card key={member.id}>
                <CardContent className="flex items-center gap-4 p-6">
                  <Avatar name={member.name} size="lg" />
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{member.role.replace('-', ' ')}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabContent>
    </div>
  )
}
