import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { users } from '@/data/mock-data'
import { toast } from 'sonner'

const clientUser = users[3]!

export function ClientProfilePage() {
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar name={clientUser.name} size="lg" />
            <div>
              <p className="font-semibold">{clientUser.name}</p>
              <p className="text-sm text-muted-foreground">{clientUser.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">First Name</label>
              <Input defaultValue="James" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Last Name</label>
              <Input defaultValue="Park" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <Input defaultValue={clientUser.email} type="email" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Phone</label>
            <Input defaultValue="+1 (503) 555-0142" type="tel" />
          </div>
          <Button onClick={() => toast.success('Profile updated!')}>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )
}
