---
phase: 03-3d
plan: 01
subsystem: 3D Engine
tags: [r3f, threejs, gsap, scrolltrigger]
requirements: [3D-01, 3D-02, 3D-05]
tech_stack: [three, @react-three/fiber, @react-three/drei, gsap, r3f-perf]
key_files: [apps/web/src/components/3d/Scene.tsx, apps/web/src/components/3d/AilaPlaceholder.tsx, apps/web/src/hooks/useScrollTimeline.ts]
---

# Phase 03 Plan 01: 3D Engine Foundation Summary

Established the foundational 3D architecture for AILA Robot website, using React Three Fiber for rendering and GSAP ScrollTrigger for scroll-based orchestration.

## Key Accomplishments

- **Fixed 3D Canvas**: Implemented a global `<Scene />` component that stays fixed in the viewport (`z-index: 10`), allowing the 3D model to persist across section scrolls.
- **AILA Placeholder**: Created a basic 3D model representing AILA to verify rendering and spatial positioning.
- **Scroll Orchestration**: Setup a master GSAP ScrollTrigger timeline in `useScrollTimeline` hook, synced with the main scroll container.
- **Performance Monitoring**: Integrated `r3f-perf` for real-time performance tracking during development.
- **Test Infrastructure**: Added Playwright smoke tests to ensure proper z-index layering between the 3D Canvas and UI content.

## Decisions Made

- **Fixed-Position Canvas**: Chose a `fixed` inset-0 canvas to decouple 3D rendering from the DOM scroll, which is essential for the "AILA following you" experience.
- **GSAP for Animation**: Selected GSAP over Framer Motion for 3D orchestration due to its superior `ScrollTrigger` capabilities and direct compatibility with Three.js object properties.

## Deviations from Plan

- None - plan executed as written.

## Known Stubs

- **AILA Model**: The current model is a placeholder (rounded box) and will be replaced with the high-fidelity GLTF model in a future plan.

## Self-Check: PASSED
