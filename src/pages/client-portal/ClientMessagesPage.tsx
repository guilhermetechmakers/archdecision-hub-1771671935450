import { Card, CardContent } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { messageThreads, projects } from '@/data/mock-data'
import { formatDate } from '@/lib/utils'

export function ClientMessagesPage() {
  const clientThreads = messageThreads.filter((t) =>
    t.participants.some((p) => p.role === 'client')
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-sm text-muted-foreground">Your conversations with the project team</p>
      </div>

      <div className="space-y-3">
        {clientThreads.map((thread) => {
          const project = projects.find((p) => p.id === thread.projectId)
          return (
            <Card key={thread.id} className="group cursor-pointer hover:border-primary/20 transition-all">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <Avatar name={thread.lastMessage.sender.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-medium truncate">{thread.subject}</h3>
                      {thread.unreadCount > 0 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shrink-0">
                          {thread.unreadCount}
                        </span>
                      )}
                    </div>
                    {project && <p className="text-xs text-muted-foreground">{project.name}</p>}
                    <p className="mt-1 text-sm text-muted-foreground truncate">{thread.lastMessage.content}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{formatDate(thread.lastMessage.createdAt)}</p>
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
