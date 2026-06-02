# AILA - Project State

## Current Phase: Phase 0 - Planning
- [x] Initial Research & Document Analysis
- [x] Questioning Phase Completed
- [x] Project Context Defined
- [x] Requirements Documented
- [ ] Roadmap Established

## Strategic Decisions
- **3D:** Using React Three Fiber for better integration with the React lifecycle.
- **Styling:** Adopting Tailwind v4 to stay at the cutting edge of the ecosystem.
- **Backend:** Node.js chosen over serverless for more granular control over DB connections and GPT streaming if needed.

## Blockers / Risks
- **3D Assets:** Need a high-quality placeholder model that matches the 'AILA' vision.
- **Scroll Performance:** Complex 3D animations synced to scroll can be jittery; will need useScroll from @react-three/drei or similar.
