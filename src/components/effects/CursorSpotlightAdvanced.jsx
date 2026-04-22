import { useEffect, useRef } from 'react'

/**
 * 🔥 ADVANCED Cursor Spotlight with Particles & Glow
 * Features: Dark overlay, neon glow, pulsing effect, rotating ring, trailing effect
 * Performance optimized with requestAnimationFrame
 */
const CursorSpotlightAdvanced = () => {
  const spotlightRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })
  const smoothPosRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef([])

  useEffect(() => {
    // Detect if device is mobile
    const isMobile = () => window.innerWidth < 768 || 'ontouchstart' in window

    if (isMobile()) return // Disable on mobile for performance

    const spotlight = spotlightRef.current
    if (!spotlight) return

    // Update cursor position on mousemove
    const handleMouseMove = (e) => {
      posRef.current = {
        x: e.clientX,
        y: e.clientY,
      }

      // Create particle trails
      if (Math.random() > 0.7) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          life: 1,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
        })
      }
    }

    // Smooth animation loop with requestAnimationFrame
    const animate = () => {
      // Lerp for smooth following
      smoothPosRef.current.x += (posRef.current.x - smoothPosRef.current.x) * 0.1
      smoothPosRef.current.y += (posRef.current.y - smoothPosRef.current.y) * 0.1

      // Update CSS variables
      document.documentElement.style.setProperty(
        '--cursor-x',
        `${smoothPosRef.current.x}px`
      )
      document.documentElement.style.setProperty(
        '--cursor-y',
        `${smoothPosRef.current.y}px`
      )

      // Update particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life -= 0.02
        p.x += p.vx
        p.y += p.vy
        return p.life > 0
      })

      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div
      ref={spotlightRef}
      className="cursor-spotlight-advanced pointer-events-none fixed inset-0 z-50"
      style={{
        background: `
          radial-gradient(
            circle 180px at var(--cursor-x, 0) var(--cursor-y, 0),
            rgba(34, 211, 238, 0.2),
            rgba(168, 85, 247, 0.08),
            rgba(10, 10, 20, 0.98)
          )
        `,
        backdropFilter: 'blur(0.5px)',
        transition: 'background 0.05s linear',
      }}
    >
      {/* Main glow dot - cyan */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: 'var(--cursor-x, 0)',
          top: 'var(--cursor-y, 0)',
          transform: 'translate(-50%, -50%)',
          width: '240px',
          height: '240px',
          background: `
            radial-gradient(
              circle,
              rgba(34, 211, 238, 0.4),
              rgba(34, 211, 238, 0.1),
              transparent
            )
          `,
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'pulse-glow-advanced 2.5s ease-in-out infinite',
        }}
      />

      {/* Secondary glow dot - purple */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: 'var(--cursor-x, 0)',
          top: 'var(--cursor-y, 0)',
          transform: 'translate(-50%, -50%)',
          width: '180px',
          height: '180px',
          background: `
            radial-gradient(
              circle,
              rgba(168, 85, 247, 0.3),
              rgba(168, 85, 247, 0.05),
              transparent
            )
          `,
          borderRadius: '50%',
          filter: 'blur(35px)',
          animation: 'pulse-glow-advanced 3s ease-in-out infinite reverse',
        }}
      />

      {/* Outer rotating ring - cyan */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: 'var(--cursor-x, 0)',
          top: 'var(--cursor-y, 0)',
          transform: 'translate(-50%, -50%)',
          width: '320px',
          height: '320px',
          border: '2px solid rgba(34, 211, 238, 0.2)',
          borderRadius: '50%',
          filter: 'blur(2px)',
          animation: 'rotate-ring-advanced 10s linear infinite',
        }}
      />

      {/* Accent ring - purple */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: 'var(--cursor-x, 0)',
          top: 'var(--cursor-y, 0)',
          transform: 'translate(-50%, -50%)',
          width: '260px',
          height: '260px',
          border: '1px dashed rgba(168, 85, 247, 0.15)',
          borderRadius: '50%',
          filter: 'blur(1px)',
          animation: 'rotate-ring-advanced 15s linear infinite reverse',
        }}
      />

      {/* Particles */}
      {particlesRef.current.map((particle, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: '4px',
            height: '4px',
            background: 'rgba(34, 211, 238, 0.6)',
            borderRadius: '50%',
            pointerEvents: 'none',
            opacity: particle.life * 0.5,
            boxShadow: `0 0 8px rgba(34, 211, 238, ${particle.life * 0.4})`,
          }}
        />
      ))}

      <style>{`
        @keyframes pulse-glow-advanced {
          0%, 100% {
            filter: blur(40px);
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
          }
          50% {
            filter: blur(50px);
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0.3;
          }
        }

        @keyframes rotate-ring-advanced {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

export default CursorSpotlightAdvanced
