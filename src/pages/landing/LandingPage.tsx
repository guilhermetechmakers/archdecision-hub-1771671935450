import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ClipboardCheck, MessageSquare, FileText, Shield, Zap,
  ArrowRight, Check, Building2, Star, ChevronRight, BarChart3,
  LayoutTemplate,
} from 'lucide-react'

const features = [
  {
    icon: ClipboardCheck,
    title: 'Visual Decision Cards',
    description: 'Present options with side-by-side comparisons, cost impacts, and clear recommendations. Clients approve with one click.',
  },
  {
    icon: Shield,
    title: 'Immutable Audit Trail',
    description: 'Every decision, approval, and change is permanently recorded. Export proof-of-choice packages for any dispute.',
  },
  {
    icon: MessageSquare,
    title: 'Contextual Messaging',
    description: 'Attach conversations directly to decisions, files, and tasks. No more hunting through email threads.',
  },
  {
    icon: FileText,
    title: 'Document Versioning',
    description: 'Upload, preview, and track versions of drawings and specs. Check-in/check-out prevents conflicts.',
  },
  {
    icon: LayoutTemplate,
    title: 'Project Templates',
    description: 'Standardize workflows with reusable templates. Spin up new projects in minutes, not hours.',
  },
  {
    icon: BarChart3,
    title: 'Reports & Analytics',
    description: 'Track approval times, pending decisions, and project health with real-time dashboards.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Create Your Project',
    description: 'Start from a template or build from scratch. Define phases, milestones, and team roles in minutes.',
  },
  {
    number: '02',
    title: 'Present Decisions',
    description: 'Build visual comparison cards with images, specs, costs, and your recommendation. Publish for client review.',
  },
  {
    number: '03',
    title: 'Get Approvals',
    description: 'Clients review, comment, and approve with one click. E-signatures and audit trails included.',
  },
]

