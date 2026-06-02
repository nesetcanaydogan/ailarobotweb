---
phase: 01-foundation
plan: 01
type: execute
wave: 1
depends_on: []
files_modified: [package.json, packages/shared/package.json, packages/shared/src/index.ts, packages/shared/src/schemas/lead.ts, tsconfig.json]
autonomous: true
requirements: [ENV-01, ENV-05]
must_haves:
  truths:
    - "Monorepo workspace is initialized with npm"
    - "Shared package provides type-safe Zod schemas for leads"
  artifacts:
    - path: "package.json"
      provides: "Workspace configuration"
    - path: "packages/shared/src/schemas/lead.ts"
      provides: "Lead capture validation schema"
  key_links:
    - from: "packages/shared/src/index.ts"
      to: "packages/shared/src/schemas/lead.ts"
      via: "export *"
---

<objective>
Initialize the monorepo workspace and the shared validation package. This sets up the structural foundation for the entire project.

Purpose: Enable code sharing (types/schemas) between frontend and backend.
Output: Working npm workspace with a functional `@aila/shared` package.
</objective>

<execution_context>
@$HOME/.gemini/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/phases/01-foundation/01-RESEARCH.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Initialize Monorepo Workspace</name>
  <files>package.json, tsconfig.json</files>
  <action>
    - Initialize a root `package.json` with `workspaces` including `apps/*` and `packages/*`.
    - Create a base `tsconfig.json` at the root for shared TypeScript configuration.
    - Set up the directory structure: `apps/web`, `apps/api`, `packages/shared`.
  </action>
  <verify>
    <automated>grep '"workspaces":' package.json && ls -d apps/ packages/</automated>
  </verify>
  <done>Root workspace is configured and subdirectories exist.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Setup Shared Package & Lead Schema</name>
  <files>packages/shared/package.json, packages/shared/src/schemas/lead.ts, packages/shared/src/index.ts</files>
  <behavior>
    - LeadSchema should validate objects with `email` (string, email format) and `businessName` (string, min 2 chars).
    - It should fail for invalid emails or empty business names.
  </behavior>
  <action>
    - Create `packages/shared/package.json` with name `@aila/shared`.
    - Implement `LeadSchema` using Zod in `packages/shared/src/schemas/lead.ts`.
    - Export the schema and its inferred type from `packages/shared/src/index.ts`.
  </action>
  <verify>
    <automated>cd packages/shared && npm install && node -e 'require("zod"); require("./src/index").LeadSchema.parse({email: "test@example.com", businessName: "AILA"})'</automated>
  </verify>
  <done>Shared package exports a working Zod schema for Lead capture.</done>
</task>

</tasks>

<success_criteria>
- `npm install` at root works without errors.
- `@aila/shared` is linkable and contains the Lead validation logic.
</success_criteria>
