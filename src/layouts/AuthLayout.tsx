import { Outlet, Link } from 'react-router-dom'
import { Building2 } from 'lucide-react'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 lg:flex lg:flex-col lg:justify-between bg-gradient-to-br from-primary via-blue-600 to-indigo-700 p-12 text-white">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
            <Building2 className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold">ArchDecision Hub</span>
        </Link>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Streamline architecture decisions with clarity and confidence.
          </h1>
          <p className="text-lg text-blue-100">
            One platform for project decisions, approvals, and documentation.
            Eliminate scattered emails and prove every design choice.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            {[
              { value: '500+', label: 'Architecture Firms' },
              { value: '12K+', label: 'Decisions Tracked' },
              { value: '94%', label: 'Approval Rate' },
              { value: '3.2 days', label: 'Avg. Approval Time' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-blue-200">
          Trusted by leading architecture firms worldwide.
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold">ArchDecision Hub</span>
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
