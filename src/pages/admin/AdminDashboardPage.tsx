import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { users, projects } from '@/data/mock-data'
import {
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, LineChart, Line,
} from 'recharts'
import {
  Users, CreditCard, Activity, HardDrive,
  Download,
} from 'lucide-react'

const usageData = [
  { month: 'Sep', users: 5, storage: 12 },
  { month: 'Oct', users: 6, storage: 18 },
  { month: 'Nov', users: 7, storage: 25 },
  { month: 'Dec', users: 7, storage: 32 },
  { month: 'Jan', users: 8, storage: 38 },
  { month: 'Feb', users: 9, storage: 45 },
]

const invoices = [
  { id: 'INV-2026-02', date: 'Feb 1, 2026', amount: '$129.00', status: 'Paid' },
  { id: 'INV-2026-01', date: 'Jan 1, 2026', amount: '$129.00', status: 'Paid' },
  { id: 'INV-2025-12', date: 'Dec 1, 2025', amount: '$129.00', status: 'Paid' },
  { id: 'INV-2025-11', date: 'Nov 1, 2025', amount: '$99.00', status: 'Paid' },
]

const systemLogs = [
  { time: '2 min ago', event: 'User login', user: 'Sarah Chen', level: 'info' },
  { time: '15 min ago', event: 'File uploaded (45 MB)', user: 'Emily Watson', level: 'info' },
  { time: '1 hour ago', event: 'Decision approved', user: 'James Park', level: 'success' },
  { time: '3 hours ago', event: 'Failed login attempt', user: 'unknown@test.com', level: 'warning' },
  { time: '5 hours ago', event: 'Template created', user: 'Lisa Thompson', level: 'info' },
]

export function AdminDashboardPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Firm-level administration and monitoring</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export Report
        </Button>
      </div>

      {/* Usage Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="rounded-lg bg-blue-100 p-2.5 text-blue-600"><Users className="h-5 w-5" /></div>
            <div>
              <p className="text-2xl font-bold">7</p>
              <p className="text-xs text-muted-foreground">Active Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="rounded-lg bg-emerald-100 p-2.5 text-emerald-600"><Activity className="h-5 w-5" /></div>
            <div>
              <p className="text-2xl font-bold">{projects.length}</p>
              <p className="text-xs text-muted-foreground">Active Projects</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="rounded-lg bg-purple-100 p-2.5 text-purple-600"><HardDrive className="h-5 w-5" /></div>
            <div>
              <p className="text-2xl font-bold">45 GB</p>
              <p className="text-xs text-muted-foreground">Storage Used</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="rounded-lg bg-amber-100 p-2.5 text-amber-600"><CreditCard className="h-5 w-5" /></div>
            <div>
              <p className="text-2xl font-bold">$129/mo</p>
              <p className="text-xs text-muted-foreground">Current Plan</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Usage Trend */}
        <Card>
          <CardHeader><CardTitle className="text-base">Usage Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '12px' }} />
                <Line type="monotone" dataKey="users" stroke="#2563EB" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="storage" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">Team Members</CardTitle>
            <Button size="sm" variant="outline">Manage</Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <Avatar name={user.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Badge variant="outline" className="capitalize text-[10px]">{user.role.replace('-', ' ')}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Invoices */}
        <Card>
          <CardHeader><CardTitle className="text-base">Recent Invoices</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium">{inv.id}</p>
                    <p className="text-xs text-muted-foreground">{inv.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{inv.amount}</p>
                    <Badge variant="success" className="text-[10px]">{inv.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Logs */}
        <Card>
          <CardHeader><CardTitle className="text-base">System Logs</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemLogs.map((log, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                    log.level === 'success' ? 'bg-emerald-500' :
                    log.level === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{log.event}</p>
                    <p className="text-xs text-muted-foreground">{log.user} &middot; {log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
