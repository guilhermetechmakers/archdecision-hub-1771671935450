import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Check, CreditCard, ArrowLeft, Download } from 'lucide-react'
import { Link } from 'react-router-dom'

const plans = [
  { id: 'starter', name: 'Starter', price: 49, features: ['5 projects', '3 members', '10 GB storage'] },
  { id: 'professional', name: 'Professional', price: 129, features: ['Unlimited projects', '15 members', '100 GB storage'], current: true },
  { id: 'enterprise', name: 'Enterprise', price: 299, features: ['Unlimited everything', 'SSO & SAML', 'Dedicated support'] },
]

const invoices = [
  { id: 'INV-2026-02', date: 'Feb 1, 2026', amount: '$129.00', status: 'Paid' },
  { id: 'INV-2026-01', date: 'Jan 1, 2026', amount: '$129.00', status: 'Paid' },
  { id: 'INV-2025-12', date: 'Dec 1, 2025', amount: '$129.00', status: 'Paid' },
  { id: 'INV-2025-11', date: 'Nov 1, 2025', amount: '$99.00', status: 'Paid' },
  { id: 'INV-2025-10', date: 'Oct 1, 2025', amount: '$99.00', status: 'Paid' },
]

export function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState('professional')

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <Link to="/dashboard/settings" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Settings
        </Link>
        <h1 className="text-2xl font-bold">Billing & Subscription</h1>
        <p className="text-sm text-muted-foreground">Manage your plan, payment method, and invoices</p>
      </div>

      {/* Plan Selection */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Choose Your Plan</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'hover:border-primary/30'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{plan.name}</h3>
                  {plan.current && <Badge variant="info" className="text-[10px]">Current</Badge>}
                </div>
                <p className="text-3xl font-bold">${plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CreditCard className="h-4 w-4" /> Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 rounded-lg border border-border p-4">
            <div className="rounded bg-muted p-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Visa ending in 4242</p>
              <p className="text-xs text-muted-foreground">Expires 12/2027</p>
            </div>
            <Button variant="outline" size="sm">Update</Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Card Number</label>
              <Input placeholder="4242 4242 4242 4242" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Expiry</label>
                <Input placeholder="MM/YY" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">CVC</label>
                <Input placeholder="123" />
              </div>
            </div>
          </div>
          <Button onClick={() => toast.success('Payment method updated!')}>Save Payment Method</Button>
        </CardContent>
      </Card>

      {/* Invoice History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium">{inv.id}</p>
                  <p className="text-xs text-muted-foreground">{inv.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{inv.amount}</span>
                  <Badge variant="success" className="text-[10px]">{inv.status}</Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
