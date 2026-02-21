import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Home, Search, ArrowLeft, Building2, FolderOpen, ClipboardCheck, HelpCircle } from 'lucide-react'

export function NotFoundPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/dashboard?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const quickLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: Home },
    { to: '/dashboard/projects', label: 'Projects', icon: FolderOpen },
    { to: '/dashboard/decisions', label: 'Decisions', icon: ClipboardCheck },
    { to: '/dashboard/help', label: 'Help Center', icon: HelpCircle },
  ]

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 text-center"
      role="main"
      aria-labelledby="not-found-heading"
    >
      <div className="animate-float mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
        <Building2 className="h-10 w-10 text-primary" aria-hidden="true" />
      </div>

      <h1
        id="not-found-heading"
        className="mb-2 text-6xl font-bold text-primary"
      >
        404
      </h1>
      <h2 className="mb-4 text-2xl font-semibold text-foreground">
        Page Not Found
      </h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
        Try searching or navigate back to a known page.
      </p>

      <form
        onSubmit={handleSearch}
        className="mb-8 relative w-full max-w-sm"
        role="search"
        aria-label="Search for pages"
      >
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          placeholder="Search for pages..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search for pages"
        />
      </form>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          className="gap-2"
          onClick={() => navigate('/dashboard')}
          aria-label="Navigate to the main dashboard"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Go to Dashboard
        </Button>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => navigate('/')}
          aria-label="Navigate back to the home page"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Home
        </Button>
      </div>

      <Card className="mt-12 w-full max-w-md border-border bg-card">
        <CardContent className="p-6">
          <p className="mb-4 text-sm font-medium text-foreground">Quick links</p>
          <nav aria-label="Quick navigation links">
            <ul className="flex flex-wrap justify-center gap-3">
              {quickLinks.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label={`Go to ${label}`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </CardContent>
      </Card>
    </main>
  )
}
