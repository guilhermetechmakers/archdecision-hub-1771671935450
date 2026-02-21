import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function CookiePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link to="/" className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
      <h1 className="text-3xl font-bold mb-2">Cookie Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: February 21, 2026</p>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-xl font-semibold mt-8 mb-3">What Are Cookies</h2>
        <p className="text-muted-foreground mb-4">Cookies are small text files stored on your device when you visit our website. They help us provide a better experience by remembering your preferences and understanding how you use our service.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Essential Cookies</h2>
        <p className="text-muted-foreground mb-4">These cookies are necessary for the service to function and cannot be disabled. They include authentication tokens and session management.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Analytics Cookies</h2>
        <p className="text-muted-foreground mb-4">We use analytics cookies to understand how visitors interact with our service. This helps us improve the user experience. You can opt out of analytics cookies.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Managing Cookies</h2>
        <p className="text-muted-foreground mb-4">You can control cookies through your browser settings. Note that disabling certain cookies may affect the functionality of the service.</p>
      </div>
    </div>
  )
}
