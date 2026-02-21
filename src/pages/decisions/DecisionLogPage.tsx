import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { EmptyState } from '@/components/ui/empty-state'
import { decisions, projects, statusColors } from '@/data/mock-data'
import { formatDate } from '@/lib/utils'
import { Plus, Search, ClipboardCheck, ArrowRight } from 'lucide-react'

export function DecisionLogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredDecisions = decisions.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || d.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusOptions = ['all', 'draft', 'published', 'pending', 'approved', 'rejected']

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Decision Log</h1>
          <p className="text-sm text-muted-foreground">{decisions.length} decisions across all projects</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> New Decision
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search decisions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredDecisions.length === 0 ? (
        <EmptyState
          icon={<ClipboardCheck className="h-8 w-8" />}
          title="No decisions found"
          description="Try adjusting your search or filter criteria."
        />
      ) : (
        <div className="space-y-3 animate-stagger">
          {filteredDecisions.map((decision) => {
            const project = projects.find((p) => p.id === decision.projectId)
            return (
              <Link key={decision.id} to={`/dashboard/projects/${decision.projectId}/decisions/${decision.id}`}>
                <Card className="group cursor-pointer hover:border-primary/20 transition-all duration-200">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 rounded-lg bg-primary/10 p-2 text-primary shrink-0">
                        <ClipboardCheck className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <Badge className={statusColors[decision.status]} variant="secondary">{decision.status}</Badge>
                          <Badge variant="outline" className="text-[10px]">{decision.category}</Badge>
                          {project && (
                            <span className="text-xs text-muted-foreground">{project.name}</span>
                          )}
                        </div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{decision.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{decision.description}</p>
                        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{decision.options.length} options</span>
                          <span>v{decision.version}</span>
                          {decision.dueDate && <span>Due {formatDate(decision.dueDate)}</span>}
                          <div className="flex items-center gap-1">
                            <Avatar name={decision.createdBy.name} size="sm" className="h-5 w-5 text-[8px]" />
                            <span>{decision.createdBy.name}</span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
