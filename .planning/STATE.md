# AILA - Project State

## Current Phase: Phase 1 - Foundation & Environment Setup
- [x] Phase 0 - Planning
- [/] Phase 1 - Foundation & Environment Setup
    - [x] Wave 1: Workspace & Shared Package (Completed)
    - [/] Wave 2: Backend & Frontend Foundations (In Progress)
    - [ ] Wave 3: UI Shell (Not Started)

## Strategic Decisions
- **3D:** Using React Three Fiber for better integration with the React lifecycle.
- **Styling:** Adopting Tailwind v4 to stay at the cutting edge of the ecosystem.
- **Backend:** Node.js chosen over serverless for more granular control over DB connections and GPT streaming if needed.
- **Monorepo:** Using npm workspaces to manage `apps/web`, `apps/api`, and `packages/shared`.

## Blockers / Risks
- **3D Assets:** Need a high-quality placeholder model that matches the 'AILA' vision.
- **Scroll Performance:** Complex 3D animations synced to scroll can be jittery; will need useScroll from @react-three/drei or similar.
- **Tailwind v4 Setup:** Need to ensure `@tailwindcss/vite` is correctly integrated with React 19.
