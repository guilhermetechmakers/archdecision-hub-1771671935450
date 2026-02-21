import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { templates } from '@/data/mock-data'
import { toast } from 'sonner'
import {
  Plus, Search, LayoutTemplate,
  Copy, ArrowRight,
} from 'lucide-react'

export function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTemplates = templates.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleUseTemplate = (name: string) => {
    toast.success(`Creating project from "${name}" template...`)
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Templates Library</h1>
          <p className="text-sm text-muted-foreground">Reusable project and decision templates</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Create Template
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 animate-stagger">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="group hover:border-primary/20 transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
                  <LayoutTemplate className="h-5 w-5" />
                </div>
                <Badge variant="outline" className="text-xs">{template.category}</Badge>
              </div>

              <h3 className="text-lg font-semibold">{template.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{template.description}</p>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-muted/50 p-2 text-center">
                  <p className="text-lg font-bold">{template.phases.length}</p>
                  <p className="text-[10px] text-muted-foreground">Phases</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-2 text-center">
                  <p className="text-lg font-bold">{template.decisions}</p>
                  <p className="text-[10px] text-muted-foreground">Decisions</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-2 text-center">
                  <p className="text-lg font-bold">{template.tasks}</p>
                  <p className="text-[10px] text-muted-foreground">Tasks</p>
                </div>
              </div>

              <div className="mt-4 space-y-1.5">
                {template.phases.map((phase) => (
                  <div key={phase.name} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{phase.name}</span>
                    <span className="font-medium">{phase.duration} weeks</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Copy className="h-3 w-3" />
                  Used {template.usageCount} times
                </div>
                <Button size="sm" className="gap-1" onClick={() => handleUseTemplate(template.name)}>
                  Use Template <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
