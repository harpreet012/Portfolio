import { useEffect, useRef } from 'react'

const MatrixBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    // Character set (Binary + Katakana + Tech symbols)
    const chars = '01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ{};<>/'.split('')
    
    const fontSize = 14
    const columns = width / fontSize
    const drops = []

    for (let x = 0; x < columns; x++) {
      drops[x] = 1
    }

    const draw = () => {
      // Semi-transparent black to create trailing effect
      ctx.fillStyle = 'rgba(3, 0, 20, 0.05)' // Match bg-base with lighter alpha for longer trails since it's slower
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = '#fbbf24' // Amber-400
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        
        // Randomly make some characters brighter/white
        if (Math.random() > 0.95) {
            ctx.fillStyle = '#ffffff'
        } else {
            ctx.fillStyle = 'rgba(251, 191, 36, 0.4)' // Amber
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    const interval = setInterval(draw, 75) // Slower dropping speed

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-4] pointer-events-none opacity-40"
      style={{ filter: 'brightness(1.5) contrast(1.2)' }}
    />
  )
}

export default MatrixBackground
