import { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'
import { DropdownMenu, DropdownItem, DropdownSeparator } from '@/components/ui/dropdown-menu'
import { Tooltip } from '@/components/ui/tooltip'
import { currentUser, notifications } from '@/data/mock-data'
import {
  LayoutDashboard, FolderKanban, ClipboardCheck, FileText, MessageSquare,
  Calendar, ListTodo, LayoutTemplate, BarChart3, Settings, HelpCircle,
  Bell, Search, ChevronLeft, ChevronRight, LogOut, User, Menu,
  Building2,
} from 'lucide-react'

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { path: '/dashboard/projects', icon: FolderKanban, label: 'Projects' },
  { path: '/dashboard/decisions', icon: ClipboardCheck, label: 'Decisions' },
  { path: '/dashboard/files', icon: FileText, label: 'Files' },
  { path: '/dashboard/messages', icon: MessageSquare, label: 'Messages' },
  { path: '/dashboard/meetings', icon: Calendar, label: 'Meetings' },
  { path: '/dashboard/tasks', icon: ListTodo, label: 'Tasks & RFIs' },
  { path: '/dashboard/templates', icon: LayoutTemplate, label: 'Templates' },
  { path: '/dashboard/reports', icon: BarChart3, label: 'Reports' },
]

const bottomNavItems = [
  { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
  { path: '/dashboard/help', icon: HelpCircle, label: 'Help' },
]

export function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const unreadCount = notifications.filter((n) => !n.read).length

  const isActive = (path: string, end?: boolean) => {
    if (end) return location.pathname === path
    return location.pathname.startsWith(path)
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className={cn('flex items-center gap-3 border-b border-border px-4 py-4', isCollapsed && 'justify-center px-2')}>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Building2 className="h-5 w-5" />
        </div>
        {!isCollapsed && (
          <div className="flex-1 overflow-hidden">
            <h2 className="truncate text-sm font-bold">ArchDecision</h2>
            <p className="truncate text-xs text-muted-foreground">Hub</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
        {navItems.map((item) => {
          const active = isActive(item.path, item.end)
          const NavLink = (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                isCollapsed && 'justify-center px-2'
              )}
            >
              <item.icon className={cn('h-5 w-5 shrink-0', active && 'text-primary')} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          )

          if (isCollapsed) {
            return (
              <Tooltip key={item.path} content={item.label} side="right">
                {NavLink}
              </Tooltip>
            )
          }
          return NavLink
        })}
      </nav>

      <div className="space-y-1 border-t border-border px-2 py-4">
        {bottomNavItems.map((item) => {
          const active = isActive(item.path)
          const NavLink = (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                isCollapsed && 'justify-center px-2'
              )}
            >
              <item.icon className={cn('h-5 w-5 shrink-0', active && 'text-primary')} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          )

          if (isCollapsed) {
            return (
              <Tooltip key={item.path} content={item.label} side="right">
                {NavLink}
              </Tooltip>
            )
          }
          return NavLink
        })}
      </div>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col border-r border-border bg-sidebar transition-all duration-300',
          isCollapsed ? 'w-[68px]' : 'w-64'
        )}
      >
        <SidebarContent />
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center border-t border-border py-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar shadow-elevated animate-slide-in-left">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects, decisions, files..."
                className="h-9 w-64 rounded-lg border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors lg:w-80"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu
              trigger={
                <button className="relative rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                      {unreadCount}
                    </span>
                  )}
                </button>
              }
              className="w-80"
            >
              <div className="px-3 py-2">
                <h3 className="text-sm font-semibold">Notifications</h3>
              </div>
              <DropdownSeparator />
              {notifications.slice(0, 4).map((n) => (
                <DropdownItem key={n.id} onClick={() => n.link && navigate(n.link)}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{n.title}</p>
                      {!n.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{n.message}</p>
                  </div>
                </DropdownItem>
              ))}
            </DropdownMenu>

            <DropdownMenu
              trigger={
                <button className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-accent transition-colors">
                  <Avatar name={currentUser.name} size="sm" />
                  <span className="hidden text-sm font-medium md:block">{currentUser.name}</span>
                </button>
              }
            >
              <div className="px-3 py-2">
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser.email}</p>
              </div>
              <DropdownSeparator />
              <DropdownItem onClick={() => navigate('/dashboard/profile')}>
                <User className="h-4 w-4" /> Profile
              </DropdownItem>
              <DropdownItem onClick={() => navigate('/dashboard/settings')}>
                <Settings className="h-4 w-4" /> Settings
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem onClick={() => navigate('/login')} destructive>
                <LogOut className="h-4 w-4" /> Sign out
              </DropdownItem>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
