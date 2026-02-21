import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { decisions, projects, tasks } from '@/data/mock-data'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart,
} from 'recharts'
import {
  Download, TrendingUp, Clock, CheckCircle, AlertTriangle,
  BarChart3, PieChart as PieChartIcon, LineChart, ListChecks,
} from 'lucide-react'

const CHART_COLORS = {
  draft: 'rgb(var(--muted-foreground))',
  published: 'rgb(var(--primary))',
  pending: 'rgb(var(--warning))',
  approved: 'rgb(var(--success))',
  grid: 'rgb(var(--border))',
  axis: 'rgb(var(--muted-foreground))',
  primary: 'rgb(var(--primary))',
  success: 'rgb(var(--success))',
} as const

const TOOLTIP_STYLE = {
  borderRadius: '8px',
  border: '1px solid rgb(var(--border))',
  fontSize: '12px',
  backgroundColor: 'rgb(var(--card))',
  color: 'rgb(var(--foreground))',
} as const

const approvalTrend = [
  { month: 'Sep', approvals: 3, avgDays: 5.2 },
  { month: 'Oct', approvals: 5, avgDays: 4.8 },
  { month: 'Nov', approvals: 4, avgDays: 4.1 },
  { month: 'Dec', approvals: 7, avgDays: 3.5 },
  { month: 'Jan', approvals: 6, avgDays: 3.2 },
  { month: 'Feb', approvals: 8, avgDays: 2.9 },
]

function ChartSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-32" />
      <div className="flex items-end gap-2 h-[250px] pt-4">
        <Skeleton className="h-[60%] w-full rounded" />
        <Skeleton className="h-[80%] w-full rounded" />
        <Skeleton className="h-[45%] w-full rounded" />
        <Skeleton className="h-[90%] w-full rounded" />
        <Skeleton className="h-[70%] w-full rounded" />
        <Skeleton className="h-[55%] w-full rounded" />
      </div>
    </div>
  )
}

function ChartEmptyState({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[250px] text-center px-4">
      <div className="mb-3 rounded-full bg-muted p-3 text-muted-foreground">
        {icon}
      </div>
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 text-xs text-muted-foreground max-w-[240px]">{description}</p>
    </div>
  )
}

export function ReportsPage() {
  const [timeRange, setTimeRange] = useState('6m')
  const [isLoading] = useState(false)

  const decisionsByStatus = useMemo(() => [
    { name: 'Draft', value: decisions.filter((d) => d.status === 'draft').length, color: CHART_COLORS.draft },
    { name: 'Published', value: decisions.filter((d) => d.status === 'published').length, color: CHART_COLORS.published },
    { name: 'Pending', value: decisions.filter((d) => d.status === 'pending').length, color: CHART_COLORS.pending },
    { name: 'Approved', value: decisions.filter((d) => d.status === 'approved').length, color: CHART_COLORS.approved },
  ], [])

  const projectProgress = useMemo(() =>
    projects.map((p) => ({
      name: p.name.split(' ').slice(0, 2).join(' '),
      progress: p.progress,
    })),
  [])

  const tasksByStatus = useMemo(() => [
    { name: 'To Do', count: tasks.filter((t) => t.status === 'todo').length },
    { name: 'In Progress', count: tasks.filter((t) => t.status === 'in-progress').length },
    { name: 'Review', count: tasks.filter((t) => t.status === 'review').length },
    { name: 'Done', count: tasks.filter((t) => t.status === 'done').length },
  ], [])

  const hasDecisionsData = decisionsByStatus.some((d) => d.value > 0)
  const hasApprovalTrend = approvalTrend.length > 0
  const hasProjectProgress = projectProgress.length > 0
  const hasTasksData = tasksByStatus.some((t) => t.count > 0)

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground">Monitor project health, approvals, and team performance</p>
        </div>
        <div className="flex gap-3">
          <Select
            options={[
              { value: '1m', label: 'Last Month' },
              { value: '3m', label: 'Last 3 Months' },
              { value: '6m', label: 'Last 6 Months' },
              { value: '1y', label: 'Last Year' },
            ]}
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-40"
          />
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-stagger">
        <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-200">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-100 p-2.5 text-success">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">94%</p>
                <p className="text-xs text-muted-foreground">Approval Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-200">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2.5 text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3.2 days</p>
                <p className="text-xs text-muted-foreground">Avg. Approval Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-200">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-100 p-2.5 text-warning">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-xs text-muted-foreground">Overdue Tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-200">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2.5 text-purple-600">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Decisions This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Approval Trend */}
        <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-base">Approval Trend</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ChartSkeleton />
            ) : !hasApprovalTrend ? (
              <ChartEmptyState
                icon={<LineChart className="h-6 w-6" />}
                title="No approval data yet"
                description="Approval trends will appear here once decisions start getting reviewed."
              />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={approvalTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: CHART_COLORS.axis }} />
                  <YAxis tick={{ fontSize: 12, fill: CHART_COLORS.axis }} />
                  <RechartsTooltip contentStyle={TOOLTIP_STYLE} />
                  <Area
                    type="monotone"
                    dataKey="approvals"
                    stroke={CHART_COLORS.primary}
                    fill={CHART_COLORS.primary}
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Decisions by Status */}
        <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-base">Decisions by Status</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ChartSkeleton />
            ) : !hasDecisionsData ? (
              <ChartEmptyState
                icon={<PieChartIcon className="h-6 w-6" />}
                title="No decisions recorded"
                description="Create your first decision to see the status breakdown here."
              />
            ) : (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={decisionsByStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {decisionsByStatus.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip contentStyle={TOOLTIP_STYLE} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-4 mt-2">
                  {decisionsByStatus.map((item) => (
                    <div key={item.name} className="flex items-center gap-1.5 text-xs">
                      <div
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-muted-foreground">{item.name} ({item.value})</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Project Progress */}
        <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-base">Project Progress</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ChartSkeleton />
            ) : !hasProjectProgress ? (
              <ChartEmptyState
                icon={<BarChart3 className="h-6 w-6" />}
                title="No projects found"
                description="Start a new project to track its progress here."
              />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={projectProgress} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tick={{ fontSize: 12, fill: CHART_COLORS.axis }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 11, fill: CHART_COLORS.axis }}
                    width={100}
                  />
                  <RechartsTooltip contentStyle={TOOLTIP_STYLE} />
                  <Bar dataKey="progress" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Tasks by Status */}
        <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-base">Tasks Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ChartSkeleton />
            ) : !hasTasksData ? (
              <ChartEmptyState
                icon={<ListChecks className="h-6 w-6" />}
                title="No tasks created"
                description="Tasks will appear here once they are added to your projects."
              />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={tasksByStatus}>
                  <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: CHART_COLORS.axis }} />
                  <YAxis tick={{ fontSize: 12, fill: CHART_COLORS.axis }} />
                  <RechartsTooltip contentStyle={TOOLTIP_STYLE} />
                  <Bar dataKey="count" fill={CHART_COLORS.success} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
