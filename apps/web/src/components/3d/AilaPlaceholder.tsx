import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useScrollTimeline } from '../../hooks/useScrollTimeline';
import gsap from 'gsap';

export function AilaPlaceholder() {
  const scrollRef = useRef<THREE.Group>(null);
  const idleRef = useRef<THREE.Group>(null);
  
  // Initialize scroll-synced animations on the outer group
  useScrollTimeline(scrollRef);

  // Breathing & Idle animation on the inner group
  useEffect(() => {
    if (!idleRef.current) return;
    
    const ctx = gsap.context(() => {
...
      // Subtle floating "breathing" effect
      gsap.to(idleRef.current!.position, {
        y: "+=0.15",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      // Subtle rotation wobble
      gsap.to(idleRef.current!.rotation, {
        z: 0.05,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, idleRef);

    return () => ctx.revert();
  }, []);

  return (
    <group ref={scrollRef}>
      <group ref={idleRef}>
        {/* Head */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[0.5, 0.4, 0.4]} />
          <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Body */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.3, 0.6, 4, 8]} />
          <meshStandardMaterial color="#00ffff" metalness={0.9} roughness={0.1} emissive="#00ffff" emissiveIntensity={0.2} />
        </mesh>
        
        {/* Eyes */}
        <mesh position={[-0.15, 0.65, 0.18]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#000000" emissive="#00ffff" />
        </mesh>
        <mesh position={[0.15, 0.65, 0.18]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#000000" emissive="#00ffff" />
        </mesh>
      </group>
    </group>
  );
}
