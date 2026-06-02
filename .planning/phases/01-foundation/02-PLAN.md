---
phase: 01-foundation
plan: 02
type: execute
wave: 2
depends_on: [01-01]
files_modified: [apps/api/package.json, apps/api/src/index.ts, apps/api/prisma/schema.prisma, apps/api/.env]
autonomous: true
requirements: [ENV-03, ENV-04]
user_setup:
  - service: postgres
    why: "Database for Prisma"
    env_vars:
      - name: DATABASE_URL
        source: "Local or hosted PostgreSQL connection string"
must_haves:
  truths:
    - "Express server starts and responds to /health"
    - "Prisma can generate client and connect to database"
  artifacts:
    - path: "apps/api/src/index.ts"
      provides: "Main entry point for the backend"
    - path: "apps/api/prisma/schema.prisma"
      provides: "Database schema definition"
  key_links:
    - from: "apps/api/package.json"
      to: "@aila/shared"
      via: "dependency"
    - from: "apps/api/src/index.ts"
      to: "prisma"
      via: "PrismaClient instance"
---

<objective>
Setup the backend foundation using Express and Prisma. This provides the API layer for GPT-4o proxying and lead storage.

Purpose: Robust, type-safe backend for the AILA application.
Output: Working Express server with Prisma ORM configured.
</objective>

<execution_context>
@$HOME/.gemini/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/phases/01-foundation/01-RESEARCH.md

<interfaces>
From packages/shared/src/index.ts:
```typescript
export { LeadSchema } from './schemas/lead';
export type { Lead } from './schemas/lead';
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Setup Express Server</name>
  <files>apps/api/package.json, apps/api/src/index.ts</files>
  <action>
    - Initialize `apps/api/package.json` with dependencies: `express`, `cors`, `dotenv`, `zod`, `@aila/shared`.
    - Create a basic Express server in `apps/api/src/index.ts`.
    - Implement a `GET /health` endpoint that returns `{ status: "ok" }`.
    - Configure middleware: `cors`, `express.json`.
  </action>
  <verify>
    <automated>cd apps/api && npm install && (npm run dev & sleep 5 && curl http://localhost:3001/health | grep '"status":"ok"')</automated>
  </verify>
  <done>Express server is running and responding to health checks.</done>
</task>

<task type="auto">
  <name>Task 2: Setup Prisma & Lead Model</name>
  <files>apps/api/prisma/schema.prisma, apps/api/.env</files>
  <action>
    - Initialize Prisma in `apps/api`.
    - Define a `Lead` model in `schema.prisma` with fields: `id` (uuid), `email` (unique), `businessName`, `createdAt`.
    - Create a `.env` file with a placeholder `DATABASE_URL`.
    - Run `prisma generate` to create the client.
  </action>
  <verify>
    <automated>cd apps/api && npx prisma validate && npx prisma generate</automated>
  </verify>
  <done>Prisma is configured with the Lead model and client is generated.</done>
</task>

</tasks>

<success_criteria>
- `curl /health` returns success.
- `prisma generate` succeeds.
- `@aila/shared` is accessible within the API.
</success_criteria>
