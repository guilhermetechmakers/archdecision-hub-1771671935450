import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { projects, decisions } from '@/data/mock-data'
import { formatDate } from '@/lib/utils'
import { toast } from 'sonner'
import {
  Archive, Download, FileText, ClipboardCheck, Shield,
  RefreshCw, ArrowLeft, Package, CheckCircle,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export function ProjectArchivePage() {
  const project = projects[4]!
  const projectDecisions = decisions.filter((d) => d.projectId === project.id)

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <Link to="/dashboard/projects" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold">Project Archive</h1>
          <Badge variant="secondary">
            <Archive className="h-3 w-3 mr-1" /> Archived
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{project.name} &middot; {project.client}</p>
      </div>

      {/* Archive Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-4 w-4" /> Archive Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg bg-muted/50 p-4 text-center">
              <ClipboardCheck className="mx-auto h-6 w-6 text-muted-foreground mb-1" />
              <p className="text-xl font-bold">{projectDecisions.length}</p>
              <p className="text-xs text-muted-foreground">Decisions</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4 text-center">
              <FileText className="mx-auto h-6 w-6 text-muted-foreground mb-1" />
              <p className="text-xl font-bold">24</p>
              <p className="text-xs text-muted-foreground">Files</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4 text-center">
              <CheckCircle className="mx-auto h-6 w-6 text-emerald-500 mb-1" />
              <p className="text-xl font-bold">100%</p>
              <p className="text-xs text-muted-foreground">Complete</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4 text-center">
              <Shield className="mx-auto h-6 w-6 text-muted-foreground mb-1" />
              <p className="text-xl font-bold">48</p>
              <p className="text-xs text-muted-foreground">Audit Entries</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Handover Package */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Handover Package</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Download the complete handover package including all approved decisions, signed documents, file archives, and audit logs.
          </p>
          <div className="space-y-2">
            {[
              { name: 'Complete Project Archive (ZIP)', size: '2.4 GB', icon: Package },
              { name: 'Decision Log with Signatures (PDF)', size: '15 MB', icon: ClipboardCheck },
              { name: 'Audit Trail Export (PDF)', size: '3 MB', icon: Shield },
              { name: 'All Project Files (ZIP)', size: '2.1 GB', icon: FileText },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <item.icon className="h-5 w-5 text-muted-foreground shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.size}</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.success('Download started!')}>
                  <Download className="h-4 w-4" /> Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-4 w-4" /> Audit Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: 'Project archived', user: 'Sarah Chen', date: '2026-03-01T10:00:00Z' },
              { action: 'Final handover package generated', user: 'System', date: '2026-03-01T09:55:00Z' },
              { action: 'All decisions marked as final', user: 'Sarah Chen', date: '2026-02-28T16:00:00Z' },
              { action: 'Client sign-off received', user: 'James Park', date: '2026-02-28T14:30:00Z' },
              { action: 'Closeout checklist completed', user: 'Sarah Chen', date: '2026-02-27T11:00:00Z' },
            ].map((log, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium">{log.action}</p>
                  <p className="text-xs text-muted-foreground">{log.user} &middot; {formatDate(log.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Admin Controls */}
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="font-medium">Reopen Project</p>
            <p className="text-sm text-muted-foreground">Admin-only: Reopen this archived project for further work</p>
          </div>
          <Button variant="outline" className="gap-2" onClick={() => toast.info('Project reopened (admin action)')}>
            <RefreshCw className="h-4 w-4" /> Reopen Project
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
