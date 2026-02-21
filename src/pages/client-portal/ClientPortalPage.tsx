import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { decisions, projects, meetings } from '@/data/mock-data'
import { formatDate } from '@/lib/utils'
import {
  ClipboardCheck, Calendar, ArrowRight, CheckCircle, Clock,
  FileText, Bell, PartyPopper,
} from 'lucide-react'

export function ClientPortalPage() {
  const pendingDecisions = decisions.filter((d) => d.status === 'pending')
  const approvedDecisions = decisions.filter((d) => d.status === 'approved')
  const upcomingMeetings = meetings.filter((m) => m.status === 'scheduled')

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold">Welcome, James</h1>
        <p className="text-sm text-muted-foreground">Here's what needs your attention across your projects.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-warning/30 bg-warning-muted/50">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-warning-muted p-2.5 text-warning-foreground">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingDecisions.length}</p>
              <p className="text-sm text-muted-foreground">Pending Approvals</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-success/30 bg-success-muted/50">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-success-muted p-2.5 text-success-foreground">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{approvedDecisions.length}</p>
              <p className="text-sm text-muted-foreground">Approved Decisions</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-info/30 bg-info-muted/50">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-info-muted p-2.5 text-info-foreground">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{upcomingMeetings.length}</p>
              <p className="text-sm text-muted-foreground">Upcoming Meetings</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Decisions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
          <Bell className="h-5 w-5 text-warning-foreground" /> Awaiting Your Approval
        </h2>
        {pendingDecisions.length > 0 ? (
          <div className="space-y-3 animate-stagger">
            {pendingDecisions.map((decision) => {
              const project = projects.find((p) => p.id === decision.projectId)
              return (
                <Card key={decision.id} className="group hover:border-primary/20 transition-all">
                  <CardContent className="p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                      <div className="rounded-lg bg-warning-muted p-2.5 text-warning-foreground shrink-0">
                        <ClipboardCheck className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">{project?.name}</p>
                        <h3 className="font-semibold">{decision.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{decision.description}</p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{decision.options.length} options</span>
                          {decision.dueDate && <span className="text-warning-foreground font-medium">Due {formatDate(decision.dueDate)}</span>}
                        </div>
                      </div>
                      <Link to={`/dashboard/projects/${decision.projectId}/decisions/${decision.id}`}>
                        <Button size="sm" className="gap-1 shrink-0">
                          Review <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <EmptyState
                icon={<PartyPopper className="h-6 w-6" />}
                title="You're all caught up!"
                description="There are no pending decisions awaiting your approval right now. We'll notify you when something needs your attention."
                className="py-12"
              />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Weekly Update */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Weekly Update - Feb 17, 2026</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-medium mb-2">What happened this week</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-success-foreground mt-0.5 shrink-0" /> HVAC System Type decision approved</li>
              <li className="flex items-start gap-2"><FileText className="h-4 w-4 text-info-foreground mt-0.5 shrink-0" /> Floor plans updated to version 5</li>
              <li className="flex items-start gap-2"><Calendar className="h-4 w-4 text-purple-500 mt-0.5 shrink-0" /> Weekly sync completed with 3 action items</li>
            </ul>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-medium mb-2">What's coming next</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><Clock className="h-4 w-4 text-warning-foreground mt-0.5 shrink-0" /> Cladding material decision review meeting (Feb 24)</li>
              <li className="flex items-start gap-2"><ClipboardCheck className="h-4 w-4 text-warning-foreground mt-0.5 shrink-0" /> Gallery lighting design decision coming soon</li>
            </ul>
          </div>
          <div className="rounded-lg bg-warning-muted/50 border border-warning/30 p-4">
            <h4 className="font-medium text-warning-foreground mb-2">What we need from you</h4>
            <ul className="space-y-1.5 text-sm text-warning-foreground/80">
              <li>Review and approve the Exterior Cladding Material Selection</li>
              <li>Confirm attendance for the Feb 24 design review meeting</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
