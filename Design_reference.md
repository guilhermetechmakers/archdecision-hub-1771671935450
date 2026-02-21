# Modern Design Best Practices

## Philosophy

Create unique, memorable experiences while maintaining consistency through modern design principles. Every project should feel distinct yet professional, innovative yet intuitive.

---

## Landing Pages & Marketing Sites

### Hero Sections
**Go beyond static backgrounds:**
- Animated gradients with subtle movement
- Particle systems or geometric shapes floating
- Interactive canvas backgrounds (Three.js, WebGL)
- Video backgrounds with proper fallbacks
- Parallax scrolling effects
- Gradient mesh animations
- Morphing blob animations


### Layout Patterns
**Use modern grid systems:**
- Bento grids (asymmetric card layouts)
- Masonry layouts for varied content
- Feature sections with diagonal cuts or curves
- Overlapping elements with proper z-index
- Split-screen designs with scroll-triggered reveals

**Avoid:** Traditional 3-column equal grids

### Scroll Animations
**Engage users as they scroll:**
- Fade-in and slide-up animations for sections
- Scroll-triggered parallax effects
- Progress indicators for long pages
- Sticky elements that transform on scroll
- Horizontal scroll sections for portfolios
- Text reveal animations (word by word, letter by letter)
- Number counters animating into view

**Avoid:** Static pages with no scroll interaction

### Call-to-Action Areas
**Make CTAs impossible to miss:**
- Gradient buttons with hover effects
- Floating action buttons with micro-interactions
- Animated borders or glowing effects
- Scale/lift on hover
- Interactive elements that respond to mouse position
- Pulsing indicators for primary actions

---

## Dashboard Applications

### Layout Structure
**Always use collapsible side navigation:**
- Sidebar that can collapse to icons only
- Smooth transition animations between states
- Persistent navigation state (remember user preference)
- Mobile: drawer that slides in/out
- Desktop: sidebar with expand/collapse toggle
- Icons visible even when collapsed

**Structure:**
```
/dashboard (layout wrapper with sidebar)
  /dashboard/overview
  /dashboard/analytics
  /dashboard/settings
  /dashboard/users
  /dashboard/projects
```

All dashboard pages should be nested inside the dashboard layout, not separate routes.

### Data Tables
**Modern table design:**
- Sticky headers on scroll
- Row hover states with subtle elevation
- Sortable columns with clear indicators
- Pagination with items-per-page control
- Search/filter with instant feedback
- Selection checkboxes with bulk actions
- Responsive: cards on mobile, table on desktop
- Loading skeletons, not spinners
- Empty states with illustrations or helpful text

**Use modern table libraries:**
- TanStack Table (React Table v8)
- AG Grid for complex data
- Data Grid from MUI (if using MUI)

### Charts & Visualizations
**Use the latest charting libraries:**
- Recharts (for React, simple charts)
- Chart.js v4 (versatile, well-maintained)
- Apache ECharts (advanced, interactive)
- D3.js (custom, complex visualizations)
- Tremor (for dashboards, built on Recharts)

**Chart best practices:**
- Animated transitions when data changes
- Interactive tooltips with detailed info
- Responsive sizing
- Color scheme matching design system
- Legend placement that doesn't obstruct data
- Loading states while fetching data

### Dashboard Cards
**Metric cards should stand out:**
- Gradient backgrounds or colored accents
- Trend indicators (↑ ↓ with color coding)
- Sparkline charts for historical data
- Hover effects revealing more detail
- Icon representing the metric
- Comparison to previous period

---

## Color & Visual Design

### Color Palettes
**Create depth with gradients:**
- Primary gradient (not just solid primary color)
- Subtle background gradients
- Gradient text for headings
- Gradient borders on cards
- Elevated surfaces for depth

**Color usage:**
- 60-30-10 rule (dominant, secondary, accent)
- Consistent semantic colors (success, warning, error)
- Accessible contrast ratios (WCAG AA minimum)

### Typography
**Create hierarchy through contrast:**
- Large, bold headings (48-72px for heroes)
- Clear size differences between levels
- Variable font weights (300, 400, 600, 700)
- Letter spacing for small caps
- Line height 1.5-1.7 for body text
- Inter, Poppins, or DM Sans for modern feel

