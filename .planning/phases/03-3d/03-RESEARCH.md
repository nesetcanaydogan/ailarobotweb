# Phase 3: 3D Integration & Scroll Magic - Research

**Researched:** 2025-05-22
**Domain:** 3D Web Graphics (Three.js), Scroll-Driven Animations
**Confidence:** HIGH

## Summary

Phase 3 introduces the AILA 3D model as the central visual element of the landing page. The goal is to create a high-end "Internal Dashboard" feel where the robot interacts with the content as the user scrolls. We will use React Three Fiber (R3F) and Drei's `ScrollControls` to achieve smooth, scroll-synced animations. A "sandwich" architecture will be employed to allow the 3D model to pass both behind and in front of UI elements.

**Primary recommendation:** Use a single, persistent `<Canvas>` with `<ScrollControls>` and sync a **GSAP Timeline** to the scroll offset for precise, cinematic control over AILA's position and rotation across sections.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `three` | ^0.184.0 | 3D Engine | Industry standard for web 3D. |
| `@react-three/fiber` | ^9.6.1 | React Bridge | Declarative Three.js for React. |
| `@react-three/drei` | ^10.7.7 | Helper Library | Essential hooks (`useScroll`, `useGLTF`) and components (`ScrollControls`). |
| `gsap` | ^3.12.5 | Animation | Robust timeline management for non-linear scroll animations. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `react-router-dom` | ^7.0.0 | Routing | Required for "Directable pages" (Features, About, etc.). |
| `gltfjsx` | (CLI) | Asset Pipeline | Transforms GLB models into reusable React components. |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `ScrollControls` | `framer-motion` | Framer Motion is great for 2D, but `ScrollControls` is optimized for R3F's render loop and inertial damping. |
| Native `useFrame` | `r3f-scroll-rig` | Scroll-rig is powerful for many 3D elements, but overkill for a single central robot model. |

**Installation:**
```bash
npm install three @types/three @react-three/fiber @react-three/drei gsap react-router-dom
```

## Architecture Patterns

### Recommended Project Structure
```
apps/web/src/
├── components/
│   ├── 3d/
│   │   ├── AilaModel.tsx     # Generated via gltfjsx
│   │   ├── Scene.tsx         # Shared Canvas & ScrollControls setup
│   │   └── Controller.tsx    # Animation logic (scroll/route sync)
│   └── sections/             # Update to use <Scroll html>
├── pages/                    # New: Modular sub-pages
│   ├── Home.tsx
│   ├── Features.tsx
│   └── About.tsx
└── App.tsx                   # Layout with persistent Canvas
```

### Pattern 1: The "Sandwich" Overlay
**What:** Placing the Canvas between DOM layers.
**When to use:** When AILA needs to go behind some elements (background) and over others (foreground cards).
**Example:**
```tsx
// App.tsx logic
<div className="relative">
  {/* Background Layer (Static/CSS) */}
  <div className="fixed inset-0 z-0 bg-midnight-abyss" />
  
  <Canvas eventSource={containerRef} className="fixed inset-0 z-10">
    <ScrollControls pages={6} damping={0.2}>
      <AilaScene />
      <Scroll html>
        {/* Foreground Content (Over AILA) */}
        <Hero />
        <Features />
      </Scroll>
    </ScrollControls>
  </Canvas>
</div>
```

### Pattern 2: GSAP + useScroll Timeline
**What:** Syncing a pre-defined animation timeline to scroll progress.
**When to use:** For complex "cinematic" paths where AILA rotates, scales, and moves simultaneously across different sections.
**Example:**
```tsx
const scroll = useScroll();
const tl = useRef();

useLayoutEffect(() => {
  tl.current = gsap.timeline({ paused: true });
  tl.current
    .to(model.position, { x: 2, y: -1, z: 0 }, 0) // Section 1
    .to(model.rotation, { y: Math.PI }, 1);      // Section 2
}, []);

useFrame(() => {
  tl.current.seek(scroll.offset * tl.current.duration());
});
```

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll Smoothness | Custom lerp logic | `damping` in `ScrollControls` | Handles inertial drift and mouse wheel normalization perfectly. |
| Model Loading | `new GLTFLoader()` | `useGLTF` (Drei) | Handles caching, suspense, and draco compression automatically. |
| Event Redirection | Manual raycasting | `eventSource` prop | Allows clicking through DOM layers to 3D objects. |