const plans = [
  {
    name: 'Starter',
    price: 49,
    description: 'For small firms getting started',
    features: ['Up to 5 active projects', '3 team members', 'Decision log & comparison cards', 'Basic file storage (10 GB)', 'Email support'],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: 129,
    description: 'For growing architecture firms',
    features: ['Unlimited projects', '15 team members', 'Everything in Starter', 'Client portal access', 'Templates library', 'Contextual messaging', 'Meeting agendas & notes', '100 GB file storage', 'Priority support'],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 299,
    description: 'For large firms with advanced needs',
    features: ['Everything in Professional', 'Unlimited team members', 'SSO & SAML', 'E-signatures & audit export', 'Custom integrations', 'Unlimited storage', 'Dedicated account manager', 'SLA guarantee'],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

const testimonials = [
  {
    quote: "ArchDecision Hub eliminated the 'I never approved that' conversations. Every decision is documented with full context.",
    author: 'Rachel Torres',
    role: 'Principal, Torres Architecture',
    rating: 5,
  },
  {
    quote: "Our client approval times dropped from 2 weeks to 3 days. The visual decision cards make it easy for clients to understand options.",
    author: 'Michael Chen',
    role: 'Project Manager, Skyline Design Group',
    rating: 5,
  },
  {
    quote: "Finally, a project management tool built for how architects actually work. The template system saves us hours on every new project.",
    author: 'Sarah Williams',
    role: 'Director of Operations, Urban Edge Architects',
    rating: 5,
  },
]

export function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-background to-indigo-50" />
          <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-indigo-500/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary animate-fade-in">
              <Zap className="h-4 w-4" />
              Trusted by 500+ architecture firms
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              One platform for every{' '}
              <span className="text-gradient">architecture decision</span>
            </h1>
            <p className="mb-10 text-lg text-muted-foreground sm:text-xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Centralize project decisions, approvals, and documentation.
              Visual comparison cards make it easy for clients to choose.
              Immutable audit trails prove every design choice.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <Link to="/signup">
                <Button size="lg" className="gap-2 px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                  Start Free Trial <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="gap-2 px-8">
                  View Demo <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <div className="mx-auto max-w-5xl rounded-xl border border-border bg-card p-2 shadow-elevated">
              <div className="rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 p-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {/* Mock Dashboard Preview */}
                  <div className="col-span-2 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-red-400" />
                      <div className="h-3 w-3 rounded-full bg-amber-400" />
                      <div className="h-3 w-3 rounded-full bg-emerald-400" />
                      <div className="ml-4 h-6 w-48 rounded bg-slate-200" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {['5 Active', '8 Pending', '94% Rate'].map((label) => (
                        <div key={label} className="rounded-lg bg-white p-3 shadow-sm">
                          <div className="text-xs text-slate-400">Projects</div>
                          <div className="mt-1 text-lg font-bold text-slate-700">{label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {[85, 60, 35].map((w, i) => (
                        <div key={i} className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
                          <div className="h-8 w-8 rounded bg-blue-100" />
                          <div className="flex-1">
                            <div className="h-3 rounded bg-slate-200" style={{ width: `${w}%` }} />
                            <div className="mt-1.5 h-2 w-24 rounded bg-slate-100" />
                          </div>
                          <div className="h-6 w-16 rounded-full bg-emerald-100" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-white p-4 shadow-sm">
                      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Decision Card</div>
                      <div className="mb-2 h-24 rounded bg-gradient-to-br from-blue-100 to-indigo-100" />
                      <div className="h-3 w-3/4 rounded bg-slate-200" />
                      <div className="mt-1.5 h-2 w-1/2 rounded bg-slate-100" />
                      <div className="mt-3 flex gap-2">
                        <div className="h-7 flex-1 rounded bg-primary/20" />
                        <div className="h-7 flex-1 rounded bg-slate-100" />
                      </div>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-sm">
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Activity</div>
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-2 py-1.5">
                          <div className="h-5 w-5 rounded-full bg-slate-200" />
                          <div className="h-2 flex-1 rounded bg-slate-100" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Everything your firm needs to{' '}
              <span className="text-gradient">manage decisions</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Purpose-built for architecture workflows. Not another generic project management tool.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 animate-stagger">
            {features.map((feature) => (
              <Card key={feature.title} className="group relative overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 lg:py-32 bg-gradient-to-b from-background to-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Three steps to{' '}
              <span className="text-gradient">better decisions</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get started in minutes. See results from day one.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.number} className="relative text-center animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-gradient-to-r from-primary/30 to-primary/10 md:block" />
                )}
                <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-blue-600 text-3xl font-bold text-white shadow-lg shadow-primary/25">
                  {step.number}
                </div>
                <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Simple, transparent{' '}
              <span className="text-gradient">pricing</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start free for 14 days. No credit card required.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative overflow-hidden transition-all duration-300 ${
                  plan.highlighted
                    ? 'border-primary shadow-lg shadow-primary/10 scale-[1.02]'
                    : 'border-border/50 hover:border-primary/20'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 bg-primary py-1.5 text-center text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <CardContent className={`p-8 ${plan.highlighted ? 'pt-12' : ''}`}>
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <Link to="/signup" className="mt-6 block">
                    <Button
                      className="w-full"
                      variant={plan.highlighted ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                  <ul className="mt-8 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Loved by{' '}
              <span className="text-gradient">architecture teams</span>
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 animate-stagger">
            {testimonials.map((t) => (
              <Card key={t.author} className="border-border/50">
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
                  <div>
                    <p className="text-sm font-semibold">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-blue-600 to-indigo-700 px-8 py-16 text-center text-white sm:px-16">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                Ready to streamline your project decisions?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-lg text-blue-100">
                Join 500+ architecture firms already using ArchDecision Hub to deliver projects faster with fewer disputes.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link to="/signup">
                  <Button size="lg" className="gap-2 bg-white text-primary hover:bg-white/90 px-8">
                    Start Free Trial <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="gap-2 border-white/30 text-white hover:bg-white/10 px-8">
                    Schedule Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Building2 className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold">ArchDecision Hub</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                The decision management platform built for architecture firms.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><Link to="/login" className="hover:text-foreground transition-colors">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link to="/help" className="hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link to="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ArchDecision Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
