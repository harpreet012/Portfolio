import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Navbar from './components/layout/Navbar'
import Loader from './components/effects/Loader'
import ScrollProgress from './components/effects/ScrollProgress'
import BackgroundGalaxy from './components/effects/BackgroundGalaxy'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Certifications from './sections/Certifications'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('light-theme', theme === 'light')

    const timeout = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timeout)
  }, [theme])

  useEffect(() => {
    if (loading) return undefined

    const root = document.documentElement
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    let rafId = 0
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const updateScrollProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0
      root.style.setProperty('--scroll-progress', progress.toFixed(4))
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    updateScrollProgress()

    gsap.utils.toArray('[data-reveal="heading"]').forEach((heading) => {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
          },
        },
      )
    })

    ScrollTrigger.batch('[data-reveal="card"]', {
      start: 'top 88%',
      once: true,
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
          },
        )
      },
    })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', updateScrollProgress)
      root.style.removeProperty('--scroll-progress')
      lenis.destroy()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [loading])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    localStorage.setItem('portfolio-theme', nextTheme)
    document.documentElement.classList.toggle('light-theme', nextTheme === 'light')
  }

  return (
    <>
      <Loader loading={loading} />
      <ScrollProgress />
      {/* Background Elements */}
      <BackgroundGalaxy />

      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
        <Footer />
      </motion.main>
    </>
  )
}

export default App
