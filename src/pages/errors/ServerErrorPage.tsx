import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { AlertTriangle, RefreshCw, Home, ExternalLink } from 'lucide-react'

export function ServerErrorPage() {
  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10">
        <AlertTriangle className="h-10 w-10 text-destructive" />
      </div>
      <h1 className="mb-2 text-6xl font-bold text-destructive">500</h1>
      <h2 className="mb-4 text-2xl font-semibold">Something Went Wrong</h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        We're experiencing a server issue. Our team has been notified and is working on a fix.
        Please try again in a few minutes.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row mb-8">
        <Button onClick={handleRetry} className="gap-2">
          <RefreshCw className="h-4 w-4" /> Try Again
        </Button>
        <Link to="/dashboard">
          <Button variant="outline" className="gap-2">
            <Home className="h-4 w-4" /> Go to Dashboard
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-md rounded-lg border border-border p-6 text-left">
        <h3 className="mb-3 text-sm font-semibold">Report this issue</h3>
        <Textarea placeholder="Describe what you were doing when the error occurred..." className="mb-3" />
        <div className="flex items-center justify-between">
          <Button size="sm" onClick={() => toast.success('Report submitted. Thank you!')}>
            Submit Report
          </Button>
          <a
            href="https://status.archdecision.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            Status Page <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  )
}
