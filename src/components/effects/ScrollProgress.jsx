import { useEffect, useState } from 'react'

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const value = total > 0 ? (scrollTop / total) * 100 : 0
      setProgress(value)
    }

    window.addEventListener('scroll', onScroll)
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-1.5 bg-white/5 backdrop-blur">
      <div
        className="h-full bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.9)] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default ScrollProgress
