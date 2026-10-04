import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import { navLinks } from '../../data/portfolioData'

const Navbar = ({ _theme, _onToggleTheme }) => {
  const [openMenu, setOpenMenu]           = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled]           = useState(false)

  const location   = useLocation()
  const isProjectsPage = location.pathname === '/projects'

  useEffect(() => {
    if (isProjectsPage) return   // no scroll-spy on the /projects page

    const ids      = navLinks.map((l) => l.id)
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)

    const onScroll = () => {
      let current = 'hero'
      const offset = window.scrollY + 130
      sections.forEach((s) => {
        if (s.offsetTop <= offset) current = s.id
      })
      setActiveSection(current)
      setScrolled(window.scrollY > 20)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isProjectsPage])

  // Also track scrolled state on /projects page (for navbar opacity)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (id) => {
    if (isProjectsPage) {
      // Navigate to home page at the specific section anchor
      window.location.href = `/#${id}`
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setOpenMenu(false)
  }

  const handleLogoClick = () => {
    if (isProjectsPage) {
      window.location.href = '/'
    } else {
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className="fixed inset-x-0 top-4 z-50 mx-auto w-full max-w-5xl px-4 lg:px-8">
      <nav
        className="modern-card px-6 py-3 transition-all duration-400"
        style={{
          background: scrolled ? 'rgba(5,3,22,0.92)' : 'rgba(10,5,32,0.80)',
          borderColor: scrolled ? 'rgba(212,169,55,0.18)' : 'rgba(212,169,55,0.10)',
          backdropFilter: scrolled ? 'blur(24px)' : 'blur(12px)',
          boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,169,55,0.08)' : 'none',
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleLogoClick}
            className="text-lg font-bold tracking-widest text-amber-400 uppercase font-mono hover:text-amber-300 transition-colors duration-200"
          >
            HJ<span className="text-gray-500 text-xs">.dev</span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const isActive = !isProjectsPage && activeSection === link.id
              return (
                <li key={link.id} className="relative">
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className={`nav-link text-xs font-mono uppercase tracking-[0.1em] transition-colors duration-200 ${
                      isActive
                        ? 'text-amber-400'
                        : 'text-gray-400 hover:text-amber-200'
                    }`}
                    style={
                      isActive
                        ? { textShadow: '0 0 12px rgba(251,191,36,0.5)' }
                        : undefined
                    }
                  >
                    {link.label}
                  </button>

                  {/* Shared-layout sliding gold indicator */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        initial={{ opacity: 0, scaleX: 0.4 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0.4 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(212,169,55,0.85), transparent)',
                          boxShadow: '0 0 6px rgba(212,169,55,0.6)',
                        }}
                      />
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>

          {/* Mobile toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpenMenu((p) => !p)}
              className="lg:hidden text-gray-300 hover:text-amber-400 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {openMenu ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {openMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden lg:hidden"
            >
              <ul className="grid gap-4 pt-6 pb-2">
                {navLinks.map((link) => {
                  const isActive = !isProjectsPage && activeSection === link.id
                  return (
                    <li key={link.id}>
                      <button
                        onClick={() => handleNavClick(link.id)}
                        className={`nav-link w-full text-left text-xs font-mono uppercase tracking-[0.1em] transition-colors duration-200 ${
                          isActive
                            ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.45)]'
                            : 'text-gray-400 hover:text-amber-200'
                        }`}
                      >
                        {link.label}
                        <span className="nav-link-underline" aria-hidden="true" />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export default Navbar
