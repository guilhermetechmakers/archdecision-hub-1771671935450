import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { tasks, projects } from '@/data/mock-data'
import { formatDate, cn } from '@/lib/utils'
import type { TaskStatus } from '@/types'
import { Plus, Search, Filter, GripVertical } from 'lucide-react'

const columns: { id: TaskStatus; label: string; color: string }[] = [
  { id: 'todo', label: 'To Do', color: 'bg-gray-400' },
  { id: 'in-progress', label: 'In Progress', color: 'bg-blue-500' },
  { id: 'review', label: 'Review', color: 'bg-amber-500' },
  { id: 'done', label: 'Done', color: 'bg-emerald-500' },
]

const priorityColors: Record<string, string> = {
  low: 'bg-gray-100 text-gray-600',
  medium: 'bg-blue-100 text-blue-700',
  high: 'bg-amber-100 text-amber-700',
  urgent: 'bg-red-100 text-red-700',
}

export function TasksPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban')

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tasks & RFIs</h1>
          <p className="text-sm text-muted-foreground">{tasks.length} tasks, {tasks.filter((t) => t.isRfi).length} RFIs</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> New Task
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <div className="flex rounded-lg border border-input">
            <button
              onClick={() => setViewMode('kanban')}
              className={`rounded-l-lg px-3 py-1.5 text-xs font-medium transition-colors ${viewMode === 'kanban' ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Board
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`rounded-r-lg px-3 py-1.5 text-xs font-medium transition-colors ${viewMode === 'list' ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => {
            const columnTasks = filteredTasks.filter((t) => t.status === column.id)
            return (
              <div key={column.id} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className={cn('h-2 w-2 rounded-full', column.color)} />
                  <h3 className="text-sm font-semibold">{column.label}</h3>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {columnTasks.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {columnTasks.map((task) => {
                    const project = projects.find((p) => p.id === task.projectId)
                    return (
                      <Card key={task.id} className="group cursor-pointer hover:border-primary/20 transition-all">
                        <CardContent className="p-3">
                          <div className="flex items-start gap-2">
                            <GripVertical className="h-4 w-4 text-muted-foreground/30 mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap mb-1">
                                {task.isRfi && <Badge variant="warning" className="text-[10px]">RFI</Badge>}
                                <Badge className={cn('text-[10px]', priorityColors[task.priority])} variant="secondary">
                                  {task.priority}
                                </Badge>
                              </div>
                              <p className="text-sm font-medium">{task.title}</p>
                              {project && <p className="text-xs text-muted-foreground mt-0.5">{project.name}</p>}
                              <div className="mt-2 flex items-center justify-between">
                                <Avatar name={task.assignee.name} size="sm" className="h-5 w-5 text-[8px]" />
                                <span className="text-[10px] text-muted-foreground">{formatDate(task.dueDate)}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="space-y-2 animate-stagger">
          {filteredTasks.map((task) => {
            const project = projects.find((p) => p.id === task.projectId)
            const column = columns.find((c) => c.id === task.status)
            return (
              <Card key={task.id} className="group hover:border-primary/20 transition-all">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className={cn('h-2 w-2 rounded-full shrink-0', column?.color || 'bg-gray-300')} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{task.title}</p>
                      {task.isRfi && <Badge variant="warning" className="text-[10px]">RFI</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {project?.name} &middot; {task.assignee.name}
                    </p>
                  </div>
                  <Badge className={cn('text-[10px]', priorityColors[task.priority])} variant="secondary">
                    {task.priority}
                  </Badge>
                  <Badge variant="secondary" className="capitalize text-xs hidden sm:inline-flex">{task.status}</Badge>
                  <span className="text-xs text-muted-foreground hidden md:block whitespace-nowrap">{formatDate(task.dueDate)}</span>
                  <Avatar name={task.assignee.name} size="sm" />
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
