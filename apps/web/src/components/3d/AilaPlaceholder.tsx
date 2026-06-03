import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function AilaPlaceholder() {
  const meshRef = useRef<THREE.Group>(null);

  // Basic floating animation
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(t) * 0.1;
    meshRef.current.rotation.y = t * 0.2;
  });

  return (
    <group ref={meshRef}>
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
  );
}
