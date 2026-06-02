---
phase: 02-components
plan: 01
type: execute
wave: 1
depends_on: []
files_modified: [apps/api/src/index.ts, apps/api/src/routes/leads.ts, apps/web/src/components/UI/Button.tsx, apps/web/src/components/UI/FeatureCard.tsx]
autonomous: true
requirements: [MARK-02, LEAD-02]
must_haves:
  truths:
    - "Button component supports primary-pill, secondary-outline, and solid-primary variants"
    - "FeatureCard component exhibits the glassy frosted shadow effect"
    - "API endpoint POST /api/leads successfully saves data to the database via Prisma"
  artifacts:
    - path: "apps/web/src/components/UI/Button.tsx"
      provides: "Atomic action component"
    - path: "apps/web/src/components/UI/FeatureCard.tsx"
      provides: "Glassy information display container"
    - path: "apps/api/src/routes/leads.ts"
      provides: "Lead capture API endpoint"
  key_links:
    - from: "apps/api/src/routes/leads.ts"
      to: "prisma.lead"
      via: "prisma.lead.create"
      pattern: "prisma\\.lead\\.create"
---

<objective>
Implement the foundational UI components and the backend lead capture API. This provides the building blocks for the interactive features in the next plan.

Purpose: Establish the 'Internal Dashboard' aesthetic and enable data persistence.
Output: Reusable UI components and a functional lead capture endpoint.
</objective>

<execution_context>
@$HOME/.gemini/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/phases/02-components/02-RESEARCH.md
@DESIGN.md
@apps/web/src/index.css
@apps/api/prisma/schema.prisma
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create Atomic UI Components</name>
  <files>apps/web/src/components/UI/Button.tsx, apps/web/src/components/UI/FeatureCard.tsx</files>
  <action>
    - Create `apps/web/src/components/UI/Button.tsx` supporting variants:
      - `primary-pill`: bg-white/6, border-white, text-white, rounded-full.
      - `secondary-outline`: bg-transparent, border-azure-glow/12, text-arctic-mist, rounded-full.
      - `solid-primary`: bg-neon-violet, text-white, rounded-md (6px).
      - Ensure 0px vertical padding, 16px horizontal, and standard heights (h-10 or h-12).
    - Create `apps/web/src/components/UI/FeatureCard.tsx`:
      - Apply `bg-[rgba(186,214,247,0.03)]`, `backdrop-blur-xl`, `rounded-cards`, and `shadow-glass`.
      - Include a border of `white/10`.
    - Use `clsx` and `tailwind-merge` for class management.
  </action>
  <verify>
    <automated>ls apps/web/src/components/UI/Button.tsx apps/web/src/components/UI/FeatureCard.tsx</automated>
  </verify>
  <done>Button and FeatureCard components are created and match the design tokens.</done>
</task>

<task type="auto">
  <name>Task 2: Implement Lead Capture API</name>
  <files>apps/api/src/routes/leads.ts, apps/api/src/index.ts</files>
  <action>
    - Create `apps/api/src/routes/leads.ts`:
      - Implement a POST route that accepts `{ email, businessName }`.
      - Use `LeadSchema.safeParse` from `@aila/shared` for validation.
      - Use Prisma Client to create a new `Lead` record in the database.
      - Handle unique constraint errors (e.g., if email already exists).
    - Update `apps/api/src/index.ts`:
      - Import the leads router.
      - Mount it at `/api/leads`.
  </action>
  <verify>
    <automated>grep -r "LeadSchema.safeParse" apps/api/src/routes/leads.ts && grep "/api/leads" apps/api/src/index.ts</automated>
  </verify>
  <done>Backend endpoint for lead capture is functional and uses shared validation.</done>
</task>

</tasks>

<success_criteria>
- Button and FeatureCard components exist with correct Tailwind v4 classes.
- API endpoint responds to POST /api/leads with 201 on success.
</success_criteria>
