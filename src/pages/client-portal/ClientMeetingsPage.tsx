import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { meetings, projects } from '@/data/mock-data'
import { formatDate } from '@/lib/utils'
import { Calendar, Clock, Users } from 'lucide-react'

export function ClientMeetingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Meetings</h1>
        <p className="text-sm text-muted-foreground">Your scheduled and past meetings</p>
      </div>

      <div className="space-y-3">
        {meetings.map((meeting) => {
          const project = projects.find((p) => p.id === meeting.projectId)
          return (
            <Card key={meeting.id} className="hover:border-primary/20 transition-all">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`rounded-lg p-2.5 ${meeting.status === 'scheduled' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{meeting.title}</h3>
                      <Badge variant={meeting.status === 'completed' ? 'success' : 'info'} className="capitalize text-xs">
                        {meeting.status}
                      </Badge>
                    </div>
                    {project && <p className="text-xs text-muted-foreground mb-2">{project.name}</p>}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDate(meeting.date)}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{meeting.time}</span>
                      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{meeting.attendees.length} attendees</span>
                    </div>
                    <div className="mt-2 flex -space-x-1">
                      {meeting.attendees.slice(0, 4).map((a) => (
                        <Avatar key={a.id} name={a.name} size="sm" className="h-6 w-6 text-[8px] ring-2 ring-card" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