## Content Structure (The "Introducer")

Based on `PROJECT.md`, the scroll experience should follow this narrative flow:

| Page/Scroll | Section Name | 3D AILA State | Content Focus |
|-------------|--------------|---------------|---------------|
| 1 | Hero | Centered, breathing | High-impact introduction, "Actually Intelligent". |
| 2 | About | Moves left, rotates | Physical interface, Natural Language, Perception. |
| 3 | Capabilities | Moves right, highlights sensors | RAG, Edge AI, Operation in extreme conditions. |
| 4 | Verticals | Behind translucent card | Retail, Hospitals, Defense, Search & Rescue. |
| 5 | Demo/CTA | Center, looks at user | Lead capture, Personalized configuration. |

## Common Pitfalls

### Pitfall 1: State-Driven Scroll
**What goes wrong:** Using `useState` to track scroll progress.
**Why it happens:** Natural React instinct.
**How to avoid:** Always use `useFrame` with `refs`. React 19's compiler won't save you from the performance hit of 60fps re-renders.

### Pitfall 2: Memory Leaks
**What goes wrong:** GPU memory climbing on every page navigation.
**Why it happens:** Multiple Canvases being created/destroyed.
**How to avoid:** Use a single persistent `<Canvas>` at the top level.

### Pitfall 3: Asset Size
**What goes wrong:** Large 3D model (50MB+) causes initial load hang.
**How to avoid:** Use `gltf-pipeline` to draco-compress and `gltfjsx --transform` to webp-compress textures.

## Code Examples

### Optimized Model Wrapper
```tsx
// Generated via: npx gltfjsx model.glb --transform --types
export function AilaModel(props) {
  const { nodes, materials } = useGLTF('/aila-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Body.geometry} material={materials.AilaShell} />
      {/* ... */}
    </group>
  )
}
useGLTF.preload('/aila-transformed.glb')
```

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Development | ✓ | 24.14.0 | — |
| npm | Package management | ✓ | 11.9.0 | — |
| WebGL 2 | 3D Rendering | ✓ | — | Canvas-based 2D fallback |
| WebGPU | Modern Rendering | ✓ | Chrome 113+ | Auto-fallback to WebGL |

**Missing dependencies with no fallback:**
- None.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest + React Testing Library |
| Config file | `apps/web/vitest.config.ts` |
| Quick run command | `npm test` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| 3D-01 | Canvas renders without crashing | Smoke | `npm test Scene.test.tsx` | ❌ Wave 0 |
| 3D-02 | Scroll sync updates model rotation | Integration | `npm test Controller.test.tsx` | ❌ Wave 0 |
| 3D-03 | GLB model loads successfully | Smoke | `npm test AilaModel.test.tsx` | ❌ Wave 0 |

### Wave 0 Gaps
- [ ] `apps/web/src/components/3d/__tests__` directory.
- [ ] Mock for `HTMLCanvasElement.getContext` in `test/setup.ts`.

## Sources

### Primary (HIGH confidence)
- `@react-three/fiber` docs - Scroll patterns and optimization.
- `@react-three/drei` docs - `ScrollControls` and `useGLTF` usage.
- Three.js r184 release notes - WebGPU and BatchedMesh info.

### Secondary (MEDIUM confidence)
- GSAP ScrollTrigger community patterns - Syncing timelines to R3F.

## Metadata
**Confidence breakdown:**
- Standard stack: HIGH - Libraries are mature and versions verified.
- Architecture: HIGH - Sandwich pattern is well-documented for R3F.
- Pitfalls: HIGH - Standard R3F performance gotchas.

**Research date:** 2025-05-22
**Valid until:** 2025-06-21
