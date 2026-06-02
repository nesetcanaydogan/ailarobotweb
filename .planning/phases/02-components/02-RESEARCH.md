# Phase 2: Core UI Components - Research

**Researched:** February 2025
**Domain:** React 19 UI / Tailwind v4 / Form Actions
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Use React 19 and Tailwind CSS v4.
- Use Lucide React for icons.
- All buttons (including Solid Primary) MUST use Pill (999px) radius as per DESIGN.md "Don't" rule.

### the agent's Discretion
- Selection of specific Lucide icons for CTA buttons (Recommended: ArrowRight, Play).
- Implementation details for the "Glassy" effect (Recommended: backdrop-blur-xl + multi-layer shadows).
- Vertical sizing for buttons (Recommended: h-10 for standard, h-12 for Hero CTAs).

### Deferred Ideas (OUT OF SCOPE)
- Complex 3D model animations (reserved for Phase 3).
- Advanced form submission analytics.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| COMP-01 | **Design System Tokens**: Colors, Typography, Spacing | Verified Tailwind v4 @theme implementation in `index.css`. |
| COMP-02 | **Atomic UI - Buttons**: Pill radius compliance | Explicitly verified "Don't" rule in DESIGN.md. |
| COMP-03 | **Atomic UI - Inputs/Badges**: Stylized UI atoms | DESIGN.md specs for Minimal Input and Status Badge. |
| COMP-04 | **Glassy Feature Card**: Frosted glass effect | Multi-layer `inset` shadow configuration verified. |
| COMP-05 | **Hero Section**: High-impact CTA with Lucide icons | Recommended `ArrowRight` and `Play` icons. |
| COMP-06 | **Lead Capture Form**: React 19 Action integration | Pattern verified for `useActionState` and `@aila/shared` Zod schema. |
</phase_requirements>

## Summary

Phase 2 focuses on implementing the "Internal Dashboard" aesthetic defined in `DESIGN.md`. This involves creating high-fidelity UI components using Tailwind CSS v4 and React 19. The hallmark of the AILA design is the "Glassy" effect—achieved through a combination of translucency, backdrop blurs, and complex multi-layered inner shadows. Form handling will leverage the new React 19 `useActionState` hook for a seamless, boilerplate-free experience.

**Primary recommendation:** Use Tailwind v4's CSS variables and the `@theme` block for shadow tokens. Ensure ALL buttons use `rounded-full` (999px) to comply with the project's strict design language.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.2.6 | UI Framework | Native support for Actions and improved `ref` handling. |
| Tailwind CSS | 4.3.0 | Styling | CSS-first engine; optimized for the complex shadows. |
| Zod | 3.x | Validation | Used for validating Lead Form data against the shared schema. |
| Lucide React | 1.17.0 | Icons | Provides the `ArrowRight`, `Play`, `Bot`, and `User` icons. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|--------------|
| Framer Motion | 12.x | Animation | For subtle hover glows and transition effects on glassy cards. |
| clsx / tailwind-merge | Latest | Style Merging | Standard utility for conditional class management. |
| Vitest | Latest | Testing | Component and logic validation. |

**Installation:**
```bash
# In apps/web
npm install framer-motion clsx tailwind-merge
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/dom jsdom
```

## Architecture Patterns

### Recommended Project Structure
```
apps/web/src/
├── components/
│   ├── ui/             # Atomic components (Button, Input, Badge)
│   ├── cards/          # Composite cards (FeatureCard, LoginForm)
│   └── sections/       # Layout sections (Hero, Features, About)
└── actions/            # Server actions or client-side form actions
```

### Pattern 1: React 19 Form Action with Zod
Use `useActionState` to handle the Lead Form.

**Example:**
```typescript
import { useActionState } from 'react';
import { LeadSchema } from '@aila/shared';

async function submitLead(prevState: any, formData: FormData) {
  const rawData = Object.fromEntries(formData);
  const validated = LeadSchema.safeParse(rawData);
  if (!validated.success) return { errors: validated.error.flatten().fieldErrors };
  // API Call...
  return { success: true };
}

const [state, action, isPending] = useActionState(submitLead, null);
```

### Pattern 2: Multi-Layered Glass Shadows
AILA's "Glassy" effect relies on multiple `inset` shadows defined in `index.css`.

**Example:**
```css
--shadow-glass: 
  inset 0 1px 1px 0 rgba(199, 211, 234, 0.12), 
  inset 0 24px 48px 0 rgba(199, 211, 234, 0.05), 
  0 24px 32px 0 rgba(6, 6, 14, 0.7);
```

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Glassy Blur | Custom CSS filters | `backdrop-blur-xl` | GPU-accelerated and standardized. |
| Button Loading | Manual `loading` state | `useFormStatus` | Child components access pending state automatically. |
| Form Validation | Manual regex | `LeadSchema.safeParse` | Shared source of truth between Web and API. |
| Icons | Custom SVGs | Lucide React | Consistent stroke weight and branding. |

## Common Pitfalls

### Pitfall 1: Button Radius Deviation
**What goes wrong:** Developers might use `rounded-md` (6px) for the "Solid Primary" button because it's mentioned in the component description.
**How to avoid:** The "Don't" rule in `DESIGN.md` explicitly forbids rectangular buttons. **All buttons MUST use `rounded-full` (999px).**

### Pitfall 2: Lucide Icon Consistency
**What goes wrong:** Using different stroke weights or inconsistent icons for similar actions.
**How to avoid:** Standardize on `ArrowRight` for primary CTAs and `Play` for demos. Maintain default stroke width (2px).

## Code Examples

### Hero Section CTA Buttons
```tsx
import { ArrowRight, Play } from 'lucide-react';

const HeroCTAs = () => (
  <div className="flex gap-4">
    <Button variant="primary" className="rounded-full h-12 px-8">
      Get Started <ArrowRight className="w-5 h-5" />
    </Button>
    <Button variant="outline" className="rounded-full h-12 px-8">
      Watch Demo <Play className="w-5 h-5" />
    </Button>
  </div>
);
```

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest |
| Config file | `vitest.config.ts` |
| Quick run command | `npx vitest run` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| COMP-02 | Buttons use Pill radius (999px) | Unit/Style | `vitest run components/ui/Button.test.tsx` | ❌ Wave 0 |
| COMP-04 | Feature Card has glass shadows | Style | `vitest run components/cards/GlassyCard.test.tsx` | ❌ Wave 0 |
| COMP-05 | Hero CTAs have correct icons | Unit | `vitest run components/sections/Hero.test.tsx` | ❌ Wave 0 |
| COMP-06 | Lead Form validates data | Integration | `vitest run components/forms/LeadForm.test.tsx` | ❌ Wave 0 |

## Sources

### Primary (HIGH confidence)
- `DESIGN.md` - Core source for tokens and component specs.
- `index.css` - Verified existing shadow implementations.
- [React 19 useActionState Docs](https://react.dev/reference/react/useActionState)
- [Lucide Icons](https://lucide.dev/icons)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Using verified project versions.
- Architecture: HIGH - Follows React 19 best practices.
- Design Compliance: HIGH - Explicitly addressed button radius contradiction.

**Research date:** February 2025
**Valid until:** March 2025