### Shadows & Depth
**Layer UI elements:**
- Multi-layer shadows for realistic depth
- Colored shadows matching element color
- Elevated states on hover
- Neumorphism for special elements (sparingly)

---

## Interactions & Micro-animations

### Button Interactions
**Every button should react:**
- Scale slightly on hover (1.02-1.05)
- Lift with shadow on hover
- Ripple effect on click
- Loading state with spinner or progress
- Disabled state clearly visible
- Success state with checkmark animation

### Card Interactions
**Make cards feel alive:**
- Lift on hover with increased shadow
- Subtle border glow on hover
- Tilt effect following mouse (3D transform)
- Smooth transitions (200-300ms)
- Click feedback for interactive cards

### Form Interactions
**Guide users through forms:**
- Input focus states with border color change
- Floating labels that animate up
- Real-time validation with inline messages
- Success checkmarks for valid inputs
- Error states with shake animation
- Password strength indicators
- Character count for text areas

### Page Transitions
**Smooth between views:**
- Fade + slide for page changes
- Skeleton loaders during data fetch
- Optimistic UI updates
- Stagger animations for lists
- Route transition animations

---

## Mobile Responsiveness

### Mobile-First Approach
**Design for mobile, enhance for desktop:**
- Touch targets minimum 44x44px
- Generous padding and spacing
- Sticky bottom navigation on mobile
- Collapsible sections for long content
- Swipeable cards and galleries
- Pull-to-refresh where appropriate

### Responsive Patterns
**Adapt layouts intelligently:**
- Hamburger menu → full nav bar
- Card grid → stack on mobile
- Sidebar → drawer
- Multi-column → single column
- Data tables → card list
- Hide/show elements based on viewport

---

## Loading & Empty States

### Loading States
**Never leave users wondering:**
- Skeleton screens matching content layout
- Progress bars for known durations
- Animated placeholders
- Spinners only for short waits (<3s)
- Stagger loading for multiple elements
- Shimmer effects on skeletons

### Empty States
**Make empty states helpful:**
- Illustrations or icons
- Helpful copy explaining why it's empty
- Clear CTA to add first item
- Examples or suggestions
- No "no data" text alone

---

## Unique Elements to Stand Out

### Distinctive Features
**Add personality:**
- Custom cursor effects on landing pages
- Animated page numbers or section indicators
- Unusual hover effects (magnification, distortion)
- Custom scrollbars
- Glassmorphism for overlays
- Animated SVG icons
- Typewriter effects for hero text
- Confetti or celebration animations for actions

### Interactive Elements
**Engage users:**
- Drag-and-drop interfaces
- Sliders and range controls
- Toggle switches with animations
- Progress steps with animations
- Expandable/collapsible sections
- Tabs with slide indicators
- Image comparison sliders
- Interactive demos or playgrounds

---

## Consistency Rules

### Maintain Consistency
**What should stay consistent:**
- Spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)
- Border radius values
- Animation timing (200ms, 300ms, 500ms)
- Color system (primary, secondary, accent, neutrals)
- Typography scale
- Icon style (outline vs filled)
- Button styles across the app
- Form element styles

### What Can Vary
**Project-specific customization:**
- Color palette (different colors, same system)
- Layout creativity (grids, asymmetry)
- Illustration style
- Animation personality
- Feature-specific interactions
- Hero section design
- Card styling variations
- Background patterns or textures

---

## Technical Excellence

### Performance
- Optimize images (WebP, lazy loading)
- Code splitting for faster loads
- Debounce search inputs
- Virtualize long lists
- Minimize re-renders
- Use proper memoization

### Accessibility
- Keyboard navigation throughout
- ARIA labels where needed
- Focus indicators visible
- Screen reader friendly
- Sufficient color contrast
- Respect reduced motion preferences

---

## Key Principles

