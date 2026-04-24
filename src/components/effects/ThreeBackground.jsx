import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const OrbField = () => {
  const groupRef = useRef(null)

  const points = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => {
        const angle = (index / 18) * Math.PI * 2
        const radius = 2.2 + (index % 4) * 0.65
        return {
          key: index,
          position: [
            Math.cos(angle) * radius,
            Math.sin(angle * 1.6) * 1.8,
            Math.sin(angle) * (1.8 + (index % 3) * 0.35),
          ],
          scale: 0.12 + (index % 5) * 0.035,
          color: index % 2 ? '#22d3ee' : '#c084fc',
          emissive: index % 2 ? '#0ea5e9' : '#a855f7',
          speed: 1 + (index % 4) * 0.15,
        }
      }),
    [],
  )

  useFrame((state, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.07
    groupRef.current.rotation.x += delta * 0.02
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.2
  })

  return (
    <group ref={groupRef}>
      {points.map((point) => (
        <Float
          key={point.key}
          speed={point.speed}
          rotationIntensity={1.2}
          floatIntensity={1.35}
        >
          <mesh position={point.position}>
            <icosahedronGeometry args={[point.scale, 0]} />
            <meshStandardMaterial
              color={point.color}
              emissive={point.emissive}
              emissiveIntensity={1.05}
              roughness={0.18}
              metalness={0.55}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

const RibbonRings = () => {
  const ringGroup = useRef(null)

  useFrame((state) => {
    if (!ringGroup.current) return
    const t = state.clock.elapsedTime
    ringGroup.current.rotation.z = t * 0.06
    ringGroup.current.rotation.x = Math.sin(t * 0.18) * 0.2
  })

  return (
    <group ref={ringGroup}>
      <mesh rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[3.8, 0.015, 16, 320]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.26} />
      </mesh>
      <mesh rotation={[Math.PI / 2.1, -0.42, 0.3]}>
        <torusGeometry args={[2.9, 0.015, 16, 260]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.22} />
      </mesh>
    </group>
  )
}

const GradientFog = () => {
  const meshRef = useRef(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -3]}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial color={new THREE.Color('#020617')} transparent opacity={0.5} />
    </mesh>
  )
}

const ThreeBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 opacity-85" data-parallax="bg">
      <div className="three-bg-vignette" />
      <div className="cyber-grid" />
      <div className="cyber-particles" />
      <Canvas camera={{ position: [0, 0, 6.2], fov: 58 }} dpr={[1, 1.7]}>
        <ambientLight intensity={0.62} />
        <pointLight position={[5.5, 4.5, 3]} intensity={18} color="#00f5ff" />
        <pointLight position={[-5, -2.2, -1]} intensity={13} color="#8b5cf6" />
        <GradientFog />
        <RibbonRings />
        <OrbField />
        <Stars radius={100} depth={58} count={1600} factor={4.5} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  )
}

export default ThreeBackground
