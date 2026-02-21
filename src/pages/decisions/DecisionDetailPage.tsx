import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { decisions, projects, statusColors } from '@/data/mock-data'
import { formatDate, formatCurrency, cn } from '@/lib/utils'
import { toast } from 'sonner'
import {
  ArrowLeft, Check, X, ThumbsUp, ThumbsDown, MessageSquare, Clock,
  DollarSign, Star, FileText, History, Shield, Download,
} from 'lucide-react'

export function DecisionDetailPage() {
  const { projectId, decisionId } = useParams()
  const decision = decisions.find((d) => d.id === decisionId) || decisions[0]!
  const project = projects.find((p) => p.id === (projectId || decision.projectId))
  const [selectedOption, setSelectedOption] = useState<string | null>(decision.selectedOptionId || null)
  const [newComment, setNewComment] = useState('')

  const handleApprove = () => {
    toast.success('Decision approved successfully!')
  }

  const handleReject = () => {
    toast.error('Decision sent back for revision.')
  }

  const handleComment = () => {
    if (!newComment.trim()) return
    toast.success('Comment added!')
    setNewComment('')
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <Link
          to={project ? `/dashboard/projects/${project.id}` : '/dashboard/decisions'}
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <Badge className={statusColors[decision.status]} variant="secondary">{decision.status}</Badge>
              <Badge variant="outline">{decision.category}</Badge>
              <Badge variant="outline">v{decision.version}</Badge>
              {project && <span className="text-sm text-muted-foreground">{project.name}</span>}
            </div>
            <h1 className="text-2xl font-bold">{decision.title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{decision.description}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            {decision.status === 'pending' && (
              <>
                <Button variant="outline" size="sm" onClick={handleReject} className="gap-2 text-destructive hover:text-destructive">
                  <X className="h-4 w-4" /> Reject
                </Button>
                <Button size="sm" onClick={handleApprove} className="gap-2">
                  <Check className="h-4 w-4" /> Approve & Sign
                </Button>
              </>
            )}
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Avatar name={decision.createdBy.name} size="sm" />
          <span>Created by {decision.createdBy.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Updated {formatDate(decision.updatedAt)}</span>
        </div>
        {decision.dueDate && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-500" />
            <span>Due {formatDate(decision.dueDate)}</span>
          </div>
        )}
      </div>

      {/* Comparison Cards */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Options Comparison</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {decision.options.map((option) => (
            <Card
              key={option.id}
              className={cn(
                'relative cursor-pointer transition-all duration-200',
                selectedOption === option.id
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'hover:border-primary/30',
                option.isRecommended && 'ring-1 ring-amber-200'
              )}
              onClick={() => setSelectedOption(option.id)}
            >
              {option.isRecommended && (
                <div className="absolute -top-3 left-4 flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                  <Star className="h-3 w-3" /> Recommended
                </div>
              )}
              {selectedOption === option.id && (
                <div className="absolute -top-3 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3.5 w-3.5" />
                </div>
              )}
              <CardContent className="p-6 pt-8">
                {/* Placeholder image */}
                <div className="mb-4 h-32 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-slate-400" />
                </div>

                <h3 className="text-lg font-semibold">{option.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{option.description}</p>

                <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted/50 p-3">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold">{formatCurrency(option.costImpact)}</span>
                  <span className="text-xs text-muted-foreground">cost impact</span>
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <p className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <ThumbsUp className="h-3 w-3" /> Pros
                    </p>
                    <ul className="space-y-1">
                      {option.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Check className="h-3 w-3 mt-0.5 text-emerald-500 shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-red-600">
                      <ThumbsDown className="h-3 w-3" /> Cons
                    </p>
                    <ul className="space-y-1">
                      {option.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <X className="h-3 w-3 mt-0.5 text-red-400 shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Comments */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MessageSquare className="h-4 w-4" /> Discussion ({decision.comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {decision.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar name={comment.userName} size="sm" />
                  <div className="flex-1 rounded-lg bg-muted/50 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{comment.userName}</span>
                      <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{comment.content}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <Avatar name="Sarah Chen" size="sm" />
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[60px]"
                  />
                  <Button size="sm" onClick={handleComment} disabled={!newComment.trim()}>
                    Post Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Version History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <History className="h-4 w-4" /> Version History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.from({ length: decision.version }, (_, i) => decision.version - i).map((v) => (
                  <div key={v} className="flex items-center gap-3 text-sm">
                    <div className={`h-2 w-2 rounded-full ${v === decision.version ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                    <span className={v === decision.version ? 'font-medium' : 'text-muted-foreground'}>
                      Version {v}
                    </span>
                    {v === decision.version && <Badge variant="info" className="text-[10px]">Current</Badge>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Audit Trail */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-4 w-4" /> Audit Trail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <div>
                    <p className="font-medium">Created</p>
                    <p className="text-xs text-muted-foreground">{decision.createdBy.name} &middot; {formatDate(decision.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                  <div>
                    <p className="font-medium">Last Updated</p>
                    <p className="text-xs text-muted-foreground">{formatDate(decision.updatedAt)}</p>
                  </div>
                </div>
                {decision.selectedOptionId && (
                  <div className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <div>
                      <p className="font-medium">Approved</p>
                      <p className="text-xs text-muted-foreground">
                        {decision.options.find((o) => o.id === decision.selectedOptionId)?.title}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
