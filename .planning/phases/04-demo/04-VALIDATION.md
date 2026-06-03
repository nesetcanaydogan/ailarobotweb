# Phase 4: Agentic Demo & Backend - Validation

This document defines the verification steps required to ensure Phase 4 meets all functional and technical requirements.

## Phase Requirements → Test Map

| Req ID | Requirement | Verification Method | Automated Test / Command |
|--------|-------------|---------------------|--------------------------|
| **REQ-1.2** | Interactive Demo (LLM Proxy) | Integration test verifying SSE headers and chunked response. | `vitest apps/api/src/routes/demo.test.ts` |
| **REQ-1.2** | Streaming UI | Hook test verifying state updates from SSE stream. | `vitest apps/web/src/hooks/useDemoStream.test.ts` |
| **REQ-1.3** | Lead Capture & Persistence | Prisma model check and API persistence test. | `npx prisma validate && vitest apps/api/src/routes/demo.test.ts` |
| **REQ-2.3** | Security (API Keys) | Env var check and bundle audit. | `grep -r "OPENAI_API_KEY" apps/web/src` (should be empty) |

## Automated Verification Steps

### 1. LLM Proxy & SSE Integrity
The demo endpoint must return correct SSE headers and stream valid JSON chunks.
- **Test:** `apps/api/src/routes/demo.test.ts`
- **Success Criteria:**
  - `Content-Type` is `text/event-stream`.
  - `Cache-Control` is `no-cache`.
  - Stream terminates with `[DONE]`.
  - Aborting the request stops the OpenAI stream (mocked).

### 2. Shared Schema Validation
Ensure the AILA Configuration matches the Zod schema in both frontend and backend.
- **Test:** `packages/shared/src/schemas/demo.test.ts`
- **Success Criteria:**
  - Validates full `AilaConfig` objects.
  - Rejects malformed persona/task/module data.

### 3. Persistence Flow
Verify that the generated configuration is correctly linked to a Lead in PostgreSQL.
- **Test:** `apps/api/src/routes/demo.test.ts`
- **Success Criteria:**
  - `DemoConfig` record is created after stream completion.
  - `leadId` in `DemoConfig` matches the provided lead.
  - `config` field contains the valid JSON from the LLM.

### 4. Memory Leak Prevention
Verify that `req.on('close')` is handled.
- **Test:** `apps/api/src/routes/demo.test.ts` (using manual `request.emit('close')`)
- **Success Criteria:**
  - `AbortController.abort()` is called when client disconnects.

## Manual Verification Steps

### 1. End-to-End Demo Flow
1. Navigate to the Demo section.
2. Fill out the Lead form.
3. Submit and observe the "Analyzing..." state.
4. Verify that the robot configuration (Persona, Tasks, Modules) appears in steps.
5. Confirm the final JSON configuration is displayed.

### 2. Network Tab Audit
1. Open DevTools > Network.
2. Trigger the demo.
3. Verify the request to `/api/demo/stream` stays "Pending" during streaming.
4. Verify the "EventStream" tab shows incoming message chunks.

## Wave 0 Gaps (Required before implementation)

- [ ] **API Test Config:** Ensure `apps/api` has a working Vitest setup.
- [ ] **Prisma Migration:** Add `DemoConfig` model to `schema.prisma` and run `npx prisma migrate dev`.
- [ ] **Shared Schema Export:** Ensure `packages/shared` exports the new `demo` schemas.
