import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { EmptyState } from '@/components/ui/empty-state'
import { formatDate, cn } from '@/lib/utils'
import { statusColors } from '@/data/mock-data'
import type { VersionSnapshot } from '@/types'
import {
  History, Download, Eye, GitBranch,
} from 'lucide-react'

interface VersionHistoryProps {
  versions: VersionSnapshot[]
  currentVersion: number
}

export function VersionHistory({ versions, currentVersion }: VersionHistoryProps) {
  const sortedVersions = [...versions].sort((a, b) => b.version - a.version)

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-base">
            <History className="h-4 w-4" />
            Version History
          </span>
          <Badge variant="info" className="text-xs">
            v{currentVersion}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {sortedVersions.length === 0 ? (
          <EmptyState
            icon={<GitBranch className="h-6 w-6" />}
            title="No versions"
            description="Version history will appear as changes are made."
            className="py-6"
          />
        ) : (
          <div className="space-y-0">
            {sortedVersions.map((snapshot, index) => {
              const isCurrent = snapshot.version === currentVersion
              const isLast = index === sortedVersions.length - 1

              return (
                <div key={snapshot.id} className="relative flex gap-3">
                  {/* Timeline connector */}
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'h-3 w-3 rounded-full border-2 shrink-0 mt-1.5 z-10',
                        isCurrent
                          ? 'bg-primary border-primary'
                          : 'bg-background border-muted-foreground/30'
                      )}
                    />
                    {!isLast && (
                      <div className="w-px flex-1 bg-border" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={cn('flex-1 pb-5', isLast && 'pb-0')}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={cn('text-sm font-semibold', isCurrent ? 'text-foreground' : 'text-muted-foreground')}>
                        Version {snapshot.version}
                      </span>
                      {isCurrent && (
                        <Badge variant="info" className="text-[10px]">Current</Badge>
                      )}
                      <Badge className={cn(statusColors[snapshot.status], 'text-[10px]')} variant="secondary">
                        {snapshot.status}
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {snapshot.changesSummary}
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Avatar name={snapshot.createdBy.name} size="sm" className="h-4 w-4 text-[8px]" />
                        <span>{snapshot.createdBy.name}</span>
                      </div>
                      <span>{formatDate(snapshot.createdAt)}</span>
                      <span>{snapshot.optionCount} option{snapshot.optionCount !== 1 ? 's' : ''}</span>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-muted-foreground">
                        <Eye className="h-3 w-3" /> View
                      </Button>
                      {snapshot.pdfUrl && (
                        <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-muted-foreground">
                          <Download className="h-3 w-3" /> PDF
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
