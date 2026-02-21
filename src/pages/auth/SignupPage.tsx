import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export function SignupPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsLoading(false)
    toast.success('Account created! Please verify your email.')
    navigate('/verify-email')
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold">Create your account</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Start your 14-day free trial. No credit card required.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium">First name</label>
            <Input id="firstName" placeholder="Sarah" required />
          </div>
          <div>
            <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium">Last name</label>
            <Input id="lastName" placeholder="Chen" required />
          </div>
        </div>
        <div>
          <label htmlFor="firmName" className="mb-1.5 block text-sm font-medium">Firm name</label>
          <Input id="firmName" placeholder="Your Architecture Firm" required />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Work email</label>
          <Input id="email" type="email" placeholder="you@company.com" required />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium">Password</label>
          <Input id="password" type="password" placeholder="Min. 8 characters" required minLength={8} />
          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-1 flex-1 rounded-full bg-muted" />
            ))}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Use 8+ characters with a mix of letters, numbers & symbols</p>
        </div>

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Create Account
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          By creating an account, you agree to our{' '}
          <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
        </p>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
