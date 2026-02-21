import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import {
  ArrowLeft,
  FileText,
  Shield,
  Users,
  AlertTriangle,
  Scale,
  Brain,
  ChevronDown,
  ChevronUp,
  Printer,
  Mail,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TermsSection {
  id: string
  icon: React.ElementType
  title: string
  content: string
}

const termsSections: TermsSection[] = [
  {
    id: 'acceptance',
    icon: FileText,
    title: '1. Acceptance of Terms',
    content:
      'By accessing or using ArchDecision Hub, you agree to be bound by these Terms of Service. If you do not agree, do not use the service.',
  },
  {
    id: 'description',
    icon: Brain,
    title: '2. Description of Service',
    content:
      'ArchDecision Hub provides a project management and decision platform for architecture firms, including decision logging, document management, messaging, and reporting features.',
  },
  {
    id: 'accounts',
    icon: Users,
    title: '3. User Accounts',
    content:
      'You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of any unauthorized use.',
  },
  {
    id: 'acceptable-use',
    icon: Shield,
    title: '4. Acceptable Use',
    content:
      'You agree not to misuse the service, attempt unauthorized access, or use the platform for any illegal purpose. We reserve the right to suspend accounts that violate these terms.',
  },
  {
    id: 'intellectual-property',
    icon: Scale,
    title: '5. Intellectual Property',
    content:
      'You retain ownership of all content you upload. By using the service, you grant us a limited license to store, process, and display your content as necessary to provide the service.',
  },
  {
    id: 'liability',
    icon: AlertTriangle,
    title: '6. Limitation of Liability',
    content:
      'ArchDecision Hub is provided "as is" without warranties. We shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.',
  },
]

export function TermsPage() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(termsSections.map((s) => s.id))
  )

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const allExpanded = expandedSections.size === termsSections.length
  const toggleAll = () => {
    if (allExpanded) {
      setExpandedSections(new Set())
    } else {
      setExpandedSections(new Set(termsSections.map((s) => s.id)))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16 animate-fade-in">
        {/* Back navigation */}
        <Link
          to="/"
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'mb-8 -ml-2 text-muted-foreground hover:text-foreground'
          )}
          aria-label="Navigate back to the home page"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>

        {/* Page header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
              <FileText className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">Terms of Service</h1>
              <Badge variant="secondary" className="mt-1">
                Last updated: February 21, 2026
              </Badge>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Please read these terms carefully before using ArchDecision Hub. These terms govern
            your access to and use of our platform.
          </p>
        </header>

        {/* Quick navigation & actions */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <nav aria-label="Terms section quick links">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Jump to section
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {termsSections.map((section) => (
                    <Button
                      key={section.id}
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => {
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
                        setExpandedSections((prev) => new Set([...prev, section.id]))
                      }}
                      aria-label={`Jump to ${section.title}`}
                    >
                      {section.title.split('. ')[0]}
                    </Button>
                  ))}
                </div>
              </nav>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.print()}
                  aria-label="Print terms of service"
                  className="h-8"
                >
                  <Printer className="mr-1.5 h-4 w-4" aria-hidden="true" />
                  Print
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleAll}
                  aria-label={allExpanded ? 'Collapse all sections' : 'Expand all sections'}
                  className="h-8"
                >
                  {allExpanded ? (
                    <>
                      <ChevronUp className="mr-1.5 h-4 w-4" aria-hidden="true" />
                      Collapse all
                    </>
                  ) : (
                    <>
                      <ChevronDown className="mr-1.5 h-4 w-4" aria-hidden="true" />
                      Expand all
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms sections */}
        <div className="space-y-4 animate-stagger" role="list" aria-label="Terms of service sections">
          {termsSections.map((section) => {
            const isExpanded = expandedSections.has(section.id)
            const Icon = section.icon

            return (
              <Card key={section.id} id={section.id} role="listitem">
                <CardContent className="p-0">
                  <button
                    type="button"
                    className={cn(
                      'flex w-full items-center gap-3 p-5 text-left transition-colors rounded-lg',
                      'hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                      isExpanded && 'pb-3'
                    )}
                    onClick={() => toggleSection(section.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`${section.id}-content`}
                    aria-label={`${section.title} — click to ${isExpanded ? 'collapse' : 'expand'}`}
                  >
                    <div className="rounded-md bg-primary/10 p-2 text-primary shrink-0">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <h2 className="flex-1 text-base font-semibold">{section.title}</h2>
                    <div className="text-muted-foreground shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="h-4 w-4" aria-hidden="true" />
                      )}
                    </div>
                  </button>
                  {isExpanded && (
                    <div
                      id={`${section.id}-content`}
                      role="region"
                      aria-labelledby={section.id}
                      className="px-5 pb-5 pl-[3.75rem]"
                    >
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Contact / questions */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-2.5 text-primary shrink-0">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold">Questions about these terms?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  If you have any questions about our Terms of Service, please contact us at{' '}
                  <a
                    href="mailto:legal@archdecision.com"
                    className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    aria-label="Send email to legal@archdecision.com"
                  >
                    legal@archdecision.com
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related legal pages */}
        <nav className="mt-8 flex flex-col gap-3 sm:flex-row" aria-label="Related legal pages">
          <Link
            to="/privacy"
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'flex-1 justify-start'
            )}
            aria-label="View the privacy policy"
          >
            <Shield className="mr-2 h-4 w-4" aria-hidden="true" />
            Privacy Policy
          </Link>
          <Link
            to="/cookies"
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'flex-1 justify-start'
            )}
            aria-label="View the cookie policy"
          >
            <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
            Cookie Policy
          </Link>
        </nav>
      </div>
    </div>
  )
}
