import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import {
  Search, BookOpen, Video, MessageCircle, ChevronRight,
  CheckCircle, Circle, HelpCircle, FileText, Users, Shield,
} from 'lucide-react'

const categories = [
  { icon: BookOpen, title: 'Getting Started', description: 'Learn the basics of ArchDecision Hub', articles: 8 },
  { icon: FileText, title: 'Decision Management', description: 'Creating and managing decisions', articles: 12 },
  { icon: Users, title: 'Team & Permissions', description: 'Managing roles and access control', articles: 6 },
  { icon: Shield, title: 'Security & Compliance', description: 'Security features and data protection', articles: 5 },
  { icon: Video, title: 'Video Tutorials', description: 'Step-by-step video guides', articles: 10 },
  { icon: HelpCircle, title: 'FAQ', description: 'Frequently asked questions', articles: 15 },
]

const onboardingSteps = [
  { title: 'Create your firm profile', completed: true },
  { title: 'Invite team members', completed: true },
  { title: 'Create your first project', completed: true },
  { title: 'Upload project files', completed: false },
  { title: 'Create your first decision', completed: false },
  { title: 'Invite a client', completed: false },
]

export function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const completedSteps = onboardingSteps.filter((s) => s.completed).length

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Help & Knowledge Base</h1>
        <p className="text-sm text-muted-foreground">Find answers, tutorials, and support resources</p>
      </div>

      {/* Search */}
      <div className="relative max-w-xl">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search help articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-12 pl-12 text-base"
        />
      </div>

      {/* Onboarding Checklist */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Onboarding Checklist</h3>
              <p className="text-sm text-muted-foreground">{completedSteps} of {onboardingSteps.length} steps completed</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary">{Math.round((completedSteps / onboardingSteps.length) * 100)}%</span>
            </div>
          </div>
          <div className="h-2 rounded-full bg-muted mb-4">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${(completedSteps / onboardingSteps.length) * 100}%` }}
            />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {onboardingSteps.map((step) => (
              <div key={step.title} className="flex items-center gap-2 text-sm">
                {step.completed ? (
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
                <span className={step.completed ? 'text-muted-foreground line-through' : ''}>{step.title}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Card key={cat.title} className="group cursor-pointer hover:border-primary/20 transition-all">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2.5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <cat.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{cat.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{cat.articles} articles</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Support */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Can't find what you're looking for?</h3>
              <p className="mt-1 text-sm text-muted-foreground">Contact our support team and we'll get back to you within 24 hours.</p>
              <div className="mt-4 max-w-md space-y-3">
                <Input placeholder="Subject" />
                <Textarea placeholder="Describe your issue..." />
                <Button onClick={() => toast.success('Support request submitted!')}>Send Message</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
