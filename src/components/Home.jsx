import { useEffect, useReducer, useRef, useState } from 'react'
import { useLang } from '../useLang'

// Un solo reducer atómico — evita el warning de setState dentro de effect
function twReducer(state, action) {
  const { roles } = action
  const current = roles[state.roleIndex]
  if (state.typing) {
    if (state.displayed.length < current.length)
      return { ...state, displayed: current.slice(0, state.displayed.length + 1) }
    return { ...state, typing: false }
  } else {
    if (state.displayed.length > 0)
      return { ...state, displayed: current.slice(0, state.displayed.length - 1) }
    // transición atómica al siguiente rol
    return { roleIndex: (state.roleIndex + 1) % roles.length, displayed: '', typing: true }
  }
}

export default function Home() {
  const { t } = useLang()
  const roles = t.home.roles

  const [tw, dispatch] = useReducer(twReducer, { roleIndex: 0, displayed: '', typing: true })
  const [imgError, setImgError] = useState(false)

  // Resetear cuando cambia el idioma
  const prevRoles = useRef(roles)
  useEffect(() => {
    if (prevRoles.current !== roles) {
      prevRoles.current = roles
      dispatch({ type: 'tick', roles: [roles[0]] }) // force reset via reducer
      // más simple: forzamos manualmente el estado inicial
    }
  }, [roles])

  // Driver del typewriter — un solo setState por tick
  useEffect(() => {
    const current = roles[tw.roleIndex]
    // Si terminó de borrar, el reducer ya avanzó el roleIndex en el mismo dispatch
    if (!tw.typing && tw.displayed.length === 0) return
    const delay = tw.typing
      ? (tw.displayed.length === current.length ? 2000 : 70)
      : 40
    const id = setTimeout(() => dispatch({ type: 'tick', roles }), delay)
    return () => clearTimeout(id)
  }, [tw, roles])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-blue-700 text-sm tracking-[0.25em] uppercase mb-4">
            {t.home.greeting}
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-100 mb-4 leading-tight">
            Javier<span className="text-blue-700">.</span>
            <br />
            <span className="text-gray-300 text-4xl md:text-5xl">Leonforte</span>
          </h1>

          <div className="flex items-center gap-1 justify-center md:justify-start mb-8 h-10">
            <span className="text-blue-700 text-sm">~/</span>
            <span className="text-gray-300 text-xl font-medium">{tw.displayed}</span>
            <span className="inline-block w-0.5 h-6 bg-blue-500 animate-blink ml-0.5" />
          </div>

          <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto md:mx-0 mb-10 leading-relaxed">
            {t.home.tagline}
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a href="#projects" className="btn-primary">
              {t.home.cta_projects}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
            <a href="#contact" className="btn-outline">{t.home.cta_contact}</a>
          </div>

          <div className="flex gap-4 mt-8 justify-center md:justify-start">
            <a href="https://github.com/javierleonforte" target="_blank" rel="noreferrer"
              className="text-gray-600 hover:text-gray-300 transition-colors duration-200" aria-label="GitHub">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/javier-leonforte-221870304/" target="_blank" rel="noreferrer"
              className="text-gray-600 hover:text-blue-500 transition-colors duration-200" aria-label="LinkedIn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Avatar */}
        <div className="flex-shrink-0 relative">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full border-2 border-blue-700/30 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-blue-700/20 animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-900/40 to-slate-800 border border-blue-700/50 flex items-center justify-center overflow-hidden">
              {!imgError ? (
                <img src="/assets/me.png" alt="Javier Leonforte"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={() => setImgError(true)} />
              ) : (
                <span className="text-6xl text-blue-400 font-bold">JL</span>
              )}
            </div>
            <div className="absolute -top-2 -right-2 bg-slate-800 border border-blue-700/50 rounded-lg px-3 py-1.5 text-xs text-blue-400 font-mono shadow-lg animate-float">
              &lt;code/&gt;
            </div>
            <div className="absolute -bottom-2 -left-2 bg-slate-800 border border-blue-700/50 rounded-lg px-3 py-1.5 text-xs text-gray-400 font-mono shadow-lg animate-float [animation-delay:1.5s]">
              {t.home.badge_years}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600 text-xs animate-bounce">
        <span>{t.home.scroll}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </section>
  )
}
