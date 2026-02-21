import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'
import { DropdownMenu, DropdownItem, DropdownSeparator } from '@/components/ui/dropdown-menu'
import { users } from '@/data/mock-data'
import {
  Building2, ClipboardCheck, MessageSquare, Calendar, Download,
  User, LogOut, Bell,
} from 'lucide-react'

const clientUser = users[3]!

const clientNavItems = [
  { path: '/client', icon: ClipboardCheck, label: 'Decisions', end: true },
  { path: '/client/messages', icon: MessageSquare, label: 'Messages' },
  { path: '/client/meetings', icon: Calendar, label: 'Meetings' },
  { path: '/client/downloads', icon: Download, label: 'Downloads' },
]

export function ClientPortalLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string, end?: boolean) => {
    if (end) return location.pathname === path
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/client" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <span className="text-sm font-bold">ArchDecision Hub</span>
              <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">Client Portal</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 sm:flex">
            {clientNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive(item.path, item.end)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="relative rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">2</span>
            </button>
            <DropdownMenu
              trigger={
                <button className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-accent transition-colors">
                  <Avatar name={clientUser.name} size="sm" />
                </button>
              }
            >
              <div className="px-3 py-2">
                <p className="text-sm font-medium">{clientUser.name}</p>
                <p className="text-xs text-muted-foreground">{clientUser.email}</p>
              </div>
              <DropdownSeparator />
              <DropdownItem onClick={() => navigate('/client/profile')}>
                <User className="h-4 w-4" /> Profile
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem onClick={() => navigate('/login')} destructive>
                <LogOut className="h-4 w-4" /> Sign out
              </DropdownItem>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile bottom nav */}
        <nav className="flex border-t border-border sm:hidden">
          {clientNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 py-2 text-xs font-medium transition-colors',
                isActive(item.path, item.end)
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
