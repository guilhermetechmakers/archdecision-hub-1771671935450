import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { decisions, projects, tasks } from '@/data/mock-data'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart,
} from 'recharts'
import { Download, TrendingUp, Clock, CheckCircle, AlertTriangle } from 'lucide-react'

const decisionsByStatus = [
  { name: 'Draft', value: decisions.filter((d) => d.status === 'draft').length, color: '#9CA3AF' },
  { name: 'Published', value: decisions.filter((d) => d.status === 'published').length, color: '#3B82F6' },
  { name: 'Pending', value: decisions.filter((d) => d.status === 'pending').length, color: '#F59E0B' },
  { name: 'Approved', value: decisions.filter((d) => d.status === 'approved').length, color: '#10B981' },
]

const approvalTrend = [
  { month: 'Sep', approvals: 3, avgDays: 5.2 },
  { month: 'Oct', approvals: 5, avgDays: 4.8 },
  { month: 'Nov', approvals: 4, avgDays: 4.1 },
  { month: 'Dec', approvals: 7, avgDays: 3.5 },
  { month: 'Jan', approvals: 6, avgDays: 3.2 },
  { month: 'Feb', approvals: 8, avgDays: 2.9 },
]

const projectProgress = projects.map((p) => ({
  name: p.name.split(' ').slice(0, 2).join(' '),
  progress: p.progress,
}))

const tasksByStatus = [
  { name: 'To Do', count: tasks.filter((t) => t.status === 'todo').length },
  { name: 'In Progress', count: tasks.filter((t) => t.status === 'in-progress').length },
  { name: 'Review', count: tasks.filter((t) => t.status === 'review').length },
  { name: 'Done', count: tasks.filter((t) => t.status === 'done').length },
]

export function ReportsPage() {
  const [timeRange, setTimeRange] = useState('6m')

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-100 p-2.5 text-emerald-600">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-xs text-muted-foreground">Approval Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2.5 text-blue-600">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">3.2 days</p>
                <p className="text-xs text-muted-foreground">Avg. Approval Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-100 p-2.5 text-amber-600">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">Overdue Tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2.5 text-purple-600">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Decisions This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Approval Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Approval Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={approvalTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
                <RechartsTooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="approvals" stroke="#2563EB" fill="#2563EB" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Decisions by Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Decisions by Status</CardTitle>
          </CardHeader>
          <CardContent>
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
                <RechartsTooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {decisionsByStatus.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name} ({item.value})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Project Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={projectProgress} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#6B7280' }} width={100} />
                <RechartsTooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '12px' }}
                />
                <Bar dataKey="progress" fill="#2563EB" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tasks by Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tasks Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={tasksByStatus}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
                <RechartsTooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
