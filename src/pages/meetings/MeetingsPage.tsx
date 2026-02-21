import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/empty-state'
import { Tooltip } from '@/components/ui/tooltip'
import { meetings, projects } from '@/data/mock-data'
import { formatDate, cn } from '@/lib/utils'
import { toast } from 'sonner'
import {
  Plus, Calendar, Clock, Users, Video,
  CheckCircle, Circle, ListTodo, CalendarX2,
  ClipboardList, MoreHorizontal,
} from 'lucide-react'

function MeetingListSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="mb-3 h-4 w-20" />
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-lg border border-border p-3">
              <div className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Skeleton className="mb-3 h-4 w-14" />
        <div className="space-y-2">
          {[1].map((i) => (
            <div key={i} className="rounded-lg border border-border p-3">
              <div className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MeetingDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="rounded-lg">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-3 flex-1">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-6 w-2/3" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <Skeleton className="h-9 w-20 rounded-lg" />
          </div>
          <div className="mt-4 flex gap-1">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-8 w-8 rounded-full" />
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="rounded-lg">
        <CardHeader>
          <Skeleton className="h-5 w-16" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 rounded-lg border border-border p-3">
              <Skeleton className="h-7 w-7 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/3" />
              </div>
              <Skeleton className="h-3 w-12" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export function MeetingsPage() {
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isScheduling, setIsScheduling] = useState(false)

  const activeMeeting = meetings.find((m) => m.id === selectedMeeting)
  const upcomingMeetings = meetings.filter((m) => m.status === 'scheduled')
  const pastMeetings = meetings.filter((m) => m.status === 'completed')

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleScheduleMeeting = useCallback(() => {
    setIsScheduling(true)
    toast.loading('Creating meeting...', { id: 'schedule-meeting' })
    setTimeout(() => {
      setIsScheduling(false)
      toast.success('Meeting scheduled successfully', {
        id: 'schedule-meeting',
        description: 'Invitations will be sent to all attendees.',
      })
    }, 1200)
  }, [])

  const handleJoinMeeting = useCallback((title: string) => {
    toast.success('Joining meeting...', {
      description: `Connecting to "${title}"`,
    })
  }, [])

  const handleToggleActionItem = useCallback((itemTitle: string, completed: boolean) => {
    const newState = !completed
    toast.success(
      newState ? 'Action item completed' : 'Action item reopened',
      { description: itemTitle },
    )
  }, [])

  const hasNoMeetings = upcomingMeetings.length === 0 && pastMeetings.length === 0

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Meetings & Agendas</h1>
          <p className="text-sm text-muted-foreground">
            Schedule, prepare, and track meeting outcomes
          </p>
        </div>
        <Button
          className="gap-2"
          onClick={handleScheduleMeeting}
          isLoading={isScheduling}
          aria-label="Schedule a new meeting"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Schedule Meeting
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <MeetingListSkeleton />
          <div className="lg:col-span-2">
            <MeetingDetailSkeleton />
          </div>
        </div>
      ) : hasNoMeetings ? (
        <Card className="rounded-lg">
          <EmptyState
            icon={<CalendarX2 className="h-8 w-8" aria-hidden="true" />}
            title="No meetings yet"
            description="Schedule your first meeting to start collaborating with your team and clients on project decisions."
            action={{
              label: 'Schedule Meeting',
              onClick: handleScheduleMeeting,
            }}
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Meeting List */}
          <div className="space-y-6" role="navigation" aria-label="Meetings list">
            {upcomingMeetings.length > 0 ? (
              <div>
                <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Upcoming
                </h3>
                <div className="space-y-2 animate-stagger" role="list" aria-label="Upcoming meetings">
                  {upcomingMeetings.map((meeting) => {
                    const project = projects.find((p) => p.id === meeting.projectId)
                    const isSelected = selectedMeeting === meeting.id
                    return (
                      <button
                        key={meeting.id}
                        role="listitem"
                        onClick={() => setSelectedMeeting(meeting.id)}
                        aria-label={`View details for ${meeting.title} on ${formatDate(meeting.date)} at ${meeting.time}`}
                        aria-pressed={isSelected}
                        className={cn(
                          'w-full rounded-lg border p-3 text-left transition-all duration-200',
                          isSelected
                            ? 'border-primary bg-primary/5 shadow-card-hover'
                            : 'border-border hover:border-primary/20 hover:shadow-card',
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className="rounded-lg bg-primary/10 p-2 text-primary" aria-hidden="true">
                            <Calendar className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{meeting.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(meeting.date)} &middot; {meeting.time}
                            </p>
                            {project && (
                              <p className="text-xs text-muted-foreground mt-0.5">{project.name}</p>
                            )}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Upcoming
                </h3>
                <Card className="rounded-lg">
                  <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                    <div className="mb-3 rounded-full bg-muted p-3 text-muted-foreground" aria-hidden="true">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium">No upcoming meetings</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Schedule a meeting to get started
                    </p>
                  </div>
                </Card>
              </div>
            )}

            {pastMeetings.length > 0 ? (
              <div>
                <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Past
                </h3>
                <div className="space-y-2 animate-stagger" role="list" aria-label="Past meetings">
                  {pastMeetings.map((meeting) => {
                    const project = projects.find((p) => p.id === meeting.projectId)
                    const isSelected = selectedMeeting === meeting.id
                    return (
                      <button
                        key={meeting.id}
                        role="listitem"
                        onClick={() => setSelectedMeeting(meeting.id)}
                        aria-label={`View details for ${meeting.title}, completed on ${formatDate(meeting.date)}`}
                        aria-pressed={isSelected}
                        className={cn(
                          'w-full rounded-lg border p-3 text-left transition-all duration-200',
                          isSelected
                            ? 'border-primary bg-primary/5 shadow-card-hover'
                            : 'border-border hover:border-primary/20 hover:shadow-card',
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className="rounded-lg bg-muted p-2 text-muted-foreground" aria-hidden="true">
                            <Calendar className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{meeting.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(meeting.date)} &middot; {meeting.time}
                            </p>
                            {project && (
                              <p className="text-xs text-muted-foreground mt-0.5">{project.name}</p>
                            )}
                          </div>
                          <Badge variant="success" className="text-[10px]">Done</Badge>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Past
                </h3>
                <Card className="rounded-lg">
                  <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                    <div className="mb-3 rounded-full bg-muted p-3 text-muted-foreground" aria-hidden="true">
                      <ClipboardList className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium">No past meetings</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Completed meetings will appear here
                    </p>
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Meeting Detail */}
          <div className="lg:col-span-2">
            {activeMeeting ? (
              <div className="space-y-6 animate-fade-in" aria-live="polite">
                <Card className="rounded-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Badge
                          variant={activeMeeting.status === 'completed' ? 'success' : 'info'}
                          className="mb-2 capitalize"
                        >
                          {activeMeeting.status}
                        </Badge>
                        <h2 className="text-xl font-bold">{activeMeeting.title}</h2>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" aria-hidden="true" />
                            <span>{formatDate(activeMeeting.date)}</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" aria-hidden="true" />
                            <span>{activeMeeting.time} ({activeMeeting.duration} min)</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="h-4 w-4" aria-hidden="true" />
                            <span>{activeMeeting.attendees.length} attendees</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {activeMeeting.status === 'scheduled' && (
                          <Button
                            size="sm"
                            className="gap-2"
                            onClick={() => handleJoinMeeting(activeMeeting.title)}
                            aria-label={`Join meeting: ${activeMeeting.title}`}
                          >
                            <Video className="h-4 w-4" aria-hidden="true" />
                            Join
                          </Button>
                        )}
                        <Tooltip content="More options">
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="More meeting options"
                            onClick={() => toast.info('Meeting options menu coming soon')}
                          >
                            <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                          </Button>
                        </Tooltip>
                      </div>
                    </div>

                    <div className="mt-4 flex -space-x-2" aria-label={`Attendees: ${activeMeeting.attendees.map(a => a.name).join(', ')}`}>
                      {activeMeeting.attendees.map((a) => (
                        <Tooltip key={a.id} content={a.name}>
                          <div>
                            <Avatar name={a.name} size="sm" className="ring-2 ring-card" />
                          </div>
                        </Tooltip>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Agenda */}
                <Card className="rounded-lg">
                  <CardHeader>
                    <CardTitle className="text-base">Agenda</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {activeMeeting.agendaItems.length > 0 ? (
                      <div className="space-y-3 animate-stagger">
                        {activeMeeting.agendaItems.map((item, index) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 rounded-lg border border-border p-3 transition-all duration-200 hover:shadow-card"
                          >
                            <span
                              className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
                              aria-label={`Agenda item ${index + 1}`}
                            >
                              {index + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">{item.title}</p>
                              {item.presenter && (
                                <p className="text-xs text-muted-foreground">{item.presenter}</p>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground shrink-0">
                              {item.duration} min
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="mb-3 rounded-full bg-muted p-3 text-muted-foreground" aria-hidden="true">
                          <ListTodo className="h-5 w-5" />
                        </div>
                        <p className="text-sm font-medium">No agenda items</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Add agenda items to keep your meeting on track
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Notes */}
                {activeMeeting.notes && (
                  <Card className="rounded-lg">
                    <CardHeader>
                      <CardTitle className="text-base">Meeting Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {activeMeeting.notes}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Action Items */}
                <Card className="rounded-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <ListTodo className="h-4 w-4" aria-hidden="true" />
                      Action Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {activeMeeting.actionItems.length > 0 ? (
                      <div className="space-y-3 animate-stagger">
                        {activeMeeting.actionItems.map((item) => (
                          <button
                            key={item.id}
                            className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-all duration-200 hover:bg-muted/50"
                            onClick={() => handleToggleActionItem(item.title, item.completed)}
                            aria-label={`${item.completed ? 'Reopen' : 'Complete'} action item: ${item.title}`}
                          >
                            {item.completed ? (
                              <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" aria-hidden="true" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground shrink-0" aria-hidden="true" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p
                                className={cn(
                                  'text-sm',
                                  item.completed
                                    ? 'line-through text-muted-foreground'
                                    : 'font-medium',
                                )}
                              >
                                {item.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {item.assignee.name} &middot; Due {formatDate(item.dueDate)}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="mb-3 rounded-full bg-muted p-3 text-muted-foreground" aria-hidden="true">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <p className="text-sm font-medium">No action items</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Action items from this meeting will appear here
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="flex h-64 items-center justify-center rounded-lg">
                <div className="text-center">
                  <div className="mx-auto mb-4 rounded-full bg-muted p-4" aria-hidden="true">
                    <Calendar className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <p className="font-medium text-muted-foreground">Select a meeting to view details</p>
                  <p className="mt-1 text-xs text-muted-foreground/70">
                    Choose from the list on the left
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
