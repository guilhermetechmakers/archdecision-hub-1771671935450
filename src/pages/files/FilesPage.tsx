import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { projectFiles } from '@/data/mock-data'
import { formatDate } from '@/lib/utils'
import {
  Upload, Search, FolderOpen, FileText, Image, FileSpreadsheet,
  Download, Grid3X3, List, ChevronRight,
} from 'lucide-react'

const fileIcons: Record<string, typeof FileText> = {
  pdf: FileText,
  dwg: FileText,
  revit: FileText,
  image: Image,
  spreadsheet: FileSpreadsheet,
  document: FileText,
  other: FileText,
}

const folders = [
  { name: 'Drawings/Architectural', count: 2 },
  { name: 'Renderings', count: 1 },
  { name: 'Specifications', count: 1 },
  { name: 'Reports', count: 1 },
  { name: 'Design/Concepts', count: 1 },
  { name: 'Models/MEP', count: 1 },
  { name: 'Budget', count: 1 },
]

export function FilesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)

  const filteredFiles = projectFiles.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFolder = !selectedFolder || f.folder === selectedFolder
    return matchesSearch && matchesFolder
  })

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Files & Drawings</h1>
          <p className="text-sm text-muted-foreground">{projectFiles.length} files across all projects</p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" /> Upload Files
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-lg border border-input">
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded-l-lg p-2 transition-colors ${viewMode === 'grid' ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`rounded-r-lg p-2 transition-colors ${viewMode === 'list' ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Folder Tree */}
        <div className="space-y-1">
          <button
            onClick={() => setSelectedFolder(null)}
            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
              !selectedFolder ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-accent'
            }`}
          >
            <FolderOpen className="h-4 w-4" />
            All Files
            <span className="ml-auto text-xs">{projectFiles.length}</span>
          </button>
          {folders.map((folder) => (
            <button
              key={folder.name}
              onClick={() => setSelectedFolder(folder.name)}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                selectedFolder === folder.name ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              <FolderOpen className="h-4 w-4" />
              <span className="truncate">{folder.name.split('/').pop()}</span>
              <span className="ml-auto text-xs">{folder.count}</span>
            </button>
          ))}
        </div>

        {/* File List */}
        <div className="lg:col-span-3 space-y-3">
          {selectedFolder && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
              <button onClick={() => setSelectedFolder(null)} className="hover:text-foreground">All Files</button>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground font-medium">{selectedFolder}</span>
            </div>
          )}

          {viewMode === 'list' ? (
            <div className="space-y-2 animate-stagger">
              {filteredFiles.map((file) => {
                const Icon = fileIcons[file.type] || FileText
                return (
                  <Card key={file.id} className="group hover:border-primary/20 transition-all">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="rounded-lg bg-muted p-2">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {file.folder} &middot; v{file.version} &middot; {(file.size / 1000000).toFixed(1)} MB
                        </p>
                      </div>
                      <div className="hidden items-center gap-2 sm:flex">
                        <Avatar name={file.uploadedBy.name} size="sm" className="h-6 w-6 text-[8px]" />
                        <span className="text-xs text-muted-foreground">{formatDate(file.uploadedAt)}</span>
                      </div>
                      <Badge variant="outline" className="text-[10px] uppercase">{file.type}</Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 animate-stagger">
              {filteredFiles.map((file) => {
                const Icon = fileIcons[file.type] || FileText
                return (
                  <Card key={file.id} className="group cursor-pointer hover:border-primary/20 transition-all">
                    <CardContent className="p-4">
                      <div className="mb-3 flex h-24 items-center justify-center rounded-lg bg-muted">
                        <Icon className="h-10 w-10 text-muted-foreground/50" />
                      </div>
                      <p className="font-medium truncate text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        v{file.version} &middot; {(file.size / 1000000).toFixed(1)} MB
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
