import { useState, useEffect, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/empty-state'
import { Tooltip } from '@/components/ui/tooltip'
import { messageThreads, projects } from '@/data/mock-data'
import { formatDate, cn } from '@/lib/utils'
import type { MessageThread } from '@/types'
import {
  Search, Plus, Send, Paperclip, ClipboardCheck, FileText,
  ListTodo, Calendar, MessageSquare, Inbox, SearchX,
  ArrowLeft, Hash, AlertCircle, RefreshCw,
} from 'lucide-react'

const contextIcons: Record<string, typeof MessageSquare> = {
  decision: ClipboardCheck,
  file: FileText,
  task: ListTodo,
  meeting: Calendar,
}

const contextLabels: Record<string, string> = {
  decision: 'Decision',
  file: 'File',
  task: 'Task',
  meeting: 'Meeting',
}

function ThreadListSkeleton() {
  return (
    <div className="space-y-2" role="status" aria-label="Loading message threads">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-lg border border-transparent p-3">
          <div className="flex items-start gap-3">
            <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
              </div>
              <Skeleton className="h-3 w-full" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>
        </div>
      ))}
      <span className="sr-only">Loading threads...</span>
    </div>
  )
}

function MessagePanelSkeleton() {
  return (
    <Card className="flex h-full flex-col" role="status" aria-label="Loading messages">
      <div className="border-b border-border p-4">
        <Skeleton className="h-5 w-48" />
        <div className="mt-2 flex items-center gap-2">
          <div className="flex -space-x-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-5 rounded-full ring-2 ring-card" />
            ))}
          </div>
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-16 w-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1 rounded-lg" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        </div>
      </div>
      <span className="sr-only">Loading messages...</span>
    </Card>
  )
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <Card className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 rounded-full bg-destructive/10 p-4 text-destructive">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">Failed to load messages</h3>
        <p className="mb-6 max-w-sm text-sm text-muted-foreground">
          Something went wrong while loading your messages. Please try again.
        </p>
        <Button onClick={onRetry} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Retry
        </Button>
      </div>
    </Card>
  )
}

