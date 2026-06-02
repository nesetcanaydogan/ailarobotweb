---
phase: 01-foundation
plan: 04
type: execute
wave: 3
depends_on: [01-03]
files_modified: [apps/web/src/components/Layout/Shell.tsx, apps/web/src/components/Layout/Navbar.tsx, apps/web/src/components/Layout/Footer.tsx, apps/web/src/App.tsx]
autonomous: true
requirements: [ENV-06]
must_haves:
  truths:
    - "Application displays a functional Navbar and Footer"
    - "Main content area uses the 'internal dashboard' aesthetic (dark, frosted glass)"
  artifacts:
    - path: "apps/web/src/components/Layout/Shell.tsx"
      provides: "Main application layout container"
    - path: "apps/web/src/components/Layout/Navbar.tsx"
      provides: "Navigation bar component"
  key_links:
    - from: "apps/web/src/App.tsx"
      to: "apps/web/src/components/Layout/Shell.tsx"
      via: "wrapper"
---

<objective>
Implement the basic UI layout shell including Navbar, Footer, and Main Content area using the 'internal dashboard' aesthetic.

Purpose: Provide a professional, branded container for the application features.
Output: functional React layout components with initial styling.
</objective>

<execution_context>
@$HOME/.gemini/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@DESIGN.md
@apps/web/src/index.css
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create Navbar and Footer Components</name>
  <files>apps/web/src/components/Layout/Navbar.tsx, apps/web/src/components/Layout/Footer.tsx</files>
  <action>
    - Implement `Navbar` with AILA logo (text-based for now) and placeholder links.
    - Implement `Footer` with copyright and secondary links.
    - Apply 'internal dashboard' styling: `bg-midnight-abyss/80`, `backdrop-blur-md`, `border-b` with `border-white/10`.
    - Use `lucide-react` for any necessary icons.
  </action>
  <verify>
    <automated>ls apps/web/src/components/Layout/Navbar.tsx apps/web/src/components/Layout/Footer.tsx</automated>
  </verify>
  <done>Navbar and Footer components are created with initial styling.</done>
</task>

<task type="auto">
  <name>Task 2: Implement Layout Shell</name>
  <files>apps/web/src/components/Layout/Shell.tsx, apps/web/src/App.tsx</files>
  <action>
    - Create `Shell.tsx` as a wrapper that includes `Navbar`, `<main>`, and `Footer`.
    - Set the main content area to have `bg-midnight-abyss`, `text-comet`, and proper padding using `spacing` tokens.
    - Update `App.tsx` to use the `Shell` component.
  </action>
  <verify>
    <automated>grep "<Shell>" apps/web/src/App.tsx</automated>
  </verify>
  <done>Application is wrapped in the branded layout shell.</done>
</task>

</tasks>

<success_criteria>
- Web app renders with Navbar at top and Footer at bottom.
- Background is `Midnight Abyss` and text is high-contrast.
- Layout is responsive (desktop/tablet focus).
</success_criteria>
