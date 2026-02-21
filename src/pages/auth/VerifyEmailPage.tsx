import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Mail, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

export function VerifyEmailPage() {
  const [isResending, setIsResending] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  const handleResend = async () => {
    setIsResending(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsResending(false)
    setCooldown(60)
    toast.success('Verification email resent!')
    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  return (
    <div className="animate-fade-in text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Mail className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-2xl font-bold">Check your email</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        We've sent a verification link to your email address.
        Click the link to verify your account and get started.
      </p>

      <div className="mt-8 space-y-3">
        <Button
          onClick={handleResend}
          variant="outline"
          className="w-full"
          isLoading={isResending}
          disabled={cooldown > 0}
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend verification email'}
        </Button>

        <Link to="/login" className="block">
          <Button variant="ghost" className="w-full gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to sign in
          </Button>
        </Link>
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        Wrong email? <Link to="/signup" className="text-primary hover:underline">Change email address</Link>
        {' '}&middot;{' '}
        <a href="mailto:support@archdecision.com" className="text-primary hover:underline">Contact support</a>
      </p>
    </div>
  )
}