1. **Be Bold** - Don't be afraid to try unique layouts and interactions
2. **Be Consistent** - Use the same patterns for similar functions
3. **Be Responsive** - Design works beautifully on all devices
4. **Be Fast** - Animations are smooth, loading is quick
5. **Be Accessible** - Everyone can use what you build
6. **Be Modern** - Use current design trends and technologies
7. **Be Unique** - Each project should have its own personality
8. **Be Intuitive** - Users shouldn't need instructions


---

# Project-Specific Customizations

**IMPORTANT: This section contains the specific design requirements for THIS project. The guidelines above are universal best practices - these customizations below take precedence for project-specific decisions.**

## User Design Requirements

# ArchDecision Hub - Development Blueprint

## Project Concept
ArchDecision Hub is a specialized project management and client decision platform for architecture firms. It centralizes the project lifecycle from kickoff to handover, combining a phase-based timeline with a structured Decision Log that presents comparison cards (images, PDFs, cost impacts, recommendations) for client review and approval. The platform includes contextual messaging tied to project artifacts, document/version control, automated weekly updates, meeting agendas/notes, lightweight e-signatures, templates for recurring workflows, role-based permissions, and basic reporting. The vision is to provide a single source of truth for decisions and deliverables, eliminate fragmented email threads, reduce scope disputes, and speed project delivery through clear auditability and client-friendly decision flows.

AI App Description: ArchDecision Hub leverages structured workflows, immutable audit trails, automated communications, and visual decision cards to help architecture teams and clients make, track, and prove design choices throughout project phases.

## Problem Statement
- Core problems:
  - Decisions, approvals, and documentation are scattered across email, files, and chat, causing miscommunication and disputes.
  - Clients struggle to understand choices due to technical presentation formats, delaying approvals.
  - Firms face scope creep and “I never approved that” claims without clear, auditable records.
  - Repeated project setup and templating is manual and inconsistent across similar project types.
  - Large drawing files and versioning create storage and retrieval friction.
- Who experiences these problems:
  - Project Architects, Project Managers, Designers, Spec Writers, Clients/Owners, Contractors, Firm Admins/Finance.
- Why these problems matter:
  - Delays in approvals increase project timelines and cost.
  - Disputes and unclear approvals risk revenue loss and damage firm reputation.
  - Inefficient workflows increase administrative overhead and reduce billable design time.
- Current state/gaps:
  - Generic PM tools lack visual decision workflows and immutable audit trails tailored to architecture processes.
  - No centralized client-facing portal optimized for one-click approvals and simplified review.
  - Limited built-in lightweight e-sign and exportable proof-of-choice artifacts.

## Solution
- How application addresses problems:
  - Provides a Decision Log with visual comparison cards, cost impacts, and recommendations for client-friendly approvals.
  - Captures immutable audit trails and versioned snapshots to prove who chose what and when.
  - Contextual messaging attaches conversations to decisions, files, tasks, and meetings to replace scattered emails.
  - Phase-based templates and lifecycle engine instantiate projects quickly with predefined milestones and decisions.
  - Document repository with versioning, previews, and check-in/out handles large design files securely.
  - Automated weekly updates and meeting summaries keep clients informed and reduce reply chains.
- Approach and methodology:
  - Backend services for RBAC, template engine, decision/version storage, audit logging, file storage, and background jobs.
  - Modern frontend SPA with modular pages matching user roles (firm staff vs client portal).
  - Real-time pub/sub for messaging, and scheduled jobs for notifications and exports.
  - Integration-first design (Stripe, SSO, S3, search engine, PDF generation).
- Key differentiators:
  - Architect-focused workflows (phase templates, decision comparison UI).
  - Visual client-facing decision flow with minimal friction approvals and built-in e-sign.
  - Immutable audit and exportable proof-of-choice packages.
- Value creation:
  - Reduced approval cycle times, fewer disputes, faster project delivery, repeatable templates, and improved client satisfaction.

## Requirements

### 1. Pages (UI Screens)
List of pages with purpose, key sections/components, and contribution:

- Landing Page (Public marketing)
  - Purpose: Convert visitors to sign-ups or demos.
  - Sections: Hero (headline, CTAs, hero media), Feature highlights, How it works (3-step workflow), Templates & use cases, Pricing, Testimonials/logos, Footer.
  - Contribution: Attracts firms, communicates value props, drives trials and demos.

