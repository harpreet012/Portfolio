import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ── Blue galaxy particles (original) ── */
function GalaxyParticles({ count = 15000 }) {
  const points = useRef()
  const { mouse, viewport } = useThree()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    const distance = 30
    for (let i = 0; i < count; i++) {
      const radius      = Math.random() * distance
      const branchAngle = (i % 3) * ((2 * Math.PI) / 3)
      const spinAngle   = radius * 0.5
      const rx = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 2
      const ry = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 2
      const rz = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 2
      arr[i * 3]     = Math.cos(branchAngle + spinAngle) * radius + rx
      arr[i * 3 + 1] = (Math.random() - 0.5) * (radius * 0.2) + ry
      arr[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + rz
    }
    return arr
  }, [count])

  useFrame((state, delta) => {
    points.current.rotation.y -= delta * 0.05
    const scrollY  = window.scrollY
    const targetX  = (mouse.x * viewport.width)  / 10
    const targetY  = (mouse.y * viewport.height) / 10
    points.current.position.x += (targetX - points.current.position.x) * 0.02
    points.current.position.y += (targetY - points.current.position.y) * 0.02
    points.current.rotation.x = 0.2 + scrollY * 0.0002
    // Subtle scroll parallax on Z
    points.current.position.z += (-(scrollY * 0.002) - points.current.position.z) * 0.04
  })

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
  )
}

/* ── Gold sparkle particles (new layer) ── */
function GoldSparkles({ count = 220 }) {
  const points = useRef()
  const time   = useRef(0)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Distribute randomly across a wide volume
      arr[i * 3]     = (Math.random() - 0.5) * 50
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40
    }
    return arr
  }, [count])

  // Phase offsets so each sparkle twinkles independently
  const phases = useMemo(
    () => Array.from({ length: count }, () => Math.random() * Math.PI * 2),
    [count]
  )

  useFrame((state, delta) => {
    time.current += delta
    // Animate opacity via material — subtle sine pulse (0.15 → 0.65)
    if (points.current) {
      const t = time.current
      // Use the mean phase for a gentle global breathe
      points.current.material.opacity = 0.25 + Math.sin(t * 0.8) * 0.12
      // Very slow drift rotation
      points.current.rotation.y += delta * 0.012
    }
  })

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
  )
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
