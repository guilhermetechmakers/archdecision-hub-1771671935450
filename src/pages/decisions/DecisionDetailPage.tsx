import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
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

export function DecisionDetailPage() {
  const { projectId, decisionId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
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
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [decisionId])

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
      {/* Decision Header */}
      <DecisionHeader decision={decision} project={project} />

      {/* Action Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="border-0" />
        <Button
          variant="outline"
          size="sm"
          className="gap-2 shrink-0 self-start"
          onClick={handleExportPdf}
        >
          <Download className="h-4 w-4" /> Export PDF
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <TabContent className="space-y-6">
          {/* Comparison Panel */}
          <ComparisonPanel
            options={decision.options}
            selectedOptionId={selectedOption}
            onSelectOption={setSelectedOption}
            isReadOnly={decision.status === 'approved' || decision.status === 'archived'}
          />

          {/* Recommendation + Client Actions Row */}
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

          {/* Discussion Preview + Sidebar */}
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
        </TabContent>
      )}

      {activeTab === 'discussion' && (
        <TabContent>
          <div className="max-w-3xl">
            <CommentThread
              comments={decision.comments}
              currentUserName={currentUser.name}
            />
          </div>
        </TabContent>
      )}

      {activeTab === 'versions' && (
        <TabContent>
          <div className="max-w-2xl">
            <VersionHistory
              versions={decisionVersions}
              currentVersion={decision.version}
            />
          </div>
        </TabContent>
      )}

      {activeTab === 'audit' && (
        <TabContent>
          <div className="max-w-2xl">
            <AuditTrail entries={decisionAuditEntries} />
          </div>
        </TabContent>
      )}
    </div>
  )
}
