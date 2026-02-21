import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link to="/" className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
      <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: February 21, 2026</p>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-xl font-semibold mt-8 mb-3">1. Acceptance of Terms</h2>
        <p className="text-muted-foreground mb-4">By accessing or using ArchDecision Hub, you agree to be bound by these Terms of Service. If you do not agree, do not use the service.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. Description of Service</h2>
        <p className="text-muted-foreground mb-4">ArchDecision Hub provides a project management and decision platform for architecture firms, including decision logging, document management, messaging, and reporting features.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. User Accounts</h2>
        <p className="text-muted-foreground mb-4">You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of any unauthorized use.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">4. Acceptable Use</h2>
        <p className="text-muted-foreground mb-4">You agree not to misuse the service, attempt unauthorized access, or use the platform for any illegal purpose. We reserve the right to suspend accounts that violate these terms.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">5. Intellectual Property</h2>
        <p className="text-muted-foreground mb-4">You retain ownership of all content you upload. By using the service, you grant us a limited license to store, process, and display your content as necessary to provide the service.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">6. Limitation of Liability</h2>
        <p className="text-muted-foreground mb-4">ArchDecision Hub is provided "as is" without warranties. We shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>
      </div>
    </div>
  )
}
