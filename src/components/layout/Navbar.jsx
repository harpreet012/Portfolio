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
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpenMenu(false)
  }

  return (
    <header className="fixed inset-x-0 top-4 z-50 mx-auto w-full max-w-6xl px-4 py-4">
      <nav className="rounded-[2rem] border border-white/10 bg-slate-950/60 px-4 py-3 shadow-[0_10px_45px_rgba(8,15,35,0.45)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-sm font-semibold tracking-[0.25em] text-cyan-300"
          >
            HJ
          </button>

          <ul className="hidden items-center gap-5 lg:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className={`text-sm transition hover:text-cyan-300 hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.65)] ${
                    activeSection === link.id ? 'text-cyan-300' : 'text-white/80'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-cyan-300/50"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>

            <button
              onClick={() => setOpenMenu((prev) => !prev)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-cyan-300/50 lg:hidden"
              aria-label="Toggle mobile menu"
            >
              {openMenu ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${openMenu ? 'max-h-96 pt-4' : 'max-h-0'}`}
        >
          <ul className="grid gap-2 rounded-2xl border border-white/10 bg-white/5 p-3">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm transition hover:bg-cyan-300/10 hover:text-cyan-200 ${
                    activeSection === link.id ? 'bg-cyan-300/10 text-cyan-200' : 'text-white/85'
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