- Login / Signup
  - Purpose: Authentication entry and onboarding start.
  - Components: Login form, Signup form (firm info, plan), SSO buttons, Magic link, password rules, links to legal.
  - Contribution: Secure account creation and SSO onboarding.

- Email Verification
  - Purpose: Confirm email ownership post-signup.
  - Components: Verification message, resend with cooldown, change email, support link.
  - Contribution: Ensures valid user identities and security.

- Password Reset
  - Purpose: Recover access securely.
  - Components: Request form, confirmation notice, tokenized reset form, strength meter.
  - Contribution: Secure account recovery and policy enforcement.

- Dashboard
  - Purpose: User-specific landing highlighting active work.
  - Components: Top nav (search, notifications, user menu), KPI tiles, projects list, activity feed, quick actions, global search.
  - Contribution: Immediate visibility into pending approvals and hotspots.

- Project Overview
  - Purpose: Central project hub.
  - Components: Project header, phase timeline (Gantt-like), team panel, quick nav tabs (Decisions, Files, Messages, Meetings, Tasks, Reports), project summary card.
  - Contribution: Single-location project control and navigation to artifacts.

- Decision Log (List)
  - Purpose: Browse and manage all project decisions.
  - Components: Filter bar, decision cards list, bulk actions, create decision CTA.
  - Contribution: Organizes decision pipeline and prioritizes approvals.

- Decision Detail
  - Purpose: Present and finalize a single decision.
  - Components: Header (status, version), comparison panel (side-by-side options), recommendation card, cost impact, attachments, comment thread, client actions, version history, audit trail.
  - Contribution: Client-facing decision UI with auditability and e-sign.

- Files & Drawings
  - Purpose: Document repository for deliverables and drawings.
  - Components: Folder tree, file list, preview pane, upload controls, version history, permissions modal.
  - Contribution: Secure storage, preview, and version control for large files.

- Messages (Contextual)
  - Purpose: Replace scattered emails with contextual threads.
  - Components: Thread list, message panel, composer (rich text, attachments), filters by context, notifications badge.
  - Contribution: Centralized project communication linked to artifacts.

- Meetings & Agendas
  - Purpose: Prepare and record meetings with action tracking.
  - Components: Upcoming meetings list, agenda builder, notes editor, action item tracker, auto-email summary.
  - Contribution: Structured meetings, clear action ownership, reduced follow-ups.

- Tasks & RFIs
  - Purpose: Task and RFI tracking.
  - Components: Kanban board, task detail modal, RFI workflow, filters/views.
  - Contribution: Task management tied to decisions and deliverables.

- Templates Library
  - Purpose: Manage reusable project templates and decision templates.
  - Components: Template list, editor, apply modal, share/clone.
  - Contribution: Faster project setup and standardization.

- Reports & Analytics
  - Purpose: Firm and project reporting.
  - Components: Report selector, interactive charts, export controls, filters.
  - Contribution: Monitor approvals, delays, RFIs, and KPIs.

- Client Portal (Simplified)
  - Purpose: Client-facing simplified UX for approvals and status.
  - Components: Simplified nav (Decisions, Messages, Meetings, Downloads), pending approvals card, weekly update panel, profile/contact info.
  - Contribution: Increases client engagement and reduces friction for approvals.

- User Profile
  - Purpose: User account and security settings.
  - Components: Personal info, notification prefs, security (2FA, sessions), linked accounts.
  - Contribution: User control over settings and security.

- Settings / Project Settings
  - Purpose: Firm and project configuration.
  - Components: Firm settings (branding, billing), roles & permissions editor, integrations, custom fields, audit exports.
  - Contribution: Administrative control and compliance.

- Admin Dashboard
  - Purpose: Firm-level administration.
  - Components: Usage metrics, user management, billing/invoices, system logs.
  - Contribution: Operational oversight and billing control.

