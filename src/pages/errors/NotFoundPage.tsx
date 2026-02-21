import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Home, Search, ArrowLeft, Building2 } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
        <Building2 className="h-10 w-10 text-primary" />
      </div>
      <h1 className="mb-2 text-6xl font-bold text-primary">404</h1>
      <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
        Try searching or navigate back to a known page.
      </p>

      <div className="mb-8 relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search for pages..." className="pl-9" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link to="/dashboard">
          <Button className="gap-2">
            <Home className="h-4 w-4" /> Go to Dashboard
          </Button>
        </Link>
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>

      <div className="mt-12 text-sm text-muted-foreground">
        <p>Quick links:</p>
        <div className="mt-2 flex gap-4">
          <Link to="/dashboard" className="text-primary hover:underline">Dashboard</Link>
          <Link to="/dashboard/projects" className="text-primary hover:underline">Projects</Link>
          <Link to="/dashboard/decisions" className="text-primary hover:underline">Decisions</Link>
          <Link to="/dashboard/help" className="text-primary hover:underline">Help</Link>
        </div>
      </div>
    </div>
  )
}
