import { useEffect, useState } from 'react'
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa'
import { navLinks } from '../../data/portfolioData'

const Navbar = ({ theme, onToggleTheme }) => {
  const [openMenu, setOpenMenu] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const ids = navLinks.map((link) => link.id)
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const onScroll = () => {
      let current = 'hero'
      const offset = window.scrollY + 130

      sections.forEach((section) => {
        if (section.offsetTop <= offset) {
          current = section.id
        }
      })

      setActiveSection(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpenMenu(false)
  }

  return (
    <header className="fixed inset-x-0 top-4 z-50 mx-auto w-full max-w-5xl px-4 lg:px-8">
      <nav className="modern-card px-6 py-3 bg-[#0a0520]/80 border border-amber-400/10">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-lg font-bold tracking-widest text-amber-400 uppercase font-mono"
          >
            HJ<span className="text-gray-500 text-xs">.dev</span>
          </button>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className={`text-xs font-mono uppercase tracking-[0.1em] transition-colors ${
                    activeSection === link.id ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'text-gray-400 hover:text-amber-200'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpenMenu((prev) => !prev)}
              className="lg:hidden text-gray-300 hover:text-amber-400 transition"
              aria-label="Toggle mobile menu"
            >
              {openMenu ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${openMenu ? 'max-h-96 pt-6 pb-2' : 'max-h-0'}`}
        >
          <ul className="grid gap-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className={`w-full text-left text-xs font-mono uppercase tracking-[0.1em] transition-colors ${
                    activeSection === link.id ? 'text-amber-400' : 'text-gray-400 hover:text-amber-200'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
