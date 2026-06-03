import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { Suspense } from 'react';
import { AilaPlaceholder } from './AilaPlaceholder';

export function Scene() {
  const isDev = import.meta.env.DEV;

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        {isDev && <Perf position="bottom-right" />}
        
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <Suspense fallback={null}>
          <AilaPlaceholder />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
