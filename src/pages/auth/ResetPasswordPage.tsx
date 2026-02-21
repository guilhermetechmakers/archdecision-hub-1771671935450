import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, KeyRound } from 'lucide-react'
import { toast } from 'sonner'

export function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsLoading(false)
    setIsSent(true)
    toast.success('Reset link sent!')
  }

  if (isSent) {
    return (
      <div className="animate-fade-in text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <KeyRound className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">Check your email</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          If an account exists with that email, we've sent password reset instructions.
        </p>
        <Link to="/login" className="mt-8 block">
          <Button variant="outline" className="w-full gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to sign in
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold">Reset your password</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label>
          <Input id="email" type="email" placeholder="you@company.com" required />
        </div>
        <Button type="submit" className="w-full" isLoading={isLoading}>
          Send Reset Link
        </Button>
      </form>

      <Link to="/login" className="mt-6 block">
        <Button variant="ghost" className="w-full gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Button>
      </Link>
    </div>
  )
}
