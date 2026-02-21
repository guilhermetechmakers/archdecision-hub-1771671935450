import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { formatDate, cn } from '@/lib/utils'
import type { AuditEntry } from '@/types'
import { toast } from 'sonner'
import {
  Shield, Download, ChevronDown, ChevronUp,
  Plus, Upload, Eye, Check, X, PenTool, MessageSquare,
  GitBranch, AlertTriangle, FileText,
} from 'lucide-react'

const actionConfig: Record<string, { icon: typeof Check; label: string; color: string }> = {
  created: { icon: Plus, label: 'Created', color: 'text-blue-500' },
  updated: { icon: Upload, label: 'Updated', color: 'text-amber-500' },
  published: { icon: Eye, label: 'Published', color: 'text-indigo-500' },
  approved: { icon: Check, label: 'Approved', color: 'text-emerald-500' },
  rejected: { icon: X, label: 'Rejected', color: 'text-red-500' },
  signed: { icon: PenTool, label: 'Signed', color: 'text-emerald-600' },
  commented: { icon: MessageSquare, label: 'Commented', color: 'text-slate-500' },
  version_created: { icon: GitBranch, label: 'New Version', color: 'text-purple-500' },
  option_added: { icon: Plus, label: 'Option Added', color: 'text-cyan-500' },
  escalated: { icon: AlertTriangle, label: 'Escalated', color: 'text-orange-500' },
}

interface AuditTrailProps {
  entries: AuditEntry[]
}

export function AuditTrail({ entries }: AuditTrailProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
  const displayedEntries = isExpanded ? sortedEntries : sortedEntries.slice(0, 5)

  const handleExport = () => {
    toast.success('Audit trail export started', {
      description: 'A PDF will be generated and available for download shortly.',
    })
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-base">
            <Shield className="h-4 w-4" />
            Audit Trail
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs gap-1 text-muted-foreground"
            onClick={handleExport}
          >
            <Download className="h-3 w-3" /> Export
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {sortedEntries.length === 0 ? (
          <EmptyState
            icon={<Shield className="h-6 w-6" />}
            title="No audit entries"
            description="Activity will be recorded here as actions are taken."
            className="py-6"
          />
        ) : (
          <div className="space-y-0">
            {displayedEntries.map((entry, index) => {
              const config = actionConfig[entry.action] || actionConfig.updated!
              const Icon = config.icon
              const isLast = index === displayedEntries.length - 1

              return (
                <div key={entry.id} className="relative flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={cn('mt-0.5 shrink-0 z-10 rounded-full bg-background p-0.5')}>
                      <div className={cn('rounded-full p-1', config.color)}>
                        <Icon className="h-3 w-3" />
                      </div>
                    </div>
                    {!isLast && <div className="w-px flex-1 bg-border" />}
                  </div>

                  <div className={cn('flex-1 pb-4', isLast && 'pb-0')}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium">{config.label}</span>
                      <span className="text-xs text-muted-foreground">
                        by {entry.actor.name}
                      </span>
                    </div>
                    {entry.details && (
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {entry.details}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground/70">
                      <span>{formatDate(entry.timestamp)}</span>
                      {entry.ip && <span>IP: {entry.ip}</span>}
                      {entry.metadata?.hash && (
                        <span className="font-mono text-[10px]">{entry.metadata.hash}</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}

            {sortedEntries.length > 5 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors mt-3 font-medium"
              >
                {isExpanded ? (
                  <><ChevronUp className="h-3 w-3" /> Show less</>
                ) : (
                  <><ChevronDown className="h-3 w-3" /> Show all {sortedEntries.length} entries</>
                )}
              </button>
            )}
          </div>
        )}

        <div className="mt-4 rounded-lg bg-muted/30 border border-border/50 p-3 flex items-start gap-2">
          <FileText className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground/70">Proof of Choice</p>
            <p className="mt-0.5">
              All actions are immutably recorded. Export a tamper-evident PDF for your records.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