- Help / Knowledge Base
  - Purpose: Self-serve documentation and support.
  - Components: Searchable KB, onboarding checklist, contact support form.
  - Contribution: Reduces support load and accelerates onboarding.

- Legal Pages (Privacy, Terms, Cookie)
  - Purpose: Compliance and legal disclosure.
  - Components: Full text pages, cookie consent.
  - Contribution: Legal compliance and trust.

- 404 Not Found
  - Purpose: Handle unknown routes gracefully.
  - Components: Friendly copy, search, quick links.
  - Contribution: UX continuity.

- 500 Server Error
  - Purpose: Surface server issues with reporting.
  - Components: Retry, report issue form, status page link.
  - Contribution: Error handling and support reporting.

- Checkout / Payment
  - Purpose: Manage subscriptions and payments.
  - Components: Plan selector, Stripe Elements payment form, invoice history.
  - Contribution: Monetization and subscription management.

- Project Archive (Handover)
  - Purpose: Finalize and export completed project artifacts.
  - Components: Archive summary, handover package download, audit logs, reopen admin control.
  - Contribution: Client handover and compliance.

### 2. Features
Core features with technical details and implementation notes:

- User Authentication
  - JWT access + refresh tokens, httpOnly cookies for web, secure storage for mobile.
  - SSO: OAuth2 (Google, Microsoft) + SAML for enterprise.
  - Magic link option, email verification tokens (expiry + resend cooldown).
  - Rate limiting and brute-force protections.
  - Session listing & revocation UI.
  - Contribution: Secure access and enterprise-ready login flows.

- Role-Based Access Control (RBAC)
  - DB role and permission tables, resource-level permissions.
  - Backend middleware and frontend guards enforce permissions.
  - Project-level overrides and inheritance, audit logs for permission changes.
  - Contribution: Granular security for client and contractor access.

- Project Lifecycle & Templates
  - Templates stored as JSON schema (phases, milestones, default decisions/tasks).
  - Engine to instantiate templates into projects; background job queue for heavy instantiation.
  - Editable project phases, rescheduling with dependency handling.
  - Template versioning and usage metrics.
  - Contribution: Rapid project setup and consistency.

- Decision Log & Comparison Cards
  - Normalized data model: decisions, options, versions, cost deltas, attachments.
  - File attachments via object storage; thumbnails generated on upload.
  - Immutable audit log recording actor, timestamp, IP, reason.
  - Approval workflow with states (draft → published → pending → approved/rejected) and escalation rules.
  - E-sign capture flow and signed PDF snapshot generator (Puppeteer/wkhtmltopdf).
  - Optimistic concurrency control for edits.
  - Contribution: Client-friendly decision-making and provable approvals.

- Contextual Messaging
  - Message threads linked to project objects, real-time updates via WebSocket/PubSub (Socket.IO/Pusher/AWS AppSync).
  - Rich text sanitization for safety; attachments stored in object storage.
  - Notification engine for email/in-app/push.
  - Search indexing of messages for retrieval.
  - Contribution: Replaces fragmented email threads with contextual communication.

- Document Management & Versioning
  - Object storage (S3/GCS) + CDN for file serving; DB metadata for file records and versions.
  - Resumable uploads (tus or S3 multipart), server-side virus scanning, preview generation (images/PDF/CAD thumbnails via integrations).
  - Check-in/check-out, version restore, permissions modal for granular access.
  - Contribution: Reliable storage and retrieval for large files and drawings.

- Meetings, Agendas & Notes
  - Meeting objects with agenda builder, linked decisions/tasks, attachable records, action item tracker.
  - Calendar integration (Google/Outlook) and ICS export.
  - Auto-email meeting summary and action item list.
  - Contribution: Structured collaboration and accountability.

- Reporting & Exports
  - Analytics datastore or OLAP store for aggregated metrics.
  - Prebuilt reports (pending approvals, approval times, RFIs) and custom report builder.
  - Background jobs for heavy exports (CSV/PDF), scheduled reporting with delivery via email/webhook.
  - Contribution: Operational insights and compliance exports.

