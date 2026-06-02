# Phase 1: Foundation & Environment Setup - Research

**Researched:** February 2025
**Domain:** Full-stack React 19 / Tailwind v4 / Express / Prisma
**Confidence:** HIGH

## Summary

Phase 1 establishes the technical foundation for the AILA project. We are using the bleeding-edge stable versions of React (19.0+) and Tailwind CSS (v4.0+). The project will be structured as an npm/pnpm workspace to allow for clean separation between the frontend and backend while enabling type sharing (especially for Prisma models).

**Primary recommendation:** Use **Vite** with the official **Tailwind v4 Vite plugin** for the frontend, and a standard **Express** setup with **Prisma** for the backend, organized in a `packages/` or `apps/` workspace structure.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.0.x | Frontend Framework | Stable release with improved Actions, Hooks, and Metadata support. |
| Tailwind CSS | 4.x | Styling | CSS-first engine, zero-config by default, massive performance gains. |
| Vite | 6.x | Build Tool | Industry standard for React SPAs; native support for Tailwind v4 plugin. |
| Express | 4.x/5.x | Backend Server | Reliable, lightweight, and perfect for proxying GPT-4o requests. |
| Prisma | 7.x | ORM | Type-safe database access for PostgreSQL; excellent DX. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| React Router | 7.x | Routing | Merged with Remix; provides full-stack data loading capabilities. |
| Vitest | 3.x | Testing | Native Vite test runner; faster than Jest for this stack. |
| Zod | 3.x | Validation | Schema validation for API requests and shared types. |
| Lucide React | Latest | Icons | Clean, consistent SVG icons that match the AILA aesthetic. |

**Installation:**
```bash
# Root
npm init -y

# Frontend (in apps/web)
npm create vite@latest web -- --template react-ts
npm install tailwindcss @tailwindcss/vite react-router lucide-react

# Backend (in apps/api)
npm install express prisma @prisma/client zod cors dotenv
npm install -D @types/express @types/cors typescript ts-node
```

## Architecture Patterns

### Recommended Project Structure (Workspace Monorepo)
```
/
├── apps/
│   ├── web/                # React 19 + Tailwind v4
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── main.tsx
│   │   └── vite.config.ts
│   └── api/                # Express + Prisma
│       ├── src/
│       │   ├── routes/
│       │   └── index.ts
│       └── prisma/
│           └── schema.prisma
├── package.json            # Root with "workspaces"
└── tsconfig.json           # Shared TS config
```

### Pattern 1: React 19 Actions & `useActionState`
React 19 moves away from manual `loading` states for forms. Use `useActionState` to handle form submissions and pending states natively.
**Example:**
```typescript
// Source: https://react.dev/reference/react/useActionState
const [state, formAction, isPending] = useActionState(async (prevState, formData) => {
  const result = await api.submit(formData);
  return result;
}, null);
```

### Pattern 2: Tailwind v4 CSS-First Configuration
Tailwind v4 eliminates `tailwind.config.js`. All tokens from `DESIGN.md` should be defined in the `@theme` block in your main CSS file.
**Example:**
```css
/* apps/web/src/index.css */
@import "tailwindcss";

@theme {
  --color-midnight-abyss: #05060f;
  --color-neon-violet: #663af3;
  --font-untitled-sans: 'Inter', ui-sans-serif, system-ui;
  --font-aeonikpro: 'Space Grotesk', ui-sans-serif, system-ui;
  
  --shadow-glass: rgba(199, 211, 234, 0.12) 0px 1px 1px 0px inset, 
                  rgba(199, 211, 234, 0.05) 0px 24px 48px 0px inset, 
                  rgba(6, 6, 14, 0.7) 0px 24px 32px 0px;
}
```

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form State | Custom `loading` vars | `useActionState` | Native React 19 optimization. |
| 3D Scroll | Manual scroll listeners | `@react-three/drei` | `ScrollControls` is optimized for R3F. |
| CSS Variables | Manual JS mapping | Tailwind v4 `@theme` | Direct mapping to CSS utilities. |
| Icons | Custom SVG components | `lucide-react` | Standardized, accessible, and tree-shakeable. |

## Common Pitfalls

### Pitfall 1: Prisma Client in Development
**What goes wrong:** Creating multiple `PrismaClient` instances during HMR (Hot Module Replacement) in Express can exhaust database connections.
**How to avoid:** Use a singleton pattern for the Prisma client in development.

### Pitfall 2: Tailwind v4 Plugin Order
**What goes wrong:** Placing the `@tailwindcss/vite` plugin after the React plugin can sometimes cause styling issues in development.
**How to avoid:** Always place `tailwindcss()` before `react()` in `vite.config.ts`.

### Pitfall 3: React 19 `ref` Prop
**What goes wrong:** Using `forwardRef` is now unnecessary for most functional components.
**How to avoid:** Pass `ref` as a standard prop. Note that older libraries might still expect `forwardRef`.

## Code Examples

### Verified `vite.config.ts` (Tailwind v4)
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
});
```

### Shared Types Pattern (Zod)
```typescript
// apps/api/src/schemas.ts
import { z } from 'zod';

export const LeadSchema = z.object({
  email: z.string().email(),
  businessName: z.string().min(2),
});

export type Lead = z.infer<typeof LeadSchema>;
```

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All | ✓ | 24.14.0 | — |
| npm | All | ✓ | 11.9.0 | — |
| Docker | PostgreSQL | ✓ | 24.0.7 | Manual PG install |
| Git | All | ✓ | 2.x | — |

**Missing dependencies with no fallback:**
- None.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest |
| Config file | `vitest.config.ts` |
| Quick run command | `npm test` |
| Full suite command | `npm run test:ci` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ENV-01 | React 19 mounts correctly | Smoke | `vitest run web/src/App.test.tsx` | ❌ Wave 0 |
| ENV-02 | Tailwind v4 colors apply | Visual/Unit | `vitest run web/src/styles.test.tsx` | ❌ Wave 0 |
| ENV-03 | Express responds to health check | Integration | `vitest run api/src/index.test.ts` | ❌ Wave 0 |
| ENV-04 | Prisma connects to PG | Integration | `vitest run api/src/db.test.ts` | ❌ Wave 0 |

## Sources

### Primary (HIGH confidence)
- [React 19 Official Blog](https://react.dev/blog/2024/12/05/react-19) - Stable features and upgrade guide.
- [Tailwind CSS v4.0 Documentation](https://tailwindcss.com/docs/v4-beta) - CSS-first configuration and Vite plugin.
- [Vite Guide](https://vitejs.dev/guide/) - Workspace and plugin setup.
- [Prisma Documentation](https://www.prisma.io/docs) - Express integration.

### Secondary (MEDIUM confidence)
- Community setup guides for React 19 + Tailwind v4 + Vite.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Verified current stable versions.
- Architecture: HIGH - Workspace monorepo is industry standard for 2025.
- Pitfalls: MEDIUM - Based on early adoption reports of React 19 and Tailwind v4.

**Research date:** February 2025
**Valid until:** April 2025
