import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabContent, useTabState } from '@/components/ui/tabs'
import { Avatar } from '@/components/ui/avatar'
import { EmptyState } from '@/components/ui/empty-state'
import { users } from '@/data/mock-data'
import { toast } from 'sonner'
import {
  Building2, Users, Shield, Puzzle, Palette,
  Plus, Edit, UserPlus, Link2,
} from 'lucide-react'

const settingsTabs = [
  { id: 'firm', label: 'Firm Settings', icon: <Building2 className="h-4 w-4" /> },
  { id: 'roles', label: 'Roles & Permissions', icon: <Shield className="h-4 w-4" /> },
  { id: 'members', label: 'Team Members', icon: <Users className="h-4 w-4" /> },
  { id: 'integrations', label: 'Integrations', icon: <Puzzle className="h-4 w-4" /> },
  { id: 'branding', label: 'Branding', icon: <Palette className="h-4 w-4" /> },
]

const roles = [
  { name: 'Admin', description: 'Full access to all features and settings', members: 1 },
  { name: 'Project Manager', description: 'Manage projects, decisions, and team assignments', members: 2 },
  { name: 'Designer', description: 'Create and edit decisions, upload files', members: 3 },
  { name: 'Spec Writer', description: 'Create specifications and decision options', members: 1 },
  { name: 'Client', description: 'View and approve decisions, limited access', members: 2 },
  { name: 'Contractor', description: 'View assigned files and respond to RFIs', members: 1 },
]

const integrations = [
  { name: 'Google Workspace', description: 'Calendar, Drive, and SSO', connected: true, icon: '🔗' },
  { name: 'Microsoft 365', description: 'Outlook, OneDrive, and SSO', connected: false, icon: '🔗' },
  { name: 'Stripe', description: 'Payment processing and billing', connected: true, icon: '💳' },
  { name: 'Slack', description: 'Team notifications and updates', connected: false, icon: '💬' },
  { name: 'Autodesk BIM 360', description: 'File sync and model coordination', connected: false, icon: '🏗️' },
]

function getCssVariableHex(varName: string): string {
  if (typeof window === 'undefined') return ''
  const rgb = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
  if (!rgb) return ''
  const parts = rgb.split(' ').map(Number)
  if (parts.length !== 3) return ''
  return '#' + parts.map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase()
}

export function SettingsPage() {
  const { activeTab, setActiveTab } = useTabState('firm')
  const [brandColor, setBrandColor] = useState(() => getCssVariableHex('--primary') || '#2563EB')

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your firm and project configuration</p>
      </div>

      <Tabs tabs={settingsTabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <TabContent>
        {activeTab === 'firm' && (
          <div className="max-w-2xl space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Firm Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Firm Name</label>
                  <Input defaultValue="Chen & Associates Architecture" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Phone</label>
                    <Input defaultValue="+1 (503) 555-0100" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Website</label>
                    <Input defaultValue="https://chenarchitects.com" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Address</label>
                  <Input defaultValue="123 Design District, Portland, OR 97201" />
                </div>
                <Button onClick={() => toast.success('Settings saved!')}>Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-base">Billing</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium">Professional Plan</p>
                    <p className="text-sm text-muted-foreground">$129/month &middot; 15 team members</p>
                  </div>
                  <Button variant="outline" size="sm">Manage Plan</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'roles' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Create Role</Button>
            </div>
            {roles.length === 0 ? (
              <EmptyState
                icon={<Shield className="h-6 w-6" />}
                title="No roles defined"
                description="Create custom roles to control what team members and clients can access across your projects."
                action={{
                  label: 'Create First Role',
                  onClick: () => toast.info('Role creation coming soon'),
                }}
              />
            ) : (
              <div className="space-y-3 animate-stagger">
                {roles.map((role) => (
                  <Card key={role.name} className="transition-shadow duration-200 hover:shadow-card-hover">
                    <CardContent className="flex items-center gap-4 p-4">
                      <Shield className="h-5 w-5 text-muted-foreground shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{role.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{role.description}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs shrink-0 hidden sm:inline-flex">{role.members} members</Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'members' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Invite Member</Button>
            </div>
            {users.length === 0 ? (
              <EmptyState
                icon={<UserPlus className="h-6 w-6" />}
                title="No team members yet"
                description="Invite architects, designers, and clients to collaborate on your projects."
                action={{
                  label: 'Invite First Member',
                  onClick: () => toast.info('Member invitation coming soon'),
                }}
              />
            ) : (
              <div className="space-y-3 animate-stagger">
                {users.map((user) => (
                  <Card key={user.id} className="transition-shadow duration-200 hover:shadow-card-hover">
                    <CardContent className="flex items-center gap-4 p-4">
                      <Avatar name={user.name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{user.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <Badge variant="outline" className="capitalize text-xs shrink-0 hidden sm:inline-flex">{user.role.replace('-', ' ')}</Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'integrations' && (
          <>
            {integrations.length === 0 ? (
              <EmptyState
                icon={<Link2 className="h-6 w-6" />}
                title="No integrations available"
                description="Connect third-party services like Google Workspace, Stripe, and Slack to streamline your workflow."
                action={{
                  label: 'Browse Integrations',
                  onClick: () => toast.info('Integration marketplace coming soon'),
                }}
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 animate-stagger">
                {integrations.map((integration) => (
                  <Card key={integration.name} className="transition-shadow duration-200 hover:shadow-card-hover">
                    <CardContent className="flex items-center gap-4 p-5">
                      <span className="text-2xl">{integration.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{integration.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{integration.description}</p>
                      </div>
                      {integration.connected ? (
                        <Badge variant="success" className="text-xs shrink-0">Connected</Badge>
                      ) : (
                        <Button variant="outline" size="sm" className="shrink-0">Connect</Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'branding' && (
          <div className="max-w-2xl space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Brand Customization</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-border">
                      <Building2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button variant="outline" size="sm">Upload Logo</Button>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Primary Color</label>
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-lg border border-border"
                      style={{ backgroundColor: `rgb(var(--primary))` }}
                    />
                    <Input
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      className="w-32"
                      placeholder="#2563EB"
                    />
                  </div>
                </div>
                <Button onClick={() => toast.success('Branding updated!')}>Save Branding</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </TabContent>
    </div>
  )
}
