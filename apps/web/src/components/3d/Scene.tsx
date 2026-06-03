import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { Suspense, useRef, useEffect } from 'react';
import { AilaPlaceholder } from './AilaPlaceholder';
import * as THREE from 'three';
import { useScrollTimeline } from '../../hooks/useScrollTimeline';

export function Scene() {
  const isDev = import.meta.env.DEV;
  const spotLightRef = useRef<THREE.SpotLight>(null);
  
  // We don't pass a mesh ref here, we just want the timeline
  const timeline = useScrollTimeline();

  useEffect(() => {
    if (!timeline || !spotLightRef.current) return;

    // Animate spotlight intensity synced to the narrative
    // Peak intensity during "Story" section (label 'story' in useScrollTimeline)
    const ctx = gsap.context(() => {
      timeline.to(spotLightRef.current, {
        intensity: 5,
        duration: 0.5,
        ease: 'power2.inOut',
      }, 'story-=0.2');

      timeline.to(spotLightRef.current, {
        intensity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      }, 'story+=0.3');
    });

    return () => ctx.revert();
  }, [timeline]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        {isDev && <Perf position="bottom-right" />}
        
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Dynamic Azure Light */}
        <spotLight 
          ref={spotLightRef}
          position={[0, 5, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1} 
          color="#00f2ff"
          castShadow 
        />
        
        <Suspense fallback={null}>
          <AilaPlaceholder />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
