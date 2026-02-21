export type DecisionStatus = 'draft' | 'published' | 'pending' | 'approved' | 'rejected' | 'archived'
export type ProjectPhase = 'kickoff' | 'schematic' | 'design-development' | 'construction-docs' | 'bidding' | 'construction' | 'closeout'
export type UserRole = 'admin' | 'project-manager' | 'designer' | 'spec-writer' | 'client' | 'contractor' | 'viewer'
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done'
export type Priority = 'low' | 'medium' | 'high' | 'urgent'
export type MeetingStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
export type FileType = 'image' | 'pdf' | 'dwg' | 'revit' | 'sketchup' | 'document' | 'spreadsheet' | 'other'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  firm?: string
}

export interface Project {
  id: string
  name: string
  client: string
  phase: ProjectPhase
  status: 'active' | 'archived' | 'on-hold'
  progress: number
  startDate: string
  endDate: string
  team: User[]
  description: string
  thumbnail?: string
}

export interface DecisionOption {
  id: string
  title: string
  description: string
  image?: string
  costImpact: number
  pros: string[]
  cons: string[]
  isRecommended: boolean
}

export interface Decision {
  id: string
  projectId: string
  title: string
  description: string
  status: DecisionStatus
  phase: ProjectPhase
  category: string
  options: DecisionOption[]
  selectedOptionId?: string
  createdBy: User
  createdAt: string
  updatedAt: string
  dueDate?: string
  version: number
  comments: Comment[]
}

export interface Comment {
  id: string
  userId: string
  userName: string
  userRole: UserRole
  userAvatar?: string
  content: string
  createdAt: string
  attachments?: { name: string; url: string; type: string }[]
  mentions?: string[]
}

export interface AuditEntry {
  id: string
  action: 'created' | 'updated' | 'published' | 'approved' | 'rejected' | 'signed' | 'commented' | 'version_created' | 'option_added' | 'escalated'
  actor: User
  timestamp: string
  ip?: string
  details?: string
  metadata?: Record<string, string>
}

export interface VersionSnapshot {
  id: string
  version: number
  createdAt: string
  createdBy: User
  changesSummary: string
  optionCount: number
  status: DecisionStatus
  pdfUrl?: string
}

export interface ESignature {
  id: string
  signerName: string
  signerEmail: string
  signedAt: string
  ip: string
  signatureDataUrl?: string
  decisionId: string
  optionId: string
  hash: string
}

export interface ProjectFile {
  id: string
  name: string
  type: FileType
  size: number
  version: number
  uploadedBy: User
  uploadedAt: string
  folder: string
  url?: string
}

export interface Message {
  id: string
  threadId: string
  content: string
  sender: User
  createdAt: string
  contextType?: 'decision' | 'file' | 'task' | 'meeting'
  contextId?: string
  attachments?: { name: string; url: string }[]
}

export interface MessageThread {
  id: string
  subject: string
  projectId: string
  participants: User[]
  lastMessage: Message
  unreadCount: number
  contextType?: 'decision' | 'file' | 'task' | 'meeting'
  contextId?: string
}

export interface Meeting {
  id: string
  title: string
  projectId: string
  date: string
  time: string
  duration: number
  status: MeetingStatus
  attendees: User[]
  agendaItems: AgendaItem[]
  notes?: string
  actionItems: ActionItem[]
}

export interface AgendaItem {
  id: string
  title: string
  duration: number
  presenter?: string
}

export interface ActionItem {
  id: string
  title: string
  assignee: User
  dueDate: string
  completed: boolean
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: Priority
  assignee: User
  projectId: string
  dueDate: string
  tags: string[]
  isRfi: boolean
}

export interface Template {
  id: string
  name: string
  description: string
  category: string
  phases: { name: string; duration: number }[]
  decisions: number
  tasks: number
  usageCount: number
  createdAt: string
}

export interface KpiMetric {
  label: string
  value: string | number
  change: number
  trend: 'up' | 'down' | 'neutral'
  icon: string
}

export interface ActivityItem {
  id: string
  type: 'decision' | 'file' | 'message' | 'meeting' | 'task' | 'approval'
  title: string
  description: string
  user: User
  timestamp: string
  projectName?: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
  link?: string
}
