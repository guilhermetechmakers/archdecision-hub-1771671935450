import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { meetings, projects } from '@/data/mock-data'
import { formatDate } from '@/lib/utils'
import {
  Plus, Calendar, Clock, Users, Video,
  CheckCircle, Circle, ListTodo,
} from 'lucide-react'

export function MeetingsPage() {
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null)
  const activeMeeting = meetings.find((m) => m.id === selectedMeeting)

  const upcomingMeetings = meetings.filter((m) => m.status === 'scheduled')
  const pastMeetings = meetings.filter((m) => m.status === 'completed')

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Meetings & Agendas</h1>
          <p className="text-sm text-muted-foreground">Schedule, prepare, and track meeting outcomes</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Schedule Meeting
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Meeting List */}
        <div className="space-y-6">
          {upcomingMeetings.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Upcoming</h3>
              <div className="space-y-2">
                {upcomingMeetings.map((meeting) => {
                  const project = projects.find((p) => p.id === meeting.projectId)
                  return (
                    <button
                      key={meeting.id}
                      onClick={() => setSelectedMeeting(meeting.id)}
                      className={`w-full rounded-lg border p-3 text-left transition-all ${
                        selectedMeeting === meeting.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{meeting.title}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(meeting.date)} &middot; {meeting.time}</p>
                          {project && <p className="text-xs text-muted-foreground mt-0.5">{project.name}</p>}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {pastMeetings.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Past</h3>
              <div className="space-y-2">
                {pastMeetings.map((meeting) => {
                  const project = projects.find((p) => p.id === meeting.projectId)
                  return (
                    <button
                      key={meeting.id}
                      onClick={() => setSelectedMeeting(meeting.id)}
                      className={`w-full rounded-lg border p-3 text-left transition-all ${
                        selectedMeeting === meeting.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-muted p-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{meeting.title}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(meeting.date)} &middot; {meeting.time}</p>
                          {project && <p className="text-xs text-muted-foreground mt-0.5">{project.name}</p>}
                        </div>
                        <Badge variant="success" className="text-[10px]">Done</Badge>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Meeting Detail */}
        <div className="lg:col-span-2">
          {activeMeeting ? (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant={activeMeeting.status === 'completed' ? 'success' : 'info'} className="mb-2 capitalize">
                        {activeMeeting.status}
                      </Badge>
                      <h2 className="text-xl font-bold">{activeMeeting.title}</h2>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{formatDate(activeMeeting.date)}</span>
                        <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{activeMeeting.time} ({activeMeeting.duration} min)</span>
                        <span className="flex items-center gap-1"><Users className="h-4 w-4" />{activeMeeting.attendees.length} attendees</span>
                      </div>
                    </div>
                    {activeMeeting.status === 'scheduled' && (
                      <Button size="sm" className="gap-2">
                        <Video className="h-4 w-4" /> Join
                      </Button>
                    )}
                  </div>

                  <div className="mt-4 flex -space-x-2">
                    {activeMeeting.attendees.map((a) => (
                      <Avatar key={a.id} name={a.name} size="sm" className="ring-2 ring-card" />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Agenda */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Agenda</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {activeMeeting.agendaItems.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-4 rounded-lg border border-border p-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.title}</p>
                        {item.presenter && <p className="text-xs text-muted-foreground">{item.presenter}</p>}
                      </div>
                      <span className="text-xs text-muted-foreground">{item.duration} min</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Notes */}
              {activeMeeting.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Meeting Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{activeMeeting.notes}</p>
                  </CardContent>
                </Card>
              )}

              {/* Action Items */}
              {activeMeeting.actionItems.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <ListTodo className="h-4 w-4" /> Action Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {activeMeeting.actionItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        {item.completed ? (
                          <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className={`text-sm ${item.completed ? 'line-through text-muted-foreground' : 'font-medium'}`}>
                            {item.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.assignee.name} &middot; Due {formatDate(item.dueDate)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card className="flex h-64 items-center justify-center">
              <div className="text-center">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground/30" />
                <p className="mt-4 text-muted-foreground">Select a meeting to view details</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
