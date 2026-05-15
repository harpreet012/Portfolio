import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

function ParticleSwarm({ count = 8000 }) {
  const points = useRef()
  const { mouse, viewport } = useThree()
  
  // Generate particles in a galaxy-like spiral shape
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const distance = 30 // Spread of the galaxy
    
    for(let i = 0; i < count; i++) {
      const radius = Math.random() * distance
      const branchAngle = (i % 3) * ((2 * Math.PI) / 3) // 3 branches
      const spinAngle = radius * 0.5 // Twist
      
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 2
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 2
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 2

      positions[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX
      positions[i * 3 + 1] = (Math.random() - 0.5) * (radius * 0.2) + randomY // flatten Y
      positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ
    }
    return positions
  }, [count])

  useFrame((state, delta) => {
    // Slow base rotation
    points.current.rotation.y -= delta * 0.05
    points.current.rotation.x = 0.2 // slight tilt

    // Parallax effect based on mouse
    const targetX = (mouse.x * viewport.width) / 10
    const targetY = (mouse.y * viewport.height) / 10
    
    points.current.position.x += (targetX - points.current.position.x) * 0.02
    points.current.position.y += (targetY - points.current.position.y) * 0.02

    // Parallax effect based on scroll (only slightly tilt the galaxy)
    const scrollY = window.scrollY
    points.current.rotation.x = 0.2 + (scrollY * 0.0002) // Tilt slightly more as you scroll
    
    // Keep Y position stable, just follow mouse
    points.current.position.y += (targetY - points.current.position.y) * 0.02
  })

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8ab4f8"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.35}
      />
    </Points>
  )
}

export default function BackgroundGalaxy() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#050505]">
      <Canvas camera={{ position: [0, 5, 20], fov: 60 }}>
        <fog attach="fog" args={['#050505', 10, 40]} />
        <ParticleSwarm count={15000} />
      </Canvas>
    </div>
  )
}
