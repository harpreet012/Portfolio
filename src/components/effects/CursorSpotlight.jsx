import { useEffect, useRef } from 'react'

const CursorSpotlight = () => {
  const spotlightRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })
  const smoothPosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Detect if device is mobile
    const isMobile = () => window.innerWidth < 768 || 'ontouchstart' in window

    if (isMobile()) return // Disable on mobile

    const spotlight = spotlightRef.current
    if (!spotlight) return

    // Update cursor position on mousemove
    const handleMouseMove = (e) => {
      posRef.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    // Smooth animation loop with requestAnimationFrame
    const animate = () => {
      // Lerp (linear interpolation) for smooth following
      smoothPosRef.current.x += (posRef.current.x - smoothPosRef.current.x) * 0.15
      smoothPosRef.current.y += (posRef.current.y - smoothPosRef.current.y) * 0.15

      // Update CSS variables
      document.documentElement.style.setProperty(
        '--cursor-x',
        `${smoothPosRef.current.x}px`
      )
      document.documentElement.style.setProperty(
        '--cursor-y',
        `${smoothPosRef.current.y}px`
      )

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
      className="cursor-spotlight pointer-events-none fixed inset-0 z-50"
      style={{
        background: `
          radial-gradient(
            circle 150px at var(--cursor-x, 0) var(--cursor-y, 0),
            rgba(34, 211, 238, 0.15),
            rgba(10, 10, 20, 0.98)
          )
        `,
        transition: 'background 0.05s linear',
      }}
    >
      {/* Inner glow dot */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: 'var(--cursor-x, 0)',
          top: 'var(--cursor-y, 0)',
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '200px',
          background: `
            radial-gradient(
              circle,
              rgba(34, 211, 238, 0.3),
              rgba(168, 85, 247, 0.1),
              transparent
            )
          `,
          borderRadius: '50%',
          filter: 'blur(30px)',
          animation: 'pulse-glow 3s ease-in-out infinite',
        }}
      />

      {/* Outer ring effect */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: 'var(--cursor-x, 0)',
          top: 'var(--cursor-y, 0)',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          border: '2px solid rgba(34, 211, 238, 0.15)',
          borderRadius: '50%',
          filter: 'blur(1px)',
          animation: 'rotate-ring 8s linear infinite',
        }}
      />

      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            filter: blur(30px);
            opacity: 0.6;
          }
          50% {
            filter: blur(40px);
            opacity: 0.4;
          }
        }

        @keyframes rotate-ring {
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

export default CursorSpotlight
