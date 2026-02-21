import { useState, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Dialog } from '@/components/ui/dialog'
import type { Decision, DecisionOption } from '@/types'
import { toast } from 'sonner'
import {
  Check, X, MessageSquare, PenTool, Shield, AlertTriangle,
} from 'lucide-react'

interface ClientActionsProps {
  decision: Decision
  selectedOptionId: string | null
  selectedOption: DecisionOption | undefined
}

export function ClientActions({ decision, selectedOptionId, selectedOption }: ClientActionsProps) {
  const [isSignDialogOpen, setIsSignDialogOpen] = useState(false)
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false)
  const [isChangesDialogOpen, setIsChangesDialogOpen] = useState(false)
  const [signatureName, setSignatureName] = useState('')
  const [questionText, setQuestionText] = useState('')
  const [changesText, setChangesText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)

  const isPending = decision.status === 'pending'
  const isApproved = decision.status === 'approved'

  const handleApprove = () => {
    if (!selectedOptionId) {
      toast.error('Please select an option before approving.')
      return
    }
    setIsSignDialogOpen(true)
  }

  const handleSign = async () => {
    if (!signatureName.trim()) {
      toast.error('Please type your full name to sign.')
      return
    }
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsSubmitting(false)
    setIsSignDialogOpen(false)
    toast.success('Decision approved and signed successfully!', {
      description: `Signed by ${signatureName} — a confirmation PDF has been generated.`,
    })
  }

  const handleRequestChanges = async () => {
    if (!changesText.trim()) return
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsSubmitting(false)
    setIsChangesDialogOpen(false)
    setChangesText('')
    toast.success('Change request submitted.', {
      description: 'The design team will be notified.',
    })
  }

  const handleAskQuestion = async () => {
    if (!questionText.trim()) return
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsSubmitting(false)
    setIsQuestionDialogOpen(false)
    setQuestionText('')
    toast.success('Question posted to the discussion thread.')
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    setIsDrawing(true)
    setHasSignature(true)
    const rect = canvas.getBoundingClientRect()
    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#111'
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()
  }

  const stopDrawing = () => setIsDrawing(false)

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasSignature(false)
  }

  if (isApproved) {
    return (
      <Card className="rounded-lg shadow-card border-emerald-200 bg-emerald-50/50" role="status" aria-label="Decision approved">
        <CardContent className="p-5 flex items-center gap-3">
          <div className="rounded-full bg-emerald-100 p-2">
            <Check className="h-5 w-5 text-emerald-600" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-semibold text-emerald-800">Decision Approved</h3>
            <p className="text-sm text-emerald-600">
              {selectedOption
                ? `"${selectedOption.title}" was approved and signed.`
                : 'This decision has been approved.'}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!isPending) {
    return (
      <Card className="rounded-lg shadow-card border-dashed" role="status" aria-label={`Decision status: ${decision.status}`}>
        <CardContent className="p-5 flex items-center gap-3 text-muted-foreground">
          <AlertTriangle className="h-5 w-5" aria-hidden="true" />
          <p className="text-sm">
            This decision is currently in <span className="font-medium">{decision.status}</span> status.
            Client actions are available when the decision is pending approval.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="rounded-lg shadow-card" role="region" aria-label="Client actions">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
            <h3 className="font-semibold">Client Actions</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Review the options above and take action on this decision.
            {selectedOptionId
              ? ` You have selected "${selectedOption?.title}".`
              : ' Please select an option first.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              className="gap-2 h-11"
              onClick={handleApprove}
              disabled={!selectedOptionId}
              aria-label={selectedOptionId ? `Approve and sign ${selectedOption?.title}` : 'Select an option before approving'}
            >
              <Check className="h-4 w-4" aria-hidden="true" /> Approve & Sign
            </Button>
            <Button
              variant="outline"
              className="gap-2 h-11"
              onClick={() => setIsChangesDialogOpen(true)}
              aria-label="Request changes to this decision"
            >
              <X className="h-4 w-4" aria-hidden="true" /> Request Changes
            </Button>
            <Button
              variant="ghost"
              className="gap-2 h-11"
              onClick={() => setIsQuestionDialogOpen(true)}
              aria-label="Ask a question about this decision"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" /> Ask Question
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* E-Signature Dialog */}
      <Dialog
        isOpen={isSignDialogOpen}
        onClose={() => setIsSignDialogOpen(false)}
        title="Approve & Sign Decision"
        description={`You are approving "${selectedOption?.title}" for "${decision.title}".`}
        className="max-w-md"
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Full Legal Name</label>
            <input
              type="text"
              value={signatureName}
              onChange={(e) => setSignatureName(e.target.value)}
              placeholder="Type your full name"
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Signature (optional)</label>
            <div className="rounded-lg border border-input bg-white relative">
              <canvas
                ref={canvasRef}
                width={380}
                height={120}
                className="w-full cursor-crosshair rounded-lg"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                aria-label="Signature drawing area"
                role="img"
              />
              {!hasSignature && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <PenTool className="h-4 w-4" /> Draw your signature here
                  </span>
                </div>
              )}
            </div>
            {hasSignature && (
              <button
                type="button"
                onClick={clearSignature}
                className="text-xs text-muted-foreground hover:text-foreground mt-1 transition-colors"
                aria-label="Clear drawn signature"
              >
                Clear signature
              </button>
            )}
          </div>

          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground space-y-1">
            <p>By signing, you confirm that:</p>
            <ul className="list-disc list-inside space-y-0.5 ml-1">
              <li>You have reviewed all options and their cost impacts</li>
              <li>You approve the selected option for this decision</li>
              <li>This signature will be recorded with a timestamp and IP address</li>
            </ul>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button variant="outline" onClick={() => setIsSignDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSign}
              disabled={!signatureName.trim()}
              isLoading={isSubmitting}
              className="gap-2"
            >
              <PenTool className="h-4 w-4" /> Sign & Approve
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Request Changes Dialog */}
      <Dialog
        isOpen={isChangesDialogOpen}
        onClose={() => setIsChangesDialogOpen(false)}
        title="Request Changes"
        description="Describe what changes you'd like the design team to make."
      >
        <div className="space-y-4">
          <Textarea
            value={changesText}
            onChange={(e) => setChangesText(e.target.value)}
            placeholder="Describe the changes you'd like to see..."
            className="min-h-[120px]"
          />
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setIsChangesDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleRequestChanges}
              disabled={!changesText.trim()}
              isLoading={isSubmitting}
            >
              Submit Request
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Ask Question Dialog */}
      <Dialog
        isOpen={isQuestionDialogOpen}
        onClose={() => setIsQuestionDialogOpen(false)}
        title="Ask a Question"
        description="Your question will be posted to the decision discussion thread."
      >
        <div className="space-y-4">
          <Textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="What would you like to know?"
            className="min-h-[100px]"
          />
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setIsQuestionDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAskQuestion}
              disabled={!questionText.trim()}
              isLoading={isSubmitting}
            >
              Post Question
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}
