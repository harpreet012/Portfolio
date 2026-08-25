import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Deterministic pseudo-random helper for pure hook execution
function pseudoRandom(seed) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

/* ── Blue galaxy particles ── */
function GalaxyParticles({ count = 15000 }) {
  const points = useRef();
  const { mouse, viewport } = useThree();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const distance = 30;
    let seed = 1;
    for (let i = 0; i < count; i++) {
      const rVal = pseudoRandom(seed++);
      const radius = rVal * distance;
      const branchAngle = (i % 3) * ((2 * Math.PI) / 3);
      const spinAngle = radius * 0.5;
      const rx = Math.pow(pseudoRandom(seed++), 3) * (pseudoRandom(seed++) < 0.5 ? 1 : -1) * 2;
      const ry = Math.pow(pseudoRandom(seed++), 3) * (pseudoRandom(seed++) < 0.5 ? 1 : -1) * 2;
      const rz = Math.pow(pseudoRandom(seed++), 3) * (pseudoRandom(seed++) < 0.5 ? 1 : -1) * 2;
      arr[i * 3] = Math.cos(branchAngle + spinAngle) * radius + rx;
      arr[i * 3 + 1] = (pseudoRandom(seed++) - 0.5) * (radius * 0.2) + ry;
      arr[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + rz;
    }
    return arr;
  }, [count]);

  useFrame((_state, delta) => {
    points.current.rotation.y -= delta * 0.05;
    const scrollY = window.scrollY;
    const targetX = (mouse.x * viewport.width) / 10;
    const targetY = (mouse.y * viewport.height) / 10;
    points.current.position.x += (targetX - points.current.position.x) * 0.02;
    points.current.position.y += (targetY - points.current.position.y) * 0.02;
    points.current.rotation.x = 0.2 + scrollY * 0.0002;
    points.current.position.z += (-(scrollY * 0.002) - points.current.position.z) * 0.04;
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8ab4f8"
        size={0.05}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.35}
      />
    </Points>
  );
}

/* ── Gold sparkle particles ── */
function GoldSparkles({ count = 220 }) {
  const points = useRef();
  const time = useRef(0);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    let seed = 42;
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (pseudoRandom(seed++) - 0.5) * 50;
      arr[i * 3 + 1] = (pseudoRandom(seed++) - 0.5) * 20;
      arr[i * 3 + 2] = (pseudoRandom(seed++) - 0.5) * 40;
    }
    return arr;
  }, [count]);

  useFrame((_state, delta) => {
    time.current += delta;
    if (points.current) {
      const t = time.current;
      points.current.material.opacity = 0.25 + Math.sin(t * 0.8) * 0.12;
      points.current.rotation.y += delta * 0.012;
    }
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#d4a937"
        size={0.14}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.28}
      />
    </Points>
  );
}

export default function BackgroundGalaxy() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#050505]">
      <Canvas camera={{ position: [0, 5, 20], fov: 60 }}>
        <fog attach="fog" args={['#050505', 10, 40]} />
        <GalaxyParticles count={15000} />
        <GoldSparkles count={220} />
      </Canvas>
    </div>
  )
}
