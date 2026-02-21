import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/empty-state'
import { users } from '@/data/mock-data'
import { toast } from 'sonner'
import {
  User, Mail, Camera, Save, Shield, Bell,
  Key, Smartphone, AlertCircle, CheckCircle,
} from 'lucide-react'

const clientUser = users[3]!

function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6">
      <Skeleton className="h-8 w-32" />
      <div className="space-y-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <Skeleton className="mb-6 h-5 w-48" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
          <Skeleton className="mt-4 h-16 w-full" />
          <Skeleton className="mt-4 h-16 w-full" />
          <Skeleton className="mt-6 h-10 w-32" />
        </div>
      </div>
    </div>
  )
}

function ProfileErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <EmptyState
        icon={<AlertCircle className="h-6 w-6" />}
        title="Unable to load profile"
        description="Something went wrong while loading your profile information. Please try again."
        action={{ label: 'Retry', onClick: onRetry }}
      />
    </div>
  )
}

export function ClientProfilePage() {
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading] = useState(false)
  const [hasError] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      toast.success('Profile updated successfully!', {
        icon: <CheckCircle className="h-4 w-4 text-success" />,
      })
    } catch {
      toast.error('Failed to update profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <ProfileSkeleton />
  }

  if (hasError) {
    return <ProfileErrorState onRetry={() => window.location.reload()} />
  }

  return (
    <div className="mx-auto max-w-3xl animate-fade-in space-y-6 p-4 sm:space-y-8 sm:p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal information and preferences.
        </p>
      </div>

      {/* Personal Information */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-base">Personal Information</CardTitle>
              <CardDescription>Update your name, email, and contact details.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <div className="group relative">
              <Avatar name={clientUser.name} size="lg" />
              <button
                type="button"
                className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label="Change profile photo"
              >
                <Camera className="h-5 w-5 text-white" />
              </button>
            </div>
            <div>
              <p className="font-semibold text-foreground">{clientUser.name}</p>
              <p className="text-sm text-muted-foreground">{clientUser.email}</p>
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="First Name"
              defaultValue="James"
              aria-label="First Name"
            />
            <Input
              label="Last Name"
              defaultValue="Park"
              aria-label="Last Name"
            />
          </div>

          {/* Email */}
          <Input
            label="Email Address"
            defaultValue={clientUser.email}
            type="email"
            aria-label="Email Address"
          />

          {/* Phone */}
          <Input
            label="Phone Number"
            defaultValue="+1 (503) 555-0142"
            type="tel"
            aria-label="Phone Number"
          />

          <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Last updated: Feb 15, 2026
            </p>
            <Button
              onClick={handleSave}
              isLoading={isSaving}
              className="gap-2"
            >
              {!isSaving && <Save className="h-4 w-4" />}
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-base">Notification Preferences</CardTitle>
              <CardDescription>Choose how you'd like to be notified.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { icon: Mail, label: 'Email notifications', description: 'Receive updates about decisions and approvals via email' },
              { icon: Smartphone, label: 'Push notifications', description: 'Get real-time alerts on your mobile device' },
              { icon: Bell, label: 'Weekly digest', description: 'Receive a weekly summary of project activity' },
            ].map((pref) => (
              <div
                key={pref.label}
                className="flex items-start gap-4 rounded-lg border border-border p-4 transition-colors duration-200 hover:bg-muted/50"
              >
                <div className="rounded-lg bg-muted p-2 text-muted-foreground">
                  <pref.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{pref.label}</p>
                  <p className="text-xs text-muted-foreground">{pref.description}</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="peer sr-only"
                    aria-label={`Toggle ${pref.label}`}
                  />
                  <div className="h-5 w-9 rounded-full bg-muted transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2" />
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-base">Security</CardTitle>
              <CardDescription>Manage your password and security settings.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-muted p-2 text-muted-foreground">
                  <Key className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Password</p>
                  <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Key className="h-3.5 w-3.5" />
                Change Password
              </Button>
            </div>
            <div className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-muted p-2 text-muted-foreground">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Shield className="h-3.5 w-3.5" />
                Enable 2FA
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
