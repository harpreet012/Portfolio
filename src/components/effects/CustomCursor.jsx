import { useEffect, useRef } from 'react'

const CustomCursor = () => {
  const dotRef = useRef(null)
  const glowRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })
  const smoothPosRef = useRef({ x: 0, y: 0 })
  const isHoveringRef = useRef(false)

  useEffect(() => {
    // Detect mobile
    if (window.innerWidth < 768 || 'ontouchstart' in window) {
      return // Disable on mobile
    }

    const dot = dotRef.current
    const glow = glowRef.current
    if (!dot || !glow) return

    // Hide default cursor
    document.body.style.cursor = 'none'

    // Update position on mouse move
    const handleMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }

      // Instant dot movement
      if (dot) {
        dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    // Smooth animation loop for glow with lerp
    const animate = () => {
      // Lerp (linear interpolation) for smooth glow following
      smoothPosRef.current.x += (posRef.current.x - smoothPosRef.current.x) * 0.18
      smoothPosRef.current.y += (posRef.current.y - smoothPosRef.current.y) * 0.18

      if (glow) {
        glow.style.transform = `translate(${smoothPosRef.current.x - 17.5}px, ${smoothPosRef.current.y - 17.5}px)`
      }

      requestAnimationFrame(animate)
    }

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .cursor-hover')

    const addHoverEffects = (el) => {
      el.addEventListener('mouseenter', () => {
        isHoveringRef.current = true
        if (dot) dot.style.transform += ' scale(1.5)'
        if (glow) {
          glow.style.transform += ' scale(2)'
          glow.style.opacity = '0.4'
        }
      })

      el.addEventListener('mouseleave', () => {
        isHoveringRef.current = false
        if (dot) dot.style.transform = dot.style.transform.replace(' scale(1.5)', '')
        if (glow) {
          glow.style.transform = glow.style.transform.replace(' scale(2)', '')
          glow.style.opacity = '0.15'
        }
      })
    }

    interactiveElements.forEach(addHoverEffects)

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove)
    const animationId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <>
      {/* Main cursor dot - neon cyan */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999]"
        style={{
          width: '8px',
          height: '8px',
          background: 'radial-gradient(circle, #00f0ff, #00a8cc)',
          borderRadius: '50%',
          boxShadow: '0 0 8px rgba(0, 240, 255, 0.8), 0 0 12px rgba(0, 240, 255, 0.5)',
          animation: 'cursor-pulse 1.5s ease-in-out infinite',
        }}
      />

      {/* Glow blob - larger, follows with lag */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-[9998]"
        style={{
          width: '35px',
          height: '35px',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.4), transparent)',
          borderRadius: '50%',
          filter: 'blur(10px)',
          opacity: 0.15,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Animations */}
      <style>{`
        @keyframes cursor-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.4);
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}

export default CustomCursor
