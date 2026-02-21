import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { formatDate, cn } from '@/lib/utils'
import type { Comment } from '@/types'
import { toast } from 'sonner'
import {
  MessageSquare, Paperclip, AtSign, Send, FileText, Download,
} from 'lucide-react'

interface CommentThreadProps {
  comments: Comment[]
  currentUserName: string
}

const roleLabels: Record<string, { label: string; className: string }> = {
  'admin': { label: 'Admin', className: 'bg-purple-100 text-purple-700' },
  'project-manager': { label: 'PM', className: 'bg-blue-100 text-blue-700' },
  'designer': { label: 'Designer', className: 'bg-indigo-100 text-indigo-700' },
  'spec-writer': { label: 'Spec Writer', className: 'bg-teal-100 text-teal-700' },
  'client': { label: 'Client', className: 'bg-amber-100 text-amber-700' },
  'contractor': { label: 'Contractor', className: 'bg-orange-100 text-orange-700' },
  'viewer': { label: 'Viewer', className: 'bg-gray-100 text-gray-700' },
}

export function CommentThread({ comments, currentUserName }: CommentThreadProps) {
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!newComment.trim()) return
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    setIsSubmitting(false)
    setNewComment('')
    toast.success('Comment posted!')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit()
    }
  }

  return (
    <Card className="rounded-lg shadow-card" role="region" aria-label="Discussion thread">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-base">
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            Discussion
          </span>
          <Badge variant="secondary" className="text-xs font-normal">
            {comments.length} comment{comments.length !== 1 ? 's' : ''}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 pt-0">
        {comments.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-muted/20 py-10 px-6">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-full bg-muted p-4">
                <MessageSquare className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
              </div>
              <h4 className="mb-1.5 text-base font-semibold text-foreground">No comments yet</h4>
              <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
                Start the conversation by posting a comment below. Mention team members with @name.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1" role="list" aria-label="Comments">
            {comments.map((comment, index) => {
              const role = roleLabels[comment.userRole]
              return (
                <div
                  key={comment.id}
                  className="flex gap-3 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                  role="listitem"
                >
                  <Avatar name={comment.userName} size="sm" className="mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="rounded-lg bg-muted/40 border border-border/50 p-3 hover:bg-muted/60 transition-colors">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-sm font-medium">{comment.userName}</span>
                        {role && (
                          <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-medium', role.className)}>
                            {role.label}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                        {comment.content.split(/(@\w+(?:\s\w+)?)/g).map((part, i) =>
                          part.startsWith('@') ? (
                            <span key={i} className="text-primary font-medium">{part}</span>
                          ) : (
                            <span key={i}>{part}</span>
                          )
                        )}
                      </p>
                      {comment.attachments && comment.attachments.length > 0 && (
                        <div className="mt-2 space-y-1" role="list" aria-label="Attachments">
                          {comment.attachments.map((att) => (
                            <button
                              key={att.name}
                              type="button"
                              className="inline-flex items-center gap-2 rounded-lg bg-background border border-border px-2.5 py-1.5 text-xs hover:bg-accent transition-colors cursor-pointer group"
                              aria-label={`Download attachment: ${att.name}`}
                              role="listitem"
                            >
                              <FileText className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                              <span className="font-medium">{att.name}</span>
                              <Download className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t border-border mt-4">
          <Avatar name={currentUserName} size="sm" className="mt-1 shrink-0" />
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Add a comment... (Ctrl+Enter to send)"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[72px] text-sm"
              aria-label="Write a comment"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  aria-label="Attach a file"
                >
                  <Paperclip className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  aria-label="Mention a team member"
                >
                  <AtSign className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={!newComment.trim()}
                isLoading={isSubmitting}
                className="gap-1.5"
                aria-label="Post comment"
              >
                <Send className="h-3.5 w-3.5" aria-hidden="true" /> Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
