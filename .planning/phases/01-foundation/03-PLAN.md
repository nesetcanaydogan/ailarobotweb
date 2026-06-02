---
phase: 01-foundation
plan: 03
type: execute
wave: 2
depends_on: [01-01]
files_modified: [apps/web/package.json, apps/web/vite.config.ts, apps/web/src/index.css, apps/web/src/main.tsx, apps/web/src/App.tsx]
autonomous: true
requirements: [ENV-01, ENV-02]
must_haves:
  truths:
    - "Vite dev server starts and serves React 19 app"
    - "Tailwind v4 is configured with Midnight Abyss and Neon Violet tokens"
  artifacts:
    - path: "apps/web/src/index.css"
      provides: "Tailwind v4 theme configuration"
    - path: "apps/web/vite.config.ts"
      provides: "Build system config with Tailwind plugin"
  key_links:
    - from: "apps/web/src/main.tsx"
      to: "apps/web/src/index.css"
      via: "import"
    - from: "apps/web/vite.config.ts"
      to: "@tailwindcss/vite"
      via: "plugin"
---

<objective>
Setup the frontend foundation using Vite, React 19, and Tailwind v4. Map all design tokens from DESIGN.md into the CSS-first configuration.

Purpose: High-performance, modern frontend foundation with consistent branding.
Output: Working Vite + React 19 project with Tailwind v4 theme configured.
</objective>

<execution_context>
@$HOME/.gemini/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/phases/01-foundation/01-RESEARCH.md
@DESIGN.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Setup Vite + React 19</name>
  <files>apps/web/package.json, apps/web/vite.config.ts, apps/web/src/main.tsx</files>
  <action>
    - Initialize `apps/web` using Vite's React TS template.
    - Ensure React 19 is installed.
    - Setup `vite.config.ts` with `@tailwindcss/vite` and `@vitejs/plugin-react`.
    - Create a minimal `src/main.tsx` and `src/App.tsx` that renders a "Hello AILA" message.
  </action>
  <verify>
    <automated>cd apps/web && npm install && npm run build</automated>
  </verify>
  <done>Vite project is initialized with React 19 and builds successfully.</done>
</task>

<task type="auto">
  <name>Task 2: Configure Tailwind v4 & Design Tokens</name>
  <files>apps/web/src/index.css, apps/web/src/App.tsx</files>
  <action>
    - Create `apps/web/src/index.css` and import Tailwind.
    - Define the `@theme` block mapping all tokens from `DESIGN.md`:
      - Colors: `midnight-abyss`, `ghost-white`, `neon-violet`, `comet`, `arctic-mist`, etc.
      - Fonts: `untitled-sans` (Inter), `aeonikpro` (Space Grotesk).
      - Spacing scale and Border Radius.
      - Complex shadows like `shadow-glass`.
    - Apply `bg-midnight-abyss` and `text-ghost-white` to the body in `App.tsx` to verify colors.
  </action>
  <verify>
    <automated>grep "--color-midnight-abyss: #05060f;" apps/web/src/index.css</automated>
  </verify>
  <done>Tailwind v4 is configured with all brand design tokens.</done>
</task>

</tasks>

<success_criteria>
- `npm run build` in `apps/web` passes.
- `index.css` contains the `@theme` block with brand tokens.
</success_criteria>
