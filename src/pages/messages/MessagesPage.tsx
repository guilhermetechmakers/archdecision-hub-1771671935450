import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { messageThreads, projects } from '@/data/mock-data'
import { formatDate, cn } from '@/lib/utils'
import {
  Search, Plus, Send, Paperclip, ClipboardCheck, FileText,
  ListTodo, Calendar, MessageSquare,
} from 'lucide-react'

const contextIcons: Record<string, typeof MessageSquare> = {
  decision: ClipboardCheck,
  file: FileText,
  task: ListTodo,
  meeting: Calendar,
}

export function MessagesPage() {
  const [selectedThread, setSelectedThread] = useState<string | null>(messageThreads[0]?.id || null)
  const [searchQuery, setSearchQuery] = useState('')
  const [messageText, setMessageText] = useState('')

  const filteredThreads = messageThreads.filter((t) =>
    t.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeThread = messageThreads.find((t) => t.id === selectedThread)

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-sm text-muted-foreground">Contextual conversations tied to project artifacts</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> New Thread
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3" style={{ height: 'calc(100vh - 220px)' }}>
        {/* Thread List */}
        <div className="space-y-3 overflow-y-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="space-y-1">
            {filteredThreads.map((thread) => {
              const project = projects.find((p) => p.id === thread.projectId)
              const ContextIcon = thread.contextType ? contextIcons[thread.contextType] : undefined
              return (
                <button
                  key={thread.id}
                  onClick={() => setSelectedThread(thread.id)}
                  className={cn(
                    'w-full rounded-lg p-3 text-left transition-colors',
                    selectedThread === thread.id
                      ? 'bg-primary/10 border border-primary/20'
                      : 'hover:bg-accent border border-transparent'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Avatar name={thread.lastMessage.sender.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium truncate">{thread.subject}</p>
                        {thread.unreadCount > 0 && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shrink-0">
                            {thread.unreadCount}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{thread.lastMessage.content}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {ContextIcon && <ContextIcon className="h-3 w-3 text-muted-foreground" />}
                        {project && <span className="text-[10px] text-muted-foreground">{project.name}</span>}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Message Panel */}
        <div className="lg:col-span-2">
          {activeThread ? (
            <Card className="flex h-full flex-col">
              <div className="border-b border-border p-4">
                <h3 className="font-semibold">{activeThread.subject}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {activeThread.participants.slice(0, 3).map((p) => (
                      <Avatar key={p.id} name={p.name} size="sm" className="h-5 w-5 text-[8px] ring-2 ring-card" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activeThread.participants.map((p) => p.name).join(', ')}
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex gap-3">
                  <Avatar name={activeThread.lastMessage.sender.name} size="sm" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{activeThread.lastMessage.sender.name}</span>
                      <span className="text-xs text-muted-foreground">{formatDate(activeThread.lastMessage.createdAt)}</span>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-sm">{activeThread.lastMessage.content}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="min-h-[40px] resize-none"
                  />
                  <div className="flex flex-col gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button size="icon" className="h-8 w-8" disabled={!messageText.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="flex h-full items-center justify-center">
              <div className="text-center">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/30" />
                <p className="mt-4 text-muted-foreground">Select a thread to view messages</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
