import { useEffect, useRef } from 'react'

/**
 * 🔥 ADVANCED Custom Cursor with Particle Trails
 * Features: Dual cursor (dot + glow), smooth following, hover scaling,
 * pulse animation, particle trails, and interactive element detection
 */
const CustomCursorAdvanced = () => {
  const dotRef = useRef(null)
  const glowRef = useRef(null)
  const containerRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })
  const smoothPosRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef([])
  const isHoveringRef = useRef(false)

  useEffect(() => {
    // Detect mobile
    if (window.innerWidth < 768 || 'ontouchstart' in window) {
      return // Disable on mobile
    }

    const dot = dotRef.current
    const glow = glowRef.current
    const container = containerRef.current
    if (!dot || !glow || !container) return

    // Hide default cursor
    document.body.style.cursor = 'none'

    // Update position on mouse move
    const handleMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }

      // Instant dot movement
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`

      // Create particle trails (more frequent for advanced version)
      if (Math.random() > 0.6) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          life: 1,
          element: null,
        })

        // Limit particle count
        if (particlesRef.current.length > 30) {
          const old = particlesRef.current.shift()
          if (old.element) old.element.remove()
        }
      }
    }

    // Smooth animation loop for glow with lerp
    const animate = () => {
      // Lerp for smooth glow following
      smoothPosRef.current.x += (posRef.current.x - smoothPosRef.current.x) * 0.15
      smoothPosRef.current.y += (posRef.current.y - smoothPosRef.current.y) * 0.15

      glow.style.transform = `translate(${smoothPosRef.current.x - 17.5}px, ${smoothPosRef.current.y - 17.5}px)`

      // Update particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life -= 0.03
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.1 // Gravity

        if (p.element) {
          p.element.style.left = `${p.x}px`
          p.element.style.top = `${p.y}px`
          p.element.style.opacity = p.life * 0.6
        }

        if (p.life <= 0 && p.element) {
          p.element.remove()
          return false
        }
        return true
      })

      requestAnimationFrame(animate)
    }

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .cursor-hover, input, textarea')

    const addHoverEffects = (el) => {
      el.addEventListener('mouseenter', () => {
        isHoveringRef.current = true
        if (dot) {
          dot.style.boxShadow = '0 0 12px rgba(0, 240, 255, 1), 0 0 20px rgba(0, 240, 255, 0.7)'
        }
        if (glow) {
          glow.style.transform += ' scale(2.5)'
          glow.style.opacity = '0.5'
        }
      })

      el.addEventListener('mouseleave', () => {
        isHoveringRef.current = false
        if (dot) {
          dot.style.boxShadow = '0 0 8px rgba(0, 240, 255, 0.8), 0 0 12px rgba(0, 240, 255, 0.5)'
        }
        if (glow) {
          glow.style.transform = glow.style.transform.replace(' scale(2.5)', '')
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
      particlesRef.current.forEach((p) => {
        if (p.element) p.element.remove()
      })
    }
  }, [])

  return (
    <>
      {/* Container for particles */}
      <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[9997]" />

      {/* Main cursor dot - neon cyan with enhanced glow */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999]"
        style={{
          width: '8px',
          height: '8px',
          background: 'radial-gradient(circle, #00f0ff, #00a8cc)',
          borderRadius: '50%',
          boxShadow: '0 0 8px rgba(0, 240, 255, 0.8), 0 0 12px rgba(0, 240, 255, 0.5)',
          animation: 'cursor-pulse-advanced 1.3s ease-in-out infinite',
        }}
      />

      {/* Glow blob - larger, follows with lag */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-[9998]"
        style={{
          width: '35px',
          height: '35px',
          background: `
            radial-gradient(
              circle,
              rgba(0, 240, 255, 0.5),
              rgba(168, 85, 247, 0.2),
              transparent
            )
          `,
          borderRadius: '50%',
          filter: 'blur(12px)',
          opacity: 0.15,
          transition: 'opacity 0.2s ease',
        }}
      />

      {/* Animations */}
      <style>{`
        @keyframes cursor-pulse-advanced {
          0%, 100% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}

export default CustomCursorAdvanced
