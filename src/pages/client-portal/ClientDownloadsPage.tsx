import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { projectFiles } from '@/data/mock-data'
import { formatDate } from '@/lib/utils'
import { Download, FileText } from 'lucide-react'
import { toast } from 'sonner'

export function ClientDownloadsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Downloads</h1>
        <p className="text-sm text-muted-foreground">Access project files and approved decision documents</p>
      </div>

      <div className="space-y-3">
        {projectFiles.slice(0, 6).map((file) => (
          <Card key={file.id} className="hover:border-primary/20 transition-all">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-muted p-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  v{file.version} &middot; {(file.size / 1000000).toFixed(1)} MB &middot; {formatDate(file.uploadedAt)}
                </p>
              </div>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.success('Download started!')}>
                <Download className="h-4 w-4" /> Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
