import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabContent, useTabState } from '@/components/ui/tabs'
import { DecisionHeader } from '@/components/decision-detail/DecisionHeader'
import { ComparisonPanel } from '@/components/decision-detail/ComparisonPanel'
import { RecommendationCard } from '@/components/decision-detail/RecommendationCard'
import { ClientActions } from '@/components/decision-detail/ClientActions'
import { CommentThread } from '@/components/decision-detail/CommentThread'
import { VersionHistory } from '@/components/decision-detail/VersionHistory'
import { AuditTrail } from '@/components/decision-detail/AuditTrail'
import { DecisionDetailSkeleton } from '@/components/decision-detail/DecisionDetailSkeleton'
import { EmptyState } from '@/components/ui/empty-state'
import {
  decisions, projects, currentUser,
  auditEntries, versionSnapshots,
} from '@/data/mock-data'
import { toast } from 'sonner'
import {
  Download, MessageSquare, History, Shield,
  ClipboardCheck, LayoutGrid,
} from 'lucide-react'

const tabs = [
  { id: 'overview', label: 'Overview', icon: <LayoutGrid className="h-4 w-4" /> },
  { id: 'discussion', label: 'Discussion', icon: <MessageSquare className="h-4 w-4" /> },
  { id: 'versions', label: 'Versions', icon: <History className="h-4 w-4" /> },
  { id: 'audit', label: 'Audit Trail', icon: <Shield className="h-4 w-4" /> },
]

function TabSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <Card className="rounded-lg shadow-card">
      <CardHeader className="pb-3">
        <Skeleton className="h-5 w-40" />
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="h-8 w-8 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function DecisionDetailPage() {
  const { projectId, decisionId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [isTabLoading, setIsTabLoading] = useState(false)
  const { activeTab, setActiveTab } = useTabState('overview')

  const decision = decisions.find((d) => d.id === decisionId) || decisions[0]!
  const project = projects.find((p) => p.id === (projectId || decision.projectId))
  const [selectedOption, setSelectedOption] = useState<string | null>(
    decision.selectedOptionId || null
  )

  const decisionAuditEntries = auditEntries[decision.id] || []
  const decisionVersions = versionSnapshots[decision.id] || []
  const recommendedOption = decision.options.find((o) => o.isRecommended)
  const selectedOptionData = decision.options.find((o) => o.id === selectedOption)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [decisionId])

  const handleTabChange = useCallback((tabId: string) => {
    setIsTabLoading(true)
    setActiveTab(tabId)
    const timer = setTimeout(() => setIsTabLoading(false), 300)
    return () => clearTimeout(timer)
  }, [setActiveTab])

  const handleExportPdf = () => {
    toast.success('PDF export started', {
      description: 'Your decision summary PDF will be ready shortly.',
    })
  }

  if (isLoading) {
    return <DecisionDetailSkeleton />
  }

  if (!decision) {
    return (
      <div className="p-6 lg:p-8">
        <EmptyState
          icon={<ClipboardCheck className="h-8 w-8" />}
          title="Decision not found"
          description="The decision you're looking for doesn't exist or has been removed."
          action={{ label: 'Back to Decisions', onClick: () => window.history.back() }}
        />
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <DecisionHeader decision={decision} project={project} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} className="border-0" />
        <Button
          variant="outline"
          size="sm"
          className="gap-2 shrink-0 self-start"
          onClick={handleExportPdf}
          aria-label="Export decision as PDF"
        >
          <Download className="h-4 w-4" aria-hidden="true" /> Export PDF
        </Button>
      </div>

      {activeTab === 'overview' && (
        <TabContent className="space-y-6">
          {isTabLoading ? (
            <div className="space-y-6 animate-pulse-soft">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="rounded-lg shadow-card">
                    <CardContent className="p-5 pt-7 space-y-4">
                      <Skeleton className="h-36 w-full rounded-lg" />
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-12 w-full rounded-lg" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <>
              <ComparisonPanel
                options={decision.options}
                selectedOptionId={selectedOption}
                onSelectOption={setSelectedOption}
                isReadOnly={decision.status === 'approved' || decision.status === 'archived'}
              />

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <RecommendationCard
                  recommendedOption={recommendedOption}
                  designerName={decision.createdBy.name}
                  allOptions={decision.options}
                  onAddRecommendation={() => {
                    toast.info('Add recommendation', {
                      description: 'Open the comparison panel to mark an option as recommended.',
                    })
                  }}
                />
                <ClientActions
                  decision={decision}
                  selectedOptionId={selectedOption}
                  selectedOption={selectedOptionData}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <CommentThread
                    comments={decision.comments}
                    currentUserName={currentUser.name}
                  />
                </div>
                <div className="space-y-6">
                  <VersionHistory
                    versions={decisionVersions}
                    currentVersion={decision.version}
                  />
                  <AuditTrail entries={decisionAuditEntries} />
                </div>
              </div>
            </>
          )}
        </TabContent>
      )}

      {activeTab === 'discussion' && (
        <TabContent>
          <div className="max-w-3xl">
            {isTabLoading ? (
              <TabSkeleton rows={4} />
            ) : (
              <CommentThread
                comments={decision.comments}
                currentUserName={currentUser.name}
              />
            )}
          </div>
        </TabContent>
      )}

      {activeTab === 'versions' && (
        <TabContent>
          <div className="max-w-2xl">
            {isTabLoading ? (
              <TabSkeleton rows={3} />
            ) : (
              <VersionHistory
                versions={decisionVersions}
                currentVersion={decision.version}
              />
            )}
          </div>
        </TabContent>
      )}

      {activeTab === 'audit' && (
        <TabContent>
          <div className="max-w-2xl">
            {isTabLoading ? (
              <TabSkeleton rows={5} />
            ) : (
              <AuditTrail entries={decisionAuditEntries} />
            )}
          </div>
        </TabContent>
      )}
    </div>
  )
}
