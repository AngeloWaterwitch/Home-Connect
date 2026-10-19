import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, Environment, Lightformer, PerformanceMonitor } from '@react-three/drei';

function Core({ scroll, reduced }) {
  const group = useRef();
  const ring = useRef();

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const p = scroll.current;
    const { x, y } = state.pointer;
    if (!reduced) g.rotation.y += dt * 0.15;
    g.rotation.x += (y * 0.3 + p * 1.2 - g.rotation.x) * 0.05;
    const { width, height } = state.viewport;
    const wide = width > 9;
    const fit = Math.min(1, Math.max(0.4, width / 8));
    const baseX = wide ? width * 0.3 : 0;
    const baseY = wide ? 0 : height * 0.3;
    g.position.x += (baseX + x * 0.6 - p * 2.2 * fit - g.position.x) * 0.05;
    g.position.y += (baseY + y * 0.3 + p * 0.8 - g.position.y) * 0.05;
    g.scale.setScalar(fit * (0.85 + p * 0.25));
    if (ring.current && !reduced) ring.current.rotation.z += dt * 0.4;
  });

  return (
    <group ref={group}>
      <Float speed={reduced ? 0 : 1.5} rotationIntensity={0.4} floatIntensity={1}>
        <mesh>
          <icosahedronGeometry args={[1.5, 18]} />
          <MeshDistortMaterial
            color="#8b9bff"
            roughness={0.2}
            metalness={0.55}
            distort={reduced ? 0.2 : 0.42}
            speed={reduced ? 0 : 1.6}
          />
        </mesh>
        <mesh ref={ring} rotation={[1.2, 0.3, 0]}>
          <torusGeometry args={[2.35, 0.012, 16, 160]} />
          <meshBasicMaterial color="#c4b5fd" />
        </mesh>
        <mesh rotation={[0.4, 1.1, 0]}>
          <torusGeometry args={[2.9, 0.008, 16, 160]} />
          <meshBasicMaterial color="#67e8f9" />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene({ scroll, reduced }) {
  const small = window.innerWidth < 768;
  const [dpr, setDpr] = useState(small ? [1, 1.5] : [1, 1.75]);
  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      gl={{ antialias: !small, powerPreference: 'high-performance' }}
      frameloop={reduced ? 'demand' : 'always'}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#c4b5fd" />
      <pointLight position={[-5, -2, 3]} intensity={30} color="#22d3ee" />
      <Core scroll={scroll} reduced={reduced} />
      {!reduced && <Sparkles count={small ? 50 : 120} scale={[14, 8, 8]} size={2} speed={0.3} color="#a5b4fc" />}
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={4} color="#c4b5fd" position={[-4, 3, 4]} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={3} color="#67e8f9" position={[4, -2, 3]} scale={[5, 2, 1]} />
        <Lightformer form="ring" intensity={2} color="#ffffff" position={[0, 4, -4]} scale={4} />
      </Environment>
    </Canvas>
  );
}
