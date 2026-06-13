import { useState, useEffect } from 'react'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#aboutme', label: 'AboutMe' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = navLinks.map(l => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i])
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
        {/* Logo / Name */}
        <a href="#home" className="flex items-center gap-2 group">
          <span className="text-blue-700 text-xl font-bold group-hover:text-blue-500 transition-colors duration-300">
            &lt;
          </span>
          <span className="text-gray-200 text-lg font-semibold tracking-wide">
            Javier<span className="text-blue-700">.</span>
          </span>
          <span className="text-blue-700 text-xl font-bold group-hover:text-blue-500 transition-colors duration-300">
            /&gt;
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`nav-link text-sm tracking-wide ${
                activeSection === href.slice(1) ? 'active' : ''
              }`}
            >
              <span className="text-blue-700/70 text-xs">&lt;</span>
              {label}
              <span className="text-blue-700/70 text-xs">/&gt;</span>
            </a>
          ))}
        </nav>

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

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 border-b border-slate-800' : 'max-h-0'
        } bg-slate-900/98 backdrop-blur-md`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`nav-link text-sm py-1 ${
                activeSection === href.slice(1) ? 'active' : ''
              }`}
            >
              <span className="text-blue-700/70 text-xs">&lt;</span>
              {label}
              <span className="text-blue-700/70 text-xs">/&gt;</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
