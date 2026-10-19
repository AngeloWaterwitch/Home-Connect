import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';

// Soft round glow sprite so nodes read as lights, not squares.
function makeDot() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const x = c.getContext('2d');
  const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.9)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

// A sphere of glowing "homes" joined to their nearest neighbours: community as a network.
function buildNetwork(count, linkDistance) {
  const pts = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    pts.push(new THREE.Vector3(Math.cos(t) * r, y, Math.sin(t) * r).multiplyScalar(2));
  }
  const positions = new Float32Array(count * 3);
  pts.forEach((p, i) => p.toArray(positions, i * 3));
  const lines = [];
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      if (pts[i].distanceTo(pts[j]) < linkDistance) lines.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
    }
  }
  return { positions, lines: new Float32Array(lines) };
}

function Network({ scroll, reduced, small }) {
  const group = useRef();
  const count = small ? 70 : 130;
  const dot = useMemo(makeDot, []);
  const { positions, lines } = useMemo(() => buildNetwork(count, small ? 0.95 : 0.78), [count, small]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const { width, height } = state.viewport;
    const wide = width > 9;
    const fit = Math.min(1, Math.max(0.42, width / 8.5));
    const p = scroll.current;
    if (!reduced) g.rotation.y += dt * 0.12;
    g.rotation.x += (state.pointer.y * 0.25 - g.rotation.x) * 0.04;
    g.rotation.z += (state.pointer.x * 0.1 - g.rotation.z) * 0.04;
    const tx = (wide ? width * 0.13 : 0) + state.pointer.x * 0.3;
    const ty = wide ? 0 : height * 0.26;
    g.position.x += (tx - g.position.x) * 0.05;
    g.position.y += (ty - g.position.y) * 0.05;
    g.scale.setScalar(fit * (0.74 + p * 0.5));
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial map={dot} color="#ffc46b" size={0.26} sizeAttenuation transparent opacity={1} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#7dd3fc" transparent opacity={0.35} depthWrite={false} />
      </lineSegments>
      <mesh>
        <sphereGeometry args={[1.96, 32, 32]} />
        <meshBasicMaterial color="#0f1a3d" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

export default function NetworkScene({ scroll, reduced }) {
  const small = window.innerWidth < 768;
  const [dpr, setDpr] = useState(small ? [1, 1.5] : [1, 2]);
  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: !small, powerPreference: 'high-performance' }}
      frameloop={reduced ? 'demand' : 'always'}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <Network scroll={scroll} reduced={reduced} small={small} />
    </Canvas>
  );
}