export function MessagesPage() {
  const [selectedThread, setSelectedThread] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [messageText, setMessageText] = useState('')
  const [isLoadingThreads, setIsLoadingThreads] = useState(true)
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [threads, setThreads] = useState<MessageThread[]>([])
  const [showMobilePanel, setShowMobilePanel] = useState(false)

  const loadThreads = useCallback(() => {
    setIsLoadingThreads(true)
    setHasError(false)
    const timer = setTimeout(() => {
      setThreads(messageThreads)
      setIsLoadingThreads(false)
      if (messageThreads.length > 0) {
        setSelectedThread(messageThreads[0]!.id)
      }
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const cleanup = loadThreads()
    return cleanup
  }, [loadThreads])

  const handleSelectThread = (threadId: string) => {
    setIsLoadingMessages(true)
    setSelectedThread(threadId)
    setShowMobilePanel(true)
    setTimeout(() => {
      setIsLoadingMessages(false)
    }, 400)
  }

  const handleSendMessage = async () => {
    if (!messageText.trim() || isSending) return
    setIsSending(true)
    await new Promise((resolve) => setTimeout(resolve, 600))
    setMessageText('')
    setIsSending(false)
  }

  const filteredThreads = threads.filter((t) =>
    t.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeThread = threads.find((t) => t.id === selectedThread)

  if (hasError) {
    return (
      <div className="p-6 lg:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Messages</h1>
            <p className="text-sm text-muted-foreground">Contextual conversations tied to project artifacts</p>
          </div>
        </div>
        <ErrorState onRetry={loadThreads} />
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-sm text-muted-foreground">
            Contextual conversations tied to project artifacts
          </p>
        </div>
        <Tooltip content="Start a new conversation thread">
          <Button className="gap-2" aria-label="Create new message thread">
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">New Thread</span>
          </Button>
        </Tooltip>
      </div>

      <div
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        style={{ height: 'calc(100vh - 220px)' }}
      >
        {/* Thread List */}
        <Card
          className={cn(
            'flex flex-col overflow-hidden',
            showMobilePanel && 'hidden lg:flex'
          )}
        >
          <div className="border-b border-border p-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                aria-label="Search message threads"
              />
            </div>
          </div>

          <nav
            className="flex-1 overflow-y-auto p-2"
            aria-label="Message threads"
            role="list"
          >
            {isLoadingThreads ? (
              <ThreadListSkeleton />
            ) : filteredThreads.length === 0 && searchQuery ? (
              <EmptyState
                icon={<SearchX className="h-8 w-8" />}
                title="No threads found"
                description={`No conversations match "${searchQuery}". Try a different search term.`}
                className="py-12"
              />
            ) : filteredThreads.length === 0 ? (
              <EmptyState
                icon={<Inbox className="h-8 w-8" />}
                title="No conversations yet"
                description="Start a new thread to begin collaborating with your team on project decisions and files."
                action={{
                  label: 'New Thread',
                  onClick: () => {},
                }}
                className="py-12"
              />
            ) : (
              <div className="space-y-1 animate-stagger">
                {filteredThreads.map((thread) => {
                  const project = projects.find((p) => p.id === thread.projectId)
                  const ContextIcon = thread.contextType
                    ? contextIcons[thread.contextType]
                    : undefined
                  const isSelected = selectedThread === thread.id

                  return (
                    <button
                      key={thread.id}
                      role="listitem"
                      onClick={() => handleSelectThread(thread.id)}
                      aria-label={`${thread.subject}${thread.unreadCount > 0 ? `, ${thread.unreadCount} unread messages` : ''}`}
                      aria-current={isSelected ? 'true' : undefined}
                      className={cn(
                        'w-full rounded-lg p-3 text-left transition-all duration-200',
                        isSelected
                          ? 'bg-primary/10 border border-primary/20 shadow-sm'
                          : 'border border-transparent hover:bg-accent hover:shadow-sm'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar
                          name={thread.lastMessage.sender.name}
                          size="sm"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p
                              className={cn(
                                'truncate text-sm',
                                isSelected ? 'font-semibold' : 'font-medium',
                                thread.unreadCount > 0 && 'font-semibold'
                              )}
                            >
                              {thread.subject}
                            </p>
                            {thread.unreadCount > 0 && (
                              <Badge
                                className="shrink-0 rounded-full px-1.5 py-0 text-[10px]"
                                aria-label={`${thread.unreadCount} unread`}
                              >
                                {thread.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {thread.lastMessage.content}
                          </p>
                          <div className="mt-1.5 flex items-center gap-2">
                            {ContextIcon && (
                              <Tooltip content={contextLabels[thread.contextType!] ?? 'Context'}>
                                <span className="inline-flex">
                                  <ContextIcon
                                    className="h-3 w-3 text-muted-foreground"
                                    aria-label={contextLabels[thread.contextType!]}
                                  />
                                </span>
                              </Tooltip>
                            )}
                            {project && (
                              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                <Hash className="h-2.5 w-2.5" aria-hidden="true" />
                                {project.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </nav>
        </Card>

        {/* Message Panel */}
        <div
          className={cn(
            'lg:col-span-2',
            !showMobilePanel && 'hidden lg:block'
          )}
        >
          {isLoadingThreads ? (
            <MessagePanelSkeleton />
          ) : isLoadingMessages ? (
            <MessagePanelSkeleton />
          ) : activeThread ? (
            <Card className="flex h-full flex-col animate-fade-in">
              {/* Thread Header */}
              <div className="border-b border-border p-4">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0 lg:hidden"
                    onClick={() => setShowMobilePanel(false)}
                    aria-label="Back to thread list"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold" id="thread-title">
                      {activeThread.subject}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <div
                        className="flex -space-x-1"
                        aria-label={`${activeThread.participants.length} participants`}
                      >
                        {activeThread.participants.slice(0, 3).map((p) => (
                          <Avatar
                            key={p.id}
                            name={p.name}
                            size="sm"
                            className="h-5 w-5 text-[8px] ring-2 ring-card"
                          />
                        ))}
                        {activeThread.participants.length > 3 && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[8px] font-medium ring-2 ring-card">
                            +{activeThread.participants.length - 3}
                          </span>
                        )}
                      </div>
                      <span className="truncate text-xs text-muted-foreground">
                        {activeThread.participants.map((p) => p.name).join(', ')}
                      </span>
                    </div>
                  </div>
                  {activeThread.contextType && (
                    <Badge variant="outline" className="shrink-0 gap-1 text-xs">
                      {(() => {
                        const Icon = contextIcons[activeThread.contextType]
                        return Icon ? <Icon className="h-3 w-3" aria-hidden="true" /> : null
                      })()}
                      {contextLabels[activeThread.contextType]}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Messages Area */}
              <div
                className="flex-1 overflow-y-auto p-4 space-y-4"
                role="log"
                aria-label="Message history"
                aria-describedby="thread-title"
              >
                <div className="flex gap-3 animate-fade-in">
                  <Avatar
                    name={activeThread.lastMessage.sender.name}
                    size="sm"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {activeThread.lastMessage.sender.name}
                      </span>
                      <time
                        className="text-xs text-muted-foreground"
                        dateTime={activeThread.lastMessage.createdAt}
                      >
                        {formatDate(activeThread.lastMessage.createdAt)}
                      </time>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-sm leading-relaxed">
                        {activeThread.lastMessage.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Composer */}
              <div className="border-t border-border p-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage()
                  }}
                  className="flex gap-2"
                >
                  <label htmlFor="message-input" className="sr-only">
                    Type a message
                  </label>
                  <Textarea
                    id="message-input"
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="min-h-[40px] resize-none rounded-lg"
                    disabled={isSending}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    aria-label="Message input"
                  />
                  <div className="flex flex-col gap-1">
                    <Tooltip content="Attach file">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg"
                        aria-label="Attach file"
                      >
                        <Paperclip className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Send message">
                      <Button
                        type="submit"
                        size="icon"
                        className="h-8 w-8 rounded-lg"
                        disabled={!messageText.trim() || isSending}
                        aria-label="Send message"
                      >
                        {isSending ? (
                          <RefreshCw className="h-4 w-4 animate-spin" aria-hidden="true" />
                        ) : (
                          <Send className="h-4 w-4" aria-hidden="true" />
                        )}
                      </Button>
                    </Tooltip>
                  </div>
                </form>
              </div>
            </Card>
          ) : (
            <Card className="flex h-full items-center justify-center">
              <EmptyState
                icon={<MessageSquare className="h-8 w-8" />}
                title="No conversation selected"
                description="Choose a thread from the list to view messages, or start a new conversation."
                action={{
                  label: 'New Thread',
                  onClick: () => {},
                }}
              />
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
