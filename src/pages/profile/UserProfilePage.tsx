import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { currentUser } from '@/data/mock-data'
import { toast } from 'sonner'
import { Shield, Bell, Link2, Monitor, Smartphone, LogOut } from 'lucide-react'

export function UserProfilePage() {
  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar name={currentUser.name} size="lg" />
                <div>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">First Name</label>
                  <Input defaultValue="Sarah" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Last Name</label>
                  <Input defaultValue="Chen" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Email</label>
                <Input defaultValue={currentUser.email} type="email" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Role</label>
                <Input defaultValue="Project Manager" disabled />
              </div>
              <Button onClick={() => toast.success('Profile updated!')}>Save Changes</Button>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="h-4 w-4" /> Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Decision approvals and rejections', email: true, push: true },
                { label: 'New comments on decisions', email: true, push: false },
                { label: 'File uploads and updates', email: false, push: true },
                { label: 'Meeting reminders', email: true, push: true },
                { label: 'Weekly project updates', email: true, push: false },
                { label: 'Task assignments', email: true, push: true },
              ].map((pref) => (
                <div key={pref.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm">{pref.label}</span>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <input type="checkbox" defaultChecked={pref.email} className="rounded" /> Email
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <input type="checkbox" defaultChecked={pref.push} className="rounded" /> Push
                    </label>
                  </div>
                </div>
              ))}
              <Button onClick={() => toast.success('Preferences saved!')}>Save Preferences</Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-4 w-4" /> Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Password</p>
                <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
                <Button variant="outline" size="sm" className="mt-2">Change Password</Button>
              </div>
              <div>
                <p className="text-sm font-medium">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                <Button variant="outline" size="sm" className="mt-2">Enable 2FA</Button>
              </div>
            </CardContent>
          </Card>

          {/* Active Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Active Sessions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                <Monitor className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Chrome on macOS</p>
                  <p className="text-xs text-muted-foreground">Portland, OR &middot; Current</p>
                </div>
                <Badge variant="success" className="text-[10px]">Active</Badge>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Safari on iPhone</p>
                  <p className="text-xs text-muted-foreground">Portland, OR &middot; 2 hours ago</p>
                </div>
                <Button variant="ghost" size="sm" className="text-xs text-destructive">
                  <LogOut className="h-3 w-3 mr-1" /> Revoke
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Linked Accounts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Link2 className="h-4 w-4" /> Linked Accounts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Google</span>
                <Badge variant="success" className="text-[10px]">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Microsoft</span>
                <Button variant="outline" size="sm" className="text-xs">Connect</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
