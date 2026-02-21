import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { AlertTriangle, RefreshCw, Home, ExternalLink } from 'lucide-react'

export function ServerErrorPage() {
  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 text-center"
      role="main"
      aria-labelledby="server-error-heading"
    >
      <div className="animate-float mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10">
        <AlertTriangle className="h-10 w-10 text-destructive" aria-hidden="true" />
      </div>

      <h1
        id="server-error-heading"
        className="mb-2 text-6xl font-bold text-destructive"
      >
        500
      </h1>
      <h2 className="mb-4 text-2xl font-semibold text-foreground">
        Something Went Wrong
      </h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        We're experiencing a server issue. Our team has been notified and is working on a fix.
        Please try again in a few minutes.
      </p>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={handleRetry}
          className="gap-2"
          aria-label="Reload the page to try again"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" /> Try Again
        </Button>
        <Link to="/dashboard" aria-label="Navigate to the main dashboard">
          <Button
            variant="outline"
            className="gap-2"
          >
            <Home className="h-4 w-4" aria-hidden="true" /> Go to Dashboard
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-md border-border bg-card">
        <CardContent className="p-6 text-left">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Report this issue</h3>
          <Textarea
            placeholder="Describe what you were doing when the error occurred..."
            className="mb-3"
            aria-label="Describe the issue you encountered"
          />
          <div className="flex items-center justify-between">
            <Button
              size="sm"
              onClick={() => toast.success('Report submitted. Thank you!')}
            >
              Submit Report
            </Button>
            <a
              href="https://status.archdecision.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-primary transition-colors duration-200 hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Status Page <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
