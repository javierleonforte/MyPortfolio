import { useState, useEffect } from 'react'
import { useLang } from '../useLang'

const sectionIds = ['home', 'projects', 'skills', 'aboutme', 'contact']

export default function Header() {
  const { lang, toggleLang, t } = useLang()
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navKeys = ['home', 'projects', 'skills', 'aboutme', 'contact']

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sectionIds[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-1.5 group">
          <span className="text-blue-700 text-xl font-bold group-hover:text-blue-500 transition-colors duration-300">&lt;</span>
          <span className="text-gray-200 text-lg font-semibold tracking-wide">Javier<span className="text-blue-700">.</span></span>
          <span className="text-blue-700 text-xl font-bold group-hover:text-blue-500 transition-colors duration-300">/&gt;</span>
        </a>

        <div className="flex items-center gap-4">
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navKeys.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className={`nav-link text-sm tracking-wide ${activeSection === key ? 'active' : ''}`}
              >
                <span className="text-blue-700/70 text-xs">&lt;</span>
                {t.nav[key]}
                <span className="text-blue-700/70 text-xs">/&gt;</span>
              </a>
            ))}
          </nav>

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            title={lang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700
                       hover:border-blue-700/60 bg-slate-800/60 hover:bg-slate-800
                       transition-all duration-200 group select-none"
          >
            <span className="text-base leading-none">
              {lang === 'en' ? '🇬🇧' : '🇦🇷'}
            </span>
            <span className="text-gray-400 group-hover:text-gray-200 text-xs font-mono transition-colors duration-200 tracking-widest">
              {lang === 'en' ? 'EN' : 'ES'}
            </span>
            {/* arrow icon */}
            <svg
              className="text-gray-600 group-hover:text-blue-500 transition-colors duration-200"
              width="10" height="10" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-400 hover:text-gray-200 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 border-b border-slate-800' : 'max-h-0'
        } bg-slate-900/98 backdrop-blur-md`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {navKeys.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              onClick={() => setMenuOpen(false)}
              className={`nav-link text-sm py-1 ${activeSection === key ? 'active' : ''}`}
            >
              <span className="text-blue-700/70 text-xs">&lt;</span>
              {t.nav[key]}
              <span className="text-blue-700/70 text-xs">/&gt;</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
