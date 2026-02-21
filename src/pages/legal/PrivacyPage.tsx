import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link to="/" className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: February 21, 2026</p>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-xl font-semibold mt-8 mb-3">1. Information We Collect</h2>
        <p className="text-muted-foreground mb-4">We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This includes your name, email address, firm information, and project data.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. How We Use Your Information</h2>
        <p className="text-muted-foreground mb-4">We use the information we collect to provide, maintain, and improve our services, process transactions, send notifications, and respond to your requests.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. Data Security</h2>
        <p className="text-muted-foreground mb-4">We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data is encrypted at rest and in transit.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">4. Data Retention</h2>
        <p className="text-muted-foreground mb-4">We retain your information for as long as your account is active or as needed to provide services. You may request deletion of your data at any time through your account settings.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">5. Your Rights</h2>
        <p className="text-muted-foreground mb-4">You have the right to access, correct, or delete your personal data. You may also object to processing or request data portability. Contact us at privacy@archdecision.com for any requests.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">6. Contact Us</h2>
        <p className="text-muted-foreground mb-4">If you have questions about this Privacy Policy, please contact us at privacy@archdecision.com.</p>
      </div>
    </div>
  )
}