- Notifications & Automated Weekly Update
  - Per-user preferences, multi-channel delivery, templated dynamic emails.
  - Scheduler for weekly update generation with delta detection (what changed, what's next, what we need).
  - Retry logic and rate limiting.
  - Contribution: Keeps clients informed and reduces ad-hoc updates.

- E-sign & Audit Export
  - Capture signer name, email, IP, timestamp; optional signature image.
  - Signed PDF generation combining decision snapshot + audit timeline; cryptographic hash storage for tamper evidence.
  - Optional third-party e-sign integration.
  - Contribution: Lightweight legally-relevant sign-off and exportable proof.

- Search & Filter
  - Full-text search integration (Elasticsearch/Algolia/Meili) with incremental indexing.
  - Access control-aware results, autocomplete, advanced filters (phase, status, tags).
  - Saved searches per user.
  - Contribution: Fast retrieval across projects and artifacts.

- File Upload & Large File Handling
  - Client-side chunking, resumable uploads, progress UI, server-side virus scan.
  - Storage lifecycle policies and CDN; background tasks for preview/thumbnail generation.
  - Contribution: Reliable handling of large design files.

- Data Export & Compliance
  - Handover ZIP/PDF pipeline bundling files and metadata; background job with notification on completion.
  - GDPR-compliant data export and deletion, retention settings, and access auditing.
  - Contribution: Compliance and client handover readiness.

### 3. User Journeys
Step-by-step flows for main user types:

- Firm Admin (Onboard firm & templates)
  1. Sign up or start trial via Landing → Signup (firm name, admin user).
  2. Verify email → complete firm profile and branding in Settings.
  3. Configure billing (Checkout/Payment via Stripe).
  4. Create roles & permissions in Settings.
  5. Upload or create Templates in Templates Library.
  6. Invite team members and provision seats (email invites/SSO).
  7. Monitor usage in Admin Dashboard and set retention/policies.

- Project Manager (Create & run project)
  1. Login → Dashboard → New Project (select template).
  2. Instantiate template (background job), review phases/milestones.
  3. Invite client and assign team roles for project.
  4. Publish initial Decision items and upload base drawings.
  5. Use Decision Log to create comparison cards; attach specs, costs, recommendations; publish.
  6. Track approvals on Dashboard/KPI tiles; send reminders or escalate.
  7. Use Messages for contextual communication tied to decisions or files.
  8. Schedule meetings with agendas; capture notes and action items.
  9. Manage tasks & RFIs as construction/admin proceeds.
  10. At project completion, generate handover package and archive project.

- Designer / Spec Writer (Propose decisions)
  1. Authenticate (email/SSO) → Open Project → Go to Decision Log → Create Decision.
  2. Add options with images/PDFs/specs and cost impacts; write recommendation.
  3. Attach annotated drawings and link related tasks.
  4. Publish for client review; respond to client questions in the Decision Detail comment thread.
  5. Update versions as changes occur; ensure audit notes for each revision.

- Client / Owner (Review & approve)
  1. Receive invitation email → Accept and verify → Login to Client Portal (simplified).
  2. View Pending Approvals card or weekly update email.
  3. Open Decision Detail → Compare options and cost impacts; ask question or request change via comments.
  4. Approve or e-sign a decision (one-click flow) or request changes.
  5. Download approved decision snapshot or receive signed PDF via email.
  6. Participate in meetings and view project timeline.

- Contractor / Consultant (Limited access)
  1. Accept invite → login → Access assigned projects with role-limited permissions.
  2. View linked drawings/files, respond to RFIs, and view decisions relevant to scope.
  3. Upload deliverables or comment on messages and tasks.

- Billing/Finance (Manage subscription & invoices)
  1. Firm Admin opens Checkout/Payment → view current plan and invoices.
  2. Update payment method or upgrade plan; download invoices and usage metrics.
  3. Assign billing contact and seat allocations.

## UI Guide
Apply the Visual Style and Design Philosophy below consistently. All components and pages must adhere to spacing, typography, and color system.

## Visual Style

### Color Palette:
- Primary background: #F9FAFB
- Card and content background: #FFFFFF
- Sidebar background: #F5F6F8
- Primary text: #111111
- Secondary text: #6B7280
- Icon and divider lines: #E5E7EB
- Accent/indicator: #2563EB
- Status tags: #34D399 (Published), #D1D5DB (Archived)
- Use color sparingly outside status/active elements.

### Typography & Layout:
- Font family: Sans-serif (Inter or SF Pro).
- Headings: Bold (700).
- Body: Regular (400).
- Clear font-size hierarchy and ample whitespace.
- Left-aligned content, consistent vertical rhythm.
- Tabs use all-caps/semi-bold and underline active state (blue #2563EB).

### Key Design Elements
Card Design:
- White cards, soft shadow, 8px radius, ultra-light border (#E5E7EB).
- Hover: subtle shadow intensify.
- Title bold, status tag above, description lighter.

Navigation:
- Left vertical sidebar, icon + label, active background #E5E7EB, bold label.
- Rounded corners on active/hover.

Data Visualization:
- Minimal charts, preferring flat lines/bars in blue/green.
- Legends/labels in gray (#6B7280).

Interactive Elements:
- Buttons rounded; primary blue (#2563EB), neutral gray.
- Form fields: subtle borders, rounded, clear focus states.
- Tabs: underline active, blue accent, micro-interactions for smooth transitions.

Design Philosophy:
- Modern, minimalist, clarity-first, approachable visuals, readable typography, reduced cognitive load, workflow-centric UX.

Implementation Notes:
- Enforce this design system consistently across components and pages.
- Provide a component library (React/Vue) implementing tokens for colors, spacing, typography, and accessible variants (hover/focus/disabled).
- Ensure high-contrast text and WCAG AA compliance for key UI.

## Instructions to AI Development Tool
1. Always reference Project Concept, Problem Statement, and Solution to understand the "why" behind requirements.
2. Build pages and features to directly solve the identified problems (decision clarity, auditability, centralized communication).
3. Verify feature completeness and alignment with the blueprint before marking implementation done.
4. Enforce the UI Guide and Visual Style exactly: color tokens, typography, spacing rules, and component behavior.
5. Maintain consistent architecture patterns: modular backend services, clear API contracts, RBAC enforcement on server and client, background job handling for heavy tasks, and secure storage practices.
6. Prioritize security and compliance: encrypted storage (at rest/in transit), audit logs, rate limiting, virus scanning, and GDPR-ready data export/deletion.
7. Provide seed/demo data and onboarding checklist for new firms.
8. Implement telemetry for KPIs: MAP, client adoption rate, approval turn-around time, scope dispute incidents, revenue retention, onboarding time.
9. Use integrations specified (Stripe, SendGrid, S3, SSO, real-time pub/sub, PDF rendering, virus scanning, search engine) and design for pluggable providers.
10. Deliver component library, API docs (OpenAPI), database schema, background job routes, and deployment/runbook as part of handoff.

---

## Implementation Notes

When implementing this project:

1. **Follow Universal Guidelines**: Use the design best practices documented above as your foundation
2. **Apply Project Customizations**: Implement the specific design requirements stated in the "User Design Requirements" section
3. **Priority Order**: Project-specific requirements override universal guidelines when there's a conflict
4. **Color System**: Extract and implement color values as CSS custom properties in RGB format
5. **Typography**: Define font families, sizes, and weights based on specifications
6. **Spacing**: Establish consistent spacing scale following the design system
7. **Components**: Style all Shadcn components to match the design aesthetic
8. **Animations**: Use Motion library for transitions matching the design personality
9. **Responsive Design**: Ensure mobile-first responsive implementation

## Implementation Checklist

- [ ] Review universal design guidelines above
- [ ] Extract project-specific color palette and define CSS variables
- [ ] Configure Tailwind theme with custom colors
- [ ] Set up typography system (fonts, sizes, weights)
- [ ] Define spacing and sizing scales
- [ ] Create component variants matching design
- [ ] Implement responsive breakpoints
- [ ] Add animations and transitions
- [ ] Ensure accessibility standards
- [ ] Validate against user design requirements

---

**Remember: Always reference this file for design decisions. Do not use generic or placeholder designs.**
