---
phase: 02-components
plan: 02
type: execute
wave: 2
depends_on: [01]
files_modified: [apps/web/src/components/Forms/LeadForm.tsx, apps/web/src/components/Sections/Hero.tsx]
autonomous: true
requirements: [MARK-01, LEAD-01]
must_haves:
  truths:
    - "LeadForm uses React 19 useActionState for form handling"
    - "Hero section uses AeonikPro (Space Grotesk) for the display text"
    - "Submitting the LeadForm successfully calls the backend API and shows a success state"
  artifacts:
    - path: "apps/web/src/components/Forms/LeadForm.tsx"
      provides: "Contact capture form"
    - path: "apps/web/src/components/Sections/Hero.tsx"
      provides: "Main landing section"
  key_links:
    - from: "apps/web/src/components/Forms/LeadForm.tsx"
      to: "/api/leads"
      via: "fetch in form action"
      pattern: "fetch.*api/leads"
    - from: "apps/web/src/components/Sections/Hero.tsx"
      to: "apps/web/src/components/UI/Button.tsx"
      via: "component import"
---

<objective>
Implement the primary interactive features of the 'Internal Dashboard': the Hero section and the Lead capture form. This plan wires the UI components to real backend logic and establishes the content hierarchy.

Purpose: Engage users and capture leads for the AILA robot.
Output: Working Hero section and Lead capture form integrated with the API.
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
@.planning/phases/02-components/01-PLAN.md
</context>

<interfaces>
From apps/web/src/components/UI/Button.tsx:
```typescript
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary-pill' | 'secondary-outline' | 'solid-primary';
}
export function Button({ variant, children, ...props }: ButtonProps): JSX.Element;
```
</interfaces>

<tasks>

<task type="auto">
  <name>Task 1: Implement LeadForm Component</name>
  <files>apps/web/src/components/Forms/LeadForm.tsx</files>
  <action>
    - Create `apps/web/src/components/Forms/LeadForm.tsx`:
      - Use React 19 `useActionState` to manage form submission and server state.
      - Use `LeadSchema` from `@aila/shared` to validate inputs on the client (or in the action).
      - Implement a `submitLead` action function that:
        - Extracts data from `FormData`.
        - Calls `POST /api/leads`.
        - Returns success or error messages.
      - Style the form using `Midnight Abyss` background, 16px radius (`rounded-2xl`), and the `shadow-login` token.
      - Use `Minimal Input Field` styling (bg-azure-glow/6, border-white/20, text-white).
      - Use the `Button` component with `solid-primary` variant for submission.
  </action>
  <verify>
    <automated>grep "useActionState" apps/web/src/components/Forms/LeadForm.tsx && grep "LeadSchema" apps/web/src/components/Forms/LeadForm.tsx</automated>
  </verify>
  <done>LeadForm is implemented with React 19 Actions and connected to the backend.</done>
</task>

<task type="auto">
  <name>Task 2: Implement Hero Section</name>
  <files>apps/web/src/components/Sections/Hero.tsx</files>
  <action>
    - Create `apps/web/src/components/Sections/Hero.tsx`:
      - Use a centered stack layout (`flex flex-col items-center text-center`).
      - Implement the display text using `font-aeonikpro` and `text-display-xl` (48px) or `text-display` (44px).
      - Subheadline should use `Comet` color and `text-heading` (24px) with `font-untitled-sans`.
      - Include "Get Started" and "Watch Demo" buttons using the `Button` component.
      - Ensure the background uses `Midnight Abyss` and potentially a subtle gradient from `DESIGN.md`.
  </action>
  <verify>
    <automated>grep "font-aeonikpro" apps/web/src/components/Sections/Hero.tsx && grep "Button" apps/web/src/components/Sections/Hero.tsx</automated>
  </verify>
  <done>Hero section is created with high-impact typography and CTA buttons.</done>
</task>

</tasks>

<success_criteria>
- LeadForm successfully submits and shows a success/error state.
- Hero section renders with the correct fonts and layout as per DESIGN.md.
</success_criteria>
