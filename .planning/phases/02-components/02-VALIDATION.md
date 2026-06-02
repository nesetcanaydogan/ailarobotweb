# Phase 2: Core UI Components - Validation

This document maps Phase 2 requirements to specific validation steps and Vitest commands.

## Requirement Mapping

| ID | Requirement | Test Type | Vitest Command |
|----|-------------|-----------|----------------|
| **COMP-01** | **Design System Tokens**: Correct colors and fonts applied | Style/Smoke | `npx vitest run src/components/layout/Shell.test.tsx` |
| **COMP-02** | **Button Radius**: All buttons use Pill (999px) radius | Unit | `npx vitest run src/components/ui/Button.test.tsx` |
| **COMP-03** | **Input/Badge UI**: Minimal Input and Status Badge styling | Unit | `npx vitest run src/components/ui/Input.test.tsx` |
| **COMP-04** | **Glassy Effect**: Feature Card has shadow and blur | Style | `npx vitest run src/components/cards/GlassyCard.test.tsx` |
| **COMP-05** | **Hero CTA Icons**: Uses ArrowRight and Play icons | Unit | `npx vitest run src/components/sections/Hero.test.tsx` |
| **COMP-06** | **Lead Form Action**: useActionState + Zod validation | Integration | `npx vitest run src/components/forms/LeadForm.test.tsx` |

## Validation Steps

### 1. Button Radius Compliance (CRITICAL)
**Goal:** Ensure NO rectangular buttons exist in the dashboard.
- **Action:** Inspect computed styles of all Button variants.
- **Expected:** `border-radius` should be `999px` (or `rounded-full` class present).
- **Command:** `npx vitest run src/components/ui/Button.test.tsx`

### 2. Glassy Card Fidelity
**Goal:** Verify the multi-layer inner shadows for the "Internal Dashboard" feel.
- **Action:** Check for the presence of the `shadow-glass` utility class.
- **Expected:** Computed shadow should match the specification in `DESIGN.md`.
- **Command:** `npx vitest run src/components/cards/GlassyCard.test.tsx`

### 3. Lead Form Integration
**Goal:** Validate that the form correctly handles errors using React 19 Actions.
- **Action:** Submit empty form.
- **Expected:** Validation errors from `@aila/shared` schema should be displayed.
- **Command:** `npx vitest run src/components/forms/LeadForm.test.tsx`

## Wave 0 Setup Tasks
Before these tests can run, the following must be implemented in Wave 0:
1. **Install Vitest and Testing Library** in `apps/web`.
2. **Create `vitest.config.ts`** with `jsdom` environment.
3. **Generate Test Stubs** for each of the files listed in the Vitest Command column.
