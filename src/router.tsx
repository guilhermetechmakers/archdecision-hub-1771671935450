import { createBrowserRouter } from 'react-router-dom'

import { PublicLayout } from '@/layouts/PublicLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { ClientPortalLayout } from '@/layouts/ClientPortalLayout'

import { LandingPage } from '@/pages/landing/LandingPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { SignupPage } from '@/pages/auth/SignupPage'
import { VerifyEmailPage } from '@/pages/auth/VerifyEmailPage'
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { ProjectsListPage } from '@/pages/project/ProjectsListPage'
import { ProjectOverviewPage } from '@/pages/project/ProjectOverviewPage'
import { DecisionLogPage } from '@/pages/decisions/DecisionLogPage'
import { DecisionDetailPage } from '@/pages/decisions/DecisionDetailPage'
import { FilesPage } from '@/pages/files/FilesPage'
import { MessagesPage } from '@/pages/messages/MessagesPage'
import { MeetingsPage } from '@/pages/meetings/MeetingsPage'
import { TasksPage } from '@/pages/tasks/TasksPage'
import { TemplatesPage } from '@/pages/templates/TemplatesPage'
import { ReportsPage } from '@/pages/reports/ReportsPage'
import { UserProfilePage } from '@/pages/profile/UserProfilePage'
import { SettingsPage } from '@/pages/settings/SettingsPage'
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage'
import { HelpPage } from '@/pages/help/HelpPage'
import { CheckoutPage } from '@/pages/checkout/CheckoutPage'
import { ProjectArchivePage } from '@/pages/archive/ProjectArchivePage'
import { ClientPortalPage } from '@/pages/client-portal/ClientPortalPage'
import { ClientMessagesPage } from '@/pages/client-portal/ClientMessagesPage'
import { ClientMeetingsPage } from '@/pages/client-portal/ClientMeetingsPage'
import { ClientDownloadsPage } from '@/pages/client-portal/ClientDownloadsPage'
import { ClientProfilePage } from '@/pages/client-portal/ClientProfilePage'
import { PrivacyPage } from '@/pages/legal/PrivacyPage'
import { TermsPage } from '@/pages/legal/TermsPage'
import { CookiePage } from '@/pages/legal/CookiePage'
import { NotFoundPage } from '@/pages/errors/NotFoundPage'
import { ServerErrorPage } from '@/pages/errors/ServerErrorPage'

export const router = createBrowserRouter([
  // Public routes
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
    ],
  },

  // Auth routes
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/verify-email', element: <VerifyEmailPage /> },
      { path: '/reset-password', element: <ResetPasswordPage /> },
    ],
  },

  // Dashboard routes (protected)
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'projects', element: <ProjectsListPage /> },
      { path: 'projects/:projectId', element: <ProjectOverviewPage /> },
      { path: 'projects/:projectId/decisions/:decisionId', element: <DecisionDetailPage /> },
      { path: 'projects/:projectId/archive', element: <ProjectArchivePage /> },
      { path: 'decisions', element: <DecisionLogPage /> },
      { path: 'decisions/:decisionId', element: <DecisionDetailPage /> },
      { path: 'files', element: <FilesPage /> },
      { path: 'messages', element: <MessagesPage /> },
      { path: 'meetings', element: <MeetingsPage /> },
      { path: 'tasks', element: <TasksPage /> },
      { path: 'templates', element: <TemplatesPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'profile', element: <UserProfilePage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'admin', element: <AdminDashboardPage /> },
      { path: 'help', element: <HelpPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
    ],
  },

  // Client Portal routes
  {
    element: <ClientPortalLayout />,
    children: [
      { path: '/client', element: <ClientPortalPage /> },
      { path: '/client/messages', element: <ClientMessagesPage /> },
      { path: '/client/meetings', element: <ClientMeetingsPage /> },
      { path: '/client/decisions/:decisionId', element: <DecisionDetailPage /> },
      { path: '/client/downloads', element: <ClientDownloadsPage /> },
      { path: '/client/profile', element: <ClientProfilePage /> },
    ],
  },

  // Standalone decision detail route
  {
    path: '/decision-detail',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DecisionDetailPage /> },
      { path: ':decisionId', element: <DecisionDetailPage /> },
    ],
  },

  // Legal pages (standalone)
  { path: '/privacy', element: <PrivacyPage /> },
  { path: '/terms', element: <TermsPage /> },
  { path: '/cookies', element: <CookiePage /> },

  // Error pages
  { path: '/500', element: <ServerErrorPage /> },
  { path: '*', element: <NotFoundPage /> },
])
