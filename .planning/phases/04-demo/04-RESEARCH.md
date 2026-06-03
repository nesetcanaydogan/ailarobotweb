# Phase 4: Agentic Demo & Backend - Research

**Researched:** 2024-03-21 (Updated: 2024-03-22)
**Domain:** AI Proxy, Streaming UI, Database Persistence
**Confidence:** HIGH

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| REQ-1.2 | Interactive Demo (GPT-4o config) | OpenAI Streaming Proxy with AbortController for clean SSE. |
| REQ-1.3 | Lead Capture persistence | Shared Zod schema and Prisma `DemoConfig` model. |
| REQ-2.3 | Security (API Keys) | Backend proxy logic ensures keys remain server-side. |
</phase_requirements>

## Summary

This phase focuses on bridging the gap between the marketing site and the "intelligent" robotics platform through a live demo. The core technical challenge is providing a low-latency, "real-time" feel while interacting with GPT-4o, while maintaining strict backend security and budget control.

**Primary recommendation:** Use a custom Express SSE (Server-Sent Events) implementation with the official OpenAI Node.js SDK and `AbortController` for resource management. Shared Zod schemas will ensure type safety across the monorepo.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `openai` | ^4.0.0+ | LLM Client | Official SDK with native async iterator support for streaming. |
| `express-rate-limit` | ^7.0.0+ | Security | Prevents API abuse and controls LLM costs. |
| `zod` | ^3.23.0 | Schema Validation | Shared schemas for cross-package type safety. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|--------------|
| `framer-motion` | ^12.0.0+ | UI Animation | Essential for the "internal dashboard" aesthetic (status badges, step transitions). |
| `lucide-react` | ^0.400+ | Icons | Status indicators and module visualizers. |

## Architecture Patterns

### Recommended Project Structure
```
apps/api/src/
├── routes/
│   └── demo.ts          # SSE endpoint for GPT-4o proxy
└── services/
    └── openai.ts        # OpenAI client initialization and prompt logic
apps/web/src/
├── hooks/
│   └── useDemoStream.ts # Hook to consume SSE and manage demo state
└── components/
    └── demo/            # Demo-specific UI (Stepper, ConfigViewer)
packages/shared/src/
└── schemas/
    └── demo.ts          # Shared AilaConfig Zod schema
```

### Pattern 1: Shared Zod Schema (AILA Demo Configuration)
To ensure the frontend and backend agree on the demo's output structure, a shared Zod schema is used.
**File:** `packages/shared/src/schemas/demo.ts`
```typescript
import { z } from 'zod';

export const AilaPersonaSchema = z.object({
  name: z.string(),
  role: z.string(),
  traits: z.array(z.string()),
});

export const AilaTaskSchema = z.object({
  id: z.string(),
  description: z.string(),
  priority: z.enum(['low', 'medium', 'high']),
});

export const AilaModuleSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  status: z.enum(['active', 'standby', 'offline']),
});

export const AilaConfigSchema = z.object({
  persona: AilaPersonaSchema,
  tasks: z.array(AilaTaskSchema),
  modules: z.array(AilaModuleSchema),
});

export type AilaConfig = z.infer<typeof AilaConfigSchema>;
```

### Pattern 2: Persistence Flow
1. **Lead Creation:** User submits the lead form (`POST /api/leads`). The backend returns the `leadId`.
2. **Demo Generation:** Frontend calls the SSE endpoint (`GET /api/demo/stream?leadId=xxx`).
3. **LLM Interaction:** Backend proxies the request to OpenAI with a system prompt requiring JSON output matching `AilaConfigSchema`.
4. **Result Storage:** Once the stream completes successfully, the backend saves the final JSON to the `DemoConfig` table in PostgreSQL, linked to the `leadId`.

### Pattern 3: SSE Cleanup Mechanism
To prevent memory leaks and unnecessary API billing, the backend must listen for client disconnects.
```typescript
app.get('/api/demo/stream', async (req, res) => {
  const controller = new AbortController();
  
  // Cleanup on disconnect
  req.on('close', () => {
    controller.abort();
    res.end();
  });

  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [...],
      stream: true,
    }, { signal: controller.signal });

    for await (const chunk of stream) {
      // Process and res.write()
    }
  } catch (err) {
    if (err.name === 'AbortError') return; // Expected
    throw err;
  }
});
```

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SSE Abort Logic | Manual flag checking | `AbortController` | Native browser/Node API designed for this exact purpose. |
| JSON Partial Parsing | Manual regex | `partial-json-parser` | (Optional) If you need to render the UI *while* the JSON is still arriving. |

## Runtime State Inventory

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None | Create `DemoConfig` table in Prisma. |
| Live service config | OpenAI API Key | Add `OPENAI_API_KEY` to `.env` (API). |
| OS-registered state | None | Verified. |
| Secrets/env vars | None | Verified. |
| Build artifacts | None | Verified. |

## Common Pitfalls

### Pitfall 1: Ghost Connections
**What goes wrong:** OpenAI continues generating tokens and billing after the user closes the tab.
**Why it happens:** Server doesn't stop the async iterator.
**How to avoid:** Use `AbortController` passed to the OpenAI SDK options.

### Pitfall 2: Schema Desync
**What goes wrong:** LLM outputs "task_id" but frontend expects "id".
**Why it happens:** Natural language drift in the system prompt.
**How to avoid:** Use the shared Zod schema to generate the prompt (Zod-to-JSON-schema) or strictly enforce it via backend validation before final storage.

## Code Examples

### Prompting with JSON Schema
```typescript
const systemPrompt = `You are AILA. Output a JSON configuration for a robotics vertical.
SCHEMA: ${JSON.stringify(zodToJsonSchema(AilaConfigSchema))}
Only output raw JSON.`;
```

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Backend Runtime | ✓ | 24.14.0 | — |
| PostgreSQL | Persistence | ✓ | 15.x | — |
| OpenAI API Key | Demo Logic | ✗ (User provided) | — | Mock responses for dev |

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest |
| Config file | `apps/api/vitest.config.ts` |
| Quick run command | `npm test` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| REQ-1.2 | Proxy aborts on disconnect | integration | `vitest apps/api/src/routes/demo.test.ts` | ❌ Wave 0 |
| REQ-1.3 | Config saved after stream | integration | `vitest apps/api/src/routes/demo.test.ts` | ❌ Wave 0 |
| REQ-2.3 | Keys not in client bundle | static | `grep -r "OPENAI_API_KEY" apps/web/src` | ✅ Manual |

## Sources

### Primary (HIGH confidence)
- OpenAI SDK Guide: [Usage with AbortController](https://github.com/openai/openai-node#usage)
- Prisma Docs: [Working with JSON fields](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#json)
- Express Docs: [Response close event](https://expressjs.com/en/api.html#res.on)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH
- Architecture: HIGH
- Pitfalls: HIGH

**Research date:** 2024-03-22
**Valid until:** 2024-04-22
