import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Navbar from './components/layout/Navbar'
import CustomCursor from './components/effects/CustomCursor'
import CursorSpotlight from './components/effects/CursorSpotlight'
import Loader from './components/effects/Loader'
import ScrollProgress from './components/effects/ScrollProgress'
import ThreeBackground from './components/effects/ThreeBackground'
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
  const [theme, setTheme] = useState('dark')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('light-theme', savedTheme === 'light')

    const timeout = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timeout)
  }, [])

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
        { opacity: 0, y: 36, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 82%',
          },
        },
      )
    })

    ScrollTrigger.batch('[data-reveal="card"]', {
      start: 'top 86%',
      once: true,
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          {
            opacity: 0,
            y: 52,
            rotateX: 8,
            transformPerspective: 1000,
            filter: 'blur(6px)',
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.08,
            clearProps: 'filter,transformPerspective',
          },
        )
      },
    })

    gsap.to('[data-parallax="slow"]', {
      yPercent: -26,
      rotation: 5,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        scrub: 1.2,
      },
    })

    gsap.to('[data-parallax="medium"]', {
      yPercent: -14,
      rotation: -6,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        scrub: 1,
      },
    })

    gsap.to('[data-parallax="bg"]', {
      yPercent: -18,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        scrub: 1.1,
      },
    })

    gsap.to('[data-rotate="orbital"]', {
      rotation: 180,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
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
      <CustomCursor />
      <CursorSpotlight />
      <ThreeBackground />
      <div className="fixed inset-0 -z-10 bg-slate-950" />

      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <div data-parallax="slow" className="mesh-float absolute left-6 top-32 h-28 w-28 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div data-parallax="medium" className="mesh-float absolute right-8 top-[32rem] h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />
        <div data-parallax="slow" className="mesh-float absolute left-1/2 top-[52rem] h-24 w-24 -translate-x-1/2 rounded-full bg-blue-400/20 blur-3xl" />
        <div data-parallax="bg" data-rotate="orbital" className="mesh-float absolute left-[8%] top-[88rem] h-52 w-52 rounded-full border border-cyan-300/20 bg-cyan-300/5 blur-2xl" />

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
